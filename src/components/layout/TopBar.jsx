export function TopBar({ title = "Jermuk Travel" }) {
  return (
    <div className="topbar">
      <div className="topbar-inner">
        <div className="title">{title}</div>
        <div className="muted" title="Search (UI only)">🔎</div>
      </div>
    </div>
  );
}
