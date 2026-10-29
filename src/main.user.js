// ==UserScript==
// @name         B站 UP 分组铭牌
// @name:en      Bilibili UP Group Nameplate
// @namespace    https://github.com/kuru7m1/bili-up-nameplate
// @version      1.5.0
// @description  给任意 B 站 UP 主挂上你自己定义的分组铭牌：分组名、浮标颜色、标记全部自定义，名单与设置只存本地，不上传任何数据。
// @description:en  Attach your own custom group nameplates to any Bilibili uploader. Groups, colors and marks are fully customisable; all data stays local.
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAGwUlEQVR4nOybfWxTVRTAz72v68e6ra/so1U3NmRrQWfQgIkYAgQkIaiQDBWIiQmC8YMYgvoXikbFf4wokihGjfFrBpwJMjH+wUhQMZEof6gEaRkTxjDrWNeWbaxd23s9rwtzQO9r3+Ox7K37ZVvbd869vffcr3PPvaNQ4FAocAreABbQieytX8wZmQeUdsa6B78D6BqCcaS4ovamIsm+ggBzpghvG+huPwE6IKCZOrvsse4hhKwa87CTpVJNsd7Tx2AccHl8ayiQj7H0JZefcQ7boqHAdtCI5iHg8li3XVV5henUYvmptGrmvXCDwcpvpITsGVt5BULgdVdVwzLQiGYDUAILBaJiC5XaXB7/ErhByB7/Zqz8RyAsG9H83ZoNwIGkxFLiQAMdcnvqHwSDkat8L2Mr71TTYZkfbWhfBThvzalDpFaX1/8IGITs9e0glLyaS48T+BY0otkA0VDwHTTCr7n0MOO92GqPwXXi9vp3EyDP5dLDSXDXxe7gb6ARXX5ARBpYmo8RcKL6FCemp0AfBMf8l/iaT/rduAJsBh1IoIf+/mR80PGV3Vk0H1eEGSI1MsIDDmd5Ij4YPgIakL3+Fhzza3MqMngzEgpsAZ1o8gPQ+VlEmFTNCa/ClC7sdkU4827NJy3nbCdaJJaPLuHgQ911uTX5OQ7wychbiBHgISzb+Wh3+4+QJzkNUOKtv83C6dNYoEdR2Q0mgAO/gBZvZiz9/sULHafUdIUGwPV8Bk4Q2zGztdiNTbln4JynsYqfJ1J821A4eD6bTrY5gODE9QIuO/twDN6pDGIwKUrDYenvskjwjN05rT8+2Hf0Gp0rPnk8Thlc+zHhUpiEYI84GA1dWjV24za2a1OsfOtkrbwC1m2Z21v8DYxp+NEhIHsa3sYek8fMa3ZIg6Okojg+ED6Y+aT8cVXVz6RUas+VFCdExdP6Gd8dx99/YEKB/ggnd2AzL8RKzc2pnkjWRiIdnZmACCXSa6rKnMcw803RnmAzTFwOX34jexvWE07fxeYtFSlza9Er+LKByHKdTOy2iFAR4GxiOL1gqK+9C0yEY9rMGrtV+gV7Ro1IJ8KjJZTZrMvVMiIMVpqt8gpDfafPsRRpUtNxQ+kSivv3FSIFbP2WSE/gTzApsd7A7zh8vxfJGaHLlWVwljAHxvaAycEYQYtIRjiZTXHjcbNQgUiqfrQZYJyfFEt5DQZXyS0icTyZjILJwRUuJJKhm3xLjk0O9g+TkxhOpsVSjGFCgaP7ZCgrlZUlbiqvxNm1GmffY7FQ8BAYAJ4FLMX+OheDKucupukB6A30559avRcbZoDSUl+FRKENCzon061wgGFMrxVjdavgOnB7fAcwr/szHzAs4bbwrlSF/77+3kAADMCwIWAphvdwtzVn7DO0wUqMLTwJOnF7fZtGK/9/rtWSBT4AgzDGANPqy7CgWc8BKKFNoBPOyepsz3Gzs9jtvtUF+eWiGtAxxABlVjpL5et9oBNCeINIlrZZ/JBfLqpzgCEG4IwJw+sYqdU/z3CVoC1neZZ9HHqAmTGmB6SJ2GPkRL83SUB4jsBTNM98x2EIDIRP/Y3ddSCbDKNIuY/QBOAkeDR7nhDpDwdPggEYNgQY8I3XPuVdSZ58CXSSZImtaIVr4/mMbQSDMMwRQq9vb5nX1yFxeAK7bjW23jF0xHcMRs/oHgKDF850F8l1jWCzPY8+xTw0RidLpz808ioOweNn4RiJD6drzBgNGstIaMzSKZJPrQJQ4EwZAAqcKQOoCW22tL4rNBMIm7VItQ4Uj4yFZ3yMF3nA5KRZUhj1xrp34LkI+VekgKa7G0yOBNI9QiGBLmUIHBfJcTe6HkwOepCPC4UM/qJpxvcLE+Mxs3IzG0yKy+PfgBa4XSTHSMG+TLBA9vgiGM+ThYqQXqzl6tlEQIkkU0LaRHLcpfZGu4OVI6sAgV1qmRGQDsuehmcBqh0w0VHuOXl8W9Qqr4DD+y3ldaQHyHUy2G0dOe8B4p4fLafc1T8PE5NaPPB8GMvnVFPC2b8nGhquBTgTH42XKRebCSWfQQHAANbEugNfK+9HnYT4YPgPe0m5siwugskM5y9GQ8HRc4UrvKT4QPiww1lux5lzAUxCGIc3sPJX/N9B1pCxq7L+ISJJzSi0wiQA560E9vt10Z7gvqtlWf3kxKW+EzZnRTMmLcePjWa9Lpu5K0zgC5JINUXD7VkDrLlvi5c3zLZY6GpUXIHa88EU8CPY7D+kWapF923x7FQ7yrzFjRR4Iyadrj39DQPjmvwsnhUcz1yM0oBpb4IbxVRABAqc/wAAAP//Gguy8wAAAAZJREFUAwAbvCAxOWSYHAAAAABJRU5ErkJggg==
// @author       kuru7m1
// @license      MIT
// @homepageURL  https://github.com/kuru7m1/bili-up-nameplate
// @supportURL   https://github.com/kuru7m1/bili-up-nameplate/issues
// @match        https://www.bilibili.com/*
// @match        https://space.bilibili.com/*
// @match        https://t.bilibili.com/*
// @match        https://search.bilibili.com/*
// @match        https://live.bilibili.com/*
// @exclude      https://www.bilibili.com/account/*
// @exclude      https://www.bilibili.com/vip/*
// @exclude      https://www.bilibili.com/pay/*
// @exclude      https://www.bilibili.com/wallet/*
// @exclude      https://www.bilibili.com/medialist/*
// @exclude      https://www.bilibili.com/list/*
// @exclude      https://live.bilibili.com/p/*
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_registerMenuCommand
// @grant        GM_openInTab
// @grant        GM_xmlhttpRequest
// @connect      api.bilibili.com
// @run-at       document-idle
// @noframes
// ==/UserScript==

