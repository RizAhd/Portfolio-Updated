// CDP driver: verifies (1) font swapped to Plus Jakarta Sans site-wide,
// (2) sticky glass navbar present with backdrop-blur + animated underline,
// (3) mobile hamburger menu works, (4) no horizontal overflow at phone/tablet/
// desktop widths. Captures screenshots at each viewport.
import { writeFileSync } from "node:fs";

const BASE = process.env.CDP_BASE || "http://127.0.0.1:9247";
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
async function setVp(c, w, h) {
  await c.send("Emulation.setDeviceMetricsOverride", { width: w, height: h, deviceScaleFactor: 1, mobile: w < 768 });
}

(async () => {
  const c = makeClient(await getWsUrl());
  await c.ready;
  await c.send("Page.enable");
  await c.send("Runtime.enable");
  await c.send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "no-preference" }] });

  await setVp(c, 1440, 900);
  for (let i = 0; i < 60; i++) { if (await evalJs(c, `!!document.querySelector('header nav')`)) break; await sleep(200); }

  // (1) Font
  const bodyFont = await evalJs(c, `getComputedStyle(document.body).fontFamily`);

  // (2) Glass navbar: backdrop-filter blur + present
  const nav = await evalJs(c, `(() => {
    const n = document.querySelector('header nav');
    if (!n) return null;
    const cs = getComputedStyle(n);
    return { backdrop: cs.backdropFilter || cs.webkitBackdropFilter, position: getComputedStyle(n.closest('header')).position };
  })()`);
  // Animated underline element present under each desktop link
  const underlineCount = await evalJs(c, `document.querySelectorAll('header nav ul a > span').length`);
  const navLinkCount = await evalJs(c, `document.querySelectorAll('header nav ul a').length`);

  // Helper: horizontal overflow check (scrollWidth vs clientWidth)
  const overflowAt = async (w, h, label, file) => {
    await setVp(c, w, h); await sleep(500);
    await evalJs(c, `window.scrollTo(0,0); true`); await sleep(300);
    const over = await evalJs(c, `Math.max(0, document.documentElement.scrollWidth - window.innerWidth)`);
    await shoot(c, `${OUT}/${file}`);
    console.log(`[${label}] viewport ${w}px -> horizontal overflow: ${over}px ${over <= 1 ? 'OK' : 'OVERFLOW!'}`);
    return over <= 1;
  };

  console.log("FONT body:", JSON.stringify(bodyFont), /Jakarta/i.test(bodyFont) ? "✓ Jakarta" : "✗");
  console.log("NAV:", JSON.stringify(nav), "| desktop links:", navLinkCount, "| underline spans:", underlineCount);

  // Desktop overflow + screenshot
  const okDesktop = await overflowAt(1440, 900, "desktop", "NAV-desktop.png");
  // Tablet
  const okTablet = await overflowAt(820, 1180, "tablet", "NAV-tablet.png");
  // Mobile (no menu)
  const okMobile = await overflowAt(375, 812, "mobile", "NAV-mobile.png");

  // (3) Mobile hamburger: at 375, the hamburger button should be visible; click → menu opens with links
  await setVp(c, 375, 812); await sleep(400);
  const hamburgerVisible = await evalJs(c, `(() => { const b = document.querySelector('header button[aria-label*="menu" i]'); return b ? getComputedStyle(b).display !== 'none' : false; })()`);
  await evalJs(c, `(() => { const b = document.querySelector('header button[aria-label*="menu" i]'); if (b) b.click(); return true; })()`);
  await sleep(500);
  const menuOpen = await evalJs(c, `document.querySelectorAll('.fixed.inset-0 a, [class*="backdrop-blur"] a').length`);
  const menuLinks = await evalJs(c, `(() => {
    // count link items in the opened overlay
    const overlay = Array.from(document.querySelectorAll('div')).find(d => d.className.includes('inset-0') && d.querySelectorAll('a').length >= 5 && getComputedStyle(d).position === 'fixed');
    return overlay ? overlay.querySelectorAll('a').length : 0;
  })()`);
  await shoot(c, `${OUT}/NAV-mobile-menu.png`);
  console.log("MOBILE hamburger visible:", hamburgerVisible, "| menu links after click:", menuLinks);

  const allOk = /Jakarta/i.test(bodyFont) && nav && /blur/.test(nav.backdrop || "") && nav.position === "fixed"
    && underlineCount >= 5 && okDesktop && okTablet && okMobile && hamburgerVisible && menuLinks >= 5;
  console.log("RESULT font-ok =", /Jakarta/i.test(bodyFont), "| glass-nav =", !!(nav && /blur/.test(nav.backdrop||'')), "| underline =", underlineCount>=5, "| no-overflow =", okDesktop&&okTablet&&okMobile, "| hamburger-works =", hamburgerVisible && menuLinks>=5);
  c.ws.close();
  process.exit(allOk ? 0 : 2);
})().catch((e) => { console.error("DRIVER ERROR:", e.message); process.exit(1); });
