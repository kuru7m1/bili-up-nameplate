/**
 * scripts/fill-moe.mjs
 * 补资料脚本：把 src/defaults.json 里缺昵称的成员补齐（昵称/粉丝数，头像可关）。
 * 存在的意义是「名单太大时不能一口气打」——card 接口会返回 -412 封 IP，
 * 所以这里做了低速 + 退避 + 断点续跑：每补完一批就落盘，随时可以中断再启动。
 *
 * 用法：node scripts/fill-moe.mjs [--faces] [--rate=6]
 *   --faces   同时补头像（默认不补，控制产物体积）
 *   --rate    每秒请求数，默认 6
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const FILE = path.join(ROOT, 'src/defaults.json');
const args = process.argv.slice(2);
const wantFaces = args.includes('--faces');
const rate = Number((args.find((a) => a.startsWith('--rate=')) || '--rate=6').split('=')[1]) || 6;
const gap = Math.round(1000 / rate);

const data = JSON.parse(fs.readFileSync(FILE, 'utf8'));
const todo = [];
for (const g of data.groups) {
  for (const m of g.members) {
    if (!m.name) todo.push({ group: g.name, m });
  }
}
console.log(`待补 ${todo.length} 位（${rate}/s，gap ${gap}ms）`);
if (!todo.length) process.exit(0);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36';

let banUntil = 0;

/** 先确认封禁解除，再开始批量补，避免一上来把重试次数耗光 */
async function waitForUnban() {
  for (let i = 0; i < 25; i++) {
    try {
      await fetchCard('186463');
      return true;
    } catch (e) {
      console.log('  仍被限流（' + e.message + '），60s 后再试');
      await sleep(60000);
    }
  }
  return false;
}

if (!(await waitForUnban())) {
  console.log('封禁迟迟未解除，先退出；稍后重跑本脚本即可续传');
  process.exit(2);
}
console.log('已解封，开始补资料');

async function fetchCard(uid) {
  const url = `https://api.bilibili.com/x/web-interface/card?mid=${uid}${wantFaces ? '&photo=true' : ''}`;
  const res = await fetch(url, {
    headers: { 'User-Agent': UA, Referer: `https://space.bilibili.com/${uid}`, Accept: 'application/json' },
    signal: AbortSignal.timeout(15000), // 没超时会挂死在半开的连接上
  });
  const text = await res.text();
  if (text.trim().startsWith('<')) {
    const e = new Error('banned');
    e.banned = true;
    throw e;
  }
  const j = JSON.parse(text);
  if (j.code === -412 || j.code === -352) {
    const e = new Error(`code ${j.code}`);
    e.banned = true;
    throw e;
  }
  if (j.code !== 0 || !j.data || !j.data.card) throw new Error(`code ${j.code}`);
  const c = j.data.card;
  return {
    name: c.name || '',
    face: wantFaces ? String(c.face || '').replace(/^\/\//, 'https://') : '',
    fans: Number(c.fans != null ? c.fans : j.data.follower) || 0,
  };
}

function save() {
  fs.writeFileSync(FILE, JSON.stringify(data, null, 1), 'utf8');
}

let done = 0;
let filled = 0;
let banCount = 0;

for (let i = 0; i < todo.length; i++) {
  const { m } = todo[i];
  // 被封了就等一会儿，越封越久
  if (banUntil > Date.now()) await sleep(banUntil - Date.now());

  let ok = false;
  for (let attempt = 0; attempt < 6 && !ok; attempt++) {
    try {
      const c = await fetchCard(m.uid);
      m.name = c.name;
      if (wantFaces) m.face = c.face;
      m.fans = c.fans;
      filled++;
      ok = true;
    } catch (e) {
      if (e.banned) {
        banCount++;
        const wait = Math.min(300000, 30000 * attempt + 30000);
        banUntil = Date.now() + wait;
        console.log(`  被风控，暂停 ${Math.round(wait / 1000)}s`);
        await sleep(wait);
      } else {
        await sleep(400);
      }
    }
  }
  done++;
  if (done % 100 === 0) {
    save();
    console.log(`  ${done}/${todo.length}，成功 ${filled}，封禁 ${banCount} 次`);
  }
  await sleep(gap);
  if ((i + 1) % 300 === 0) await sleep(8000); // 每 300 个喘口气
}

save();
const left = data.groups.flatMap((g) => g.members).filter((m) => !m.name).length;
console.log(`完成：成功 ${filled}，仍缺 ${left}，封禁 ${banCount} 次`);
