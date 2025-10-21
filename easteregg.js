// easteregg.js (versió millorada — pega això sobre l'actual)
(function () {
  // ---- CONFIGURACIÓ ----
  // Assegura't que la ruta és correcta respecte a on està index.html
  const IMAGE_PATH = './FOTOS/ESCOLA_DEL_PANIC_2024.png'; // <-- la teva ruta
  // Pots posar la frase amb o sense espais; el codi compara amb i sense espais
  const SECRET_PHRASE = 'escoladelpanic'; // frase sense espais (internament es considera amb i sense espais)
  const MAX_LEN = 40; // buffer màxim; prou gran per a frases llargues

  // Normalitza text: NFD + eliminar diacrítics + lowercase
  function normalizeText(s) {
    try {
      return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    } catch (e) {
      return s.toLowerCase();
    }
  }

  // Normalitzat de la frase secreta: sense diacrítics i sense espais
  const normalizedSecretNoSpaces = normalizeText(SECRET_PHRASE).replace(/\s+/g, '');

  // Precàrrega de la imatge (opcional)
  const pre = new Image();
  pre.src = IMAGE_PATH;

  // Buffer de tecles
  let buffer = '';

  // Fa que l'overlay s'afegeixi en DOMContentLoaded si no existeix
  function ensureOverlayExists() {
    let overlay = document.getElementById('egg-overlay');
    if (!overlay) {
      // si per algun motiu l'html no té l'overlay (defensiu), el creem mínimament
      overlay = document.createElement('div');
      overlay.id = 'egg-overlay';
      overlay.setAttribute('aria-hidden', 'true');
      overlay.setAttribute('role', 'dialog');
      overlay.tabIndex = -1;
      overlay.style.display = 'none';
      overlay.innerHTML = '\
        <div class="egg-content" role="document">\
          <img id="egg-image" src="" alt="Foto túnel del terror" />\
          <div class="egg-caption">Benvingut/da al túnel del terror!</div>\
        </div>\
        <button class="egg-close" id="egg-close" aria-label="Tancar ou de pascua">Tancar ✕</button>';
      document.body.appendChild(overlay);
    }
    return overlay;
  }

  function shouldIgnoreTarget(target) {
    if (!target) return false;
    const tag = target.tagName ? target.tagName.toLowerCase() : '';
    if (tag === 'input' || tag === 'textarea' || tag === 'select') return true;
    if (target.isContentEditable) return true;
    if (target.closest && target.closest('[contenteditable="true"]')) return true;
    return false;
  }

  function onKey(e) {
    // tecla de prova: Ctrl+E obre l'ou (no necessària en producció, útil per provar)
    if (e.ctrlKey && (e.key === 'e' || e.key === 'E')) {
      e.preventDefault();
      return triggerEgg();
    }

    if (shouldIgnoreTarget(e.target)) return;

    const k = e.key;
    if (!k) return;
    // només considerem caràcters imprimibles, espai i Enter
    if (k.length > 1 && k !== ' ' && k !== 'Enter') return;

    const char = (k === 'Enter') ? ' ' : k;
    buffer += char;

    // mantenim buffer raonable per evitar memòria creixent
    if (buffer.length > MAX_LEN) buffer = buffer.slice(-MAX_LEN);

    // Normalitzem el buffer per a la comparació:
    // 1) eliminar diacrítics i minúscules
    // 2) eliminar espais per fer match tant amb espais com sense espais
    const normalizedBufferNoSpaces = normalizeText(buffer).replace(/\s+/g, '');

    // Debug: veuràs a la consola el buffer normalitzat (pots eliminar després)
    console.debug('[EASTER-EGG] buffer:', buffer, '→', normalizedBufferNoSpaces);

    if (normalizedBufferNoSpaces.includes(normalizedSecretNoSpaces)) {
      // Si el secret apareix dins del buffer (per exemple vas escrivint),
      // disparem l'ou
      triggerEgg();
      buffer = ''; // reseteja per evitar re-detecció immediata
    }
  }

  let alreadyShown = false;

  function triggerEgg() {
    const overlay = ensureOverlayExists();
    const img = document.getElementById('egg-image');
    if (alreadyShown) {
      // si ja està obert, no fem res
      return;
    }
    alreadyShown = true;

    if (img) img.src = IMAGE_PATH;
    overlay.classList.add('show');
    overlay.style.display = 'flex';
    overlay.setAttribute('aria-hidden', 'false');
    try { overlay.focus(); } catch (e) {}
  }

  function closeEgg() {
    const overlay = document.getElementById('egg-overlay');
    if (!overlay) return;
    overlay.classList.remove('show');
    overlay.style.display = 'none';
    overlay.setAttribute('aria-hidden', 'true');
    // Permet reactivar després de tancar (petit delay per a transicions)
    setTimeout(() => { alreadyShown = false; }, 300);
  }

  // Event handlers post-DOM ready
  document.addEventListener('DOMContentLoaded', () => {
    const overlay = ensureOverlayExists();
    const closeBtn = document.getElementById('egg-close');

    // Tancar amb click fora del .egg-content
    document.addEventListener('click', function (e) {
      const ov = document.getElementById('egg-overlay');
      if (!ov || !ov.classList.contains('show')) return;
      const content = e.target.closest && e.target.closest('.egg-content');
      if (!content) closeEgg();
    }, true);

    // Botó tancar
    if (closeBtn) closeBtn.addEventListener('click', closeEgg);

    // Esc per tancar
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeEgg();
    });

    // Finalment, escoltem tecles a nivell de document
    document.addEventListener('keydown', onKey, { capture: true });

    // Info a la consola per ajudar-te a debugar
    console.info('[EASTER-EGG] inicialitzat — prova escrivint la frase o prem Ctrl+E per mostrar la imatge de prova.');
  });
})();
