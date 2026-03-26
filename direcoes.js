(function () {
  const DATA = [
    { it: 'A destra', pt: 'À direita' },
    { it: 'A sinistra', pt: 'À esquerda' },
    { it: 'Dritto', pt: 'Em frente' },
    { it: 'Indietro', pt: 'Para trás' },
    { it: 'Vicino', pt: 'Perto' },
    { it: 'Lontano', pt: 'Longe' },
    { it: 'Sopra', pt: 'Acima' },
    { it: 'Sotto', pt: 'Abaixo' },
    { it: 'Davanti', pt: 'Na frente' },
    { it: 'Dietro', pt: 'Atrás' },
    { it: 'All’angolo', pt: 'Na esquina' },
    { it: 'Di fronte', pt: 'Em frente a' },
    { it: 'Accanto a', pt: 'Ao lado de' },
    { it: 'Attraversare', pt: 'Atravessar' },
    { it: 'Girare', pt: 'Virar' }
  ];

  QuizCore.createGame(DATA, {
    title: 'Direções — Italiano → Português',
    rounds: 10
  });
})();