// CDP driver: verifies the marquee now has NO border lines and NO gradient
// background (clean), logos still loaded, and the slider loops continuously
// (translateX keeps moving and wraps within the half-content range).
import { writeFileSync } from "node:fs";

const BASE = process.env.CDP_BASE || "http://127.0.0.1:9233";
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

(async () => {
  const c = makeClient(await getWsUrl());
  await c.ready;
  await c.send("Page.enable");
  await c.send("Runtime.enable");
  await c.send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });

  let ok = false;
  for (let i = 0; i < 60; i++) { if (await evalJs(c, `!!document.querySelector('#tech .flex.w-max')`)) { ok = true; break; } await sleep(250); }
  if (!ok) throw new Error("#tech slider never mounted");

  await evalJs(c, `document.querySelector('#tech').scrollIntoView({block:'center'}); true`);
  await sleep(1200);

  // (1) No border lines inside #tech (the old border-t / border-b divs).
  const borderEls = await evalJs(c, `document.querySelectorAll('#tech .border-t, #tech .border-b').length`);
  // (2) The LogoCloud root must NOT have a gradient/secondary background.
  const bgInfo = await evalJs(c, `(() => {
    const slider = document.querySelector('#tech .flex.w-max');
    const root = slider.parentElement.parentElement; // overflow div -> LogoCloud root
    const cs = getComputedStyle(root);
    return { backgroundImage: cs.backgroundImage, backgroundColor: cs.backgroundColor, className: root.className };
  })()`);
  const hasGradient = /gradient/i.test(bgInfo.backgroundImage || "");
  const hasSecondaryClass = /bg-(secondary|linear)/.test(bgInfo.className || "");

  // (3) Logos loaded.
  const loaded = await evalJs(c, `(() => { const i=[...document.querySelectorAll('#tech img')]; return { total:i.length, ok:i.filter(x=>x.complete&&x.naturalWidth>0).length }; })()`);

  // (4) Loop: sample translateX over time. Should keep moving and stay within
  // [-(halfWidth+gap), 0] approx — i.e., never jump to a wildly different value.
  function trackInfo() {
    return `(() => {
      const m = document.querySelector('#tech .flex.w-max');
      if (!m) return null;
      const t = getComputedStyle(m).transform;
      const fullW = m.getBoundingClientRect().width; // both copies
      let x = 0;
      if (t && t !== 'none') { const mm = t.match(/matrix\\(([^)]+)\\)/); if (mm) x = Number(mm[1].split(',')[4]); }
      return { x: Math.round(x), halfW: Math.round(fullW / 2) };
    })()`;
  }
  const samples = [];
  for (let i = 0; i < 6; i++) {
    samples.push(await evalJs(c, trackInfo()));
    await sleep(500);
  }
  const xs = samples.map((s) => s.x);
  const halfW = samples[0].halfW;
  // Continuously moving: at least 4 of 5 consecutive deltas are nonzero.
  let moving = 0;
  for (let i = 1; i < xs.length; i++) if (Math.abs(xs[i] - xs[i - 1]) > 0.5) moving++;
  const continuous = moving >= 4;
  // Within wrap range: every x within [-(halfW+60), 60] (small slack).
  const inRange = xs.every((x) => x <= 60 && x >= -(halfW + 60));

  console.log("Border line elements in #tech:", borderEls, "(expect 0)");
  console.log("Root bg:", JSON.stringify(bgInfo.backgroundImage), "| hasGradient:", hasGradient, "| hasSecondaryClass:", hasSecondaryClass);
  console.log("Logos loaded:", JSON.stringify(loaded));
  console.log("translateX samples:", JSON.stringify(xs), "| halfW:", halfW, "| continuous:", continuous, "| inRange:", inRange);

  await shoot(c, `${OUT}/LP-clean.png`);

  const cleanBg = borderEls === 0 && !hasGradient && !hasSecondaryClass;
  const logosOk = loaded.ok >= 10;
  console.log("RESULT clean-bg-no-border =", cleanBg, "| logos-loaded =", logosOk, "| loops-continuously =", continuous && inRange);
  c.ws.close();
  process.exit(cleanBg && logosOk && continuous && inRange ? 0 : 2);
})().catch((e) => { console.error("DRIVER ERROR:", e.message); process.exit(1); });
