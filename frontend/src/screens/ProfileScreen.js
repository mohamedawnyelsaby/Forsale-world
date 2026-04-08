import { useState } from "react";
import COLORS from "../constants/colors";
import S from "../styles";
import { paymentMethods } from "../data";

const menuItems = [
  { icon: "📍", label: "عناوين التوصيل", sub: "إدارة عناوينك المحفوظة" },
  { icon: "🎁", label: "العروض والكوبونات", sub: "عروضك الحالية المتاحة" },
  { icon: "⭐", label: "نقاط المكافآت", sub: "1,240 نقطة متاحة" },
  { icon: "🔔", label: "الإشعارات", sub: "ضبط إشعاراتك" },
  { icon: "🌐", label: "اللغة", sub: "العربية" },
  { icon: "🛟", label: "الدعم والمساعدة", sub: "تواصل معنا" },
  { icon: "⚙️", label: "الإعدادات", sub: "الخصوصية والأمان" },
];

export default function ProfileScreen() {
  const [showPayment, setShowPayment] = useState(false);
  const [defaultPayment, setDefaultPayment] = useState("vodafone_cash");

  return (
    <div style={S.screen}>
      {/* Profile Header */}
      <div style={{ background: COLORS.primary, padding: "30px 20px 24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 64, height: 64, borderRadius: "50%", background: COLORS.white, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, flexShrink: 0 }}>
            👤
          </div>
          <div>
            <div style={{ color: COLORS.white, fontWeight: 700, fontSize: 18, marginBottom: 4 }}>أحمد محمد</div>
            <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 13 }}>01012345678</div>
            <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 12, marginTop: 2 }}>ahmed@example.com</div>
          </div>
          <button style={{ marginRight: "auto", background: "rgba(255,255,255,0.2)", border: "none", borderRadius: 10, padding: "6px 12px", color: COLORS.white, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
            تعديل
          </button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginTop: 20 }}>
          {[{ label: "الطلبات", value: "24" }, { label: "المفضلة", value: "3" }, { label: "التقييمات", value: "18" }].map((stat) => (
            <div key={stat.label} style={{ background: "rgba(255,255,255,0.15)", borderRadius: 12, padding: "10px 0", textAlign: "center" }}>
              <div style={{ color: COLORS.white, fontWeight: 700, fontSize: 20 }}>{stat.value}</div>
              <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 11, marginTop: 2 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: "12px 16px", display: "flex", flexDirection: "column", gap: 8 }}>

        {/* ── Payment Methods Section ── */}
        <div
          style={{ background: COLORS.white, borderRadius: 16, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}
        >
          <button
            onClick={() => setShowPayment(!showPayment)}
            style={{ width: "100%", background: "none", border: "none", padding: "13px 14px", display: "flex", alignItems: "center", gap: 12, cursor: "pointer", fontFamily: "inherit" }}
          >
            <span style={{ fontSize: 22, width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", background: COLORS.primaryLight, borderRadius: 10, flexShrink: 0 }}>💳</span>
            <div style={{ flex: 1, textAlign: "right" }}>
              <div style={{ fontWeight: 600, fontSize: 14, color: COLORS.text }}>طرق الدفع</div>
              <div style={{ fontSize: 11, color: COLORS.grayText, marginTop: 1 }}>
                {paymentMethods.find((p) => p.id === defaultPayment)?.name} — الافتراضي
              </div>
            </div>
            <span style={{ color: COLORS.grayText, fontSize: 16, transition: "transform 0.2s", display: "inline-block", transform: showPayment ? "rotate(90deg)" : "rotate(0deg)" }}>‹</span>
          </button>

          {showPayment && (
            <div style={{ borderTop: `1px solid ${COLORS.grayMid}`, padding: "10px 14px 14px" }}>
              <p style={{ fontSize: 12, color: COLORS.grayText, marginBottom: 10, marginTop: 4 }}>اختر طريقة الدفع الافتراضية</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {paymentMethods.map((method) => {
                  const active = defaultPayment === method.id;
                  return (
                    <button
                      key={method.id}
                      onClick={() => setDefaultPayment(method.id)}
                      style={{
                        display: "flex", alignItems: "center", gap: 12,
                        background: active ? method.bg : "#fafafa",
                        border: `1.5px solid ${active ? method.color : COLORS.grayMid}`,
                        borderRadius: 12, padding: "10px 12px",
                        cursor: "pointer", fontFamily: "inherit", textAlign: "right",
                        transition: "all 0.2s",
                      }}
                    >
                      <div style={{ width: 38, height: 38, borderRadius: 10, background: method.bg, border: `1px solid ${method.color}22`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>
                        {method.icon}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, fontSize: 13, color: COLORS.text }}>{method.name}</div>
                        <div style={{ fontSize: 11, color: COLORS.grayText, marginTop: 1 }}>{method.description}</div>
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

        {/* ── Other Menu Items ── */}
        {menuItems.map((item, i) => (
          <div
            key={i}
            style={{ background: COLORS.white, borderRadius: 14, padding: "13px 14px", display: "flex", alignItems: "center", gap: 12, cursor: "pointer", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
          >
            <span style={{ fontSize: 22, width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", background: COLORS.primaryLight, borderRadius: 10, flexShrink: 0 }}>
              {item.icon}
            </span>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 14, color: COLORS.text }}>{item.label}</div>
              <div style={{ fontSize: 11, color: COLORS.grayText, marginTop: 1 }}>{item.sub}</div>
            </div>
            <span style={{ color: COLORS.grayText, fontSize: 16 }}>‹</span>
          </div>
        ))}

        {/* Logout */}
        <div style={{ background: "#FFF3F3", borderRadius: 14, padding: "13px 14px", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, cursor: "pointer", marginTop: 4 }}>
          <span style={{ fontSize: 18 }}>🚪</span>
          <span style={{ fontWeight: 700, fontSize: 14, color: COLORS.red }}>تسجيل الخروج</span>
        </div>
      </div>
    </div>
  );
}
