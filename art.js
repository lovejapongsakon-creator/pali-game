/* หอไตรนามศัพท์ รุ่น 5 — ฉากและตัวละครชุดใหม่ (โหลดต่อจาก v5.js และใช้แทนภาพชุดเดิม)
 *  - สามเณรน้อย (ตัวละครหลัก) และพระอาจารย์: หัวโต ตาโต มีแสงในตา หายใจ/กะพริบตา
 *  - ยักษ์ลืมศัพท์ (บอส) นกแก้วเอไอ ผู้พิทักษ์หน่วย 11–20
 *  - ฉากแบบหลายชั้น: ฟ้าไล่สี ฟ้า-ชมพู-เหลือง เมฆลอย นกบิน สิ่งก่อสร้างประจำฉาก ฉากกลางคืนสำหรับบอส
 * ภาพทั้งหมดวาดด้วย SVG ในไฟล์นี้ ไม่ต้องโหลดรูปจากที่อื่น
 */
let ART_ID = 0;
const aid = p => p + (++ART_ID);
(function () {
  const css = `
  .nong{overflow:visible}.nong .n-body{animation:nBreathe 3.2s ease-in-out infinite;transform-origin:60px 190px}
  .nong .n-eyes{animation:nBlink 4.6s infinite;transform-origin:56px 54px}
  .nong.jump .n-body{animation:nJump .6s ease}.nong.shake .n-body{animation:nShake .5s ease}
  @keyframes nBreathe{50%{transform:translateY(-2.5px) scale(1.01,.99)}}
  @keyframes nBlink{0%,92%,100%{transform:scaleY(1)}95%{transform:scaleY(.1)}}
  @keyframes nJump{30%{transform:translateY(-14px) rotate(-3deg)}60%{transform:translateY(0)}80%{transform:translateY(-4px)}}
  @keyframes nShake{20%{transform:translateX(-5px) rotate(-3deg)}40%{transform:translateX(5px) rotate(3deg)}60%{transform:translateX(-3px)}80%{transform:translateX(3px)}}
  .boss-svg{overflow:visible;filter:drop-shadow(0 6px 8px rgba(40,10,60,.35))}.boss-svg .b-head{animation:bFloat 2.8s ease-in-out infinite;transform-origin:55px 60px}
  .boss-svg.hurt .b-head{animation:bHit .5s ease}@keyframes bFloat{50%{transform:translateY(-4px)}}
  @keyframes bHit{20%{transform:translateX(-7px) rotate(-6deg);filter:brightness(1.8)}50%{transform:translateX(6px) rotate(4deg)}}
  .sc-bg .cl{animation:cloudDrift linear infinite}.sc-bg .bird{animation:birdFly 14s linear infinite}
  .sc-bg .sunr{animation:spin 40s linear infinite;transform-origin:center;transform-box:fill-box}
  .sc-bg .tw{animation:twinkle 2.4s ease-in-out infinite}.sc-bg .wave{animation:wave 3s ease-in-out infinite}
  @keyframes cloudDrift{from{transform:translateX(-80px)}to{transform:translateX(480px)}}
  @keyframes birdFly{from{transform:translate(-40px,0)}50%{transform:translate(200px,-12px)}to{transform:translate(440px,4px)}}
  @keyframes twinkle{50%{opacity:.25}}@keyframes wave{50%{transform:translateX(6px)}}
  .scene{min-height:clamp(140px,26vw,190px);border-radius:20px;box-shadow:inset 0 -10px 18px rgba(255,255,255,.35)}
  .scene .sc-bg{width:100%;height:100%;display:block}
  .guard svg{overflow:visible}
  @media (prefers-reduced-motion:reduce){.nong .n-body,.nong .n-eyes,.boss-svg .b-head,.sc-bg *{animation:none!important}}`;
  const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
})();

