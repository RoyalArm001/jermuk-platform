import { Link } from "react-router-dom";
import { SectionTitle } from "../components/ui/SectionTitle";
import { PlaceCard } from "../components/cards/PlaceCard";
import { CarouselHero } from "../components/ui/CarouselHero";
import { TYPES, getFeatured, typeTitle } from "../utils/data";

export default function Home() {
  const featured = getFeatured();

  return (
    <div>
      <CarouselHero
        items={featured}
        title="Բացահայտիր Ջերմուկը"
        bgImage={(featured[0] && featured[0].cover) ? featured[0].cover : undefined}
        autoMs={10000}
      />

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 14 }}>
        <Link to="/about" className="card" style={{ padding: 12, flex: "1 1 140px" }}>
          <div style={{ fontWeight: 900 }}>Մեր մասին</div>
          <div className="muted" style={{ marginTop: 6, fontSize: 13 }}>Կարճ ինֆո</div>
        </Link>
        <Link to="/contact" className="card" style={{ padding: 12, flex: "1 1 140px" }}>
          <div style={{ fontWeight: 900 }}>Կապ</div>
          <div className="muted" style={{ marginTop: 6, fontSize: 13 }}>091 733 633</div>
        </Link>
      </div>

      <SectionTitle title="Բաժիններ" hint="Ընտրիր կատեգորիա" />
      <div className="grid">
        {TYPES.map((t) => (
          <Link key={t} to={`/list/${t}`} className="card" style={{ padding: 14 }}>
            <div style={{ fontWeight: 900 }}>{typeTitle(t)}</div>
            <div className="muted" style={{ marginTop: 6, fontSize: 13 }}>Դիտել ցուցակը</div>
          </Link>
        ))}
      </div>

      <div style={{ height: 16 }} />

      <SectionTitle title="Առաջարկվող" hint="Ամենապահանջվածը" />
      <div className="grid">
        {featured.map((item) => (
          <PlaceCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
