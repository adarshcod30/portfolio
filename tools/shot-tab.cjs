/**
 * Capture a screenshot of one tab inside a live app.
 *
 * tools/shots.cjs only ever sees a product's landing state. Some of them keep
 * the interesting view behind a tab, so this opens the page, clicks the named
 * control, waits for it to settle, and writes over that project's shot.
 *
 * Note for Hugging Face: a static Space is served from
 * <owner>-<space>.static.hf.space, not <owner>-<space>.hf.space, which 404s.
 *
 * Run: SLUG=margadrishti URL=https://adarshcod30-margadrishti.static.hf.space \
 *      TAB="Hotspot Map" node tools/shot-tab.cjs
 */
const { chromium } = require('/Users/adarsh/.npm/_npx/9833c18b2d85bc59/node_modules/playwright');
const path = require('path');
const SLUG = process.env.SLUG || 'margadrishti';
const OUT = path.join(path.dirname(__dirname), 'public', 'shots', `${SLUG}.jpg`);
const URL = process.env.URL || 'https://adarshcod30-margadrishti.hf.space';
const TAB = process.env.TAB || 'Hotspot Map';

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1.5, colorScheme: 'light' });
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(Number(process.env.WAIT || 20000));

  const wake = page.getByRole('button', { name: /get this app back up|restart this space/i });
  if (await wake.count()) { console.log('waking...'); await wake.first().click(); await page.waitForTimeout(60000); }

  // report what is on the page so a miss is obvious rather than silent
  const labels = await page.evaluate(() =>
    [...document.querySelectorAll('button,[role="tab"],a')]
      .map(e => e.textContent.trim()).filter(t => t && t.length < 40).slice(0, 40));
  console.log('controls:', JSON.stringify(labels));

  let clicked = false;
  for (const loc of [page.getByRole('tab', { name: new RegExp(TAB, 'i') }),
                     page.getByRole('button', { name: new RegExp(TAB, 'i') }),
                     page.getByText(new RegExp(`^\\s*${TAB}\\s*$`, 'i'))]) {
    if (await loc.count()) { await loc.first().click(); clicked = true; break; }
  }
  console.log(clicked ? `clicked "${TAB}"` : `DID NOT FIND "${TAB}"`);
  await page.waitForTimeout(Number(process.env.AFTER || 14000));

  await page.screenshot({ path: OUT, type: 'jpeg', quality: 76 });
  console.log('wrote', OUT, (require('fs').statSync(OUT).size / 1024).toFixed(0) + ' KB');
  await browser.close();
})();
