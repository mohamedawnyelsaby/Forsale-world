import { useState } from "react";
import COLORS from "../constants/colors";

const tags = ["الطعام كان لذيذ", "التوصيل سريع", "التغليف ممتاز", "سأطلب مرة أخرى"];
const labels = ["", "سيء 😞", "مقبول 😐", "كويس 🙂", "جيد جداً 😊", "ممتاز 🤩"];

export default function RatingModal({ onClose, onSubmit, dark }) {
  const [stars, setStars] = useState(0);
  const [selected, setSelected] = useState([]);

  const card = dark ? "#1C1C1C" : COLORS.white;
  const cardAlt = dark ? "#252525" : "#F8F8F8";
  const text = dark ? "#F0F0F0" : COLORS.text;
  const muted = dark ? "#999" : COLORS.textMuted;

  const toggleTag = (t) =>
    setSelected((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));

  return (
    <div
      style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.5)", zIndex: 300, display: "flex", alignItems: "flex-end" }}
      onClick={onClose}
    >
      <div
        style={{ width: "100%", background: card, borderRadius: "24px 24px 0 0", padding: "24px 20px", animation: "slideUp .3s ease" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ textAlign: "center", marginBottom: 18 }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>🍔</div>
          <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: text }}>كيف كانت تجربتك؟</h3>
          <p style={{ margin: "6px 0 0", fontSize: 12, color: muted }}>تقييمك يساعدنا نحسن الخدمة</p>
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 10 }}>
          {[1, 2, 3, 4, 5].map((i) => (
            <button
              key={i}
              onClick={() => setStars(i)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                fontSize: i <= stars ? 36 : 28,
                transition: "all .2s",
                filter: i <= stars ? "none" : "grayscale(1)",
              }}
            >
              ⭐
            </button>
          ))}
        </div>

        {stars > 0 && (
          <div style={{ textAlign: "center", marginBottom: 12, fontSize: 14, fontWeight: 600, color: text }}>
            {labels[stars]}
          </div>
        )}

        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", marginBottom: 18 }}>
          {tags.map((t) => (
            <button
              key={t}
              onClick={() => toggleTag(t)}
              style={{
                background: selected.includes(t) ? "#FFF3EB" : cardAlt,
                color: selected.includes(t) ? COLORS.primary : muted,
                border: `1.5px solid ${selected.includes(t) ? "rgba(255,107,0,.4)" : "transparent"}`,
                borderRadius: 20, padding: "6px 14px",
                fontSize: 12, cursor: "pointer", fontFamily: "inherit", fontWeight: selected.includes(t) ? 700 : 400,
                transition: "all .2s",
              }}
            >
              {t}
            </button>
          ))}
        </div>

        <button
          onClick={() => { if (stars > 0) onSubmit(stars); }}
          disabled={stars === 0}
          style={{
            width: "100%",
            background: stars > 0 ? "linear-gradient(135deg,#FF6B00,#CC5500)" : (dark ? "#2a2a2a" : "#F0F0F0"),
            color: stars > 0 ? "#fff" : (dark ? "#555" : COLORS.grayText),
            border: "none", borderRadius: 14, padding: 14,
            fontSize: 14, fontWeight: 700,
            cursor: stars > 0 ? "pointer" : "not-allowed",
            fontFamily: "inherit", transition: "all .3s",
          }}
        >
          {stars > 0 ? `إرسال التقييم (+120 نقطة 🎁)` : "اختر تقييمك أولاً"}
        </button>
      </div>
      <style>{`@keyframes slideUp{from{transform:translateY(100%)}to{transform:translateY(0)}}`}</style>
    </div>
  );
}
