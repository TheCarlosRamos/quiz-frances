(function () {
  const DATA = [
    // Cores básicas
    { fr: 'bleu', pt: 'azul' },
    { fr: 'rouge', pt: 'vermelho' },
    { fr: 'jaune', pt: 'amarelo' },
    { fr: 'vert', pt: 'verde' },
    { fr: 'noir', pt: 'preto' },
    { fr: 'blanc', pt: 'branco' },
    { fr: 'gris', pt: 'cinza' },
    { fr: 'marron', pt: 'marrom' },
    { fr: 'orange', pt: 'laranja' },
    { fr: 'rose', pt: 'rosa' },
    { fr: 'violet', pt: 'roxo' },
    { fr: 'beige', pt: 'bege' },

    // Tons metálicos
    { fr: 'argenté', pt: 'prateado' },
    { fr: 'doré', pt: 'dourado' },

    // Tons claros e escuros
    { fr: 'bleu clair', pt: 'azul claro' },
    { fr: 'bleu foncé', pt: 'azul escuro' },
    { fr: 'vert clair', pt: 'verde claro' },
    { fr: 'vert foncé', pt: 'verde escuro' },
    { fr: 'rouge clair', pt: 'vermelho claro' },
    { fr: 'rouge foncé', pt: 'vermelho escuro' },
    { fr: 'gris clair', pt: 'cinza claro' },
    { fr: 'gris foncé', pt: 'cinza escuro' },

    // Outras cores comuns
    { fr: 'turquoise', pt: 'turquesa' },
    { fr: 'violet clair', pt: 'roxo claro' },
    { fr: 'violet foncé', pt: 'roxo escuro' },
    { fr: 'rose clair', pt: 'rosa claro' },
    { fr: 'rose foncé', pt: 'rosa escuro' },

    // Cores mais específicas
    { fr: 'bleu marine', pt: 'azul marinho' },
    { fr: 'bleu pétrole', pt: 'azul petróleo' },
    { fr: 'vert olive', pt: 'verde oliva' },
    { fr: 'vert menthe', pt: 'verde menta' },
    { fr: 'jaune clair', pt: 'amarelo claro' },
    { fr: 'jaune foncé', pt: 'amarelo escuro' },
    { fr: 'marron clair', pt: 'marrom claro' },
    { fr: 'marron foncé', pt: 'marrom escuro' }
  ];

  QuizCore.createGame(DATA, {
    title: 'Cores — Francês → Português',
    rounds: 15
  });
})();
