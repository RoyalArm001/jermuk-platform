import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="card" style={{ padding: 14 }}>
      <div style={{ fontWeight: 900 }}>404</div>
      <div className="muted" style={{ marginTop: 6 }}>
        Էջը չի գտնվել։
      </div>
      <div style={{ marginTop: 12 }}>
        <Link to="/" className="btn" style={{ display: "inline-flex", alignItems: "center" }}>
          Գլխավոր
        </Link>
      </div>
    </div>
  );
}
