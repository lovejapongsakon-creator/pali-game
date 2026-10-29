/* หอไตรนามศัพท์ รุ่น 5 — ส่วนที่เปลี่ยนจากรุ่น 4
 * โหลดต่อจากสคริปต์หลักใน index.html ฟังก์ชันที่ประกาศซ้ำในไฟล์นี้ใช้แทนของเดิม
 *  - ด่านใหญ่ละ 5 ด่านย่อย ด่านย่อยละ 10 ข้อ ต้องถูก ≥ เกณฑ์ (90%) จึงเปิดด่านย่อยถัดไป
 *  - บอสเป็นด่านย่อยที่ 5 ของด่าน ๒ (10 ข้อ ตีให้ยักษ์หมดพลัง)
 *  - สอบปลายภาค (FIN) คู่กับสอบกลางภาค (MID)
 *  - ใบเกียรติบัตรแบบทางการ มีลายเซ็นผู้สอนที่อัปโหลดจากแผงครู
 */
var EXN = { MID: 'กลางภาค', FIN: 'ปลายภาค' };
Object.assign(REASON, {
  EXAM_LOCKED: 'ยังไม่ถึงวันสอบ', EXAM_CLOSED: 'ปิดสอบแล้ว', NEED_PREV: 'ต้องผ่านด่านย่อยก่อนหน้าก่อน',
  NEED_STEPS: 'ต้องผ่านด่าน ๒ พิชิต ให้ครบ ๕ ด่านย่อยก่อน'
});
['s1', 's2', 's3', 's4', 't1', 't2', 't3'].forEach(k => delete STEP_DEF[k]);
Object.assign(STEP_DEF, {
  s1: { name: 'อุ่นเครื่อง', n: 10, stage: 1, desc: 'ทบทวนพื้นฐานจากหนังสือ (ครั้งแรกบันทึกเป็นคะแนนก่อนเรียน)' },
  s2: { name: 'ฝึก ก', n: 10, stage: 1 },
  s3: { name: 'ฝึก ข', n: 10, stage: 1 },
  s4: { name: 'คลังศัพท์', n: 10, stage: 1, desc: 'จำความหมายคำบาลีของหน่วยนี้' },
  s5: { name: 'จับผิด AI', n: 10, stage: 1, desc: 'นกแก้วเอไอตอบมา ตรวจว่าถูกหรือผิด' },
  t1: { name: 'ทบทวนคำที่ใกล้ลืม', n: 10, stage: 2, desc: 'คำที่เคยพลาดหรือใกล้ลืม' },
  t2: { name: 'ฝึก ค', n: 10, stage: 2 },
  t3: { name: 'ฝึก ง', n: 10, stage: 2 },
  t4: { name: 'ผสมข้ามหน่วย', n: 10, stage: 2, desc: 'หน่วยนี้ผสมกับหน่วยก่อน ๆ' },
  t5: { name: 'บอสยักษ์ลืมศัพท์', n: 10, stage: 2, desc: 'ตอบถูกให้ครบเกณฑ์ ยักษ์จะหมดพลัง' }
});
Object.assign(GAME_INFO, {
  vocab: { name: 'คลังศัพท์', how: 'เลือกคำแปลให้ตรงกับคำบาลี', ico: '@scroll' },
  apply: { name: 'ภารกิจรวมพลัง', how: 'โจทย์หลายแบบจากหน่วยนี้ ยากขึ้นอีกขั้น', ico: '@prasat' }
});
Object.assign(GAME_CODE, { 'คลังศัพท์': 'vocab', 'รวมพลัง': 'apply' });

/* กลุ่มคำสำหรับเกมกวาดลานของหน่วย 14, 19, 20 */
SORT_GROUPS.push('ปกติสังขยา', 'ปูรณสังขยา', 'นิบาตบอกอาลปนะ', 'นิบาตบอกกาล', 'นิบาตบอกที่', 'นิบาตบอกอุปมาอุปไมย', 'นิบาตบอกปฏิเสธ',
  'นิบาตบอกความได้ยินเล่าลือ', 'นิบาตบอกปริกัป', 'นิบาตบอกความถาม', 'นิบาตบอกความรับ', 'นิบาตบอกความเตือน',
  'ลง โต ปัจจัย', 'เครื่องหมายสัตตมี (บอกที่)', 'เครื่องหมายสัตตมีลงในกาล', 'กิริยากิตก์ที่เป็นอัพยยะ');
/** กวาดลาน: ตะกร้าไม่เกิน 4 ใบต่อข้อ (ตะกร้าที่ถูก + กลุ่มอื่นในหน่วยเดียวกัน) เพื่อไม่ให้ล้นจอเมื่อหน่วยมีหลายกลุ่ม */
function genSort(u, n) {
  const v = PK(u).vocab.filter(x => SORT_GROUPS.includes(x[2])), groups = SORT_GROUPS.filter(g => v.some(x => x[2] === g));
  if (groups.length < 2) return [];
  const seen = new Set();
  return shuffle(v).filter(x => !seen.has(x[0]) && seen.add(x[0])).slice(0, n).map(x => {
    const pickB = groups.length <= 4 ? groups : [x[2]].concat(shuffle(groups.filter(g => g !== x[2])).slice(0, 3)).sort((a, b) => groups.indexOf(a) - groups.indexOf(b));
    return mcq({ key: 'v:' + u + ':' + x[0], u, skin: 'leaf', fixed: true, prompt: 'ใบลานใบนี้ควรอยู่ตะกร้าใด', word: x[0], sub: x[1] ? '(' + x[1] + ')' : '',
      choices: pickB, ans: [pickB.indexOf(x[2])], explain: `<span class="pali">${esc(x[0])}</span>${x[1] ? ' (' + esc(x[1]) + ')' : ''} เป็น <b>${esc(x[2])}</b>`, kind: 'กวาดลาน' });
  });
}

const stepN = () => APP.cfg.stepN || 10;
const needOf = n => Math.ceil(n * (APP.cfg.passPct || 90) / 100 - 1e-9);

