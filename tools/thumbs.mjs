import { chromium } from 'playwright-core';
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const jobs = [
  ['http://localhost:4321/demo/vinedo/', 'src/assets/work/demo-vinedo.png'],
  ['http://localhost:4321/demo/estudio/', 'src/assets/work/demo-estudio.png'],
];
const browser = await chromium.launch({ executablePath: CHROME });
const ctx = await browser.newContext({ viewport: { width: 1280, height: 960 }, deviceScaleFactor: 1 });
for (const [url, out] of jobs) {
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: 'networkidle' });
  // Hide the concept banner in the thumbnail: the card already says it is a demo.
  await page.evaluate(() => document.querySelector('.concept')?.remove());
  await page.waitForTimeout(400);
  await page.screenshot({ path: out });
  await page.close();
  console.log('shot', out);
}
await browser.close();
