// CDP driver: verifies the Skills section now uses the auto-scrolling columns
// with the REAL skillGroups data (not the prompt's ERP testimonials), and that
// the marquee animates (translateY changes over time).
import { writeFileSync } from "node:fs";

const BASE = process.env.CDP_BASE || "http://127.0.0.1:9229";
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

  // Wait for Skills marquee cards.
  let ok = false;
  for (let i = 0; i < 60; i++) {
    ok = await evalJs(c, `!!document.querySelector('#skills .rounded-3xl')`);
    if (ok) break;
    await sleep(250);
  }
  if (!ok) throw new Error("#skills marquee cards never mounted");

  const skillsText = await evalJs(c, `document.querySelector('#skills').innerText`);
  const expectCategories = [
    "Programming Languages", "Frameworks & Libraries", "AI & Data Science",
    "Databases & Tools", "Real-Time & Networking", "AI Automation", "Other Skills",
  ];
  const foundCategories = expectCategories.filter((s) => skillsText.includes(s));
  // Real skill items should appear in card bodies.
  const expectItems = ["TypeScript", "React Native", "Pinecone", "Zapier", "WebSocket", "MySQL"];
  const foundItems = expectItems.filter((s) => skillsText.includes(s));
  // The prompt's testimonial data must NOT appear.
  const promptLeak = ["Briana Patton", "Operations Manager", "ERP", "randomuser.me"].filter((s) => skillsText.includes(s) || document);
  const leak = ["Briana Patton", "Operations Manager", "this ERP", "randomuser"].filter((s) => skillsText.toLowerCase().includes(s.toLowerCase()));
  const hasAvatarImg = await evalJs(c, `!!document.querySelector('#skills img[src*="randomuser"]')`);

  console.log("Categories found:", JSON.stringify(foundCategories));
  console.log("Skill items found:", JSON.stringify(foundItems));
  console.log("Prompt-testimonial leak strings:", JSON.stringify(leak), "| randomuser img:", hasAvatarImg);

  // Marquee animation: sample the translateY of an inner scrolling track twice.
  function trackY() {
    return `(() => {
      const col = document.querySelector('#skills .max-h-\\\\[740px\\\\] > div, #skills .overflow-hidden > div');
      // The animated element is the motion.div inside each column.
      const inner = document.querySelector('#skills .overflow-hidden .flex.flex-col.gap-6');
      if (!inner) return null;
      const t = getComputedStyle(inner).transform;
      if (!t || t === 'none') return 0;
      const m = t.match(/matrix\\(([^)]+)\\)/);
      if (!m) return null;
      return Number(m[1].split(',')[5]); // translateY
    })()`;
  }
  await evalJs(c, `document.querySelector('#skills').scrollIntoView({block:'center'}); true`);
  await sleep(500);
  const y1 = await evalJs(c, trackY());
  await sleep(1200);
  const y2 = await evalJs(c, trackY());
  const animating = y1 !== null && y2 !== null && Math.abs(y1 - y2) > 1;
  console.log("translateY samples:", y1, "->", y2, "| animating:", animating);

  await shoot(c, `${OUT}/SK-marquee.png`);

  const realData = foundCategories.length >= 6 && foundItems.length >= 4;
  const noLeak = leak.length === 0 && !hasAvatarImg;
  console.log("RESULT real-data =", realData, "| no-prompt-leak =", noLeak, "| marquee-animating =", animating);
  c.ws.close();
  process.exit(realData && noLeak && animating ? 0 : 2);
})().catch((e) => { console.error("DRIVER ERROR:", e.message); process.exit(1); });