/* ---------- สามเณรน้อย / พระอาจารย์ ---------- */
function nongSVG(mood, size, extraCls, opt) {
  size = size || 110; opt = opt || {};
  const old = !!opt.old, g = aid('n'), w = Math.round(size * .68), h = Math.round(size * 1.12);
  const robeA = old ? '#C96A1E' : '#FFB13D', robeB = old ? '#9E4F10' : '#EE8A1F', robeC = old ? '#7E3E0B' : '#C96A12';
  const eye = (x, y) => `<ellipse cx="${x}" cy="${y}" rx="5.6" ry="6.6" fill="#2B1B12"/><circle cx="${x + 1.9}" cy="${y - 2.4}" r="2.2" fill="#fff"/><circle cx="${x - 1.6}" cy="${y + 2.2}" r="1" fill="#fff" opacity=".8"/>`;
  const eyes = {
    happy: '<path d="M38 55q6-7 12 0M62 55q6-7 12 0" stroke="#2B1B12" stroke-width="3.6" fill="none" stroke-linecap="round"/>',
    think: eye(44, 54) + eye(68, 53) + '<path d="M37 44q6-3 12-1M63 42q6-2 12 1" stroke="#7A5A44" stroke-width="2" fill="none" stroke-linecap="round"/>',
    sad: eye(44, 56) + eye(68, 56) + '<path d="M37 47q7-4 13 1M75 47q-7-4-13 1" stroke="#7A5A44" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M76 62q2 5 0 7" stroke="#7CC6F2" stroke-width="2.6" fill="none" stroke-linecap="round"/>',
    read: '<path d="M38 56q6 3 12 0M62 56q6 3 12 0" stroke="#2B1B12" stroke-width="3.4" fill="none" stroke-linecap="round"/>',
    wow: eye(44, 53) + eye(68, 53) + '<path d="M38 41l5 4M74 41l-5 4" stroke="#7A5A44" stroke-width="2" stroke-linecap="round"/>'
  }[mood] || eye(44, 54) + eye(68, 54);
  const mouth = {
    happy: '<path d="M47 66q9 11 18 0z" fill="#E8605A" stroke="#2B1B12" stroke-width="2.6" stroke-linejoin="round"/><path d="M51 70q5 3 10 0" fill="#FF9C8F"/>',
    think: '<path d="M51 69q5-2 10 1" stroke="#2B1B12" stroke-width="3" fill="none" stroke-linecap="round"/>',
    sad: '<path d="M48 72q8-7 16 0" stroke="#2B1B12" stroke-width="3" fill="none" stroke-linecap="round"/>',
    read: '<path d="M50 68q6 4 12 0" stroke="#2B1B12" stroke-width="2.8" fill="none" stroke-linecap="round"/>',
    wow: '<ellipse cx="56" cy="69" rx="5" ry="6.2" fill="#E8605A" stroke="#2B1B12" stroke-width="2.6"/>'
  }[mood] || '';
  return `<svg class="nong ${extraCls || ''}" viewBox="0 0 120 198" width="${w}" height="${h}" role="img" aria-label="${old ? 'พระอาจารย์' : 'น้องนามศัพท์ สามเณรน้อย'}">
  <defs><linearGradient id="${g}r" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="${robeA}"/><stop offset="1" stop-color="${robeB}"/></linearGradient>
  <radialGradient id="${g}s" cx=".4" cy=".35" r=".75"><stop offset="0" stop-color="#FFE3C8"/><stop offset="1" stop-color="#F0B88C"/></radialGradient>
  <linearGradient id="${g}h" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#7D8B9C" stop-opacity=".55"/><stop offset="1" stop-color="#7D8B9C" stop-opacity="0"/></linearGradient></defs>
  <ellipse cx="60" cy="192" rx="32" ry="5" fill="rgba(40,25,10,.16)"/>
  <g class="n-body">
   <path d="M44 176q0 12 8 12h6v-14zM76 176q0 12-8 12h-6v-14z" fill="#E9AE84"/>
   <path d="M30 118q-2 40 6 62q24 7 48 0q8-22 6-62q-10-16-30-18q-20 2-30 18z" fill="url(#${g}r)"/>
   <path d="M36 128q10 22 8 52M84 128q-8 24-6 52M58 122q4 30 2 60" stroke="${robeC}" stroke-width="1.6" fill="none" opacity=".45"/>
   <path d="M28 118q14-20 34-20q12 0 18 6l-40 74q-10-4-12-60z" fill="${robeB}" opacity=".9"/>
   <path d="M80 104q8 6 8 14q-1 6-6 10" fill="#F0B88C"/>
   <path d="M88 116q3 14-10 22q-10 4-18 0" stroke="#F0B88C" stroke-width="9" fill="none" stroke-linecap="round"/>
   ${old ? '' : `<g class="n-leaf" transform="rotate(-14 66 136)"><rect x="46" y="129" width="40" height="12" rx="2.5" fill="#F7E2A8" stroke="#B48C3E" stroke-width="1.4"/><path d="M48 133h36M48 137h36" stroke="#D6B26A" stroke-width="1"/><rect x="64" y="127.5" width="3.6" height="15" rx="1" fill="#C0392B"/></g>`}
   <circle cx="62" cy="136" r="5.5" fill="#F0B88C"/>
   <path d="M32 120q-8 14-4 30" stroke="url(#${g}r)" stroke-width="11" fill="none" stroke-linecap="round"/>
   <circle cx="29" cy="152" r="5.5" fill="#F0B88C"/>
   <rect x="52" y="88" width="16" height="16" rx="6" fill="#EBB085"/>
   <g transform="translate(60 56)">
    <ellipse cx="-34" cy="4" rx="6" ry="8" fill="#EBB085"/><ellipse cx="34" cy="4" rx="6" ry="8" fill="#EBB085"/>
    <circle r="36" fill="url(#${g}s)"/>
    <path d="M-35 -4a35 35 0 0 1 70 0q-10-18-35-19q-25 1-35 19z" fill="url(#${g}h)"/>
    <ellipse cx="-12" cy="-22" rx="9" ry="4" fill="#fff" opacity=".35" transform="rotate(-20 -12 -22)"/>
   </g>
   <g class="n-eyes">${eyes}</g>
   <ellipse cx="36" cy="66" rx="6" ry="3.4" fill="#FF8FA8" opacity=".55"/><ellipse cx="76" cy="66" rx="6" ry="3.4" fill="#FF8FA8" opacity=".55"/>
   <g class="n-mouth">${mouth}</g>
   ${old ? '<circle cx="44" cy="55" r="9" fill="none" stroke="#4A3524" stroke-width="2"/><circle cx="68" cy="55" r="9" fill="none" stroke="#4A3524" stroke-width="2"/><path d="M53 55h6" stroke="#4A3524" stroke-width="2"/><path d="M30 70q4 5 8 5M90 70q-4 5-8 5" stroke="#C99572" stroke-width="1.6" fill="none"/>' : ''}
  </g></svg>`;
}

