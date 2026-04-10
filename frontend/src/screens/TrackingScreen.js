import { useState, useEffect } from "react";
import COLORS from "../constants/colors";
import S from "../styles";

const STATUSES = [
  { icon: "✅", label: "تم القبول" },
  { icon: "👨‍🍳", label: "جاري التحضير" },
  { icon: "🛵", label: "في الطريق" },
  { icon: "🏠", label: "تم التسليم" },
];

export default function TrackingScreen({ dark }) {
  const [etaSecs, setEtaSecs] = useState(12 * 60 + 33);

  useEffect(() => {
    const interval = setInterval(() => {
      setEtaSecs((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const mins = Math.floor(etaSecs / 60);
  const secs = etaSecs % 60;
  const statusIdx = etaSecs > 0 ? 2 : 3;

  const card = dark ? "#1C1C1C" : COLORS.white;
  const border = dark ? "rgba(255,255,255,.08)" : "#EBEBEB";
  const text = dark ? "#F0F0F0" : COLORS.text;
  const muted = dark ? "#999" : COLORS.textMuted;
  const bg = dark ? "#111" : "#F4F4F4";

  return (
    <div style={{ ...S.screen, background: bg }}>
      {/* Header with countdown */}
      <div style={{ background: "linear-gradient(135deg,#0D1B4B,#1a3a8f)", padding: "20px 16px 18px" }}>
        <div style={{ textAlign: "center", marginBottom: 16 }}>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,.6)", marginBottom: 4 }}>وقت الوصول المتبقي</div>
          <div style={{ fontSize: 46, fontWeight: 800, color: "#fff", letterSpacing: -2, fontVariantNumeric: "tabular-nums" }}>
            {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
          </div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,.6)" }}>دقيقة</div>
        </div>

        {/* Status Timeline */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "center" }}>
          {STATUSES.map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
                <div style={{
                  width: 34, height: 34, borderRadius: "50%",
                  background: i <= statusIdx ? COLORS.primary : "rgba(255,255,255,.2)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 14, transition: "background .5s",
                  boxShadow: i === statusIdx ? "0 0 0 5px rgba(255,107,0,.3)" : "none",
                }}>
                  {i <= statusIdx ? s.icon : "○"}
                </div>
                <div style={{ fontSize: 9, color: i <= statusIdx ? "#fff" : "rgba(255,255,255,.35)", textAlign: "center", maxWidth: 54, lineHeight: 1.3 }}>
                  {s.label}
                </div>
              </div>
              {i < 3 && (
                <div style={{ width: 22, height: 2, background: i < statusIdx ? COLORS.primary : "rgba(255,255,255,.2)", marginBottom: 22, transition: "background .5s" }} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Map */}
      <div style={{ background: card, margin: "12px 16px", borderRadius: 20, overflow: "hidden", border: `1px solid ${border}` }}>
        <div style={{ height: 220, position: "relative", background: "#E8F0E8", overflow: "hidden" }}>
          <svg width="100%" height="220" viewBox="0 0 320 220" style={{ position: "absolute", inset: 0 }}>
            {/* Buildings */}
            {[[8,8,82,60],[108,8,100,60],[228,8,80,60],[8,88,82,60],[108,88,100,60],[228,88,80,60],[8,165,82,50],[108,165,100,50],[228,165,80,50]].map(([x,y,w,h],i) => (
              <rect key={i} x={x} y={y} width={w} height={h} fill="#C8DCC8" rx="4"/>
            ))}
            {/* Roads */}
            <rect x="0" y="72" width="320" height="12" fill="#BBBBBB"/>
            <rect x="0" y="153" width="320" height="12" fill="#BBBBBB"/>
            <rect x="94" y="0" width="12" height="220" fill="#BBBBBB"/>
            <rect x="214" y="0" width="12" height="220" fill="#BBBBBB"/>
            {/* Road markings */}
            {[10,35,60,130,155,180,230,258,290].map((x,i) => (
              <rect key={i} x={x} y="77" width="14" height="3" fill="#FFF" rx="1"/>
            ))}
            {/* Route */}
            <path d="M 150 20 L 150 79 L 50 79 L 50 185" stroke="#FF6B00" strokeWidth="2.5" strokeDasharray="6,4" fill="none" strokeLinecap="round"/>
            {/* Restaurant marker */}
            <circle cx="150" cy="20" r="13" fill="#FF6B00"/>
            <text x="150" y="25" textAnchor="middle" fontSize="14">🍔</text>
            {/* Home marker */}
            <circle cx="50" cy="191" r="13" fill="#0D1B4B"/>
            <text x="50" y="196" textAnchor="middle" fontSize="14">🏠</text>
            {/* Rider */}
            <g style={{ animation: "riderMove 9s ease-in-out infinite" }}>
              <circle r="15" fill="#FF6B00" opacity=".95"/>
              <text textAnchor="middle" dominantBaseline="middle" fontSize="16">🛵</text>
            </g>
          </svg>
          {/* Ping */}
          <div style={{ position: "absolute", left: 36, top: 176, width: 28, height: 28, borderRadius: "50%", border: "2.5px solid #0D1B4B", animation: "ping 1.6s ease-out infinite", pointerEvents: "none" }} />
        </div>

        {/* Rider info */}
        <div style={{ padding: "14px 16px", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(135deg,#FF6B00,#FF8C40)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>👨</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: text }}>محمد عمر — الـ Rider</div>
            <div style={{ fontSize: 12, color: muted }}>⭐ 4.9 • 2,340 توصيلة سابقة</div>
          </div>
          <button style={{ background: COLORS.primaryLight, border: "none", borderRadius: 10, width: 38, height: 38, cursor: "pointer", fontSize: 18 }}>📞</button>
          <button style={{ background: COLORS.primaryLight, border: "none", borderRadius: 10, width: 38, height: 38, cursor: "pointer", fontSize: 18 }}>💬</button>
        </div>
      </div>

      {/* Order details */}
      <div style={{ margin: "0 16px", background: card, borderRadius: 16, padding: "14px 16px", border: `1px solid ${border}` }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: text, marginBottom: 10 }}>تفاصيل الطلب</div>
        {[["برجر كلاسيك × 2", "240 ج.م"], ["بطاطس كبير", "35 ج.م"], ["توصيل", "مجاني"]].map(([item, price]) => (
          <div key={item} style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", borderBottom: `1px solid ${border}` }}>
            <span style={{ fontSize: 12, color: muted }}>{item}</span>
            <span style={{ fontSize: 12, fontWeight: 600, color: text }}>{price}</span>
          </div>
        ))}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: text }}>الإجمالي</span>
          <span style={{ fontSize: 15, fontWeight: 800, color: COLORS.primary }}>275 ج.م</span>
        </div>
      </div>

      <style>{`
        @keyframes riderMove {
          0%   { transform: translate(148px, 22px); }
          15%  { transform: translate(148px, 22px); }
          45%  { transform: translate(148px, 79px); }
          70%  { transform: translate(48px, 79px); }
          90%  { transform: translate(48px, 188px); }
          100% { transform: translate(48px, 188px); }
        }
        @keyframes ping {
          0%   { transform: scale(1); opacity: .7; }
          100% { transform: scale(2.8); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