/* ---------- ด่านย่อยและตัวสร้างโจทย์ (โจทย์ทุกข้อมาจากเนื้อหาในแท็บของชีต ซึ่งคัดจากหนังสือ) ---------- */
function stepGame(u, step) {
  const g = (unitOf(u) || {}).games || [];
  if (step === 's2') return GAME_CODE[g[0]] || 'q';
  if (step === 's3') return GAME_CODE[g[1]] || 'q';
  if (step === 's4') return 'vocab';
  if (step === 's5') return 'ai';
  if (step === 't2') return GAME_CODE[g[2]] || 'mix';
  if (step === 't3') return GAME_CODE[g[3]] || 'apply';
  return 'q';
}
function stepTitle(u, step) {
  const d = STEP_DEF[step]; if (!d) return step;
  if (['s2', 's3', 't2', 't3'].includes(step)) { const gi = GAME_INFO[stepGame(u, step)]; return d.name + ' · ' + (gi ? gi.name : ''); }
  return d.name;
}
function stepDesc(u, step) {
  const d = STEP_DEF[step], gi = GAME_INFO[stepGame(u, step)], n = step === 'rp' ? 6 : step === 'dr' ? 5 : stepN();
  const base = d.desc || (gi ? gi.how : '');
  if (step === 'rp' || step === 'dr') return d.desc;
  return base + ' · ' + thn(n) + ' ข้อ · ผ่านเมื่อถูก ' + thn(needOf(n)) + ' ข้อ';
}
/** เติมให้ครบ n ข้อด้วยข้อฝึกในคลังข้อสอบของหน่วยเดียวกัน */
function fillTo(u, items, n) {
  let g = 0;
  while (countOf(items) < n && g++ < 40) {
    const it = genQ(u, 1)[0]; if (!it) break;
    if (!items.some(x => x.key === it.key) || g > 25) items.push(it);
  }
  return items;
}
/** จับผิด AI: ใช้ข้อในแท็บจับผิดAI ก่อน ถ้าไม่พอ ให้นกแก้วตอบข้อฝึกในคลัง (ถูกบ้างผิดบ้าง) */
function genAI10(u, n) {
  const out = shuffle(PK(u).ai).map(x => ({ t: 'ai', u, key: 'a:' + x.id, q: x.q, say: x.say, ok: x.ok, right: x.right, opts: shuffle([x.right].concat(x.wrong)), explain: x.e }));
  shuffle(PK(u).q).forEach(q => {
    if (out.length >= n) return;
    const right = q.c[q.a], wrongs = q.c.filter((c, i) => i !== q.a && c), ok = Math.random() < 0.5 ? 1 : 0;
    out.push({ t: 'ai', u, key: 'q:' + q.id, q: q.q.replace(/<[^>]+>/g, ''), say: ok ? right : pick(wrongs), ok, right, opts: shuffle([right].concat(shuffle(wrongs).slice(0, 2))), explain: q.e || ('คำตอบที่ถูกคือ ' + right) });
  });
  return shuffle(out.slice(0, n));
}
/** ภารกิจรวมพลัง (ฝึก ง): สลับเกมหลายแบบเท่าที่หน่วยนี้มีเนื้อหารองรับ */
function genApply(u, n) {
  const codes = shuffle(['sort', 'pair', 'bell', 'table', 'order', 'build', 'vocab']), out = [];
  const gen = c => c === 'vocab' ? genVocabMeaning(u, 1) : ({ sort: genSort, pair: genPair, bell: genBell, table: genTable, order: genOrder, build: genBuild })[c](u, 1);
  const ok = codes.filter(c => { try { return gen(c).length > 0; } catch (e) { return false; } });
  let g = 0;
  while (out.length < n && ok.length && g++ < n * 6) {
    const it = gen(ok[out.length % ok.length])[0];
    if (it && it.t !== 'match' && !out.some(x => x.key === it.key)) out.push(it);
  }
  return shuffle(fillTo(u, out, n));
}
/** ตัดข้อที่ซ้ำกันในด่านย่อยเดียว แล้วเติมให้ครบ */
function genStep(u, step) {
  const items = genStepRaw(u, step), seen = new Set();
  const uniqItems = items.filter(x => x.t === 'match' || (!seen.has(x.key) && seen.add(x.key)));
  return uniqItems.length === items.length || step === 'rp' || step === 'dr' ? items : fillTo(u, uniqItems, countOf(items));
}
function genStepRaw(u, step) {
  const N = stepN();
  if (step === 's1') return fillTo(u, genQ(u, N), N).map(x => Object.assign(x, { kind: 'อุ่นเครื่อง' }));
  if (step === 's2' || step === 's3') return genFor(stepGame(u, step), u, N);
  if (step === 's4') return fillTo(u, genVocabMeaning(u, N), N);
  if (step === 's5') return genAI10(u, N);
  if (step === 't1') return fillTo(u, genReview(u, N), N);
  if (step === 'dr') return genReview(u, 5);
  if (step === 't2') return genMix(u, N, stepGame(u, 't2'));
  if (step === 't3') { const c = stepGame(u, 't3'); return c === 'apply' ? genApply(u, N) : genFor(c, u, N); }
  if (step === 't4') return genMix(u, N, 'mix');
  if (step === 't5') { const out = []; let g = 0; while (out.length < N && g++ < N * 6) { const it = bossItem(u); if (it && !out.some(x => x.key === it.key)) out.push(it); } return fillTo(u, out, N); }
  if (step === 'rp') return genRepair(u);
  return [];
}

