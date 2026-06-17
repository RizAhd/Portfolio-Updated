import http from "http"
import fs from "fs"
const PORT = Number(process.argv[2]), URL = process.argv[3], SEL = process.argv[4], OUT = process.argv[5]
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
await new Promise(r => setTimeout(r, 7000))
const chk = await send("Runtime.evaluate", { expression: `(function(){var e=document.querySelector(${JSON.stringify(SEL)});var ov=document.documentElement.scrollWidth>window.innerWidth+1;if(e)e.scrollIntoView({behavior:'instant',block:'start'});return JSON.stringify({found:!!e,horizOverflow:ov,scrollW:document.documentElement.scrollWidth,winW:window.innerWidth});})()` })
console.log(SEL, chk?.result?.value)
await new Promise(r => setTimeout(r, 1500))
const s = await send("Page.captureScreenshot", { format: "png" })
if (s?.data) { fs.writeFileSync(OUT, Buffer.from(s.data, "base64")); console.log("saved " + OUT) }
process.exit(0)
