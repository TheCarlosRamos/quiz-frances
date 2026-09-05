(function () {
  const FIRST_L = 60;
  const LAST_L = 119;
  const LEVEL_SIZE = 5;
  const LEVEL_COUNT = 12;

  function parseF4(text) {
    const levels = Array.from({ length: LEVEL_COUNT }, () => []);
    const rowPattern = /^\|\s*L(\d+)\s*\|\s*(.*?)\s*\|\s*(.*?)\s*\|\s*$/;

    text.split(/\r?\n/).forEach(line => {
      const match = line.match(rowPattern);
      if (!match) return;

      const lesson = Number(match[1]);
      if (lesson < FIRST_L || lesson > LAST_L) return;

      const level = Math.floor((lesson - FIRST_L) / LEVEL_SIZE);
      if (level >= LEVEL_COUNT) return;

      levels[level].push({ fr: match[2], pt: match[3] });
    });

    return levels;
  }

  window.F4_DATA_READY = fetch('F4.txt')
    .then(response => {
      if (!response.ok) throw new Error(`Não foi possível carregar o F4.txt (${response.status}).`);
      return response.text();
    })
    .then(parseF4);
})();