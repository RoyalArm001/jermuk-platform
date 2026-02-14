(() => {
  const photos = [
  "https://cf.bstatic.com/xdata/images/hotel/max1024x768/134256828.jpg?k=146addf3896eac0b801ff5382f48069ee42d6e57b68fb690a481fd952f65a21b&o=",
  "https://cf.bstatic.com/xdata/images/hotel/max500/655384318.jpg?k=c67f530f5bd06c014fa2e73adc72d5df92ad4e3a2fe10016eaea608cfad17b72&o=",
  "https://cf.bstatic.com/xdata/images/hotel/max500/134256829.jpg?k=92d9cade510ff56ea4442585dd1b12c0b14ea789ecf4efd8dabb38b0308dae25&o=",
  "https://cf.bstatic.com/xdata/images/hotel/max300/655394976.jpg?k=3a5fd30dd7059c749b10d66b473a83d7d06ea043822732798fb3febbd64d3a12&o=",
  "https://cf.bstatic.com/xdata/images/hotel/max300/401781772.jpg?k=36dafc586ac3234a6499027e6a222c485deb91c5db024e91ce75153f1de04906&o=",
  "https://cf.bstatic.com/xdata/images/hotel/max300/112660106.jpg?k=0db6eb1351e12de434cff00ec423441d3a6d8362705262e98ba4bc63628ac007&o=",
  "https://cf.bstatic.com/xdata/images/hotel/max300/655385186.jpg?k=fb3a40f8895a9d2716a9d4e1a515ec1781c4a69c31f3b7858b80a77bc04e2041&o="
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
