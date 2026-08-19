import { chromium } from 'playwright-core';
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const [url, sel, out, w = 1440] = process.argv.slice(2);
const browser = await chromium.launch({ executablePath: CHROME });
const page = await browser.newPage({ viewport: { width: Number(w), height: 900 } });
await page.goto(url, { waitUntil: 'networkidle' });
// Bajar de a poco: si se salta, las animaciones de entrada no se disparan y el
// recorte sale en negro.
await page.evaluate(async () => {
  const step = window.innerHeight * 0.7;
  for (let y = 0; y < document.body.scrollHeight; y += step) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 110));
  }
});
await page.waitForTimeout(900);
const el = await page.$(sel);
if (!el) { console.error('no encontrado:', sel); process.exit(1); }
await el.scrollIntoViewIfNeeded();
await page.waitForTimeout(700);
await el.screenshot({ path: out });
console.log('crop', out);
await browser.close();
