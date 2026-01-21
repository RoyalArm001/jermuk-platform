import { useParams } from "react-router-dom";
import { getByType, typeTitle } from "../utils/data";
import { SectionTitle } from "../components/ui/SectionTitle";
import { PlaceCard } from "../components/cards/PlaceCard";

export default function List() {
  const { type } = useParams();
  const items = getByType(type);

  return (
    <div>
      <SectionTitle title={typeTitle(type)} hint={`${items.length} տեղ`} />
      {items.length === 0 ? (
        <div className="card" style={{ padding: 14 }}>
          <div style={{ fontWeight: 900 }}>Դատարկ է</div>
          <div className="muted" style={{ marginTop: 6 }}>
            Այս բաժնում դեռ տվյալ չկա։
          </div>
        </div>
      ) : (
        <div className="grid">
          {items.map((item) => (
            <PlaceCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