/* ---------- ยักษ์ลืมศัพท์ ---------- */
function yakInner(state) {
  const hurt = state === 'hurt', win = state === 'win', g = aid('y');
  const face = hurt ? '#7BC79A' : '#36A06A', face2 = hurt ? '#5AAE80' : '#25804F';
  const eyes = win ? '<path d="M33 56q8-8 16 0M61 56q8-8 16 0" stroke="#14261A" stroke-width="4.5" fill="none" stroke-linecap="round"/>'
    : hurt ? '<path d="M34 50l12 11M46 50l-12 11M64 50l12 11M76 50l-12 11" stroke="#14261A" stroke-width="4.2" stroke-linecap="round"/>'
      : '<circle cx="41" cy="56" r="9" fill="#FFF7E6" stroke="#C0392B" stroke-width="2.6"/><circle cx="69" cy="56" r="9" fill="#FFF7E6" stroke="#C0392B" stroke-width="2.6"/><circle cx="43" cy="57" r="4.2" fill="#14261A"/><circle cx="67" cy="57" r="4.2" fill="#14261A"/><circle cx="44.5" cy="55" r="1.5" fill="#fff"/><circle cx="68.5" cy="55" r="1.5" fill="#fff"/><path d="M29 44q11-7 22 1M59 45q11-8 22-1" stroke="#14261A" stroke-width="5" fill="none" stroke-linecap="round"/>';
  return `<defs><linearGradient id="${g}c" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#FFE27A"/><stop offset="1" stop-color="#D99A1E"/></linearGradient>
    <radialGradient id="${g}f" cx=".45" cy=".35" r=".8"><stop offset="0" stop-color="${face}"/><stop offset="1" stop-color="${face2}"/></radialGradient></defs>
  <g class="b-head">
  <path d="M55 0l5 11h5l3 10h6l3 10h4l3 9H26l3-9h4l3-10h6l3-10h5z" fill="url(#${g}c)" stroke="#9A6A10" stroke-width="1.6"/>
  <circle cx="55" cy="18" r="3" fill="#E74C3C"/><circle cx="55" cy="30" r="3.4" fill="#3498DB"/><circle cx="42" cy="34" r="2" fill="#E74C3C"/><circle cx="68" cy="34" r="2" fill="#E74C3C"/>
  <rect x="24" y="38" width="62" height="9" rx="3" fill="url(#${g}c)" stroke="#9A6A10" stroke-width="1.6"/>
  <path d="M24 46q-16 8-12 30q6-11 13-13zM86 46q16 8 12 30q-6-11-13-13z" fill="url(#${g}c)" stroke="#9A6A10" stroke-width="1.4"/>
  <path d="M25 46h60v18q0 34-30 34T25 64z" fill="url(#${g}f)"/>
  <path d="M30 70q-4 6 0 12M80 70q4 6 0 12" stroke="${face2}" stroke-width="3" fill="none" opacity=".6"/>
  ${eyes}
  <path d="M47 67q8-5 16 0" stroke="#14261A" stroke-width="3" fill="none"/>
  <path d="M33 76q22 ${win ? 16 : hurt ? 3 : 11} 44 0q-22 ${win ? 5 : 7} -44 0z" fill="#7A1022" stroke="#14261A" stroke-width="2.6" stroke-linejoin="round"/>
  <path d="M37 78l3-13 5 12zM73 78l-3-13-5 12z" fill="#FFFDF4" stroke="#14261A" stroke-width="1.2"/>
  ${hurt ? '<path d="M88 20l6-6M92 30l9-2M84 12l2-8" stroke="#FFD452" stroke-width="3" stroke-linecap="round"/>' : ''}
  </g>`;
}
function bossSVG(state) { return `<svg class="boss-svg ${state || ''}" viewBox="0 0 110 100" width="104" height="96" role="img" aria-label="ยักษ์ลืมศัพท์">${yakInner(state)}</svg>`; }

