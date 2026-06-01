// CDP driver: verifies the tech marquee now spans the FULL viewport width (not
// the old centered max-w-3xl), at desktop + wide widths, with logos loaded and
// the slider still animating.
import { writeFileSync } from "node:fs";

const BASE = process.env.CDP_BASE || "http://127.0.0.1:9232";
const URL = process.env.APP_URL || "http://localhost:5173/";
const OUT = process.env.OUT_DIR || ".";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function getWsUrl() {
  const res = await fetch(`${BASE}/json/new?${encodeURIComponent(URL)}`, { method: "PUT" })
    .catch(() => fetch(`${BASE}/json/new?${encodeURIComponent(URL)}`));
  return (await res.json()).webSocketDebuggerUrl;
}
function makeClient(wsUrl) {
  const ws = new WebSocket(wsUrl);
  let id = 0; const pending = new Map();
  const ready = new Promise((res) => (ws.onopen = res));
  ws.onmessage = (ev) => {
    const m = JSON.parse(ev.data);
    if (m.id && pending.has(m.id)) {
      const { resolve, reject } = pending.get(m.id); pending.delete(m.id);
      m.error ? reject(new Error(JSON.stringify(m.error))) : resolve(m.result);
    }
  };
  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const myId = ++id; pending.set(myId, { resolve, reject });
    ws.send(JSON.stringify({ id: myId, method, params }));
  });
  return { ready, send, ws };
}
const evalJs = (c, expression) =>
  c.send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true })
    .then((r) => r.result.value);
async function shoot(c, path) {
  const { data } = await c.send("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
  writeFileSync(path, Buffer.from(data, "base64"));
}
async function setViewport(c, w, h) {
  await c.send("Emulation.setDeviceMetricsOverride", { width: w, height: h, deviceScaleFactor: 1, mobile: false });
}

// The marquee container is the first child div of #tech after the heading.
const widthExpr = `(() => {
  const tech = document.querySelector('#tech');
  if (!tech) return null;
  // The LogoCloud root is the div that holds the slider (.flex.w-max).
  const slider = tech.querySelector('.flex.w-max');
  if (!slider) return null;
  const root = slider.closest('#tech > div, #tech > section') || slider.parentElement.parentElement.parentElement;
  const r = root.getBoundingClientRect();
  return { left: Math.round(r.left), right: Math.round(r.right), width: Math.round(r.width) };
})()`;

(async () => {
  const c = makeClient(await getWsUrl());
  await c.ready;
  await c.send("Page.enable");
  await c.send("Runtime.enable");

  async function measure(vw, vh, label, file) {
    await setViewport(c, vw, vh);
    await sleep(300);
    let ok = false;
    for (let i = 0; i < 40; i++) { if (await evalJs(c, `!!document.querySelector('#tech .flex.w-max')`)) { ok = true; break; } await sleep(200); }
    if (!ok) throw new Error("#tech slider never mounted at " + label);
    await evalJs(c, `document.querySelector('#tech').scrollIntoView({block:'center'}); true`);
    await sleep(1200);
    const box = await evalJs(c, widthExpr);
    // Full-bleed = container width within a few px of the viewport, left ~0.
    const fullWidth = box && box.width >= vw - 4 && box.left <= 2 && box.right >= vw - 2;
    console.log(`[${label}] viewport=${vw} container=${JSON.stringify(box)} -> full-width=${fullWidth}`);
    await shoot(c, `${OUT}/${file}`);
    return fullWidth;
  }

  const desktop = await measure(1440, 900, "desktop-1440", "FW-1440.png");
  const wide = await measure(1920, 900, "wide-1920", "FW-1920.png");

  // Logos still load + slider animates (at 1440).
  await setViewport(c, 1440, 900);
  await evalJs(c, `document.querySelector('#tech').scrollIntoView({block:'center'}); true`);
  await sleep(800);
  const loaded = await evalJs(c, `(() => { const imgs=[...document.querySelectorAll('#tech img')]; return { total: imgs.length, ok: imgs.filter(i=>i.complete&&i.naturalWidth>0).length }; })()`);
  function sliderX() { return `(() => { const m=document.querySelector('#tech .flex.w-max'); if(!m) return null; const t=getComputedStyle(m).transform; if(!t||t==='none') return 0; const mm=t.match(/matrix\\(([^)]+)\\)/); return mm?Number(mm[1].split(',')[4]):null; })()`; }
  const x1 = await evalJs(c, sliderX()); await sleep(1000); const x2 = await evalJs(c, sliderX());
  const animating = x1 !== null && x2 !== null && Math.abs(x1 - x2) > 1;
  console.log("logos loaded:", JSON.stringify(loaded), "| slider animating:", animating);

  console.log("RESULT full-width-desktop =", desktop, "| full-width-wide =", wide, "| logos-loaded =", loaded.ok >= 10, "| animating =", animating);
  c.ws.close();
  process.exit(desktop && wide && loaded.ok >= 10 && animating ? 0 : 2);
})().catch((e) => { console.error("DRIVER ERROR:", e.message); process.exit(1); });
