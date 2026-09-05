(function () {
  const FIRST_L = 60;
  const LEVEL_SIZE = 5;
  const LEVEL_COUNT = 12;
  const levels = Array.from({ length: LEVEL_COUNT }, () => []);

  window.F4_ROWS.forEach(row => {
    const level = Math.floor((row.l - FIRST_L) / LEVEL_SIZE);
    if (level >= 0 && level < LEVEL_COUNT) {
      levels[level].push({ fr: row.fr, pt: row.pt });
    }
  });

  window.F4_DATA_READY = Promise.resolve(levels);
})();