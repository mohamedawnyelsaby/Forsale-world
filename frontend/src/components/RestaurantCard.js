// frontend/src/components/RestaurantCard.js
import { useState } from "react";
import COLORS from "../constants/colors";

export default function RestaurantCard({ r, isFav, onFav, onPress, dark }) {
  const [imgError, setImgError] = useState(false);
  const card   = dark ? "#1C1C1C" : COLORS.white;
  const border = dark ? "rgba(255,255,255,.06)" : "rgba(0,0,0,.06)";
  const text   = dark ? "#F0F0F0" : COLORS.text;
  const muted  = dark ? "#999" : COLORS.textMuted;
  const shadow = dark ? "0 4px 20px rgba(0,0,0,.4)" : "0 4px 20px rgba(0,0,0,.08)";

  return (
    <div
      onClick={onPress}
      style={{
        background: card, borderRadius: 20, overflow: "hidden",
        border: `1px solid ${border}`, cursor: "pointer",
        marginBottom: 16, boxShadow: shadow,
        WebkitTapHighlightColor: "transparent",
      }}
    >
      {/* Photo */}
      <div style={{ height: 160, position: "relative", overflow: "hidden", background: r.bg }}>
        {r.photo && !imgError ? (
          <img
            src={r.photo} alt={r.name}
            onError={() => setImgError(true)}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        ) : (
          <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 64 }}>
            {r.image}
          </div>
        )}

        {/* Gradient overlay */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,.6) 0%, rgba(0,0,0,.1) 50%, transparent 100%)" }} />

        {/* Closed overlay */}
        {!r.open && (
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.55)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ background: "#fff", color: "#333", fontWeight: 700, fontSize: 13, padding: "6px 18px", borderRadius: 20 }}>مغلق حالياً</span>
          </div>
        )}

        {/* Offer badge */}
        {r.offer && (
          <div style={{ position: "absolute", top: 12, right: 12, background: r.offerColor || COLORS.primary, color: "#fff", fontSize: 10, fontWeight: 700, borderRadius: 10, padding: "4px 10px", boxShadow: "0 2px 8px rgba(0,0,0,.25)" }}>
            {r.offer}
          </div>
        )}

        {/* Fav button */}
        <button
          onClick={(e) => { e.stopPropagation(); onFav(); }}
          style={{
            position: "absolute", top: 12, left: 12,
            background: isFav ? COLORS.primary : "rgba(255,255,255,.9)",
            border: "none", borderRadius: "50%", width: 34, height: 34,
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", fontSize: 15, boxShadow: "0 2px 8px rgba(0,0,0,.2)",
            WebkitTapHighlightColor: "transparent",
          }}
        >
          {isFav ? "❤️" : "🤍"}
        </button>

        {/* Name on photo */}
        <div style={{ position: "absolute", bottom: 0, right: 0, left: 0, padding: "10px 14px" }}>
          <div style={{ fontWeight: 800, fontSize: 16, color: "#fff", textShadow: "0 1px 4px rgba(0,0,0,.5)" }}>{r.name}</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,.8)", marginTop: 1 }}>{r.category}</div>
        </div>
      </div>

      {/* Info row */}
      <div style={{ padding: "10px 14px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", gap: 12, fontSize: 12, color: muted }}>
          <span>⏱ {r.time} دق</span>
          <span>🛵 {r.fee}</span>
          <span>📦 {r.minOrder}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4, background: "#FFF8E1", borderRadius: 8, padding: "3px 8px" }}>
          <span style={{ color: COLORS.star, fontSize: 12 }}>★</span>
          <span style={{ fontSize: 12, fontWeight: 700, color: "#7A5F00" }}>{r.rating}</span>
        </div>
      </div>
    </div>
  );
}
