(function () {
  'use strict';

  var SITE = 'https://whyautomations.vercel.app';
  var pages = {
    '/': ['WhyAutomations | Premium Video Editing, Web Design & Creative Agency', 'WhyAutomations is a multidisciplinary creative agency in India for video, web and app development, brand systems, UGC and performance marketing.'],
    '/about-us': ['About WhyAutomations | Creative Studio in Noida, Delhi', 'Learn about WhyAutomations, a creative studio for brand, product, video and digital experiences in Noida, Delhi.'],
    '/what-we-do': ['Creative Services | Video Editing, Web & App Development', 'Explore WhyAutomations services: video editing, motion design, web and app development, branding, UGC and performance marketing.'],
    '/our-work': ['Our Work | Video, Digital Products, Brand & Growth', 'Explore WhyAutomations client work across video, digital products, brand identity and measurable growth.'],
    '/portfolio-gallery': ['Portfolio Gallery | WhyAutomations Creative Work', 'Browse the WhyAutomations portfolio gallery featuring selected creative, brand and digital work.'],
    '/insights': ['Insights | Marketing, Design & Development Notes', 'Read WhyAutomations insights on video, marketing, design, branding, development and digital products.'],
    '/people': ['Our Team | WhyAutomations Creative Studio', 'Meet the people behind WhyAutomations and the creative, digital and growth work we deliver.'],
    '/join-us': ['Join WhyAutomations | Careers at a Creative Studio', 'Explore opportunities to work with the WhyAutomations creative and digital studio team.'],
    '/contact': ['Contact WhyAutomations | Start a Project', 'Contact WhyAutomations in Noida, Delhi to discuss video, web, app, branding or automation work.'],
    '/areas-we-serve': ['Areas We Serve | WhyAutomations Creative Agency', 'WhyAutomations serves businesses across India with video, web, app, branding and digital growth services.'],
    '/services/video-production': ['Video Editing & Motion Design | WhyAutomations', 'Professional video editing and motion design for brands, campaigns, social content and digital products.'],
    '/services/web-development': ['Web & App Development | WhyAutomations', 'Web and app development for useful, polished digital products built around your business goals.'],
    '/services/logo-design': ['Logo & Brand Identity | WhyAutomations', 'Logo design and brand identity systems that make businesses clear, consistent and memorable.'],
    '/services/performance-marketing': ['Performance Marketing | WhyAutomations', 'Performance marketing and measurable growth support for businesses that want clearer digital results.']
  };

  function setMeta(selector, attr, value) {
    var node = document.head.querySelector(selector);
    if (!node) {
      node = document.createElement('meta');
      var match = selector.match(/\[(name|property)=['"]([^'"]+)/);
      if (match) node.setAttribute(match[1], match[2]);
      document.head.appendChild(node);
    }
    node.setAttribute(attr, value);
  }

  function apply() {
    var path = window.location.pathname.replace(/\/$/, '') || '/';
    var data = pages[path];
    if (!data) return;
    var title = data[0];
    var description = data[1];
    var canonical = SITE + (path === '/' ? '/' : path);
    document.title = title;
    setMeta('meta[name="description"]', 'content', description);
    setMeta('meta[name="robots"]', 'content', 'index, follow, max-image-preview:large');
    setMeta('meta[property="og:type"]', 'content', 'website');
    setMeta('meta[property="og:title"]', 'content', title);
    setMeta('meta[property="og:description"]', 'content', description);
    setMeta('meta[property="og:url"]', 'content', canonical);
    setMeta('meta[property="og:image"]', 'content', SITE + '/logo.png');
    setMeta('meta[name="twitter:title"]', 'content', title);
    setMeta('meta[name="twitter:description"]', 'content', description);
    setMeta('meta[name="twitter:image"]', 'content', SITE + '/logo.png');
    var link = document.head.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = canonical;
    document.querySelectorAll('script[type="application/ld+json"]').forEach(function (script) {
      try {
        var json = JSON.parse(script.textContent);
        if (json && (json['@type'] === 'Organization' || json['@type'] === 'WebSite')) {
          var next = JSON.stringify(json);
          json.url = SITE;
          if (json.logo) json.logo = SITE + '/logo.png';
          next = JSON.stringify(json);
          if (script.textContent !== next) script.textContent = next;
        }
      } catch (_) {}
    });
  }

  function removeDeadPrivacyLink() {
    document.querySelectorAll('a[href="/privacy-policy"]').forEach(function (link) {
      var item = link.closest('li') || link;
      item.remove();
    });
  }

  // Apply metadata once on load and after client-side route changes.  Avoid a
  // document-wide mutation observer here: the app is animation-heavy and a
  // callback for every DOM mutation can cause runaway work in the browser.
  function refresh() {
    window.setTimeout(function () {
      apply();
      removeDeadPrivacyLink();
    }, 0);
  }

  var originalPushState = window.history.pushState;
  var originalReplaceState = window.history.replaceState;
  window.history.pushState = function () {
    var result = originalPushState.apply(this, arguments);
    refresh();
    return result;
  };
  window.history.replaceState = function () {
    var result = originalReplaceState.apply(this, arguments);
    refresh();
    return result;
  };
  window.addEventListener('popstate', refresh);
  refresh();

  // The footer is rendered by React after this script loads.  Observe only
  // body children for the one dead-link cleanup, never the whole document.
  function watchForDeadPrivacyLink() {
    if (!document.body || !window.MutationObserver) return;
    var observer = new MutationObserver(function () {
      if (document.querySelector('a[href="/privacy-policy"]')) {
        removeDeadPrivacyLink();
        observer.disconnect();
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
    window.setTimeout(function () { observer.disconnect(); }, 10000);
  }
  watchForDeadPrivacyLink();
})();
