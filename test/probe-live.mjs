/**
 * test/probe-live.mjs
 * 真站探针：在真实 space 页面上验证「按昵称反查 + 挂载铭牌」这条 pull 路径。
 * 只用于人工排查，不进 npm test（B 站改版或风控会直接影响它）。
 */
import fs from 'node:fs';
import path from 'node:path';
import puppeteer from 'puppeteer-core';

const ROOT = path.resolve(import.meta.dirname, '..');
const CODE = fs.readFileSync(path.join(ROOT, 'dist/bili-up-nameplate.user.js'), 'utf8');
const CHROME = process.env.CHROME_PATH || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const TARGET = process.env.PROBE_UID || '186463';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--no-sandbox', '--disable-gpu', '--lang=zh-CN', '--window-size=1280,900'],
});

try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  await page.evaluateOnNewDocument(`
    window.__gm = {};
    window.GM_getValue = (k, d) => (Object.prototype.hasOwnProperty.call(window.__gm, k) ? window.__gm[k] : d);
    window.GM_setValue = (k, v) => { window.__gm[k] = v; };
    window.GM_registerMenuCommand = () => {};
  `);
  await page.goto(`https://space.bilibili.com/${TARGET}`, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await sleep(2500);
  await page.addScriptTag({ content: CODE });
  await sleep(800);

  const info = await page.evaluate((uid) => {
    // 顺便验证「一个人两个组」在真站上的排布
    const vr = window.__bnp.groups.find((g) => g.name === 'VirtuaReal');
    if (vr && window.__bnp.members[uid] && window.__bnp.groupsOf(uid).length < 2) window.__bnp.addToGroup(uid, vr.id);
    window.__bnp.settings.mode = 'always';
    window.__bnp.remount();
    return {
      kind: window.__bnp.pageKind,
      groups: window.__bnp.groups.map((g) => `${g.name}(${g.badge})`),
      members: Object.keys(window.__bnp.members).length,
      seeded: window.__bnp.defaults().groups.map((g) => `${g.name}:${g.n}`).join(' '),
      mine: window.__bnp.groupsOf(uid),
      cards: (window.__bnp.targets.find((t) => t.uid === uid) || {}).cards || [],
    };
  }, TARGET);
  console.log('page  :', JSON.stringify(info));

  await sleep(2500);
  const state = await page.evaluate(() => {
    const host = document.getElementById('bnp-badge-host');
    const root = host && host.shadowRoot;
    return {
      targets: window.__bnp.targets,
      cards: root ? [...root.querySelectorAll('.card.on')].map((c) => ({ text: c.textContent, x: c.getBoundingClientRect().x, y: c.getBoundingClientRect().y })) : [],
      title: document.title,
    };
  });
  console.log('state :', JSON.stringify(state));

  await page.screenshot({ path: path.join(ROOT, 'test/shots/live-space.png') });
  console.log('shot  : test/shots/live-space.png');
} finally {
  await browser.close();
}
