import { useState } from "react";
import COLORS from "../constants/colors";
import S from "../styles";
import { paymentMethods } from "../data";

const menuItems = [
  { icon: "📍", label: "عناوين التوصيل", sub: "إدارة عناوينك المحفوظة" },
  { icon: "🎁", label: "العروض والكوبونات", sub: "3 عروض متاحة" },
  { icon: "🔔", label: "الإشعارات", sub: "ضبط إشعاراتك" },
  { icon: "🌐", label: "اللغة", sub: "العربية" },
  { icon: "🛟", label: "الدعم والمساعدة", sub: "واتساب 24/7" },
  { icon: "⚙️", label: "الإعدادات", sub: "الخصوصية والأمان" },
];

export default function ProfileScreen({ points, onOpenPro, dark }) {
  const [showPayment, setShowPayment] = useState(false);
  const [defaultPayment, setDefaultPayment] = useState("vodafone_cash");

  const card = dark ? "#1C1C1C" : COLORS.white;
  const cardAlt = dark ? "#252525" : "#F8F8F8";
  const border = dark ? "rgba(255,255,255,.08)" : "#EBEBEB";
  const text = dark ? "#F0F0F0" : COLORS.text;
  const muted = dark ? "#999" : COLORS.textMuted;
  const grayText = dark ? "#555" : "#AAA";
  const bg = dark ? "#111" : "#F4F4F4";

  const tier = points >= 2000 ? "💎 Diamond" : points >= 1000 ? "🥇 Gold" : "🥈 Silver";

  return (
    <div style={{ ...S.screen, background: bg }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg,#FF6B00,#CC5500)", padding: "24px 20px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 60, height: 60, borderRadius: "50%", background: "rgba(255,255,255,.25)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 }}>👤</div>
          <div>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: 17 }}>أحمد محمد</div>
            <div style={{ color: "rgba(255,255,255,.8)", fontSize: 12, marginTop: 2 }}>01012345678</div>
            <div style={{ background: "rgba(255,255,255,.2)", color: "#fff", fontSize: 10, fontWeight: 700, borderRadius: 6, padding: "2px 8px", marginTop: 4, display: "inline-block" }}>
              {tier} Member
            </div>
          </div>
          <button style={{ marginRight: "auto", background: "rgba(255,255,255,.2)", border: "none", borderRadius: 10, padding: "6px 12px", color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
            تعديل
          </button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginTop: 16 }}>
          {[["الطلبات", "24"], ["نقاطي", (points || 0).toLocaleString()], ["تقييمي", "4.8 ⭐"]].map(([l, v]) => (
            <div key={l} style={{ background: "rgba(255,255,255,.15)", borderRadius: 12, padding: "10px 0", textAlign: "center" }}>
              <div style={{ color: "#fff", fontWeight: 700, fontSize: 16 }}>{v}</div>
              <div style={{ color: "rgba(255,255,255,.7)", fontSize: 10, marginTop: 2 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: "12px 16px", display: "flex", flexDirection: "column", gap: 8 }}>
        {/* Pro Card */}
        <div
          onClick={() => onOpenPro && onOpenPro()}
          style={{ background: "linear-gradient(135deg,#1A1A2E,#16213E)", borderRadius: 16, padding: "14px 16px", cursor: "pointer", display: "flex", alignItems: "center", gap: 12 }}
        >
          <div style={{ fontSize: 28 }}>👑</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#FFD700" }}>Forsale Pro</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,.55)", marginTop: 2 }}>توصيل مجاني + خصومات حصرية + نقاط مضاعفة</div>
          </div>
          <div style={{ background: "#FFD700", color: "#7A4F00", fontSize: 11, fontWeight: 700, borderRadius: 8, padding: "4px 10px" }}>49 ج.م ›</div>
        </div>

        {/* Payment Methods */}
        <div style={{ background: card, borderRadius: 16, overflow: "hidden", border: `1px solid ${border}` }}>
          <button
            onClick={() => setShowPayment(!showPayment)}
            style={{ width: "100%", background: "none", border: "none", padding: "12px 14px", display: "flex", alignItems: "center", gap: 12, cursor: "pointer", fontFamily: "inherit" }}
          >
            <span style={{ fontSize: 20, width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center", background: "#FFF3EB", borderRadius: 10, flexShrink: 0 }}>💳</span>
            <div style={{ flex: 1, textAlign: "right" }}>
              <div style={{ fontWeight: 600, fontSize: 13, color: text }}>طرق الدفع</div>
              <div style={{ fontSize: 11, color: grayText, marginTop: 1 }}>
                {paymentMethods.find((p) => p.id === defaultPayment)?.name} — الافتراضي
              </div>
            </div>
            <span style={{ color: grayText, fontSize: 16, display: "inline-block", transform: showPayment ? "rotate(90deg)" : "rotate(0deg)", transition: "transform .2s" }}>‹</span>
          </button>

          {showPayment && (
            <div style={{ borderTop: `1px solid ${border}`, padding: "10px 14px 14px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {paymentMethods.map((method) => {
                  const active = defaultPayment === method.id;
                  return (
                    <button
                      key={method.id}
                      onClick={() => setDefaultPayment(method.id)}
                      style={{
                        display: "flex", alignItems: "center", gap: 12,
                        background: active ? method.bg : cardAlt,
                        border: `1.5px solid ${active ? method.color : border}`,
                        borderRadius: 12, padding: "10px 12px",
                        cursor: "pointer", fontFamily: "inherit", textAlign: "right", transition: "all .2s",
                      }}
                    >
                      <div style={{ width: 36, height: 36, borderRadius: 10, background: method.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{method.icon}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, fontSize: 13, color: text }}>{method.name}</div>
                        <div style={{ fontSize: 11, color: grayText, marginTop: 1 }}>{method.description}</div>
                      </div>
                      {active && (
                        <div style={{ width: 20, height: 20, borderRadius: "50%", background: method.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <span style={{ color: "#fff", fontSize: 11, fontWeight: 700 }}>✓</span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Menu items */}
        {menuItems.map((item, i) => (
          <div key={i} style={{ background: card, borderRadius: 14, padding: "12px 14px", display: "flex", alignItems: "center", gap: 10, cursor: "pointer", border: `1px solid ${border}` }}>
            <span style={{ fontSize: 20, width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center", background: "#FFF3EB", borderRadius: 10, flexShrink: 0 }}>{item.icon}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 13, color: text }}>{item.label}</div>
              <div style={{ fontSize: 11, color: grayText, marginTop: 1 }}>{item.sub}</div>
            </div>
            <span style={{ color: grayText, fontSize: 16 }}>‹</span>
          </div>
        ))}

        {/* Logout */}
        <div style={{ background: dark ? "#2A1A1A" : "#FFF3F3", borderRadius: 14, padding: "12px", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, cursor: "pointer", border: `1px solid ${dark ? "rgba(255,59,48,.2)" : "#FFE0E0"}`, marginTop: 4 }}>
          <span style={{ fontSize: 18 }}>🚪</span>
          <span style={{ fontWeight: 700, fontSize: 13, color: COLORS.red }}>تسجيل الخروج</span>
        </div>
      </div>
    </div>
  );
}
