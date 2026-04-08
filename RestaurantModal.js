import COLORS from "../constants/colors";
import StarRating from "./StarRating";
import Badge from "./Badge";

export default function RestaurantModal({ r, onClose, isFav, onFav }) {
  const menuSections = [
    {
      name: "الأكثر مبيعاً",
      items: [
        { name: r.name === "برجر هاوس" ? "برجر كلاسيك" : "الطبق الرئيسي", price: "32 ر.س", desc: "وصف الطبق وإضافاته المتاحة", emoji: r.image },
        { name: "وجبة عائلية", price: "89 ر.س", desc: "مناسبة لـ 4 أشخاص مع مشروبات", emoji: "🍽️" },
      ],
    },
    {
      name: "المشروبات",
      items: [
        { name: "مشروب غازي", price: "8 ر.س", desc: "بيبسي، ميرندا، 7 أب", emoji: "🥤" },
        { name: "عصير طازج", price: "15 ر.س", desc: "متنوع حسب الموسم", emoji: "🧃" },
      ],
    },
  ];

  return (
    <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 200, display: "flex", flexDirection: "column", justifyContent: "flex-end" }} onClick={onClose}>
      <div style={{ background: COLORS.white, borderRadius: "24px 24px 0 0", maxHeight: "85%", overflowY: "auto" }} onClick={(e) => e.stopPropagation()}>
        <div style={{ height: 160, background: r.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 72, borderRadius: "24px 24px 0 0", position: "relative" }}>
          {r.image}
          <button onClick={onClose} style={{ position: "absolute", top: 14, right: 14, background: COLORS.white, border: "none", borderRadius: "50%", width: 34, height: 34, fontSize: 16, cursor: "pointer" }}>✕</button>
          <button onClick={onFav} style={{ position: "absolute", top: 14, left: 14, background: COLORS.white, border: "none", borderRadius: "50%", width: 34, height: 34, fontSize: 16, cursor: "pointer" }}>{isFav ? "❤️" : "🤍"}</button>
        </div>
        <div style={{ padding: "16px 16px 20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
            <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: COLORS.text }}>{r.name}</h2>
            <StarRating rating={r.rating} />
          </div>
          <p style={{ margin: "0 0 12px", fontSize: 13, color: COLORS.textMuted }}>{r.category}</p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
            <Badge text={`⏱ ${r.time} دقيقة`} color={COLORS.primary} />
            <Badge text={`🛵 ${r.fee}`} color={COLORS.green} />
            <Badge text={`📦 ${r.minOrder}`} color="#8E44AD" />
          </div>
          {menuSections.map((section) => (
            <div key={section.name} style={{ marginBottom: 16 }}>
              <h3 style={{ margin: "0 0 10px", fontSize: 14, fontWeight: 700, color: COLORS.text, borderRight: `3px solid ${COLORS.primary}`, paddingRight: 8 }}>{section.name}</h3>
              {section.items.map((item) => (
                <div key={item.name} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: `1px solid ${COLORS.grayMid}` }}>
                  <div style={{ width: 52, height: 52, borderRadius: 12, background: r.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, flexShrink: 0 }}>{item.emoji}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 14, color: COLORS.text }}>{item.name}</div>
                    <div style={{ fontSize: 11, color: COLORS.grayText, marginTop: 2 }}>{item.desc}</div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
                    <span style={{ fontWeight: 700, fontSize: 14, color: COLORS.primary }}>{item.price}</span>
                    <button style={{ background: COLORS.primary, border: "none", borderRadius: 8, width: 28, height: 28, color: COLORS.white, fontSize: 18, cursor: "pointer" }}>+</button>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
