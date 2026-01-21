import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * CarouselHero (v1.4.1)
 * - Big background image
 * - Cards appear on the right side like the reference video
 * - Auto-rotate every `autoMs` (default 10s)
 * - Tap/click: first activates card, second opens details
 */
export function CarouselHero({
  items = [],
  title = "Բացահայտիր Ջերմուկը",
  bgImage,
  autoMs = 10000
}) {
  const navigate = useNavigate();
  const data = useMemo(() => (Array.isArray(items) ? items.filter(Boolean) : []), [items]);
  const [active, setActive] = useState(0);
  const pausedRef = useRef(false);

  const canShow = data.length > 0;
  const safeActive = Math.max(0, Math.min(active, data.length - 1));

  const goPrev = () => setActive((v) => (v - 1 + data.length) % data.length);
  const goNext = () => setActive((v) => (v + 1) % data.length);

  useEffect(() => {
    if (!canShow) return;
    if (!autoMs || autoMs < 1500) return;

    const id = setInterval(() => {
      if (pausedRef.current) return;
      setActive((v) => (v + 1) % data.length);
    }, autoMs);

    return () => clearInterval(id);
  }, [autoMs, canShow, data.length]);

  const styleBg = bgImage
    ? { backgroundImage: `linear-gradient(rgba(2,6,23,.70), rgba(2,6,23,.20)), url(${bgImage})` }
    : { backgroundImage: `linear-gradient(135deg, rgba(14,165,168,.55), rgba(2,6,23,.70))` };

  return (
    <div
      className="hero hero-wide"
      style={styleBg}
      onMouseEnter={() => (pausedRef.current = true)}
      onMouseLeave={() => (pausedRef.current = false)}
      onTouchStart={() => (pausedRef.current = true)}
      onTouchEnd={() => (pausedRef.current = false)}
    >
      <div className="hero-inner hero-grid">
        <div className="hero-left">
          <div className="hero-title">{title}</div>
          <div className="hero-sub">Հյուրանոցներ • Տեսարժան վայրեր • Ծառայություններ</div>
          <div className="hero-hint">Քաշիր կամ սեղմիր քարտերի վրա։</div>
        </div>

        {canShow ? (
          <div className="hero-right">
            <div className="carousel carousel-right" aria-label="Featured carousel">
              {data.map((it, i) => {
                const isActive = i === safeActive;
                const isPrev = i === (safeActive - 1 + data.length) % data.length;
                const isNext = i === (safeActive + 1) % data.length;
                const pos = isActive ? "active" : isPrev ? "prev" : isNext ? "next" : "far";

                return (
                  <button
                    key={it.id}
                    className={`c-card ${pos}`}
                    onClick={() => (isActive ? navigate(`/place/${it.id}`) : setActive(i))}
                    aria-label={it.title}
                    type="button"
                  >
                    <div className="c-cover" style={{ backgroundImage: `url(${it.cover})` }} />
                    <div className="c-meta">
                      <div className="c-title">{it.title}</div>
                      <div className="c-small muted">
                        ⭐ {it.rating ?? "-"} • {it.subtitle ?? ""}
                      </div>
                      <div className="c-cta">Դիտել</div>
                    </div>
                  </button>
                );
              })}

              <div className="c-controls c-controls-right">
                <button className="c-btn" type="button" onClick={goPrev} aria-label="Prev">
                  ‹
                </button>
                <button className="c-btn" type="button" onClick={goNext} aria-label="Next">
                  ›
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="card" style={{ padding: 14, marginTop: 12 }}>
            Տվյալներ չկան։ (Demo)
          </div>
        )}
      </div>
    </div>
  );
}
