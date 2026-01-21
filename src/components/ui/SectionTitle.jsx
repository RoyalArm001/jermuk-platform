export function SectionTitle({ title, hint }) {
  return (
    <div className="section-title">
      <h2>{title}</h2>
      {hint ? <span>{hint}</span> : null}
    </div>
  );
}
