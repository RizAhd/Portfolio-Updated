import http from "http"
import fs from "fs"
const PORT = Number(process.argv[2]), URL = process.argv[3]
const OUT = "D:\\proooooooooooo\\Portfolioweb\\Port\\linkedin-shots\\"
fs.mkdirSync(OUT, { recursive: true })

const SECTIONS = [
  { id: "home", extra: 0, name: "01-hero" },
  { id: "about", extra: 0, name: "02-about" },
  { id: "projects", extra: 0.85, name: "03-projects" },
  { id: "quote", extra: 0, name: "04-quote" },
  { id: "skills", extra: 0, name: "05-skills" },
  { id: "resume", extra: 0, name: "06-resume" },
  { id: "education", extra: 0.6, name: "07-education" },
  { id: "ask", extra: 0, name: "08-ask-me" },
  { id: "contact", extra: 0, name: "09-contact" },
]

const getJSON = (p) => new Promise((res, rej) => { http.get("http://127.0.0.1:" + PORT + p, (r) => { let d = ""; r.on("data", c => d += c); r.on("end", () => res(JSON.parse(d))) }).on("error", rej) })
let t
for (let i = 0; i < 60; i++) { try { t = await getJSON("/json"); if (t?.find(x => x.type === "page")) break } catch {} await new Promise(r => setTimeout(r, 250)) }
const page = t.find(x => x.type === "page")
const ws = new WebSocket(page.webSocketDebuggerUrl)
let id = 0; const pend = new Map()
const send = (m, p = {}) => new Promise(r => { const i = ++id; pend.set(i, r); ws.send(JSON.stringify({ id: i, method: m, params: p })) })
await new Promise(r => ws.addEventListener("open", r))
ws.addEventListener("message", e => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m.result); pend.delete(m.id) } })
await send("Page.enable"); await send("Runtime.enable")
await send("Page.navigate", { url: URL })
await new Promise(r => setTimeout(r, 9000)) // load lazy chunks + buffer hero video

for (const s of SECTIONS) {
  const r = await send("Runtime.evaluate", {
    expression: `(function(){var e=document.getElementById('${s.id}');if(!e)return 'missing';window.scrollTo({top:e.offsetTop + ${s.extra}*window.innerHeight, behavior:'instant'});return 'ok';})()`,
  })
  await new Promise(r => setTimeout(r, 1800))
  const shot = await send("Page.captureScreenshot", { format: "png" })
  fs.writeFileSync(OUT + s.name + ".png", Buffer.from(shot.data, "base64"))
  console.log(s.name, r?.result?.value)
}
console.log("done -> linkedin-shots/")
process.exit(0)
