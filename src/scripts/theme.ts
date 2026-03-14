const btn  = document.getElementById('theme-toggle');
const sun  = document.getElementById('theme-icon-sun');
const moon = document.getElementById('theme-icon-moon');
const wrap = document.getElementById('theme-icon-wrap');
const html = document.documentElement;

function applyTheme(theme: string) {
  html.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  if (sun && moon) {
    sun.style.display  = theme === 'dark' ? 'block' : 'none';
    moon.style.display = theme === 'dark' ? 'none'  : 'block';
  }
}

applyTheme(html.getAttribute('data-theme') || 'light');

btn?.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  wrap?.classList.add('spinning');
  wrap?.addEventListener('animationend', () => wrap.classList.remove('spinning'), { once: true });
  applyTheme(current === 'dark' ? 'light' : 'dark');
});
