// Recorta una franja horizontal alrededor del borde entre dos secciones, para
// mirar si quedó una línea visible.
import { chromium } from 'playwright-core';
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const [url, sel, out] = process.argv.slice(2);
const browser = await chromium.launch({ executablePath: CHROME });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(url, { waitUntil: 'networkidle' });
await page.evaluate(async () => {
  const step = window.innerHeight * 0.7;
  for (let y = 0; y < document.body.scrollHeight; y += step) {
    window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 110));
  }
});
await page.waitForTimeout(800);
const box = await page.evaluate((s) => {
  const el = document.querySelector(s);
  const r = el.getBoundingClientRect();
  return { top: r.top + window.scrollY, height: r.height };
}, sel);
// Franja de 220 px centrada en el borde superior del elemento
const y = Math.max(0, Math.round(box.top - 110));
await page.evaluate((yy) => window.scrollTo(0, yy - 300), y);
await page.waitForTimeout(600);
await page.screenshot({ path: out, clip: { x: 0, y: 0, width: 1440, height: 900 } });
console.log('borde de', sel, '->', out);
await browser.close();
