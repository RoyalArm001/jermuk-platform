(() => {
  const photos = [
  "https://cf.bstatic.com/xdata/images/hotel/max1024x768/780548969.jpg?k=ce1c2205d3af3983efeb5f191b8993e3f2cbeafaa2893199bd5195a493e970a2&o=",
  "https://cf.bstatic.com/xdata/images/hotel/max500/653724019.jpg?k=4b95d5353c042f7a30aa6030708049c91fbd2c9574a441628c77ae7013c18aff&o=",
  "https://cf.bstatic.com/xdata/images/hotel/max500/644836030.jpg?k=37141637b7affc54cd75bb3fb34504b0fc3fbfde6bac81656895eb08585ba696&o=",
  "https://cf.bstatic.com/xdata/images/hotel/max300/674083182.jpg?k=83457c61fbc39908e28ca084ebb8d4e52578f752c3251b00b89e07090f7006fd&o=",
  "https://cf.bstatic.com/xdata/images/hotel/max300/640290715.jpg?k=e7850f9233b730ad5b16ac43eeb0a8a4dbb03e3a69c9efeb9ffd349cf2826844&o=",
  "https://cf.bstatic.com/xdata/images/hotel/max300/640268259.jpg?k=88a60e9c19cc0e946cf6ef8d364d47b4e6058f77434ff0cea4b3398aa7595faf&o=",
  "https://cf.bstatic.com/xdata/images/hotel/max300/664891336.jpg?k=45d672b5f7d9c57ec92cf4a724a0615a6fcd121c91483c572b06fcc71b32a125&o="
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
