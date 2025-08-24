(function() {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.getElementById('nav-menu');
  const year = document.getElementById('year');

  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  function setHeaderScrolled() {
    const scrolled = window.scrollY > 4;
    header?.classList.toggle('scrolled', scrolled);
  }
  setHeaderScrolled();
  window.addEventListener('scroll', setHeaderScrolled, { passive: true });

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('open');
      const expanded = isOpen ? 'true' : 'false';
      toggle.setAttribute('aria-expanded', expanded);
    });
    menu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        menu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
})();