/* ---------- การเล่นในด่านย่อย ---------- */
function startStep(u, step) {
  const items = genStep(u, step);
  if (!items.length) { toast('ยังไม่มีเนื้อหาสำหรับด่านนี้ในชีต แจ้งครูได้เลย'); return; }
  R = { u, step, items, i: 0, sub: 0, c: 0, n: countOf(items), missed: [], hit: [], streak: 0, best: 0, asked: 0, locked: false, boss: step === 't5' };
  $('#play-title').innerHTML = `ชั้น ${thn(u)} · ${esc(stepTitle(u, step))}`;
  show('scr-play'); renderItem();
}
function curItem() { return R.items[R.i]; }
function progressBar() {
  const done = Math.min(R.n, R.doneCount || 0), free = R.step === 'rp' || R.step === 'dr';
  $('#play-bar').style.width = done / R.n * 100 + '%';
  $('#play-sub').textContent = `ข้อ ${thn(Math.min(R.n, done + 1))}/${thn(R.n)} · ถูก ${thn(R.c)}` + (free ? '' : ` · ต้องถูก ${thn(needOf(R.n))}`) + (R.streak >= 3 ? ` · คอมโบ ×${thn(R.streak)}` : '');
}
function sceneHTML(extra) {
  const x = unitOf(R.u) || {};
  const boss = R.boss ? `<div>${bossSVG(R.lastWrong ? 'win' : R.c ? 'hurt' : 'idle')}<div class="boss-hp">${Array.from({ length: R.n }, (_, k) => `<i class="${k < R.c ? 'hit' : ''}"></i>`).join('')}</div></div>` : '';
  return `<div class="scene">${sceneBG(x.scene, R.boss)}${boss}<div style="margin-left:auto">${extra || nongSVG(R.mood || 'think', 92)}</div></div>`;
}
function renderItem() {
  const it = curItem(); R.locked = false; R.mood = 'think';
  if (!it) return finishStep();
  progressBar();
  const host = $('#play-stage');
  host.innerHTML = it.t === 'mcq' ? renderMCQ(it) : it.t === 'match' ? renderMatch(it) : it.t === 'order' ? renderOrder(it) : it.t === 'build' ? renderBuild(it) : renderAI(it);
  if (R.boss && !host.querySelector('.scene')) host.insertAdjacentHTML('afterbegin', sceneHTML());   // ด่านบอสต้องเห็นยักษ์และหลอดพลังทุกข้อ
  bindItem(it); fitText(host);
}
function markResult(it, good, key) {
  R.doneCount = (R.doneCount || 0) + 1;
  if (good) { R.c++; R.streak++; R.best = Math.max(R.best, R.streak); } else R.streak = 0;
  R.lastWrong = !good;
  const k = key || it.key; if (k && /^(q|t|v):/.test(k)) (good ? R.hit : R.missed).push(k);
  if (good) SFX.ok(); else SFX.bad();
  if (good && R.streak > 0 && R.streak % 5 === 0) { SFX.pass(); toast(`คอมโบ ${thn(R.streak)} ข้อติด เก่งมาก`); }
}
function feedback(good, body, hint) {
  const fb = $('#fb'); fb.className = good ? 'on' : 'on bad';
  $('#fb-h').innerHTML = good ? ui('check', 26) + (R.boss ? 'ถูก! ยักษ์เจ็บแล้ว' : pick(['ถูกต้อง', 'เยี่ยมมาก', 'แม่นยำ', 'ถูกต้องตามหนังสือ']))
    : ui('warn', 26) + (R.boss ? 'พลาด ยักษ์หัวเราะ' : 'ยังไม่ถูก ลองจำไว้นะ');
  $('#fb-b').innerHTML = body || '';
  $('#fb-coach').innerHTML = !good && hint ? `${elderSVG(56)}<div class="bubble"><b class="nm">พระอาจารย์</b>${safeHTML(hint)}</div>` : '';
  R.mood = good ? 'happy' : 'sad';
  const nx = $('#fb-next'); nx.textContent = 'ไปต่อ';
  nx.onclick = () => { fb.className = ''; R.i++; renderItem(); };
  setTimeout(() => nx.focus(), 50);
}
function starsOf(c, n) { return c >= n ? 3 : c >= needOf(n) ? 2 : c >= n / 2 ? 1 : 0; }
function finishStep() {
  const u = R.u, step = R.step, n = R.n, c = R.c, free = step === 'rp' || step === 'dr', need = needOf(n), pass = free || c >= need;
  const us = uStateOf(u), prev = us.s[step] || {}, was1 = stageDoneLocal(us, 1), was2 = stageDoneLocal(us, 2);
  if (step === 'rp') us.s.rp = { p: 1, after: us.att.length };
  else if (step !== 'dr') us.s[step] = { c: Math.max(prev.c || 0, c), n, p: prev.p || pass ? 1 : 0 };
  if (S1.includes(step) || S2.includes(step)) us.v5 = 1;
  if (step === 's1' && us.pre === undefined) us.pre = c;
  if (!was1 && stageDoneLocal(us, 1)) us.d1 = 'local';
  const today = dayNum(APP.today); R.missed.forEach(k => APP.state.lb[k] = [1, today + 1]);
  queueSave({ sid: APP.sid, ev: { u, step, c, n, missed: uniq(R.missed), hit: uniq(R.hit) } });
  const s1Now = !was1 && stageDoneLocal(us, 1), s2Now = !was2 && stageDoneLocal(us, 2), nextStep = nextStepOf(u);
  if (pass) { SFX.pass(); confetti(step === 't5' || s1Now || s2Now ? 130 : 50); }
  const st = free ? 0 : starsOf(c, n);
  const stars = free ? '' : `<div class="stars" aria-label="${st} ดาว">${[0, 1, 2].map(i => `<span style="color:${i < st ? 'var(--gold)' : '#dde3ea'}">${ui('star', 34)}</span>`).join('')}</div>`;
  const title = step === 'dr' ? 'ทบทวนประจำวันเสร็จแล้ว' : pass ? (step === 't5' ? 'ชนะยักษ์ลืมศัพท์แล้ว' : 'ผ่านด่านย่อย ' + STEP_DEF[step].name) : 'ยังไม่ถึงเกณฑ์';
  let msg = '';
  if (!pass) msg = `<div class="warn">ต้องถูกอย่างน้อย ${thn(need)} จาก ${thn(n)} ข้อ (${thn(APP.cfg.passPct || 90)}%) เล่นซ้ำได้ไม่จำกัด ไม่กระทบคะแนน โจทย์จะสุ่มใหม่ทุกครั้ง</div>`;
  else if (s1Now) msg = '<div class="okbox">ผ่านด่าน ๑ ฝึกฝน ครบ ๕ ด่านย่อยแล้ว คาบหน้าพบกันที่ด่าน ๒ พิชิต</div>';
  else if (s2Now) msg = '<div class="okbox">ผ่านด่าน ๒ พิชิต ครบแล้ว เข้าด่านวัดผลเพื่อเก็บคะแนนได้เลย (สอบได้ ๒ ครั้ง นับครั้งที่ได้คะแนนสูงสุด)</div>';
  const goNext = pass && nextStep && !['test', 'done'].includes(nextStep.step) && !s1Now && step !== 'dr';
  const buttons = step === 'dr' ? [{ t: 'กลับหอไตร', v: 'hub' }]
    : !pass ? [{ t: 'กลับหน้าชั้น', v: 'hub', cls: 'ghost' }, { t: 'ลองอีกครั้ง', v: 'again' }]
      : goNext ? [{ t: 'กลับหน้าชั้น', v: 'hub', cls: 'ghost' }, { t: 'ด่านย่อยถัดไป', v: 'next' }]
        : [{ t: s2Now ? 'ไปด่านวัดผล' : 'กลับหน้าชั้น', v: 'hub' }];
  modal({ title, mood: pass ? 'happy' : 'sad', pic: step === 't5' && pass ? bossSVG('hurt') : undefined,
    html: `<p class="bigscore center">${thn(c)}<span class="muted" style="font-size:22px">/${thn(n)}</span></p>${stars}${msg}`, buttons })
    .then(v => { if (v === 'again') startStep(u, step); else if (v === 'next' && nextStep) startStep(u, nextStep.step); else if (step === 'dr') openTower(); else openUnit(u); });
}

