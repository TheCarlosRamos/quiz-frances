
// Quiz de passé composé (il, masc. sing.) com alternativas menos óbvias
const VERBS = [
  { inf: 'être', pc: 'il a été' },
  { inf: 'avoir', pc: 'il a eu' },
  { inf: 'aller', pc: 'il est allé' },
  { inf: 'faire', pc: 'il a fait' },
  { inf: 'dire', pc: 'il a dit' },
  { inf: 'voir', pc: 'il a vu' },
  { inf: 'venir', pc: 'il est venu' },
  { inf: 'devenir', pc: 'il est devenu' },
  { inf: 'revenir', pc: 'il est revenu' },
  { inf: 'prendre', pc: 'il a pris' },
  { inf: 'mettre', pc: 'il a mis' },
  { inf: 'pouvoir', pc: 'il a pu' },
  { inf: 'vouloir', pc: 'il a voulu' },
  { inf: 'devoir', pc: 'il a dû' },
  { inf: 'savoir', pc: 'il a su' },
  { inf: 'lire', pc: 'il a lu' },
  { inf: 'boire', pc: 'il a bu' },
  { inf: 'écrire', pc: 'il a écrit' },
  { inf: 'recevoir', pc: 'il a reçu' },
  { inf: 'connaître', pc: 'il a connu' },
  { inf: 'croire', pc: 'il a cru' },
  { inf: 'tenir', pc: 'il a tenu' },
  { inf: 'obtenir', pc: 'il a obtenu' },
  { inf: 'apprendre', pc: 'il a appris' },
  { inf: 'comprendre', pc: 'il a compris' },
  { inf: 'ouvrir', pc: 'il a ouvert' },
  { inf: 'découvrir', pc: 'il a découvert' },
  { inf: 'offrir', pc: 'il a offert' },
  { inf: 'souffrir', pc: 'il a souffert' },
  { inf: 'vivre', pc: 'il a vécu' },
  { inf: 'courir', pc: 'il a couru' },
  { inf: 'falloir', pc: 'il a fallu' },
  { inf: 'pleuvoir', pc: 'il a plu' },
  { inf: 'arriver', pc: 'il est arrivé' },
  { inf: 'partir', pc: 'il est parti' },
  { inf: 'entrer', pc: 'il est entré' },
  { inf: 'sortir', pc: 'il est sorti' },
  { inf: 'rentrer', pc: 'il est rentré' },
  { inf: 'rester', pc: 'il est resté' },
  { inf: 'tomber', pc: 'il est tombé' },
  { inf: 'naître', pc: 'il est né' },
  { inf: 'mourir', pc: 'il est mort' },
  { inf: 'asseoir', pc: 'il a assis' },
  { inf: 'dormir', pc: 'il a dormi' },
  { inf: 'rire', pc: 'il a ri' },
  { inf: 'servir', pc: 'il a servi' },
  { inf: 'sentir', pc: 'il a senti' },
  { inf: 'suivre', pc: 'il a suivi' },
  { inf: 'produire', pc: 'il a produit' },
  { inf: 'traduire', pc: 'il a traduit' },
  { inf: 'permettre', pc: 'il a permis' },
  { inf: 'promettre', pc: 'il a promis' },
  { inf: 'prévenir', pc: 'il a prévenu' },
  { inf: 'maintenir', pc: 'il a maintenu' },
  { inf: 'soutenir', pc: 'il a soutenu' },
];

const TOTAL_ROUNDS = 10;

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function stripDiacritics(s) {
  return s.normalize('NFD').replace(/\p{Diacritic}/gu, '');
}

function swapAux(pc) {
  if (/^il\s+a\s+/i.test(pc)) return pc.replace(/^il\s+a\s+/i, 'il est ');
  if (/^il\s+est\s+/i.test(pc)) return pc.replace(/^il\s+est\s+/i, 'il a ');
  return pc;
}

function guessRegularParticiple(inf) {
  if (inf.endsWith('er')) return inf.slice(0, -2) + 'é';
  if (inf.endsWith('ir')) return inf.slice(0, -2) + 'i';
  if (inf.endsWith('re')) return inf.slice(0, -2) + 'u';
  return inf;
}

function corruptParticiple(form) {
  const m = form.match(/^(il\s+(?:a|est)\s+)(.+)$/i);
  if (!m) return form;
  const aux = m[1];
  const part = m[2];
  const variants = new Set();
  variants.add(stripDiacritics(part)); // remove acentos: dû -> du, né -> ne
  variants.add(part.replace(/u$/i, 'us')); // plural indevido
  variants.add(part.replace(/i$/i, 'is'));
  variants.add(part.replace(/é$/i, 'er')); // confunde com infinitivo
  variants.add(part.replace(/t$/i, 'te')); // acordo indevido
  variants.add(part.replace(/.$/, m => m + 'e')); // acrescenta e
  const arr = [...variants].filter(v => v && v !== part);
  if (!arr.length) return form;
  const pick = arr[Math.floor(Math.random() * arr.length)];
  return aux + pick;
}

