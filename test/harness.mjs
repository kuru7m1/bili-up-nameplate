/**
 * test/harness.mjs
 * 用无头 Chrome 伪造各类 B 站页面，验证铭牌注入、面板、分组开关、导入与搜索。
 * 全程不依赖外网：所有 bilibili.com 请求都被拦截并返回本地构造的 HTML / JSON。
 *
 * 用法：node test/harness.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import puppeteer from 'puppeteer-core';

const ROOT = path.resolve(import.meta.dirname, '..');
const DIST = path.join(ROOT, 'dist/bili-up-nameplate.user.js');
const CODE = fs.readFileSync(DIST, 'utf8');
const ROSTER_TEXT = fs.readFileSync(path.join(ROOT, 'test/fixtures/vr_psp_roster.json'), 'utf8');
const ROSTER = JSON.parse(ROSTER_TEXT);
const SHOTS = path.join(ROOT, 'test/shots');
const CHROME = process.env.CHROME_PATH || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const PIXEL =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/* 名册里的 uid -> 资料，用来伪造 card 接口 */
const CARD = new Map();
for (const [gname, g] of Object.entries(ROSTER.groups)) {
  for (const m of g.members) CARD.set(String(m.uid), { name: m.biliName || m.name, fans: m.followers, group: gname });
}

let pass = 0;
let fail = 0;
function ok(cond, msg, extra) {
  if (cond) {
    pass++;
    console.log('  \u2713 ' + msg);
  } else {
    fail++;
    console.log('  \u2717 ' + msg + (extra ? '  →  ' + JSON.stringify(extra) : ''));
  }
}

/* ------------------------- 伪造页面 ------------------------- */
const page_ = (body, css = '') =>
  `<!doctype html><html lang="zh"><head><meta charset="utf-8"><style>
    body{font-family:-apple-system,"Microsoft YaHei",sans-serif;padding:24px;margin:0}
    img{background:#e9ecf1}
    ${css}</style></head><body>${body}</body></html>`;

const spaceHtml = (name, uid) =>
  page_(
    `<div class="header" style="display:flex;gap:14px;align-items:flex-start">
       <a class="h-avatar" href="//space.bilibili.com/${uid}"><img width="56" height="56" style="border-radius:50%" src="${PIXEL}"></a>
       <div class="info">
         <div class="name-row" style="display:flex;align-items:center;gap:8px">
           <span class="nickname" style="font-size:22px;font-weight:600">${name}</span>
           <span class="level" style="font-size:12px;color:#888;border:1px solid #ddd;border-radius:3px;padding:0 3px">LV6</span>
         </div>
         <div class="sign" style="color:#666;font-size:13px;margin-top:6px">这是伪造的主页头部</div>
       </div>
     </div>`
  );

const feedItem = (name, uid) => `
  <div class="dyn" style="padding:14px 0;border-bottom:1px solid #eee">
    <div style="display:flex;gap:10px;align-items:center">
      <a href="//space.bilibili.com/${uid}"><img width="40" height="40" style="border-radius:50%" src="${PIXEL}"></a>
      <div style="display:flex;align-items:center;gap:8px">
        <a class="dyn-name" href="//space.bilibili.com/${uid}" style="font-size:15px;font-weight:600;color:#222;text-decoration:none">${name}</a>
        <span style="font-size:11px;color:#999">3 小时前</span>
      </div>
    </div>
    <div style="font-size:13px;color:#333;margin-top:8px">这是一条伪造的动态正文</div>
  </div>`;

const feedHtml = (items) => page_(`<div>${items.map(([n, u]) => feedItem(n, u)).join('')}</div>`);

/* 遮挡场景：吸顶导航压在昵称上 */
const occlHtml = () =>
  page_(
    `<div style="position:fixed;top:0;left:0;right:0;height:60px;background:#fff;z-index:1000;border-bottom:1px solid #eee">
       <span style="line-height:60px;padding-left:12px;color:#666">首页 番剧 直播 游戏中心</span>
     </div>
     <div style="position:absolute;top:18px;left:40px">
       <a class="under-bar" href="//space.bilibili.com/186463" style="font-size:15px;font-weight:600">綾奈奈奈</a>
     </div>
     <div style="position:absolute;top:200px;left:40px">
       <a class="free" href="//space.bilibili.com/186463" style="font-size:15px;font-weight:600">綾奈奈奈</a>
     </div>`
  );

/* 悬停名片内部：B 站 .v-popover 是 absolute + z-index:1，里面的昵称也该有铭牌 */
const popCardHtml = () =>
  page_(
    `<div class="v-popover" style="position:absolute;top:120px;left:200px;width:268px;background:#fff;z-index:1;
       border:1px solid #eee;border-radius:10px;padding:14px">
       <div style="display:flex;gap:10px;align-items:center">
         <img width="48" height="48" style="border-radius:50%" src="${PIXEL}">
         <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
           <a class="pop-name" href="//space.bilibili.com/186463" style="font-size:17px;font-weight:600">綾奈奈奈</a>
           <span style="font-size:12px;color:#888">LV6</span>
           <span style="font-size:12px;color:#d6336c">年度大会员</span>
         </div>
       </div>
       <div style="font-size:12px;color:#666;margin-top:10px">132 关注 2.7万 粉丝</div>
       <div style="font-size:12px;color:#999;margin-top:6px">虚拟艺人团体 VirtuaReal 成员</div>
     </div>`
  );

/* 遮挡场景：铺满全屏的透明壳子（B 站首页就有 z-index:10 的透明层） */
const transparentHtml = () =>
  page_(
    `<div style="position:fixed;inset:0;z-index:10"></div>
     <div style="position:absolute;top:150px;left:40px">
       <a class="free" href="//space.bilibili.com/186463" style="font-size:15px;font-weight:600">綾奈奈奈</a>
     </div>`
  );

/* 遮挡场景：B 站自己的悬停名片盖住铭牌 */
const popoverHtml = () =>
  page_(
    `<div style="position:absolute;top:150px;left:40px">
       <a class="free" href="//space.bilibili.com/186463" style="font-size:15px;font-weight:600">綾奈奈奈</a>
     </div>`
  );
/* 动态页顶部「关注的人」横条：头像在上、名字在下的竖排胶囊，右边紧挨下一列 */
const tabsHtml = () =>
  page_(
    `<div style="display:flex;gap:18px;align-items:flex-start">
       <div style="width:64px;text-align:center">
         <a href="//space.bilibili.com/186463"><img width="44" height="44" style="border-radius:50%;margin:0 auto" src="${PIXEL}"></a>
         <a class="tname" href="//space.bilibili.com/186463" style="font-size:14px;display:block">綾奈奈奈</a>
       </div>
       <div style="width:64px;text-align:center">
         <a href="//space.bilibili.com/1694351351"><img width="44" height="44" style="border-radius:50%;margin:0 auto" src="${PIXEL}"></a>
         <a class="tname" href="//space.bilibili.com/1694351351" style="font-size:14px;display:block">向阳Hihi</a>
       </div>
     </div>
     <div style="margin-top:26px;display:flex;gap:10px;align-items:center">
       <img width="36" height="36" style="border-radius:50%" src="${PIXEL}">
       <a class="dyn-name" href="//space.bilibili.com/186463" style="font-size:15px;font-weight:600">綾奈奈奈</a>
       <span style="font-size:12px;color:#999">3 小时前</span>
     </div>`
  );

/* 热搜榜：整行一个链接，里面既有排名数字又有关键词——这里的排名数字绝不能被当成昵称 */
const hotHtml = () =>
  page_(
    `<div style="width:320px">
       <a href="//space.bilibili.com/186463" style="display:flex;gap:10px;text-decoration:none;color:#222">
         <span class="rank" style="width:14px;color:#999">4</span>
         <span class="kw" style="font-size:14px">Donek单图狂砍35杀教主</span>
         <img width="16" height="16" src="${PIXEL}" style="border-radius:50%">
       </a>
       <a href="//space.bilibili.com/186463" style="display:flex;gap:10px;text-decoration:none;color:#222;margin-top:8px">
         <span class="rank" style="width:14px;color:#999">5</span>
         <span class="kw" style="font-size:14px">罗翔用AI做了个视频</span>
       </a>
       <div style="margin-top:20px;display:flex;gap:8px;align-items:center">
         <a href="//space.bilibili.com/186463" style="font-size:14px">綾奈奈奈</a>
         <span style="font-size:12px;color:#999">正常昵称链接</span>
       </div>
     </div>`
  );

