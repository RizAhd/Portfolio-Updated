// CDP screenshot driver: navigate, scroll to a selector, capture.
// Uses Node 22's built-in global WebSocket (no `ws` dependency).
import http from "http"
import fs from "fs"

const PORT = Number(process.argv[2] || 9222)
const URL = process.argv[3] || "http://localhost:5173"
const SELECTOR = process.argv[4] || "#quote"
const OUT = process.argv[5] || "shot.png"

const getJSON = (path) =>
  new Promise((res, rej) => {
    http
      .get("http://127.0.0.1:" + PORT + path, (r) => {
        let d = ""
        r.on("data", (c) => (d += c))
        r.on("end", () => res(JSON.parse(d)))
      })
      .on("error", rej)
  })

let targets
for (let i = 0; i < 60; i++) {
  try {
    targets = await getJSON("/json")
    if (targets && targets.find((t) => t.type === "page")) break
  } catch {}
  await new Promise((r) => setTimeout(r, 250))
}
const page = targets?.find((t) => t.type === "page")
if (!page) {
  console.log("no page target")
  process.exit(1)
}

const ws = new WebSocket(page.webSocketDebuggerUrl)
let id = 0
const pending = new Map()
const send = (method, params = {}) =>
  new Promise((resolve) => {
    const mid = ++id
    pending.set(mid, resolve)
    ws.send(JSON.stringify({ id: mid, method, params }))
  })

await new Promise((r) => ws.addEventListener("open", r))
ws.addEventListener("message", (ev) => {
  const msg = JSON.parse(ev.data)
  if (msg.id && pending.has(msg.id)) {
    pending.get(msg.id)(msg.result)
    pending.delete(msg.id)
  }
})

await send("Page.enable")
await send("Runtime.enable")
await send("Page.navigate", { url: URL })
await new Promise((r) => setTimeout(r, 8000)) // load + lazy chunks (one shared Suspense)
const check = await send("Runtime.evaluate", {
  expression: `(function(){
    var e=document.querySelector(${JSON.stringify(SELECTOR)});
    var hasText=document.body.innerText.toLowerCase().indexOf('perseverance')>-1;
    if(e){
      var top=e.getBoundingClientRect().top + window.scrollY - 140;
      window.scrollTo({top:top,behavior:'instant'});
      e.scrollIntoView({behavior:'instant',block:'center'});
    }
    return JSON.stringify({found:!!e, hasText:hasText});
  })()`,
})
console.log("dom check:", check?.result?.value)
await new Promise((r) => setTimeout(r, 2200)) // settle scroll + animations
const shot = await send("Page.captureScreenshot", { format: "png" })
if (shot?.data) {
  fs.writeFileSync(OUT, Buffer.from(shot.data, "base64"))
  console.log("saved " + OUT)
} else {
  console.log("no screenshot data")
}
process.exit(0)
