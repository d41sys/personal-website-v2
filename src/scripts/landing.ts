function fitLanding() {
  const hero = document.getElementById('top') as HTMLElement | null;
  const news = document.getElementById('news') as HTMLElement | null;
  const nav  = document.querySelector<HTMLElement>('#site-header');

  if (!hero || !news || window.innerWidth <= 640) return;

  const navH  = nav?.offsetHeight ?? 44;
  const newsH = news.offsetHeight;
  const target = window.innerHeight - navH - newsH;

  hero.style.minHeight = `${Math.max(target, 200)}px`;
}

fitLanding();
window.addEventListener('resize', fitLanding);
