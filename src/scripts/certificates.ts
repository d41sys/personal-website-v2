const container = document.getElementById('cert-list') as HTMLElement | null;
const prevBtn   = document.getElementById('cert-prev') as HTMLButtonElement | null;
const nextBtn   = document.getElementById('cert-next') as HTMLButtonElement | null;
const indicator = document.getElementById('cert-page-indicator');

if (container && prevBtn && nextBtn && indicator) {
  const items      = Array.from(container.querySelectorAll<HTMLElement>('.cert-row'));
  const perPage    = parseInt(container.dataset.perPage ?? '3');
  const totalPages = Math.ceil(items.length / perPage);
  let page = 0;

  function showPage() {
    items.forEach((el, i) => {
      el.classList.toggle('cert-hidden', i < page * perPage || i >= (page + 1) * perPage);
    });
    indicator.textContent = `${String(page + 1).padStart(2, '0')} / ${String(totalPages).padStart(2, '0')}`;
    prevBtn!.disabled = page === 0;
    nextBtn!.disabled = page === totalPages - 1;
  }

  function goTo(next: number) {
    // Fade out
    container.classList.add('cert-paging');
    setTimeout(() => {
      page = next;
      showPage();
      // Fade in on next frame so browser paints hidden→visible first
      requestAnimationFrame(() => container.classList.remove('cert-paging'));
    }, 180);
  }

  prevBtn.addEventListener('click', () => { if (page > 0)              goTo(page - 1); });
  nextBtn.addEventListener('click', () => { if (page < totalPages - 1) goTo(page + 1); });

  showPage();
}
