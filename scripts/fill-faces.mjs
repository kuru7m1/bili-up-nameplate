/**
 * scripts/fill-faces.mjs
 * 给 src/defaults.json 里缺头像的成员补「头像地址」。
 * 只用 B 站官方 card 接口，低速 + 退避 + 断点续跑：
 *   - 默认 0.8 次/秒，被限流（-412 / -352）就停 45s 再试，连续 3 次直接退出；
 *   - 每补 100 条落盘一次，随时可以中断再跑。
 *
 * 用法：node scripts/fill-faces.mjs [--rate=0.8]
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const FILE = path.join(ROOT, 'src/defaults.json');
const args = process.argv.slice(2);
const rate = Number((args.find((a) => a.startsWith('--rate=')) || '--rate=0.8').split('=')[1]) || 0.8;
const gap = Math.round(1000 / rate);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36';

const data = JSON.parse(fs.readFileSync(FILE, 'utf8'));
const todo = [];
for (const g of data.groups) for (const m of g.members) if (!m.face) todo.push(m);
console.log(`待补头像 ${todo.length} 位（${rate}/s）`);
if (!todo.length) process.exit(0);

const save = () => fs.writeFileSync(FILE, JSON.stringify(data, null, 1), 'utf8');

let got = 0;
let ban = 0;
let done = 0;
for (const m of todo) {
  try {
    const res = await fetch(`https://api.bilibili.com/x/web-interface/card?mid=${m.uid}&photo=true`, {
      headers: { 'User-Agent': UA, Referer: `https://space.bilibili.com/${m.uid}` },
      signal: AbortSignal.timeout(15000),
    });
    const text = await res.text();
    if (text.trim().startsWith('<')) throw Object.assign(new Error('banned'), { banned: true });
    const j = JSON.parse(text);
    if (j.code === -412 || j.code === -352) throw Object.assign(new Error(`code ${j.code}`), { banned: true });
    if (j.code === 0 && j.data && j.data.card && j.data.card.face) {
      m.face = String(j.data.card.face).replace(/^\/\//, 'https://');
      if (!m.fans) m.fans = Number(j.data.card.fans) || 0;
      got++;
      ban = 0;
    }
  } catch (e) {
    if (e.banned) {
      ban++;
      console.log(`  被限流（${e.message}），暂停 45s`);
      if (ban >= 3) {
        save();
        console.log('连续被限流，先退出；稍后重跑本脚本即可续传');
        process.exit(2);
      }
      await sleep(45000);
    }
  }
  done++;
  if (done % 100 === 0) {
    save();
    console.log(`  ${done}/${todo.length}，补到 ${got}`);
  }
  await sleep(gap);
}

save();
const left = data.groups.flatMap((g) => g.members).filter((m) => !m.face).length;
console.log(`完成：补到 ${got}，仍缺 ${left}`);
