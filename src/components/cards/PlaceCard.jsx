import { Link } from "react-router-dom";
import { Chip } from "../ui/Chip";
import { formatPriceAMD } from "../../utils/format";

export function PlaceCard({ item }) {
  return (
    <div className="card">
      <Link to={`/place/${item.id}`}>
        <img
          src={item.cover}
          alt={item.title}
          style={{ width: "100%", height: 170, objectFit: "cover", display: "block" }}
          loading="lazy"
        />
      </Link>

      <div style={{ padding: 12 }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
          <div style={{ fontWeight: 900 }}>{item.title}</div>
          <div className="muted">⭐ {item.rating ?? "-"}</div>
        </div>

        <div className="muted" style={{ marginTop: 4, fontSize: 13 }}>
          {item.subtitle}
        </div>

        {item.priceFrom != null ? (
          <div style={{ marginTop: 8, fontWeight: 800 }}>
            սկսած՝ {formatPriceAMD(item.priceFrom)}
          </div>
        ) : null}

        <div className="chips" style={{ marginTop: 10 }}>
          {(item.tags || []).slice(0, 3).map((t) => (
            <Chip key={t}>{t}</Chip>
          ))}
        </div>

        <div style={{ marginTop: 12 }}>
          <Link to={`/place/${item.id}`} className="btn" style={{ display: "inline-flex", alignItems: "center" }}>
            Դիտել
          </Link>
        </div>
      </div>
    </div>
  );
}