function verbTakesEtre(inf) {
  return /^(aller|venir|devenir|revenir|arriver|partir|entrer|sortir|rentrer|rester|tomber|naître|mourir)$/.test(inf);
}

function plausibleDistractors(verb, allVerbs) {
  const distractors = new Set();

  // 1) Trocar auxiliar
  distractors.add(swapAux(verb.pc));

  // 2) Regularizar pelo infinitivo com auxiliar presumido
  const reg = `il ${verbTakesEtre(verb.inf) ? 'est' : 'a'} ${guessRegularParticiple(verb.inf)}`;
  if (reg !== verb.pc) distractors.add(reg);

  // 3) Corrupção do particípio
  distractors.add(corruptParticiple(verb.pc));

  // 4) Uma resposta correta de outro verbo (mantém variedade)
  const other = allVerbs.filter(v => v.inf !== verb.inf);
  if (other.length) distractors.add(other[Math.floor(Math.random() * other.length)].pc);

  distractors.delete(verb.pc);
  return [...distractors];
}

function pickN(arr, n) { return shuffle(arr).slice(0, n); }

let rounds = [];
let current = 0;
let score = 0;
let autoAdvanceTimer = null;

const screenStart = document.getElementById('screen-start');
const screenQuiz  = document.getElementById('screen-quiz');
const screenEnd   = document.getElementById('screen-end');
const btnStart    = document.getElementById('btn-start');
const btnNext     = document.getElementById('btn-next');
const btnRetry    = document.getElementById('btn-retry');
const choicesEl   = document.getElementById('choices');
const infinitiveEl= document.getElementById('infinitive');
const roundEl     = document.getElementById('round');
const scoreEl     = document.getElementById('score');
const progressEl  = document.querySelector('#progress .bar');
const finalTextEl = document.getElementById('final-text');
const usedListEl  = document.getElementById('used-list');

btnStart.addEventListener('click', startGame);
btnNext.addEventListener('click', nextRound);
btnRetry.addEventListener('click', () => { showScreen('start'); });

function showScreen(which) {
  screenStart.classList.remove('active');
  screenQuiz.classList.remove('active');
  screenEnd.classList.remove('active');
  if (which === 'start') screenStart.classList.add('active');
  else if (which === 'quiz') screenQuiz.classList.add('active');
  else if (which === 'end') screenEnd.classList.add('active');
}

function startGame() {
  score = 0; current = 0;
  const selected = pickN(VERBS, TOTAL_ROUNDS);
  rounds = selected.map(v => makeRound(v));
  showScreen('quiz');
  renderRound();
}

function makeRound(verb) {
  const pool = plausibleDistractors(verb, VERBS);
  const distracts = shuffle(pool).slice(0, 2);
  const options = shuffle([verb.pc, ...distracts]);
  return { verb, options, answer: verb.pc };
}

function renderRound() {
  clearTimeout(autoAdvanceTimer);
  btnNext.disabled = true;
  const r = rounds[current];
  const step = current + 1;
  roundEl.textContent = `Rodada ${step}/${TOTAL_ROUNDS}`;
  scoreEl.textContent = `Score: ${score}`;
  progressEl.style.width = `${Math.round((step - 1) / TOTAL_ROUNDS * 100)}%`;

  infinitiveEl.textContent = r.verb.inf;
  choicesEl.innerHTML = '';

  r.options.forEach(opt => {
    const li = document.createElement('li');
    li.className = 'choice';
    li.setAttribute('role', 'option');
    li.setAttribute('tabindex', '0');
    li.textContent = opt;
    li.addEventListener('click', () => selectAnswer(li, r.answer));
    li.addEventListener('keypress', (e) => { if (e.key === 'Enter' || e.key === ' ') selectAnswer(li, r.answer); });
    choicesEl.appendChild(li);
  });
}

function lockChoices() {
  [...choicesEl.children].forEach(li => li.setAttribute('aria-disabled', 'true'));
}

function selectAnswer(li, correct) {
  if (li.getAttribute('aria-disabled') === 'true') return;
  const chosen = li.textContent;
  const isCorrect = chosen === correct;
  if (isCorrect) { li.classList.add('correct'); score++; scoreEl.textContent = `Score: ${score}`; }
  else { li.classList.add('wrong'); }

  [...choicesEl.children].forEach(el => { if (el.textContent === correct) el.classList.add('correct'); });
  lockChoices();
  btnNext.disabled = false;
  autoAdvanceTimer = setTimeout(nextRound, 1100);
}

function nextRound() {
  clearTimeout(autoAdvanceTimer);
  if (current + 1 >= TOTAL_ROUNDS) endGame();
  else { current++; renderRound(); }
}

function endGame() {
  progressEl.style.width = '100%';
  finalTextEl.textContent = `Você acertou ${score} de ${TOTAL_ROUNDS}.`;
  usedListEl.innerHTML = '';
  rounds.forEach(r => {
    const li = document.createElement('li');
    li.textContent = `${r.verb.inf} → ${r.verb.pc}`;
    usedListEl.appendChild(li);
  });
  showScreen('end');
}
