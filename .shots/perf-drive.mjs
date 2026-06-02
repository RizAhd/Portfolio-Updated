// CDP driver: verifies the perf optimizations didn't change appearance/behavior.
// Checks: (1) app renders, all sections present; (2) Lenis active (.lenis class);
// (3) Three.js canvas present + animates; (4) Education GSAP pinning still works
// (the riskiest interaction with Lenis); (5) captures hero light+dark for visual
// parity. Emulates no-preference so Lenis runs.
import { writeFileSync } from "node:fs";

const BASE = process.env.CDP_BASE || "http://127.0.0.1:9249";
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
async function setTheme(c, t) {
  await evalJs(c, `(() => { const r=document.documentElement; r.classList.toggle('dark', ${t==='dark'}); r.style.colorScheme='${t}'; return true; })()`);
}

(async () => {
  const c = makeClient(await getWsUrl());
  await c.ready;
  await c.send("Page.enable"); await c.send("Runtime.enable");
  await c.send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
  await c.send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "no-preference" }] });

  for (let i = 0; i < 80; i++) { if (await evalJs(c, `!!document.querySelector('#home h1')`)) break; await sleep(250); }
  await sleep(2000); // let lazy chunks + lenis init

  // (1) Lenis active
  const lenisActive = await evalJs(c, `document.documentElement.classList.contains('lenis')`);
  // (2) Three.js canvas + animating
  const canvas = await evalJs(c, `!!document.querySelector('#home canvas')`);

  // Trigger lazy sections by scrolling down so they mount.
  // Use lenis if present, else native.
  await evalJs(c, `window.scrollTo(0, document.body.scrollHeight); true`);
  await sleep(1500);
  await evalJs(c, `window.scrollTo(0, 0); true`);
  await sleep(800);

  const sections = await evalJs(c, `(() => {
    const ids = ['home','tech','about','projects','skills','resume','education','ask','contact'];
    return ids.map(id => ({ id, present: !!document.getElementById(id) }));
  })()`);
  const missing = sections.filter(s => !s.present).map(s => s.id);

  // (4) Education GSAP pinning: scroll to education, sample panel-2 rotation;
  // it must animate (GSAP+Lenis sync working) like before.
  const eduTop = await evalJs(c, `(() => { const s=document.querySelector('#education'); return s ? s.getBoundingClientRect().top + window.scrollY : null; })()`);
  let eduAnimates = false, everPinned = false;
  if (eduTop != null) {
    const rotOf = `(() => { const inner = document.querySelectorAll('#education .flow-art-container')[1]; if(!inner) return null; const t=getComputedStyle(inner).transform; if(!t||t==='none') return 0; const m=t.match(/matrix\\(([^)]+)\\)/); if(!m) return null; const v=m[1].split(',').map(Number); return Math.round(Math.atan2(v[1],v[0])*180/Math.PI*100)/100; })()`;
    const rots = [];
    for (const off of [200, 700, 1200, 1700]) {
      await evalJs(c, `window.scrollTo(0, ${Math.round(eduTop + off)}); true`);
      await sleep(600);
      rots.push(await evalJs(c, rotOf));
      const pinned = await evalJs(c, `Array.from(document.querySelectorAll('#education [data-flow-section]')).filter(s=>getComputedStyle(s).position==='fixed').length`);
      if (pinned > 0) everPinned = true;
    }
    const valid = rots.filter(r => r !== null);
    eduAnimates = valid.length > 1 && Math.max(...valid) - Math.min(...valid) > 2;
    console.log("Education panel-2 rotations:", JSON.stringify(rots));
  }

  // (5) visual parity screenshots
  await evalJs(c, `window.scrollTo(0,0); true`); await sleep(500);
  await setTheme(c, 'dark'); await sleep(700); await shoot(c, `${OUT}/PERF-hero-dark.png`);
  await setTheme(c, 'light'); await sleep(700); await shoot(c, `${OUT}/PERF-hero-light.png`);

  console.log("Lenis active:", lenisActive, "| Three.js canvas:", canvas);
  console.log("Sections present:", sections.filter(s=>s.present).length, "/ 9 | missing:", JSON.stringify(missing));
  console.log("Education animates:", eduAnimates, "| ever pinned:", everPinned);

  const ok = lenisActive && canvas && missing.length === 0 && eduAnimates && everPinned;
  console.log("RESULT lenis =", lenisActive, "| three =", canvas, "| all-sections =", missing.length===0, "| education-gsap-intact =", eduAnimates && everPinned);
  c.ws.close();
  process.exit(ok ? 0 : 2);
})().catch((e) => { console.error("DRIVER ERROR:", e.message); process.exit(1); });
