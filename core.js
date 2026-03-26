// Core de quiz genérico (10 rodadas, feedback visual, pontuação)
(function(){
  function shuffle(arr){ const a = arr.slice(); for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; }
  function pickN(arr,n){ return shuffle(arr).slice(0,n); }

  function buildDistractors(answer, pool, count){
    // Escolhe 'count' traduções diferentes do pool (português) que não sejam a resposta
    const others = shuffle(pool.filter(pt => pt !== answer));
    return others.slice(0, count);
  }

  function createGame(data, opts){
    const TOTAL = (opts && opts.rounds) || 10;
    const title = (opts && opts.title) || 'Quiz';

    const screenStart = document.getElementById('screen-start');
    const screenQuiz  = document.getElementById('screen-quiz');
    const screenEnd   = document.getElementById('screen-end');
    const btnStart    = document.getElementById('btn-start');
    const btnNext     = document.getElementById('btn-next');
    const btnRetry    = document.getElementById('btn-retry');
    const choicesEl   = document.getElementById('choices');
    const termEl      = document.getElementById('term');
    const roundEl     = document.getElementById('round');
    const scoreEl     = document.getElementById('score');
    const progressEl  = document.querySelector('#progress .bar');
    const finalTextEl = document.getElementById('final-text');
    const usedListEl  = document.getElementById('used-list');

    let rounds = [];
    let current = 0;
    let score = 0;
    let autoAdvanceTimer = null;

    function showScreen(which){
      screenStart.classList.remove('active');
      screenQuiz.classList.remove('active');
      screenEnd.classList.remove('active');
      if (which==='start') screenStart.classList.add('active');
      else if (which==='quiz') screenQuiz.classList.add('active');
      else if (which==='end') screenEnd.classList.add('active');
    }

    function start(){
      score = 0; current = 0;
      // seleciona itens únicos
      const selected = pickN(data, Math.min(TOTAL, data.length));
      const poolPT = data.map(x => x.pt);
      rounds = selected.map(item => {
        const distracts = buildDistractors(item.pt, poolPT, 2);
        const options = shuffle([item.pt, ...distracts]);
        return { item, options, answer: item.pt };
      });
      showScreen('quiz');
      render();
    }

    function render(){
      clearTimeout(autoAdvanceTimer);
      btnNext.disabled = true;
      const step = current + 1;
      roundEl.textContent = `Rodada ${step}/${TOTAL}`;
      scoreEl.textContent = `Score: ${score}`;
      progressEl.style.width = `${Math.round((step-1)/TOTAL*100)}%`;

      const r = rounds[current];
      termEl.textContent = r.item.it;
      choicesEl.innerHTML = '';
      r.options.forEach(opt => {
        const li = document.createElement('li');
        li.className = 'choice';
        li.setAttribute('role', 'option');
        li.setAttribute('tabindex', '0');
        li.textContent = opt;
        li.addEventListener('click', () => select(li, r.answer));
        li.addEventListener('keypress', (e)=>{ if(e.key==='Enter'||e.key===' ') select(li, r.answer); });
        choicesEl.appendChild(li);
      });
    }

    function lock(){
      [...choicesEl.children].forEach(li => li.setAttribute('aria-disabled','true'));
    }

    function select(li, correct){
      if (li.getAttribute('aria-disabled')==='true') return;
      const chosen = li.textContent;
      const ok = chosen === correct;
      if (ok){ li.classList.add('correct'); score++; scoreEl.textContent = `Score: ${score}`; }
      else { li.classList.add('wrong'); }
      [...choicesEl.children].forEach(el => { if (el.textContent === correct) el.classList.add('correct'); });
      lock();
      btnNext.disabled = false;
      autoAdvanceTimer = setTimeout(next, 1100);
    }

    function next(){
      clearTimeout(autoAdvanceTimer);
      if (current+1 >= rounds.length) end();
      else { current++; render(); }
    }

    function end(){
      progressEl.style.width = '100%';
      finalTextEl.textContent = `Você acertou ${score} de ${rounds.length}.`;
      usedListEl.innerHTML = '';
      rounds.forEach(r => {
        const li = document.createElement('li');
        li.textContent = `${r.item.it} → ${r.item.pt}`;
        usedListEl.appendChild(li);
      });
      showScreen('end');
    }

    // eventos
    btnStart.addEventListener('click', start);
    btnNext.addEventListener('click', next);
    btnRetry.addEventListener('click', () => showScreen('start'));

    // expõe título (se existir)
    const h1 = document.querySelector('header.topbar h1');
    if (h1 && title) h1.textContent = title;

    // inicia na tela start
    showScreen('start');
  }

  // API global mínima
  window.QuizCore = { createGame };
})();