(function () {
  'use strict';

  /* ============================================================
   * 0. 元信息
   * ============================================================ */
  const APP = {
    id: 'bnp',
    name: 'B站 UP 分组铭牌',
    nameEn: 'bili-up-nameplate',
    version: '1.0.0',
  };
  const NS = 'bnp';

  /**
   * 自带的「测试分组」（由 scripts/build.mjs 从 src/defaults.json 内联）。
   * 装好之后不会自动写入：只有用户主动点「⋯ → 导入测试分组」才会落地；
   * 落过之后增删改都归用户，脚本不会在下次启动时把它们加回来。
   */
  const DEFAULT_ROSTER = __DEFAULT_ROSTER__;

  /* ============================================================
   * 1. 存储
   *
   * 只落在 GM 存储（Tampermonkey）里，取不到时退回 localStorage。
   * 全程没有任何上传逻辑：这里写什么，浏览器里就只存什么。
   * ============================================================ */
  const store = {
    get(key, def) {
      try {
        if (typeof GM_getValue === 'function') {
          const v = GM_getValue(key, undefined);
          if (v !== undefined && v !== null) return v;
        }
      } catch (e) {}
      try {
        const raw = localStorage.getItem(`${NS}:${key}`);
        return raw ? JSON.parse(raw) : def;
      } catch (e) {
        return def;
      }
    },
    set(key, val) {
      try {
        if (typeof GM_setValue === 'function') {
          GM_setValue(key, val);
          return;
        }
      } catch (e) {}
      try {
        localStorage.setItem(`${NS}:${key}`, JSON.stringify(val));
      } catch (e) {}
    },
  };

  /* ============================================================
   * 2. 通用工具
   * ============================================================ */
  const HEX = /^#[0-9a-f]{6}$/i;
  const PALETTE = ['#7c5cff', '#ff6b9d', '#f59e0b', '#10b981', '#3b82f6', '#ef4444', '#14b8a6', '#a855f7'];

  const isBili = () => /(^|\.)bilibili\.com$/.test(location.hostname);

  function fmtFans(n) {
    const v = Number(n) || 0;
    if (v >= 100000000) return (v / 100000000).toFixed(1).replace(/\.0$/, '') + '亿';
    if (v >= 10000) return (v / 10000).toFixed(1).replace(/\.0$/, '') + '万';
    return String(v);
  }

  /** 头像统一走 B 站图床的裁切参数，和原插件保持一致 */
  function avatarUrl(face, size = 96) {
    if (!face) return '';
    const base = String(face).split('@')[0];
    const abs = base.startsWith('//') ? 'https:' + base : base;
    return `${abs}@${size}w_${size}h_1c.webp`;
  }

  /** 没有头像时的占位：一个淡色圆 */
  function placeholderAvatar(color) {
    const c = HEX.test(color || '') ? color : PALETTE[0];
    return (
      'data:image/svg+xml;utf8,' +
      encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48"><rect width="48" height="48" rx="24" fill="${c}" opacity=".18"/></svg>`)
    );
  }

  /** 从各种粘进来的东西里抠 UID：纯数字、主页链接、整段分享文案 */
  function parseUid(input) {
    const s = String(input == null ? '' : input).trim();
    if (!s) return null;
    let m = s.match(/space\.bilibili\.com\/(\d{1,20})/i);
    if (m) return m[1];
    if (/^\d{1,20}$/.test(s)) return s;
    m = s.match(/(?:^|\D)(\d{4,20})(?:\D|$)/);
    return m ? m[1] : null;
  }

  /** 搜索结果里 uname 带 <em class="keyword"> 高亮标签 */
  const stripTags = (s) => String(s == null ? '' : s).replace(/<[^>]*>/g, '').trim();

  function el(tag, cls, text) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

  function debounce(fn, ms) {
    let t = 0;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...args), ms);
    };
  }

  /** 等待条件成立：MutationObserver + rAF 节流，超时即放弃（不留常驻监听） */
  function waitFor(fn, timeout = 15000) {
    const first = fn();
    if (first) return Promise.resolve(first);
    return new Promise((resolve) => {
      let done = false;
      let raf = 0;
      let timer = 0;
      const finish = (v) => {
        if (done) return;
        done = true;
        mo.disconnect();
        if (raf) cancelAnimationFrame(raf);
        clearTimeout(timer);
        resolve(v);
      };
      const mo = new MutationObserver(() => {
        if (raf || done) return;
        raf = requestAnimationFrame(() => {
          raf = 0;
          const v = fn();
          if (v) finish(v);
        });
      });
      mo.observe(document.documentElement, { childList: true, subtree: true });
      timer = setTimeout(() => finish(null), timeout);
    });
  }

  /** 监听 B 站单页路由变化 */
  function onUrlChange(cb) {
    let last = location.href;
    const check = () => {
      if (location.href === last) return;
      last = location.href;
      cb();
    };
    for (const m of ['pushState', 'replaceState']) {
      const orig = history[m];
      if (typeof orig !== 'function') continue;
      history[m] = function (...args) {
        const r = orig.apply(this, args);
        setTimeout(check, 0);
        return r;
      };
    }
    window.addEventListener('popstate', check);
  }

  /* ============================================================
   * 3. 数据层
   *
   * 分组：{ id, name, badge, text, color, on }
   *   name  分组名（管理用）
   *   badge 标记（emoji 或短文字）
   *   text  铭牌文字，留空则回退到 name
   *   color 浮标底色
   *   on    该组是否在页面上显示
   *
   * 成员：{ [uid]: { gid, n, f, c, t } }
   *   gid 所属分组 / n 昵称 / f 头像 / c 粉丝数 / t 入库时间
   * ============================================================ */
  const DEFAULT_SCOPE = {
    space: true, // space.bilibili.com 个人主页
    dynamic: true, // t.bilibili.com 动态
    opus: true, // www.bilibili.com/opus 动态详情
    search: true, // search.bilibili.com 搜索结果
    video: true, // www.bilibili.com/video 视频页
    read: true, // www.bilibili.com/read 专栏
    live: true, // live.bilibili.com 直播间
    other: true, // 其余页面（首页、排行、番剧等）
  };

  function loadSettings() {
    const raw = store.get('settings', {}) || {};
    const scope = {};
    for (const k of Object.keys(DEFAULT_SCOPE)) scope[k] = raw.scope ? raw.scope[k] !== false : true;
    return {
      v: 1,
      enabled: raw.enabled !== false,
      mode: raw.mode === 'always' ? 'always' : 'hover',
      multi: raw.multi === 'first' ? 'first' : 'all', // 一个人属于多个组时，显示全部铭牌还是只显示第一个
      scope,
      sort: Object.assign({}, raw.sort || {}),
    };
  }

  function loadGroups() {
    const raw = store.get('groups', null);
    if (!Array.isArray(raw)) return [];
    return raw
      .filter((g) => g && (g.id || g.name))
      .map((g, i) => ({
        id: String(g.id || `g${i}`),
        name: String(g.name || '未命名分组').slice(0, 40),
        badge: String(g.badge == null ? '' : g.badge).slice(0, 12),
        text: String(g.text == null ? '' : g.text).slice(0, 40),
        color: HEX.test(g.color) ? g.color : PALETTE[i % PALETTE.length],
        on: g.on !== false,
      }));
  }

  function loadMembers() {
    const raw = store.get('members', null);
    const out = {};
    if (!raw || typeof raw !== 'object') return out;
    let migrated = false;
    for (const [uid, m] of Object.entries(raw)) {
      if (!/^\d{1,20}$/.test(uid) || !m) continue;
      // v1 一个人只能在一个组（m.gid），v2 改成 m.gids 数组，这里顺手迁移
      let gids = Array.isArray(m.gids) ? m.gids.filter((x) => typeof x === 'string') : null;
      if (!gids) {
        gids = m.gid ? [String(m.gid)] : [];
        migrated = true;
      }
      gids = [...new Set(gids)];
      if (!gids.length) continue;
      out[uid] = {
        gids,
        n: String(m.n || ''),
        f: String(m.f || ''),
        c: Number(m.c) || 0,
        t: Number(m.t) || 0,
      };
    }
    if (migrated) {
      try {
        store.set('members', out);
      } catch (e) {}
    }
    return out;
  }

  let settings = loadSettings();
  let groups = loadGroups();
  let members = loadMembers();

  const saveSettings = () => store.set('settings', settings);
  const saveGroups = () => store.set('groups', groups);
  const saveMembers = () => store.set('members', members);

  const groupById = (id) => groups.find((g) => g.id === id) || null;
  const groupByName = (name) => {
    const k = String(name || '').trim().toLowerCase();
    return groups.find((g) => g.name.trim().toLowerCase() === k) || null;
  };
  const groupIndex = (id) => groups.findIndex((g) => g.id === id);
  const membersOf = (gid) => Object.entries(members).filter(([, m]) => m.gids.indexOf(gid) >= 0);

  /** 该成员所属的全部分组，按面板里的分组顺序返回 */
  function groupsOfMember(uid) {
    const m = members[uid];
    if (!m) return [];
    return m.gids
      .map((gid) => groupById(gid))
      .filter(Boolean)
      .sort((a, b) => groupIndex(a.id) - groupIndex(b.id));
  }

  /** 页面上要显示的分组：先按组顺序，再按「只显示第一个 / 显示全部」截断 */
  function shownGroupsOf(uid) {
    const list = groupsOfMember(uid).filter((g) => g.on);
    return settings.multi === 'first' ? list.slice(0, 1) : list;
  }

  /** 铭牌最终呈现：标记 + 文字 */
  function badgeOf(g) {
    if (!g) return { color: PALETTE[0], mark: '', text: '' };
    const text = (g.text || '').trim() || g.name || '';
    return { color: HEX.test(g.color) ? g.color : PALETTE[0], mark: (g.badge || '').trim(), text };
  }

  let nameIndex = new Map(); // 昵称 -> uid；同名多人置 null（宁可不标，也不张冠李戴）
  function rebuildNameIndex() {
    nameIndex = new Map();
    for (const [uid, m] of Object.entries(members)) {
      const n = (m.n || '').trim();
      if (!n) continue;
      nameIndex.set(n, nameIndex.has(n) ? null : uid);
    }
  }

  let dataSeq = 0; // 任何数据变动都 +1，用于让面板/引擎知道要刷新
  const bump = () => {
    dataSeq++;
    rebuildNameIndex();
    if (typeof onDataChanged === 'function') onDataChanged();
  };

  function createGroup(name, opts = {}) {
    const g = {
      id: `g${Date.now().toString(36)}${Math.random().toString(36).slice(2, 5)}`,
      name: String(name || '新分组').slice(0, 40),
      badge: opts.badge != null ? String(opts.badge).slice(0, 12) : '🏷️',
      text: opts.text ? String(opts.text).slice(0, 40) : '',
      color: HEX.test(opts.color) ? opts.color : PALETTE[groups.length % PALETTE.length],
      on: opts.on !== false,
    };
    groups.push(g);
    saveGroups();
    bump();
    return g;
  }

  function updateGroup(id, patch) {
    const g = groupById(id);
    if (!g) return null;
    if (patch.name != null) g.name = String(patch.name).slice(0, 40) || g.name;
    if (patch.badge != null) g.badge = String(patch.badge).slice(0, 12);
    if (patch.text != null) g.text = String(patch.text).slice(0, 40);
    if (patch.color != null && HEX.test(patch.color)) g.color = patch.color;
    if (patch.on != null) g.on = !!patch.on;
    saveGroups();
    bump();
    return g;
  }

  /** 删组：把该组从成员的 gids 里摘掉，摘完没组了才真正从名单里删除 */
  function deleteGroup(id) {
    const at = groups.findIndex((g) => g.id === id);
    if (at < 0) return false;
    for (const [uid, m] of Object.entries(members)) {
      if (m.gids.indexOf(id) < 0) continue;
      m.gids = m.gids.filter((x) => x !== id);
      if (!m.gids.length) delete members[uid];
    }
    groups.splice(at, 1);
    saveGroups();
    saveMembers();
    bump();
    return true;
  }

  /** 把一个人放进某个组；已经在里面就只更新资料，不动别的组 */
  function addMember(uid, gid, info = {}) {
    const id = parseUid(uid);
    if (!id || !groupById(gid)) return false;
    const prev = members[id];
    const gids = prev ? prev.gids.slice() : [];
    if (gids.indexOf(gid) < 0) gids.push(gid);
    members[id] = {
      gids,
      n: info.name || (prev && prev.n) || '',
      f: info.face || (prev && prev.f) || '',
      c: Number(info.fans != null ? info.fans : prev ? prev.c : 0) || 0,
      t: (prev && prev.t) || Date.now(),
    };
    saveMembers();
    bump();
    return true;
  }

  function removeMember(uid) {
    const id = parseUid(uid);
    if (!id || !members[id]) return false;
    delete members[id];
    saveMembers();
    bump();
    return true;
  }

  /** 只从某一个组移除；如果他还属于别的组，人留在名单里 */
  function removeFromGroup(uid, gid) {
    const id = parseUid(uid);
    const m = id && members[id];
    if (!m || m.gids.indexOf(gid) < 0) return false;
    m.gids = m.gids.filter((x) => x !== gid);
    if (!m.gids.length) delete members[id];
    saveMembers();
    bump();
    return true;
  }

  /** 直接设定这个人属于哪些组（导入覆盖、批量整理时用） */
  function setMemberGroups(uid, gids) {
    const id = parseUid(uid);
    if (!id || !members[id]) return false;
    const next = [...new Set((gids || []).filter((g) => groupById(g)))];
    if (!next.length) {
      delete members[id];
    } else {
      members[id].gids = next;
    }
    saveMembers();
    bump();
    return true;
  }

  /** 兼容旧调用：把人整体挪到某个组（替换原有分组） */
  function moveMember(uid, gid) {
    const id = parseUid(uid);
    if (!id || !members[id] || !groupById(gid)) return false;
    members[id].gids = [gid];
    saveMembers();
    bump();
    return true;
  }

  /** 拖动排序：把 dragId 插到 targetId 的前面或后面 */
  function reorderGroup(dragId, targetId, after) {
    if (dragId === targetId) return false;
    const from = groups.findIndex((g) => g.id === dragId);
    if (from < 0) return false;
    const [g] = groups.splice(from, 1);
    let to = groups.findIndex((x) => x.id === targetId);
    if (to < 0) {
      groups.splice(from, 0, g);
      return false;
    }
    if (after) to++;
    groups.splice(to, 0, g);
    saveGroups();
    bump();
    return true;
  }

  /**
   * 合并多个分组：成员取并集，分组顺序 / 标记 / 颜色沿用列表里最靠前的那个，
   * 其余分组删除；成员在别的分组里的关系不受影响。
   */
  function mergeGroups(ids, name) {
    const want = new Set((ids || []).filter((id) => groupById(id)));
    if (want.size < 2) return { ok: false, reason: '至少要选两个分组' };

    const ordered = groups.filter((g) => want.has(g.id));
    const keep = ordered[0];
    const drop = new Set(ordered.slice(1).map((g) => g.id));
    let moved = 0;

    for (const m of Object.values(members)) {
      if (!m.gids.some((g) => drop.has(g))) continue;
      const next = m.gids.filter((g) => !drop.has(g));
      if (next.indexOf(keep.id) < 0) next.push(keep.id);
      m.gids = next;
      moved++;
    }

    groups = groups.filter((g) => !drop.has(g.id));
    for (const id of drop) delete settings.sort[id];
    if (name && String(name).trim()) keep.name = String(name).trim().slice(0, 40);

    saveGroups();
    saveSettings();
    saveMembers();
    bump();
    return { ok: true, groups: ordered.length, moved, keep };
  }

  /** 用户主动「导入测试分组」：只补不删，同名分组合并，已存在的人跳过 */

  function restoreDefaults() {
    const roster = DEFAULT_ROSTER;
    if (!roster || !Array.isArray(roster.groups)) return { created: 0, added: 0 };
    let created = 0;
    let added = 0;
    const base = Date.now();
    let n = 0;
    for (const g of roster.groups) {
      if (!g || !g.name) continue;
      let grp = groupByName(g.name);
      if (!grp) {
        grp = {
          id: `g${Date.now().toString(36)}${Math.random().toString(36).slice(2, 5)}`,
          name: String(g.name).slice(0, 40),
          badge: String(g.badge || '').slice(0, 12),
          text: String(g.text || '').slice(0, 40),
          color: HEX.test(g.color || '') ? g.color : PALETTE[groups.length % PALETTE.length],
          on: g.on !== false, // 示例名单里可以标 on:false，导入后先在面板里关着
        };
        groups.push(grp);
        created++;
      }
      for (const m of g.members || []) {
        const uid = parseUid(m.uid);
        if (!uid) continue;
        if (members[uid]) {
          if (members[uid].gids.indexOf(grp.id) < 0) {
            members[uid].gids.push(grp.id);
            added++;
          }
          continue;
        }
        members[uid] = { gids: [grp.id], n: String(m.name || ''), f: String(m.face || ''), c: Number(m.fans) || 0, t: base - n++ };
        added++;
      }
    }
    saveGroups();
    saveMembers();
    bump();
    return { created, added };
  }

  /* ============================================================
   * 4. 网络层：B 站公开接口
   *
   * 只用两类公开数据：
   *   nav          取 WBI 密钥（未登录也会返回）
   *   search/type  按昵称搜用户
   *   card         按 UID 取昵称 / 头像 / 粉丝数
   * 不请求任何与「归属」相关的接口，也不上报任何东西。
   * ============================================================ */

  /** 本脚本只在内联签名里用到 MD5，标准实现，UTF-8 安全 */
  function md5(str) {
    const bytes = [];
    for (const ch of str) {
      const c = ch.codePointAt(0);
      if (c < 0x80) bytes.push(c);
      else if (c < 0x800) bytes.push(0xc0 | (c >> 6), 0x80 | (c & 63));
      else if (c < 0x10000) bytes.push(0xe0 | (c >> 12), 0x80 | ((c >> 6) & 63), 0x80 | (c & 63));
      else
        bytes.push(
          0xf0 | (c >> 18),
          0x80 | ((c >> 12) & 63),
          0x80 | ((c >> 6) & 63),
          0x80 | (c & 63)
        );
    }
    const bitLen = bytes.length * 8;
    bytes.push(0x80);
    while (bytes.length % 64 !== 56) bytes.push(0);
    bytes.push(bitLen & 255, (bitLen >>> 8) & 255, (bitLen >>> 16) & 255, (bitLen >>> 24) & 255, 0, 0, 0, 0);

    let a0 = 0x67452301;
    let b0 = 0xefcdab89;
    let c0 = 0x98badcfe;
    let d0 = 0x10325476;
    const S = [7, 12, 17, 22, 5, 9, 14, 20, 4, 11, 16, 23, 6, 10, 15, 21];
    const K = [];
    for (let i = 0; i < 64; i++) K[i] = Math.floor(Math.abs(Math.sin(i + 1)) * 4294967296) | 0;
    const M = new Int32Array(16);

    for (let off = 0; off < bytes.length; off += 64) {
      for (let i = 0; i < 16; i++) {
        M[i] = bytes[off + i * 4] | (bytes[off + i * 4 + 1] << 8) | (bytes[off + i * 4 + 2] << 16) | (bytes[off + i * 4 + 3] << 24);
      }
      let A = a0;
      let B = b0;
      let C = c0;
      let D = d0;
      for (let i = 0; i < 64; i++) {
        let F;
        let g;
        if (i < 16) {
          F = (B & C) | (~B & D);
          g = i;
        } else if (i < 32) {
          F = (D & B) | (~D & C);
          g = (5 * i + 1) % 16;
        } else if (i < 48) {
          F = B ^ C ^ D;
          g = (3 * i + 5) % 16;
        } else {
          F = C ^ (B | ~D);
          g = (7 * i) % 16;
        }
        F = (F + A + K[i] + M[g]) | 0;
        A = D;
        D = C;
        C = B;
        const s = S[(i >> 4) * 4 + (i % 4)];
        B = (B + ((F << s) | (F >>> (32 - s)))) | 0;
      }
      a0 = (a0 + A) | 0;
      b0 = (b0 + B) | 0;
      c0 = (c0 + C) | 0;
      d0 = (d0 + D) | 0;
    }
    const hex = (n) => {
      let s = '';
      for (let i = 0; i < 4; i++) s += ((n >>> (i * 8)) & 255).toString(16).padStart(2, '0');
      return s;
    };
    return hex(a0) + hex(b0) + hex(c0) + hex(d0);
  }

  /** bilibili-API-collect 里那张 64 位洗牌表 */
  const MIXIN_TAB = [
    46, 47, 18, 2, 53, 8, 23, 32, 15, 50, 10, 31, 58, 3, 45, 35, 27, 43, 5, 49, 33, 9, 42, 19, 29, 28, 14, 39, 12, 38, 41, 13,
    37, 48, 7, 16, 24, 55, 40, 61, 26, 17, 0, 1, 60, 51, 30, 4, 22, 25, 54, 21, 56, 59, 6, 63, 57, 62, 11, 36, 20, 34, 44, 52,
  ];

  class BiliError extends Error {
    constructor(code, msg) {
      super(msg || `接口返回 ${code}`);
      this.code = code;
    }
  }

  const ERR_HINT = {
    '-101': '需要登录 B 站后再试',
    '-352': '被 B 站风控拦截，请隔几分钟再试，或直接用 UID 添加',
    '-412': '请求被 B 站风控拦截，请隔几分钟再试，或直接用 UID 添加',
    '-400': '请求参数有误',
    '-404': '没有找到对应内容',
  };

  function biliGet(url) {
    return new Promise((resolve, reject) => {
      const headers = { Accept: 'application/json, text/plain, */*' };
      if (typeof GM_xmlhttpRequest === 'function') {
        GM_xmlhttpRequest({
          method: 'GET',
          url,
          headers,
          timeout: 12000,
          onload(res) {
            try {
              resolve(JSON.parse(res.responseText));
            } catch (e) {
              reject(new Error('响应不是合法 JSON'));
            }
          },
          onerror() {
            reject(new Error('网络请求失败'));
          },
          ontimeout() {
            reject(new Error('请求超时'));
          },
        });
        return;
      }
      fetch(url, { credentials: 'include', headers })
        .then((r) => r.json())
        .then(resolve, reject);
    });
  }

  async function biliApi(url) {
    const j = await biliGet(url);
    if (!j || j.code !== 0) {
      const code = String((j && j.code) || 'unknown');
      throw new BiliError(code, ERR_HINT[code] || (j && j.message) || '接口调用失败');
    }
    return j.data;
  }

  const wbi = { key: '', at: 0 };
  async function wbiMixinKey() {
    if (wbi.key && Date.now() - wbi.at < 6 * 3600 * 1000) return wbi.key;
    let data = null;
    try {
      data = await biliApi('https://api.bilibili.com/x/web-interface/nav');
    } catch (e) {
      // 未登录时 code=-101，但 wbi_img 仍然会给
      const j = await biliGet('https://api.bilibili.com/x/web-interface/nav');
      data = j && j.data;
    }
    const img = (data && data.wbi_img && data.wbi_img.img_url) || '';
    const sub = (data && data.wbi_img && data.wbi_img.sub_url) || '';
    const raw =
      img.split('/').pop().split('.')[0] + sub.split('/').pop().split('.')[0];
    if (raw.length < 64) throw new Error('拿不到 WBI 密钥，请确认能正常访问 B 站');
    wbi.key = MIXIN_TAB.map((i) => raw[i]).join('').slice(0, 32);
    wbi.at = Date.now();
    return wbi.key;
  }

  async function wbiQuery(params) {
    const key = await wbiMixinKey();
    const q = Object.keys(params)
      .sort()
      .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(String(params[k]).replace(/[!'()*]/g, '')))
      .join('&');
    const wts = Math.floor(Date.now() / 1000);
    return q + '&wts=' + wts + '&w_rid=' + md5(q + wts + key);
  }

  /** 昵称搜索：这是本插件唯一会主动请求的「搜索」行为，只在用户点搜索时发生 */
  async function searchUsers(keyword, page = 1) {
    const q = await wbiQuery({ search_type: 'bili_user', keyword, page, page_size: 20 });
    const data = await biliApi('https://api.bilibili.com/x/web-interface/wbi/search/type?' + q);
    const list = (data && data.result) || [];
    return {
      total: Number(data && data.numResults) || list.length,
      list: list.map((x) => ({
        uid: String(x.mid),
        name: stripTags(x.uname),
        face: x.upic || '',
        fans: Number(x.fans) || 0,
        sign: stripTags(x.usign || '').slice(0, 40),
      })),
    };
  }

  /** 按 UID 取昵称 / 头像 / 粉丝数 */
  async function fetchCard(uid) {
    const data = await biliApi('https://api.bilibili.com/x/web-interface/card?mid=' + encodeURIComponent(uid));
    const c = data && data.card;
    if (!c) throw new Error('该 UID 没有返回资料');
    return {
      uid: String(c.mid),
      name: c.name || '',
      face: c.face || '',
      fans: Number(c.fans != null ? c.fans : data.follower) || 0,
    };
  }

  /** 简单的并发闸门：最多 3 个在飞，起步间隔 110ms，避免触发风控 */
  const netq = { n: 0, max: 3, gap: 110, last: 0, q: [] };
  function pumpNet() {
    if (netq.n >= netq.max || !netq.q.length) return;
    const delay = Math.max(0, netq.last + netq.gap - Date.now());
    netq.n++;
    netq.last = Date.now() + delay;
    const job = netq.q.shift();
    setTimeout(() => {
      job
        .fn()
        .then(job.res, job.rej)
        .finally(() => {
          netq.n--;
          pumpNet();
        });
    }, delay);
  }
  function scheduleNet(fn) {
    return new Promise((res, rej) => {
      netq.q.push({ fn, res, rej });
      pumpNet();
    });
  }
  const fetchCardQueued = (uid) => scheduleNet(() => fetchCard(uid));

  /* ============================================================
   * 5. 锚点引擎
   *
   * 沿用原插件的思路：先在页面里找「看起来是用户显示名」的元素，再决定挂不挂。
   * 两条入口：
   *   UID 路径  昵称外面套着 space.bilibili.com/UID 的链接 —— 身份是确定的
   *   昵称路径  文本节点整段等于名册里的昵称 —— 用来兜住主页标题这类纯文本
   * 两条都要过打分器，分数不够就当普通正文放过。
   * ============================================================ */
  const GAP = 6;
  const CARD_GAP = 4; // 同一人多枚铭牌之间的间距
  const MAX_TEXT = 64; // 昵称长度上限，超长文本节点直接跳过
  const SCORE_MIN = 30; // 锚点打分门槛，低于此值只当正文处理
  const SCAN_WINDOW = (() => {
    const v = Number(window.__BNP_SCAN_WINDOW__);
    return v > 0 ? v : 15000;
  })();

  const SKIP_TAGS = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEXTAREA', 'TITLE', 'CODE', 'PRE']);

  let targets = new Map(); // nameEl -> target
  let zones = new WeakMap(); // 可悬停元素 -> target
  let host = null;
  let shadow = null;
  let placePending = false;
  let scannedCount = 0;

  function ensureHost() {
    if (host) return;
    host = document.createElement('div');
    host.id = 'bnp-badge-host';
    host.style.cssText = 'all:initial;position:fixed;left:0;top:0;width:0;height:0;z-index:2147483000;';
    shadow = host.attachShadow({ mode: 'open' });
    shadow.innerHTML = `
      <style>
        .card{
          position:fixed;left:0;top:0;display:none;align-items:center;gap:4px;
          padding:1px 8px;border-radius:999px;
          font:500 12px/18px -apple-system,BlinkMacSystemFont,"PingFang SC","Microsoft YaHei",sans-serif;
          color:#fff;background:var(--c,#4f8ef7);
          box-shadow:0 2px 10px rgba(0,0,0,.16);
          white-space:nowrap;pointer-events:none;
          will-change:transform;transform:translate(-9999px,-9999px);
          opacity:0;transition:opacity .12s ease;
        }
        .card.on{opacity:1}
        .card .b{font-size:13px;line-height:18px}
        .card .b:empty{display:none}
        .card .t{max-width:180px;overflow:hidden;text-overflow:ellipsis;opacity:.95}
        .card .t:empty{display:none}
      </style>`;
    document.documentElement.appendChild(host);
  }

  /* -------------------- 判定：打分 -------------------- */

  /** 是否处于悬浮容器（B 站自带的悬停名片等）。这类元素随悬停出现，两种显示模式下都直接显示 */
  function isFloating(e) {
    let n = e;
    let i = 0;
    while (n && n !== document.body && i++ < 10) {
      const cs = getComputedStyle(n);
      if (cs.position === 'fixed') return true;
      // B 站的悬停名片（.v-popover）实测是 absolute + z-index:1，门槛不能定太高
      if (cs.position === 'absolute' && (parseInt(cs.zIndex, 10) || 0) >= 1) return true;
      n = n.parentElement;
    }
    return false;
  }

  /**
   * 元素此刻是否真的可见。悬停名片收起时常常只是 visibility:hidden 或 opacity:0，
   * 布局矩形照样有值——只量矩形判断不出来，标记就会留在原地。
   */
  function isShown(e) {
    if (typeof e.checkVisibility === 'function') {
      try {
        return e.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true });
      } catch (err) {}
    }
    let n = e;
    let i = 0;
    while (n && n !== document.documentElement && i++ < 10) {
      const cs = getComputedStyle(n);
      if (cs.display === 'none' || cs.visibility === 'hidden' || cs.opacity === '0') return false;
      n = n.parentElement;
    }
    return true;
  }

  /** 同行判定：与昵称垂直中心对齐 */
  const sameLineAs = (nr) => (r) =>
    r.width > 0 && Math.abs(r.top + r.height / 2 - (nr.top + nr.height / 2)) <= Math.max(nr.height, r.height) * 0.6;

  /** 同行是否紧跟身份小组件（等级牌、粉丝牌、大会员标） */
  function hasBadgeNear(pe, nr, sameLine) {
    const cands = [];
    const box = pe.parentElement;
    if (box) for (const c of box.children) cands.push(c);
    for (const c of pe.children) cands.push(c);
    for (const c of cands) {
      if (c === pe || c.contains(pe)) continue;
      const txt = (c.textContent || '').trim();
      if (!txt || txt.length > 12) continue; // 等级/粉丝牌都是短文本
      const r = c.getBoundingClientRect();
      if (!r.width || !r.height || r.height > 28 || r.width > 140) continue;
      if (!sameLine(r)) continue;
      const gap = Math.min(Math.abs(r.left - nr.right), Math.abs(nr.left - r.right));
      if (gap > 14) continue;
      return true;
    }
    return false;
  }

  /** 昵称同一行左侧较短距离内是否有头像 */
  function hasAvatarNear(pe, nr) {
    let box = pe;
    for (let i = 0; i < 4 && box; i++) {
      box = box.parentElement;
      if (!box) return false;
      for (const img of box.querySelectorAll('img')) {
        const r = img.getBoundingClientRect();
        if (!r.width || !r.height) continue;
        if (Math.abs(r.top + r.height / 2 - (nr.top + nr.height / 2)) > Math.max(r.height, nr.height) * 0.9) continue;
        if (r.left >= nr.left) continue;
        if (nr.left - r.right > 460) continue;
        return true;
      }
    }
    return false;
  }

  /**
   * 「头像在上、名字在下」的竖排胶囊（动态页顶部那排关注人、粉丝列表网格…）。
   * 这种格子宽度只有名字那么宽，右边紧挨着下一列，塞一个铭牌必然压住邻居的文字，
   * 所以这里一律不挂。
   */
  function hasAvatarAbove(pe, nr) {
    let box = pe.parentElement;
    for (let i = 0; i < 3 && box; i++, box = box.parentElement) {
      for (const img of box.querySelectorAll('img')) {
        const r = img.getBoundingClientRect();
        if (!r.width || !r.height) continue;
        if (r.width > nr.width + 48) continue; // 大图不是头像
        if (r.bottom > nr.top + 2) continue; // 必须整体在名字上方
        if (nr.top - r.bottom > 14) continue; // 且紧贴着
        const cx = r.left + r.width / 2;
        if (cx < nr.left - 10 || cx > nr.right + 10) continue; // 水平方向对准名字
        return true;
      }
    }
    return false;
  }

  /**
   * 锚点打分。判断的是「这串文本看起来是不是一个用户显示名」，
   * 而不是「它是不是这个名字」——是不是名册里的人，粗筛阶段已经查过了。
   *
   * viaUid：昵称外面套着自己的主页链接，身份已经确定，直接给一条强信号。
   */
  function scoreAnchor(pe, nr, er, viaUid) {
    const cs = getComputedStyle(pe);
    if (cs.display === 'none' || cs.visibility === 'hidden') return { score: -Infinity, signals: 0, fs: 12 };
    const fs = parseFloat(cs.fontSize) || 12;
    const sameLine = sameLineAs(nr);
    let signals = 0;

    // 字号越大越像显示名，越靠上越优先
    let s = (fs - 12) * 2 - Math.min(Math.max(nr.top, 0) / 100, 30);

    // 「元素本身就是一个昵称」——元素宽度与文本宽度相当；落在宽容器里（正文段落）则是反证
    if (er.width <= nr.width + 12) s += 35;
    else s -= 20;

    if (viaUid) {
      s += 45;
      signals++;
    }

    if (hasBadgeNear(pe, nr, sameLine)) {
      s += 40;
      signals++;
    }

    const a = pe.closest('a[href*="space.bilibili.com/"]');
    if (a) {
      // 「@某人」是提及，不是作者名，一票否决
      if ((a.textContent || '').trim().startsWith('@')) return { score: -Infinity, signals: 0, fs };
      s += 45;
      signals++;
    }

    if (hasAvatarNear(pe, nr)) {
      s += 20;
      signals++;
    }

    // 标题里出现同名片段是常态（视频标题、合集名），没有链接/等级牌/头像做佐证时一律不挂
    if (!signals && pe.closest('h1,h2,h3,[class*="title"],[class*="Title"]')) {
      return { score: -Infinity, signals: 0, fs };
    }

    return { score: s, signals, fs };
  }

  /**
   * 这一行里，昵称后面还跟着哪些「身份小组件」？等级牌、粉丝牌、大会员标之类。
   * B 站有的页面把等级牌塞在昵称容器里，有的放在隔壁当兄弟节点，两种都要认。
   * 时间戳、操作菜单这类东西要排除，否则铭牌会被推到时间后面去。
   */
  function looksLikeIdentityWidget(e, rightEdge, sameLine) {
    const r = e.getBoundingClientRect();
    if (!r.width || !r.height || r.height > 30) return false;
    if (!sameLine(r)) return false;
    if (r.left < rightEdge - 2) return false;
    if (r.left - rightEdge > 26) return false;
    const txt = (e.textContent || '').trim();
    const cls = String(e.className || '') + ' ' + String((e.getAttribute && e.getAttribute('class')) || '');
    if (/lv|level|badge|medal|verify|vip|annual|fans|guard|nobel|nameplate|icon/i.test(cls)) return true;
    if (/^LV\s*\.?\s*\d+$/i.test(txt)) return true;
    if (/大会员|年费|舰长|提督|总督|粉丝牌/.test(txt)) return true;
    if (!txt) return true; // 纯图标（大会员、认证徽标）
    if (/前|分钟|小时|天|昨天|刚刚|置顶|精选|广告/.test(txt)) return false;
    return false;
  }

  /**
   * 锚点右边界 = 昵称文本 + 同一行的等级/粉丝牌 + 同一行的关注/发消息按钮。
   * 用「与昵称垂直中心对齐」判定同一行，避免把下一行的时间戳、远处的菜单按钮算进来。
   */
  function identityExtraRight(t) {
    const nr = t.range.getBoundingClientRect();
    if (!nr.width) return 0;
    const base = nr.right;
    const sameLine = sameLineAs(nr);
    let right = base;

    const pools = [];
    if (t.nameEl.children.length) pools.push([...t.nameEl.children]);
    if (t.nameEl.parentElement) pools.push([...t.nameEl.parentElement.children]);
    for (const pool of pools) {
      for (const c of pool) {
        if (c === t.nameEl || c.contains(t.nameEl) || t.nameEl.contains(c)) continue;
        if (!looksLikeIdentityWidget(c, right, sameLine)) continue;
        right = Math.max(right, c.getBoundingClientRect().right);
      }
    }

    let box = t.nameEl.parentElement;
    for (let i = 0; i < 2 && box; i++, box = box.parentElement) {
      for (const b of box.querySelectorAll('button, [class*="btn"], [class*="follow"]')) {
        if (t.nameEl.contains(b) || b.contains(t.nameEl)) continue;
        const r = b.getBoundingClientRect();
        if (!r.width || r.height > 44) continue;
        if (!sameLine(r)) continue;
        if (r.left < nr.right - 4) continue;
        if (r.left - nr.right > 320) continue;
        right = Math.max(right, r.right);
      }
    }
    return right - base;
  }

  /* -------------------- 挂载：登记与命中 -------------------- */

  function mountAnchor(node, pe, uid, force, viaUid) {
    if (!node || !pe) return false;
    if (targets.has(pe)) return false;
    if ((host && host.contains(pe)) || (panelHost && panelHost.contains(pe))) return false;

    const m = members[uid];
    if (!m) return false;
    if (!shownGroupsOf(uid).length) return false; // 组全关了：不登记，重开时重扫即可

    const range = document.createRange();
    range.selectNode(node);
    const nr = range.getBoundingClientRect();
    if (!nr.width || !nr.height) return false; // 锚点必须能被视觉确认
    const er = pe.getBoundingClientRect();
    if (!er.width || !er.height) return false;

    // 悬浮层（下拉菜单、搜索历史、气泡）里的元素在两种显示模式下都会直接出标记，所以判定必须更严
    const float = isFloating(pe);

    if (!force) {
      if (hasAvatarAbove(pe, nr)) return false; // 竖排胶囊：横向没地方放铭牌
      const { score, signals, fs } = scoreAnchor(pe, nr, er, viaUid);
      if (score < SCORE_MIN) return false;
      // 没有任何身份信号、字号又不大的纯文本，多半是菜单项、搜索历史、气泡提示
      if (!signals && fs < 18) return false;
    }

    const t = {
      uid,
      node,
      nameEl: pe,
      range,
      extraRight: 0,
      card: null,
      hover: false,
      float,
      viaUid: !!viaUid,
      name: (node.nodeValue || '').trim(),
      link: viaUid ? pe.closest('a[href*="space.bilibili.com/"]') : null,
    };
    t.extraRight = identityExtraRight(t);
    targets.set(pe, t);
    registerZones(t);
    scannedCount++;
    return true;
  }

  /**
   * 挂上去之后，DOM 还得继续支持这个判断：链接仍指向同一个人、文字没被换成别的内容。
   * B 站不少列表会复用节点（换一换、虚拟滚动），不做这层校验，铭牌就会跟着串到别人的行上。
   */
  function targetStillValid(t) {
    if (!t.nameEl.isConnected || !t.node.isConnected) return false;
    if (!t.nameEl.contains(t.node)) return false;
    if (t.viaUid) {
      if (!t.link || !t.link.isConnected) return false;
      const href = t.link.getAttribute('href') || '';
      if (!href.match(new RegExp(`space\\.bilibili\\.com/${t.uid}/?(?:[?#]|$)`))) return false;
    } else if (t.name && (t.node.nodeValue || '').trim() !== t.name) {
      return false;
    }
    return true;
  }

  /**
   * 登记悬停区域：昵称本身 + 同行容器（等级牌/粉丝牌所在行）+ 同行左侧的头像。
   */
  function registerZones(t) {
    zones.set(t.nameEl, t);
    if (t.nameEl.parentElement && !t.float) zones.set(t.nameEl.parentElement, t);
    if (t.float) return; // 悬浮层内常显，不必登记
    const nr = t.range.getBoundingClientRect();
    if (!nr.width) return;
    let box = t.nameEl;
    for (let i = 0; i < 4 && box; i++) {
      box = box.parentElement;
      if (!box) break;
      for (const img of box.querySelectorAll('img')) {
        const r = img.getBoundingClientRect();
        if (!r.width || !r.height) continue;
        if (Math.abs(r.top + r.height / 2 - (nr.top + nr.height / 2)) > Math.max(r.height, nr.height) * 0.9) continue;
        if (r.left >= nr.left) continue;
        if (nr.left - r.right > 460) continue;
        zones.set(img, t);
        const a = img.closest('a');
        if (a) zones.set(a, t);
        break;
      }
    }
  }

  /** 取元素里第一个非空文本节点 */
  function firstTextNode(rootEl) {
    const walker = document.createTreeWalker(rootEl, NodeFilter.SHOW_TEXT, null);
    let n;
    while ((n = walker.nextNode())) {
      if ((n.nodeValue || '').trim()) return n;
    }
    return null;
  }

  /** 昵称路径：整段文本等于名册里的昵称 */
  function scanText(root) {
    if (!root || root.nodeType !== 1) return 0;
    if (!document.body || !document.body.contains(root)) return 0;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
    const hits = [];
    let n;
    while ((n = walker.nextNode())) {
      const v = n.nodeValue;
      if (!v || v.length > MAX_TEXT) continue;
      const key = v.trim();
      if (!key) continue;
      const uid = nameIndex.get(key);
      if (!uid) continue; // 不在名册，或同名多人（置 null）
      const pe = n.parentElement;
      if (!pe || SKIP_TAGS.has(pe.tagName)) continue;
      if ((host && host.contains(pe)) || (panelHost && panelHost.contains(pe))) continue;
      if (targets.has(pe)) continue;
      hits.push([n, pe, uid]);
    }
    let added = 0;
    for (const [node, pe, uid] of hits) if (mountAnchor(node, pe, uid, false, false)) added++;
    if (added) schedulePlace();
    return added;
  }

  /** UID 路径：昵称外面套着 space.bilibili.com/UID 的链接，跟随改名也不会失效 */
  function scanLinks(root) {
    if (!root || root.nodeType !== 1) return 0;
    if (!document.body || !document.body.contains(root)) return 0;
    const list = [];
    if (root.matches && root.matches('a[href*="space.bilibili.com/"]')) list.push(root);
    if (root.querySelectorAll) for (const a of root.querySelectorAll('a[href*="space.bilibili.com/"]')) list.push(a);

    let added = 0;
    for (const a of list) {
      if (targets.has(a) || targets.has(a.firstElementChild)) continue;
      const href = a.getAttribute('href') || '';
      // 只认「主页根链接」：space.bilibili.com/123、/123/、/123?spm=…
      // 合集 / 视频列表 / 动态 Tab 等子路径（/123/lists/456）不是昵称链接，排除掉
      const m = href.match(/space\.bilibili\.com\/(\d{1,20})\/?(?:[?#]|$)/i);
      if (!m) continue;
      const uid = m[1];
      if (!members[uid]) continue;
      if (a.childElementCount > 3) continue;
      const anchorText = (a.textContent || '').trim();
      if (!anchorText || anchorText.length > 24) continue;
      const node = firstTextNode(a);
      if (!node) continue;
      const txt = (node.nodeValue || '').trim();
      // 整条链接的文字必须就是这一串。热搜榜那种 <a><span>4</span><span>关键词</span></a>
      // 的整行链接，会把排名数字当作昵称挂上去 —— 只有「链接本身就是昵称」才算数
      if (!txt || txt !== anchorText) continue;
      const pe = node.parentElement;
      if (!pe || SKIP_TAGS.has(pe.tagName)) continue;
      if ((host && host.contains(pe)) || (panelHost && panelHost.contains(pe))) continue;
      if (targets.has(pe)) continue;
      if (mountAnchor(node, pe, uid, false, true)) added++;
    }
    if (added) schedulePlace();
    return added;
  }

  function scanWithin(root) {
    if (!root || root.nodeType !== 1) return 0;
    return scanLinks(root) + scanText(root);
  }

  function scanPage() {
    if (!document.body) return 0;
    if (!settings.enabled) return 0;
    // 当前页面类型不在支持范围（登录 / 支付 / 私信 / 后台等）时，一次都不扫
    if (!scopeOn(activeKind)) return 0;
    return scanWithin(document.body);
  }

  /* -------------------- pull 路径：个人主页头部 -------------------- */

  /**
   * 按昵称文本反查元素。不依赖 B 站 class 名，只要求文本精确匹配，
   * 在候选里取「字号最大、位置最靠上」的那个，通常是昵称标题。
   */
  function findNameEl(name) {
    if (!name || !document.body) return null;
    const all = document.body.getElementsByTagName('*');
    const cands = [];
    for (let i = 0; i < all.length; i++) {
      const e = all[i];
      if (e.childElementCount > 1) continue;
      const t = e.textContent;
      if (!t || t.trim() !== name) continue;
      cands.push(e);
    }
    let best = null;
    let bestScore = -Infinity;
    for (const e of cands) {
      const cs = getComputedStyle(e);
      if (cs.display === 'none' || cs.visibility === 'hidden') continue;
      const r = e.getBoundingClientRect();
      if (r.width < 8 || r.height < 8) continue;
      const fs = parseFloat(cs.fontSize) || 12;
      const score = fs * 100 - r.top;
      if (score > bestScore) {
        bestScore = score;
        best = e;
      }
    }
    return best;
  }

  function textNodeOf(e, name) {
    const walker = document.createTreeWalker(e, NodeFilter.SHOW_TEXT, null);
    let n;
    while ((n = walker.nextNode())) {
      if ((n.nodeValue || '').trim() === name) return n;
    }
    return null;
  }

  let lastPullAt = 0;
  function pullOnce(name) {
    const now = Date.now();
    if (now - lastPullAt < 250) return null;
    lastPullAt = now;
    return findNameEl(name);
  }

  /** 当前页面对应的 UP（个人主页 URL 里的 UID） */
  function currentSpaceUid() {
    if (location.hostname !== 'space.bilibili.com') return null;
    const m = location.pathname.match(/^\/(\d{1,20})/);
    return m ? m[1] : null;
  }

  function mountOwner() {
    const uid = currentSpaceUid();
    if (!uid) return;
    const meta = members[uid];
    if (!meta) return;
    if (!shownGroupsOf(uid).length) return;
    const name = (meta.n || '').trim();
    if (!name) return;

    waitFor(() => pullOnce(name), 12000).then((e) => {
      if (!e) return;
      const node = textNodeOf(e, name);
      if (!node) return;
      mountAnchor(node, node.parentElement, uid, true, true);
      schedulePlace();
    });
  }

  /* -------------------- 扫描窗口（有终点，不留常驻监听） -------------------- */

  let windowTimer = 0;
  let windowRaf = 0;
  let windowMo = null;
  let activeKind = null;
  const pendingRoots = new Set();

  function stopScanWindow() {
    if (windowMo) windowMo.disconnect();
    if (windowRaf) cancelAnimationFrame(windowRaf);
    if (windowTimer) clearTimeout(windowTimer);
    windowMo = null;
    windowRaf = 0;
    windowTimer = 0;
    pendingRoots.clear();
  }

  function scanWindow(kind, timeout = SCAN_WINDOW) {
    stopScanWindow();
    activeKind = kind;
    if (!document.body) return;
    scanPage();
    windowMo = new MutationObserver((muts) => {
      for (const m of muts) {
        for (const n of m.addedNodes) if (n.nodeType === 1) pendingRoots.add(n);
      }
      if (!pendingRoots.size || windowRaf) return;
      windowRaf = requestAnimationFrame(() => {
        windowRaf = 0;
        const roots = [...pendingRoots];
        pendingRoots.clear();
        if (roots.length > 200) scanPage();
        else for (const r of roots) scanWithin(r);
        schedulePlace();
      });
    });
    windowMo.observe(document.body, { childList: true, subtree: true });
    windowTimer = setTimeout(stopScanWindow, timeout);
  }

  /* -------------------- 卡片池与定位 -------------------- */

  /**
   * 一个人可能同时属于多个组，所以一个锚点对应一叠铭牌。
   * 顺序永远跟随面板里的分组顺序；组或设置变了就重建这一叠。
   */
  function syncCards(t) {
    const want = shownGroupsOf(t.uid);
    const key = want.map((g) => g.id).join(',');
    if (t.cardKey !== key) {
      ensureHost();
      if (t.cards) for (const c of t.cards) c.remove();
      t.cards = want.map(() => {
        const c = document.createElement('div');
        c.className = 'card';
        c.innerHTML = '<span class="b"></span><span class="t"></span>';
        shadow.appendChild(c);
        return c;
      });
      t.cardKey = key;
    }
    want.forEach((g, i) => {
      const b = badgeOf(g);
      const c = t.cards[i];
      if (!c) return;
      c.style.setProperty('--c', b.color);
      c.querySelector('.b').textContent = b.mark;
      c.querySelector('.t').textContent = b.text;
    });
    return t.cards;
  }

  function dropTarget(t) {
    if (t.cards) for (const c of t.cards) c.remove();
    t.cards = null;
    t.cardKey = null;
    targets.delete(t.nameEl);
  }

  /**
   * 同一行里、位于 fromX 右边最近的那个元素（时间戳、按钮之类）。
   * 铭牌是浮层，直接盖上去会把人家糊掉，所以要先知道前面有没有障碍。
   */
  function nextObstacle(t, fromX) {
    const nr = t.range.getBoundingClientRect();
    const sameLine = sameLineAs(nr);
    let node = t.nameEl;
    for (let i = 0; i < 3 && node && node !== document.body; i++, node = node.parentElement) {
      let best = null;
      let count = 0;
      for (let sib = node.nextElementSibling; sib && count < 12; sib = sib.nextElementSibling, count++) {
        const r = sib.getBoundingClientRect();
        if (!r.width || !r.height) continue;
        if (r.right <= fromX) continue;
        if (!sameLine(r)) continue;
        // 页面自己的浮层（悬停名片、弹窗）不算「排版障碍」，它该由遮挡检测处理，
        // 否则铭牌会为了躲它而跳到浮层外面去，反而露在名片旁边
        const cs = getComputedStyle(sib);
        if (cs.position === 'fixed' || cs.position === 'sticky') continue;
        if (cs.position === 'absolute' && (parseInt(cs.zIndex, 10) || 0) >= 100) continue;
        if (!best || r.left < best.left) best = { left: r.left, right: r.right };
      }
      if (best) return best;
    }
    return null;
  }

  /**
   * 这个元素自己「画了东西」吗？
   * B 站有不少铺满全屏的透明容器（palette-button-outer 之类，fixed + z-index:10），
   * 它们只是布局壳子，把铭牌藏起来没有意义，必须排除掉。
   */
  function isPainted(el) {
    if (!el || el === document.body || el === document.documentElement) return false;
    if (el.matches('img,video,canvas,svg,picture,button,input,textarea,select')) return true;
    for (const n of el.childNodes) if (n.nodeType === 3 && (n.nodeValue || '').trim()) return true;
    const cs = getComputedStyle(el);
    if (cs.visibility === 'hidden' || cs.opacity === '0') return false;
    if (cs.backgroundImage && cs.backgroundImage !== 'none') return true;
    const m = (cs.backgroundColor || '').match(/rgba?\(([^)]+)\)/);
    if (m) {
      const p = m[1].split(',').map((s) => parseFloat(s));
      if (p.length >= 3 && (p[3] === undefined || p[3] > 0.06)) return true;
    }
    return false;
  }

  /**
   * 这一块是不是被页面自己的浮层盖住了？
   * 铭牌所在图层在最上面，但 B 站的吸顶导航、悬停名片、弹窗本来就该盖住它。
   * 做法是在铭牌的位置做命中测试：命中的元素往上找，是定位过的浮层（fixed/sticky/absolute
   * 且 z-index ≥ 1）、自己画了东西、又不属于昵称那一块，就认为该让位。
   *
   * B 站实测：悬停名片 .v-popover 是 absolute + z-index:1，顶栏是 1002，
   * 而首页那个铺满屏幕的透明壳子是 fixed + z-index:10——所以「画没画东西」这条不能省。
   */
  function occludedBy(t, left, top, w, h) {
    // 浮层（悬停名片）内部的铭牌不参与遮挡判定：不然会被名片自己的白色背景判成"被遮挡"
    if (t.float) return false;
    const ys = clamp(top + h / 2, 1, window.innerHeight - 1);
    const xs = [left + 4, left + w / 2, left + w - 4];
    for (const x of xs) {
      const el = document.elementFromPoint(clamp(x, 1, window.innerWidth - 1), ys);
      if (!el || el === document.body || el === document.documentElement) continue;
      // 我们自己的设置面板不算遮挡，否则一开面板页面上所有铭牌都消失
      if (el === panelHost || (panelHost && panelHost.contains(el))) continue;
      if (el.contains(t.nameEl) || t.nameEl.contains(el)) continue; // 命中的就是昵称那一块，正常
      if (!isPainted(el)) continue; // 透明壳子，不算遮挡
      let n = el;
      for (let i = 0; i < 8 && n && n !== document.body; i++, n = n.parentElement) {
        const cs = getComputedStyle(n);
        const z = parseInt(cs.zIndex, 10) || 0;
        if (z >= 1 && (cs.position === 'fixed' || cs.position === 'absolute' || cs.position === 'sticky')) return true;
      }
    }
    return false;
  }

  /** 浮层（悬停名片）的边界，用来把铭牌约束在卡片内部 */
  function floatBox(t) {
    let n = t.nameEl.parentElement;
    for (let i = 0; i < 10 && n && n !== document.body; i++, n = n.parentElement) {
      const cs = getComputedStyle(n);
      if (cs.position !== 'fixed' && cs.position !== 'absolute') continue;
      const r = n.getBoundingClientRect();
      if (r.width > 80 && r.height > 40) return r;
    }
    return null;
  }

  function placeAll() {
    placePending = false;
    if (!targets.size) return;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    let dropped = 0;
    let needRecheck = false;
    for (const [, t] of targets) {
      if (!targetStillValid(t)) {
        // B 站不少列表会整块重渲染，节点没了就补扫一次，别让铭牌凭空消失
        dropTarget(t);
        dropped++;
        continue;
      }
      if (!settings.enabled || !members[t.uid]) {
        dropTarget(t);
        continue;
      }
      const cs = syncCards(t);
      if (!cs.length) {
        dropTarget(t); // 组全关了，或者这个人已经不在名单里
        continue;
      }
      const nr = t.range.getBoundingClientRect();
      const show =
        (settings.mode === 'always' || t.hover || t.float) &&
        nr.width > 0 &&
        nr.height > 0 &&
        nr.bottom > 0 &&
        nr.top < vh &&
        isShown(t.nameEl);
      if (!show) {
        for (const c of cs) c.classList.remove('on');
        continue;
      }

      // 先让卡片参与布局，才能量到真实宽度（否则第一帧全是 0，多枚铭牌会叠在一起）
      for (const c of cs) c.style.display = 'flex';
      const ws = cs.map((c) => c.offsetWidth || 0);
      const h = cs[0].offsetHeight || 18;
      const total = ws.reduce((a, b) => a + b, 0) + CARD_GAP * (cs.length - 1);
      let top = nr.top + (nr.height - h) / 2;
      const naturalLeft = nr.right + GAP + t.extraRight;

      // 遮挡检测：在「自然位置」上做判断。命中成本不低，按 120ms 节流。
      // 必须放在避让之前——否则铭牌会先被挤到浮层外面，看起来就没被盖住。
      const now = Date.now();
      if (!t.occAt || now - t.occAt > 120) {
        t.occAt = now;
        t.occ = occludedBy(t, naturalLeft, top, total, h);
      }
      if (t.occ) {
        for (const c of cs) c.classList.remove('on');
        needRecheck = true; // 遮挡可能是暂时的，过一会儿再看一眼
        continue;
      }

      let left = naturalLeft;
      const obs = nextObstacle(t, left);
      if (obs && left + total > obs.left - 2) {
        // 右边放不下：先试试让过障碍（比如时间戳），把铭牌挂到它后面
        if (obs.right + GAP + total <= vw - 6) left = obs.right + GAP;
        else {
          const flip = nr.left - total - GAP;
          left = flip >= 6 ? flip : Math.max(6, vw - total - 6);
        }
      } else if (left + total > vw - 6) {
        const flip = nr.left - total - GAP;
        left = flip >= 6 ? flip : Math.max(6, vw - total - 6);
      }

      // 悬停名片这类浮层：铭牌必须待在卡片里面。一行放不下就换到名字下一行、右对齐，
      // 否则会像挂了个尾巴一样悬在卡片外面
      if (t.float) {
        const box = floatBox(t);
        if (box && left + total > box.right - 4) {
          left = Math.max(box.left + 8, box.right - total - 12);
          top = nr.bottom + 3;
          if (top + h > vh - 4) top = Math.max(4, nr.top - h - 4);
        }
      }

      let x = left;
      for (let i = 0; i < cs.length; i++) {
        cs[i].style.transform = `translate(${Math.round(x)}px, ${Math.round(top)}px)`;
        cs[i].classList.add('on');
        x += ws[i] + CARD_GAP;
      }
    }
    if (dropped) scheduleRescan();
    if (needRecheck) scheduleRecheck();
  }

  /** 被遮挡时挂起的那几枚，220ms 后重新判定一次（遮挡往往是暂时的） */
  let recheckTimer = 0;
  function scheduleRecheck() {
    if (recheckTimer) return;
    recheckTimer = setTimeout(() => {
      recheckTimer = 0;
      schedulePlace();
    }, 220);
  }

  /** 目标被重渲染挤掉后的补偿扫描：防抖 400ms，避免一帧里反复扫 */
  let rescanTimer = 0;
  function scheduleRescan() {
    clearTimeout(rescanTimer);
    rescanTimer = setTimeout(() => {
      if (settings.enabled && scopeOn(pageKind())) scanPage();
    }, 400);
  }

  function schedulePlace() {
    if (placePending) return;
    placePending = true;
    requestAnimationFrame(placeAll);
  }

  /** 清空所有已挂载的标记（路由切换、组开关变化时用） */
  function dropAll() {
    for (const [, t] of targets) if (t.cards) for (const c of t.cards) c.remove();
    targets = new Map();
    zones = new WeakMap();
  }

  /* -------- 悬停委托（一页多目标也不增加监听器） -------- */
  function zoneOf(e) {
    let n = e;
    let i = 0;
    while (n && i++ < 8) {
      const t = zones.get(n);
      if (t) return t;
      n = n.parentElement;
    }
    return null;
  }

  function bindHover() {
    document.addEventListener(
      'mouseover',
      (e) => {
        armHoverWatch();
        const t = zoneOf(e.target);
        if (!t || t.hover) return;
        t.hover = true;
        schedulePlace();
      },
      true
    );
    document.addEventListener(
      'mouseout',
      (e) => {
        armHoverWatch();
        const t = zoneOf(e.target);
        if (!t) return;
        if (zoneOf(e.relatedTarget) === t) return;
        t.hover = false;
        schedulePlace();
      },
      true
    );
  }

  /* -------- 悬窗观察：只在鼠标活动后的短窗口内开启，有终点 -------- */
  const HOVER_WATCH = 2500;

  let watchTimer = 0;
  let watchMo = null;
  let watchRaf = 0;
  let watchBeat = 0;
  let watchArmAt = 0;
  const watchRoots = new Set();

  function stopHoverWatch() {
    if (watchMo) watchMo.disconnect();
    if (watchRaf) cancelAnimationFrame(watchRaf);
    if (watchBeat) clearInterval(watchBeat);
    clearTimeout(watchTimer);
    watchMo = null;
    watchRaf = 0;
    watchBeat = 0;
    watchTimer = 0;
    watchRoots.clear();
    schedulePlace(); // 收尾：让已收起的悬窗把标记也收起来
  }

  function armHoverWatch() {
    if (!document.body) return;
    const now = Date.now();
    if (now - watchArmAt < 100) return;
    watchArmAt = now;
    clearTimeout(watchTimer);
    watchTimer = setTimeout(stopHoverWatch, HOVER_WATCH);
    if (watchMo) return;
    watchMo = new MutationObserver((muts) => {
      for (const m of muts) {
        for (const n of m.addedNodes) if (n.nodeType === 1) watchRoots.add(n);
      }
      if (!watchRoots.size || watchRaf) return;
      watchRaf = requestAnimationFrame(() => {
        watchRaf = 0;
        const roots = [...watchRoots];
        watchRoots.clear();
        if (roots.length > 80) scanPage();
        else for (const r of roots) scanWithin(r);
        schedulePlace();
      });
    });
    watchMo.observe(document.body, { childList: true, subtree: true });
    watchBeat = setInterval(placeAll, 350);
  }

  function bindFollow() {
    const opts = { passive: true, capture: true };
    window.addEventListener('scroll', schedulePlace, opts);
    window.addEventListener(
      'resize',
      () => {
        for (const [, t] of targets) t.extraRight = identityExtraRight(t);
        schedulePlace();
      },
      opts
    );
    document.addEventListener('click', schedulePlace, opts);
    document.addEventListener('focusin', schedulePlace, opts);
  }

  /** 无限滚动补挂：滚动停下再补扫一次，事件驱动，不是常驻监听 */
  let scrollTimer = 0;
  function bindScrollRescan() {
    window.addEventListener(
      'scroll',
      () => {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(() => {
          if (pageKind()) scanPage();
        }, 320);
      },
      { passive: true, capture: true }
    );
  }

  /** 数据变动后的收尾：撤掉失效标记，重挂仍在名册里的 */
  function onDataChanged() {
    for (const [, t] of [...targets]) {
      const m = members[t.uid];
      if (!settings.enabled || !m || !shownGroupsOf(t.uid).length) dropTarget(t);
      else syncCards(t);
    }
    schedulePlace();
  }

  /* ============================================================
   * 6. 页面类型
   * ============================================================ */
  /**
   * 这些页面一律不生效：账号/历史、大会员与支付、收藏与稍后再看。
   * 登录（passport）、充值（pay）、私信（message）等子域根本不在 @match 里，不会注入。
   */
  const PRIVATE_PATHS = ['/account/', '/vip/', '/pay/', '/wallet/', '/medialist/', '/list/'];

  function pageKind() {
    const h = location.hostname;
    const p = location.pathname;
    if (h === 'space.bilibili.com') return 'space';
    if (h === 't.bilibili.com') return 'dynamic';
    if (h === 'search.bilibili.com') return 'search';
    if (h === 'live.bilibili.com') return p.startsWith('/p/') ? null : 'live'; // /p/ 是主播中心后台
    if (h === 'www.bilibili.com') {
      if (PRIVATE_PATHS.some((x) => p.startsWith(x))) return null;
      if (p.startsWith('/opus/')) return 'opus';
      if (p.startsWith('/video/')) return 'video';
      if (p.startsWith('/read/')) return 'read';
      return 'other';
    }
    return null;
  }

  /** 该类型页面是否在用户允许的范围内 */
  function scopeOn(kind) {
    if (!kind) return false;
    if (!settings.enabled) return false;
    return settings.scope[kind] !== false;
  }

  function mount(kind) {
    stopScanWindow();
    stopHoverWatch();
    activeKind = kind;
    if (!kind || !scopeOn(kind)) return;
    if (kind === 'space') mountOwner();
    scanWindow(kind);
  }

  function start() {
    bindHover();
    bindFollow();
    bindScrollRescan();
    mount(pageKind());
    onUrlChange(() => {
      dropAll();
      mount(pageKind());
    });
  }

  /* ============================================================
   * 7. 设置面板
   * ============================================================ */
  const PANEL_ID = 'bnp-panel-host';
  const SCOPE_LABEL = {
    space: '个人主页 space.bilibili.com',
    dynamic: '动态 t.bilibili.com',
    opus: '动态详情 /opus/',
    search: '搜索结果 search.bilibili.com',
    video: '视频播放页 /video/',
    read: '专栏 /read/',
    live: '直播间 live.bilibili.com',
    other: '其余页面（首页、排行等）',
  };

  let panelHost = null;
  let panelShadow = null;
  let panelBody = null;
  let panelMeta = null;
  let panelBar = null;
  let searchInput = null;
  let menuEl = null;
  let sheetEl = null;
  const view = { q: '', open: new Set() };
  let dragId = null;

  function clearDropMarks() {
    if (!panelBody) return;
    for (const s of panelBody.querySelectorAll('.grp')) s.classList.remove('drop-before', 'drop-after');
  }

  const css = `
    :host{
      --bg:#fff;--bg2:#fafbfc;--fg:#16181d;--muted:#6b7280;--line:#e6e8ec;--hover:#f3f5f8;
      --accent:#4f8ef7;--chip:#eef1f6;--danger:#e5484d;--shadow:0 24px 64px rgba(16,18,24,.24);
      all:initial;
    }
    @media (prefers-color-scheme: dark){
      :host{--bg:#17181c;--bg2:#1c1e23;--fg:#e8e9ec;--muted:#9aa1ac;--line:#2b2e35;--hover:#23262c;--chip:#24272e;--danger:#ff5c5c;--shadow:0 24px 64px rgba(0,0,0,.55);}
    }
    *{box-sizing:border-box}
    .mask{position:fixed;inset:0;background:rgba(12,14,18,.48);display:flex;align-items:center;justify-content:center;padding:20px;
      font:400 13px/1.5 -apple-system,BlinkMacSystemFont,"PingFang SC","Microsoft YaHei",sans-serif;color:var(--fg);}
    .dlg{position:relative;width:min(960px,100%);height:min(800px,100%);background:var(--bg);border-radius:14px;
      display:flex;flex-direction:column;overflow:hidden;box-shadow:var(--shadow);}
    .hd{display:flex;align-items:center;gap:10px;padding:14px 18px 12px;border-bottom:1px solid var(--line);flex:none}
    .hd .logo{width:22px;height:22px;border-radius:7px;background:linear-gradient(135deg,#7c5cff,#4f8ef7);flex:none}
    .hd .t{font-size:15px;font-weight:600;letter-spacing:.1px}
    .hd .m{font-size:12px;color:var(--muted)}
    .hd .x{margin-left:auto;border:0;background:transparent;color:var(--muted);font-size:15px;cursor:pointer;
      padding:3px 7px;border-radius:7px;line-height:1}
    .hd .x:hover{background:var(--hover);color:var(--fg)}
    .bar{display:flex;align-items:center;gap:10px;padding:9px 18px;border-bottom:1px solid var(--line);flex-wrap:wrap;flex:none}
    .bar label{display:flex;align-items:center;gap:6px;font-size:12px;color:var(--muted);cursor:pointer;white-space:nowrap}
    .bar .sp{flex:1;min-width:8px}
    select,input[type=text],input[type=search]{font:inherit;font-size:12.5px;color:var(--fg);background:var(--bg);
      border:1px solid var(--line);border-radius:7px;padding:0 8px;height:26px;outline:none;line-height:24px}
    textarea{font:inherit;font-size:12.5px;color:var(--fg);background:var(--bg);border:1px solid var(--line);
      border-radius:7px;padding:6px 8px;outline:none}
    select:focus,input:focus,textarea:focus{border-color:var(--accent)}
    input[type=search]{width:200px}
    input[type=search]::-webkit-search-cancel-button{cursor:pointer}
    .btn{font:inherit;font-size:12.5px;color:var(--fg);background:var(--bg);border:1px solid var(--line);border-radius:7px;
      padding:4px 11px;cursor:pointer;white-space:nowrap;transition:background .12s}
    .btn:hover{background:var(--hover)}
    .btn.pri{background:var(--accent);border-color:var(--accent);color:#fff}
    .btn.pri:hover{filter:brightness(1.06)}
    .btn.ghost{border-color:transparent;color:var(--muted);padding:4px 8px}
    .btn.ghost:hover{color:var(--fg)}
    .btn:disabled{opacity:.5;cursor:not-allowed}
    .bd{flex:1;overflow:auto;padding:8px 12px 18px;overscroll-behavior:contain}
    .grp{border:1px solid var(--line);border-radius:9px;margin:6px 0;overflow:hidden;background:var(--bg)}
    .gh{display:flex;align-items:center;gap:8px;padding:7px 10px;cursor:pointer;user-select:none;min-height:38px}
    .gh:hover{background:var(--hover)}
    .gh .caret{width:10px;color:var(--muted);transition:transform .12s;flex:none;font-size:14px;line-height:1;text-align:center}
    .gh .drag{width:11px;color:var(--muted);opacity:.45;cursor:grab;flex:none;font-size:13px;line-height:1;user-select:none;
      text-align:center;transition:opacity .12s}
    .gh:hover .drag{opacity:.85}
    .gh .drag:active{cursor:grabbing}
    .grp.dragging{opacity:.45}
    .grp.drop-before{box-shadow:inset 0 2px 0 var(--accent)}
    .grp.drop-after{box-shadow:inset 0 -2px 0 var(--accent)}
    .grp.open .gh .caret{transform:rotate(90deg)}
    .chip{min-width:20px;height:20px;padding:0 7px;border-radius:999px;display:inline-flex;align-items:center;justify-content:center;
      font-size:11.5px;color:#fff;font-weight:500;flex:none;letter-spacing:.2px}
    .gh .nm{font-weight:600;max-width:220px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
    .gh .ct{color:var(--muted);font-size:12px;flex:none}
    .gh .sp{flex:1;min-width:6px}
    .gh .cl{width:24px;height:22px;padding:2px;border:1px solid var(--line);border-radius:6px;background:var(--bg);cursor:pointer;
      flex:none;appearance:none;-webkit-appearance:none}
    .gh .cl::-webkit-color-swatch-wrapper{padding:0}
    .gh .cl::-webkit-color-swatch{border:0;border-radius:4px}
    .gh .cl::-moz-color-swatch{border:0;border-radius:4px}
    .gh input.bg{width:54px;height:22px;line-height:20px;text-align:center;font-size:12px;padding:0 4px}
    .gh .emo{border:1px solid var(--line);background:var(--bg);border-radius:6px;cursor:pointer;
      font-size:12px;line-height:1;padding:3px 5px;flex:none}
    .gh .emo:hover{background:var(--chip)}
    .epal{display:none;flex-wrap:wrap;gap:3px;padding:8px 12px;background:var(--bg2);border-top:1px solid var(--line)}
    .grp.emopen .epal{display:flex}
    .epal button{width:27px;height:27px;font-size:15px;line-height:1;border:1px solid transparent;
      border-radius:6px;background:transparent;cursor:pointer;padding:0}
    .epal button:hover{border-color:var(--line);background:var(--bg)}
    .epal .hint{width:100%;font-size:11px;color:var(--muted);line-height:1.6;margin-bottom:2px}
    .gh .ed{border:0;background:transparent;color:var(--muted);cursor:pointer;font-size:13px;padding:2px 5px;border-radius:6px;line-height:1}
    .gh .ed:hover{background:var(--chip);color:var(--fg)}
    .gh .tg{display:flex;align-items:center;gap:5px;font-size:12px;color:var(--muted);cursor:pointer;flex:none}
    .gedit{display:none;gap:10px;align-items:center;padding:9px 12px;background:var(--bg2);border-top:1px solid var(--line);
      font-size:12px;color:var(--muted);flex-wrap:wrap}
    .grp.editing .gedit{display:flex}
    .gedit label{display:flex;align-items:center;gap:6px}
    .gedit input[type=text]{width:130px}
    .gedit .sp{flex:1}
    .ls{display:none;border-top:1px solid var(--line)}
    .grp.open .ls{display:block}
    .row{display:flex;align-items:center;gap:9px;height:36px;padding:0 10px;font-size:12.5px}
    .row:hover{background:var(--hover)}
    .row img{width:23px;height:23px;border-radius:50%;object-fit:cover;background:var(--chip);flex:none}
    .row .n{color:var(--fg);text-decoration:none;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:280px}
    .row .n:hover{color:var(--accent)}
    .row .uid{color:var(--muted);font-size:11.5px;font-family:ui-monospace,Consolas,monospace;opacity:.85;flex:none}
    .row .gc{font-size:10.5px;padding:1px 7px;border-radius:999px;color:#fff;flex:none;max-width:130px;overflow:hidden;
      text-overflow:ellipsis;white-space:nowrap;opacity:.92}
    .row .sp{flex:1;min-width:6px}
    .row .f{color:var(--muted);font-size:12px;font-variant-numeric:tabular-nums;flex:none}
    .more{font-size:12px}
    .row .mv{width:92px;padding:2px 4px;font-size:11.5px;opacity:0;transition:opacity .12s;flex:none}
    .row:hover .mv{opacity:1}
    .row .rm{border:0;background:transparent;color:var(--muted);cursor:pointer;font-size:13px;padding:2px 6px;border-radius:6px;
      opacity:0;transition:opacity .12s;line-height:1;flex:none}
    .row:hover .rm{opacity:1}
    .row .rm:hover{background:rgba(229,72,77,.12);color:var(--danger)}
    .empty{padding:56px 20px;text-align:center;color:var(--muted)}
    .empty .big{font-size:34px;line-height:1;margin-bottom:12px;opacity:.65}
    .empty p{margin:0 0 14px;font-size:13px}
    .empty .acts{display:flex;gap:10px;justify-content:center}
    .foot{padding:8px 18px;border-top:1px solid var(--line);font-size:11.5px;color:var(--muted);display:flex;gap:14px;flex:none}
    .menu{position:absolute;min-width:172px;background:var(--bg);border:1px solid var(--line);border-radius:10px;
      box-shadow:0 12px 32px rgba(16,18,24,.2);padding:5px;z-index:20;display:none}
    .menu.on{display:block}
    .menu button{display:flex;width:100%;align-items:center;gap:8px;border:0;background:transparent;color:var(--fg);
      font:inherit;font-size:12.5px;padding:7px 9px;border-radius:7px;cursor:pointer;text-align:left}
    .menu button:hover{background:var(--hover)}
    .menu .sep{height:1px;background:var(--line);margin:4px 2px}
    .menu button.danger{color:var(--danger)}
    .pop{position:absolute;width:250px;background:var(--bg);border:1px solid var(--line);border-radius:10px;
      box-shadow:0 12px 32px rgba(16,18,24,.2);padding:10px 12px;z-index:20;display:none}
    .pop.on{display:block}
    .pop h4{margin:0 0 8px;font-size:12px;font-weight:600;color:var(--muted)}
    .pop label{display:flex;align-items:center;gap:8px;padding:3px 0;font-size:12.5px;cursor:pointer}
    .toast{position:absolute;left:50%;bottom:22px;transform:translate(-50%,10px);background:#1f2229;color:#fff;
      font-size:12.5px;padding:8px 14px;border-radius:9px;opacity:0;pointer-events:none;transition:all .18s;z-index:60;
      box-shadow:0 8px 24px rgba(0,0,0,.28);max-width:80%}
    .toast.on{opacity:1;transform:translate(-50%,0)}
    .toast.err{background:#b42318}
    .sheet{position:absolute;inset:0;background:var(--bg);display:none;flex-direction:column;z-index:30}
    .sheet.on{display:flex}
    .sh{display:flex;align-items:center;gap:10px;padding:14px 18px 10px;border-bottom:1px solid var(--line);flex:none}
    .sh h3{margin:0;font-size:14px;font-weight:600}
    .sh .x{margin-left:auto;border:0;background:transparent;color:var(--muted);font-size:15px;cursor:pointer;padding:3px 7px;border-radius:7px;line-height:1}
    .sh .x:hover{background:var(--hover)}
    .tabs{display:flex;gap:4px;padding:8px 16px 0;border-bottom:1px solid var(--line);flex:none}
    .tabs button{border:0;background:transparent;color:var(--muted);font:inherit;font-size:12.5px;padding:6px 10px 8px;
      cursor:pointer;border-bottom:2px solid transparent;margin-bottom:-1px}
    .tabs button.on{color:var(--fg);border-bottom-color:var(--accent);font-weight:600}
    .sb{flex:1;overflow:auto;padding:14px 18px 18px}
    .pane{display:none}
    .pane.on{display:block}
    .fieldrow{display:flex;gap:8px;align-items:center;margin-bottom:10px;flex-wrap:wrap}
    .fieldrow input[type=text]{flex:1;min-width:200px;max-width:470px;padding:0 10px;font-size:13px;height:30px}
    .fieldrow .btn{padding:6px 13px}
    .hint{font-size:11.5px;color:var(--muted);line-height:1.6;margin:0 0 12px}
    .hint b{color:var(--fg);font-weight:600}
    .res{border:1px solid var(--line);border-radius:9px;overflow:hidden}
    .res .row{height:44px}
    .res .row .n{max-width:none;flex:1}
    .res .meta{font-size:11.5px;color:var(--muted)}
    .status{font-size:12px;color:var(--muted);min-height:18px;padding:2px 0}
    .status.err{color:var(--danger)}
    textarea{width:100%;min-height:120px;resize:vertical;font-family:ui-monospace,Consolas,monospace;font-size:12px;line-height:1.6;padding:8px 10px}
    .drop{border:1.5px dashed var(--line);border-radius:10px;padding:22px;text-align:center;color:var(--muted);font-size:12.5px;
      cursor:pointer;transition:border-color .12s,background .12s;margin-bottom:10px}
    .drop:hover,.drop.hot{border-color:var(--accent);background:rgba(79,142,247,.05);color:var(--fg)}
    .sfoot{display:flex;align-items:center;gap:10px;padding:10px 18px;border-top:1px solid var(--line);flex:none;font-size:12px;color:var(--muted)}
    .sfoot .sp{flex:1}
    .cover{position:absolute;inset:0;background:rgba(12,14,18,.4);display:none;align-items:center;justify-content:center;z-index:50}
    .cover.on{display:flex}
    .cbox{width:min(380px,88%);background:var(--bg);border-radius:12px;padding:18px 18px 14px;box-shadow:var(--shadow)}
    .cbox p{margin:0 0 16px;font-size:13px;line-height:1.65}
    .cbox .acts{display:flex;gap:8px;justify-content:flex-end}
    .cbox .acts .btn.danger{background:var(--danger);border-color:var(--danger);color:#fff}
  `;

  function ensurePanel() {
    if (panelHost) return;
    panelHost = document.createElement('div');
    panelHost.id = PANEL_ID;
    panelHost.style.cssText = 'all:initial;position:fixed;inset:0;z-index:2147483600;';
    panelShadow = panelHost.attachShadow({ mode: 'open' });

    const style = document.createElement('style');
    style.textContent = css;

    const mask = el('div', 'mask');
    const dlg = el('div', 'dlg');

    /* ---- 头部 ---- */
    const hd = el('div', 'hd');
    hd.appendChild(el('div', 'logo'));
    hd.appendChild(el('div', 't', APP.name));
    panelMeta = el('div', 'm', '');
    hd.appendChild(panelMeta);
    const x = el('button', 'x', '✕');
    x.title = '关闭（Esc）';
    x.addEventListener('click', closePanel);
    hd.appendChild(x);
    dlg.appendChild(hd);

    /* ---- 工具栏 ---- */
    const bar = el('div', 'bar');
    panelBar = bar;

    const modeWrap = el('label');
    modeWrap.appendChild(document.createTextNode('显示方式'));
    const sel = document.createElement('select');
    for (const [v, label] of [
      ['hover', '悬停显示'],
      ['always', '一直显示'],
    ]) {
      const o = document.createElement('option');
      o.value = v;
      o.textContent = label;
      if (settings.mode === v) o.selected = true;
      sel.appendChild(o);
    }
    sel.addEventListener('change', () => {
      settings.mode = sel.value;
      saveSettings();
      placeAll();
    });
    modeWrap.appendChild(sel);
    bar.appendChild(modeWrap);

    const multiWrap = el('label');
    multiWrap.appendChild(document.createTextNode('多组'));
    const msel = document.createElement('select');
    for (const [v, label] of [
      ['all', '全部显示'],
      ['first', '只显示第一个'],
    ]) {
      const o = document.createElement('option');
      o.value = v;
      o.textContent = label;
      if (settings.multi === v) o.selected = true;
      msel.appendChild(o);
    }
    msel.title = '一个人属于多个分组时，铭牌是全部显示，还是只显示排在最前面的那一组';
    msel.addEventListener('change', () => {
      settings.multi = msel.value;
      saveSettings();
      schedulePlace();
    });
    multiWrap.appendChild(msel);
    bar.appendChild(multiWrap);

    searchInput = document.createElement('input');
    searchInput.type = 'search';
    searchInput.placeholder = '搜索昵称 / UID';
    let st = 0;
    searchInput.addEventListener('input', () => {
      clearTimeout(st);
      st = setTimeout(() => {
        view.q = searchInput.value;
        renderBody();
      }, 120);
    });
    bar.appendChild(searchInput);

    bar.appendChild(el('span', 'sp'));

    const onWrap = el('label');
    const onCb = document.createElement('input');
    onCb.type = 'checkbox';
    onCb.checked = !!settings.enabled;
    onCb.addEventListener('change', () => {
      settings.enabled = onCb.checked;
      saveSettings();
      if (!settings.enabled) dropAll();
      else scanPage();
      schedulePlace();
    });
    onWrap.appendChild(onCb);
    onWrap.appendChild(document.createTextNode('显示铭牌'));
    bar.appendChild(onWrap);

    const addBtn = el('button', 'btn pri', '＋ 添加 UP');
    addBtn.addEventListener('click', () => openSheet('add'));
    bar.appendChild(addBtn);

    const impBtn = el('button', 'btn', '导入');
    impBtn.addEventListener('click', () => openSheet('import'));
    bar.appendChild(impBtn);

    const more = el('button', 'btn ghost', '⋯');
    more.title = '更多';
    more.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu(more);
    });
    bar.appendChild(more);

    dlg.appendChild(bar);

    /* ---- 主体 ---- */
    panelBody = el('div', 'bd');
    dlg.appendChild(panelBody);

    /* ---- 底栏 ---- */
    const foot = el('div', 'foot');
    foot.appendChild(el('span', '', '名单与设置只保存在本机浏览器，不上传任何数据。'));
    foot.appendChild(el('span', '', '铭牌文字留空时显示分组名。'));
    dlg.appendChild(foot);

    /* ---- 浮层：更多菜单 ---- */
    menuEl = el('div', 'menu');
    const mkItem = (label, fn, cls) => {
      const b = el('button', cls, label);
      b.addEventListener('click', (e) => {
        e.stopPropagation();
        closeMenu();
        fn();
      });
      menuEl.appendChild(b);
      return b;
    };
    mkItem('＋ 新建分组', () => {
      const g = createGroup(`分组 ${groups.length + 1}`);
      view.open.add(g.id);
      renderBody();
      const sec = panelBody.querySelector(`.grp[data-id="${g.id}"]`);
      if (sec) {
        sec.classList.add('editing');
        const inp = sec.querySelector('.gedit input.name');
        if (inp) {
          inp.focus();
          inp.select();
        }
      }
    });
    mkItem('⇩ 导入名单…', () => openSheet('import'));
    mkItem('⇄ 合并分组…', () => openSheet('merge'));
    mkItem('⇩ 导入测试分组', async () => {
      const ok = await confirmBox(
        '导入测试分组？测试分组仅作示范，可随意修改或删除；已存在同名分组的会合并到原分组，已收录的 UP 会跳过，不会覆盖你的改动。',
        '导入'
      );
      if (!ok) return;
      const r = restoreDefaults();
      renderBody();
      refreshMeta();
      scanPage();
      toast(`已导入 ${r.added} 位 UP${r.created ? `，新建 ${r.created} 个分组` : ''}`);
    });
    mkItem('⇧ 导出 JSON', () => exportData('json'));
    mkItem('⇧ 导出 CSV', () => exportData('csv'));
    menuEl.appendChild(el('div', 'sep'));
    mkItem('显示范围…', () => toggleScope(more));
    mkItem('恢复默认设置', () => resetAll());
    dlg.appendChild(menuEl);

    /* ---- 浮层：显示范围 ---- */
    dlg.appendChild(buildScopePop());

    /* ---- 浮层：添加 / 导入 ---- */
    sheetEl = el('div', 'sheet');
    dlg.appendChild(sheetEl);

    /* ---- 浮层：确认框 ---- */
    const cover = el('div', 'cover');
    const cbox = el('div', 'cbox');
    const ctext = el('p');
    const cacts = el('div', 'acts');
    const cno = el('button', 'btn', '取消');
    const cyes = el('button', 'btn danger', '确定');
    cacts.appendChild(cno);
    cacts.appendChild(cyes);
    cbox.appendChild(ctext);
    cbox.appendChild(cacts);
    cover.appendChild(cbox);
    dlg.appendChild(cover);
    panelHost._confirm = (msg, yesLabel) => {
      return new Promise((resolve) => {
        ctext.textContent = msg;
        cyes.textContent = yesLabel || '确定';
        cover.classList.add('on');
        const done = (v) => {
          cover.classList.remove('on');
          cyes.removeEventListener('click', ok);
          cno.removeEventListener('click', no);
          cover.removeEventListener('mousedown', outside);
          resolve(v);
        };
        const ok = () => done(true);
        const no = () => done(false);
        const outside = (e) => {
          if (e.target === cover) done(false);
        };
        cyes.addEventListener('click', ok);
        cno.addEventListener('click', no);
        cover.addEventListener('mousedown', outside);
        cyes.focus();
      });
    };

    /* ---- 浮层：吐司 ---- */
    const toastEl = el('div', 'toast');
    dlg.appendChild(toastEl);
    panelHost._toast = (msg, isErr) => {
      toastEl.textContent = msg;
      toastEl.className = 'toast on' + (isErr ? ' err' : '');
      clearTimeout(panelHost._toastTimer);
      panelHost._toastTimer = setTimeout(() => {
        toastEl.className = 'toast';
      }, 2400);
    };

    mask.appendChild(dlg);
    mask.addEventListener('mousedown', (e) => {
      if (e.target === mask) closePanel();
    });
    // 拖完松手（包括在面板内任意位置松手）就把 draggable 收回去，避免影响文字选择
    panelShadow.addEventListener(
      'mouseup',
      () => {
        if (panelBody) for (const s of panelBody.querySelectorAll('.grp')) s.draggable = false;
      },
      true
    );
    // 点到菜单 / 范围弹层以外的地方就收起来
    mask.addEventListener('click', (e) => {
      if (!panelShadow) return;
      const pop = panelShadow.querySelector('.pop');
      if (menuEl && menuEl.contains(e.target)) return;
      if (pop && pop.contains(e.target)) return;
      closeMenu();
    });
    panelShadow.appendChild(style);
    panelShadow.appendChild(mask);
    document.documentElement.appendChild(panelHost);
  }

  /* -------------------- 范围弹层 -------------------- */
  function buildScopePop() {
    const pop = el('div', 'pop');
    pop.appendChild(el('h4', '', '铭牌生效范围'));
    for (const [k, label] of Object.entries(SCOPE_LABEL)) {
      const lb = el('label');
      const cb = document.createElement('input');
      cb.type = 'checkbox';
      cb.checked = settings.scope[k] !== false;
      cb.addEventListener('change', () => {
        settings.scope[k] = cb.checked;
        saveSettings();
        // 当前页正好被关掉：立刻撤掉；被打开：立刻补扫
        const kind = pageKind();
        if (kind === k) {
          if (cb.checked) {
            dropAll();
            mount(kind);
          } else {
            stopScanWindow();
            dropAll();
          }
        }
      });
      lb.appendChild(cb);
      lb.appendChild(document.createTextNode(label));
      pop.appendChild(lb);
    }
    return pop;
  }

  function toggleScope(anchor) {
    const pop = panelHost && panelShadow.querySelector('.pop');
    if (!pop) return;
    const on = pop.classList.contains('on');
    closeMenu();
    pop.classList.toggle('on', !on);
    if (!on) {
      const r = anchor.getBoundingClientRect();
      const pr = panelShadow.querySelector('.dlg').getBoundingClientRect();
      pop.style.left = Math.max(12, Math.min(r.right - pr.left - 250, pr.width - 262)) + 'px';
      pop.style.top = r.bottom - pr.top + 6 + 'px';
    }
  }

  function toggleMenu(anchor) {
    const on = menuEl.classList.contains('on');
    closeMenu();
    if (on) return;
    menuEl.classList.add('on');
    const r = anchor.getBoundingClientRect();
    const pr = panelShadow.querySelector('.dlg').getBoundingClientRect();
    menuEl.style.left = Math.max(12, r.right - pr.left - 172) + 'px';
    menuEl.style.top = r.bottom - pr.top + 6 + 'px';
  }

  function closeMenu() {
    if (menuEl) menuEl.classList.remove('on');
    const pop = panelShadow && panelShadow.querySelector('.pop');
    if (pop) pop.classList.remove('on');
  }

  /* -------------------- 渲染：分组 -------------------- */
  function groupColor(g) {
    return HEX.test(g.color) ? g.color : PALETTE[0];
  }

  function memberRow(uid, ctxGid) {
    const m = members[uid];
    if (!m) return el('div', 'row');
    const mine = groupsOfMember(uid);
    const lead = mine[0] || null;
    const other = ctxGid ? mine.filter((g) => g.id !== ctxGid) : mine;
    const row = el('div', 'row');
    row.dataset.uid = uid;

    const img = el('img');
    img.loading = 'lazy';
    img.decoding = 'async';
    img.alt = '';
    if (m.f) img.src = avatarUrl(m.f, 96);
    else img.src = placeholderAvatar(groupColor(lead || { color: PALETTE[0] }));
    row.appendChild(img);

    const a = el('a', 'n', m.n || uid);
    a.href = `https://space.bilibili.com/${uid}`;
    a.target = '_blank';
    a.rel = 'noreferrer noopener';
    a.title = m.n ? `${m.n}（UID ${uid}）` : `UID ${uid}`;
    row.appendChild(a);

    row.appendChild(el('span', 'uid', uid));

    // 除当前分组外，这个人还在哪些组
    for (const g of other.slice(0, 2)) {
      const gc = el('span', 'gc', g.name);
      gc.style.background = groupColor(g);
      gc.title = `也在「${g.name}」`;
      row.appendChild(gc);
    }
    if (other.length > 2) {
      const more = el('span', 'gc', `+${other.length - 2}`);
      more.style.background = '#9aa1ac';
      more.title = other.map((g) => g.name).join('、');
      row.appendChild(more);
    }

    row.appendChild(el('span', 'sp'));
    row.appendChild(el('span', 'f', m.c ? fmtFans(m.c) : ''));

    // 追加到别的分组（已经全在的就不显示这个下拉）
    const addable = groups.filter((g) => m.gids.indexOf(g.id) < 0);
    if (addable.length) {
      const mv = document.createElement('select');
      mv.className = 'mv';
      mv.title = '再加入一个分组';
      const opt0 = document.createElement('option');
      opt0.value = '';
      opt0.textContent = '＋ 分组…';
      mv.appendChild(opt0);
      for (const gr of addable) {
        const o = document.createElement('option');
        o.value = gr.id;
        o.textContent = gr.name;
        mv.appendChild(o);
      }
      mv.value = '';
      mv.addEventListener('change', () => {
        if (!mv.value) return;
        const target = groupById(mv.value);
        addMember(uid, mv.value);
        mv.value = '';
        renderBody();
        refreshMeta();
        if (target) toast(`「${m.n || uid}」也加入了「${target.name}」`);
      });
      row.appendChild(mv);
    }

    const ctx = ctxGid ? groupById(ctxGid) : null;
    const rm = el('button', 'rm', '✕');
    rm.title = ctx ? '从本组移除' : '从名单移除';
    rm.addEventListener('click', async () => {
      if (ctx) {
        const rest = m.gids.filter((x) => x !== ctxGid).length;
        const msg = rest
          ? `把「${m.n || uid}」从「${ctx.name}」移出？他还在另外 ${rest} 个分组里，人不会从名单消失。`
          : `把「${m.n || uid}」从「${ctx.name}」移出？他只属于这一组，移出后会从名单里删除。`;
        if (!(await confirmBox(msg, '移出'))) return;
        removeFromGroup(uid, ctxGid);
      } else {
        if (!(await confirmBox(`把「${m.n || uid}」从名单里彻底移除？`, '移除'))) return;
        removeMember(uid);
      }
      renderBody();
      refreshMeta();
    });
    row.appendChild(rm);

    return row;
  }

  /**
   * 常用 emoji：面板里的标记框只有 54px 宽，手打 emoji 要么打不出来、要么被输入法吃掉，
   * 干脆给一整面现成的，点一下就填进去。顺序按「最常用的排前面」大致分了类。
   */
  const EMOJIS = [
    '🪓', '🎀', '🐰', '👑', '🌌', '🧚', '📦', '🧪', '🎐', '🌸',
    '✨', '💫', '⭐', '🌙', '☀️', '🌈', '🔥', '💧', '❄️', '⚡',
    '🌊', '🍀', '🌻', '🍁', '🍥', '🎵', '🎧', '🎤', '🎬', '📺',
    '🎮', '🕹️', '📷', '🎨', '✏️', '📚', '☕', '🍰', '🍭', '🍓',
    '🍜', '🎈', '🎉', '🎁', '🏆', '🥇', '💎', '🔮', '🎯', '🏷️',
    '📌', '📣', '🔔', '🗡️', '⚔️', '🛡️', '🏹', '🐱', '🐶', '🐼',
    '🦊', '🐺', '🐸', '🐧', '🐳', '🦄', '🦋', '🌟', '🧸', '🎲',
    '💜', '💙', '💚', '💛', '🧡', '❤️', '🤍', '🖤', '🤎', '💖',
  ];

  /** 写剪贴板：先试 navigator.clipboard，被拒就退回 execCommand */
  function copyText(text) {
    const fallback = () => {
      try {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.cssText = 'position:fixed;left:-9999px;top:0;opacity:0';
        document.body.appendChild(ta);
        ta.select();
        const ok = document.execCommand('copy');
        ta.remove();
        return ok;
      } catch (e) {
        return false;
      }
    };
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        return navigator.clipboard.writeText(text).then(() => true, fallback);
      }
    } catch (e) {}
    return Promise.resolve(fallback());
  }

  /** emoji 面板本体，默认折叠，由分组标题上的 🙂 按钮开合 */
  function buildEmojiPalette(onPick) {
    const box = el('div', 'epal');
    box.appendChild(el('div', 'hint', '点一下填进「标记」框，同时复制到剪贴板（也能粘到组名或铭牌文字里）'));
    for (const em of EMOJIS) {
      const b = el('button', '', em);
      b.title = `填入并复制 ${em}`;
      b.addEventListener('click', (e) => {
        e.stopPropagation();
        onPick(em);
      });
      box.appendChild(b);
    }
    return box;
  }

  function buildGroupSection(g) {
    const list = membersOf(g.id);
    const order = settings.sort[g.id] || 'fans-desc';
    list.sort((a, b) => {
      if (order === 'fans-asc') return (a[1].c || 0) - (b[1].c || 0);
      if (order === 'name') return (a[1].n || '').localeCompare(b[1].n || '', 'zh-Hans-CN');
      if (order === 'time') return (b[1].t || 0) - (a[1].t || 0);
      return (b[1].c || 0) - (a[1].c || 0);
    });

    const sec = el('section', 'grp');
    sec.dataset.id = g.id;
    if (view.open.has(g.id)) sec.classList.add('open');

    const head = el('div', 'gh');
    const drag = el('span', 'drag', '⠿');
    drag.title = '按住拖动，调整分组顺序（铭牌也按这个顺序排）';
    head.appendChild(drag);
    head.appendChild(el('span', 'caret', '›'));
    const chip = el('span', 'chip');
    const b0 = badgeOf(g);
    chip.style.background = b0.color;
    chip.textContent = b0.mark || b0.text.slice(0, 2);
    head.appendChild(chip);
    head.appendChild(el('span', 'nm', g.name));
    head.appendChild(el('span', 'ct', `${list.length} 人`));
    head.appendChild(el('span', 'sp'));

    // 颜色
    const cl = document.createElement('input');
    cl.className = 'cl';
    cl.type = 'color';
    cl.value = groupColor(g);
    cl.title = '铭牌浮标颜色';
    cl.addEventListener('click', (e) => e.stopPropagation());
    cl.addEventListener('input', () => {
      updateGroup(g.id, { color: cl.value });
      chip.style.background = cl.value;
      schedulePlace(); // 颜色不用重建卡片，重排一次就刷新了
    });
    head.appendChild(cl);

    // 标记
    const bg = document.createElement('input');
    bg.className = 'bg';
    bg.type = 'text';
    bg.maxLength = 12;
    bg.value = g.badge;
    bg.title = '标记（emoji 或短文字，最多 12 字符）';
    bg.addEventListener('click', (e) => e.stopPropagation());
    bg.addEventListener('input', () => {
      updateGroup(g.id, { badge: bg.value });
      chip.textContent = bg.value || (g.text || g.name).slice(0, 2);
      schedulePlace();
    });
    head.appendChild(bg);

    // emoji 面板（默认折叠）：点一下就填进标记框，同时复制到剪贴板
    let pal = null;
    const emo = el('button', 'emo', '🙂');
    emo.title = '挑 emoji：点一下填进标记框，同时复制到剪贴板';
    emo.addEventListener('click', (e) => {
      e.stopPropagation();
      if (!pal) {
        pal = buildEmojiPalette((em) => {
          bg.value = em;
          updateGroup(g.id, { badge: em });
          chip.textContent = em || (g.text || g.name).slice(0, 2);
          schedulePlace();
          copyText(em).then((ok) => toast(ok ? `已填入并复制 ${em}` : `已填入 ${em}（浏览器不允许自动复制）`));
        });
        sec.insertBefore(pal, head.nextSibling);
      }
      sec.classList.toggle('emopen');
    });
    head.appendChild(emo);

    // 编辑
    const ed = el('button', 'ed', '✎');
    ed.title = '编辑分组';
    ed.addEventListener('click', (e) => {
      e.stopPropagation();
      sec.classList.toggle('editing');
      sec.classList.add('open');
      view.open.add(g.id);
    });
    head.appendChild(ed);

    // 显示开关
    const tg = el('label', 'tg');
    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.checked = !!g.on;
    cb.addEventListener('click', (e) => e.stopPropagation());
    cb.addEventListener('change', () => {
      updateGroup(g.id, { on: cb.checked });
      // 关掉这一组只是让这一枚铭牌消失，人还在别的组的话铭牌照旧
      schedulePlace();
      if (cb.checked) scanPage();
    });
    tg.appendChild(cb);
    tg.appendChild(document.createTextNode('显示'));
    head.appendChild(tg);

    head.addEventListener('click', () => {
      sec.classList.toggle('open');
      if (sec.classList.contains('open')) view.open.add(g.id);
      else view.open.delete(g.id);
    });
    sec.appendChild(head);

    /* ---- 拖动排序 ---- */
    drag.addEventListener('mousedown', () => {
      sec.draggable = true;
    });
    sec.addEventListener('dragstart', (e) => {
      dragId = g.id;
      sec.classList.add('dragging');
      try {
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', g.id);
      } catch (err) {}
    });
    sec.addEventListener('dragend', () => {
      sec.draggable = false;
      sec.classList.remove('dragging');
      dragId = null;
      clearDropMarks();
    });
    sec.addEventListener('dragover', (e) => {
      if (!dragId || dragId === g.id) return;
      e.preventDefault();
      try {
        e.dataTransfer.dropEffect = 'move';
      } catch (err) {}
      const r = head.getBoundingClientRect();
      const after = e.clientY > r.top + r.height / 2;
      clearDropMarks();
      sec.classList.add(after ? 'drop-after' : 'drop-before');
    });
    sec.addEventListener('dragleave', (e) => {
      if (sec.contains(e.relatedTarget)) return;
      sec.classList.remove('drop-before', 'drop-after');
    });
    sec.addEventListener('drop', (e) => {
      if (!dragId) return;
      e.preventDefault();
      const r = head.getBoundingClientRect();
      const after = e.clientY > r.top + r.height / 2;
      const id = dragId;
      dragId = null;
      clearDropMarks();
      if (reorderGroup(id, g.id, after)) {
        renderBody();
        toast('分组顺序已更新，铭牌顺序同步');
      }
    });

    /* ---- 编辑区 ---- */
    const edit = el('div', 'gedit');

    const nameLb = el('label');
    nameLb.appendChild(document.createTextNode('组名'));
    const nameIn = document.createElement('input');
    nameIn.type = 'text';
    nameIn.className = 'name';
    nameIn.value = g.name;
    nameIn.maxLength = 40;
    nameIn.addEventListener('input', () => {
      updateGroup(g.id, { name: nameIn.value });
      sec.querySelector('.nm').textContent = nameIn.value || '未命名分组';
      chip.textContent = g.badge || (g.text || g.name).slice(0, 2);
    });
    nameLb.appendChild(nameIn);
    edit.appendChild(nameLb);

    const textLb = el('label');
    textLb.appendChild(document.createTextNode('铭牌文字'));
    const textIn = document.createElement('input');
    textIn.type = 'text';
    textIn.value = g.text;
    textIn.maxLength = 40;
    textIn.placeholder = g.name;
    textIn.title = '留空则显示分组名';
    textIn.addEventListener('input', () => {
      updateGroup(g.id, { text: textIn.value });
      schedulePlace();
    });
    textLb.appendChild(textIn);
    edit.appendChild(textLb);

    const sortLb = el('label');
    sortLb.appendChild(document.createTextNode('排序'));
    const sortSel = document.createElement('select');
    for (const [v, label] of [
      ['fans-desc', '粉丝 ↓'],
      ['fans-asc', '粉丝 ↑'],
      ['name', '昵称'],
      ['time', '最近添加'],
    ]) {
      const o = document.createElement('option');
      o.value = v;
      o.textContent = label;
      if (order === v) o.selected = true;
      sortSel.appendChild(o);
    }
    sortSel.addEventListener('change', () => {
      settings.sort[g.id] = sortSel.value;
      saveSettings();
      renderBody();
    });
    sortLb.appendChild(sortSel);
    edit.appendChild(sortLb);

    edit.appendChild(el('span', 'sp'));

    const del = el('button', 'btn', '删除分组');
    del.addEventListener('click', async () => {
      const all = membersOf(g.id);
      const only = all.filter(([, m]) => m.gids.length === 1).length;
      const ok = await confirmBox(
        `删除分组「${g.name}」？${all.length ? `组内 ${all.length} 位 UP 会从这一组移除，其中 ${only} 位只属于这一组，会一并从名单删除（都不影响 B 站本身）。` : ''}`,
        '删除'
      );
      if (!ok) return;
      deleteGroup(g.id);
      view.open.delete(g.id);
      renderBody();
      refreshMeta();
      toast('分组已删除');
    });
    edit.appendChild(del);
    sec.appendChild(edit);

    /* ---- 成员列表：大分组按页渲染，避免一次插几千行卡住面板 ---- */
    const body = el('div', 'ls');
    if (!list.length) {
      const tip = el('div', 'row');
      tip.style.color = 'var(--muted)';
      tip.style.paddingLeft = '12px';
      tip.appendChild(el('span', '', '还没有成员，点右上角「＋ 添加 UP」把人加进来。'));
      body.appendChild(tip);
    } else {
      const PAGE = 200;
      let shown = 0;
      const more = el('button', 'btn ghost more');
      more.style.margin = '8px 12px';
      const draw = () => {
        const frag = document.createDocumentFragment();
        const slice = list.slice(shown, shown + PAGE);
        for (const [uid] of slice) frag.appendChild(memberRow(uid, g.id));
        if (more.parentElement) more.remove();
        body.appendChild(frag);
        shown += slice.length;
        if (shown < list.length) {
          more.textContent = `继续显示（还有 ${list.length - shown} 位）`;
          body.appendChild(more);
        }
      };
      more.addEventListener('click', draw);
      draw();
    }
    sec.appendChild(body);

    return sec;
  }

  function renderEmpty(root) {
    const box = el('div', 'empty');
    box.appendChild(el('div', 'big', '🏷️'));
    box.appendChild(el('p', '', '还没有分组。先建一个分组，再把 UP 加进来；也可以先导入自带的测试分组看看效果。'));
    const acts = el('div', 'acts');
    const b1 = el('button', 'btn pri', '新建分组');
    b1.addEventListener('click', () => {
      const g = createGroup('我的分组');
      view.open.add(g.id);
      renderBody();
      refreshMeta();
    });
    const b2 = el('button', 'btn', '导入名单');
    b2.addEventListener('click', () => openSheet('import'));
    const b3 = el('button', 'btn', '导入测试分组');
    b3.addEventListener('click', async () => {
      const ok = await confirmBox(
        '导入自带的 7 个示例分组（测试分组1-VirtuaReal … 测试分组7）？导入后可以随时改名、删组或删人；其中「测试分组6」名单很大，默认是关着的。',
        '导入'
      );
      if (!ok) return;
      const r = restoreDefaults();
      renderBody();
      refreshMeta();
      scanPage();
      toast(`已导入 ${r.added} 位 UP${r.created ? `，新建 ${r.created} 个分组` : ''}`);
    });
    acts.appendChild(b1);
    acts.appendChild(b2);
    acts.appendChild(b3);
    box.appendChild(acts);
    root.appendChild(box);
  }

  function renderSearchView(root, q) {
    const kw = q.trim().toLowerCase();
    const hits = Object.entries(members).filter(([uid, m]) => {
      if ((m.n || '').toLowerCase().includes(kw)) return true;
      return uid.includes(kw);
    });
    hits.sort((a, b) => (b[1].c || 0) - (a[1].c || 0));
    if (!hits.length) {
      root.appendChild(el('div', 'empty', `名单里没有匹配「${q.trim()}」的 UP`));
      return;
    }
    const sec = el('section', 'grp open');
    const head = el('div', 'gh');
    head.appendChild(el('span', 'nm', '搜索结果'));
    head.appendChild(el('span', 'ct', `${hits.length} 人`));
    sec.appendChild(head);
    const body = el('div', 'ls');
    for (const [uid] of hits) body.appendChild(memberRow(uid, null));
    sec.appendChild(body);
    root.appendChild(sec);
  }

  function renderBody() {
    if (!panelBody) return;
    const top = panelBody.scrollTop;
    panelBody.textContent = '';
    if (view.q.trim()) renderSearchView(panelBody, view.q);
    else if (!groups.length) renderEmpty(panelBody);
    else for (const g of groups) panelBody.appendChild(buildGroupSection(g));
    panelBody.scrollTop = top;
    refreshMeta();
  }

  function refreshMeta() {
    if (!panelMeta) return;
    const total = Object.keys(members).length;
    panelMeta.textContent = `${groups.length} 个分组 · ${total} 位 UP · 数据仅存本地`;
  }

  /* -------------------- 面板开关 -------------------- */
  function openPanel() {
    if (panelHost) {
      renderBody();
      return;
    }
    ensurePanel();
    renderBody();
    document.addEventListener('keydown', onPanelKey, true);
    // 打开面板时顺手扫描一次：用户刚加完人切回来就能看到
    if (settings.enabled) scanPage();
  }

  function onPanelKey(e) {
    if (e.key !== 'Escape') return;
    if (sheetEl && sheetEl.classList.contains('on')) {
      closeSheet();
      e.stopPropagation();
      return;
    }
    if (menuEl && menuEl.classList.contains('on')) {
      closeMenu();
      return;
    }
    closePanel();
  }

  function closePanel() {
    if (!panelHost) return;
    closeMenu();
    document.removeEventListener('keydown', onPanelKey, true);
    panelHost.remove();
    panelHost = null;
    panelShadow = null;
    panelBody = null;
    panelMeta = null;
    schedulePlace();
  }

  const toast = (msg, isErr) => panelHost && panelHost._toast && panelHost._toast(msg, isErr);
  const confirmBox = (msg, yes) => (panelHost && panelHost._confirm ? panelHost._confirm(msg, yes) : Promise.resolve(true));

  /* ============================================================
   * 8. 导入 / 导出
   *
   * 支持四种来源，统一解析成 { groups:[{name,badge,text,color}], members:[{uid,name,fans,gidName}] }
   *   1. 本插件导出的 JSON
   *   2. 形如 { groups: { 组名: { members: [...] } } } 的名单 JSON
   *   3. CSV / TSV（表头里带 UID、昵称、分组即可）
   *   4. 纯 UID / 主页链接列表（每行一个）
   * ============================================================ */

  function csvSplit(line, delim) {
    const out = [];
    let cur = '';
    let q = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (q) {
        if (ch === '"') {
          if (line[i + 1] === '"') {
            cur += '"';
            i++;
          } else q = false;
        } else cur += ch;
      } else if (ch === '"') q = true;
      else if (ch === delim) {
        out.push(cur);
        cur = '';
      } else cur += ch;
    }
    out.push(cur);
    return out.map((s) => s.trim());
  }

  function parsePlainImport(lines) {
    const members = [];
    const seen = new Set();
    for (const line of lines) {
      const uid = parseUid(line);
      if (!uid || seen.has(uid)) continue;
      seen.add(uid);
      members.push({ uid, name: '', fans: 0, gidName: '' });
    }
    return { groups: [], members };
  }

  function parseCsvImport(lines) {
    const head = lines[0].replace(/^\uFEFF/, '');
    const delim = (head.match(/\t/g) || []).length > (head.match(/,/g) || []).length ? '\t' : ',';
    const cols = csvSplit(head, delim);
    const find = (re) => cols.findIndex((c) => re.test(c));
    const iUid = find(/^uid$|^mid$|uid/i);
    const iName = find(/现用名|昵称|b站名|nick|^name$|uname/i);
    const iGroupsAll = find(/全部分组|所有分组/);
    const iGroup = cols.findIndex((c, i) => i !== iGroupsAll && /分组|团体|所属|group|公会|mcn/i.test(c));
    const iFans = find(/粉丝|fans/i);
    const iBadge = find(/^标记$/);
    const iText = find(/铭牌文字/);
    const iColor = find(/颜色|color/i);
    const iLink = find(/主页|链接|url/i);

    if (iUid < 0 && iLink < 0) throw new Error('CSV 里找不到 UID 列');

    const groups = [];
    const seenGroup = new Set();
    const groupMeta = new Map();
    const members = [];
    const byUid = new Map();

    for (let r = 1; r < lines.length; r++) {
      if (!lines[r].trim()) continue;
      const c = csvSplit(lines[r], delim);
      const uid = parseUid(iUid >= 0 ? c[iUid] : c[iLink]);
      if (!uid) continue;
      const gname = (iGroup >= 0 && c[iGroup]) || '导入名单';
      // 「全部分组」列用 | 、 ; 分隔，一个人可以同时属于多个组
      let names = iGroupsAll >= 0 ? String(c[iGroupsAll] || '').split(/[|、;]/).map((s) => s.trim()).filter(Boolean) : [];
      if (!names.length) names = [gname];
      for (const n of names) {
        if (seenGroup.has(n)) continue;
        seenGroup.add(n);
        groups.push({ name: n });
      }
      const meta = groupMeta.get(gname) || {};
      if (iBadge >= 0 && c[iBadge] && !meta.badge) meta.badge = c[iBadge];
      if (iText >= 0 && c[iText] && !meta.text) meta.text = c[iText];
      if (iColor >= 0 && HEX.test(c[iColor] || '') && !meta.color) meta.color = c[iColor];
      groupMeta.set(gname, meta);
      const rec = byUid.get(uid);
      if (rec) {
        // 同一个 UID 出现多行：合并成分组关系
        for (const n of names) if (rec.gidNames.indexOf(n) < 0) rec.gidNames.push(n);
        if (!rec.name && iName >= 0 && c[iName]) rec.name = c[iName];
        continue;
      }
      const item = {
        uid,
        name: (iName >= 0 && c[iName]) || '',
        fans: Number((iFans >= 0 && c[iFans]) || 0) || 0,
        gidName: names[0],
        gidNames: names,
      };
      byUid.set(uid, item);
      members.push(item);
    }
    for (const g of groups) Object.assign(g, groupMeta.get(g.name) || {});
    return { groups, members };
  }

  function parseJsonImport(raw) {
    const j = JSON.parse(raw);
    const groups = [];
    const members = [];
    const byUid = new Map();
    const push = (uid, name, fans, gidName) => {
      const id = parseUid(uid);
      if (!id) return;
      const rec = byUid.get(id);
      if (rec) {
        // 同一个人出现在多个分组里：合并成份关系，而不是丢掉后面那条
        if (gidName && rec.gidNames.indexOf(gidName) < 0) rec.gidNames.push(gidName);
        if (!rec.name && name) rec.name = String(name);
        if (!rec.fans && fans) rec.fans = Number(fans) || 0;
        return;
      }
      const item = {
        uid: id,
        name: String(name || ''),
        fans: Number(fans) || 0,
        gidName: gidName || '',
        gidNames: gidName ? [gidName] : [],
      };
      byUid.set(id, item);
      members.push(item);
    };

    const walkGroup = (name, g) => {
      if (!name) return;
      groups.push({
        name: String(name),
        badge: g && typeof g.badge === 'string' ? g.badge : undefined,
        text: g && typeof g.text === 'string' ? g.text : undefined,
        color: g && HEX.test(g.color || '') ? g.color : undefined,
      });
      const list = (g && (g.members || g.list || g.items)) || [];
      if (Array.isArray(list)) {
        for (const m of list) push(m.uid || m.mid || m.id, m.biliName || m.name || m.uname || m.nick, m.followers || m.fans, name);
      } else if (list && typeof list === 'object') {
        for (const [uid, m] of Object.entries(list)) push(uid, m && (m.biliName || m.name || m.n), m && (m.followers || m.fans), name);
      }
    };

    if (Array.isArray(j)) {
      // [{uid,name}] 或 [{name, members:[...]}]
      if (j.length && (j[0].members || j[0].list)) for (const g of j) walkGroup(g.name || g.title, g);
      else for (const m of j) push(m.uid || m.mid, m.name || m.biliName, m.fans || m.followers, '');
    } else if (j && typeof j === 'object') {
      const gs = j.groups;
      if (Array.isArray(gs)) for (const g of gs) walkGroup(g.name || g.title || g.label, g);
      else if (gs && typeof gs === 'object') for (const [name, g] of Object.entries(gs)) walkGroup(name, g);

      // 顶层再挂一份 members（本插件的另一种导出形态）
      if (j.members && !Array.isArray(gs)) {
        const id2name = new Map();
        for (const g of groups) id2name.set(g.id, g.name);
        if (Array.isArray(j.members)) for (const m of j.members) push(m.uid || m.mid, m.name || m.biliName, m.fans, '');
        else
          for (const [uid, m] of Object.entries(j.members)) {
            if (!m || typeof m !== 'object') continue;
            const gidName = m.group || m.gidName || id2name.get(m.gid) || '';
            if (gidName && !groups.some((g) => g.name === gidName)) groups.push({ name: gidName });
            push(uid, m.n || m.name, m.c != null ? m.c : m.fans, gidName);
          }
      }
    }
    // 多重分组关系（v2 导出格式）：uid -> [分组名]
    if (!Array.isArray(j) && j.memberGroups && typeof j.memberGroups === 'object') {
      for (const [uid, names] of Object.entries(j.memberGroups)) {
        if (!Array.isArray(names)) continue;
        const id = parseUid(uid);
        const rec = members.find((x) => x.uid === id);
        if (!rec) continue;
        const list = names.map((n) => String(n).trim()).filter(Boolean);
        for (const n of list) if (!groups.some((g) => g.name === n)) groups.push({ name: n });
        if (list.length) {
          rec.gidNames = list;
          rec.gidName = list[0];
        }
      }
    }
    return { groups, members };
  }

  function parseImport(text) {
    const raw = String(text || '').replace(/^\uFEFF/, '').trim();
    if (!raw) throw new Error('内容为空');
    if (raw[0] === '{' || raw[0] === '[') return parseJsonImport(raw);
    const lines = raw.split(/\r?\n/).filter((l) => l.trim());
    const first = lines[0];
    if (/[,;\t]/.test(first) && /uid|mid|昵称|name|团体|分组|group|粉丝/i.test(first)) return parseCsvImport(lines);
    return parsePlainImport(lines);
  }

  function download(filename, text, mime) {
    const blob = new Blob([text], { type: mime || 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.documentElement.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 4000);
  }

  /** 导出用的数据结构：groups[].members 里每人只出现一次，多重分组关系放 memberGroups */
  function buildExport() {
    const memberGroups = {};
    for (const [uid, m] of Object.entries(members)) {
      const gs = groupsOfMember(uid);
      if (gs.length > 1) memberGroups[uid] = gs.map((g) => g.name);
    }
    return {
      app: APP.nameEn,
      v: 2,
      exportedAt: new Date().toISOString(),
      groups: groups.map((g) => ({
        name: g.name,
        badge: g.badge,
        text: g.text,
        color: g.color,
        members: membersOf(g.id)
          .filter(([uid]) => {
            const gs = groupsOfMember(uid);
            return gs.length && gs[0].id === g.id;
          })
          .map(([uid, m]) => ({ uid: Number(uid), name: m.n, fans: m.c })),
      })),
      memberGroups,
    };
  }

  function exportData(kind) {
    const stamp = new Date().toISOString().slice(0, 10);
    if (kind === 'csv') {
      const rows = [['分组', '全部分组', '标记', '铭牌文字', '颜色', 'B站昵称', 'UID', '粉丝数', '主页链接']];
      for (const [uid, m] of Object.entries(members)) {
        const gs = groupsOfMember(uid);
        if (!gs.length) continue;
        const g = gs[0];
        rows.push([
          g.name,
          gs.map((x) => x.name).join('|'),
          g.badge,
          g.text || g.name,
          g.color,
          m.n,
          uid,
          m.c,
          `https://space.bilibili.com/${uid}`,
        ]);
      }
      const csv = rows
        .map((r) => r.map((v) => (/[",\n]/.test(String(v)) ? `"${String(v).replace(/"/g, '""')}"` : String(v))).join(','))
        .join('\r\n');
      download(`${APP.nameEn}-${stamp}.csv`, '\uFEFF' + csv, 'text/csv;charset=utf-8');
    } else {
      // groups[].members 里每个人只出现一次（挂在他的第一个组下），
      // 多重分组关系单独放在 memberGroups，保证导回去不丢关系
      download(`${APP.nameEn}-${stamp}.json`, JSON.stringify(buildExport(), null, 2), 'application/json');
    }
    toast(kind === 'csv' ? 'CSV 已导出' : 'JSON 已导出');
  }

  /** 补齐昵称/头像/粉丝数：导入时只有 UID 的那部分靠它填 */
  async function hydrateUids(uids, onProgress) {
    const list = uids.filter((u) => members[u]);
    if (!list.length) return { ok: 0, fail: 0 };
    let ok = 0;
    let fail = 0;
    let done = 0;
    let cursor = 0;
    const worker = async () => {
      while (cursor < list.length) {
        const uid = list[cursor++];
        try {
          const info = await fetchCardQueued(uid);
          if (members[uid]) {
            members[uid].n = info.name || members[uid].n;
            members[uid].f = info.face || members[uid].f;
            members[uid].c = info.fans || members[uid].c;
          }
          ok++;
        } catch (e) {
          fail++;
        }
        done++;
        if (onProgress) onProgress(done, list.length);
        if (done % 10 === 0) {
          saveMembers();
          bump();
        }
      }
    };
    await Promise.all([worker(), worker(), worker()]);
    saveMembers();
    bump();
    return { ok, fail };
  }

  function applyImport(parsed, mode) {
    const targetGid = sheetTargetGid();
    let createdGroups = 0;
    let added = 0;
    let skipped = 0;
    const touched = [];

    const gidFor = (name) => {
      if (!name) {
        if (targetGid) return targetGid;
        const fallback = groupByName('导入名单') || createGroup('导入名单');
        return fallback.id;
      }
      let g = groupByName(name);
      if (!g) {
        const meta = parsed.groups.find((x) => x.name === name) || {};
        g = createGroup(name, { badge: meta.badge, text: meta.text, color: meta.color });
        createdGroups++;
      } else if (parsed.groups.length) {
        const meta = parsed.groups.find((x) => x.name === name);
        if (meta) {
          if (meta.badge) updateGroup(g.id, { badge: meta.badge });
          if (meta.text) updateGroup(g.id, { text: meta.text });
          if (meta.color) updateGroup(g.id, { color: meta.color });
        }
      }
      return g.id;
    };

    // 批量写：逐条走 addMember 会触发 N 次落盘与重建索引，上千人时很明显
    for (const m of parsed.members) {
      const names = m.gidNames && m.gidNames.length ? m.gidNames : [m.gidName];
      const gids = [...new Set(names.map(gidFor).filter(Boolean))];
      if (!gids.length) continue;
      const ex = members[m.uid];
      if (ex) {
        if (mode === 'overwrite') {
          if (ex.gids.slice().sort().join() !== gids.slice().sort().join()) added++;
          else skipped++;
          ex.gids = gids;
          if (m.name) ex.n = m.name;
          if (m.fans) ex.c = m.fans;
          touched.push(m.uid);
        } else {
          // 合并：只补上还没加入的分组，已经在本组的算跳过
          let novelty = 0;
          for (const gid of gids) {
            if (ex.gids.indexOf(gid) < 0) {
              ex.gids.push(gid);
              novelty++;
            }
          }
          if (m.name && !ex.n) ex.n = m.name;
          if (m.fans && !ex.c) ex.c = m.fans;
          if (novelty) added++;
          else skipped++;
          touched.push(m.uid);
        }
        continue;
      }
      members[m.uid] = { gids, n: m.name || '', f: '', c: Number(m.fans) || 0, t: Date.now() };
      added++;
      touched.push(m.uid);
    }
    saveGroups();
    saveMembers();
    bump();
    renderBody();
    return { createdGroups, added, skipped, touched };
  }

  function resetAll() {
    confirmBox('恢复默认设置？只重置显示方式、显示范围与排序，不会动你的分组和名单。', '恢复').then((ok) => {
      if (!ok) return;
      settings.mode = 'hover';
      settings.enabled = true;
      settings.scope = Object.assign({}, DEFAULT_SCOPE);
      settings.sort = {};
      saveSettings();
      dropAll();
      // 工具栏控件也跟着回位
      const sel = panelBar && panelBar.querySelector('select');
      if (sel) sel.value = settings.mode;
      const cb = panelBar && panelBar.querySelector('input[type=checkbox]');
      if (cb) cb.checked = true;
      renderBody();
      if (scopeOn(pageKind())) mount(pageKind());
      toast('已恢复默认设置');
    });
  }

  /* ============================================================
   * 9. 添加 / 导入面板
   * ============================================================ */
  function sheetTargetGid() {
    const sel = sheetEl && sheetEl.querySelector('.sfoot select');
    if (sel && sel.value) return sel.value;
    return groups[0] ? groups[0].id : null;
  }

  function closeSheet() {
    if (!sheetEl) return;
    sheetEl.classList.remove('on');
    sheetEl.textContent = '';
  }

  function openSheet(kind, opts = {}) {
    ensurePanel();
    if (!sheetEl) return;
    sheetEl.textContent = '';
    sheetEl.classList.add('on');
    if (kind === 'import') buildImportSheet();
    else if (kind === 'merge') buildMergeSheet();
    else buildAddSheet(opts);
  }

  function resultRow(item) {
    const row = el('div', 'row');
    const img = el('img');
    img.loading = 'lazy';
    img.alt = '';
    if (item.face) img.src = avatarUrl(item.face, 96);
    else img.src = placeholderAvatar(PALETTE[0]);
    row.appendChild(img);

    const wrap = el('div');
    wrap.style.cssText = 'flex:1;min-width:0;display:flex;flex-direction:column;line-height:1.35';
    const a = el('a', 'n', item.name || item.uid);
    a.href = `https://space.bilibili.com/${item.uid}`;
    a.target = '_blank';
    a.rel = 'noreferrer noopener';
    wrap.appendChild(a);
    wrap.appendChild(el('span', 'meta', `UID ${item.uid}${item.fans ? ' · ' + fmtFans(item.fans) + ' 粉丝' : ''}`));
    row.appendChild(wrap);
    if (item.extra) row.appendChild(item.extra);
    return row;
  }

  function buildAddSheet(opts) {
    const head = el('div', 'sh');
    head.appendChild(el('h3', '', '添加 UP'));
    const x = el('button', 'x', '✕');
    x.addEventListener('click', closeSheet);
    head.appendChild(x);
    sheetEl.appendChild(head);

    const tabs = el('div', 'tabs');
    const panes = el('div', 'sb');
    const mkTab = (label, key) => {
      const b = el('button', '', label);
      b.dataset.tab = key;
      b.addEventListener('click', () => switchTab(key));
      tabs.appendChild(b);
    };
    mkTab('搜索昵称', 'search');
    mkTab('UID / 链接', 'uid');
    mkTab('批量导入', 'import');
    sheetEl.appendChild(tabs);

    const footer = el('div', 'sfoot');
    footer.appendChild(document.createTextNode('目标分组'));
    const sel = document.createElement('select');
    for (const g of groups) {
      const o = document.createElement('option');
      o.value = g.id;
      o.textContent = g.name;
      sel.appendChild(o);
    }
    footer.appendChild(sel);
    const newBtn = el('button', 'btn ghost', '＋ 新建分组');
    newBtn.addEventListener('click', () => {
      const g = createGroup(`分组 ${groups.length + 1}`);
      const o = document.createElement('option');
      o.value = g.id;
      o.textContent = g.name;
      sel.appendChild(o);
      sel.value = g.id;
      renderBody();
      refreshMeta();
      toast(`已新建「${g.name}」，记得在列表里改个名字`);
    });
    footer.appendChild(newBtn);
    footer.appendChild(el('span', 'sp'));
    const done = el('button', 'btn', '关闭');
    done.addEventListener('click', closeSheet);
    footer.appendChild(done);

    /* ---- 搜索 ---- */
    const pSearch = el('div', 'pane on');
    pSearch.dataset.pane = 'search';
    pSearch.appendChild(
      el('p', 'hint', '输入 B 站昵称搜索用户，点「加入」把人放进上面选中的分组。搜索走 B 站公开接口，需要能正常访问 B 站。')
    );
    const row1 = el('div', 'fieldrow');
    const kw = document.createElement('input');
    kw.type = 'text';
    kw.placeholder = '输入昵称，例如：綾奈奈奈';
    const go = el('button', 'btn pri', '搜索');
    row1.appendChild(kw);
    row1.appendChild(go);
    pSearch.appendChild(row1);
    const st1 = el('div', 'status');
    pSearch.appendChild(st1);
    const res1 = el('div', 'res');
    res1.style.display = 'none';
    pSearch.appendChild(res1);

    const doSearch = async () => {
      const q = kw.value.trim();
      if (!q) return;
      go.disabled = true;
      st1.className = 'status';
      st1.textContent = '搜索中…';
      res1.style.display = 'none';
      res1.textContent = '';
      try {
        const { list, total } = await searchUsers(q, 1);
        if (!list.length) {
          st1.textContent = '没有搜到匹配的用户';
        } else {
          st1.textContent = `找到约 ${total} 个结果，显示前 ${list.length} 个`;
          for (const item of list) {
            const btn = el('button', 'btn', '');
            const state = () => {
              const ex = members[item.uid];
              const tg = sheetTargetGid();
              if (ex && ex.gids.indexOf(tg) >= 0) {
                btn.textContent = '已在本组';
                btn.disabled = true;
                btn.dataset.mode = '';
              } else if (ex) {
                btn.textContent = '＋ 再加一组';
                btn.disabled = false;
                btn.dataset.mode = 'add';
              } else {
                btn.textContent = '＋ 加入';
                btn.disabled = false;
                btn.dataset.mode = 'add';
              }
            };
            state();
            btn.addEventListener('click', () => {
              const tg = sheetTargetGid();
              if (!tg) {
                toast('先建一个分组', true);
                return;
              }
              const already = members[item.uid] && members[item.uid].gids.length;
              addMember(item.uid, tg, { name: item.name, face: item.face, fans: item.fans });
              toast(already ? `「${item.name}」也加入了「${groupById(tg).name}」` : `已加入「${groupById(tg).name}」`);
              renderBody();
              refreshMeta();
              scanPage();
              state();
            });
            res1.appendChild(resultRow({ ...item, extra: btn }));
          }
          res1.style.display = 'block';
        }
      } catch (e) {
        st1.className = 'status err';
        st1.textContent = `${e.message}。可以改用「UID / 链接」添加。`;
      } finally {
        go.disabled = false;
      }
    };
    go.addEventListener('click', doSearch);
    kw.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') doSearch();
    });

    /* ---- UID ---- */
    const pUid = el('div', 'pane');
    pUid.dataset.pane = 'uid';
    pUid.appendChild(
      el('p', 'hint', '每行一个 UID 或主页链接，也可以直接粘一整段分享文案，会自动提取数字 UID。')
    );
    const ta = document.createElement('textarea');
    ta.placeholder = '186463\nhttps://space.bilibili.com/1694351351\n…';
    pUid.appendChild(ta);
    const row2 = el('div', 'fieldrow');
    row2.style.marginTop = '10px';
    const parseBtn = el('button', 'btn pri', '解析并预览');
    row2.appendChild(parseBtn);
    pUid.appendChild(row2);
    const st2 = el('div', 'status');
    pUid.appendChild(st2);
    const res2 = el('div', 'res');
    res2.style.display = 'none';
    pUid.appendChild(res2);

    parseBtn.addEventListener('click', async () => {
      const ids = [...new Set(String(ta.value).split(/[\s,;]+/).map(parseUid).filter(Boolean))].slice(0, 200);
      if (!ids.length) {
        st2.className = 'status err';
        st2.textContent = '没有识别出 UID';
        return;
      }
      parseBtn.disabled = true;
      res2.textContent = '';
      res2.style.display = 'block';
      st2.className = 'status';
      st2.textContent = `共 ${ids.length} 个 UID，正在获取资料…`;

      const rows = new Map();
      const newIds = [];
      for (const uid of ids) {
        const ex = members[uid];
        const btn = el('button', 'btn', '');
        const label = el('span', 'meta', '');
        const wrapRow = resultRow({ uid, name: ex ? ex.n : 'UID ' + uid, face: ex ? ex.f : '', fans: ex ? ex.c : 0, extra: btn });
        res2.appendChild(wrapRow);
        rows.set(uid, { row: wrapRow, btn, label });
        if (ex) {
          const gs = groupsOfMember(uid);
          btn.textContent = gs.length ? `已在「${gs.map((x) => x.name).join('、')}」` : '已加入';
          btn.disabled = true;
        } else {
          btn.textContent = '待获取';
          btn.disabled = true;
          newIds.push(uid);
        }
      }

      let done = 0;
      const infos = new Map();
      const total = newIds.length;
      await Promise.all(
        newIds.map((uid) =>
          fetchCardQueued(uid)
            .then((info) => {
              infos.set(uid, info);
            })
            .catch(() => {
              infos.set(uid, null);
            })
            .finally(() => {
              done++;
              st2.textContent = `正在获取资料 ${done}/${total}…`;
            })
        )
      );

      for (const uid of newIds) {
        const rec = rows.get(uid);
        const info = infos.get(uid);
        if (!rec) continue;
        if (info) {
          const img = rec.row.querySelector('img');
          if (info.face) img.src = avatarUrl(info.face, 96);
          rec.row.querySelector('.n').textContent = info.name || uid;
          rec.row.querySelector('.meta').textContent = `UID ${uid} · ${fmtFans(info.fans)} 粉丝`;
          rec.btn.textContent = '＋ 加入';
          rec.btn.disabled = false;
          rec.btn.addEventListener('click', () => {
            const tg = sheetTargetGid();
            if (!tg) return;
            addMember(uid, tg, { name: info.name, face: info.face, fans: info.fans });
            rec.btn.textContent = `已在「${groupById(tg).name}」`;
            rec.btn.disabled = true;
            renderBody();
            refreshMeta();
            scanPage();
          });
        } else {
          rec.row.querySelector('.meta').textContent = `UID ${uid} · 取不到资料（可能不存在）`;
          rec.btn.textContent = '仍然加入';
          rec.btn.disabled = false;
          rec.btn.addEventListener('click', () => {
            const tg = sheetTargetGid();
            if (!tg) return;
            addMember(uid, tg, {});
            rec.btn.textContent = '已加入';
            rec.btn.disabled = true;
            renderBody();
            refreshMeta();
          });
        }
      }
      st2.textContent = `共 ${ids.length} 个 UID，已加入 ${ids.filter((u) => members[u]).length} 个`;
      parseBtn.disabled = false;
    });

    /* ---- 批量导入 ---- */
    const pImp = el('div', 'pane');
    pImp.dataset.pane = 'import';
    pImp.appendChild(
      el(
        'p',
        'hint',
        '支持 JSON / CSV / 纯 UID 列表。JSON 可以是本插件导出的格式，也可以是「分组 → 成员」结构的名单（含 biliName / uid 字段）。CSV 表头里只要有 UID 和分组列就能认。'
      )
    );
    const drop = el('div', 'drop', '把 .json / .csv / .txt 拖到这里，或点击选择文件');
    const file = document.createElement('input');
    file.type = 'file';
    file.accept = '.json,.csv,.txt,text/plain,application/json';
    file.style.display = 'none';
    drop.appendChild(file);
    pImp.appendChild(drop);
    const ta2 = document.createElement('textarea');
    ta2.placeholder = '也可以直接把文件内容粘贴到这里…';
    pImp.appendChild(ta2);
    const row3 = el('div', 'fieldrow');
    row3.style.marginTop = '10px';
    const modeSel = document.createElement('select');
    for (const [v, label] of [
      ['merge', '合并（已存在的跳过）'],
      ['overwrite', '覆盖（已存在的改到新分组）'],
    ]) {
      const o = document.createElement('option');
      o.value = v;
      o.textContent = label;
      modeSel.appendChild(o);
    }
    row3.appendChild(modeSel);
    const parseBtn2 = el('button', 'btn', '预览');
    row3.appendChild(parseBtn2);
    const impBtn = el('button', 'btn pri', '开始导入');
    impBtn.disabled = true;
    row3.appendChild(impBtn);
    pImp.appendChild(row3);
    const st3 = el('div', 'status');
    pImp.appendChild(st3);
    const prev = el('div', 'res');
    prev.style.display = 'none';
    pImp.appendChild(prev);

    let parsed = null;
    const doParse = (text) => {
      prev.textContent = '';
      st3.className = 'status';
      try {
        parsed = parseImport(text);
        if (!parsed.members.length) throw new Error('没有解析出任何 UP');
        const cnt = new Map();
        for (const m of parsed.members) {
          const k = m.gidName || '（当前选中分组）';
          cnt.set(k, (cnt.get(k) || 0) + 1);
        }
        st3.textContent = `识别到 ${parsed.groups.length || cnt.size} 个分组、${parsed.members.length} 位 UP`;
        for (const [k, v] of cnt) {
          const r = el('div', 'row');
          r.appendChild(el('span', 'n', k));
          r.appendChild(el('span', 'sp'));
          r.appendChild(el('span', 'f', `${v} 人`));
          prev.appendChild(r);
        }
        prev.style.display = 'block';
        impBtn.disabled = false;
      } catch (e) {
        parsed = null;
        impBtn.disabled = true;
        prev.style.display = 'none';
        st3.className = 'status err';
        st3.textContent = '解析失败：' + e.message;
      }
    };
    const readFile = (f) => {
      if (!f) return;
      const fr = new FileReader();
      fr.onload = () => {
        ta2.value = String(fr.result || '');
        doParse(ta2.value);
      };
      fr.onerror = () => {
        st3.className = 'status err';
        st3.textContent = '读不了这个文件';
      };
      fr.readAsText(f, 'utf-8');
    };
    drop.addEventListener('click', () => file.click());
    file.addEventListener('change', () => readFile(file.files && file.files[0]));
    drop.addEventListener('dragover', (e) => {
      e.preventDefault();
      drop.classList.add('hot');
    });
    drop.addEventListener('dragleave', () => drop.classList.remove('hot'));
    drop.addEventListener('drop', (e) => {
      e.preventDefault();
      drop.classList.remove('hot');
      readFile(e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]);
    });
    parseBtn2.addEventListener('click', () => doParse(ta2.value));

    impBtn.addEventListener('click', async () => {
      if (!parsed) return;
      impBtn.disabled = true;
      const mode = modeSel.value;
      const r = applyImport(parsed, mode);
      st3.textContent = `已导入：新建 ${r.createdGroups} 个分组，写入 ${r.added} 位 UP${r.skipped ? `，跳过 ${r.skipped} 位已有成员` : ''}。正在补全资料…`;

      const need = r.touched.filter((u) => members[u] && !members[u].f);
      if (need.length) {
        await hydrateUids(need, (done, total) => {
          st3.textContent = `正在补全资料 ${done}/${total}…`;
        });
      }
      st3.textContent = `导入完成：新建 ${r.createdGroups} 个分组，写入 ${r.added} 位 UP${
        r.skipped ? `，跳过 ${r.skipped} 位已有成员` : ''
      }`;
      renderBody();
      refreshMeta();
      scanPage();
      impBtn.disabled = false;
    });

    panes.appendChild(pSearch);
    panes.appendChild(pUid);
    panes.appendChild(pImp);
    sheetEl.appendChild(panes);
    sheetEl.appendChild(footer);

    function switchTab(key) {
      for (const b of tabs.children) b.classList.toggle('on', b.dataset.tab === key);
      for (const p of panes.children) p.classList.toggle('on', p.dataset.pane === key);
      footer.style.display = key === 'import' ? 'none' : 'flex';
    }

    switchTab('search');
    if (opts.uid) {
      switchTab('uid');
      ta.value = opts.uid;
      parseBtn.click();
    } else {
      setTimeout(() => kw.focus(), 30);
    }
  }

  function buildImportSheet() {
    const head = el('div', 'sh');
    head.appendChild(el('h3', '', '导入名单'));
    const x = el('button', 'x', '✕');
    x.addEventListener('click', closeSheet);
    head.appendChild(x);
    sheetEl.appendChild(head);
    const body = el('div', 'sb');
    sheetEl.appendChild(body);

    body.appendChild(
      el(
        'p',
        'hint',
        '把 JSON / CSV / 纯 UID 列表拖进来。导入只写入本机存储：分组按名字合并，成员按 UID 去重。导入后会自动向 B 站补全昵称、头像与粉丝数。'
      )
    );
    const drop = el('div', 'drop', '把 .json / .csv / .txt 拖到这里，或点击选择文件');
    const file = document.createElement('input');
    file.type = 'file';
    file.accept = '.json,.csv,.txt,text/plain,application/json';
    file.style.display = 'none';
    drop.appendChild(file);
    body.appendChild(drop);
    const ta = document.createElement('textarea');
    ta.placeholder = '或者把内容粘贴到这里…';
    body.appendChild(ta);
    const row = el('div', 'fieldrow');
    row.style.marginTop = '10px';
    const modeSel = document.createElement('select');
    for (const [v, label] of [
      ['merge', '合并（已存在的跳过）'],
      ['overwrite', '覆盖（已存在的改到新分组）'],
    ]) {
      const o = document.createElement('option');
      o.value = v;
      o.textContent = label;
      modeSel.appendChild(o);
    }
    row.appendChild(modeSel);
    const parseBtn = el('button', 'btn', '预览');
    row.appendChild(parseBtn);
    const impBtn = el('button', 'btn pri', '开始导入');
    impBtn.disabled = true;
    row.appendChild(impBtn);
    body.appendChild(row);
    const st = el('div', 'status');
    body.appendChild(st);
    const prev = el('div', 'res');
    prev.style.display = 'none';
    body.appendChild(prev);

    let parsed = null;
    const doParse = (text) => {
      prev.textContent = '';
      st.className = 'status';
      try {
        parsed = parseImport(text);
        if (!parsed.members.length) throw new Error('没有解析出任何 UP');
        const cnt = new Map();
        for (const m of parsed.members) {
          const k = m.gidName || '（当前分组）';
          cnt.set(k, (cnt.get(k) || 0) + 1);
        }
        st.textContent = `识别到 ${parsed.groups.length || cnt.size} 个分组、${parsed.members.length} 位 UP`;
        for (const [k, v] of cnt) {
          const r = el('div', 'row');
          r.appendChild(el('span', 'n', k));
          r.appendChild(el('span', 'sp'));
          r.appendChild(el('span', 'f', `${v} 人`));
          prev.appendChild(r);
        }
        prev.style.display = 'block';
        impBtn.disabled = false;
      } catch (e) {
        parsed = null;
        impBtn.disabled = true;
        prev.style.display = 'none';
        st.className = 'status err';
        st.textContent = '解析失败：' + e.message;
      }
    };
    const readFile = (f) => {
      if (!f) return;
      const fr = new FileReader();
      fr.onload = () => {
        ta.value = String(fr.result || '');
        doParse(ta.value);
      };
      fr.readAsText(f, 'utf-8');
    };
    drop.addEventListener('click', () => file.click());
    file.addEventListener('change', () => readFile(file.files && file.files[0]));
    drop.addEventListener('dragover', (e) => {
      e.preventDefault();
      drop.classList.add('hot');
    });
    drop.addEventListener('dragleave', () => drop.classList.remove('hot'));
    drop.addEventListener('drop', (e) => {
      e.preventDefault();
      drop.classList.remove('hot');
      readFile(e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]);
    });
    parseBtn.addEventListener('click', () => doParse(ta.value));
    impBtn.addEventListener('click', async () => {
      if (!parsed) return;
      impBtn.disabled = true;
      const r = applyImport(parsed, modeSel.value);
      st.textContent = `已写入 ${r.added} 位 UP，正在补全资料…`;
      const need = r.touched.filter((u) => members[u] && !members[u].f);
      if (need.length) await hydrateUids(need, (done, total) => (st.textContent = `正在补全资料 ${done}/${total}…`));
      st.textContent = `导入完成：新建 ${r.createdGroups} 个分组，写入 ${r.added} 位 UP${
        r.skipped ? `，跳过 ${r.skipped} 位已有成员` : ''
      }`;
      renderBody();
      refreshMeta();
      scanPage();
      impBtn.disabled = false;
    });

    sheetEl.appendChild(el('div', 'sfoot'));
    const sfoot = sheetEl.lastChild;
    sfoot.appendChild(el('span', 'sp'));
    const closeBtn = el('button', 'btn', '关闭');
    closeBtn.addEventListener('click', closeSheet);
    sfoot.appendChild(closeBtn);
    setTimeout(() => drop.focus(), 20);
  }

  /** 合并分组：勾选多个分组，成员取并集，可重命名，其余分组删除 */
  function buildMergeSheet() {
    const head = el('div', 'sh');
    head.appendChild(el('h3', '', '合并分组'));
    const x = el('button', 'x', '✕');
    x.addEventListener('click', closeSheet);
    head.appendChild(x);
    sheetEl.appendChild(head);

    const body = el('div', 'sb');
    sheetEl.appendChild(body);
    body.appendChild(
      el(
        'p',
        'hint',
        '勾选两个或以上的分组。合并后成员取并集；分组顺序、标记与颜色沿用列表里最靠前的那个，其余分组删除，成员不会丢。'
      )
    );

    const list = el('div', 'res');
    body.appendChild(list);

    const nameRow = el('div', 'fieldrow');
    nameRow.style.marginTop = '12px';
    nameRow.appendChild(el('span', '', '合并后名称'));
    const nameIn = document.createElement('input');
    nameIn.type = 'text';
    nameIn.maxLength = 40;
    nameRow.appendChild(nameIn);
    body.appendChild(nameRow);

    const st = el('div', 'status');
    body.appendChild(st);

    const foot = el('div', 'sfoot');
    foot.appendChild(el('span', 'sp'));
    const cancel = el('button', 'btn', '取消');
    cancel.addEventListener('click', closeSheet);
    const go = el('button', 'btn pri', '合并');
    go.disabled = true;
    foot.appendChild(cancel);
    foot.appendChild(go);
    sheetEl.appendChild(foot);

    const picked = new Set();
    let nameDirty = false;

    const unionCount = () => {
      const seen = new Set();
      for (const g of groups) {
        if (!picked.has(g.id)) continue;
        for (const [uid] of membersOf(g.id)) seen.add(uid);
      }
      return seen.size;
    };

    const sync = () => {
      const n = picked.size;
      const first = groups.find((g) => picked.has(g.id));
      if (!nameDirty) nameIn.value = first ? first.name : '';
      nameIn.placeholder = first ? first.name : '留空则沿用第一个分组的名称';
      go.disabled = n < 2;
      st.className = 'status';
      st.textContent =
        n < 2 ? `已选 ${n} 个，再选 ${2 - n} 个即可合并` : `将合并 ${n} 个分组，去重后共 ${unionCount()} 位 UP`;
    };

    for (const g of groups) {
      const row = el('label', 'row');
      row.style.cursor = 'pointer';
      const cb = document.createElement('input');
      cb.type = 'checkbox';
      row.appendChild(cb);
      const chip = el('span', 'chip');
      const b = badgeOf(g);
      chip.style.background = b.color;
      chip.textContent = b.mark || b.text.slice(0, 2);
      row.appendChild(chip);
      row.appendChild(el('span', 'n', g.name));
      row.appendChild(el('span', 'sp'));
      row.appendChild(el('span', 'f', `${membersOf(g.id).length} 人`));
      cb.addEventListener('change', () => {
        if (cb.checked) picked.add(g.id);
        else picked.delete(g.id);
        sync();
      });
      list.appendChild(row);
    }

    nameIn.addEventListener('input', () => {
      nameDirty = true;
    });

    go.addEventListener('click', async () => {
      const ids = [...picked];
      const first = groups.find((g) => picked.has(g.id));
      const finalName = (nameIn.value.trim() || (first && first.name) || '合并分组').slice(0, 40);
      const ok = await confirmBox(
        `把 ${ids.length} 个分组合并为「${finalName}」？其余 ${
          ids.length - 1
        } 个分组会被删除，成员全部保留，也不影响他们在别的分组里的归属。`,
        '合并'
      );
      if (!ok) return;
      const r = mergeGroups(ids, finalName);
      if (!r.ok) {
        toast(r.reason, true);
        return;
      }
      for (const id of ids) if (id !== r.keep.id) view.open.delete(id);
      closeSheet();
      renderBody();
      refreshMeta();
      scanPage();
      toast(`已合并 ${r.groups} 个分组，${r.moved} 位 UP 的分组关系已归并`);
    });

    sync();
  }

  /* ============================================================
   * 10. 入口
   * ============================================================ */
  /**
   * 用内置名单把本地成员的空字段补上（只补空值，不动用户改过的内容）。
   * 场景：内置名单后来加了头像/昵称，但用户是早前装的，本地记录里没有这些字段。
   */
  function healMemberInfo() {
    const roster = DEFAULT_ROSTER;
    if (!roster || !Array.isArray(roster.groups)) return 0;
    let n = 0;
    for (const g of roster.groups) {
      for (const src of g.members || []) {
        const m = members[String(src.uid)];
        if (!m) continue;
        if (!m.f && src.face) {
          m.f = String(src.face);
          n++;
        }
        if (!m.n && src.name) {
          m.n = String(src.name);
          n++;
        }
      }
    }
    if (n) saveMembers();
    return n;
  }

  function boot() {
    // 这里刻意不预置任何分组：装完就是空名单，自带名单只在「⋯ → 导入测试分组」时写入
    healMemberInfo(); // 自带名单更新过资料时，把本地缺的头像/昵称补上
    rebuildNameIndex();

    if (typeof GM_registerMenuCommand === 'function') {
      GM_registerMenuCommand('⚙ 打开设置面板', () => {
        if (isBili()) openPanel();
        else if (typeof GM_openInTab === 'function') GM_openInTab('https://www.bilibili.com/#bnp-open', { active: true, insert: true });
      });
      GM_registerMenuCommand('＋ 把当前 UP 加入分组', () => {
        if (!isBili()) return;
        openPanel();
        openSheet('add', { uid: currentSpaceUid() || '' });
      });
      GM_registerMenuCommand(settings.enabled ? '⏻ 暂时停用铭牌' : '⏻ 启用铭牌', () => {
        settings.enabled = !settings.enabled;
        saveSettings();
        if (settings.enabled) {
          mount(pageKind());
        } else {
          stopScanWindow();
          dropAll();
        }
      });
    }

    // 由菜单从别的页面跳过来的宿主页
    if (location.hash === '#bnp-open') {
      try {
        history.replaceState(null, '', location.pathname + location.search);
      } catch (e) {}
      start();
      openPanel();
      return;
    }

    const kind = pageKind();
    if (!kind) return;
    start();
  }

  // 诊断 / 测试钩子：只看不改，面板里做的事都能在这里复现
  window.__bnp = {
    get groups() {
      return groups;
    },
    get members() {
      return members;
    },
    get settings() {
      return settings;
    },
    get targets() {
      const cards = (t) => (t.cards || []).filter((c) => c.classList.contains('on')).map((c) => c.textContent.trim());
      return [...targets.values()].map((t) => ({
        uid: t.uid,
        on: cards(t).length > 0,
        cards: cards(t),
        float: t.float,
        el: t.nameEl.tagName,
        cls: String(t.nameEl.className || '').slice(0, 60),
        txt: (t.nameEl.textContent || '').trim().slice(0, 30),
      }));
    },
    groupsOf: (uid) => groupsOfMember(uid).map((g) => g.name),
    reorder: (dragId, targetId, after) => reorderGroup(dragId, targetId, after),
    addToGroup: (uid, gid) => addMember(uid, gid),
    removeFromGroup: (uid, gid) => removeFromGroup(uid, gid),
    get scanned() {
      return scannedCount;
    },
    get pageKind() {
      return pageKind();
    },
    open: openPanel,
    close: closePanel,
    scan: () => scanPage(),
    place: () => placeAll(),
    remount: () => {
      dropAll();
      mount(pageKind());
      return activeKind;
    },
    rescan: () => {
      dropAll();
      return scanPage();
    },
    parse: (text) => parseImport(text),
    import(text, mode = 'merge') {
      const r = applyImport(parseImport(text), mode);
      saveGroups();
      saveMembers();
      return r;
    },
    exportJson() {
      return JSON.stringify(buildExport());
    },
    createGroup,
    addMember,
    removeMember,
    moveMember,
    hydrate: hydrateUids,
    search: (kw) => searchUsers(kw),
    card: (uid) => fetchCard(uid),
    restoreDefaults,
    defaults: () => ({
      groups: DEFAULT_ROSTER ? DEFAULT_ROSTER.groups.map((g) => ({ name: g.name, n: g.members.length })) : [],
      generatedAt: (DEFAULT_ROSTER && DEFAULT_ROSTER.generatedAt) || '',
    }),
    reset: () => {
      settings = loadSettings();
      groups = loadGroups();
      members = loadMembers();
      rebuildNameIndex();
    },
  };

  boot();
})();
