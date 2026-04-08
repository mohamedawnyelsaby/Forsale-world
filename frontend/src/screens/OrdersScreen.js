import COLORS from "../constants/colors";
import S from "../styles";
import { orders } from "../data";
import Badge from "../components/Badge";

export default function OrdersScreen() {
  return (
    <div style={S.screen}>
      <div
        style={{
          background: COLORS.white, padding: "16px 16px 12px",
          borderBottom: `1px solid ${COLORS.grayMid}`,
          position: "sticky", top: 0, zIndex: 10,
        }}
      >
        <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: COLORS.text }}>طلباتي</h2>
      </div>

      <div style={{ padding: "12px 16px", display: "flex", flexDirection: "column", gap: 12 }}>
        {orders.map((order) => (
          <div
            key={order.id}
            style={{
              background: COLORS.white, borderRadius: 16,
              padding: "14px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
              <div
                style={{
                  width: 48, height: 48, borderRadius: 12,
                  background: COLORS.primaryLight,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 26, flexShrink: 0,
                }}
              >
                {order.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontWeight: 700, fontSize: 14, color: COLORS.text }}>{order.restaurant}</span>
                  <Badge text={order.status} color={order.statusColor} />
                </div>
                <div style={{ fontSize: 12, color: COLORS.textMuted, marginTop: 2 }}>
                  {order.id} · {order.date}
                </div>
              </div>
            </div>
            <div style={{ fontSize: 12, color: COLORS.textMuted, borderTop: `1px solid ${COLORS.grayMid}`, paddingTop: 10, marginBottom: 10 }}>
              {order.items}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontWeight: 700, fontSize: 14, color: COLORS.primary }}>
                المجموع: {order.total}
              </span>
              <button
                style={{
                  background: COLORS.primaryLight, color: COLORS.primary,
                  border: "none", borderRadius: 10, padding: "7px 14px",
                  fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
                }}
              >
                إعادة الطلب
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
