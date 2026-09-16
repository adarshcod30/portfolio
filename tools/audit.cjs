/**
 * Walk every route in both themes and report real defects.
 *
 * Checks per page: WCAG AA contrast on every text node, horizontal overflow at
 * desktop and phone widths, console errors, and images that failed to load.
 * Spot-checking by screenshot missed a white-on-white block twice, so this runs
 * the whole site instead.
 *
 * Run: node tools/audit.cjs [baseUrl]
 */
const { chromium } = require('/Users/adarsh/.npm/_npx/9833c18b2d85bc59/node_modules/playwright');

const BASE = process.argv[2] || 'http://localhost:3000';
const ROUTES = [
  '/', '/work', '/about', '/competitions', '/leadership',
  '/contact',
  '/work/kadi', '/work/orbweaver', '/work/agentiq', '/work/travel',
];

const CONTRAST = `() => {
  const lum = (rgb) => { const f = rgb.map(v => { v/=255; return v<=0.03928 ? v/12.92 : Math.pow((v+0.055)/1.055, 2.4); }); return 0.2126*f[0]+0.7152*f[1]+0.0722*f[2]; };
  const parse = (c) => { const m = c.match(/rgba?\\(([^)]+)\\)/); if(!m) return null; const p = m[1].split(',').map(Number); return { rgb:[p[0],p[1],p[2]], a: p.length>3?p[3]:1 }; };
  const bgOf = (el) => { let n = el; while (n && n !== document.documentElement) { const cs = getComputedStyle(n); const c = parse(cs.backgroundColor); if (c && c.a > 0.5) return c.rgb; if (cs.backgroundImage && cs.backgroundImage !== 'none') return null; n = n.parentElement; } const c = parse(getComputedStyle(document.documentElement).backgroundColor); return c ? c.rgb : [255,255,255]; };
  const ratio = (a,b) => { const L1 = lum(a), L2 = lum(b); const hi = Math.max(L1,L2), lo = Math.min(L1,L2); return (hi+0.05)/(lo+0.05); };
  const out = [];
  document.querySelectorAll('a,p,span,h1,h2,h3,h4,li,button,dd,dt,figcaption').forEach(el => {
    const txt = (el.textContent||'').trim();
    if (!txt || txt.length > 90 || el.children.length) return;
    const cs = getComputedStyle(el);
    if (cs.visibility === 'hidden' || cs.display === 'none' || +cs.opacity < 0.5) return;
    const r = el.getBoundingClientRect();
    if (r.width < 2 || r.height < 2) return;
    const fg = parse(cs.color); if (!fg) return;
    const bg = bgOf(el); if (!bg) return; // over an image or gradient, cannot measure
    const cr = ratio(fg.rgb, bg);
    const size = parseFloat(cs.fontSize), bold = parseInt(cs.fontWeight) >= 700;
    const need = (size >= 24 || (size >= 18.66 && bold)) ? 3 : 4.5;
    if (cr < need) out.push({ txt: txt.slice(0,44), size: Math.round(size), cr: +cr.toFixed(2), need });
  });
  return out;
}`;

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  let problems = 0;

  for (const theme of ['light', 'dark']) {
    for (const route of ROUTES) {
      const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
      const page = await ctx.newPage();
      const errors = [];
      page.on('console', (m) => { if (m.type() === 'error' && !/hmr|websocket|favicon/i.test(m.text())) errors.push(m.text().slice(0, 90)); });
      page.on('pageerror', (e) => errors.push('pageerror: ' + e.message.slice(0, 90)));

      await page.addInitScript((th) => {
        try { localStorage.setItem('theme', th); sessionStorage.setItem('entered', '1'); } catch (e) {}
      }, theme);

      await page.goto(BASE + route, { waitUntil: 'load', timeout: 40000 });
      await page.waitForTimeout(2600);

      // a string beginning `() =>` evaluates to the function itself, not its
      // result, so it has to be invoked inside the page
      const fails = await page.evaluate(`(${CONTRAST})()`);
      const wide = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      await page.setViewportSize({ width: 375, height: 812 });
      await page.waitForTimeout(900);
      const narrow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      const brokenImgs = await page.evaluate(() =>
        [...document.images].filter(i => i.complete && i.naturalWidth === 0).map(i => i.currentSrc || i.src).slice(0, 4));

      const bits = [];
      if (fails.length) bits.push(`contrast x${fails.length}`);
      if (wide > 1) bits.push(`overflow ${wide}px @1440`);
      if (narrow > 1) bits.push(`overflow ${narrow}px @375`);
      if (brokenImgs.length) bits.push(`broken img x${brokenImgs.length}`);
      if (errors.length) bits.push(`console x${errors.length}`);

      if (bits.length) {
        problems += bits.length;
        console.log(`FAIL ${theme.padEnd(5)} ${route.padEnd(18)} ${bits.join(', ')}`);
        fails.slice(0, 4).forEach(f => console.log(`        ${f.cr} < ${f.need}  ${f.size}px  "${f.txt}"`));
        errors.slice(0, 2).forEach(e => console.log(`        ${e}`));
        brokenImgs.forEach(s => console.log(`        img ${s}`));
      } else {
        console.log(`ok   ${theme.padEnd(5)} ${route}`);
      }
      await ctx.close();
    }
  }
  await browser.close();
  console.log(problems ? `\n${problems} problem group(s)` : '\nclean');
})();
