// CDP driver: verifies the tech marquee renders BEFORE About, shows the real
// programming-language logos (and they actually load, not broken), and the
// infinite slider animates. No prompt logos (Nvidia/Supabase/etc.) appear.
import { writeFileSync } from "node:fs";

const BASE = process.env.CDP_BASE || "http://127.0.0.1:9231";
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
  for (let i = 0; i < 60; i++) {
    ok = await evalJs(c, `!!document.querySelector('#tech')`);
    if (ok) break;
    await sleep(250);
  }
  if (!ok) throw new Error("#tech never mounted");

  // Order: #tech must appear before #about in the DOM.
  const orderOk = await evalJs(c, `(() => {
    const t = document.querySelector('#tech');
    const a = document.querySelector('#about');
    if (!t || !a) return false;
    return (t.compareDocumentPosition(a) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0;
  })()`);

  await evalJs(c, `document.querySelector('#tech').scrollIntoView({block:'center'}); true`);
  await sleep(1500); // give CDN logos time to load

  // Logos present + their alt labels.
  const alts = await evalJs(c, `Array.from(new Set(Array.from(document.querySelectorAll('#tech img')).map(i => i.alt)))`);
  // Are they actually loaded (naturalWidth > 0) and from devicon (your data, not prompt)?
  const loaded = await evalJs(c, `(() => {
    const imgs = Array.from(document.querySelectorAll('#tech img'));
    const total = imgs.length;
    const ok = imgs.filter(i => i.complete && i.naturalWidth > 0).length;
    const devicon = imgs.filter(i => /devicons\\/devicon/.test(i.src)).length;
    const promptLeak = imgs.filter(i => /svgl\\.app|nvidia|supabase|vercel|clerk/i.test(i.src)).length;
    return { total, ok, devicon, promptLeak };
  })()`);

  console.log("Order #tech-before-#about:", orderOk);
  console.log("Logo alts:", JSON.stringify(alts));
  console.log("Logo load stats:", JSON.stringify(loaded));

  // Slider animation: the inner motion.div has an x transform that changes.
  function sliderX() {
    return `(() => {
      const m = document.querySelector('#tech .flex.w-max');
      if (!m) return null;
      const t = getComputedStyle(m).transform;
      if (!t || t === 'none') return 0;
      const mm = t.match(/matrix\\(([^)]+)\\)/);
      if (!mm) return null;
      return Number(mm[1].split(',')[4]); // translateX
    })()`;
  }
  const x1 = await evalJs(c, sliderX());
  await sleep(1200);
  const x2 = await evalJs(c, sliderX());
  const animating = x1 !== null && x2 !== null && Math.abs(x1 - x2) > 1;
  console.log("slider translateX:", x1, "->", x2, "| animating:", animating);

  await shoot(c, `${OUT}/TM-marquee.png`);

  const expectLangs = ["Java", "JavaScript", "TypeScript", "Python", "PHP", "React", "MySQL"];
  const foundLangs = expectLangs.filter((l) => alts.includes(l));
  const realData = foundLangs.length >= 6 && loaded.devicon >= 10 && loaded.promptLeak === 0;
  const logosLoaded = loaded.ok >= 10; // most loaded (CDN)
  console.log("RESULT order-ok =", orderOk, "| real-lang-logos =", realData, "| logos-loaded =", logosLoaded, "| animating =", animating);

  c.ws.close();
  process.exit(orderOk && realData && animating ? 0 : 2);
})().catch((e) => { console.error("DRIVER ERROR:", e.message); process.exit(1); });