/* ---------- นกแก้วเอไอ ---------- */
function parrotSVG(size, mood) {
  const g = aid('p'), eye = mood === 'caught' ? '<path d="M53 25l7 7M60 25l-7 7" stroke="#14261A" stroke-width="2.6" stroke-linecap="round"/>'
    : '<circle cx="57" cy="29" r="5" fill="#fff"/><circle cx="58" cy="29" r="2.6" fill="#14261A"/><circle cx="59" cy="28" r="1" fill="#fff"/>';
  return `<svg viewBox="0 0 90 110" width="${(size || 80) * .82}" height="${size || 80}" aria-label="นกแก้วเอไอ">
  <defs><linearGradient id="${g}b" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#4FD98A"/><stop offset="1" stop-color="#1E9E5A"/></linearGradient></defs>
  <path d="M34 100l-6 8M44 100l2 8" stroke="#E9B22C" stroke-width="4" stroke-linecap="round"/>
  <path d="M24 96q-14-8-8-32q5-20 22-28" fill="#178A4C"/><path d="M18 72q-16 12-12 32q12-10 19-14z" fill="#3A7BD5"/><path d="M14 86q-6 10-2 18" stroke="#E5508F" stroke-width="4" fill="none" stroke-linecap="round"/>
  <ellipse cx="44" cy="66" rx="23" ry="33" fill="url(#${g}b)"/>
  <path d="M30 24q14-19 31-6q10 11 1 23q-15 6-29-2z" fill="url(#${g}b)"/>
  <path d="M62 31q16 0 13 15q-7-4-13-4z" fill="#FFC23D" stroke="#C47F12" stroke-width="1.5"/>${eye}
  <ellipse cx="50" cy="38" rx="5" ry="3" fill="#FF8FA8" opacity=".6"/>
  <rect x="31" y="55" width="26" height="19" rx="4" fill="#102C3A" stroke="#9BE7FF" stroke-width="1.8"/><path d="M35 61h8M35 66h15" stroke="#9BE7FF" stroke-width="2" stroke-linecap="round"/><text x="51" y="63" font-size="6.5" fill="#9BE7FF" font-family="sans-serif" font-weight="700">AI</text>
  <path d="M27 81q15 10 32 0" stroke="#178A4C" stroke-width="3" fill="none"/></svg>`;
}

