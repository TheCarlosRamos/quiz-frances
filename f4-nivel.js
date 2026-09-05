(function () {
  const requestedLevel = Number(new URLSearchParams(window.location.search).get('nivel')) || 1;
  const level = Math.min(Math.max(requestedLevel, 1), 12);

  window.F4_DATA_READY.then(levels => {
    const data = levels[level - 1];
    const firstL = 60 + (level - 1) * 5;
    const lastL = firstL + 4;
    QuizCore.createGame(data, {
      title: `Treino de Aula 2 — Nível ${level}`,
      rounds: 10
    });

    document.title = `Treino de Aula 2 — Nível ${level}`;
    document.querySelector('.subtitle').textContent = `Francês → Português • L${firstL}–L${lastL}`;
    document.querySelector('#start-title').nextElementSibling.innerHTML =
      `Cada rodada mostra uma palavra ou expressão de <strong>L${firstL} a L${lastL}</strong>.`;
  }).catch(error => {
    document.querySelector('#start-title').nextElementSibling.textContent = error.message;
  });
})();