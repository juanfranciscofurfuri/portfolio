import { chromium } from 'playwright-core';
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const [url, sel, out, w = 1440] = process.argv.slice(2);
const browser = await chromium.launch({ executablePath: CHROME });
const page = await browser.newPage({ viewport: { width: Number(w), height: 900 } });
await page.goto(url, { waitUntil: 'networkidle' });
await page.waitForTimeout(600);
const el = await page.$(sel);
if (!el) { console.error('no encontrado:', sel); process.exit(1); }
await el.screenshot({ path: out, scale: 'device' });
console.log('crop', out);
await browser.close();
