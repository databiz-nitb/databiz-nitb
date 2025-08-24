(function(){
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.getElementById('nav-menu');
  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
  function setHeaderScrolled(){ header && header.classList.toggle('scrolled', window.scrollY>4); }
  setHeaderScrolled();
  window.addEventListener('scroll', setHeaderScrolled, { passive: true });
  if (toggle && menu) {
    toggle.addEventListener('click', ()=>{
      const isOpen = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    })
  }
})();
