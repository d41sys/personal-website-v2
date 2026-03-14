// Active nav link highlighting
const links = document.querySelectorAll<HTMLAnchorElement>('.nav-link');
const sections = document.querySelectorAll<HTMLElement>('section[id]');
const mobileLabel = document.getElementById('mobile-section-label');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    links.forEach(l => l.classList.remove('active'));
    const active = document.querySelector<HTMLAnchorElement>(`.nav-link[href="#${entry.target.id}"]`);
    active?.classList.add('active');
    if (mobileLabel) mobileLabel.textContent = active?.textContent ?? '';
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => sectionObserver.observe(s));

// Header background on scroll
const header = document.getElementById('site-header');
const menu = document.getElementById('mobile-nav-menu');
let menuOpen = false;

window.addEventListener('scroll', () => {
  if (window.scrollY > 8) {
    if (!menuOpen) {
      header?.style.setProperty('box-shadow', '0 1px 0 var(--color-border)');
      header?.style.setProperty('backdrop-filter', 'blur(12px)');
      header?.style.removeProperty('background-color');
    }
  } else {
    if (!menuOpen) {
      header?.style.removeProperty('background-color');
      header?.style.removeProperty('backdrop-filter');
      header?.style.removeProperty('box-shadow');
    }
  }
}, { passive: true });

// Mobile menu toggle
const menuBtn = document.getElementById('mobile-nav-btn');
const iconOpen = document.getElementById('mobile-nav-icon-open');
const iconClose = document.getElementById('mobile-nav-icon-close');

function closeMenu() {
  menu?.classList.remove('is-open');
  menuBtn?.setAttribute('aria-expanded', 'false');
  if (iconOpen) iconOpen.style.display = '';
  if (iconClose) iconClose.style.display = 'none';
  menuOpen = false;
}

menuBtn?.addEventListener('click', () => {
  const isOpen = menu?.classList.toggle('is-open');
  menuBtn.setAttribute('aria-expanded', String(isOpen));
  if (iconOpen) iconOpen.style.display = isOpen ? 'none' : '';
  if (iconClose) iconClose.style.display = isOpen ? '' : 'none';
  menuOpen = !!isOpen;

  if (isOpen && window.scrollY <= 8) {
    header?.style.setProperty('backdrop-filter', 'blur(12px)');
    header?.style.setProperty('box-shadow', '0 1px 0 var(--color-border)');
    header?.style.removeProperty('background-color');
  } else if (!isOpen && window.scrollY <= 8) {
    header?.style.removeProperty('backdrop-filter');
    header?.style.removeProperty('box-shadow');
  } else if (isOpen && window.scrollY > 8) {
    header?.style.setProperty('backdrop-filter', 'blur(12px)');
    header?.style.setProperty('box-shadow', '0 1px 0 var(--color-border)');
  } else if (!isOpen && window.scrollY > 8) {
    header?.style.setProperty('backdrop-filter', 'blur(12px)');
  }
});

menu?.querySelectorAll('.mobile-nav-link').forEach(a => {
  a.addEventListener('click', closeMenu);
});
