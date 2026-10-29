/**
 * build.mjs
 * 把 src/main.user.js 打包成 dist/，做四件事：
 *   1. 可选地升版本号（--bump / --bump=minor / --bump=major）
 *   2. 把 src/defaults.json（首次安装自带的初始分组）内联进脚本
 *   3. 语法自检（只解析、不执行）
 *   4. 报告产物大小
 *
 * 用法：
 *   node scripts/build.mjs
 *   node scripts/build.mjs --bump
 *   node scripts/build.mjs --bump=minor
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const SRC = path.join(ROOT, 'src/main.user.js');
const DEFAULTS = path.join(ROOT, 'src/defaults.json');
const OUT = path.join(ROOT, 'dist/bili-up-nameplate.user.js');

const args = process.argv.slice(2);
const bumpArg = args.find((a) => a.startsWith('--bump'));
const bumpKind = bumpArg ? bumpArg.split('=')[1] || 'patch' : null;

let src = fs.readFileSync(SRC, 'utf8');

if (bumpKind) {
  const m = src.match(/@version\s+(\d+)\.(\d+)\.(\d+)/);
  if (!m) throw new Error('未找到 @version');
  let [maj, min, pat] = [Number(m[1]), Number(m[2]), Number(m[3])];
  if (bumpKind === 'major') {
    maj++;
    min = 0;
    pat = 0;
  } else if (bumpKind === 'minor') {
    min++;
    pat = 0;
  } else pat++;
  src = src.replace(m[0], `@version      ${maj}.${min}.${pat}`);
  fs.writeFileSync(SRC, src, 'utf8'); // 版本号写回源文件，避免下次构建又退回旧号
  console.log(`version -> ${maj}.${min}.${pat}`);
}

/* ---- 元数据自检 ---- */
const need = [
  /@name\s+B站 UP 分组铭牌/,
  /@name:en\s+Bilibili UP Group Nameplate/,
  /@icon\s+data:image\/png;base64,[A-Za-z0-9+/=]{500,}/,
  /@match\s+https:\/\/www\.bilibili\.com/,
  /@exclude\s+https:\/\/www\.bilibili\.com\/account\//,
  /@grant\s+GM_getValue/,
  /@grant\s+GM_setValue/,
];
for (const re of need) if (!re.test(src)) throw new Error(`userscript 头缺少 ${re}`);

/* ---- 内联自带分组 ---- */
if (!src.includes('__DEFAULT_ROSTER__')) throw new Error('模板缺少 __DEFAULT_ROSTER__ 占位符');
const defaults = JSON.parse(fs.readFileSync(DEFAULTS, 'utf8'));
if (!Array.isArray(defaults.groups) || !defaults.groups.length) throw new Error('defaults.json 里没有分组');
const seen = new Set();
let total = 0;
let dup = 0;
for (const g of defaults.groups) {
  if (!g.name) throw new Error('defaults.json 有分组缺 name');
  for (const m of g.members || []) {
    const uid = String(m.uid);
    if (!/^\d{1,20}$/.test(uid)) throw new Error(`${g.name} 里有非法 UID：${uid}`);
    if (seen.has(uid)) dup++;
    seen.add(uid);
    total++;
  }
}
console.log('defaults', defaults.groups.map((g) => `${g.name}:${g.members.length}`).join(' '), `total ${total}`, dup ? `(跨组重复 ${dup} 人，会同时属于多个组)` : '');
src = src.replace('__DEFAULT_ROSTER__', () => JSON.stringify(defaults));

/* ---- 语法自检（只解析不执行） ---- */
try {
  new Function(src);
} catch (e) {
  throw new Error('产物语法错误：' + e.message);
}

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, src, 'utf8');
console.log('wrote', path.relative(ROOT, OUT), (fs.statSync(OUT).size / 1024).toFixed(1) + ' KB');
