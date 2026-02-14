(() => {
  const photos = [
  "https://images.trvl-media.com/lodging/91000000/90710000/90701200/90701184/c3f8ab8f.jpg?impolicy=resizecrop&ra=fit&rw=598",
  "https://images.trvl-media.com/lodging/91000000/90710000/90701200/90701184/8b9e2bc4.jpg?impolicy=resizecrop&ra=fit&rw=598",
  "https://images.trvl-media.com/lodging/91000000/90710000/90701200/90701184/46c3bc82.jpg?impolicy=resizecrop&ra=fit&rw=598",
  "https://images.trvl-media.com/lodging/91000000/90710000/90701200/90701184/5e9e1d3e.jpg?impolicy=resizecrop&ra=fit&rw=598",
  "https://images.trvl-media.com/lodging/91000000/90710000/90701200/90701184/5db84fa0.jpg?h=800&impolicy=fcrop&quality=medium&w=1200",
  "https://images.trvl-media.com/lodging/91000000/90710000/90701200/90701184/5e9e1d3e.jpg?impolicy=resizecrop&ra=fit&rw=1200"
];
  const img = document.getElementById('jtGalleryImg');
  const dots = document.getElementById('jtGalleryDots');
  const prev = document.querySelector('.jt-gprev');
  const next = document.querySelector('.jt-gnext');

  let i = 0;

  function renderDots() {
    dots.innerHTML = '';
    photos.forEach((_, idx) => {
      const s = document.createElement('span');
      if (idx === i) s.classList.add('is-active');
      dots.appendChild(s);
    });
  }

  function show(idx) {
    if (!photos.length) return;
    i = (idx + photos.length) % photos.length;
    img.src = photos[i];
    renderDots();
  }

  prev?.addEventListener('click', () => show(i - 1));
  next?.addEventListener('click', () => show(i + 1));

  // Swipe for mobile
  let startX = null;
  img?.addEventListener('touchstart', (e) => {
    startX = e.touches?.[0]?.clientX ?? null;
  }, {passive:true});
  img?.addEventListener('touchend', (e) => {
    const endX = e.changedTouches?.[0]?.clientX ?? null;
    if (startX === null || endX === null) return;
    const dx = endX - startX;
    if (Math.abs(dx) < 35) return;
    if (dx > 0) show(i - 1); else show(i + 1);
  }, {passive:true});

  // Auto-rotate
  setInterval(() => show(i + 1), 8000);

  show(0);
})();
