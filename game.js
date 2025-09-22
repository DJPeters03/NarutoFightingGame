// ===== Chakra RPS mapping (canonical nature chart)
const BEATS = { wind: 'lightning', lightning: 'earth', earth: 'water', water: 'fire', fire: 'wind' };
const ELEMENTS = ['wind','fire','lightning','water','earth'];

// Map characters with mixed/none chakra into one of 5 elements
const primaryOverride = {
  'Naruto': 'wind', 'Sage Mode Naruto': 'wind', 'Hokage Naruto': 'wind',
  'Sasuke': 'fire', 'EMS Sasuke': 'lightning', 'Rinnegan Sasuke': 'lightning',
  'Sakura': 'earth',
  'Kakashi': 'lightning', 'MS Kakashi': 'lightning',
  'Rock Lee': 'earth', 'Might Guy': 'earth',
  'Neji': 'wind', 'Hinata': 'wind',
  'Shikamaru': 'earth', 'Choji':'earth', 'Ino':'water',
  'Kiba':'earth', 'Shino':'earth', 'Tenten':'fire',
  'Jiraiya':'fire', 'Orochimaru':'earth', 'Tsunade':'earth',
  'Itachi':'fire', 'Kisame':'water', 'Deidara':'earth', 'Sasori':'earth', 'Hidan':'earth',
  'Kakuzu':'lightning', 'Konan':'wind', 'Nagato':'earth',
  'Hashirama Senju':'earth', 'Tobirama Senju':'water', 'Hiruzen Sarutobi':'fire', 'Minato Namikaze':'wind',
  'Gaara':'earth', 'A (Raikage)':'lightning', 'Mei Terumi':'water', 'Ōnoki':'earth',
  'Gaara (Shukaku)':'earth', 'Killer Bee':'lightning', 'Yugito Nii':'fire'
};

function mapToElement(src, primary='earth'){
  if(!src) return primary;
  const s = String(src).toLowerCase();
  if (s.includes('wind')) return 'wind';
  if (s.includes('fire') || s.includes('lava') || s.includes('boil')) return 'fire';
  if (s.includes('lightning')) return 'lightning';
  if (s.includes('water')) return 'water';
  if (s.includes('earth') || s.includes('sand') || s.includes('wood') || s.includes('dust') || s.includes('explosion')) return 'earth';
  return primary;
}

function normalizeRoster(raw){
  return raw.map(row=>{
    const [name, chakra, hp, m1, m2, m3] = row;
    const primary = primaryOverride[name] || mapToElement(chakra);
    const moves = [m1,m2,m3].map(m=>{
      const [label, dmg, mtype] = m;
      const el = mapToElement(mtype, primary);
      return {label, dmg, el};
    });
    return { name, primary, maxhp: hp, hp, moves };
  });
}

const fullRoster = normalizeRoster(narutoCharacters);

// ===== Draft State =====
let yourPicks = [];
let aiPicks = [];
let live = null; // battle state

// ===== DOM =====
const rosterList = document.getElementById('rosterList');
const searchEl = document.getElementById('search');
const yourDraftEl = document.getElementById('yourDraft');
const aiDraftEl = document.getElementById('aiDraft');
const beginBtn = document.getElementById('beginBattle');
const resetDraftBtn = document.getElementById('resetDraft');

const stageDraft = document.getElementById('stageDraft');
const stageBattle = document.getElementById('stageBattle');
const yourTeamEl = document.getElementById('yourTeam');
const aiTeamEl = document.getElementById('aiTeam');
const actorSel = document.getElementById('actorSel');
const moveBtns = document.getElementById('moveBtns');
const targetBtns = document.getElementById('targetBtns');
const logEl = document.getElementById('log');
const endTurnBtn = document.getElementById('endTurn');
const autoBtn = document.getElementById('autoPlay');
const winnerEl = document.getElementById('winner');

