/**
 * test/visual.mjs
 * 出图脚本：把铭牌和面板渲染成截图，方便肉眼验收排版。
 * 全程不连外网，接口与图片都由本脚本伪造。
 *
 * 用法：node test/visual.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import puppeteer from 'puppeteer-core';

const ROOT = path.resolve(import.meta.dirname, '..');
const CODE = fs.readFileSync(path.join(ROOT, 'dist/bili-up-nameplate.user.js'), 'utf8');
const ROSTER = JSON.parse(fs.readFileSync(path.join(ROOT, 'test/fixtures/vr_psp_roster.json'), 'utf8'));
const SHOTS = path.join(ROOT, 'test/shots');
const CHROME = process.env.CHROME_PATH || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const CARD = new Map();
for (const g of Object.values(ROSTER.groups)) for (const m of g.members) CARD.set(String(m.uid), { name: m.biliName || m.name, fans: m.followers });

const AVATAR = (uid) => {
  const hues = [265, 335, 20, 150, 210, 0, 175, 285];
  const digits = String(uid).replace(/\D/g, '');
  const h = hues[Number(digits.slice(-1) || 0) % hues.length];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96">
    <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="hsl(${h},72%,72%)"/><stop offset="1" stop-color="hsl(${h + 30},68%,58%)"/>
    </linearGradient></defs>
    <rect width="96" height="96" fill="url(#g)"/>
    <circle cx="48" cy="38" r="16" fill="#fff" opacity=".55"/>
    <circle cx="48" cy="86" r="30" fill="#fff" opacity=".4"/></svg>`;
  return svg;
};

const page_ = (body, css = '') =>
  `<!doctype html><html lang="zh"><head><meta charset="utf-8"><style>
   body{font-family:-apple-system,"Microsoft YaHei",sans-serif;margin:0;padding:26px;color:#18191c;background:#fff}
   img{display:block}${css}</style></head><body>${body}</body></html>`;

const spaceHtml = (name, uid) =>
  page_(`<div style="display:flex;gap:16px;align-items:flex-start">
      <a href="//space.bilibili.com/${uid}"><img width="64" height="64" style="border-radius:50%" src="//i0.hdslb.com/bfs/face/${uid}.jpg"></a>
      <div>
        <div style="display:flex;align-items:center;gap:8px">
          <span style="font-size:22px;font-weight:600">${name}</span>
          <span class="level" style="font-size:12px;color:#9499a0;border:1px solid #e3e5e7;border-radius:3px;padding:0 4px">LV6</span>
        </div>
        <div style="color:#9499a0;font-size:13px;margin-top:8px">psplive 所属 · 这里是伪造的主页头部</div>
      </div>
    </div>`);

const feedHtml = (items) =>
  page_(`<div style="max-width:620px">${items
    .map(
      ([name, uid, time]) => `
    <div style="padding:16px 0;border-bottom:1px solid #f1f2f3">
      <div style="display:flex;gap:10px;align-items:center">
        <a href="//space.bilibili.com/${uid}"><img width="42" height="42" style="border-radius:50%" src="//i0.hdslb.com/bfs/face/${uid}.jpg"></a>
        <div style="display:flex;align-items:center;gap:8px">
          <a href="//space.bilibili.com/${uid}" style="font-size:15px;font-weight:600;color:#18191c;text-decoration:none">${name}</a>
          <span style="color:#9499a0;font-size:12px">${time}</span>
        </div>
      </div>
      <div style="font-size:13.5px;color:#333;margin-top:10px">这是一条伪造的动态正文，用来验收铭牌位置。</div>
    </div>`
    )
    .join('')}</div>`);

const STUB = `
  window.__gm = {};
  window.GM_getValue = (k, d) => (Object.prototype.hasOwnProperty.call(window.__gm, k) ? window.__gm[k] : d);
  window.GM_setValue = (k, v) => { window.__gm[k] = v; };
  window.GM_registerMenuCommand = () => {};
`;

const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox', '--disable-gpu'] });
const page = await browser.newPage();
await page.setViewport({ width: 1180, height: 780, deviceScaleFactor: 2 });
await page.setRequestInterception(true);
page.on('request', (req) => {
  const u = req.url();
  const origin = req.headers().origin || 'https://t.bilibili.com';
  if (u.startsWith('https://api.bilibili.com/x/web-interface/card')) {
    const mid = new URL(u).searchParams.get('mid');
    const c = CARD.get(String(mid));
    return req.respond({
      status: 200,
      contentType: 'application/json',
      headers: { 'access-control-allow-origin': origin, 'access-control-allow-credentials': 'true' },
      body: JSON.stringify({
        code: c ? 0 : -404,
        data: c ? { card: { mid: String(mid), name: c.name, face: `//i0.hdslb.com/bfs/face/${mid}.jpg`, fans: c.fans } } : null,
      }),
    });
  }
  if (/hdslb.com/.test(u)) return req.respond({ status: 200, contentType: 'image/svg+xml', body: AVATAR(u.split('/').pop()) });
  if (u.includes('space.bilibili.com/186463')) return req.respond({ status: 200, contentType: 'text/html', body: spaceHtml('綾奈奈奈', 186463) });
  if (u.startsWith('https://t.bilibili.com/'))
    return req.respond({
      status: 200,
      contentType: 'text/html',
      body: feedHtml([
        ['綾奈奈奈', 186463, '32 分钟前'],
        ['路人甲1234', 999000111, '1 小时前'],
        ['向阳Hihi', 1694351351, '2 小时前'],
        ['hanser', 11073, '3 小时前'],
      ]),
    });
  return req.respond({ status: 200, contentType: 'image/gif', body: '' });
});

await page.evaluateOnNewDocument(STUB);

/* ---- 1. 动态流 ---- */
await page.goto('https://t.bilibili.com/', { waitUntil: 'domcontentloaded' });
await page.addScriptTag({ content: CODE });
await page.evaluate(() => {
  const vr = window.__bnp.groups.find((g) => g.name === 'VirtuaReal');
  window.__bnp.addToGroup('186463', vr.id); // 让她同时属于两个组，验证多枚铭牌
  window.__bnp.settings.mode = 'always';
  window.__bnp.rescan();
});
await sleep(500);
await page.screenshot({ path: path.join(SHOTS, 'visual-feed.png') });
console.log('shots: visual-feed.png');

