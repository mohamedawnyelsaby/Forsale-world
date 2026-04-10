import COLORS from "../constants/colors";

export default function RestaurantCard({ r, isFav, onFav, onPress, dark }) {
  const card = dark ? "#1C1C1C" : COLORS.white;
  const border = dark ? "rgba(255,255,255,.08)" : "#EBEBEB";
  const text = dark ? "#F0F0F0" : COLORS.text;
  const muted = dark ? "#999" : COLORS.textMuted;
  const gray = dark ? "#555" : "#AAA";

  return (
    <div
      onClick={onPress}
      style={{
        background: card,
        borderRadius: 16,
        overflow: "hidden",
        border: `1px solid ${border}`,
        cursor: "pointer",
        position: "relative",
        marginBottom: 12,
      }}
    >
      <div
        style={{
          height: 120,
          background: r.bg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 54,
          position: "relative",
        }}
      >
        {r.image}
        {!r.open && (
          <div
            style={{
              position: "absolute", inset: 0,
              background: "rgba(0,0,0,0.45)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <span style={{ background: "#fff", color: "#333", fontWeight: 700, fontSize: 12, padding: "5px 14px", borderRadius: 20 }}>
              مغلق حالياً
            </span>
          </div>
        )}
        {r.offer && (
          <div style={{ position: "absolute", top: 10, right: 10, background: r.offerColor || COLORS.primary, color: "#fff", fontSize: 9, fontWeight: 700, borderRadius: 8, padding: "3px 8px" }}>
            {r.offer}
          </div>
        )}
        <button
          onClick={(e) => { e.stopPropagation(); onFav(); }}
          style={{ position: "absolute", top: 10, left: 10, background: "#fff", border: "none", borderRadius: "50%", width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 14 }}
        >
          {isFav ? "❤️" : "🤍"}
        </button>
      </div>
      <div style={{ padding: "10px 12px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 3 }}>
          <span style={{ fontWeight: 700, fontSize: 14, color: text }}>{r.name}</span>
          <span style={{ fontSize: 12, color: COLORS.star }}>★ {r.rating} <span style={{ color: gray }}>({r.reviews.toLocaleString()})</span></span>
        </div>
        <div style={{ fontSize: 11, color: muted, marginBottom: 6 }}>{r.category}</div>
        <div style={{ display: "flex", gap: 10, fontSize: 11, color: gray }}>
          <span>⏱ {r.time} دق</span>
          <span>🛵 {r.fee}</span>
          <span>📦 {r.minOrder}</span>
        </div>
      </div>
    </div>
  );
}
