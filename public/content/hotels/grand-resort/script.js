(() => {
  const photos = [
  "https://cf.bstatic.com/xdata/images/hotel/max1024x768/594797184.jpg?k=5b188eb21de5a0aeca10b20454c060c44a6f1352921863d98809790871db73b7&o=",
  "https://cf.bstatic.com/xdata/images/hotel/max500/265743369.jpg?k=aacf00403cf6b93327ba93ac1927bc0412186f0c39a22e162b6b2c05757d88ff&o=",
  "https://cf.bstatic.com/xdata/images/hotel/max500/243900446.jpg?k=778957e2127b400d20fbe5d316165e887f1c2f0d86c007c28137bc17f8311f1a&o=",
  "https://cf.bstatic.com/xdata/images/hotel/max300/594780917.jpg?k=ae8b07992871afaf499acbe87d43b76e960703535c8a3b0cca1112d166419e5d&o=",
  "https://cf.bstatic.com/xdata/images/hotel/max300/330860212.jpg?k=4685cf8e092badd94b7f3360b799673f47eefaf6eadb01852dde8a4233249d4e&o=",
  "https://cf.bstatic.com/xdata/images/hotel/max300/654463229.jpg?k=bd669e0c942f69bb695233e4315df43868c8dea2e4a19ecf8c2bbcda059eebc7&o=",
  "https://cf.bstatic.com/xdata/images/hotel/max300/594989121.jpg?k=78f5746d39bfad21f4f0e7a8a6241eca46a30e9cab711ed3a982ee947a2f41d4&o="
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
