
// Quiz de passato prossimo (lui, masc. sing.) com alternativas menos óbvias
const VERBS = [
  { inf: 'essere', pp: 'lui è stato' },
  { inf: 'avere', pp: 'lui ha avuto' },
  { inf: 'andare', pp: 'lui è andato' },
  { inf: 'fare', pp: 'lui ha fatto' },
  { inf: 'dire', pp: 'lui ha detto' },
  { inf: 'vedere', pp: 'lui ha visto' },
  { inf: 'venire', pp: 'lui è venuto' },
  { inf: 'diventare', pp: 'lui è diventato' },
  { inf: 'ritornare', pp: 'lui è ritornato' },
  { inf: 'prendere', pp: 'lui ha preso' },
  { inf: 'mettere', pp: 'lui ha messo' },
  { inf: 'potere', pp: 'lui ha potuto' },
  { inf: 'volere', pp: 'lui ha voluto' },
  { inf: 'dovere', pp: 'lui ha dovuto' },
  { inf: 'sapere', pp: 'lui ha saputo' },
  { inf: 'leggere', pp: 'lui ha letto' },
  { inf: 'bere', pp: 'lui ha bevuto' },
  { inf: 'scrivere', pp: 'lui ha scritto' },
  { inf: 'ricevere', pp: 'lui ha ricevuto' },
  { inf: 'conoscere', pp: 'lui ha conosciuto' },
  { inf: 'credere', pp: 'lui ha creduto' },
  { inf: 'tenere', pp: 'lui ha tenuto' },
  { inf: 'ottenere', pp: 'lui ha ottenuto' },
  { inf: 'imparare', pp: 'lui ha imparato' },
  { inf: 'capire', pp: 'lui ha capito' },
  { inf: 'aprire', pp: 'lui ha aperto' },
  { inf: 'scoprire', pp: 'lui ha scoperto' },
  { inf: 'offrire', pp: 'lui ha offerto' },
  { inf: 'soffrire', pp: 'lui ha sofferto' },
  { inf: 'vivere', pp: 'lui ha vissuto' },
  { inf: 'correre', pp: 'lui ha corso' },
  { inf: 'bisognare', pp: 'lui è bisognato' },
  { inf: 'piovere', pp: 'lui ha piovuto' },
  { inf: 'arrivare', pp: 'lui è arrivato' },
  { inf: 'partire', pp: 'lui è partito' },
  { inf: 'entrare', pp: 'lui è entrato' },
  { inf: 'uscire', pp: 'lui è uscito' },
  { inf: 'rientrare', pp: 'lui è rientrato' },
  { inf: 'restare', pp: 'lui è restato' },
  { inf: 'cadere', pp: 'lui è caduto' },
  { inf: 'nascere', pp: 'lui è nato' },
  { inf: 'morire', pp: 'lui è morto' },
  { inf: 'sedere', pp: 'lui ha seduto' },
  { inf: 'dormire', pp: 'lui ha dormito' },
  { inf: 'ridere', pp: 'lui ha riso' },
  { inf: 'servire', pp: 'lui ha servito' },
  { inf: 'sentire', pp: 'lui ha sentito' },
  { inf: 'seguire', pp: 'lui ha seguito' },
  { inf: 'produrre', pp: 'lui ha prodotto' },
  { inf: 'tradurre', pp: 'lui ha tradotto' },
  { inf: 'permettere', pp: 'lui ha permesso' },
  { inf: 'promettere', pp: 'lui ha promesso' },
  { inf: 'avvertire', pp: 'lui ha avvertito' },
  { inf: 'mantenere', pp: 'lui ha mantenuto' },
  { inf: 'sostenere', pp: 'lui ha sostenuto' },
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

function swapAux(pp) {
  if (/^lui\s+ha\s+/i.test(pp)) return pp.replace(/^lui\s+ha\s+/i, 'lui è ');
  if (/^lui\s+è\s+/i.test(pp)) return pp.replace(/^lui\s+è\s+/i, 'lui ha ');
  return pp;
}

function guessRegularParticiple(inf) {
  if (inf.endsWith('are')) return inf.slice(0, -3) + 'ato';
  if (inf.endsWith('ere')) return inf.slice(0, -3) + 'uto';
  if (inf.endsWith('ire')) return inf.slice(0, -3) + 'ito';
  return inf;
}

function corruptParticiple(form) {
  const m = form.match(/^(lui\s+(?:ha|è)\s+)(.+)$/i);
  if (!m) return form;
  const aux = m[1];
  const part = m[2];
  const variants = new Set();
  variants.add(stripDiacritics(part));
  variants.add(part.replace(/o$/i, 'a'));
  variants.add(part.replace(/i$/i, 'e'));
  variants.add(part.replace(/u$/i, 'o'));
  variants.add(part.replace(/ato$/i, 'are'));
  variants.add(part.replace(/uto$/i, 'ere'));
  variants.add(part.replace(/ito$/i, 'ire'));
  const arr = [...variants].filter(v => v && v !== part);
  if (!arr.length) return form;
  const pick = arr[Math.floor(Math.random() * arr.length)];
  return aux + pick;
}

function verbTakesEssere(inf) {
  return /^(andare|venire|diventare|ritornare|arrivare|partire|entrare|uscire|rientrare|restare|cadere|nascere|morire)$/.test(inf);
}

function plausibleDistractors(verb, allVerbs) {
  const distractors = new Set();

  // 1) Trocar auxiliar
  distractors.add(swapAux(verb.pp));

  // 2) Regularizar pelo infinitivo com auxiliar presumido
  const reg = `lui ${verbTakesEssere(verb.inf) ? 'è' : 'ha'} ${guessRegularParticiple(verb.inf)}`;
  if (reg !== verb.pp) distractors.add(reg);

  // 3) Corrupção do particípio
  distractors.add(corruptParticiple(verb.pp));

  // 4) Uma resposta correta de outro verbo (mantém variedade)
  const other = allVerbs.filter(v => v.inf !== verb.inf);
  if (other.length) distractors.add(other[Math.floor(Math.random() * other.length)].pp);

  distractors.delete(verb.pp);
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
  const options = shuffle([verb.pp, ...distracts]);
  return { verb, options, answer: verb.pp };
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
    li.textContent = `${r.verb.inf} → ${r.verb.pp}`;
    usedListEl.appendChild(li);
  });
  showScreen('end');
}