const searchHtml = (name, uid) =>
  page_(
    `<div class="user-card" style="display:flex;gap:12px;align-items:center;padding:14px;border:1px solid #eee;border-radius:10px">
       <a href="//space.bilibili.com/${uid}"><img width="56" height="56" style="border-radius:50%" src="${PIXEL}"></a>
       <div style="flex:1">
         <div style="display:flex;align-items:center;gap:10px">
           <a class="s-name" href="//space.bilibili.com/${uid}" style="font-size:17px;font-weight:600;color:#222;text-decoration:none">${name}</a>
           <span style="font-size:12px;color:#888">LV6</span>
           <button style="margin-left:auto">+ 关注</button>
         </div>
         <div style="font-size:12px;color:#888;margin-top:6px">19.7 万粉丝 · 120 个视频</div>
       </div>
     </div>`
  );

/* ------------------------- 注入桩 ------------------------- */
/* firstRun=true 时不预置任何键，模拟「第一次装插件」，脚本会写入自带分组；
   否则预置空的 groups，模拟已用过的浏览器 */
const STUB = (firstRun) => `
  window.__gm = ${firstRun ? '{}' : '{ groups: [] }'};
  window.GM_getValue = (k, d) => (Object.prototype.hasOwnProperty.call(window.__gm, k) ? window.__gm[k] : d);
  window.GM_setValue = (k, v) => { window.__gm[k] = v; };
  window.GM_registerMenuCommand = (name, fn) => { (window.__menu = window.__menu || {})[name] = fn; };
  window.GM_openInTab = (u) => { window.__openedTab = u; };
`;

const NAV_JSON = {
  code: -101,
  message: '账号未登录',
  data: {
    isLogin: false,
    wbi_img: {
      img_url: 'https://i0.hdslb.com/bfs/wbi/' + 'a'.repeat(32) + '.png',
      sub_url: 'https://i0.hdslb.com/bfs/wbi/' + 'b'.repeat(32) + '.png',
    },
  },
};

function apiResponse(url) {
  const u = new URL(url);
  if (u.pathname.includes('/x/web-interface/nav')) return NAV_JSON;
  if (u.pathname.includes('/x/web-interface/card')) {
    const mid = u.searchParams.get('mid');
    const c = CARD.get(String(mid));
    if (!c) return { code: -404, message: '啥都木有' };
    return {
      code: 0,
      message: 'OK',
      data: { card: { mid: String(mid), name: c.name, face: '//i0.hdslb.com/bfs/face/test.jpg', fans: c.fans } },
    };
  }
  if (u.pathname.includes('/wbi/search/type')) {
    const kw = u.searchParams.get('keyword') || '';
    return {
      code: 0,
      message: 'OK',
      data: {
        numResults: 2,
        result: [
          { mid: 186463, uname: `<em class="keyword">${kw}</em>綾奈奈奈`, upic: '//i0.hdslb.com/bfs/face/a.jpg', fans: 197724, usign: 'sign' },
          { mid: 415297421, uname: `${kw}的小号`, upic: '//i0.hdslb.com/bfs/face/b.jpg', fans: 68, usign: '' },
        ],
      },
    };
  }
  return { code: -404, message: 'not mocked' };
}

async function newPage(browser, url, { firstRun = false, scanWindow = 0, store = null } = {}) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1180, height: 820, deviceScaleFactor: 1 });
  await page.setRequestInterception(true);
  page.on('request', (req) => {
    const u = req.url();
    try {
      if (u.startsWith('https://api.bilibili.com/')) {
        const body = JSON.stringify(apiResponse(u));
        // 真接口会回显 Origin，这里也回显，否则页面里的 fetch 会被 CORS 拦掉
        const origin = req.headers().origin || 'https://t.bilibili.com';
        return req.respond({
          status: 200,
          contentType: 'application/json',
          headers: { 'access-control-allow-origin': origin, 'access-control-allow-credentials': 'true' },
          body,
        });
      }
      if (u.includes('space.bilibili.com/186463')) return req.respond({ status: 200, contentType: 'text/html', body: spaceHtml('綾奈奈奈', 186463) });
      // 隐私 / 后台页：DOM 里放一个本该被标记的昵称，用来证明脚本确实什么都没做
      if (u.startsWith('https://www.bilibili.com/account/') || u.startsWith('https://www.bilibili.com/vip/') || u.startsWith('https://live.bilibili.com/'))
        return req.respond({ status: 200, contentType: 'text/html', body: feedHtml([['綾奈奈奈', 186463]]) });
      if (/^https:\/\/www\.bilibili\.com\/(\?|#|$)/.test(u))
        return req.respond({ status: 200, contentType: 'text/html', body: feedHtml([['綾奈奈奈', 186463]]) });
      if (u.startsWith('https://t.bilibili.com/occlusion')) return req.respond({ status: 200, contentType: 'text/html', body: occlHtml() });
      if (u.startsWith('https://t.bilibili.com/popcard')) return req.respond({ status: 200, contentType: 'text/html', body: popCardHtml() });
      if (u.startsWith('https://t.bilibili.com/transparent')) return req.respond({ status: 200, contentType: 'text/html', body: transparentHtml() });
      if (u.startsWith('https://t.bilibili.com/popover')) return req.respond({ status: 200, contentType: 'text/html', body: popoverHtml() });
      if (u.startsWith('https://t.bilibili.com/hotsearch')) return req.respond({ status: 200, contentType: 'text/html', body: hotHtml() });
      if (u.startsWith('https://t.bilibili.com/tabs')) return req.respond({ status: 200, contentType: 'text/html', body: tabsHtml() });
      if (u.startsWith('https://t.bilibili.com/'))
        return req.respond({
          status: 200,
          contentType: 'text/html',
          body: feedHtml([
            ['綾奈奈奈', 186463],
            ['路人甲1234', 999000111],
            ['向阳Hihi', 1694351351],
          ]),
        });
      if (u.startsWith('https://search.bilibili.com/'))
        return req.respond({ status: 200, contentType: 'text/html', body: searchHtml('綾奈奈奈', 186463) });
      if (u.startsWith('data:')) return req.continue();
      // 图片、字体等一律给空响应，避免真连外网
      return req.respond({ status: 200, contentType: 'image/gif', body: '' });
    } catch (e) {
      try {
        req.abort();
      } catch (e2) {}
    }
  });
  await page.evaluateOnNewDocument(STUB(firstRun));
  if (scanWindow) await page.evaluateOnNewDocument(`window.__BNP_SCAN_WINDOW__ = ${scanWindow};`);
  if (store) await page.evaluateOnNewDocument(`window.__gm = ${JSON.stringify(store)};`);
  if (scanWindow) await page.evaluateOnNewDocument();
  await page.goto(url, { waitUntil: 'domcontentloaded' });
  await page.addScriptTag({ content: CODE });
  await sleep(120);
  return page;
}

const cards = (page) =>
  page.evaluate(() => {
    const host = document.getElementById('bnp-badge-host');
    if (!host || !host.shadowRoot) return [];
    return [...host.shadowRoot.querySelectorAll('.card.on')].map((c) => c.textContent.trim());
  });

async function seed(page, { mode = 'always' } = {}) {
  await page.evaluate(
    async (txt, m) => {
      window.__bnp.import(txt, 'merge');
      window.__bnp.settings.mode = m; // 大部分用例看的是「有没有挂上」，用常显模式便于断言
      window.__bnp.rescan();
    },
    ROSTER_TEXT,
    mode
  );
  await sleep(260);
}

/* ------------------------- 用例 ------------------------- */
const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--no-sandbox', '--disable-gpu', '--font-render-hinting=none'],
});

