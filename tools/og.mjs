// Renders the Open Graph card (1200x630) into public/og.png.
// Run with the site's own tokens so the card matches the page it links to.
import { chromium } from 'playwright-core';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const font = (f) =>
  pathToFileURL(path.resolve(`node_modules/@fontsource-variable/${f}`)).href;

const html = `
<!doctype html>
<meta charset="utf-8">
<style>
  @font-face {
    font-family: 'Geist';
    src: url('${font('geist/files/geist-latin-wght-normal.woff2')}') format('woff2');
    font-weight: 100 900;
  }
  @font-face {
    font-family: 'Geist Mono';
    src: url('${font('geist-mono/files/geist-mono-latin-wght-normal.woff2')}') format('woff2');
    font-weight: 100 900;
  }
  * { margin: 0; box-sizing: border-box; }
  body {
    width: 1200px; height: 630px;
    background: #0b0c0e;
    color: #e9ebee;
    font-family: 'Geist', sans-serif;
    display: flex; flex-direction: column; justify-content: space-between;
    padding: 72px;
  }
  .top { display: flex; align-items: center; gap: 14px; }
  .mark {
    font-family: 'Geist Mono', monospace;
    font-size: 20px; color: #eda54a;
    border: 1px solid #2c323a; border-radius: 8px;
    padding: 6px 10px;
  }
  .name { font-size: 24px; font-weight: 500; }
  h1 {
    font-size: 78px; line-height: 1.02; letter-spacing: -0.035em;
    font-weight: 600; max-width: 17ch;
  }
  .rule { width: 96px; height: 3px; background: #eda54a; margin-bottom: 26px; }
  .foot {
    font-family: 'Geist Mono', monospace;
    font-size: 20px; color: #a0a8b2;
    display: flex; gap: 28px;
  }
</style>
<div class="top">
  <span class="mark">JF</span>
  <span class="name">Juan Furfuri</span>
</div>
<div>
  <div class="rule"></div>
  <h1>I build the sites. I also talk to the clients.</h1>
</div>
<div class="foot">
  <span>Web developer</span>
  <span>Mendoza, GMT-3</span>
  <span>English C1</span>
</div>
`;

const browser = await chromium.launch({ executablePath: CHROME });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await page.setContent(html, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: 'public/og.png' });
await browser.close();
console.log('public/og.png written');