/* ---------- หอไตร: ชั้นสอบกลางภาค/ปลายภาค ---------- */
function exState(set) { const k = set === 'FIN' ? 'fin' : 'mid'; return APP.state[k] && APP.state[k].att && APP.state[k].att.length ? APP.state[k] : null; }
function examFloor(set) {
  const E = set === 'FIN' ? APP.fin : APP.mid, cf = APP.cfg, done = exState(set), st = E.status, nm = EXN[set];
  const N = set === 'FIN' ? cf.finN : cf.midN, P = set === 'FIN' ? cf.finPts : cf.midPts;
  const chip = done ? `<span class="chip done">${ui('check', 14)}สอบแล้ว ${thn(done.att[0].pts)}/${thn(P)}</span>`
    : st === 'open' ? `<span class="chip open">เปิดสอบถึง ${thDate(E.close, { noy: true })}</span>`
      : st === 'locked' ? `<span class="chip lock">${ui('lock', 14)}เปิด ${thDate(E.open, { wd: true })}</span>` : '<span class="chip lock">ปิดสอบแล้ว</span>';
  return `<div class="floor exam ${st !== 'open' || done ? 'locked' : ''}" data-ex="${set}" role="button" tabindex="0"><div class="fl-no"><small>สอบ</small><b>${ui('trophy', 22)}</b></div>
    <div class="fl-body"><div class="fl-t fit" data-min="12">สอบ${nm} · ${thn(N)} ข้อ ${thn(P)} คะแนน</div><div class="fl-m">${chip}</div></div></div>`;
}
function towerFloors(floorOf) {
  const L = APP.units.slice().sort((a, b) => b.u - a.u), midTop = Math.max(...((APP.mid && APP.mid.units) || [10]));
  const showMid = APP.mid && APP.mid.status !== 'none', showFin = APP.fin && APP.fin.status !== 'none';
  let h = showFin ? examFloor('FIN') : '', midDone = !showMid;
  L.forEach(x => { if (!midDone && x.u <= midTop) { h += examFloor('MID'); midDone = true; } h += floorOf(x); });
  if (!midDone) h += examFloor('MID');
  return h;
}
function openExam(set) {
  const E = set === 'FIN' ? APP.fin : APP.mid;
  if (exState(set)) { toast('สอบ' + EXN[set] + 'แล้ว'); return; }
  if (E.status !== 'open') { toast(E.status === 'locked' ? 'สอบ' + EXN[set] + 'เปิดวัน' + thDate(E.open, { wd: true }) : 'ปิดสอบ' + EXN[set] + 'แล้ว'); return; }
  startScored(set);
}
function openMid() { openExam('MID'); }
async function startScored(set) {
  const cf = APP.cfg, isEx = !!EXN[set], u = isEx ? 0 : +set.slice(1), x = unitOf(u), us = isEx ? null : uStateOf(u), E = set === 'FIN' ? APP.fin : APP.mid;
  const N = set === 'FIN' ? cf.finN : cf.midN, M = set === 'FIN' ? cf.finMin : cf.midMin, P = set === 'FIN' ? cf.finPts : cf.midPts;
  let room = '';
  const rules = isEx ? `<ul><li>${thn(N)} ข้อ เวลารวม ${thn(M)} นาที คะแนนเต็ม ${thn(P)}</li><li>สอบได้ <b>ครั้งเดียว</b> ตอบแล้วย้อนกลับไม่ได้</li><li>ถ้าเน็ตหลุด เข้าใหม่จะทำต่อจากข้อเดิม คำตอบไม่หาย</li></ul>${E.needRoom ? '<div class="field"><label>รหัสห้องสอบ (ครูประกาศหน้าห้อง)</label><input id="room" autocomplete="off"></div>' : ''}`
    : `<ul><li>${thn(cf.testN)} ข้อ ข้อละ ${thn(cf.testSec)} วินาที</li><li>ตอบแล้วย้อนกลับไม่ได้ ไม่เฉลยระหว่างสอบ</li><li>ครั้งที่ ${thn(us.att.length + 1)} จาก ${thn(maxAttempts())} นับครั้งที่ได้คะแนนสูงสุด</li>${x.status === 'late' ? `<li style="color:var(--brick)">ส่งช้า: คะแนนครั้งนี้ × ${thn(cf.lateMult)}</li>` : ''}</ul>`;
  const go = await modal({ title: isEx ? 'สอบ' + EXN[set] : `ด่านวัดผล ชั้น ${thn(u)}`, mood: 'read', html: rules + '<p class="small muted">ปิดหนังสือ ตั้งใจทำด้วยตนเอง</p>',
    buttons: [{ t: 'ยังก่อน', v: false, cls: 'ghost' }, { t: 'เริ่มสอบ', v: () => { room = ($('#room') || {}).value || ''; return true; } }] });
  if (!go) return;
  try {
    const r = await rpcRetry('startTest', [APP.sid, set, room], 3);
    if (!r || !r.ok) { modal({ title: 'ยังเข้าสอบไม่ได้', mood: 'sad', html: `<p>${esc(REASON[r && r.reason] || r && r.reason || 'ไม่ทราบสาเหตุ')}</p>` }); return; }
    T = { set, u, sess: r.sess, idx: r.sess.idx, sel: -1, off: r.sess.now - Date.now(), busy: false };
    if (r.resumed) toast('ทำต่อจากข้อที่ ' + thn(T.idx + 1));
    show('scr-test'); renderTest();
  } catch (e) { modal({ title: 'เชื่อมต่อไม่สำเร็จ', mood: 'sad', html: '<p>ลองอีกครั้ง คำตอบที่ส่งแล้วจะไม่หาย</p>' }); }
}
async function submitTest() {
  clearInterval(T.tick);
  $('#test-body').innerHTML = '<div class="card center"><div class="spin"></div><p>กำลังส่งคำตอบและตรวจคะแนน…</p></div>';
  let r = null;
  for (let k = 0; k < 6 && !(r && r.ok); k++) { try { r = await rpcRetry('finishTest', [APP.sid, T.set], 2); } catch (e) { await sleep(2500); } }
  if (!r || !r.ok) {
    $('#test-body').innerHTML = `<div class="card center"><p>ส่งคำตอบไม่สำเร็จ (${esc(r && r.reason || 'เน็ต')}) คำตอบยังอยู่ในระบบ</p><button class="btn" id="t-retry">ส่งอีกครั้ง</button></div>`;
    $('#t-retry').onclick = submitTest; return;
  }
  if (EXN[T.set]) { const k = T.set === 'FIN' ? 'fin' : 'mid'; APP.state[k] = APP.state[k] || { att: [] }; APP.state[k].att = APP.state[k].att || []; APP.state[k].att.push({ raw: r.raw, n: r.n, pts: r.pts }); }
  else uStateOf(T.u).att.push({ raw: r.raw, n: r.n, pts: r.pts, late: r.late, mult: r.mult });
  APP.certs = r.certs || APP.certs;
  showResult(r);
}
function showResult(r) {
  const isEx = !!EXN[r.set], u = isEx ? 0 : +r.set.slice(1), cf = APP.cfg;
  const cert = isEx ? APP.certs.find(c => c.exam === r.set) : APP.certs.find(c => c.u === u);
  const tier = isEx ? '' : tierOf(Math.max(...uStateOf(u).att.map(a => a.raw)), r.n), full = isEx ? (r.set === 'FIN' ? cf.finPts : cf.midPts) : cf.unitPts;
  SFX.pass(); confetti(r.raw / r.n >= .7 ? 120 : 40);
  $('#result-body').innerHTML = `<div class="card result-hero">${nongSVG(r.raw / r.n >= .7 ? 'wow' : 'happy', 110)}
    <h1>${isEx ? 'ส่งข้อสอบ' + EXN[r.set] + 'แล้ว' : 'ส่งด่านวัดผล ชั้น ' + thn(u) + ' แล้ว'}</h1>
    <div class="bigscore">${thn(r.raw)}<span class="muted" style="font-size:24px">/${thn(r.n)}</span></div>
    <p>ได้ <b>${thn(r.pts)}</b> จาก ${thn(full)} คะแนน${r.late ? ` <span class="chip late">ส่งช้า ×${thn(r.mult)}</span>` : ''}${!isEx && r.att > 1 ? `<br>คะแนนที่บันทึก (ครั้งที่ได้สูงสุด): <b>${thn(r.best)}</b>` : ''}</p>
    ${!isEx ? `<div class="row" style="justify-content:center">${medalSVG(tier, 44)}<b>เกียรติบัตรระดับ${tier}</b></div>` : ''}</div>
    ${r.wrong && r.wrong.length && !isEx ? `<div class="card"><h3>${ui('book', 18)} เรื่องที่ควรทบทวนในหนังสือ</h3><ul class="wrong-list">${r.wrong.map(q => `<li>${safeHTML(q)}</li>`).join('')}</ul><p class="small muted">ไม่เฉลยคำตอบ เพื่อให้ฝึกจริงก่อนสอบครั้งต่อไป</p></div>` : ''}
    ${!isEx && r.attLeft ? `<div class="info">ยังสอบได้อีก ${thn(r.attLeft)} ครั้ง หลังฝึกซ้ำจุดพลาด ๖ ข้อ</div>` : ''}
    <div class="row wrapf">${cert ? `<button class="btn green grow" id="r-cert">${ui('medal', 18)} ดูใบเกียรติบัตร</button>` : ''}<button class="btn ghost grow" id="r-back">${isEx ? 'กลับหอไตร' : 'กลับหน้าชั้น'}</button></div>`;
  $('#r-back').onclick = () => isEx ? openTower() : openUnit(u);
  const rc = $('#r-cert'); if (rc) rc.onclick = () => Cert.view(cert);
  show('scr-result');
}
function openCerts() {
  const tiles = APP.units.map(x => {
    const c = APP.certs.find(y => y.u === x.u);
    return c ? `<div class="cert-tile" data-c="${x.u}">${medalSVG(c.tier, 42)}<b>ชั้น ${thn(x.u)}</b><span class="chip ${tierCls(c.tier)}">ระดับ${esc(c.tier)}</span></div>`
      : `<div class="cert-tile none">${guardSVG(x.u, 40)}<b>ชั้น ${thn(x.u)}</b><span class="small muted">ยังไม่ได้รับ</span></div>`;
  }).join('');
  const big = APP.certs.filter(c => c.u <= 0);
  $('#certs-body').innerHTML = `<div class="card flat"><h1>สมุดเกียรติบัตร</h1><p class="small muted">ส่งด่านวัดผลของแต่ละชั้นแล้วได้ใบเกียรติบัตรทันที ระดับขึ้นกับคะแนนด่านวัดผลครั้งที่ดีที่สุด (ทอง ๙–๑๐ · เงิน ๗–๘ · ทองแดง ทำจบครบ) · จบทุกชั้นครึ่งแรกและสอบกลางภาค หรือจบทุกชั้นครึ่งหลังและสอบปลายภาค ได้ใบ “ผู้พิทักษ์หอไตรนามศัพท์”</p></div>
    ${big.map(c => `<div class="cert-tile" data-c="${c.u}" style="margin-bottom:10px">${medalSVG('ผู้พิทักษ์', 48)}<b>${esc(c.title)}</b></div>`).join('')}<div class="cert-grid">${tiles}</div>`;
  $$('#certs-body [data-c]').forEach(el => el.addEventListener('click', () => Cert.view(APP.certs.find(c => c.u === +el.dataset.c))));
  show('scr-certs');
}

