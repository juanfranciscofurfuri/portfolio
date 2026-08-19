// Envía el formulario en producción y comprueba el flujo completo.
import { chromium } from 'playwright-core';
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const BASE = process.argv[2];
const PATHNAME = process.argv[3] ?? '/';
const stamp = new Date().toISOString().replace('T', ' ').slice(0, 16);

const browser = await chromium.launch({ executablePath: CHROME });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

// Se registra cada salto: es la única forma de ver a dónde manda Netlify.
const hops = [];
page.on('response', (r) => {
  const s = r.status();
  if (s >= 300 && s < 400) hops.push(`${s} ${r.url()} -> ${r.headers()['location'] ?? ''}`);
});

await page.goto(`${BASE}${PATHNAME}`, { waitUntil: 'networkidle' });
console.log('Formulario de :', page.url());
console.log('action        :', await page.getAttribute('form.form', 'action'));
console.log('name          :', await page.getAttribute('form.form', 'name'));

await page.fill('#name', 'Prueba de formulario');
await page.fill('#email', 'juanfrafurfuri@gmail.com');
await page.fill('#message', `Prueba automatica del ${stamp}. Si lees esto, el formulario llega.`);

await Promise.all([
  page.waitForNavigation({ waitUntil: 'networkidle', timeout: 30000 }),
  page.click('.form__submit'),
]);

console.log('Saltos        :', hops.length ? hops.join(' | ') : '(ninguno)');
console.log('URL final     :', page.url());
console.log('h1            :', (await page.textContent('h1'))?.trim());
console.log('lang del html :', await page.getAttribute('html', 'lang'));
await page.screenshot({ path: 'shots/form-gracias.png' });
await browser.close();
