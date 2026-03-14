const btn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  btn?.classList.toggle('is-visible', window.scrollY > 320);
}, { passive: true });

btn?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
