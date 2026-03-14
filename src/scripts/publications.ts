document.querySelectorAll<HTMLButtonElement>('.view-more-btn[data-pub-target]').forEach(btn => {
  const target = btn.dataset.pubTarget!;
  const label = btn.querySelector<HTMLElement>('.pub-btn-label');
  let expanded = false;

  btn.addEventListener('click', () => {
    expanded = !expanded;
    const defaultVisible = parseInt(btn.dataset.default ?? '2');

    document.querySelectorAll<HTMLElement>(`.pub-entry[data-pub-group="${target}"]`).forEach(el => {
      const idx = parseInt(el.dataset.pubIndex ?? '0');
      if (idx < defaultVisible) return;
      if (expanded) {
        el.classList.remove('pub-hidden');
        el.classList.add('pub-revealing');
        el.addEventListener('animationend', () => el.classList.remove('pub-revealing'), { once: true });
      } else {
        el.classList.add('pub-hidden');
      }
    });

    if (label) label.textContent = expanded ? 'Show less' : `Show ${btn.dataset.extra} more`;
  });
});
