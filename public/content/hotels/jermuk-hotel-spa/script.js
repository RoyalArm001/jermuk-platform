(() => {
  const photos = [
  "https://cf.bstatic.com/xdata/images/hotel/max1024x768/503449122.jpg?k=c2779d78c6f93bc8d16b182fd6d83d592ce4e2c6fe9f5b190047db5d20fa67f0&o=",
  "https://cf.bstatic.com/xdata/images/hotel/max500/511033906.jpg?k=8d2be4ffcf7c0b19745064b8e0288bbcb9a74f10b6d880d3fd6bf97cfd993cd9&o=",
  "https://cf.bstatic.com/xdata/images/hotel/max500/511035044.jpg?k=0cbeb0b39286ef61199e6867e6137fa270f2c634904ea25d8fc65b2010f0ae4e&o=",
  "https://cf.bstatic.com/xdata/images/hotel/max300/511033563.jpg?k=de3b12ad95e41181b59d27a1a9d5db46260db7f8e22b4ff1ec4dfb77cf0e8b3c&o=",
  "https://cf.bstatic.com/xdata/images/hotel/max300/511033877.jpg?k=a51e6924cbbdcbe9c4f0ec0cba6cf4d214d2a6c36871356d609e07c3b74f9a20&o=",
  "https://cf.bstatic.com/xdata/images/hotel/max300/511033519.jpg?k=4f83801fc0c81cd57b33b0ad7b26acb8f814bf7df5be80f67687c19f1e0f8c7c&o="
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
