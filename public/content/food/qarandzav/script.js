(() => {
  const DATA = {
  "phone": "+37493262544",
  "whatsapp": "37493262544",
  "map": "https://www.google.com/maps/search/?api=1&query=Qarandzav%20Restaurant%2C%20Jermuk%2C%20Barekamutyan",
  "facebook": "https://www.facebook.com/qarandzav.restoran/",
  "gallery": [
    "https://img.p.mapq.st/?q=75&url=https%3A%2F%2Fmedia-cdn.tripadvisor.com%2Fmedia%2Fphoto-o%2F1b%2F9e%2Fee%2F84%2Fqarandzav-restaurant.jpg%3Fw%3D3840",
    "https://img.p.mapq.st/?q=75&url=https%3A%2F%2Fmedia-cdn.tripadvisor.com%2Fmedia%2Fphoto-o%2F1b%2Fe7%2F46%2F5a%2Fphoto2jpg.jpg%3Fw%3D3840",
    "https://img.p.mapq.st/?q=75&url=https%3A%2F%2Fmedia-cdn.tripadvisor.com%2Fmedia%2Fphoto-o%2F1b%2Fe7%2F46%2F5d%2Fphoto5jpg.jpg%3Fw%3D3840",
    "https://img.p.mapq.st/?q=75&url=https%3A%2F%2Fmedia-cdn.tripadvisor.com%2Fmedia%2Fphoto-o%2F1c%2F06%2Fd2%2F4d%2Fimg-20200918-130344-largejpg.jpg%3Fw%3D3840",
    "https://img.p.mapq.st/?q=75&url=https%3A%2F%2Fmedia-cdn.tripadvisor.com%2Fmedia%2Fphoto-o%2F1c%2F06%2Fd2%2F4c%2Fimg-20200918-130341-largejpg.jpg%3Fw%3D3840",
    "https://img.p.mapq.st/?q=75&url=https%3A%2F%2Fmedia-cdn.tripadvisor.com%2Fmedia%2Fphoto-o%2F18%2F8e%2F6f%2F8a%2Fcaption.jpg%3Fw%3D3840",
    "https://img.p.mapq.st/?q=75&url=https%3A%2F%2Fmedia-cdn.tripadvisor.com%2Fmedia%2Fphoto-o%2F18%2F8e%2F76%2F08%2Fcaption.jpg%3Fw%3D3840",
    "https://img.p.mapq.st/?q=75&url=https%3A%2F%2Fmedia-cdn.tripadvisor.com%2Fmedia%2Fphoto-o%2F18%2F8e%2F6c%2F13%2Fcaption.jpg%3Fw%3D3840",
    "https://img.p.mapq.st/?q=75&url=https%3A%2F%2Fmedia-cdn.tripadvisor.com%2Fmedia%2Fphoto-o%2F18%2Fe5%2Fd7%2F3b%2Fcaption.jpg%3Fw%3D3840"
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
