(function () {
  const FRENCH_LOCALE = 'fr-FR';

  function getFrenchVoice() {
    const voices = window.speechSynthesis.getVoices();
    return voices.find(voice => voice.lang.toLowerCase() === 'fr-fr')
      || voices.find(voice => voice.lang.toLowerCase().startsWith('fr-fr-'));
  }

  function speak(text) {
    if (!('speechSynthesis' in window)) return;

    const voice = getFrenchVoice();
    if (!voice) {
      window.alert('A voz francesa (França) não está instalada neste dispositivo. Ative uma voz fr-FR nas configurações de fala do sistema e tente novamente.');
      return;
    }

    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = FRENCH_LOCALE;
    utter.voice = voice;
    window.speechSynthesis.speak(utter);
  }

  function createButton(text) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'audio-button';
    button.setAttribute('aria-label', `Ouvir: ${text}`);
    button.title = 'Ouvir em francês';
    button.textContent = '\u{1F50A}';
    button.addEventListener('click', (event) => {
      event.stopPropagation();
      speak(text);
    });
    return button;
  }

  window.QuizSpeech = { speak, createButton };
})();