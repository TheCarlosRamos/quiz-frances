(function () {
  const DATA = [
    // — Frutas —
    { it: 'La mela', pt: 'A maçã' },
    { it: 'La pera', pt: 'A pera' },
    { it: 'L’arancia', pt: 'A laranja' },
    { it: 'La banana', pt: 'A banana' },
    { it: 'L’uva', pt: 'A uva' },
    { it: 'La fragola', pt: 'O morango' },
    { it: 'Il limone', pt: 'O limão' },
    { it: 'Il melone', pt: 'O melão' },
    { it: 'L’ananas', pt: 'O abacaxi' },
    { it: 'La ciliegia', pt: 'A cereja' },

    // — Legumes e verduras —
    { it: 'La patata', pt: 'A batata' },
    { it: 'La cipolla', pt: 'A cebola' },
    { it: 'La carota', pt: 'A cenoura' },
    { it: 'Il pomodoro', pt: 'O tomate' },
    { it: 'La lattuga', pt: 'A alface' },
    { it: 'Il cetriolo', pt: 'O pepino' },
    { it: 'Il peperone', pt: 'O pimentão' },
    { it: 'La zucchina', pt: 'A abobrinha' },
    { it: 'La melanzana', pt: 'A berinjela' },
    { it: 'L’aglio', pt: 'O alho' },

    // — Carnes e proteínas —
    { it: 'La carne', pt: 'A carne' },
    { it: 'Il pollo', pt: 'O frango' },
    { it: 'Il pesce', pt: 'O peixe' },
    { it: 'Il prosciutto', pt: 'O presunto' },
    { it: 'La salsiccia', pt: 'A linguiça' },
    { it: 'L’uovo', pt: 'O ovo' },
    { it: 'Il tonno', pt: 'O atum' },

    // — Laticínios —
    { it: 'Il latte', pt: 'O leite' },
    { it: 'Il burro', pt: 'A manteiga' },
    { it: 'Il formaggio', pt: 'O queijo' },
    { it: 'Lo yogurt', pt: 'O iogurte' },

    // — Massas, pães, cereais —
    { it: 'Il pane', pt: 'O pão' },
    { it: 'La pasta', pt: 'A massa / macarrão' },
    { it: 'La pizza', pt: 'A pizza' },
    { it: 'Il riso', pt: 'O arroz' },
    { it: 'I cereali', pt: 'Os cereais' },

    // — Doces e sobremesas —
    { it: 'Il gelato', pt: 'O sorvete' },
    { it: 'La torta', pt: 'O bolo' },
    { it: 'Il biscotto', pt: 'O biscoito' },

    // — Bebidas —
    { it: 'L’acqua', pt: 'A água' },
    { it: 'Il succo', pt: 'O suco' },
    { it: 'Il caffè', pt: 'O café' }
  ];

  QuizCore.createGame(DATA, {
    title: 'Comidas — Italiano → Português',
    rounds: 10
  });
})();