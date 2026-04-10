import { useState } from "react";
import COLORS from "../constants/colors";
import S from "../styles";
import { rewards } from "../data";

export default function LoyaltyScreen({ points, onRedeem, dark }) {
  const [redeemed, setRedeemed] = useState([]);

  const card = dark ? "#1C1C1C" : COLORS.white;
  const cardAlt = dark ? "#252525" : "#F8F8F8";
  const border = dark ? "rgba(255,255,255,.08)" : "#EBEBEB";
  const text = dark ? "#F0F0F0" : COLORS.text;
  const muted = dark ? "#999" : COLORS.textMuted;
  const grayText = dark ? "#555" : "#AAA";
  const bg = dark ? "#111" : "#F4F4F4";

  const tier = points >= 2000 ? "💎 Diamond" : points >= 1000 ? "🥇 Gold" : "🥈 Silver";
  const nextTier = points >= 2000 ? 5000 : points >= 1000 ? 2000 : 1000;
  const progress = Math.min((points / nextTier) * 100, 100);

  const handleRedeem = (r) => {
    if (points >= r.points && !redeemed.includes(r.title)) {
      setRedeemed((prev) => [...prev, r.title]);
      if (onRedeem) onRedeem(r.points);
    }
  };

  return (
    <div style={{ ...S.screen, background: bg }}>
      <div style={{ padding: 16 }}>
        {/* Points card */}
        <div style={{
          background: "linear-gradient(135deg,#0D1B4B 0%,#1a3a8f 55%,#FF6B00 100%)",
          borderRadius: 22, padding: 22, marginBottom: 16,
          position: "relative", overflow: "hidden",
        }}>
          <div style={{ position: "absolute", top: -35, left: -35, width: 130, height: 130, borderRadius: "50%", background: "rgba(255,255,255,.05)" }} />
          <div style={{ position: "absolute", bottom: -25, right: -25, width: 110, height: 110, borderRadius: "50%", background: "rgba(255,107,0,.18)" }} />
          <div style={{ fontSize: 12, color: "rgba(255,255,255,.6)", marginBottom: 4 }}>رصيد نقاطك</div>
          <div style={{ fontSize: 48, fontWeight: 800, color: "#fff", letterSpacing: -2 }}>{points.toLocaleString()}</div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,.65)", marginBottom: 16 }}>نقطة • مستوى {tier}</div>
          <div style={{ marginBottom: 5, display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: 10, color: "rgba(255,255,255,.55)" }}>المستوى التالي</span>
            <span style={{ fontSize: 10, color: "rgba(255,255,255,.8)", fontWeight: 600 }}>{points} / {nextTier}</span>
          </div>
          <div style={{ background: "rgba(255,255,255,.2)", borderRadius: 4, height: 7, overflow: "hidden", marginBottom: 6 }}>
            <div style={{ width: `${progress}%`, height: "100%", background: "linear-gradient(90deg,#FFD700,#FF6B00)", borderRadius: 4, transition: "width 1s ease" }} />
          </div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,.55)" }}>متبقي {nextTier - points} نقطة للمستوى القادم ✨</div>
        </div>

        {/* Stats */}
        <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
          {[["🛒", "24", "طلب"], ["⭐", "4.8", "تقييمي"], ["🎁", "3", "جوائز"]].map(([icon, val, label]) => (
            <div key={label} style={{ flex: 1, background: card, borderRadius: 14, padding: "12px 8px", textAlign: "center", border: `1px solid ${border}` }}>
              <div style={{ fontSize: 20, marginBottom: 4 }}>{icon}</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: text }}>{val}</div>
              <div style={{ fontSize: 10, color: grayText }}>{label}</div>
            </div>
          ))}
        </div>

        {/* How to earn */}
        <div style={{ background: card, borderRadius: 16, padding: "14px 16px", marginBottom: 16, border: `1px solid ${border}` }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: text, marginBottom: 10 }}>💡 كيف تكسب نقاط؟</div>
          {[
            ["كل 1 ج.م إنفاق", "= 1 نقطة"],
            ["تقييم الطلب", "+120 نقطة"],
            ["دعوة صديق", "+500 نقطة"],
            ["اشتراك Pro", "نقاط مضاعفة ×2"],
          ].map(([action, reward]) => (
            <div key={action} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: `1px solid ${border}` }}>
              <span style={{ fontSize: 12, color: muted }}>{action}</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: COLORS.primary }}>{reward}</span>
            </div>
          ))}
        </div>

        {/* Rewards */}
        <div style={{ fontSize: 14, fontWeight: 700, color: text, marginBottom: 10 }}>🎁 مكافآت متاحة</div>
        {rewards.map((r) => {
          const canRedeem = points >= r.points;
          const done = redeemed.includes(r.title);
          return (
            <div
              key={r.title}
              style={{
                background: card, borderRadius: 14, padding: "12px 14px",
                display: "flex", alignItems: "center", gap: 12, marginBottom: 10,
                border: `1px solid ${canRedeem && !done ? "rgba(255,107,0,.3)" : border}`,
                opacity: done ? 0.6 : 1,
              }}
            >
              <div style={{ width: 44, height: 44, borderRadius: 12, background: canRedeem ? "#FFF3EB" : cardAlt, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>
                {r.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: text }}>{r.title}</div>
                <div style={{ fontSize: 11, color: muted }}>{r.desc}</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: canRedeem ? COLORS.primary : grayText }}>{r.points.toLocaleString()}</div>
                <div style={{ fontSize: 9, color: grayText }}>نقطة</div>
                {done ? (
                  <div style={{ fontSize: 9, background: COLORS.green, color: "#fff", borderRadius: 6, padding: "2px 7px", marginTop: 3, fontWeight: 700 }}>تم ✓</div>
                ) : canRedeem ? (
                  <div
                    onClick={() => handleRedeem(r)}
                    style={{ fontSize: 9, background: COLORS.primary, color: "#fff", borderRadius: 6, padding: "2px 7px", marginTop: 3, fontWeight: 700, cursor: "pointer" }}
                  >
                    استبدل
                  </div>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