/* ---------- ใบเกียรติบัตรแบบทางการ (วาดบนผืนผ้าใบ A4 แนวนอน) ---------- */
let SIGN_DATA = null;
async function signature() {
  if (SIGN_DATA !== null) return SIGN_DATA;
  if (!APP.cfg.hasSign) return (SIGN_DATA = '');
  try { const r = await rpcRetry('getSignature', [], 2); SIGN_DATA = r && r.ok ? r.data || '' : ''; } catch (e) { SIGN_DATA = ''; }
  return SIGN_DATA;
}
const CertV5 = (() => {
  const W = 1754, H = 1240;   // A4 แนวนอนที่ 150 dpi
  const TIER = { 'ทอง': ['#B8860B', '#F6E3A1', '#6E4E05'], 'เงิน': ['#7D8A97', '#E9EDF1', '#3E4A56'], 'ทองแดง': ['#9A5B2E', '#F2D2B6', '#5E3313'], 'ผู้พิทักษ์': ['#1F4FA0', '#D6E6FF', '#14326B'] };
  const img = (src, cors) => new Promise(res => { if (!src) return res(null); const i = new Image(); if (cors) i.crossOrigin = 'anonymous'; i.onload = () => res(i); i.onerror = () => res(null); i.src = src; setTimeout(() => res(null), 7000); });
  const svgURL = s => 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(s.replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" '));
  function fit(ctx, text, weight, size, family, maxW) { let s = size; do { ctx.font = `${weight} ${s}px ${family}`; s -= 2; } while (ctx.measureText(text).width > maxW && s > 18); }
  function corner(ctx, x, y, sx, sy, col) {   // ลายกนกอย่างง่ายที่มุม
    ctx.save(); ctx.translate(x, y); ctx.scale(sx, sy); ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineCap = 'round';
    ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(0, 150); ctx.lineTo(0, 0); ctx.lineTo(150, 0); ctx.stroke();
    ctx.lineWidth = 3; for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.moveTo(18 + k * 4, 120 - k * 30); ctx.quadraticCurveTo(22 + k * 10, 22 + k * 6, 120 - k * 30, 18 + k * 4); ctx.stroke(); }
    ctx.beginPath(); ctx.moveTo(40, 70); ctx.bezierCurveTo(52, 36, 92, 40, 82, 66); ctx.bezierCurveTo(74, 82, 54, 76, 60, 62); ctx.stroke();
    [[34, 34, 7], [62, 24, 4], [24, 62, 4]].forEach(([a, b, r]) => { ctx.beginPath(); ctx.arc(a, b, r, 0, Math.PI * 2); ctx.fill(); });
    ctx.restore();
  }
  function divider(ctx, x, y, col) {   // เส้นคั่นใต้หัวเรื่อง: เส้น · ข้าวหลามตัด · เส้น
    ctx.save(); ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = 2.5;
    [-1, 1].forEach(d => { ctx.beginPath(); ctx.moveTo(x + d * 26, y); ctx.lineTo(x + d * 210, y); ctx.stroke(); ctx.beginPath(); ctx.arc(x + d * 222, y, 5, 0, Math.PI * 2); ctx.fill(); });
    ctx.beginPath(); ctx.moveTo(x, y - 14); ctx.lineTo(x + 14, y); ctx.lineTo(x, y + 14); ctx.lineTo(x - 14, y); ctx.closePath(); ctx.fill();
    ctx.restore();
  }
  async function draw(c, noCrest) {
    const cf = APP.cfg, me = APP.me, t = TIER[c.tier] || TIER['ทอง'];
    try { await Promise.all(['600 60px Mitr', '500 40px Mitr', '400 30px Sarabun', '700 30px Sarabun'].map(f => document.fonts && document.fonts.load(f))); } catch (e) { }
    const cv = document.createElement('canvas'); cv.width = W; cv.height = H; const ctx = cv.getContext('2d');
    const g = ctx.createLinearGradient(0, 0, W, H); g.addColorStop(0, '#FFFDF6'); g.addColorStop(.5, '#FFFFFF'); g.addColorStop(1, '#FFF8E6');
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    // กรอบ: ฟ้าเข้ม · ทอง · เส้นใน
    ctx.strokeStyle = '#1F4F8F'; ctx.lineWidth = 30; ctx.strokeRect(26, 26, W - 52, H - 52);
    ctx.strokeStyle = t[0]; ctx.lineWidth = 8; ctx.strokeRect(62, 62, W - 124, H - 124);
    ctx.lineWidth = 2; ctx.strokeRect(80, 80, W - 160, H - 160);
    ctx.save(); ctx.strokeStyle = 'rgba(229,80,143,.35)'; ctx.setLineDash([2, 10]); ctx.lineWidth = 3; ctx.strokeRect(94, 94, W - 188, H - 188); ctx.restore();
    corner(ctx, 96, 96, 1, 1, t[0]); corner(ctx, W - 96, 96, -1, 1, t[0]); corner(ctx, 96, H - 96, 1, -1, t[0]); corner(ctx, W - 96, H - 96, -1, -1, t[0]);
    let crest = noCrest ? null : await img(CREST_URL, true); if (!crest) crest = await img(svgURL(logoSVG(200)));
    if (crest) { ctx.save(); ctx.globalAlpha = .05; ctx.drawImage(crest, W / 2 - 300, H / 2 - 260, 600, 600); ctx.restore(); ctx.drawImage(crest, W / 2 - 80, 112, 160, 160); }
    ctx.textAlign = 'center';
    ctx.fillStyle = '#1F4F8F'; fit(ctx, cf.school || '', 500, 38, 'Mitr', 1300); ctx.fillText(cf.school || '', W / 2, 318);
    const tg = ctx.createLinearGradient(0, 340, 0, 450); tg.addColorStop(0, t[0]); tg.addColorStop(1, t[2]);
    ctx.fillStyle = tg; ctx.font = '600 104px Mitr'; ctx.fillText('เกียรติบัตร', W / 2, 438);
    divider(ctx, W / 2, 474, t[0]);
    ctx.fillStyle = '#22303F'; ctx.font = '400 34px Sarabun'; ctx.fillText('ขอมอบเกียรติบัตรฉบับนี้ไว้เพื่อแสดงว่า', W / 2, 540);
    ctx.fillStyle = '#1F4F8F'; fit(ctx, me.name, 600, 70, 'Mitr', 1200); ctx.fillText(me.name, W / 2, 630);
    ctx.strokeStyle = t[0]; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(W / 2 - 460, 654); ctx.lineTo(W / 2 + 460, 654); ctx.stroke();
    ctx.font = '400 30px Sarabun'; ctx.fillStyle = '#55606E'; ctx.fillText(thn(`เลขประจำตัว ${me.id}   ชั้น ${me.cls}`), W / 2, 696);
    ctx.fillStyle = '#22303F';
    const line1 = c.u > 0 ? `ได้ผ่านการเรียนรู้และพิชิตหน่วยการเรียนรู้ที่ ${thn(c.u)} เรื่อง ${c.title}` : c.exam === 'FIN' ? `ได้ผ่านการเรียนรู้ครบทุกหน่วยและผ่านการสอบปลายภาค` : `ได้ผ่านการเรียนรู้หน่วยที่ ๑–๑๐ ครบถ้วนและผ่านการสอบกลางภาค`;
    fit(ctx, line1, 500, 38, 'Sarabun', 1400); ctx.fillText(line1, W / 2, 756);
    const line2 = thn(`รายวิชา${cf.subjName} รหัสวิชา ${cf.subj} ${cf.level || ''} ภาคเรียนที่ ${cf.term} ปีการศึกษา ${cf.year}`);
    fit(ctx, line2, 400, 30, 'Sarabun', 1400); ctx.fillText(line2, W / 2, 802);
    // แถบระดับ
    const label = c.u > 0 ? `ระดับ${c.tier}  ·  คะแนนด่านวัดผล ${thn(c.raw)}/${thn(c.n)}` : c.title;
    ctx.font = '500 34px Mitr'; const lw = ctx.measureText(label).width + 110, ry = 832;
    ctx.fillStyle = t[1]; ctx.strokeStyle = t[0]; ctx.lineWidth = 3; ctx.beginPath();
    ctx.moveTo(W / 2 - lw / 2, ry); ctx.lineTo(W / 2 + lw / 2, ry); ctx.lineTo(W / 2 + lw / 2 - 24, ry + 33); ctx.lineTo(W / 2 + lw / 2, ry + 66); ctx.lineTo(W / 2 - lw / 2, ry + 66); ctx.lineTo(W / 2 - lw / 2 + 24, ry + 33); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.fillStyle = t[2]; ctx.fillText(label, W / 2, ry + 46);
    ctx.fillStyle = '#55606E'; ctx.font = '400 28px Sarabun'; ctx.fillText('ขออนุโมทนาในความเพียร ขอให้เจริญงอกงามในพระพุทธศาสนา', W / 2, 940);
    ctx.fillStyle = '#22303F'; ctx.font = '400 30px Sarabun'; ctx.fillText('ให้ไว้ ณ วันที่ ' + thDateLong(c.date || APP.today), W / 2, 984);
    // ตราประจำชั้น (ซ้าย)
    const sx = 330, sy = 1010;
    ctx.beginPath(); ctx.arc(sx, sy, 92, 0, Math.PI * 2); ctx.fillStyle = '#FFF6DE'; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = t[0]; ctx.stroke();
    ctx.beginPath(); ctx.arc(sx, sy, 78, 0, Math.PI * 2); ctx.lineWidth = 2; ctx.stroke();
    const badge = await img(svgURL(c.u > 0 ? guardSVG(c.u, 120) : medalSVG('ผู้พิทักษ์', 120)));
    if (badge) ctx.drawImage(badge, sx - 60, sy - 64, 120, 120);
    if (c.u > 0) { ctx.font = '700 24px Sarabun'; ctx.fillStyle = '#1F4FA0'; ctx.fillText(c.guardPali || '', sx, sy + 128); }
    // ลายเซ็น (ขวา)
    const gx = W - 420, sig = await img(await signature());
    if (sig) { let h = 90, w = sig.width * h / sig.height; if (w > 360) { w = 360; h = sig.height * w / sig.width; } ctx.drawImage(sig, gx - w / 2, 1054 - h, w, h); }
    ctx.strokeStyle = '#55606E'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(gx - 200, 1060); ctx.lineTo(gx + 200, 1060); ctx.stroke();
    ctx.fillStyle = '#1F4F8F'; ctx.font = '500 30px Mitr'; ctx.fillText(`(${cf.signer || ''})`, gx, 1098);
    ctx.fillStyle = '#55606E'; ctx.font = '400 27px Sarabun'; ctx.fillText(cf.signerRole || 'ครูผู้สอน', gx, 1130);
    ctx.font = '400 22px Sarabun'; ctx.fillStyle = '#8A8F96'; ctx.fillText('เลขที่ ' + c.no, W / 2, H - 112);
    try { return cv.toDataURL('image/png'); } catch (e) { return noCrest ? null : draw(c, true); }
  }
  async function view(c) {
    if (!c) return;
    const p = modal({ title: c.u > 0 ? `เกียรติบัตร ชั้น ${thn(c.u)} · ระดับ${c.tier}` : c.title, pic: 'none',
      html: '<div class="center"><div class="spin"></div><p class="small muted">กำลังจัดทำใบเกียรติบัตร…</p></div>', buttons: [{ t: 'ปิด', v: false, cls: 'ghost' }] });
    const url = await draw(c);
    if (!url) { $('#m-body').innerHTML = '<p>จัดทำใบเกียรติบัตรไม่สำเร็จในเบราว์เซอร์นี้</p>'; return p; }
    $('#m-body').innerHTML = `<img class="cert-view" src="${url}" alt="ใบเกียรติบัตร"><div class="row wrapf" style="margin-top:10px"><a class="btn green grow" href="${url}" download="${esc(c.no)}.png">${ui('download', 18)} บันทึกรูปภาพ</a><button class="btn navy grow" id="c-pr">${ui('print', 18)} พิมพ์ / บันทึก PDF</button></div><p class="small muted center">ถ้ากดบันทึกไม่ได้ ให้แตะค้างที่รูปแล้วเลือก “บันทึกรูปภาพ”</p>`;
    $('#c-pr').onclick = () => {
      try { const w = window.open('', '_blank'); w.document.write(`<title>${esc(c.no)}</title><style>@page{size:A4 landscape;margin:0}html,body{margin:0}img{width:100vw;height:100vh;object-fit:contain;display:block}</style><img src="${url}" onload="setTimeout(()=>print(),300)">`); w.document.close(); }
      catch (e) { toast('เปิดหน้าพิมพ์ไม่ได้ ให้บันทึกรูปแล้วพิมพ์จากรูปภาพ'); }
    };
    return p;
  }
  return { view, draw };
})();
Cert.view = CertV5.view; Cert.draw = CertV5.draw;