/* ---------- ผู้พิทักษ์หน่วย 11–20 ---------- */
Object.assign(GUARD, {
  11: `<ellipse cx="54" cy="66" rx="24" ry="15" fill="#D89A5B"/><circle cx="68" cy="60" r="3" fill="#fff"/><circle cx="58" cy="70" r="2.6" fill="#fff"/><circle cx="46" cy="64" r="2.4" fill="#fff"/>
      <path d="M36 74v16M46 78v13M62 78v13M72 74v16" stroke="#B87A3F" stroke-width="5" stroke-linecap="round"/><circle cx="32" cy="46" r="13" fill="#D89A5B"/><ellipse cx="24" cy="50" rx="6" ry="4" fill="#F4D5B0"/>
      <circle cx="30" cy="43" r="2.4" fill="#2A1A0E"/><path d="M36 34q-4-14 6-20M38 34q4-10 14-10M26 34q-2-12-10-16" stroke="#8C5A2B" stroke-width="2.6" fill="none" stroke-linecap="round"/><path d="M44 36q6-4 8 2" fill="#B87A3F"/>`,
  12: `<path d="M20 70q10-26 34-20q18 4 28 22q-14 12-36 10q-18-2-26-12z" fill="#FFF8E6" stroke="#E0B54A" stroke-width="2"/><path d="M44 54q-6-22 8-34q10-4 12 6q-2 8-10 12" stroke="#FFF8E6" stroke-width="9" fill="none" stroke-linecap="round"/>
      <path d="M44 54q-6-22 8-34q10-4 12 6" stroke="#E0B54A" stroke-width="1.6" fill="none"/><path d="M63 27l9 2-8 3z" fill="#F39C12"/><circle cx="60" cy="26" r="1.8" fill="#2A1A0E"/><path d="M30 62q14 6 30 0" stroke="#E0B54A" stroke-width="2" fill="none"/><path d="M12 82q38 10 76 0" stroke="#7CC6F2" stroke-width="3" fill="none"/>`,
  13: `<ellipse cx="52" cy="62" rx="28" ry="17" fill="#FAFAF5" stroke="#B9B4A6" stroke-width="2"/><ellipse cx="44" cy="58" rx="7" ry="5" fill="#C9C3B5"/><path d="M34 74v16M44 76v14M62 76v14M72 74v16" stroke="#B9B4A6" stroke-width="5" stroke-linecap="round"/>
      <ellipse cx="24" cy="50" rx="13" ry="12" fill="#FAFAF5" stroke="#B9B4A6" stroke-width="2"/><ellipse cx="17" cy="56" rx="7" ry="5" fill="#F4C6C6"/><circle cx="24" cy="46" r="2.2" fill="#2A1A0E"/>
      <path d="M18 38q-6-8-2-12M30 38q6-8 2-12" stroke="#C9A35A" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M80 62q10 4 8 14" stroke="#B9B4A6" stroke-width="2.5" fill="none"/><circle cx="36" cy="66" r="4" fill="#E9B22C"/>`,
  14: `<circle cx="66" cy="34" r="22" fill="#FFF3B0"/><circle cx="58" cy="28" r="4" fill="#F1DE8A"/><circle cx="72" cy="42" r="3" fill="#F1DE8A"/>
      <ellipse cx="40" cy="70" rx="18" ry="14" fill="#fff" stroke="#D5D9E0" stroke-width="2"/><circle cx="34" cy="54" r="11" fill="#fff" stroke="#D5D9E0" stroke-width="2"/>
      <path d="M30 46q-6-20 0-24q4 8 4 22M38 45q2-20 8-22q2 10-4 22" fill="#fff" stroke="#D5D9E0" stroke-width="2"/><circle cx="31" cy="54" r="2" fill="#2A1A0E"/><ellipse cx="25" cy="57" rx="3" ry="2" fill="#FFB3C6"/>
      <path d="M50 76h14" stroke="#D5D9E0" stroke-width="5" stroke-linecap="round"/>`,
  15: `<ellipse cx="52" cy="62" rx="30" ry="20" fill="#5BAA6A"/><path d="M30 56q22-24 44 0M38 50l8 14M52 44v20M66 50l-8 14M30 64h44" stroke="#2E7A43" stroke-width="2.4" fill="none"/>
      <ellipse cx="88" cy="62" rx="9" ry="7" fill="#8CC79A"/><circle cx="91" cy="60" r="1.8" fill="#14261A"/><path d="M28 76l-6 8M76 76l6 8M34 46l-6-6M70 46l6-6" stroke="#8CC79A" stroke-width="6" stroke-linecap="round"/><circle cx="52" cy="58" r="4" fill="#FFD452"/>`,
  16: `<path d="M66 82q26-6 20-34q-4-20-18-14q8 6 6 18q-2 14-10 18" fill="#C46A2E"/><ellipse cx="46" cy="64" rx="16" ry="18" fill="#D98546"/><ellipse cx="46" cy="70" rx="9" ry="11" fill="#F6D2A8"/>
      <circle cx="44" cy="44" r="12" fill="#D98546"/><path d="M36 36l-3-8 7 4M50 34l4-8 1 9" fill="#D98546"/><circle cx="41" cy="42" r="2.4" fill="#2A1A0E"/><ellipse cx="35" cy="47" rx="3.4" ry="2.4" fill="#F6D2A8"/>
      <ellipse cx="38" cy="60" rx="4" ry="3" fill="#8C5A2B" transform="rotate(-20 38 60)"/><path d="M12 92q12-30 4-60M20 92q10-26 8-50" stroke="#7FB069" stroke-width="3" fill="none"/>`,
  17: `<path d="M8 88l26-46 14 18 12-30 32 58z" fill="#B7A28A"/><path d="M48 60l12-30 8 16" fill="#D3C2AC"/>
      <path d="M30 40q20-14 40 0q-10-4-20 6q-10-10-20-6z" fill="#5A4636"/><path d="M14 44q16-16 36-4M86 44q-16-16-36-4" stroke="#6D5644" stroke-width="7" fill="none" stroke-linecap="round"/>
      <circle cx="50" cy="32" r="7" fill="#F2E5D3"/><circle cx="52" cy="31" r="1.6" fill="#2A1A0E"/><path d="M56 33l6 2-6 2z" fill="#E9B22C"/>`,
  18: `<path d="M8 74q20-8 40 0t44 0v20H8z" fill="#7CC6F2"/><path d="M14 80q8-4 16 0M54 84q8-4 16 0" stroke="#fff" stroke-width="2" fill="none" class="wave"/>
      <path d="M28 52q24-22 50 0q-26 22-50 0z" fill="#FFB13D" stroke="#E07B12" stroke-width="2"/><path d="M78 52l14-12v24z" fill="#FF8F3D"/><circle cx="40" cy="48" r="3" fill="#14261A"/><circle cx="41" cy="47" r="1" fill="#fff"/>
      <path d="M48 42q6 10 0 20M58 42q6 10 0 20" stroke="#E07B12" stroke-width="1.6" fill="none"/><circle cx="22" cy="36" r="3" fill="#BFE6FF"/><circle cx="16" cy="26" r="2" fill="#BFE6FF"/>`,
  19: `<path d="M44 90v-16M56 90v-16" stroke="#E9B22C" stroke-width="4" stroke-linecap="round"/><ellipse cx="50" cy="60" rx="22" ry="18" fill="#FBF3E4"/>
      <path d="M68 52q22-10 20 16q-8-12-18-6M70 58q18 4 12 22q-4-12-14-14" fill="#2E8B57"/><path d="M72 50q16-18 22 2" fill="#C0392B"/>
      <circle cx="36" cy="38" r="12" fill="#FBF3E4"/><path d="M30 26q2-10 8-6q2-8 8-2q0 6-6 8" fill="#E74C3C"/><path d="M24 40l-10 3 10 3z" fill="#E9B22C"/><circle cx="33" cy="36" r="2.2" fill="#2A1A0E"/>
      <path d="M34 48q-3 8 3 10" fill="#E74C3C"/><path d="M84 18v-8M90 22l6-5M78 20l-5-5" stroke="#FFD452" stroke-width="2.4" stroke-linecap="round"/>`,
  20: `<path d="M50 30q-34-14-44 14q16-6 26 2q-16 4-20 18q16-10 30-4zM50 30q34-14 44 14q-16-6-26 2q16 4 20 18q-16-10-30-4z" fill="#E74C3C" stroke="#9A2A1E" stroke-width="1.4"/>
      <path d="M38 44q12 40 12 48q0-8 12-48z" fill="#E9B22C"/><circle cx="50" cy="30" r="11" fill="#2E8B57"/><path d="M42 22l-2-12 6 6 4-10 4 10 6-6-2 12z" fill="#E9B22C" stroke="#9A6A10" stroke-width="1"/>
      <path d="M50 32l7 4-7 3z" fill="#E9B22C"/><circle cx="47" cy="29" r="2" fill="#fff"/><circle cx="47" cy="29" r="1" fill="#14261A"/>`
});

