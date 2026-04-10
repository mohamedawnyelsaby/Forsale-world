import COLORS from "../constants/colors";
import S from "../styles";
import { orders } from "../data";

export default function OrdersScreen({ onRate, onTrack, dark }) {
  const card = dark ? "#1C1C1C" : COLORS.white;
  const border = dark ? "rgba(255,255,255,.08)" : "#EBEBEB";
  const text = dark ? "#F0F0F0" : COLORS.text;
  const muted = dark ? "#999" : COLORS.textMuted;
  const bg = dark ? "#111" : "#F4F4F4";

  return (
    <div style={{ ...S.screen, background: bg }}>
      <div style={{ background: card, padding: "14px 16px 12px", borderBottom: `1px solid ${border}`, position: "sticky", top: 0, zIndex: 10 }}>
        <h2 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: text }}>طلباتي</h2>
      </div>

      <div style={{ padding: "12px 16px" }}>
        {orders.map((order) => (
          <div
            key={order.id}
            style={{
              background: card, borderRadius: 16, padding: 14, marginBottom: 10,
              border: `1px solid ${order.active ? "rgba(255,107,0,.3)" : border}`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: "#FFF3EB", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>
                {order.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontWeight: 700, fontSize: 14, color: text }}>{order.restaurant}</span>
                  <span style={{ background: order.statusColor + "20", color: order.statusColor, fontSize: 10, fontWeight: 700, borderRadius: 6, padding: "2px 8px" }}>
                    {order.status}
                  </span>
                </div>
                <div style={{ fontSize: 11, color: muted, marginTop: 2 }}>{order.id} · {order.date}</div>
              </div>
            </div>
            <div style={{ fontSize: 12, color: muted, borderTop: `1px solid ${border}`, paddingTop: 8, marginBottom: 8 }}>
              {order.items}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontWeight: 700, fontSize: 14, color: COLORS.primary }}>المجموع: {order.total}</span>
              <div style={{ display: "flex", gap: 7 }}>
                {order.active && (
                  <button
                    onClick={() => onTrack && onTrack()}
                    style={{ background: "linear-gradient(135deg,#0D1B4B,#1a3a8f)", color: "#fff", border: "none", borderRadius: 10, padding: "6px 12px", fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}
                  >
                    🗺️ تتبع
                  </button>
                )}
                {!order.rated && order.status === "تم التسليم" && (
                  <button
                    onClick={() => onRate && onRate()}
                    style={{ background: "#FFF3EB", color: COLORS.primary, border: "none", borderRadius: 10, padding: "6px 12px", fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}
                  >
                    ⭐ قيّم
                  </button>
                )}
                <button
                  style={{ background: COLORS.primaryLight, color: COLORS.primary, border: "none", borderRadius: 10, padding: "6px 12px", fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}
                >
                  إعادة الطلب
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
