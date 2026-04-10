import { useState } from "react";
import COLORS from "../constants/colors";

const features = [
  "🛵 توصيل مجاني غير محدود",
  "💰 خصم 10% على كل طلب",
  "⚡ أولوية في التوصيل",
  "🎁 عروض حصرية يومية",
  "💎 نقاط مضاعفة ×2",
  "📞 دعم VIP فوري 24/7",
];

export default function ProModal({ onClose, dark }) {
  const [plan, setPlan] = useState("yearly");
  const card = dark ? "#1C1C1C" : COLORS.white;
  const cardAlt = dark ? "#252525" : "#F8F8F8";
  const border = dark ? "rgba(255,255,255,.08)" : "#EBEBEB";
  const text = dark ? "#F0F0F0" : COLORS.text;
  const muted = dark ? "#999" : COLORS.textMuted;

  return (
    <div
      style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.6)", zIndex: 300, display: "flex", alignItems: "flex-end" }}
      onClick={onClose}
    >
      <div
        style={{ width: "100%", background: card, borderRadius: "24px 24px 0 0", padding: "24px 20px", animation: "slideUp .35s ease" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ textAlign: "center", marginBottom: 18 }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>👑</div>
          <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: text }}>Forsale Pro</h2>
          <p style={{ margin: "6px 0 0", fontSize: 13, color: muted }}>تجربة توصيل لا مثيل لها</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 18 }}>
          {features.map((f) => (
            <div key={f} style={{ background: cardAlt, borderRadius: 12, padding: "10px 12px", fontSize: 12, color: text, fontWeight: 500 }}>
              {f}
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
          <div
            onClick={() => setPlan("monthly")}
            style={{
              flex: 1,
              background: plan === "monthly" ? "#FFF3EB" : cardAlt,
              border: `2px solid ${plan === "monthly" ? COLORS.primary : border}`,
              borderRadius: 14, padding: 14, textAlign: "center", cursor: "pointer",
            }}
          >
            <div style={{ fontSize: 13, fontWeight: 700, color: text }}>شهري</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: COLORS.primary, marginTop: 4 }}>49 ج.م</div>
          </div>
          <div
            onClick={() => setPlan("yearly")}
            style={{
              flex: 1,
              background: "linear-gradient(135deg,#FF6B00,#CC5500)",
              borderRadius: 14, padding: 14, textAlign: "center", cursor: "pointer",
              border: `2px solid ${plan === "yearly" ? "#FFD700" : "transparent"}`,
            }}
          >
            <div style={{ fontSize: 9, color: "#FFD700", fontWeight: 700, marginBottom: 4 }}>الأوفر ✨</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>سنوي</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#fff", marginTop: 4 }}>399 ج.م</div>
          </div>
        </div>

        <button
          style={{
            width: "100%",
            background: "linear-gradient(135deg,#FFD700,#FF8C00)",
            color: "#fff", border: "none", borderRadius: 14,
            padding: 15, fontSize: 16, fontWeight: 700,
            cursor: "pointer", fontFamily: "inherit",
          }}
        >
          اشترك الآن 🚀
        </button>
        <button
          onClick={onClose}
          style={{ width: "100%", background: "none", border: "none", color: dark ? "#666" : COLORS.grayText, fontSize: 13, marginTop: 10, cursor: "pointer", fontFamily: "inherit" }}
        >
          ليس الآن
        </button>
      </div>

      <style>{`@keyframes slideUp{from{transform:translateY(100%)}to{transform:translateY(0)}}`}</style>
    </div>
  );
}
