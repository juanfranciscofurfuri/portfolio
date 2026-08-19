import { chromium } from 'playwright-core';
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const urls = process.argv.slice(2);
const browser = await chromium.launch({ executablePath: CHROME });
for (const url of urls) {
  for (const w of [1440, 768, 390]) {
    const page = await browser.newPage({ viewport: { width: w, height: 900 } });
    await page.goto(url, { waitUntil: 'networkidle' });
    const r = await page.evaluate(() => {
      const de = document.documentElement;
      const wide = [...document.querySelectorAll('*')]
        .filter((el) => el.getBoundingClientRect().right > de.clientWidth + 1)
        .slice(0, 4)
        .map((el) => el.tagName.toLowerCase() + '.' + (el.className?.toString().split(' ')[0] || ''));
      return { scroll: de.scrollWidth, client: de.clientWidth, wide };
    });
    const bad = r.scroll > r.client + 1;
    console.log(`${w}px  scroll ${r.scroll} / client ${r.client}  ${bad ? 'DESBORDA: ' + r.wide.join(', ') : 'ok'}`);
    await page.close();
  }
}
await browser.close();