// ===== Roster UI =====
function renderRoster(){
  const q = (searchEl.value||'').trim().toLowerCase();
  rosterList.innerHTML = '';
  fullRoster
    .filter(c => {
      if(!q) return true;
      return c.name.toLowerCase().includes(q) || c.primary.includes(q);
    })
    .forEach(c=>{
      const used = yourPicks.find(p=>p.name===c.name) || aiPicks.find(p=>p.name===c.name);
      const div = document.createElement('div'); div.className='card';
      div.innerHTML = `
        <h3>${c.name}</h3>
        <div class="chips">
          <span class="chip">Element: ${c.primary}</span>
          <span class="chip">HP: ${c.maxhp}</span>
        </div>
        <div class="chips">
          ${c.moves.map(m=>`<span class="chip">${m.label} <span style="opacity:.8">(${m.el}, ${m.dmg})</span></span>`).join('')}
        </div>
        <div class="pick">
          <button ${used||yourPicks.length>=3?'disabled':''}>Pick</button>
        </div>
      `;
      div.querySelector('button').onclick = ()=>{
        if(yourPicks.length>=3) return;
        yourPicks.push(structuredClone(c));
        const aiChoice = aiAutoPick();
        if (aiChoice) aiPicks.push(structuredClone(aiChoice));
        updateDraft();
      };
      rosterList.appendChild(div);
    });
}
function aiAutoPick(){
  // Keep drafting slightly sensible (counter pick),
  // but gameplay AI will be fully random per user request.
  const last = yourPicks[yourPicks.length-1];
  if(!last) return rndAvailable();
  const desired = Object.entries(BEATS).find(([k,v])=>v===last.primary)?.[0];
  const pool = fullRoster.filter(c =>
      c.primary===desired &&
      !yourPicks.find(p=>p.name===c.name) &&
      !aiPicks.find(p=>p.name===c.name)
  );
  return (pool[0] || rndAvailable());
}
function rndAvailable(){
  const pool = fullRoster.filter(c =>
    !yourPicks.find(p=>p.name===c.name) &&
    !aiPicks.find(p=>p.name===c.name)
  );
  return pool.length ? pool[Math.floor(Math.random()*pool.length)] : null;
}
function updateDraft(){
  yourDraftEl.textContent = yourPicks.map(p=>p.name).join(', ') || '(none)';
  aiDraftEl.textContent = aiPicks.map(p=>p.name).join(', ') || '(none)';
  beginBtn.disabled = !(yourPicks.length===3 && aiPicks.length===3);
  renderRoster();
}
searchEl.addEventListener('input', renderRoster);
resetDraftBtn.addEventListener('click', ()=>{
  yourPicks = []; aiPicks = []; updateDraft();
});
renderRoster();

beginBtn.addEventListener('click', ()=>{
  stageDraft.style.display='none';
  stageBattle.style.display='block';
  startBattle();
});

// ===== Battle =====
function startBattle(){
  live = {
    turn: 'you',
    you: yourPicks.map(c=>({...structuredClone(c), hp:c.maxhp, alive:true})),
    ai: aiPicks.map(c=>({...structuredClone(c), hp:c.maxhp, alive:true})),
    pending: {actorIdx:0, moveIdx:null, targetIdx:null}
  };
  winnerEl.style.display='none';
  logEl.innerHTML = '';
  appendLog('Battle begins! You go first.');
  renderBattle();
}

function renderBattle(){
  renderSide(yourTeamEl, live.you, true);
  renderSide(aiTeamEl, live.ai, false);

  const youAlive = live.you.some(f=>f.alive);
  const aiAlive = live.ai.some(f=>f.alive);
  if (!youAlive || !aiAlive){
    const msg = youAlive ? 'You win! 🎉' : 'AI wins! 💀';
    winnerEl.textContent = msg;
    winnerEl.style.display='block';
    disableControls(true);
    return;
  }

  // Controls for player's turn
  const yourAlive = live.you.map((f,i)=>({f,i})).filter(x=>x.f.alive);
  actorSel.innerHTML = yourAlive.map(({f,i})=>`<option value="${i}">${f.name} (${f.hp}/${f.maxhp})</option>`).join('');
  // keep selection if possible
  if (!yourAlive.some(x=>x.i===live.pending.actorIdx)) live.pending.actorIdx = yourAlive[0].i;
  actorSel.value = String(live.pending.actorIdx);

  buildMoveButtons();            // <-- ensure jutsu list matches actor
  buildTargetButtons();
  endTurnBtn.disabled = (live.turn!=='you');
}

function renderSide(container, fighters, isYou){
  container.innerHTML = '';
  fighters.forEach((f,idx)=>{
    const div = document.createElement('div'); div.className='fighter';
    const hpPct = Math.max(0, Math.round(100*f.hp/f.maxhp));
    div.innerHTML = `
      <h4>${f.alive ? '' : '💤 '} ${f.name} — <span class="chip">${f.primary}</span></h4>
      <div class="hpbar"><div class="hpfill" style="width:${hpPct}%"></div></div>
      <div class="chips" style="margin-top:6px">
        ${f.moves.map(m=>`<span class="chip">${m.label} (${m.el}, ${m.dmg})</span>`).join('')}
      </div>
    `;
    container.appendChild(div);
  });
}

