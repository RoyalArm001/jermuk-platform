export default function About() {
  return (
    <div className="card" style={{ padding: 14, lineHeight: 1.6 }}>
      <div style={{ fontWeight: 1000, fontSize: 18 }}>Մեր մասին</div>

      <div className="muted" style={{ marginTop: 6 }}>
        Jermuk Travel — mobile-first հարթակ՝ Ջերմուկի հյուրանոցներ, վարձու տներ, տեսարժան վայրեր և ծառայություններ արագ գտնելու համար։
      </div>

      <div style={{ marginTop: 12 }}>
        Այս կայքը շարունակաբար թարմացվում է։ Մանրամասների համար կարող եք կապվել մեզ հետ։
      </div>

      <div style={{ marginTop: 12 }} className="muted">
        Օրական այցելություններ՝ <b>Demo</b> (վ1.1-ում՝ ժամանակավոր ցուցադրում)
      </div>

      <div style={{ marginTop: 12 }} className="muted">
        📍 Ջերմուկ, Հայաստան
      </div>
    </div>
  );
}
