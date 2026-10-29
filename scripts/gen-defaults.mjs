/**
 * scripts/gen-defaults.mjs
 * 把 src/roster/uids_*.txt 里的 UID 补成「昵称 + 头像 + 粉丝数」，产出 src/defaults.json。
 * 这份 json 会被 build.mjs 内联进脚本，作为首次安装时的初始分组。
 *
 * 分组名、标记、颜色在下面的 GROUPS 里维护；UID 清单可以直接改 txt 再重跑本脚本。
 *
 * 用法：node scripts/gen-defaults.mjs
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const ROSTER_DIR = path.join(ROOT, 'src/roster');
const OUT = path.join(ROOT, 'src/defaults.json');

/* 组顺序即面板里的显示顺序；标记、铭牌文字与颜色只是初值，用户随时可改
 * name 是面板里的组名（带「测试分组N-」前缀，方便一眼看出是示例数据）；
 * text 是浮标上真正显示的字，留空则回退到组名 */
const GROUPS = [
  { name: '测试分组1-VirtuaReal', text: 'VirtuaReal', file: 'uids_VirtuaReal.txt', badge: '🎀', color: '#7c5cff' },
  { name: '测试分组2-PSPLive', text: 'PSPLive', file: 'uids_PSPLive.txt', badge: '🐰', color: '#ff6b9d' },
  { name: '测试分组3-Providence', text: 'Providence', file: 'uids_Providence.txt', badge: '👑', color: '#f59e0b' },
  { name: '测试分组4-Aurora', text: 'Aurora', file: 'uids_Aurora.txt', badge: '🌌', color: '#3b82f6' },
  { name: '测试分组5-Fairy', text: 'Fairy', file: 'uids_Fairy.txt', badge: '🧚', color: '#10b981' },
  // 示范 / 压测用的分组：名单很大，只用来验证「大分组」下的表现，默认不显示
  { name: '测试分组6', text: '', file: 'moe_merged_uids.txt', badge: '📦', color: '#64748b', on: false },
  { name: '测试分组7', text: '', file: 'uids_测试分组2.txt', badge: '🧪', color: '#0d9488' },
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** 并发 2、起步间隔 150ms，避免把公开接口打急 */
const queue = { max: 4, gap: 80, running: 0, last: 0, list: [] };
function pump() {
  if (queue.running >= queue.max || !queue.list.length) return;
  const delay = Math.max(0, queue.last + queue.gap - Date.now());
  queue.running++;
  queue.last = Date.now() + delay;
  const job = queue.list.shift();
  setTimeout(() => {
    job
      .fn()
      .then(job.resolve, job.reject)
      .finally(() => {
        queue.running--;
        pump();
      });
  }, delay);
}
const schedule = (fn) => new Promise((resolve, reject) => (queue.list.push({ fn, resolve, reject }), pump()));

async function fetchCard(uid) {
  const url = `https://api.bilibili.com/x/web-interface/card?mid=${uid}&photo=true`;
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const res = await fetch(url, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36',
          Referer: `https://space.bilibili.com/${uid}`,
          Accept: 'application/json',
        },
      });
      const j = await res.json();
      if (j.code !== 0 || !j.data || !j.data.card) throw new Error(`code ${j.code} ${j.message || ''}`);
      const c = j.data.card;
      return {
        uid: String(c.mid),
        name: c.name || '',
        face: String(c.face || '').replace(/^\/\//, 'https://'),
        fans: Number(c.fans != null ? c.fans : j.data.follower) || 0,
      };
    } catch (e) {
      if (attempt === 1) throw e;
      await sleep(600);
    }
  }
}

const out = { generatedAt: '', groups: [] };
const failed = [];

for (const g of GROUPS) {
  const file = path.join(ROSTER_DIR, g.file);
  const uids = [...new Set(fs.readFileSync(file, 'utf8').split(/\r?\n/).map((s) => s.trim()).filter(Boolean))];
  const bad = uids.filter((u) => !/^\d{1,20}$/.test(u));
  if (bad.length) throw new Error(`${g.file} 里有非 UID 内容：${bad.join(', ')}`);

  // 先把整个组的请求排进队列，再统一等结果——不然 await 在循环里会变成串行
  let done = 0;
  const tasks = uids.map((uid) =>
    schedule(() => fetchCard(uid))
      .then((c) => {
        if (g.faces === false) c.face = '';
        if (++done % 200 === 0) console.log(`  ${g.name} ${done}/${uids.length}`);
        return c;
      })
      .catch((e) => {
        failed.push({ group: g.name, uid, error: e.message });
        return { uid, name: '', face: '', fans: 0 };
      })
  );
  const members = await Promise.all(tasks);
  members.sort((a, b) => (b.fans || 0) - (a.fans || 0));
  const entry = { name: g.name, badge: g.badge, text: g.text || '', color: g.color, members };
  if (g.on === false) entry.on = false; // 导入后在面板里默认处于关闭状态
  out.groups.push(entry);
  console.log(`${g.name}: ${members.length} 人，缺名 ${members.filter((m) => !m.name).length} 人`);
  if (g.faces === false) console.log(`  （${g.name} 不带头像，控制体积）`);
}

out.generatedAt = (() => {
  const d = new Date();
  const p = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`;
})();
fs.writeFileSync(OUT, JSON.stringify(out, null, 1), 'utf8');

const total = out.groups.reduce((n, g) => n + g.members.length, 0);
console.log(`\nwrote ${path.relative(ROOT, OUT)}：${out.groups.length} 组 / ${total} 人，失败 ${failed.length}`);
if (failed.length) console.log(JSON.stringify(failed.slice(0, 10), null, 1));
