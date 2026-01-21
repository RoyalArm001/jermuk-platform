export default function Contact() {
  const phone = "091733633";
  return (
    <div className="card" style={{ padding: 14, lineHeight: 1.6 }}>
      <div style={{ fontWeight: 1000, fontSize: 18 }}>Կապ</div>

      <div className="muted" style={{ marginTop: 6 }}>
        Եթե ցանկանում եք ավելացնել տվյալներ, թարմացնել ինֆորմացիան կամ համագործակցել՝ կապվեք։
      </div>

      <div style={{ marginTop: 12 }}>
        📍 Քաղաք՝ <b>Ջերմուկ</b>
      </div>
      <div style={{ marginTop: 6 }}>
        📞 Հեռախոս՝ <b>{phone}</b>
      </div>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 14 }}>
        <a className="btn" href={`tel:${phone}`} style={{ display: "inline-flex", alignItems: "center" }}>
          Զանգել
        </a>
        <a
          className="btn"
          href={`https://wa.me/374${phone.replace(/^0+/, "")}`}
          target="_blank"
          rel="noreferrer"
          style={{ display: "inline-flex", alignItems: "center" }}
        >
          WhatsApp
        </a>
      </div>
    </div>
  );
}
