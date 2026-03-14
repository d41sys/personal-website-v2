// Tap-to-expand on touch devices
if (window.matchMedia('(hover: none)').matches) {
  document.querySelectorAll<HTMLElement>('.news-item').forEach(item => {
    item.addEventListener('click', () => item.classList.toggle('is-expanded'));
  });
}

const btn = document.querySelector<HTMLButtonElement>('.news-more-btn');
if (btn) {
  const label = btn.querySelector<HTMLElement>('.news-btn-label');
  let expanded = false;

  btn.addEventListener('click', () => {
    expanded = !expanded;
    const defaultVisible = parseInt(btn.dataset.default ?? '3');

    document.querySelectorAll<HTMLElement>('.news-item[data-news-index]').forEach(el => {
      const idx = parseInt(el.dataset.newsIndex ?? '0');
      if (idx < defaultVisible) return;
      if (expanded) {
        el.classList.remove('news-hidden');
        el.classList.add('news-revealing');
        el.addEventListener('animationend', () => el.classList.remove('news-revealing'), { once: true });
      } else {
        el.classList.add('news-hidden');
      }
    });

    if (label) label.textContent = expanded ? 'Show less' : `Show ${btn.dataset.extra} more`;
  });
}
