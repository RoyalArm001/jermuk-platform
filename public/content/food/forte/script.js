(() => {
  const DATA = {
    phone: "+37494555800",
    whatsapp: "37494555800",
    map: "https://www.google.com/maps/search/?api=1&query=Forte%20Restaurant%2C%20Jermuk%2C%20Shahumyan%2021",
    facebook: "https://www.facebook.com/fortejermuk/",
    gallery: [
      "https://www.pages.am/images/photo-albums/forte-restaurant/166/20210712_162259-01.jpg",
      "https://www.pages.am/images/photo-albums/forte-restaurant/166/20210710_225846-01.jpg",
      "https://www.pages.am/images/photo-albums/forte-restaurant/166/20210714_000622.jpg",
      "https://www.pages.am/images/photo-albums/forte-restaurant/166/20210710_225644.jpg",
      "https://www.pages.am/images/photo-albums/forte-restaurant/166/20210710_225719.jpg",
      "https://www.pages.am/images/photo-albums/forte-restaurant/167/20210810_141026.jpg",
      "https://www.pages.am/images/photo-albums/forte-restaurant/166/FB_IMG_1625482620389.jpg",
      "https://www.pages.am/images/photo-albums/forte-restaurant/166/FB_IMG_1625482626654.jpg"
    ]
  };

  const hero = document.getElementById("hero");
  if (hero && DATA.gallery[0]) hero.style.backgroundImage = `url('${DATA.gallery[0]}')`;

  const byId = (id) => document.getElementById(id);
  const btnCall = byId("btnCall");
  const btnWA = byId("btnWA");
  const btnMap = byId("btnMap");
  const btnFB = byId("btnFB");
  const chipReserve = byId("chipReserve");
  const chipCall2 = byId("chipCall2");

  if (btnCall) btnCall.href = `tel:${DATA.phone}`;
  if (btnWA) btnWA.href = `https://wa.me/${DATA.whatsapp}`;
  if (btnMap) btnMap.href = DATA.map;
  if (btnFB) btnFB.href = DATA.facebook;
  if (chipCall2) chipCall2.href = `tel:${DATA.phone}`;
  if (chipReserve) {
    const text = "Բարև, ուզում եմ սեղան ամրագրել Forte Restaurant-ում։";
    chipReserve.href = `https://wa.me/${DATA.whatsapp}?text=${encodeURIComponent(text)}`;
  }

  const grid = byId("galleryGrid");
  if (!grid) return;

  const frag = document.createDocumentFragment();
  DATA.gallery.forEach((src, i) => {
    const wrap = document.createElement("div");
    wrap.className = "ph";

    const img = document.createElement("img");
    img.loading = "lazy";
    img.decoding = "async";
    img.alt = `Forte photo ${i + 1}`;
    img.src = src;

    const cap = document.createElement("div");
    cap.className = "cap";
    cap.textContent = `#${i + 1}`;

    wrap.appendChild(img);
    wrap.appendChild(cap);
    frag.appendChild(wrap);
  });
  grid.appendChild(frag);
})();
