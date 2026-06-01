// CDP driver: verifies (1) typography changed site-wide to Space Grotesk,
// (2) the orbit StackFeatureSection renders in About with REAL data (bio,
// initials, real tech-stack chips, GitHub CTA) and orbits animate,
// (3) no prompt "RUIXEN" content leaks.
import { writeFileSync } from "node:fs";

const BASE = process.env.CDP_BASE || "http://127.0.0.1:9230";
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
    ok = await evalJs(c, `!!document.querySelector('#about')`);
    if (ok) break;
    await sleep(250);
  }
  if (!ok) throw new Error("#about never mounted");

  // (1) Typography: computed font-family on body + a heading should include Space Grotesk.
  const bodyFont = await evalJs(c, `getComputedStyle(document.body).fontFamily`);
  const headingFont = await evalJs(c, `(() => { const h = document.querySelector('#about h2'); return h ? getComputedStyle(h).fontFamily : ''; })()`);
  const heroFont = await evalJs(c, `(() => { const h = document.querySelector('#home h1'); return h ? getComputedStyle(h).fontFamily : ''; })()`);

  // (2) Orbit feature in About.
  await evalJs(c, `document.querySelector('#about').scrollIntoView(); true`);
  await sleep(600);
  const aboutText = await evalJs(c, `document.querySelector('#about').innerText`);
  const hasHeading = /Build with me/i.test(aboutText);
  const hasGithubCta = await evalJs(c, `!!document.querySelector('#about a[href="https://github.com/RizAhd"]')`);
  const centerLabel = await evalJs(c, `(() => {
    const hub = Array.from(document.querySelectorAll('#about div')).find(d => d.textContent.trim() === 'RM' && d.className.includes('rounded-full'));
    return hub ? hub.textContent.trim() : null;
  })()`);
  // Real tech-stack chips present in orbit?
  const expectChips = ["Java", "React", "Machine Learning", "MySQL", "WebSocket", "n8n", "IoT Basics"];
  const foundChips = expectChips.filter((s) => aboutText.includes(s));
  // Real bio still present (existing About content untouched).
  const bioStillThere = aboutText.includes("Aspiring Software Engineering") || aboutText.includes("scalable, data-driven");
  // Prompt leak check.
  const leak = ["RUIXEN", "Build your idea", "ruixen.com"].filter((s) => aboutText.includes(s));

  // (3) Orbit animation: the dotted orbit ring has a CSS animation applied.
  const orbitAnimating = await evalJs(c, `(() => {
    const ring = document.querySelector('#about [style*="stack-orbit-spin"]');
    if (!ring) return false;
    const a = getComputedStyle(ring).animationName;
    return a && a !== 'none';
  })()`);

  console.log("FONT body:", JSON.stringify(bodyFont));
  console.log("FONT #about h2:", JSON.stringify(headingFont), "| #home h1:", JSON.stringify(heroFont));
  console.log("Orbit heading 'Build with me':", hasHeading, "| GitHub CTA:", hasGithubCta, "| centerLabel:", JSON.stringify(centerLabel));
  console.log("Real chips found:", JSON.stringify(foundChips), "| bio still present:", bioStillThere);
  console.log("Prompt leak:", JSON.stringify(leak), "| orbit animating:", orbitAnimating);

  await shoot(c, `${OUT}/AB-about.png`);

  const fontOk = /Space Grotesk/i.test(bodyFont) && /Space Grotesk/i.test(headingFont) && /Space Grotesk/i.test(heroFont);
  const featureOk = hasHeading && hasGithubCta && centerLabel === "RM" && foundChips.length >= 5 && bioStillThere;
  const noLeak = leak.length === 0;

  console.log("RESULT typography-changed =", fontOk, "| orbit-feature-real-data =", featureOk, "| no-leak =", noLeak, "| animating =", orbitAnimating);
  c.ws.close();
  process.exit(fontOk && featureOk && noLeak ? 0 : 2);
})().catch((e) => { console.error("DRIVER ERROR:", e.message); process.exit(1); });
