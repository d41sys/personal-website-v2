const dot = document.getElementById('cursor-dot');
if (dot && !window.matchMedia('(pointer: coarse)').matches) {
  let rx = 0, ry = 0, tx = 0, ty = 0;

  document.addEventListener('mousemove', e => {
    tx = e.clientX;
    ty = e.clientY;
    if (!dot.classList.contains('cd-visible')) dot.classList.add('cd-visible');
  }, { passive: true });

  document.addEventListener('mouseleave', () => dot.classList.remove('cd-visible'));

  document.addEventListener('mouseover', e => {
    if ((e.target as Element).closest('a, button, .tag, .tl-row, .pub-entry, .flat-row, .peer-row, [role="button"]')) {
      dot.classList.add('cd-hover');
    }
  });

  document.addEventListener('mouseout', e => {
    if ((e.target as Element).closest('a, button, .tag, .tl-row, .pub-entry, .flat-row, .peer-row, [role="button"]')) {
      dot.classList.remove('cd-hover');
    }
  });

  function loop() {
    rx += (tx - rx) * 0.18;
    ry += (ty - ry) * 0.18;
    dot.style.transform = `translate(${rx}px, ${ry}px)`;
    requestAnimationFrame(loop);
  }
  loop();
}
