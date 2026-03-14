document.querySelectorAll<HTMLButtonElement>('.collapse-btn').forEach(btn => {
  const panel = document.getElementById(btn.dataset.details!);
  const label = btn.querySelector<HTMLElement>('.collapse-label');
  if (!panel || !label) return;

  let open = false;
  btn.addEventListener('click', () => {
    open = !open;
    panel.classList.toggle('is-open', open);
    label.textContent = open ? '− details' : '+ details';
  });
});
