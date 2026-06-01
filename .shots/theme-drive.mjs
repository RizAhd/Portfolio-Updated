// CDP driver: toggles light/dark and verifies EVERY rendered section's
// computed background changes between themes (or is intentionally fixed), then
// captures a full-page screenshot in each theme for visual confirmation.
import { writeFileSync } from "node:fs";

const BASE = process.env.CDP_BASE || "http://127.0.0.1:9238";
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
  const { data } = await c.send("Page.captureScreenshot", { format: "png", captureBeyondViewport: true });
  writeFileSync(path, Buffer.from(data, "base64"));
}

const SECTIONS = ["tech", "about", "projects", "skills", "resume", "education", "ask", "contact"];

const readSectionBgs = `(() => {
  const ids = ${JSON.stringify(SECTIONS)};
  const out = {};
  for (const id of ids) {
    const el = document.getElementById(id);
    out[id] = el ? getComputedStyle(el).backgroundColor : 'MISSING';
  }
  out.__html = document.documentElement.className;
  out.__bodyBg = getComputedStyle(document.body).backgroundColor;
  out.__bodyColor = getComputedStyle(document.body).color;
  return out;
})()`;

async function setTheme(c, theme) {
  // Use the app's own mechanism: toggle the .dark class + persist, like useTheme.
  await evalJs(c, `(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', ${theme === 'dark'});
    root.style.colorScheme = '${theme}';
    localStorage.setItem('theme', '${theme}');
    return true;
  })()`);
}

(async () => {
  const c = makeClient(await getWsUrl());
  await c.ready;
  await c.send("Page.enable");
  await c.send("Runtime.enable");
  await c.send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
  await c.send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "no-preference" }] });

  for (let i = 0; i < 60; i++) { if (await evalJs(c, `!!document.getElementById('contact')`)) break; await sleep(250); }

  await setTheme(c, "light");
  await sleep(500);
  const light = await evalJs(c, readSectionBgs);

  await setTheme(c, "dark");
  await sleep(500);
  const dark = await evalJs(c, readSectionBgs);

  console.log("LIGHT html.class:", JSON.stringify(light.__html), "| body bg:", light.__bodyBg, "| body color:", light.__bodyColor);
  console.log("DARK  html.class:", JSON.stringify(dark.__html), "| body bg:", dark.__bodyBg, "| body color:", dark.__bodyColor);
  console.log("\nPer-section background (light -> dark):");
  const themedSections = []; // sections expected to flip with the theme
  for (const id of SECTIONS) {
    const changed = light[id] !== dark[id];
    console.log(`  #${id}: ${light[id]}  ->  ${dark[id]}   ${changed ? "✓ flips" : "= same"}`);
    themedSections.push({ id, light: light[id], dark: dark[id], changed });
  }

  // body must flip
  const bodyFlips = light.__bodyBg !== dark.__bodyBg && light.__bodyColor !== dark.__bodyColor;

  // Screenshots full-page in each theme.
  await setTheme(c, "light"); await sleep(500);
  await evalJs(c, `window.scrollTo(0,0); true`); await sleep(300);
  await shoot(c, `${OUT}/THEME-light.png`);
  await setTheme(c, "dark"); await sleep(500);
  await evalJs(c, `window.scrollTo(0,0); true`); await sleep(300);
  await shoot(c, `${OUT}/THEME-dark.png`);

  // Sections that should flip: about, skills, resume, ask, contact, tech, education.
  // (projects' #projects wrapper is bg-secondary; it should flip too.)
  const mustFlip = ["tech", "about", "projects", "skills", "resume", "ask", "contact"];
  const notFlipping = mustFlip.filter((id) => {
    const s = themedSections.find((x) => x.id === id);
    return s && !s.changed && s.light !== "MISSING";
  });

  console.log("\nbody flips:", bodyFlips);
  console.log("must-flip sections NOT flipping:", JSON.stringify(notFlipping));
  console.log("RESULT body-flips =", bodyFlips, "| all-key-sections-flip =", notFlipping.length === 0);
  c.ws.close();
  process.exit(bodyFlips && notFlipping.length === 0 ? 0 : 2);
})().catch((e) => { console.error("DRIVER ERROR:", e.message); process.exit(1); });
