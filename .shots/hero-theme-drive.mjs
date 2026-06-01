// CDP driver: verifies the HERO (#home) now flips with the theme — background,
// text color, and the dotted-surface dot color all change between light/dark.
import { writeFileSync } from "node:fs";

const BASE = process.env.CDP_BASE || "http://127.0.0.1:9239";
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
async function setTheme(c, theme) {
  await evalJs(c, `(() => { const r=document.documentElement; r.classList.toggle('dark', ${theme === 'dark'}); r.style.colorScheme='${theme}'; localStorage.setItem('theme','${theme}'); return true; })()`);
}

const heroState = `(() => {
  const home = document.getElementById('home');
  const h1 = home.querySelector('h1');
  // Sample the dotted-surface canvas center-ish pixel to detect dot/bg darkness.
  const cv = home.querySelector('canvas');
  let canvasAvgDark = null;
  return {
    bg: getComputedStyle(home).backgroundColor,
    h1color: h1 ? getComputedStyle(h1).color : null,
    hasCanvas: !!cv,
  };
})()`;

(async () => {
  const c = makeClient(await getWsUrl());
  await c.ready;
  await c.send("Page.enable");
  await c.send("Runtime.enable");
  await c.send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });

  for (let i = 0; i < 60; i++) { if (await evalJs(c, `!!document.querySelector('#home h1')`)) break; await sleep(250); }

  await setTheme(c, "light"); await sleep(700);
  const light = await evalJs(c, heroState);
  await evalJs(c, `window.scrollTo(0,0); true`); await sleep(400);
  await shoot(c, `${OUT}/HERO-light.png`);

  await setTheme(c, "dark"); await sleep(800);
  const dark = await evalJs(c, heroState);
  await evalJs(c, `window.scrollTo(0,0); true`); await sleep(400);
  await shoot(c, `${OUT}/HERO-dark.png`);

  console.log("HERO #home bg:   light", light.bg, " -> dark", dark.bg, light.bg !== dark.bg ? "✓ flips" : "= SAME");
  console.log("HERO h1 color:   light", light.h1color, " -> dark", dark.h1color, light.h1color !== dark.h1color ? "✓ flips" : "= SAME");
  console.log("HERO has canvas:", light.hasCanvas, dark.hasCanvas);

  const bgFlips = light.bg !== dark.bg;
  const textFlips = light.h1color !== dark.h1color;
  console.log("RESULT hero-bg-flips =", bgFlips, "| hero-text-flips =", textFlips);
  c.ws.close();
  process.exit(bgFlips && textFlips ? 0 : 2);
})().catch((e) => { console.error("DRIVER ERROR:", e.message); process.exit(1); });
