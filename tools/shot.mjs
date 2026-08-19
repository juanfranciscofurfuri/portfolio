import { chromium } from 'playwright-core';

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const url = process.argv[2] ?? 'http://localhost:4321/';
const name = process.argv[3] ?? 'page';
const sizes = [
  { w: 1440, h: 900, tag: 'desktop' },
  { w: 768, h: 1024, tag: 'tablet' },
  { w: 390, h: 844, tag: 'mobile' },
];

const browser = await chromium.launch({ executablePath: CHROME });
for (const s of sizes) {
  const ctx = await browser.newContext({ viewport: { width: s.w, height: s.h }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  const errors = [];
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  page.on('pageerror', (e) => errors.push(String(e)));
  await page.goto(url, { waitUntil: 'networkidle' });
  // Walk down the page so every scroll-reveal section actually intersects.
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.7;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
  });
  await page.waitForTimeout(900);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
  await page.screenshot({ path: `shots/${name}-${s.tag}.png` });
  await page.screenshot({ path: `shots/${name}-${s.tag}-full.png`, fullPage: true });
  if (errors.length) console.log(`[${s.tag}] console errors:`, errors);
  await ctx.close();
}
await browser.close();
console.log('shots written');
