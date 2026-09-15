/**
 * Capture a screenshot of every project that has a live deployment.
 *
 * Case studies made of text alone read flat. These are real captures of the
 * running product, taken at a fixed viewport so the grid stays even, and
 * written straight into public/shots.
 *
 * Run: node tools/shots.cjs [slug ...]
 */
const { chromium } = require('/Users/adarsh/.npm/_npx/9833c18b2d85bc59/node_modules/playwright');
const fs = require('fs');
const path = require('path');

const ROOT = path.dirname(__dirname);
const OUT = path.join(ROOT, 'public', 'shots');
const SRC = path.join(ROOT, 'src', 'content', 'projects.generated.ts');

// pull slug/live pairs straight out of the generated content
const text = fs.readFileSync(SRC, 'utf8');
const items = [];
const re = /slug:\s*`([^`]+)`[\s\S]*?live:\s*`([^`]*)`/g;
let m;
while ((m = re.exec(text))) if (m[2]) items.push({ slug: m[1], url: m[2] });

(async () => {
  const only = process.argv.slice(2);
  const todo = items.filter((i) => !only.length || only.includes(i.slug));
  fs.mkdirSync(OUT, { recursive: true });

  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1.5,
    colorScheme: 'light',
  });
  const page = await ctx.newPage();

  for (const { slug, url } of todo) {
    const dest = path.join(OUT, `${slug}.jpg`);
    try {
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
      // let fonts, charts and lazy images settle; networkidle never fires on
      // pages that poll, so cap the wait instead of depending on it
      await page.waitForTimeout(Number(process.env.WAIT || 6500)); // Streamlit needs far longer to hydrate: WAIT=25000

      // Streamlit Community Cloud sleeps free apps after about a week idle and
      // serves a "Zzzz" page. Wake it and wait for the real app rather than
      // shipping a screenshot of the sleep notice.
      const wake = page.getByRole('button', { name: /get this app back up/i });
      if (await wake.count()) {
        await wake.first().click();
        await page.waitForTimeout(60000);
      }
      await page.screenshot({ path: dest, type: 'jpeg', quality: 76 });
      const kb = (fs.statSync(dest).size / 1024).toFixed(0);
      console.log(`  ok    ${slug.padEnd(16)} ${kb} KB   ${url}`);
    } catch (e) {
      console.log(`  FAIL  ${slug.padEnd(16)} ${String(e.message).slice(0, 70)}`);
    }
  }

  await browser.close();
  console.log('DONE');
})();
