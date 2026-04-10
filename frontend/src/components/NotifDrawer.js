import COLORS from "../constants/colors";
import { notifications } from "../data";

export default function NotifDrawer({ onClose, dark }) {
  const card = dark ? "#1C1C1C" : COLORS.white;
  const cardAlt = dark ? "#252525" : "#F8F8F8";
  const border = dark ? "rgba(255,255,255,.08)" : "#EBEBEB";
  const text = dark ? "#F0F0F0" : COLORS.text;
  const muted = dark ? "#999" : COLORS.textMuted;
  const gray = dark ? "#555" : "#AAA";

  return (
    <div
      style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.5)", zIndex: 300 }}
      onClick={onClose}
    >
      <div
        style={{
          position: "absolute", top: 0, right: 0,
          width: "84%", height: "100%",
          background: card,
          display: "flex", flexDirection: "column",
          animation: "slideInRight .3s ease",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ padding: "16px", borderBottom: `1px solid ${border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: text }}>الإشعارات</h3>
          <button onClick={onClose} style={{ background: "#FFF3EB", color: COLORS.primary, border: "none", borderRadius: 8, padding: "4px 10px", fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
            تحديد الكل كمقروء
          </button>
        </div>
        <div style={{ overflowY: "auto", flex: 1 }}>
          {notifications.map((n) => (
            <div
              key={n.id}
              style={{
                padding: "12px 16px",
                borderBottom: `1px solid ${border}`,
                background: n.unread ? cardAlt : "transparent",
                display: "flex", gap: 12, alignItems: "flex-start",
              }}
            >
              <div style={{
                width: 40, height: 40, borderRadius: 12,
                background: n.unread ? "#FFF3EB" : cardAlt,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 20, flexShrink: 0,
              }}>
                {n.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: n.unread ? 700 : 500, color: text }}>{n.title}</div>
                <div style={{ fontSize: 11, color: muted, marginTop: 2 }}>{n.body}</div>
                <div style={{ fontSize: 10, color: gray, marginTop: 4 }}>{n.time}</div>
              </div>
              {n.unread && (
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: COLORS.primary, marginTop: 4, flexShrink: 0 }} />
              )}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
