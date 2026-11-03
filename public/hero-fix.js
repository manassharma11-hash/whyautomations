(function () {
  const mount = () => {
    const frame = document.querySelector('iframe[src*="cloudflarestream"]');
    if (!frame || frame.dataset.brandReplaced) return false;

    frame.dataset.brandReplaced = 'true';
    frame.style.display = 'none';
    const panel = frame.parentElement;
    if (!panel || panel.querySelector('[data-whyautomations-hero]')) return false;

    const hero = document.createElement('div');
    hero.dataset.whyautomationsHero = 'true';
    hero.style.cssText = 'position:absolute;inset:0;display:flex;align-items:center;justify-content:center;overflow:hidden;background:radial-gradient(circle at 50% 42%,#333 0%,#161616 42%,#0b0b0b 100%);color:#fff;font-family:Arial,sans-serif;';
    hero.innerHTML = '<div style="position:absolute;width:min(72vw,720px);height:min(72vw,720px);border:1px solid rgba(255,255,255,.18);border-radius:50%;animation:whyautomations-spin 18s linear infinite"></div><div style="position:absolute;width:min(46vw,460px);height:min(46vw,460px);border:1px solid rgba(255,255,255,.22);border-radius:50%;animation:whyautomations-spin 12s linear infinite reverse"></div><div style="position:relative;text-align:center;padding:24px"><div style="font-size:clamp(2.2rem,8vw,8rem);font-weight:900;letter-spacing:-.08em;line-height:.9">WHY<br>AUTOMATIONS</div><div style="margin-top:18px;font-size:clamp(.65rem,1.1vw,1rem);letter-spacing:.28em;text-transform:uppercase;opacity:.65">Creative, product &amp; growth studio</div></div>';
    const style = document.createElement('style');
    style.textContent = '@keyframes whyautomations-spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}';
    document.head.appendChild(style);
    panel.appendChild(hero);
    return true;
  };

  const observeRoot = document.body || document.documentElement;
  if (observeRoot && window.MutationObserver) {
    const observer = new MutationObserver(() => {
      if (mount()) observer.disconnect();
    });
    observer.observe(observeRoot, { childList: true, subtree: true });
  }
  mount();
})();
