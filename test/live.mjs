/**
 * test/live.mjs
 * 打真接口的最小验证，只有这一支需要联网。
 * 它把正式产物注入真实 B 站页面，再调脚本自己的 card / search，验证 WBI 签名与接口解析没走样。
 *
 * 用法：node test/live.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import puppeteer from 'puppeteer-core';

const ROOT = path.resolve(import.meta.dirname, '..');
const CODE = fs.readFileSync(path.join(ROOT, 'dist/bili-up-nameplate.user.js'), 'utf8');
const CHROME = process.env.CHROME_PATH || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--no-sandbox', '--disable-gpu', '--lang=zh-CN'],
});

try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  await page.evaluateOnNewDocument(`
    window.__gm = {};
    window.GM_getValue = (k, d) => (Object.prototype.hasOwnProperty.call(window.__gm, k) ? window.__gm[k] : d);
    window.GM_setValue = (k, v) => { window.__gm[k] = v; };
    window.GM_registerMenuCommand = () => {};
  `);
  await page.goto('https://www.bilibili.com/', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.addScriptTag({ content: CODE });
  await sleep(1200);

  const card = await page.evaluate(() => window.__bnp.card('186463').catch((e) => ({ error: e.message })));
  console.log('card   :', JSON.stringify(card));

  const search = await page.evaluate(() =>
    window.__bnp
      .search('綾奈奈奈')
      .then((r) => ({ total: r.total, first: r.list[0] }))
      .catch((e) => ({ error: e.message }))
  );
  console.log('search :', JSON.stringify(search));

  const okCard = card && card.name === '綾奈奈奈';
  const okSearch = search && search.first && search.first.uid === '186463';
  console.log(okCard && okSearch ? '\n✓ 真接口验证通过' : '\n✗ 真接口验证未通过（可能被风控，或网络不通）');
  process.exitCode = okCard && okSearch ? 0 : 1;
} finally {
  await browser.close();
}
