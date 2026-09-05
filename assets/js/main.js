(() => {
  const header = document.querySelector('.site-header');
  const progress = document.querySelector('.reading-progress span');
  const article = document.querySelector('.report-content');
  const toggle = document.querySelector('.nav-toggle');
  const mobileNav = document.querySelector('#mobile-nav');
  const navLinks = [...document.querySelectorAll('.report-sidebar a, .mobile-nav a')];
  const headings = [...document.querySelectorAll('.report-content h2[id]')];

  const updateScroll = () => {
    header?.classList.toggle('scrolled', window.scrollY > 16);
    if (!article || !progress) return;
    const start = article.offsetTop - window.innerHeight * 0.35;
    const distance = article.offsetHeight - window.innerHeight * 0.5;
    const pct = Math.max(0, Math.min(1, (window.scrollY - start) / distance));
    progress.style.transform = `scaleX(${pct})`;
  };

  const setActive = () => {
    let current = headings[0]?.id;
    headings.forEach((heading) => {
      if (heading.getBoundingClientRect().top < 180) current = heading.id;
    });
    navLinks.forEach((link) => {
      const active = link.hash === `#${current}`;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  };

  toggle?.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    mobileNav.hidden = open;
    document.body.classList.toggle('nav-open', !open);
  });

  mobileNav?.addEventListener('click', (event) => {
    if (event.target.closest('a')) {
      mobileNav.hidden = true;
      toggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('nav-open');
    }
  });

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateScroll();
        setActive();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  updateScroll();
  setActive();
})();
