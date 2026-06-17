import http from "http"
import fs from "fs"
const PORT = Number(process.argv[2]), URL = process.argv[3]
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
await new Promise(r => setTimeout(r, 5000))
// shot 1: hero (gradient / video check)
let s = await send("Page.captureScreenshot", { format: "png" })
fs.writeFileSync("D:\\proooooooooooo\\Portfolioweb\\Port\\.run-shots\\m-hero.png", Buffer.from(s.data, "base64"))
// click hamburger
const clicked = await send("Runtime.evaluate", { expression: `(function(){var b=document.querySelector('button[aria-label="Open menu"]');if(b){b.click();return true;}return false;})()` })
console.log("hamburger clicked:", clicked?.result?.value)
await new Promise(r => setTimeout(r, 1400))
s = await send("Page.captureScreenshot", { format: "png" })
fs.writeFileSync("D:\\proooooooooooo\\Portfolioweb\\Port\\.run-shots\\m-menu.png", Buffer.from(s.data, "base64"))
console.log("saved m-hero.png + m-menu.png")
process.exit(0)