try {
  /* 1. 个人主页 */
  console.log('\n[1] 个人主页 space.bilibili.com');
  {
    const page = await newPage(browser, 'https://space.bilibili.com/186463');
    ok(await page.evaluate(() => !!window.__bnp), '脚本已注入');
    await seed(page);
    const info = await page.evaluate(() => ({ groups: __bnp.groups.length, members: Object.keys(__bnp.members).length }));
    ok(info.groups === 2, `导入出 2 个分组（实际 ${info.groups}）`);
    ok(info.members === 84, `导入出 84 位 UP（实际 ${info.members}）`);

    // 主页昵称是纯文本，靠 pull 路径按昵称反查
    await page.evaluate(() => window.__bnp.remount());
    await sleep(700);
    let c = await cards(page);
    ok(c.includes('🏷️PSPLive'), '主页头部出现「🏷️PSPLive」铭牌', c);
    await page.screenshot({ path: path.join(SHOTS, 'space.png') });
    await page.close();
  }

  /* 2. 动态流 */
  console.log('\n[2] 动态流 t.bilibili.com');
  {
    const page = await newPage(browser, 'https://t.bilibili.com/');
    await seed(page);
    const c = await cards(page);
    ok(c.length === 2, `3 条动态里只给 2 位在册 UP 挂了铭牌（实际 ${c.length}）`, c);
    ok(c.includes('🏷️PSPLive') && c.includes('🏷️VirtuaReal'), '两个分组的铭牌都出现了', c);
    await page.screenshot({ path: path.join(SHOTS, 'feed.png') });
    await page.close();
  }

  /* 3. 搜索结果 */
  console.log('\n[3] 搜索结果 search.bilibili.com');
  {
    const page = await newPage(browser, 'https://search.bilibili.com/all?keyword=test');
    await seed(page);
    const c = await cards(page);
    ok(c.includes('🏷️PSPLive'), '搜索结果里的 UP 有铭牌', c);
    await page.close();
  }

  /* 4. 面板 */
  console.log('\n[4] 设置面板');
  {
    const page = await newPage(browser, 'https://t.bilibili.com/');
    await seed(page);
    await page.evaluate(() => window.__bnp.open());
    await sleep(300);
    const meta = await page.evaluate(() => {
      const sr = document.getElementById('bnp-panel-host').shadowRoot;
      return { meta: sr.querySelector('.hd .m').textContent, groups: [...sr.querySelectorAll('.gh .nm')].map((e) => e.textContent) };
    });
    ok(/2 个分组 · 84 位 UP/.test(meta.meta), `面板统计正确（${meta.meta}）`);
    ok(meta.groups.join(',') === 'VirtuaReal,PSPLive', '分组顺序为 VirtuaReal、PSPLive', meta.groups);

    // 展开第一组，数行数
    const rows = await page.evaluate(() => {
      const sr = document.getElementById('bnp-panel-host').shadowRoot;
      const first = sr.querySelector('.grp');
      first.classList.add('open');
      return first.querySelector('.ls').querySelectorAll('.row[data-uid]').length;
    });
    ok(rows === 64, `展开 VirtuaReal 后列出 64 行（实际 ${rows}）`);

    await page.screenshot({ path: path.join(SHOTS, 'panel.png') });
    await page.close();
  }

  /* 5. 分组开关 */
  console.log('\n[5] 分组显示开关');
  {
    const page = await newPage(browser, 'https://t.bilibili.com/');
    await seed(page);
    const before = (await cards(page)).length;
    await page.evaluate(() => window.__bnp.open());
    await sleep(200);
    const gid = await page.evaluate(() => window.__bnp.groups.find((g) => g.name === 'PSPLive').id);
    await page.evaluate((id) => {
      const sr = document.getElementById('bnp-panel-host').shadowRoot;
      sr.querySelector(`.grp[data-id="${id}"] .tg input`).click();
    }, gid);
    await sleep(220);
    const after = (await cards(page)).length;
    ok(before === 2 && after === 1, `在面板里关掉 PSPLive，铭牌 2 → 1（实际 ${before} → ${after}）`);
    const persisted = await page.evaluate((id) => window.__gm.groups.find((g) => g.id === id).on, gid);
    ok(persisted === false, '开关状态已写回本地存储');
    await page.close();
  }

  /* 5b. 悬停模式 */
  console.log('\n[5b] 悬停显示模式');
  {
    const page = await newPage(browser, 'https://t.bilibili.com/');
    await seed(page, { mode: 'hover' });
    const before = (await cards(page)).length;
    const box = await page.evaluate(() => {
      const a = document.querySelector('.dyn-name');
      const r = a.getBoundingClientRect();
      return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
    });
    await page.mouse.move(box.x, box.y);
    await sleep(200);
    const during = (await cards(page)).length;
    await page.mouse.move(5, 5);
    await sleep(200);
    const after = (await cards(page)).length;
    ok(before === 0, `悬停模式下默认不显示（${before}）`);
    ok(during >= 1, `鼠标移到昵称上后出现铭牌（${during}）`);
    ok(after === 0, `鼠标移开后铭牌收起（${after}）`);
    await page.close();
  }

  /* 6. 改铭牌文字 / 颜色 */
  console.log('\n[6] 自定义铭牌文字');
  {
    const page = await newPage(browser, 'https://t.bilibili.com/');
    await seed(page);
    await page.evaluate(() => {
      const g = window.__bnp.groups.find((x) => x.name === 'PSPLive');
      g.text = 'PSP';
      g.badge = '🐰';
      window.__bnp.rescan();
    });
    await sleep(200);
    const c = await cards(page);
    ok(c.includes('🐰PSP'), '铭牌变成「🐰PSP」', c);
    await page.close();
  }

  /* 7. 新加一位 UP，页面上立刻能挂上 */
  console.log('\n[7] 添加页面上的路人 UP');
  {
    const page = await newPage(browser, 'https://t.bilibili.com/');
    await seed(page);
    const before = (await cards(page)).length;
    await page.evaluate(() => {
      const gid = window.__bnp.groups.find((x) => x.name === 'VirtuaReal').id;
      window.__bnp.addMember('999000111', gid, { name: '路人甲1234', fans: 1234 });
      window.__bnp.rescan();
    });
    await sleep(200);
    const after = (await cards(page)).length;
    ok(before === 2 && after === 3, `加入路人甲后铭牌 2 → 3（实际 ${before} → ${after}）`);
    await page.close();
  }

  /* 8. 重复导入幂等 */
  console.log('\n[8] 重复导入');
  {
    const page = await newPage(browser, 'https://t.bilibili.com/');
    await seed(page);
    const r = await page.evaluate((txt) => window.__bnp.import(txt, 'merge'), ROSTER_TEXT);
    ok(r.added === 0 && r.skipped === 84, `再导一次：新增 0、跳过 84（实际 ${r.added}/${r.skipped}）`, r);
    await page.close();
  }

  /* 9. CSV 导入 */
  console.log('\n[9] CSV 导入');
  {
    const page = await newPage(browser, 'https://t.bilibili.com/');
    const csv = fs.readFileSync(path.join(ROOT, 'test/fixtures/vr_psp_roster.csv'), 'utf8');
    const info = await page.evaluate((txt) => {
      const p = window.__bnp.parse(txt);
      const r = window.__bnp.import(txt, 'merge');
      return { groups: p.groups.map((g) => g.name), n: r.added, created: r.createdGroups };
    }, csv);
    ok(info.groups.join(',') === 'VirtuaReal,PSPLive', 'CSV 识别出两个分组', info.groups);
    ok(info.n === 84 && info.created === 2, `CSV 导入 84 人、新建 2 组（实际 ${info.n}/${info.created}）`, info);
    await page.close();
  }

  /* 10. 昵称搜索（WBI 签名 + 解析） */
  console.log('\n[10] 昵称搜索');
  {
    const page = await newPage(browser, 'https://t.bilibili.com/');
    const r = await page.evaluate(async () => {
      const res = await window.__bnp.search('奈奈');
      return res;
    });
    ok(r.list.length === 2 && r.list[0].uid === '186463', '搜索返回 2 条，首位是 186463', r.list);
    ok(r.list[0].name === '奈奈綾奈奈奈', '高亮标签被剥掉', r.list[0].name);
    await page.close();
  }

  /* 10b. 补资料 */
  console.log('\n[10b] 按 UID 补资料');
  {
    const page = await newPage(browser, 'https://t.bilibili.com/');
    const r = await page.evaluate(async () => {
      const gid = window.__bnp.createGroup('临时组').id;
      window.__bnp.addMember('186463', gid, {});
      await window.__bnp.hydrate(['186463'], null);
      return window.__bnp.members['186463'];
    });
    ok(/hdslb\.com/.test(r.f || ''), '头像地址已写入本地', r);
    ok(r.n === '綾奈奈奈' && r.c === 197724, `昵称与粉丝数已补全（${r.n} / ${r.c}）`, r);
    await page.close();
  }

  /* 11. 显示范围 */
  console.log('\n[11] 显示范围开关');
  {
    const page = await newPage(browser, 'https://t.bilibili.com/');
    await seed(page);
    const off = await page.evaluate(() => {
      window.__bnp.settings.scope.dynamic = false;
      window.__bnp.remount();
      return window.__bnp.targets.length;
    });
    await sleep(200);
    ok(off === 0, `关掉动态范围后不挂任何铭牌（${off}）`);
    await page.close();
  }

  /* 12. 导入面板整条链路：打开 → 粘贴 → 预览 → 导入 → 补资料 */
  console.log('\n[12] 导入面板全流程');
  {
    const page = await newPage(browser, 'https://t.bilibili.com/');
    await page.evaluate(() => window.__bnp.open());
    await sleep(150);
    await page.evaluate(() => {
      const sr = document.getElementById('bnp-panel-host').shadowRoot;
      [...sr.querySelectorAll('.bar .btn')].find((b) => b.textContent === '导入').click();
    });
    await sleep(200);
    const opened = await page.evaluate(() => {
      const sr = document.getElementById('bnp-panel-host').shadowRoot;
      return !!sr.querySelector('.sheet.on .drop');
    });
    ok(opened, '导入面板已打开');

    await page.evaluate((txt) => {
      const sr = document.getElementById('bnp-panel-host').shadowRoot;
      sr.querySelector('.sheet textarea').value = txt;
      [...sr.querySelectorAll('.sheet .btn')].find((b) => b.textContent === '预览').click();
    }, ROSTER_TEXT);
    await sleep(300);
    const st = await page.evaluate(() => document.getElementById('bnp-panel-host').shadowRoot.querySelector('.sheet .status').textContent);
    ok(/2 个分组、84 位 UP/.test(st), `预览显示 2 组 84 人（${st}）`);

    await page.evaluate(() => {
      const sr = document.getElementById('bnp-panel-host').shadowRoot;
      [...sr.querySelectorAll('.sheet .btn')].find((b) => b.textContent === '开始导入').click();
    });
    await sleep(14000);
    const r = await page.evaluate(() => ({
      members: Object.keys(window.__bnp.members).length,
      face: (window.__bnp.members['186463'] || {}).f || '',
      status: document.getElementById('bnp-panel-host').shadowRoot.querySelector('.sheet .status').textContent,
    }));
    ok(r.members === 84, `导入后名单 84 人（${r.members}）`);
    ok(/hdslb\.com/.test(r.face), '头像已补全并落到本地');
    ok(/导入完成/.test(r.status), `状态栏收尾正确（${r.status}）`);
    await page.close();
  }

  /* 13. 搜索页签整条链路：搜索 → 移到本组 → 铭牌跟着换 */
  console.log('\n[13] 搜索并移到本组');
  {
    const page = await newPage(browser, 'https://t.bilibili.com/');
    await seed(page);
    await page.evaluate(() => window.__bnp.open());
    await sleep(150);
    await page.evaluate(() => {
      const sr = document.getElementById('bnp-panel-host').shadowRoot;
      [...sr.querySelectorAll('.bar .btn')].find((b) => b.textContent.includes('添加 UP')).click();
    });
    await sleep(150);
    await page.evaluate(() => {
      const sr = document.getElementById('bnp-panel-host').shadowRoot;
      sr.querySelector('.sheet .fieldrow input').value = '奈奈';
      [...sr.querySelectorAll('.sheet .fieldrow .btn')].find((b) => b.textContent === '搜索').click();
    });
    await sleep(700);
    const r1 = await page.evaluate(() => {
      const sr = document.getElementById('bnp-panel-host').shadowRoot;
      const rows = [...sr.querySelectorAll('.sheet .res .row')];
      return {
        status: sr.querySelector('.sheet .status').textContent,
        first: rows[0] ? rows[0].querySelector('button').textContent : '',
        n: rows.length,
      };
    });
    ok(/找到约 2 个结果/.test(r1.status), `搜索结果状态正确（${r1.status}）`);
    ok(r1.first === '＋ 再加一组', `已在别组的成员显示「＋ 再加一组」（${r1.first}）`);

    await page.evaluate(() => {
      const sr = document.getElementById('bnp-panel-host').shadowRoot;
      const btn = [...sr.querySelectorAll('.sheet .res .row button')][0];
      btn.click();
    });
    await sleep(400);
    const r2 = await page.evaluate(() => ({
      groups: window.__bnp.groupsOf('186463'),
      cards: (window.__bnp.targets.find((t) => t.uid === '186463') || {}).cards || [],
    }));
    ok(r2.groups.join(',') === 'VirtuaReal,PSPLive', `同一个人同时在两个组里，且按分组顺序排列（${r2.groups.join('、')}）`);
    ok(r2.cards.join('|') === '🏷️VirtuaReal|🏷️PSPLive', `页面上并排显示两枚铭牌，顺序跟分组一致（${r2.cards.join(' / ')}）`);

    // 切成「只显示第一个」
    const r3 = await page.evaluate(async () => {
      const sr = document.getElementById('bnp-panel-host').shadowRoot;
      const sel = sr.querySelectorAll('.bar select')[1];
      sel.value = 'first';
      sel.dispatchEvent(new Event('change'));
      await new Promise((res) => requestAnimationFrame(() => requestAnimationFrame(res)));
      return (window.__bnp.targets.find((t) => t.uid === '186463') || {}).cards || [];
    });
    ok(r3.join('|') === '🏷️VirtuaReal', `「只显示第一个」时只剩排在前面的那枚（${r3.join(' / ')}）`);

    // 把 PSPLive 拖到第一位，铭牌顺序应该跟着换
    const r4 = await page.evaluate(async () => {
      const psp = window.__bnp.groups.find((g) => g.name === 'PSPLive');
      const vr = window.__bnp.groups.find((g) => g.name === 'VirtuaReal');
      window.__bnp.reorder(psp.id, vr.id, false);
      const sr = document.getElementById('bnp-panel-host').shadowRoot;
      const sel = sr.querySelectorAll('.bar select')[1];
      sel.value = 'all';
      sel.dispatchEvent(new Event('change'));
      window.dispatchEvent(new Event('scroll'));
      await new Promise((res) => requestAnimationFrame(() => requestAnimationFrame(res)));
      return {
        order: window.__bnp.groups.map((g) => g.name),
        cards: (window.__bnp.targets.find((t) => t.uid === '186463') || {}).cards || [],
      };
    });
    ok(r4.order[0] === 'PSPLive', `PSPLive 已排到第一位（${r4.order.join('、')}）`);
    ok(r4.cards.join('|') === '🏷️PSPLive|🏷️VirtuaReal', `铭牌顺序跟随分组顺序（${r4.cards.join(' / ')}）`);
    await page.close();
  }

  /* 14. 首次安装不自动导入自带分组 */
  console.log('\n[14] 首次安装不导入自带分组');
  {
    const page = await newPage(browser, 'https://t.bilibili.com/', { firstRun: true });
    const info = await page.evaluate(() => ({
      groups: window.__bnp.groups.length,
      members: Object.keys(window.__bnp.members).length,
      savedGroups: Object.prototype.hasOwnProperty.call(window.__gm, 'groups'),
      savedMembers: Object.prototype.hasOwnProperty.call(window.__gm, 'members'),
    }));
    ok(info.groups === 0 && info.members === 0, `装完是空名单（${info.groups} 组 / ${info.members} 人）`, info);
    ok(!info.savedGroups && !info.savedMembers, '本地存储一个键都没写', info);

    const c = await cards(page);
    ok(c.length === 0, `页面上不挂任何铭牌（${c.length}）`, c);

    await page.evaluate(() => window.__bnp.open());
    await sleep(280);
    const empty = await page.evaluate(() => {
      const sr = document.getElementById('bnp-panel-host').shadowRoot;
      const box = sr.querySelector('.empty');
      return box ? [...box.querySelectorAll('button')].map((b) => b.textContent.trim()) : null;
    });
    ok(empty && empty.includes('导入测试分组'), `空面板里有「导入测试分组」入口（${(empty || []).join(' / ')}）`);
    await page.screenshot({ path: path.join(SHOTS, 'first-run.png') });

    // 点空面板里的那个按钮 → 确认 → 名单才落进本地存储
    const after = await page.evaluate(async () => {
      const sr = document.getElementById('bnp-panel-host').shadowRoot;
      const btn = [...sr.querySelectorAll('.empty button')].find((b) => b.textContent.trim() === '导入测试分组');
      btn.click();
      await new Promise((r) => setTimeout(r, 150));
      const asked = !!sr.querySelector('.cover.on');
      sr.querySelector('.cover.on .cbox .danger').click();
      await new Promise((r) => setTimeout(r, 350));
      return {
        asked,
        groups: window.__bnp.groups.length,
        members: Object.keys(window.__bnp.members).length,
        empty: !!sr.querySelector('.empty'),
        saved: (window.__gm.groups || []).length,
      };
    });
    ok(after.asked, '先弹确认框再动手');
    ok(after.groups === 7 && after.members === 2577 && after.saved === 7, `确认后导入 7 组 / 2577 人（${after.groups} / ${after.members}）`, after);
    ok(!after.empty, '空状态被名单替换掉');
    await page.close();
  }

  /* 15. 导入测试分组：只补不删 */
  console.log('\n[15] 导入测试分组');
  {
    const page = await newPage(browser, 'https://t.bilibili.com/', { firstRun: true });
    const r = await page.evaluate(() => {
      const first = window.__bnp.restoreDefaults();
      const per = {};
      for (const m of Object.values(window.__bnp.members)) for (const gid of m.gids) per[gid] = (per[gid] || 0) + 1;
      const groups = window.__bnp.groups.map((g) => [g.name, per[g.id] || 0, g.badge]);
      const on = window.__bnp.groups.map((g) => g.on !== false);
      const saved = (window.__gm.groups || []).length;
      const total = Object.keys(window.__bnp.members).length;
      window.__bnp.removeMember('186463');
      const mid = Object.keys(window.__bnp.members).length;
      const again = window.__bnp.restoreDefaults();
      const third = window.__bnp.restoreDefaults();
      return {
        first, groups, on, saved, total, mid,
        again, third,
        back: !!window.__bnp.members['186463'],
        after: Object.keys(window.__bnp.members).length,
      };
    });
    ok(r.first.created === 7 && r.first.added === 2584, `导入 7 个分组、2584 条记录（${JSON.stringify(r.first)}）`);
    ok(
      r.groups.map((g) => g[0]).join(',') ===
        '测试分组1-VirtuaReal,测试分组2-PSPLive,测试分组3-Providence,测试分组4-Aurora,测试分组5-Fairy,测试分组6,测试分组7',
      `分组名与顺序正确（${r.groups.map((g) => g[0]).join('、')}）`
    );
    ok(
      r.groups.map((g) => g[1]).join(',') === '74,26,20,17,51,2395,1',
      `各组人数正确（${r.groups.map((g) => g[1]).join('/')}）`
    );
    ok(
      r.groups.map((g) => g[2]).join(',') === '🎀,🐰,👑,🌌,🧚,📦,🧪',
      `各组标记正确（${r.groups.map((g) => g[2]).join('/')}）`
    );
    ok(
      r.on.map((x) => (x ? '1' : '0')).join('') === '1111101',
      `只有「测试分组6」导入后默认不显示（${r.on.map((x) => (x ? 'on' : 'off')).join('/')}）`
    );
    ok(r.total === 2577, `共 2577 位 UP，含跨组重复 7 人（${r.total}）`);
    ok(r.saved === 7, `导入后 7 个分组已落盘（${r.saved}）`);
    ok(r.mid === 2576 && r.again.added === 1 && r.back, `删掉一位后再导入只补回他（${JSON.stringify(r.again)}）`);
    ok(r.third.added === 0 && r.after === 2577, '再点一次不会重复添加', r.third);

    await page.evaluate(() => {
      window.__bnp.settings.mode = 'always';
      window.__bnp.rescan();
    });
    await sleep(300);
    const c = await cards(page);
    ok(c.includes('🐰PSPLive') && c.includes('🎀VirtuaReal'), '导入后铭牌直接可用', c);
    await page.close();
  }

  /* 16. 热搜榜整行链接不能误挂 */
  console.log('\n[16] 热搜榜整行链接');
  {
    const page = await newPage(browser, 'https://t.bilibili.com/hotsearch');
    await seed(page);
    const c = await cards(page);
    ok(c.length === 1, `两条热搜的排名数字没有被当成昵称（铭牌数 ${c.length}）`, c);
    ok(c[0] === '🏷️PSPLive', '同一页里正常的昵称链接仍然挂上了', c);
    await page.close();
  }

  /* 17. 列表复用节点后要自动撤掉 */
  console.log('\n[17] 节点被复用后自动撤销');
  {
    const page = await newPage(browser, 'https://t.bilibili.com/');
    await seed(page);
    const r = await page.evaluate(async () => {
      const before = window.__bnp.targets.length;
      const a = document.querySelector('a.dyn-name[href*="space.bilibili.com/186463"]');
      a.setAttribute('href', '//space.bilibili.com/999999999');
      window.dispatchEvent(new Event('scroll'));
      await new Promise((res) => requestAnimationFrame(() => requestAnimationFrame(res)));
      return { before, after: window.__bnp.targets.length };
    });
    ok(r.before === 2 && r.after === 1, `链接被换人后铭牌自动撤掉（${r.before} → ${r.after}）`, r);
    await page.close();
  }

  /* 18. 动态页顶部「关注的人」竖排胶囊不挂铭牌 */
  console.log('\n[18] 头像在上、名字在下的竖排胶囊');
  {
    const page = await newPage(browser, 'https://t.bilibili.com/tabs');
    await seed(page);
    const c = await cards(page);
    ok(c.length === 1, `顶部胶囊里的两个名字没有挂铭牌（铭牌数 ${c.length}）`, c);
    ok(c[0] === '🏷️PSPLive', '同一页里正常的动态昵称仍然挂上', c);
    const pos = await page.evaluate(() => {
      const sr = document.getElementById('bnp-badge-host').shadowRoot;
      const card = sr.querySelector('.card.on');
      const name = document.querySelector('.dyn-name').getBoundingClientRect();
      return card ? { x: Math.round(card.getBoundingClientRect().x), nameRight: Math.round(name.right) } : null;
    });
    ok(pos && pos.x > pos.nameRight, '铭牌落在昵称右侧，没有压到时间戳', pos);
    await page.screenshot({ path: path.join(SHOTS, 'tabs.png') });
    await page.close();
  }

  /* 19. 面板里拖动分组 */
  console.log('\n[19] 拖动调整分组顺序');
  {
    const page = await newPage(browser, 'https://t.bilibili.com/');
    await seed(page);
    await page.evaluate(() => window.__bnp.open());
    await sleep(200);
    const r = await page.evaluate(async () => {
      const sr = document.getElementById('bnp-panel-host').shadowRoot;
      const secs = [...sr.querySelectorAll('.grp')];
      const from = secs[1];
      const to = secs[0];
      const dt = new DataTransfer();
      from.draggable = true;
      from.dispatchEvent(new DragEvent('dragstart', { bubbles: true, dataTransfer: dt }));
      const head = to.querySelector('.gh').getBoundingClientRect();
      to.dispatchEvent(new DragEvent('dragover', { bubbles: true, dataTransfer: dt, clientY: head.top + 2 }));
      to.dispatchEvent(new DragEvent('drop', { bubbles: true, dataTransfer: dt, clientY: head.top + 2 }));
      await new Promise((res) => setTimeout(res, 80));
      return {
        order: window.__bnp.groups.map((g) => g.name),
        dom: [...sr.querySelectorAll('.grp .nm')].map((e) => e.textContent),
        saved: (window.__gm.groups || []).map((g) => g.name),
      };
    });
    ok(r.order.join(',') === 'PSPLive,VirtuaReal', `拖到最上面后顺序变成 PSPLive、VirtuaReal（${r.order.join('、')}）`);
    ok(r.dom.join(',') === 'PSPLive,VirtuaReal', '面板里的分组立刻重排', r.dom);
    ok(r.saved.join(',') === 'PSPLive,VirtuaReal', '新顺序已写回本地存储', r.saved);
    await page.screenshot({ path: path.join(SHOTS, 'reorder.png') });
    await page.close();
  }

  /* 20. 一人多组的导入与导出往返 */
  console.log('\n[20] 多分组导入 / 导出往返');
  {
    const page = await newPage(browser, 'https://t.bilibili.com/');
    const r1 = await page.evaluate(() => {
      const json = JSON.stringify({
        groups: [
          { name: 'A组', members: [{ uid: 186463, name: '綾奈奈奈' }] },
          { name: 'B组', members: [{ uid: 186463, name: '綾奈奈奈' }, { uid: 1694351351, name: '向阳Hihi' }] },
        ],
      });
      window.__bnp.import(json, 'merge');
      return { mine: window.__bnp.groupsOf('186463'), total: Object.keys(window.__bnp.members).length };
    });
    ok(r1.mine.join(',') === 'A组,B组', `同一 UID 出现在两个组里会合并成份关系（${r1.mine.join('、')}）`);
    ok(r1.total === 2, `名单里仍是两个人（${r1.total}）`);

    const csv = '分组,全部分组,B站昵称,UID\nA组,A组|B组|C组,綾奈奈奈,186463\n';
    const r2 = await page.evaluate((txt) => {
      const p = window.__bnp.parse(txt);
      window.__bnp.import(txt, 'merge');
      return { parsed: p.members[0].gidNames, mine: window.__bnp.groupsOf('186463') };
    }, csv);
    ok(r2.parsed.join('|') === 'A组|B组|C组', `CSV 的「全部分组」列被识别（${r2.parsed.join('|')}）`);
    ok(r2.mine.includes('C组'), `CSV 里的第三个组也加上了（${r2.mine.join('、')}）`);

    const exported = await page.evaluate(() => window.__bnp.exportJson());
    const ex = JSON.parse(exported);
    ok((ex.memberGroups['186463'] || []).join(',') === 'A组,B组,C组', '导出里带上了多重分组关系', ex.memberGroups['186463']);

    // 换一个干净页面把导出的内容再导回去
    const page2 = await newPage(browser, 'https://t.bilibili.com/');
    const r3 = await page2.evaluate((txt) => {
      window.__bnp.import(txt, 'merge');
      return { mine: window.__bnp.groupsOf('186463'), groups: window.__bnp.groups.map((g) => g.name) };
    }, exported);
    ok(r3.mine.join(',') === 'A组,B组,C组', `导出再导入后关系不变（${r3.mine.join('、')}）`);
    ok(r3.groups.length === 3, `三个分组都重建了（${r3.groups.join('、')}）`, r3.groups);
    await page.close();
    await page2.close();
  }

  /* 21. 吸顶导航盖住铭牌时让位 */
  console.log('\n[21] 被吸顶导航盖住');
  {
    const page = await newPage(browser, 'https://t.bilibili.com/occlusion');
    await seed(page);
    const r = await page.evaluate(() => {
      const list = window.__bnp.targets.filter((t) => t.uid === '186463');
      return { total: list.length, on: list.filter((t) => t.on).length };
    });
    ok(r.total === 2, `两个同名锚点都识别到了（${r.total}）`);
    ok(r.on === 1, `只有没被导航遮住的那个显示铭牌（${r.on}）`);
    await page.close();
  }

  /* 22. B 站自己的悬停名片盖上来时让位 */
  console.log('\n[22] 被悬停名片盖住');
  {
    const page = await newPage(browser, 'https://t.bilibili.com/popover');
    await seed(page);
    const before = (await cards(page)).length;
    const during = await page.evaluate(async () => {
      const card = document.querySelectorAll('.card.on');
      const host = document.getElementById('bnp-badge-host');
      const pill = host.shadowRoot.querySelector('.card.on');
      const r = pill.getBoundingClientRect();
      // 模拟 B 站弹出的用户名片：absolute + 高 z-index，正好压在铭牌上
      const pop = document.createElement('div');
      pop.id = 'fake-popover';
      pop.style.cssText = `position:absolute;left:${r.x - 20}px;top:${r.y - 20}px;width:${r.width + 40}px;height:${r.height + 40}px;background:#fff;z-index:1;border-radius:8px`;
      document.body.appendChild(pop);
      window.dispatchEvent(new Event('scroll'));
      await new Promise((res) => setTimeout(res, 260));
      return host.shadowRoot.querySelectorAll('.card.on').length;
    });
    const after = await page.evaluate(async () => {
      document.getElementById('fake-popover').remove();
      window.dispatchEvent(new Event('scroll'));
      await new Promise((res) => setTimeout(res, 260));
      return document.getElementById('bnp-badge-host').shadowRoot.querySelectorAll('.card.on').length;
    });
    ok(before === 1, `正常情况下显示 1 枚（${before}）`);
    ok(during === 0, `名片压上来后自动隐藏（${during}）`);
    ok(after === 1, `名片消失后恢复显示（${after}）`);
    await page.close();
  }

  /* 23. 全屏透明壳子不该让铭牌消失 */
  console.log('\n[23] 铺满全屏的透明层');
  {
    const page = await newPage(browser, 'https://t.bilibili.com/transparent');
    await seed(page);
    const c = await cards(page);
    ok(c.length === 1, `透明 fixed 层（z-index:10）不会让铭牌消失（${c.length}）`, c);
    await page.close();
  }

  /* 24. 列表整块重渲染后铭牌能自己回来 */
  console.log('\n[24] 列表重渲染后的补偿扫描');
  {
    // 把扫描窗口压到 300ms，模拟「页面已经开了很久」，这时候只能靠补偿扫描
    const page = await newPage(browser, 'https://t.bilibili.com/', { scanWindow: 300 });
    await seed(page);
    await sleep(500);
    const r = await page.evaluate(async () => {
      const host = document.getElementById('bnp-badge-host');
      const before = host.shadowRoot.querySelectorAll('.card.on').length;
      // 模拟 B 站列表整块重渲染：把昵称节点换成一个新节点
      const a = document.querySelector('a.dyn-name');
      const clone = a.cloneNode(true);
      a.parentElement.replaceChild(clone, a);
      window.dispatchEvent(new Event('scroll'));
      await new Promise((res) => setTimeout(res, 150));
      const gone = host.shadowRoot.querySelectorAll('.card.on').length;
      await new Promise((res) => setTimeout(res, 1200));
      const back = host.shadowRoot.querySelectorAll('.card.on').length;
      return { before, gone, back };
    });
    ok(r.before === 2, `重渲染前 2 枚（${r.before}）`);
    ok(r.gone <= 1, `旧节点被换掉后先撤下（${r.gone}）`);
    ok(r.back === 2, `补偿扫描把它挂了回来（${r.gone} → ${r.back}）`, r);
    await page.close();
  }

  /* 25. 悬停名片内部的昵称也要挂铭牌（不靠悬停，名片一出现就显示） */
  console.log('\n[25] 悬停名片内部');
  {
    const page = await newPage(browser, 'https://t.bilibili.com/popcard');
    await seed(page, { mode: 'hover' }); // 悬停模式：名片属于浮层，应当直接显示
    const c = await cards(page);
    ok(c.length === 1 && c[0] === '🏷️PSPLive', `名片里的昵称拿到了铭牌（${c.join('/')}）`, c);
    const pos = await page.evaluate(() => {
      const host = document.getElementById('bnp-badge-host');
      const pill = host.shadowRoot.querySelector('.card.on').getBoundingClientRect();
      const name = document.querySelector('.pop-name').getBoundingClientRect();
      const box = document.querySelector('.v-popover').getBoundingClientRect();
      return {
        pill: [Math.round(pill.x), Math.round(pill.y), Math.round(pill.width)],
        nameLeft: Math.round(name.left),
        nameRight: Math.round(name.right),
        box: [Math.round(box.left), Math.round(box.top), Math.round(box.right), Math.round(box.bottom)],
      };
    });
    ok(pos.pill[0] >= pos.box[0] && pos.pill[0] + pos.pill[2] <= pos.box[2], `铭牌完整落在名片内（${pos.pill.join(',')} / 卡片右边界 ${pos.box[2]}）`, pos);
    ok(pos.pill[0] > pos.nameLeft, '铭牌在昵称右侧', pos);
    await page.screenshot({ path: path.join(SHOTS, 'popcard.png') });
    await page.close();
  }

  /* 26. 遮挡物消失后，铭牌不需要任何操作就能自己回来 */
  console.log('\n[26] 遮挡解除后自动恢复');
  {
    const page = await newPage(browser, 'https://t.bilibili.com/popover');
    await seed(page);
    const r = await page.evaluate(async () => {
      const host = document.getElementById('bnp-badge-host');
      const pill = host.shadowRoot.querySelector('.card.on');
      const b = pill.getBoundingClientRect();
      const pop = document.createElement('div');
      pop.id = 'tmp-cover';
      pop.style.cssText = `position:absolute;left:${b.x - 10}px;top:${b.y - 10}px;width:${b.width + 20}px;height:${b.height + 20}px;background:#fff;z-index:1`;
      document.body.appendChild(pop);
      window.dispatchEvent(new Event('scroll'));
      await new Promise((res) => setTimeout(res, 300));
      const covered = host.shadowRoot.querySelectorAll('.card.on').length;
      // 撤掉遮挡物，之后不再派发任何事件
      pop.remove();
      await new Promise((res) => setTimeout(res, 700));
      const back = host.shadowRoot.querySelectorAll('.card.on').length;
      return { covered, back };
    });
    ok(r.covered === 0, `被盖住时隐藏（${r.covered}）`);
    ok(r.back === 1, `遮挡消失后自动恢复，无需任何操作（${r.back}）`, r);
    await page.close();
  }

  /* 27. 大分组分页渲染 */
  console.log('\n[27] 大分组分页渲染');
  {
    const page = await newPage(browser, 'https://t.bilibili.com/', { firstRun: true });
    await page.evaluate(() => {
      window.__bnp.restoreDefaults(); // 大分组要先手动导入，装完默认是空名单
      window.__bnp.open();
    });
    await sleep(300);
    const r = await page.evaluate(async () => {
      const sr = document.getElementById('bnp-panel-host').shadowRoot;
      const sec = [...sr.querySelectorAll('.grp')].find((s) => s.querySelector('.nm').textContent === '测试分组6');
      sec.classList.add('open');
      await new Promise((res) => setTimeout(res, 120));
      const first = sec.querySelectorAll('.ls .row[data-uid]').length;
      const btn = sec.querySelector('.ls .more');
      const label = btn ? btn.textContent : '';
      if (btn) btn.click();
      await new Promise((res) => setTimeout(res, 120));
      return { first, label, second: sec.querySelectorAll('.ls .row[data-uid]').length };
    });
    const meta = await page.evaluate(() => {
      const sr = document.getElementById('bnp-panel-host').shadowRoot;
      const sec = [...sr.querySelectorAll('.grp')].find((s) => s.querySelector('.nm').textContent === '测试分组6');
      const chip = sec.querySelector('.chip');
      return {
        mark: chip.textContent,
        bg: chip.style.background,
        count: sec.querySelector('.ct').textContent,
        on: sec.querySelector('.gh .tg input').checked,
      };
    });
    ok(meta.mark === '📦', `分组标记是包裹（${meta.mark}）`);
    ok(/rgb\(100, 116, 139\)/.test(meta.bg), `底色是中性灰蓝（${meta.bg}）`);
    ok(/2395 人/.test(meta.count), `人数显示正确（${meta.count}）`);
    ok(meta.on === false, '默认是关着的，导入后不会在页面上显示铭牌');
    ok(r.first === 200, `首次只渲染 200 行（${r.first}）`);
    ok(/还有 2195 位/.test(r.label), `按钮写明剩余人数（${r.label}）`);
    ok(r.second === 400, `点一下再加载 200 行（${r.second}）`);
    await page.close();
  }

  /* 28. ⋯ 菜单里的「导入测试分组」 */
  console.log('\n[28] 导入测试分组入口');
  {
    const page = await newPage(browser, 'https://t.bilibili.com/');
    await page.evaluate(() => window.__bnp.open());
    await sleep(250);
    const r = await page.evaluate(() => {
      const sr = document.getElementById('bnp-panel-host').shadowRoot;
      const more = [...sr.querySelectorAll('.bar button')].find((b) => b.textContent.includes('⋯'));
      more.click();
      const items = [...sr.querySelectorAll('.menu button')].map((b) => b.textContent.trim());
      return { items, open: sr.querySelector('.menu').classList.contains('on') };
    });
    ok(r.open, '⋯ 菜单能展开');
    ok(r.items.includes('⇩ 导入测试分组'), `菜单里有「导入测试分组」（${r.items.join(' / ')}）`);
    ok(!r.items.some((t) => t.includes('恢复测试分组')), '旧的「恢复测试分组」已经没有了');
    ok(!r.items.some((t) => t.includes('重新载入')), '旧的「重新载入自带分组」已经没有了');
    await page.close();
  }

  /* 29. 老数据缺头像，升级后自动补齐 */
  console.log('\n[29] 旧数据缺头像自动补齐');
  {
    // 先拿一份正常的存档，把头像字段抹掉，模拟「早前装的版本 + 内置名单后来补了头像」
    const pageA = await newPage(browser, 'https://t.bilibili.com/', { firstRun: true });
    const store = await pageA.evaluate(() => {
      window.__bnp.restoreDefaults(); // 新一代默认空名单，先导入才算「用过一阵子」
      const s = JSON.parse(JSON.stringify(window.__gm));
      for (const m of Object.values(s.members)) m.f = '';
      return s;
    });
    await pageA.close();

    const page = await newPage(browser, 'https://t.bilibili.com/', { store });
    const r = await page.evaluate(() => {
      const all = Object.values(window.__bnp.members);
      const noFace = all.filter((m) => !m.f).length;
      const saved = Object.values(window.__gm.members || {}).filter((m) => m.f).length;
      return { total: all.length, noFace, saved, sample: window.__bnp.members['1437582453'] && window.__bnp.members['1437582453'].f };
    });
    ok(r.total === 2577 && r.noFace === 0, `启动后 2577 位都补上了头像地址（共 ${r.total}，缺 ${r.noFace}）`);
    ok(r.saved > 0, `补齐结果已落盘（${r.saved} 条有头像）`);
    ok(/^https:\/\/i\d\.hdslb\.com\/bfs\/face\//.test(r.sample || ''), `抽查一条是正确的头像地址（${r.sample}）`);
    await page.close();
  }

  /* 30. 隐私 / 后台页面不注入 */
  console.log('\n[30] 账号、支付、主播后台等页面不生效');
  {
    const cases = [
      ['https://www.bilibili.com/account/history', null, '账号 / 历史记录'],
      ['https://live.bilibili.com/p/html/live-hime', null, '主播中心后台'],
      ['https://www.bilibili.com/vip/home', null, '大会员 / 支付'],
      ['https://www.bilibili.com/', 'other', '普通 www 页面'],
    ];
    for (const [url, want, label] of cases) {
      const page = await newPage(browser, url);
      await seed(page);
      const r = await page.evaluate(() => {
        const host = document.getElementById('bnp-badge-host');
        return {
          kind: window.__bnp.pageKind,
          host: !!host,
          cards: host && host.shadowRoot ? host.shadowRoot.querySelectorAll('.card.on').length : 0,
          targets: window.__bnp.targets.length,
        };
      });
      ok(r.kind === want, `${label}：页面类型 ${want}（实际 ${r.kind}）`);
      if (want === null) {
        ok(!r.host && r.cards === 0 && r.targets === 0, `${label}：完全不注入（宿主 ${r.host} / 铭牌 ${r.cards} / 锚点 ${r.targets}）`);
      } else {
        ok(r.cards === 1, `${label}：照常挂铭牌（${r.cards}）`);
      }
      await page.close();
    }
  }

  /* 31. emoji 面板：默认折叠，点一下填进标记框 */
  console.log('\n[31] 标记的 emoji 面板');
  {
    const page = await newPage(browser, 'https://t.bilibili.com/');
    await seed(page);
    await page.evaluate(() => window.__bnp.open());
    await sleep(300);
    const r = await page.evaluate(async () => {
      const sr = document.getElementById('bnp-panel-host').shadowRoot;
      const sec = sr.querySelector('.grp');
      const gname = sec.querySelector('.nm').textContent;
      const before = { pal: !!sec.querySelector('.epal'), emopen: sec.classList.contains('emopen') };
      sec.querySelector('.gh .emo').click();
      await new Promise((res) => setTimeout(res, 150));
      const pal = sec.querySelector('.epal');
      const btns = pal ? [...pal.querySelectorAll('button')] : [];
      const visible = !!pal && getComputedStyle(pal).display === 'flex';
      const pick = btns[7];
      const want = pick ? pick.textContent : '';
      if (pick) pick.click();
      await new Promise((res) => setTimeout(res, 220));
      const bgVal = sec.querySelector('.gh input.bg').value;
      const chip = sec.querySelector('.chip').textContent;
      const stored = (window.__bnp.groups.find((g) => g.name === gname) || {}).badge;
      sec.querySelector('.gh .emo').click();
      await new Promise((res) => setTimeout(res, 150));
      const closed = getComputedStyle(pal).display === 'none';
      return { before, visible, count: btns.length, first: btns[0] ? btns[0].textContent : '', want, bgVal, chip, stored, closed };
    });
    ok(!r.before.pal && !r.before.emopen, '没点的时候是折叠的，面板 DOM 都不建');
    ok(r.visible, '点一下 🙂 就展开');
    ok(r.count >= 60, `面板里有 ${r.count} 个可选 emoji`);
    ok(r.first === '🪓', `第一个是斧头（${r.first}）`);
    ok(r.want && r.bgVal === r.want, `点一个就填进标记框（${r.bgVal}）`);
    ok(r.chip === r.want && r.stored === r.want, `分组色块与本地数据同步更新（${r.chip} / ${r.stored}）`);
    ok(r.closed, '再点一下收起');
    await page.close();
  }

  /* 32. 合并分组 */
  console.log('\n[32] 合并分组');
  {
    const page = await newPage(browser, 'https://t.bilibili.com/');
    const seedJson = JSON.stringify({
      groups: [
        { name: '甲组', badge: '🅰️', text: '甲', color: '#7c5cff', members: [{ uid: 186463, name: '綾奈奈奈' }, { uid: 1694351351, name: '向阳Hihi' }] },
        { name: '乙组', badge: '🅱️', text: '乙', color: '#ff6b9d', members: [{ uid: 186463, name: '綾奈奈奈' }, { uid: 415297421, name: '小号' }] },
        { name: '丙组', badge: '🆑', text: '丙', color: '#10b981', members: [{ uid: 415297421, name: '小号' }, { uid: 999000111, name: '路人甲' }] },
      ],
    });
    await page.evaluate((t) => window.__bnp.import(t, 'merge'), seedJson);
    await page.evaluate(() => window.__bnp.open());
    await sleep(220);

    const opened = await page.evaluate(async () => {
      const sr = document.getElementById('bnp-panel-host').shadowRoot;
      [...sr.querySelectorAll('.bar .btn')].find((b) => b.textContent.trim() === '⋯').click();
      await new Promise((r) => setTimeout(r, 120));
      const item = [...sr.querySelectorAll('.menu button')].find((b) => b.textContent.includes('合并分组'));
      const hasItem = !!item;
      item.click();
      await new Promise((r) => setTimeout(r, 160));
      const sheet = sr.querySelector('.sheet.on');
      const rows = sheet ? [...sheet.querySelectorAll('.res .row')] : [];
      const go = sheet.querySelector('.sfoot .btn.pri');
      rows[0].querySelector('input').click();
      await new Promise((r) => setTimeout(r, 60));
      const one = { disabled: go.disabled, status: sheet.querySelector('.status').textContent };
      rows[1].querySelector('input').click();
      await new Promise((r) => setTimeout(r, 60));
      return {
        hasItem,
        title: sheet && sheet.querySelector('h3').textContent,
        rows: rows.length,
        labels: rows.map((r) => r.querySelector('.n').textContent),
        one,
        two: { disabled: go.disabled, status: sheet.querySelector('.status').textContent },
        name: sheet.querySelector('.fieldrow input').value,
      };
    });
    ok(opened.hasItem, '「⋯」菜单里有「合并分组」入口');
    ok(opened.title === '合并分组' && opened.rows === 3, `弹出的面板列出 3 个分组（${opened.labels.join('、')}）`);
    ok(opened.one.disabled && /再选 1 个/.test(opened.one.status), `只选 1 个时不能合并（${opened.one.status}）`);
    ok(!opened.two.disabled && /去重后共 3 位 UP/.test(opened.two.status), `选 2 个后可合并，并给出并集人数（${opened.two.status}）`);
    ok(opened.name === '甲组', `名称默认取最靠前的分组（${opened.name}）`);
    await page.screenshot({ path: path.join(SHOTS, 'merge.png') });

    const after = await page.evaluate(async () => {
      const sr = document.getElementById('bnp-panel-host').shadowRoot;
      const sheet = sr.querySelector('.sheet.on');
      const input = sheet.querySelector('.fieldrow input');
      input.value = '合并后';
      input.dispatchEvent(new Event('input', { bubbles: true }));
      sheet.querySelector('.sfoot .btn.pri').click();
      await new Promise((r) => setTimeout(r, 180));
      const asked = !!sr.querySelector('.cover.on');
      sr.querySelector('.cover.on .cbox .danger').click();
      await new Promise((r) => setTimeout(r, 300));
      return {
        asked,
        groups: window.__bnp.groups.map((g) => g.name),
        ofA: window.__bnp.groupsOf('186463'),
        ofB: window.__bnp.groupsOf('415297421'),
        ofC: window.__bnp.groupsOf('999000111'),
        total: Object.keys(window.__bnp.members).length,
        sheetClosed: !sr.querySelector('.sheet.on'),
        saved: (window.__gm.groups || []).map((g) => g.name),
        dom: [...sr.querySelectorAll('.grp .nm')].map((e) => e.textContent),
      };
    });
    ok(after.asked, '合并前先弹确认框');
    ok(after.groups.join(',') === '合并后,丙组', `两个分组合并成一个并改名（${after.groups.join('、')}）`);
    ok(after.ofA.join(',') === '合并后', `同时在两个组里的人只留一份归属（${after.ofA.join('、')}）`);
    ok(after.ofB.join(',') === '合并后,丙组', `跨组关系不受影响（${after.ofB.join('、')}）`);
    ok(after.ofC.join(',') === '丙组', `未参与合并的分组保持原样（${after.ofC.join('、')}）`);
    ok(after.total === 4, `成员一个都没丢（${after.total} 位）`);
    ok(after.sheetClosed && after.dom.join(',') === '合并后,丙组', '面板即时刷新并关闭弹层', after.dom);
    ok(after.saved.join(',') === '合并后,丙组', '新分组结构已写回本地存储', after.saved);
    await page.close();
  }

  console.log(`\n${fail ? '✗' : '✓'} 通过 ${pass} 项，失败 ${fail} 项`);
} finally {  await browser.close();
}

process.exit(fail ? 1 : 0);
