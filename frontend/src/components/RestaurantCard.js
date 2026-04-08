import COLORS from "../constants/colors";
import StarRating from "./StarRating";

export default function RestaurantCard({ r, isFav, onFav, onPress }) {
  return (
    <div
      onClick={onPress}
      style={{
        background: COLORS.white,
        borderRadius: 16,
        overflow: "hidden",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        cursor: "pointer",
        position: "relative",
      }}
    >
      {/* Image area */}
      <div
        style={{
          height: 130,
          background: r.bg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 64,
          position: "relative",
        }}
      >
        {r.image}

        {!r.open && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.45)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                background: COLORS.white,
                color: COLORS.text,
                fontWeight: 700,
                fontSize: 13,
                padding: "6px 14px",
                borderRadius: 20,
              }}
            >
              مغلق حالياً
            </span>
          </div>
        )}

        {r.offer && (
          <div
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              background: r.offerColor,
              color: COLORS.white,
              fontSize: 10,
              fontWeight: 700,
              borderRadius: 8,
              padding: "3px 8px",
            }}
          >
            {r.offer}
          </div>
        )}

        <button
          onClick={(e) => { e.stopPropagation(); onFav(); }}
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            background: COLORS.white,
            border: "none",
            borderRadius: 50,
            width: 32,
            height: 32,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            fontSize: 16,
            boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
          }}
        >
          {isFav ? "❤️" : "🤍"}
        </button>
      </div>

      {/* Info area */}
      <div style={{ padding: "10px 12px 12px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 4,
          }}
        >
          <span style={{ fontWeight: 700, fontSize: 15, color: COLORS.text }}>
            {r.name}
          </span>
          <StarRating rating={r.rating} />
        </div>
        <div style={{ fontSize: 12, color: COLORS.textMuted, marginBottom: 8 }}>
          {r.category} • ({r.reviews.toLocaleString()} تقييم)
        </div>
        <div style={{ display: "flex", gap: 12, fontSize: 12, color: COLORS.textMuted }}>
          <span>⏱ {r.time} دقيقة</span>
          <span>🛵 {r.fee}</span>
          <span>📦 الحد الأدنى {r.minOrder}</span>
        </div>
      </div>
    </div>
  );
}
