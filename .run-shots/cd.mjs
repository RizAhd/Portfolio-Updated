import http from "http"
import fs from "fs"
const PORT = Number(process.argv[2]), URL = process.argv[3]
const OUT = "D:\\proooooooooooo\\Portfolioweb\\Port\\.run-shots\\"
const getJSON = (p) => new Promise((res, rej) => { http.get("http://127.0.0.1:" + PORT + p, (r) => { let d = ""; r.on("data", c => d += c); r.on("end", () => res(JSON.parse(d))) }).on("error", rej) })
let t
for (let i = 0; i < 60; i++) { try { t = await getJSON("/json"); if (t?.find(x => x.type === "page")) break } catch {} await new Promise(r => setTimeout(r, 250)) }
const page = t.find(x => x.type === "page")
const ws = new WebSocket(page.webSocketDebuggerUrl)
let id = 0; const pend = new Map()
const send = (m, p = {}) => new Promise(r => { const i = ++id; pend.set(i, r); ws.send(JSON.stringify({ id: i, method: m, params: p })) })
const shot = async (n) => { const s = await send("Page.captureScreenshot", { format: "png" }); fs.writeFileSync(OUT + n, Buffer.from(s.data, "base64")); console.log("saved " + n) }
await new Promise(r => ws.addEventListener("open", r))
ws.addEventListener("message", e => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m.result); pend.delete(m.id) } })
await send("Page.enable"); await send("Runtime.enable")
await send("Page.navigate", { url: URL })
await new Promise(r => setTimeout(r, 2500))
await send("Runtime.evaluate", { expression: `sessionStorage.removeItem('desktop-notice-dismissed');location.reload();` })
await new Promise(r => setTimeout(r, 1200))
await shot("cd1.png")   // countdown visible
await new Promise(r => setTimeout(r, 4000))
const after = await send("Runtime.evaluate", { expression: `JSON.stringify({noticeGone: !document.body.innerText.includes('Best viewed on desktop')})` })
console.log("after 4s:", after?.result?.value)
await shot("cd2.png")   // should be auto-opened (hero)
process.exit(0)
