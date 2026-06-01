// CDP driver: verifies the marquee is FULL from the first frame (no empty/
// offset start), the CSS keyframe animation is applied, and it moves
// continuously. Also confirms the track has 2 copies that together overflow
// the viewport (so the loop is always full).
import { writeFileSync } from "node:fs";

const BASE = process.env.CDP_BASE || "http://127.0.0.1:9234";
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
  // Normal users default to no-preference; headless defaults to reduce, which
  // our a11y rule intentionally honors. Emulate a normal user for this check.
  await c.send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "no-preference" }] });

  // Wait for the track (the animated flex.w-max).
  let ok = false;
  for (let i = 0; i < 60; i++) { if (await evalJs(c, `!!document.querySelector('#tech .w-max')`)) { ok = true; break; } await sleep(150); }
  if (!ok) throw new Error("#tech track never mounted");

  await evalJs(c, `document.querySelector('#tech').scrollIntoView({block:'center'}); true`);
  // Minimal wait — we want to confirm it's full ASAP, not after a long settle.
  await sleep(250);

  // Track structure: 2 copies, each holding all the logos.
  const struct = await evalJs(c, `(() => {
    const track = document.querySelector('#tech .w-max');
    const copies = track ? track.children.length : 0;
    const imgsPerCopy = track && track.children[0] ? track.children[0].querySelectorAll('img').length : 0;
    const totalImgs = track ? track.querySelectorAll('img').length : 0;
    return { copies, imgsPerCopy, totalImgs };
  })()`);

  // Animation applied?
  const animInfo = await evalJs(c, `(() => {
    const track = document.querySelector('#tech .w-max');
    const cs = getComputedStyle(track);
    return { name: cs.animationName, duration: cs.animationDuration, iter: cs.animationIterationCount };
  })()`);

  // "Full from first frame": the track width must exceed the viewport width so
  // logos fill the whole strip with no empty start gap. Also count how many
  // logo images are actually within the viewport horizontally right now.
  const fill = await evalJs(c, `(() => {
    const track = document.querySelector('#tech .w-max');
    const vw = window.innerWidth;
    const trackW = track.getBoundingClientRect().width;
    const imgs = [...document.querySelectorAll('#tech img')];
    const inView = imgs.filter(i => { const r = i.getBoundingClientRect(); return r.right > 0 && r.left < vw && r.width > 0; }).length;
    // Leftmost visible logo's left edge — should be near/left of 0 (no big empty gap at start).
    const lefts = imgs.map(i => i.getBoundingClientRect().left).filter(x => x < vw);
    const minLeft = Math.round(Math.min(...lefts));
    return { vw, trackW: Math.round(trackW), inView, minLeft };
  })()`);

  // Capture an early frame (potential "start" moment).
  await shoot(c, `${OUT}/L2-early.png`);

  // Continuous movement: sample transform translateX several times.
  function tx() {
    return `(() => { const t = getComputedStyle(document.querySelector('#tech .w-max')).transform; if(!t||t==='none') return 0; const m=t.match(/matrix\\(([^)]+)\\)/); return m?Math.round(Number(m[1].split(',')[4])):null; })()`;
  }
  const xs = [];
  for (let i = 0; i < 6; i++) { xs.push(await evalJs(c, tx())); await sleep(400); }
  let moving = 0;
  for (let i = 1; i < xs.length; i++) if (xs[i] !== null && xs[i-1] !== null && Math.abs(xs[i]-xs[i-1]) > 0.5) moving++;
  const continuous = moving >= 4;

  await shoot(c, `${OUT}/L2-later.png`);

  console.log("Track struct:", JSON.stringify(struct));
  console.log("Animation:", JSON.stringify(animInfo));
  console.log("Fill:", JSON.stringify(fill));
  console.log("translateX samples:", JSON.stringify(xs), "| continuous:", continuous);

  const twoCopies = struct.copies === 2 && struct.imgsPerCopy >= 10;
  const animOk = /infinite-slider/.test(animInfo.name) && animInfo.iter === "infinite";
  // Full strip: track wider than viewport AND logos span across viewport AND
  // no large empty gap at the left start (minLeft should be small / negative).
  const fullStrip = fill.trackW > fill.vw && fill.inView >= 8 && fill.minLeft <= 80;

  console.log("RESULT two-copies =", twoCopies, "| animation-applied =", animOk, "| full-no-empty-start =", fullStrip, "| continuous =", continuous);
  c.ws.close();
  process.exit(twoCopies && animOk && fullStrip && continuous ? 0 : 2);
})().catch((e) => { console.error("DRIVER ERROR:", e.message); process.exit(1); });