function buildMoveButtons(){
  moveBtns.innerHTML = '';
  const a = live.you[live.pending.actorIdx];
  a.moves.forEach((m,mi)=>{
    const b = document.createElement('button');
    b.className = 'btn';
    b.textContent = `${m.label}`;
    b.onclick = ()=>{
      live.pending.moveIdx = mi;
      highlightMove(mi);
      maybeEnableEnd();
    };
    moveBtns.appendChild(b);
  });
  highlightMove(live.pending.moveIdx);
}
function highlightMove(mi){
  [...moveBtns.children].forEach((btn,i)=>btn.className = 'btn ' + (i===mi?'primary':''));
}
function buildTargetButtons(){
  targetBtns.innerHTML = '';
  live.ai.forEach((e,ei)=>{
    const b = document.createElement('button');
    b.className = 'btn';
    b.textContent = `${e.name} (${e.hp}/${e.maxhp})`;
    b.disabled = !e.alive;
    b.onclick = ()=>{
      live.pending.targetIdx = ei;
      [...targetBtns.children].forEach(x=>x.className='btn');
      b.className='btn primary';
      maybeEnableEnd();
    };
    targetBtns.appendChild(b);
  });
  // keep highlight if target still valid
  if (live.pending.targetIdx!=null && live.ai[live.pending.targetIdx]?.alive){
    targetBtns.children[live.pending.targetIdx].className = 'btn primary';
  }
}
function maybeEnableEnd(){
  endTurnBtn.disabled = !(live.turn==='you' && live.pending.moveIdx!==null && live.pending.targetIdx!==null);
}
actorSel.addEventListener('change', (e)=>{
  live.pending.actorIdx = +e.target.value;
  live.pending.moveIdx = null;   // reset selected jutsu
  live.pending.targetIdx = null; // reset target
  buildMoveButtons();            // <-- refresh jutsu list for new actor
  buildTargetButtons();
  maybeEnableEnd();
});

function appendLog(s){
  const p = document.createElement('div'); p.textContent = s;
  logEl.appendChild(p);
  logEl.scrollTop = logEl.scrollHeight;
}

function calcMultiplier(attackEl, defendEl){
  if (BEATS[attackEl] === defendEl) return 1.5; // advantage
  if (BEATS[defendEl] === attackEl) return 0.75; // disadvantaged
  return 1.0;
}

function applyMove(attacker, defender, move){
  if (move.dmg < 0){
    const heal = Math.abs(move.dmg);
    const before = attacker.hp;
    attacker.hp = Math.min(attacker.maxhp, attacker.hp + heal);
    appendLog(`${attacker.name} uses ${move.label} and heals ${attacker.hp - before} HP.`);
    return;
  }
  const mult = calcMultiplier(move.el, defender.primary);
  const raw = move.dmg;
  const dmg = Math.max(1, Math.round(raw * mult));
  defender.hp -= dmg;
  appendLog(`${attacker.name} uses ${move.label} on ${defender.name} for ${dmg} damage (${move.el} vs ${defender.primary}, x${mult.toFixed(2)}).`);
  if (defender.hp <= 0){
    defender.hp = 0; defender.alive = false;
    appendLog(`${defender.name} is defeated!`);
  }
}

// ====== RANDOM AI (moves & selections) ======
function pickRandomAlive(arr){
  const alive = arr.map((f,i)=>({f,i})).filter(x=>x.f.alive);
  if (!alive.length) return null;
  return alive[Math.floor(Math.random()*alive.length)];
}

endTurnBtn.addEventListener('click', ()=>{
  if (live.turn!=='you') return;
  const a = live.you[live.pending.actorIdx];
  if (!a || !a.alive) return;
  const m = a.moves[live.pending.moveIdx];
  const d = live.ai[live.pending.targetIdx];
  if (!m || !d || !d.alive) return;

  applyMove(a, d, m);
  live.turn = 'ai';
  renderBattle();
  setTimeout(aiTurn, 450);
});

function aiTurn(){
  if (!live) return;
  if (!live.ai.some(f=>f.alive) || !live.you.some(f=>f.alive)) { renderBattle(); return; }

  const actor = pickRandomAlive(live.ai);
  const target = pickRandomAlive(live.you);
  if (!actor || !target) { renderBattle(); return; }
  const moves = actor.f.moves;
  const move = moves[Math.floor(Math.random()*moves.length)];

  applyMove(actor.f, target.f, move);
  live.turn = 'you';
  renderBattle();
}

autoBtn.addEventListener('click', ()=>{
  // Let random AI control both sides
  function loop(){
    if (!live) return;
    const youAlive = live.you.some(f=>f.alive);
    const aiAlive = live.ai.some(f=>f.alive);
    if (!youAlive || !aiAlive) { renderBattle(); return; }
    if (live.turn==='you'){
      const actor = pickRandomAlive(live.you);
      const target = pickRandomAlive(live.ai);
      const move = actor.f.moves[Math.floor(Math.random()*actor.f.moves.length)];
      applyMove(actor.f, target.f, move);
      live.turn='ai'; renderBattle();
    } else {
      aiTurn();
    }
    setTimeout(loop, 350);
  }
  loop();
});

// ===== Helpers & init =====
function disableControls(dis){
  actorSel.disabled = dis;
  [...moveBtns.children].forEach(b=>b.disabled=dis);
  [...targetBtns.children].forEach(b=>b.disabled=dis);
  endTurnBtn.disabled = dis;
}

renderRoster();
