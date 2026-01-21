import { useParams } from "react-router-dom";
import { getById } from "../utils/data";
import { Slider } from "../components/ui/Slider";
import { Chip } from "../components/ui/Chip";
import { Button } from "../components/ui/Button";

export default function Place() {
  const { id } = useParams();
  const item = getById(id);

  if (!item) {
    return (
      <div className="card" style={{ padding: 14 }}>
        <div style={{ fontWeight: 900 }}>Չգտնվեց</div>
        <div className="muted" style={{ marginTop: 6 }}>
          Այս տեղը գոյություն չունի։
        </div>
      </div>
    );
  }

  return (
    <div>
      <Slider images={item.gallery || [item.cover].filter(Boolean)} />

      <div className="card" style={{ padding: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
          <div style={{ fontWeight: 1000, fontSize: 18 }}>{item.title}</div>
          <div className="muted">⭐ {item.rating ?? "-"}</div>
        </div>

        <div className="muted" style={{ marginTop: 6 }}>
          {item.subtitle}
        </div>
                <div className="muted" style={{ marginTop: 10 }}>
          📍 {String(item.address || 'Ջերմուկ, Հայաստան').startsWith('http') ? 'Ջերմուկ, Հայաստան' : item.address}
          {item?._meta?.map ? (
            <>
              {" "}
              •{" "}
              <a href={item._meta.map} target="_blank" rel="noreferrer" style={{ color: "inherit", textDecoration: "underline" }}>
                Քարտեզ
              </a>
            </>
          ) : null}
        </div>


        <div className="chips" style={{ marginTop: 12 }}>
          {(item.tags || []).map((t) => (
            <Chip key={t}>{t}</Chip>
          ))}
        </div>

        <div style={{ marginTop: 12, lineHeight: 1.5 }}>{item.description}</div>

        <div style={{ marginTop: 14 }}>
          <Button onClick={() => alert("Phase 1: UI only")}>Զանգել</Button>
        </div>
      </div>
    </div>
  );
}