/* ---- 2. 面板 ---- */
await page.evaluate(async () => {
  window.__bnp.open();
  const sr = document.getElementById('bnp-panel-host').shadowRoot;
  sr.querySelector('.grp').classList.add('open');
});
await sleep(600);
await page.screenshot({ path: path.join(SHOTS, 'visual-panel.png') });
console.log('shots: visual-panel.png');

const dlg = await page.evaluate(() => {
  const r = document.getElementById('bnp-panel-host').shadowRoot.querySelector('.dlg').getBoundingClientRect();
  return { x: r.x, y: r.y, width: r.width, height: r.height };
});
await page.screenshot({ path: path.join(SHOTS, 'visual-panel-crop.png'), clip: dlg });
console.log('shots: visual-panel-crop.png');

/* ---- 3. 加号面板 ---- */
await page.evaluate(() => {
  const sr = document.getElementById('bnp-panel-host').shadowRoot;
  [...sr.querySelectorAll('.bar .btn')].find((b) => b.textContent.includes('添加 UP')).click();
});
await sleep(300);
await page.screenshot({ path: path.join(SHOTS, 'visual-add.png'), clip: dlg });
console.log('shots: visual-add.png');

/* ---- 4. 主页 ---- */
await page.goto('https://space.bilibili.com/186463', { waitUntil: 'domcontentloaded' });
await page.addScriptTag({ content: CODE });
await page.evaluate(() => {
  const vr = window.__bnp.groups.find((g) => g.name === 'VirtuaReal');
  window.__bnp.addToGroup('186463', vr.id);
  window.__bnp.settings.mode = 'always';
  window.__bnp.remount();
});
await sleep(900);
await page.screenshot({ path: path.join(SHOTS, 'visual-space.png'), clip: { x: 0, y: 0, width: 620, height: 150 } });
console.log('shots: visual-space.png');

await browser.close();