/* ---------- ฉากหลังหลายชั้น ---------- */
function landmark(kind, night) {
  const gold = '#E9B531', red = '#C8452F', cream = '#FFF6E6';
  const L = {
    temple: `<g transform="translate(218 22)"><rect x="18" y="58" width="74" height="40" fill="${cream}" stroke="#D9C3A0" stroke-width="2"/><rect x="47" y="70" width="16" height="28" rx="7" fill="#9B3A22"/>
      <path d="M2 62L55 26L108 62z" fill="${red}" stroke="${gold}" stroke-width="3" stroke-linejoin="round"/><path d="M18 44L55 10L92 44z" fill="#E26A2C" stroke="${gold}" stroke-width="3" stroke-linejoin="round"/>
      <path d="M55 10q-3-9 3-13" stroke="${gold}" stroke-width="3" fill="none"/><path d="M2 62q-7-3-7-10M108 62q7-3 7-10" stroke="${gold}" stroke-width="3" fill="none" stroke-linecap="round"/></g>`,
    chedi: `<g transform="translate(250 6)"><rect x="10" y="98" width="70" height="10" fill="#E8DCC4"/><path d="M18 98q0-30 27-34q27 4 27 34z" fill="#FFFDF5" stroke="#D9C3A0" stroke-width="2"/>
      <rect x="34" y="52" width="22" height="12" fill="#FFFDF5" stroke="#D9C3A0" stroke-width="2"/>${[0, 1, 2, 3, 4, 5].map(i => `<ellipse cx="45" cy="${48 - i * 6}" rx="${9 - i * 1.2}" ry="2.6" fill="${gold}"/>`).join('')}<path d="M45 12V0" stroke="${gold}" stroke-width="3"/></g>`,
    bodhi: `<g transform="translate(236 4)"><path d="M58 112q-4-40 2-60M62 70q14-10 22-4M58 80q-14-8-24-2" stroke="#7A4A20" stroke-width="9" fill="none" stroke-linecap="round"/>
      ${[[30, 40, 26], [66, 26, 30], [96, 46, 24], [52, 52, 24], [82, 62, 20], [20, 62, 18]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#4FA35E"/>`).join('')}
      ${[[30, 30], [70, 18], [94, 40], [50, 46], [16, 56], [84, 56]].map(([x, y]) => `<path d="M${x} ${y}q6-8 12 0q-6 10-12 0z" fill="#8ED081"/>`).join('')}<rect x="30" y="104" width="62" height="8" rx="4" fill="#E9B22C" opacity=".7"/></g>`,
    house: `<g transform="translate(232 30)"><path d="M10 50h86v26H10z" fill="#C88A4E" stroke="#7A4A20" stroke-width="2"/><path d="M20 50v26M40 50v26M66 50v26M86 50v26" stroke="#8C5A2B" stroke-width="1.5"/>
      <rect x="46" y="56" width="14" height="20" fill="#5E3A1A"/><path d="M14 76v14M92 76v14M53 76v14" stroke="#7A4A20" stroke-width="4"/><path d="M0 52L53 4L106 52z" fill="#8C5A2B" stroke="#5A3412" stroke-width="2" stroke-linejoin="round"/>
      <path d="M0 52q-6-4-4-12M106 52q6-4 4-12M53 4q-1-6 4-8" stroke="#5A3412" stroke-width="3" fill="none" stroke-linecap="round"/><circle cx="26" cy="64" r="4" fill="#FFD452"/></g>`,
    pasture: `<g transform="translate(200 62)"><path d="M0 44h190M0 30h190" stroke="#B5793F" stroke-width="3"/>${[0, 40, 80, 120, 160].map(x => `<rect x="${x}" y="22" width="5" height="30" fill="#8C5A2B"/>`).join('')}
      <g transform="translate(70 4)"><ellipse cx="30" cy="22" rx="20" ry="12" fill="#FAFAF5" stroke="#B9B4A6" stroke-width="1.5"/><ellipse cx="24" cy="20" rx="6" ry="4" fill="#C9C3B5"/><circle cx="8" cy="16" r="8" fill="#FAFAF5" stroke="#B9B4A6" stroke-width="1.5"/>
      <path d="M18 32v10M24 33v9M36 33v9M42 32v10" stroke="#B9B4A6" stroke-width="3"/><path d="M4 9q-4-5-1-7M12 9q4-5 1-7" stroke="#C9A35A" stroke-width="2" fill="none"/></g></g>`,
    stars: `<g transform="translate(232 18)"><rect x="10" y="62" width="90" height="36" fill="#FFF0F7" stroke="#E5B4CC" stroke-width="2"/><path d="M0 64L55 24L110 64z" fill="#7C5BD6" stroke="${gold}" stroke-width="3" stroke-linejoin="round"/>
      <circle cx="55" cy="48" r="8" fill="#FFE07A"/>${[[20, 8], [86, 4], [104, 30], [6, 34]].map(([x, y]) => `<path class="tw" d="M${x} ${y - 6}l2 4 4 2-4 2-2 4-2-4-4-2 4-2z" fill="#FFE07A"/>`).join('')}<rect x="46" y="72" width="18" height="26" rx="8" fill="#9B3A22"/></g>`,
    pavilion: `<g transform="translate(226 30)"><rect x="6" y="74" width="108" height="8" fill="#D9C3A0"/>${[14, 42, 72, 100].map(x => `<rect x="${x}" y="34" width="6" height="40" fill="${cream}" stroke="#C9A877"/>`).join('')}
      <path d="M0 36L60 4L120 36z" fill="#3A8FD6" stroke="${gold}" stroke-width="3" stroke-linejoin="round"/><path d="M0 36q-6-2-6-8M120 36q6-2 6-8" stroke="${gold}" stroke-width="3" fill="none"/><path d="M32 60h56" stroke="#C88A4E" stroke-width="5"/></g>`,
    bamboo: `<g transform="translate(206 0)">${[0, 22, 40, 64, 86, 104, 128, 150, 170].map((x, i) => `<path d="M${x + 10} 140V${10 + (i % 3) * 12}" stroke="${i % 2 ? '#6DAF5B' : '#86C46E'}" stroke-width="7"/>${[40, 70, 100].map(y => `<path d="M${x + 6} ${y + i * 2}h8" stroke="#4E8A3F" stroke-width="2"/>`).join('')}<path d="M${x + 10} ${30 + i * 4}q14-6 20 0q-10 4-20 0z" fill="#5DA34E"/>`).join('')}</g>`,
    mountain: `<g transform="translate(190 0)"><path d="M0 140L70 34l26 30 30-50 84 126z" fill="#B7A28A"/><path d="M96 64l30-50 22 34-16-6-14 18z" fill="#E8DCCB"/><path d="M70 34l-14 30 22-10z" fill="#D3C2AC"/>
      <g transform="translate(124 6)"><path d="M0 6q10-8 20 0q-10-2-20 0zM22 6q10-8 20 0q-10-2-20 0z" fill="#5A4636"/></g><rect x="114" y="40" width="20" height="10" fill="${cream}" stroke="#C9A877"/><path d="M110 42l14-10 14 10z" fill="${red}"/></g>`,
    river: `<g transform="translate(180 60)"><path d="M0 40q50-14 110 0t110 0v40H0z" fill="#7CC6F2"/><path d="M14 52q10-4 20 0M70 60q10-4 20 0M130 50q10-4 20 0M170 62q10-4 20 0" stroke="#fff" stroke-width="2" fill="none" class="wave"/>
      <g transform="translate(80 18)"><path d="M0 22h56l-8 10H8z" fill="#8C5A2B"/><path d="M24 22V0" stroke="#7A4A20" stroke-width="2.4"/><path d="M26 2q18 8 0 18z" fill="#FFF6E6"/></g>
      <g transform="translate(176 -40)"><path d="M10 80V40" stroke="#7A4A20" stroke-width="5"/><circle cx="10" cy="30" r="16" fill="#4FA35E"/><circle cx="-2" cy="40" r="10" fill="#5DB36C"/><circle cx="22" cy="40" r="10" fill="#5DB36C"/></g></g>`,
    bell: `<g transform="translate(244 14)"><rect x="12" y="98" width="70" height="8" fill="#D9C3A0"/><rect x="18" y="44" width="8" height="54" fill="${cream}" stroke="#C9A877"/><rect x="68" y="44" width="8" height="54" fill="${cream}" stroke="#C9A877"/>
      <path d="M4 46L47 14L90 46z" fill="${red}" stroke="${gold}" stroke-width="3" stroke-linejoin="round"/><path d="M47 14V0" stroke="${gold}" stroke-width="3"/><path d="M36 52h22v5q8 3 8 20H28q0-17 8-20z" fill="#C9962E" stroke="#7C5A16" stroke-width="2"/><circle cx="47" cy="81" r="3.4" fill="#7C5A16"/>
      <circle cx="104" cy="20" r="12" fill="#FFB36B" opacity=".9"/></g>`,
    lotus: `<g transform="translate(196 74)"><ellipse cx="96" cy="34" rx="98" ry="24" fill="#7CC6F2"/>${[[30, 30], [84, 22], [140, 32], [176, 24]].map(([x, y]) => `<ellipse cx="${x}" cy="${y + 8}" rx="14" ry="5" fill="#5DA34E"/>`).join('')}
      ${[[56, 14], [114, 8], [160, 14]].map(([x, y]) => `<g transform="translate(${x} ${y})"><path d="M0 14q-12-4-10-16q8 2 10 16zM0 14q12-4 10-16q-8 2-10 16zM0 14q-4-14 0-22q4 8 0 22z" fill="#F29CC2" stroke="#C24F8E" stroke-width="1"/></g>`).join('')}</g>`
  };
  return L[kind] || L.temple;
}
/* ลำดับสำคัญ: คำเฉพาะต้องมาก่อนคำกว้าง (เช่น "ศาลานับดาว" มีคำว่า "ลาน" อยู่ข้างใน) */
const SCENE_KIND = [
  [/โพธิ์/, 'bodhi'], [/ดาว/, 'stars'], [/ระฆัง|อรุณ/, 'bell'], [/เจดีย์|หอไตร/, 'chedi'], [/โค|ทุ่ง/, 'pasture'],
  [/ไผ่|เวฬุวัน|สวนป่า/, 'bamboo'], [/เขา|คิชฌกูฏ/, 'mountain'], [/ท่าน้ำ|แม่น้ำ|คงคา/, 'river'], [/บัว|สระ/, 'lotus'],
  [/ศาลาการเปรียญ|เรือน|บ้าน|โรงเรียน|กุฏิ|โรงทาน/, 'house'], [/ศาลา/, 'pavilion'], [/ลานวัด|อุโบสถ/, 'temple']
];
function sceneBG(scene, night) {
  const kind = (SCENE_KIND.find(([re]) => re.test(scene || '')) || [0, 'temple'])[1], g = aid('s');
  const sky = night ? ['#1B1840', '#4A2E6E', '#8C4A7E'] : ['#AEE0FF', '#FFDDEB', '#FFF2C2'];
  const clouds = night ? '' : [[20, 26, 22, 0], [150, 14, 16, -12], [300, 30, 18, -24]].map(([x, y, r, d]) =>
    `<g class="cl" style="animation-duration:${60 + r}s;animation-delay:${d}s"><g transform="translate(${x} ${y})" opacity=".92"><ellipse cx="0" cy="0" rx="${r * 1.6}" ry="${r * .6}" fill="#fff"/><circle cx="${-r * .5}" cy="${-r * .35}" r="${r * .55}" fill="#fff"/><circle cx="${r * .35}" cy="${-r * .45}" r="${r * .7}" fill="#fff"/></g></g>`).join('');
  const stars = night ? Array.from({ length: 22 }, (_, i) => `<circle class="tw" style="animation-delay:${(i % 7) * .35}s" cx="${(i * 53) % 400}" cy="${(i * 37) % 70 + 4}" r="${i % 3 ? 1.2 : 2}" fill="#FFF3C4"/>`).join('') : '';
  const sun = night ? '<circle cx="64" cy="30" r="15" fill="#FFF3C4"/><circle cx="70" cy="26" r="13" fill="#2A2252"/>'
    : `<g transform="translate(64 30)"><g class="sunr">${Array.from({ length: 12 }, (_, i) => `<path d="M0 -24L3 -34L-3 -34z" fill="#FFD452" opacity=".7" transform="rotate(${i * 30})"/>`).join('')}</g><circle r="17" fill="#FFE07A"/><circle r="12" fill="#FFF3B0"/></g>`;
  const birds = night ? '' : '<g class="bird"><path d="M0 40q5-5 10 0q5-5 10 0" stroke="#6B5A7A" stroke-width="1.6" fill="none"/><path d="M18 30q4-4 8 0q4-4 8 0" stroke="#6B5A7A" stroke-width="1.4" fill="none"/></g>';
  return `<svg class="sc-bg" viewBox="0 0 400 150" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
  <defs><linearGradient id="${g}k" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="${sky[0]}"/><stop offset=".6" stop-color="${sky[1]}"/><stop offset="1" stop-color="${sky[2]}"/></linearGradient>
  <linearGradient id="${g}h" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="${night ? '#3D4E3A' : '#B6DFA0'}"/><stop offset="1" stop-color="${night ? '#2A3828' : '#8CC979'}"/></linearGradient></defs>
  <rect width="400" height="150" fill="url(#${g}k)"/>${stars}${sun}${clouds}${birds}
  <path d="M0 108q50-28 110-14t120-8 170 4v60H0z" fill="${night ? '#33405A' : '#C9E3F7'}" opacity=".8"/>
  ${landmark(kind, night)}
  <path d="M0 122q70-18 150-8t140-4 110 6v34H0z" fill="url(#${g}h)"/>
  <path d="M0 136h400v14H0z" fill="${night ? '#3A2F24' : '#F3DDB4'}"/>
  ${[[24, 128], [110, 132], [176, 126], [356, 130]].map(([x, y]) => `<g transform="translate(${x} ${y})"><path d="M0 0q-4-8-1-12M2 0q2-9 7-11M4 0q5-6 9-6" stroke="${night ? '#5D7A55' : '#4E9A48'}" stroke-width="2" fill="none" stroke-linecap="round"/>${night ? '' : '<circle cx="9" cy="-11" r="2.4" fill="#FF8FB8"/>'}</g>`).join('')}
  </svg>`;
}

/* ---------- ให้ตัวละครกระโดด/ส่ายเมื่อตอบถูก/ผิด และยักษ์สะดุ้งเมื่อโดนตี ---------- */
const _markResult = markResult;
markResult = function (it, good, key) {
  _markResult(it, good, key);
  const n = document.querySelector('#play-stage .scene .nong'); if (n) { n.classList.remove('jump', 'shake'); void n.getBoundingClientRect(); n.classList.add(good ? 'jump' : 'shake'); }
  const b = document.querySelector('#play-stage .scene .boss-svg');
  if (b && good) { b.classList.remove('hurt'); void b.getBoundingClientRect(); b.classList.add('hurt'); const i = b.parentNode.querySelectorAll('.boss-hp i')[R.c - 1]; if (i) i.classList.add('hit'); }
};