/* ---------- แผงครู: ลายเซ็น สอบปลายภาค ลิงก์หน้าเกม ---------- */
function v5TeacherSettings(d) {
  const f = (k, v, h) => `<div class="field"><label>${esc(k)}${h ? ' — ' + esc(h) : ''}</label><input data-cfg="${esc(k)}" value="${esc(v || '')}"></div>`;
  const has20 = d.units.some(x => x.u >= 11);
  return `<div class="card"><h3>${ui('book', 18)} เนื้อหาหน่วย ๑๑–๒๐ และข้อสอบปลายภาค</h3>
    <p class="small muted">${has20 ? 'ในชีตมีหน่วย ๑๑ ขึ้นไปแล้ว กดซ้ำได้ ระบบเพิ่มเฉพาะส่วนที่ยังไม่มี' : 'นำเนื้อหา คำศัพท์ ตารางแจก ข้อฝึก ๒๐ ข้อ/หน่วย แบบทดสอบท้ายหน่วย จับผิด AI ประโยคแปล และข้อสอบปลายภาค ๕๐ ข้อ จากหนังสือเล่ม ๒ เข้าชีตครั้งเดียว'}</p>
    <button class="btn sm ${has20 ? 'ghost' : ''}" id="sd-imp">นำเข้าเนื้อหาหน่วย ๑๑–๒๐</button><div id="sd-msg" class="small muted"></div></div>
    <div class="card"><h3>${ui('key', 18)} ลายเซ็นผู้สอนบนใบเกียรติบัตร</h3>
    <p class="small muted">ถ่ายรูปลายเซ็นด้วยปากกาสีน้ำเงินหรือดำบนกระดาษขาว ระบบจะทำพื้นขาวให้โปร่งใสและย่อขนาดให้เอง</p>
    <img id="sg-prev" class="sign-prev" alt="ตัวอย่างลายเซ็น"><div class="row wrapf"><label class="btn sm ghost" style="cursor:pointer">เลือกรูปลายเซ็น<input id="sg-file" type="file" accept="image/*" hidden></label>
    <button class="btn sm" id="sg-save" disabled>บันทึกลายเซ็น</button><button class="btn sm ghost" id="sg-del">ลบลายเซ็น</button><button class="btn sm navy" id="sg-test">ดูตัวอย่างใบเกียรติบัตร</button></div><div id="sg-msg" class="small muted"></div></div>
    <div class="card"><h3>${ui('cal', 18)} สอบปลายภาค · ลิงก์ · เกณฑ์ผ่าน</h3>
    ${f('วันเปิดสอบปลายภาค', d.fin && d.fin.open, 'ปปปป-ดด-วว')}${f('วันปิดสอบปลายภาค', d.fin && d.fin.close, 'ปปปป-ดด-วว')}${f('รหัสห้องสอบปลายภาค', d.roomFin, 'ว่าง = ไม่ต้องกรอก')}
    ${f('เกณฑ์ผ่านด่านฝึก (%)', d.cfg.passPct, 'ทุกด่านย่อย')}${f('ลิงก์หน้าเกม (GitHub Pages)', d.gameUrl, 'ลิงก์เดิมในหนังสือจะพามาที่นี่')}${f('ลิงก์ตราโรงเรียน', d.cfg.crest)}
    <p class="small muted">กดปุ่ม “บันทึกการตั้งค่า” ด้านบนเพื่อบันทึกช่องเหล่านี้พร้อมกัน</p></div>`;
}
function v5BindTeacher(code, reload) {
  $('#sd-imp').onclick = async () => {
    const m = $('#sd-msg'), b = $('#sd-imp'); b.disabled = true; m.textContent = 'กำลังโหลดไฟล์เนื้อหา…';
    const keep = CFG.rpcTimeout; CFG.rpcTimeout = 180000;
    try {
      const seed = await fetch('seed-u11-20.json', { cache: 'no-store' }).then(r => { if (!r.ok) throw new Error('ไม่พบไฟล์ seed-u11-20.json บน GitHub'); return r.json(); });
      m.textContent = 'กำลังเขียนลงชีต (อาจใช้เวลา ๓๐–๖๐ วินาที อย่าปิดหน้านี้)…';
      const r = await rpc('teacherAction', code, 'importSeed', { tabs: seed.tabs, cfg: seed.cfg });
      if (r && r.ok) { m.textContent = 'นำเข้าแล้ว: ' + r.report.join(' · ') + ` · รวม ${thn(r.units)} หน่วย`; toast('นำเข้าเนื้อหาหน่วย ๑๑–๒๐ แล้ว'); }
      else m.textContent = 'ไม่สำเร็จ: ' + (r && (r.msg || r.reason));
    } catch (e) { m.textContent = 'ไม่สำเร็จ: ' + e.message; }
    CFG.rpcTimeout = keep; b.disabled = false;
  };
  const prev = $('#sg-prev'), msg = $('#sg-msg'); let data = '';
  SIGN_DATA = null;
  rpcRetry('getSignature', [], 2).then(r => { if (r && r.ok && r.data) { prev.src = r.data; SIGN_DATA = r.data; } else msg.textContent = 'ยังไม่มีลายเซ็นในระบบ'; }).catch(() => { });
  $('#sg-file').onchange = e => {
    const file = e.target.files && e.target.files[0]; if (!file) return;
    const im = new Image(); im.onload = () => {
      let s = Math.min(1, 900 / im.width, 320 / im.height), out;
      for (let k = 0; k < 4; k++) {
        const cv = document.createElement('canvas'); cv.width = Math.round(im.width * s); cv.height = Math.round(im.height * s);
        const ctx = cv.getContext('2d'); ctx.drawImage(im, 0, 0, cv.width, cv.height);
        const px = ctx.getImageData(0, 0, cv.width, cv.height), a = px.data;
        for (let i = 0; i < a.length; i += 4) { const l = (a[i] + a[i + 1] + a[i + 2]) / 3; if (l > 200) a[i + 3] = 0; else if (l > 150) a[i + 3] = Math.round((200 - l) / 50 * 255); }
        ctx.putImageData(px, 0, 0); out = cv.toDataURL('image/png');
        if (out.length < 450000) break; s *= .7;
      }
      data = out; prev.src = out; $('#sg-save').disabled = false; msg.textContent = 'ตรวจดูรูปด้านบน แล้วกด “บันทึกลายเซ็น”';
      URL.revokeObjectURL(im.src);
    };
    im.src = URL.createObjectURL(file);
  };
  const save = async (val, ok) => {
    try { const r = await rpcRetry('teacherAction', [code, 'signature', { data: val }], 2); if (r && r.ok) { toast(ok); APP.cfg.hasSign = !!val; SIGN_DATA = val; reload(); } else toast('ไม่สำเร็จ: ' + (r && (r.msg || r.reason))); }
    catch (e) { toast('เชื่อมต่อไม่สำเร็จ'); }
  };
  $('#sg-save').onclick = () => data && save(data, 'บันทึกลายเซ็นแล้ว');
  $('#sg-del').onclick = async () => { if (await modal({ title: 'ลบลายเซ็น?', html: '<p>ใบเกียรติบัตรที่เปิดหลังจากนี้จะไม่มีลายเซ็น</p>', buttons: [{ t: 'ยกเลิก', v: false, cls: 'ghost' }, { t: 'ลบ', v: true }] })) save('', 'ลบลายเซ็นแล้ว'); };
  $('#sg-test').onclick = () => {
    const keep = APP.me; APP.me = APP.me || { name: 'สามเณรตัวอย่าง ใจดี', id: '70690000', cls: '1/1' };
    const u = (APP.units[0] || { u: 1, title: 'ตัวอย่าง' });
    Cert.view({ no: `${APP.cfg.subj}-${APP.cfg.year}-ห01-ตัวอย่าง`, u: u.u, title: u.title, tier: 'ทอง', raw: 10, n: 10, date: APP.today, guardPali: u.guardPali }).then(() => { APP.me = keep; });
  };
}
