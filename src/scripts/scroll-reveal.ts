const allReveal = document.querySelectorAll<HTMLElement>('[data-reveal], [data-reveal-left], [data-reveal-scale]');

if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  allReveal.forEach(el => el.classList.add('revealed'));
} else {
  // Stagger siblings within the same parent
  const seen = new Set<Element>();
  allReveal.forEach(el => {
    const parent = el.parentElement;
    if (!parent || seen.has(parent)) return;
    seen.add(parent);
    parent
      .querySelectorAll<HTMLElement>('[data-reveal],[data-reveal-left],[data-reveal-scale]')
      .forEach((sib, i) => { sib.dataset.revealDelay = String(i * 0.08); });
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target as HTMLElement;
      const delay = parseFloat(el.dataset.revealDelay ?? '0');
      setTimeout(() => el.classList.add('revealed'), delay * 1000);
      observer.unobserve(el);
    });
  }, { threshold: 0.07 });

  allReveal.forEach(el => observer.observe(el));
}
