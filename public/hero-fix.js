(function () {
  const mount = () => {
    const frame = document.querySelector('iframe[src*="cloudflarestream"]');
    if (!frame || frame.dataset.brandReplaced) return false;

    const panel = frame.parentElement;
    if (!panel) return false;

    frame.dataset.brandReplaced = 'true';
    frame.style.display = 'none';
    if (panel.querySelector('[data-whyautomations-hero]')) return true;

    const hero = document.createElement('div');
    hero.dataset.whyautomationsHero = 'true';
    hero.setAttribute('aria-hidden', 'true');
    hero.style.cssText = [
      'position:absolute',
      'inset:0',
      'overflow:hidden',
      'pointer-events:none',
      'background:radial-gradient(circle at 50% 42%,#242424 0%,#151515 42%,#0b0b0b 100%)'
    ].join(';');
    hero.innerHTML = [
      '<div style="position:absolute;inset:-12%;border:1px solid rgba(255,255,255,.12);border-radius:50%;transform:rotate(-12deg)"></div>',
      '<div style="position:absolute;inset:12%;border:1px solid rgba(255,255,255,.08);border-radius:50%;transform:rotate(18deg)"></div>'
    ].join('');
    panel.appendChild(hero);
    return true;
  };

  const mountWhenReady = () => {
    if (mount() || !window.MutationObserver) return;
    const observer = new MutationObserver(() => {
      if (mount()) observer.disconnect();
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
    window.setTimeout(() => observer.disconnect(), 10000);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountWhenReady, { once: true });
  } else {
    mountWhenReady();
  }
})();
