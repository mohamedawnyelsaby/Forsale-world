import COLORS from "../constants/colors";
import S from "../styles";

const menuItems = [
  { icon: "📍", label: "عناوين التوصيل", sub: "إدارة عناوينك المحفوظة" },
  { icon: "💳", label: "طرق الدفع", sub: "بطاقات الائتمان ومحفظة Forsale" },
  { icon: "🎁", label: "العروض والكوبونات", sub: "عروضك الحالية المتاحة" },
  { icon: "⭐", label: "نقاط المكافآت", sub: "1,240 نقطة متاحة" },
  { icon: "🔔", label: "الإشعارات", sub: "ضبط إشعاراتك" },
  { icon: "🌐", label: "اللغة", sub: "العربية" },
  { icon: "🛟", label: "الدعم والمساعدة", sub: "تواصل معنا" },
  { icon: "⚙️", label: "الإعدادات", sub: "الخصوصية والأمان" },
];

export default function ProfileScreen() {
  return (
    <div style={S.screen}>
      {/* Profile Header */}
      <div style={{ background: COLORS.primary, padding: "30px 20px 24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 64, height: 64, borderRadius: "50%",
              background: COLORS.white,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 28, flexShrink: 0,
            }}
          >
            👤
          </div>
          <div>
            <div style={{ color: COLORS.white, fontWeight: 700, fontSize: 18, marginBottom: 4 }}>أحمد محمد</div>
            <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 13 }}>+966 50 123 4567</div>
            <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 12, marginTop: 2 }}>ahmed@example.com</div>
          </div>
          <button
            style={{
              marginRight: "auto", background: "rgba(255,255,255,0.2)",
              border: "none", borderRadius: 10, padding: "6px 12px",
              color: COLORS.white, fontSize: 12, fontWeight: 600,
              cursor: "pointer", fontFamily: "inherit",
            }}
          >
            تعديل
          </button>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginTop: 20 }}>
          {[
            { label: "الطلبات", value: "24" },
            { label: "المفضلة", value: "3" },
            { label: "التقييمات", value: "18" },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{ background: "rgba(255,255,255,0.15)", borderRadius: 12, padding: "10px 0", textAlign: "center" }}
            >
              <div style={{ color: COLORS.white, fontWeight: 700, fontSize: 20 }}>{stat.value}</div>
              <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 11, marginTop: 2 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Menu Items */}
      <div style={{ padding: "12px 16px", display: "flex", flexDirection: "column", gap: 8 }}>
        {menuItems.map((item, i) => (
          <div
            key={i}
            style={{
              background: COLORS.white, borderRadius: 14, padding: "13px 14px",
              display: "flex", alignItems: "center", gap: 12,
              cursor: "pointer", boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
            }}
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
        <div
          style={{
            background: "#FFF3F3", borderRadius: 14, padding: "13px 14px",
            display: "flex", alignItems: "center", justifyContent: "center",
            gap: 8, cursor: "pointer", marginTop: 4,
          }}
        >
          <span style={{ fontSize: 18 }}>🚪</span>
          <span style={{ fontWeight: 700, fontSize: 14, color: COLORS.red }}>تسجيل الخروج</span>
        </div>
      </div>
    </div>
  );
}
