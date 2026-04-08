import { useState } from "react";
import COLORS from "../constants/colors";
import StarRating from "./StarRating";
import Badge from "./Badge";
import { paymentMethods } from "../data";

export default function RestaurantModal({ r, onClose, isFav, onFav }) {
  const [cart, setCart] = useState({});
  const [step, setStep] = useState("menu"); // "menu" | "payment" | "confirm"
  const [selectedPayment, setSelectedPayment] = useState(null);

  const menuSections = [
    {
      name: "الأكثر مبيعاً",
      items: [
        { id: "m1", name: r.name === "برجر هاوس" ? "برجر كلاسيك" : "الطبق الرئيسي", price: 120, desc: "وصف الطبق وإضافاته المتاحة", emoji: r.image },
        { id: "m2", name: "وجبة عائلية", price: 280, desc: "مناسبة لـ 4 أشخاص مع مشروبات", emoji: "🍽️" },
      ],
    },
    {
      name: "المشروبات",
      items: [
        { id: "m3", name: "مشروب غازي", price: 25, desc: "بيبسي، ميرندا، 7 أب", emoji: "🥤" },
        { id: "m4", name: "عصير طازج", price: 45, desc: "متنوع حسب الموسم", emoji: "🧃" },
      ],
    },
  ];

  const allItems = menuSections.flatMap((s) => s.items);

  const addItem = (id) => setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  const removeItem = (id) => setCart((prev) => {
    const next = { ...prev };
    if (next[id] > 1) next[id]--;
    else delete next[id];
    return next;
  });

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const cartTotal = allItems.reduce((sum, item) => sum + (cart[item.id] || 0) * item.price, 0);

  const handleConfirm = () => {
    if (!selectedPayment) return;
    setStep("confirm");
  };

  // ── CONFIRM SCREEN ──────────────────────────────────────────────
  if (step === "confirm") {
    const method = paymentMethods.find((p) => p.id === selectedPayment);
    return (
      <div style={overlay} onClick={onClose}>
        <div style={sheet} onClick={(e) => e.stopPropagation()}>
          <div style={{ padding: "32px 20px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
            <div style={{ fontSize: 56 }}>✅</div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: COLORS.text }}>تم تأكيد الطلب!</h2>
            <p style={{ fontSize: 14, color: COLORS.textMuted }}>طلبك في الطريق إليك</p>

            <div style={{ background: COLORS.gray, borderRadius: 16, padding: "16px 20px", width: "100%", textAlign: "right", marginTop: 8 }}>
              <Row label="المطعم" value={r.name} />
              <Row label="المجموع" value={`${cartTotal} ج.م`} bold />
              <Row label="طريقة الدفع" value={method.name} />
              <Row label="وقت التوصيل" value={`${r.time} دقيقة`} />
            </div>

            {selectedPayment === "fawry" && (
              <div style={{ background: "#FFF5E6", border: "1px solid #FF8C00", borderRadius: 12, padding: "12px 16px", width: "100%", textAlign: "right" }}>
                <p style={{ fontSize: 13, color: "#FF8C00", fontWeight: 700, marginBottom: 4 }}>كود فوري للدفع</p>
                <p style={{ fontSize: 20, fontWeight: 800, color: "#E07000", letterSpacing: 2 }}>
                  {Math.floor(Math.random() * 9000000000 + 1000000000)}
                </p>
                <p style={{ fontSize: 11, color: "#FF8C00", marginTop: 4 }}>ادفع في أقرب منفذ فوري خلال 24 ساعة</p>
              </div>
            )}

            {selectedPayment === "vodafone_cash" && (
              <div style={{ background: "#FFF0F0", border: "1px solid #E60000", borderRadius: 12, padding: "12px 16px", width: "100%", textAlign: "right" }}>
                <p style={{ fontSize: 13, color: "#E60000", fontWeight: 700, marginBottom: 4 }}>حوّل على رقم فودافون كاش</p>
                <p style={{ fontSize: 18, fontWeight: 800, color: "#B00000" }}>01001234567</p>
                <p style={{ fontSize: 11, color: "#E60000", marginTop: 4 }}>المبلغ: {cartTotal} ج.م — أرسل إيصال التحويل</p>
              </div>
            )}

            {selectedPayment === "instapay" && (
              <div style={{ background: "#F5EDFF", border: "1px solid #7B2FBE", borderRadius: 12, padding: "12px 16px", width: "100%", textAlign: "right" }}>
                <p style={{ fontSize: 13, color: "#7B2FBE", fontWeight: 700, marginBottom: 4 }}>حوّل عبر إنستاباي</p>
                <p style={{ fontSize: 16, fontWeight: 800, color: "#5A1E9A" }}>forsale@instapay</p>
                <p style={{ fontSize: 11, color: "#7B2FBE", marginTop: 4 }}>المبلغ: {cartTotal} ج.م</p>
              </div>
            )}

            <button
              onClick={onClose}
              style={{ background: COLORS.primary, color: "#fff", border: "none", borderRadius: 14, padding: "14px 0", width: "100%", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", marginTop: 4 }}
            >
              العودة للرئيسية
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── PAYMENT SCREEN ───────────────────────────────────────────────
  if (step === "payment") {
    return (
      <div style={overlay} onClick={() => setStep("menu")}>
        <div style={sheet} onClick={(e) => e.stopPropagation()}>
          {/* Header */}
          <div style={{ padding: "18px 16px 10px", borderBottom: `1px solid ${COLORS.grayMid}`, display: "flex", alignItems: "center", gap: 10 }}>
            <button onClick={() => setStep("menu")} style={{ background: COLORS.gray, border: "none", borderRadius: "50%", width: 34, height: 34, cursor: "pointer", fontSize: 16 }}>‹</button>
            <h2 style={{ fontSize: 17, fontWeight: 700, color: COLORS.text, margin: 0 }}>اختر طريقة الدفع</h2>
          </div>

          <div style={{ padding: "14px 16px 24px", overflowY: "auto", maxHeight: 520 }}>
            {/* Order Summary */}
            <div style={{ background: COLORS.primaryLight, borderRadius: 14, padding: "12px 16px", marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 13, color: COLORS.textMuted }}>إجمالي الطلب</span>
                <span style={{ fontSize: 20, fontWeight: 800, color: COLORS.primary }}>{cartTotal} ج.م</span>
              </div>
              <div style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 4 }}>{cartCount} صنف من {r.name}</div>
            </div>

            {/* Payment Options */}
            <p style={{ fontSize: 13, fontWeight: 700, color: COLORS.textMuted, marginBottom: 10 }}>المحافظ الإلكترونية والدفع</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {paymentMethods.map((method) => {
                const active = selectedPayment === method.id;
                return (
                  <button
                    key={method.id}
                    onClick={() => setSelectedPayment(method.id)}
                    style={{
                      display: "flex", alignItems: "center", gap: 14,
                      background: active ? method.bg : COLORS.white,
                      border: `2px solid ${active ? method.color : COLORS.grayMid}`,
                      borderRadius: 14, padding: "13px 14px",
                      cursor: "pointer", fontFamily: "inherit",
                      transition: "all 0.2s", textAlign: "right",
                    }}
                  >
                    <div style={{ width: 46, height: 46, borderRadius: 12, background: method.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>
                      {method.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: 15, color: COLORS.text }}>{method.name}</div>
                      <div style={{ fontSize: 12, color: COLORS.grayText, marginTop: 2 }}>{method.description}</div>
                    </div>
                    <div style={{ width: 22, height: 22, borderRadius: "50%", border: `2px solid ${active ? method.color : COLORS.grayMid}`, background: active ? method.color : "transparent", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {active && <span style={{ color: "#fff", fontSize: 12, fontWeight: 700 }}>✓</span>}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Confirm Button */}
            <button
              onClick={handleConfirm}
              disabled={!selectedPayment}
              style={{
                width: "100%", marginTop: 20,
                background: selectedPayment ? COLORS.primary : COLORS.grayMid,
                color: selectedPayment ? "#fff" : COLORS.grayText,
                border: "none", borderRadius: 14, padding: "15px 0",
                fontSize: 16, fontWeight: 700, cursor: selectedPayment ? "pointer" : "not-allowed",
                fontFamily: "inherit", transition: "background 0.2s",
              }}
            >
              {selectedPayment ? `تأكيد الدفع — ${cartTotal} ج.م` : "اختر طريقة دفع أولاً"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── MENU SCREEN ──────────────────────────────────────────────────
  return (
    <div style={overlay} onClick={onClose}>
      <div style={sheet} onClick={(e) => e.stopPropagation()}>
        {/* Hero */}
        <div style={{ height: 150, background: r.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 68, borderRadius: "24px 24px 0 0", position: "relative" }}>
          {r.image}
          <button onClick={onClose} style={{ position: "absolute", top: 14, right: 14, background: COLORS.white, border: "none", borderRadius: "50%", width: 34, height: 34, fontSize: 16, cursor: "pointer" }}>✕</button>
          <button onClick={onFav} style={{ position: "absolute", top: 14, left: 14, background: COLORS.white, border: "none", borderRadius: "50%", width: 34, height: 34, fontSize: 16, cursor: "pointer" }}>{isFav ? "❤️" : "🤍"}</button>
        </div>

        <div style={{ padding: "14px 16px 0", overflowY: "auto", maxHeight: 560 }}>
          {/* Info */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
            <h2 style={{ margin: 0, fontSize: 19, fontWeight: 700, color: COLORS.text }}>{r.name}</h2>
            <StarRating rating={r.rating} />
          </div>
          <p style={{ margin: "0 0 10px", fontSize: 13, color: COLORS.textMuted }}>{r.category}</p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 14 }}>
            <Badge text={`⏱ ${r.time} دقيقة`} color={COLORS.primary} />
            <Badge text={`🛵 ${r.fee}`} color={COLORS.green} />
            <Badge text={`📦 ${r.minOrder}`} color="#8E44AD" />
          </div>

          {/* Payment Badges */}
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
            {[
              { label: "فودافون كاش", color: "#E60000", bg: "#FFF0F0" },
              { label: "إنستاباي", color: "#7B2FBE", bg: "#F5EDFF" },
              { label: "فوري", color: "#FF8C00", bg: "#FFF5E6" },
              { label: "كاش", color: "#2ECC71", bg: "#EDFAF3" },
            ].map((p) => (
              <span key={p.label} style={{ background: p.bg, color: p.color, fontSize: 11, fontWeight: 700, borderRadius: 8, padding: "3px 9px" }}>{p.label}</span>
            ))}
          </div>

          {/* Menu */}
          {menuSections.map((section) => (
            <div key={section.name} style={{ marginBottom: 14 }}>
              <h3 style={{ margin: "0 0 10px", fontSize: 14, fontWeight: 700, color: COLORS.text, borderRight: `3px solid ${COLORS.primary}`, paddingRight: 8 }}>{section.name}</h3>
              {section.items.map((item) => (
                <div key={item.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: `1px solid ${COLORS.grayMid}` }}>
                  <div style={{ width: 52, height: 52, borderRadius: 12, background: r.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, flexShrink: 0 }}>{item.emoji}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 14, color: COLORS.text }}>{item.name}</div>
                    <div style={{ fontSize: 11, color: COLORS.grayText, marginTop: 2 }}>{item.desc}</div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
                    <span style={{ fontWeight: 700, fontSize: 14, color: COLORS.primary }}>{item.price} ج.م</span>
                    {cart[item.id] ? (
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <button onClick={() => removeItem(item.id)} style={qtyBtn(COLORS.grayMid, COLORS.text)}>−</button>
                        <span style={{ fontWeight: 700, fontSize: 14, minWidth: 16, textAlign: "center" }}>{cart[item.id]}</span>
                        <button onClick={() => addItem(item.id)} style={qtyBtn(COLORS.primary, "#fff")}>+</button>
                      </div>
                    ) : (
                      <button onClick={() => addItem(item.id)} style={qtyBtn(COLORS.primary, "#fff")}>+</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}

          {/* Cart Bar */}
          {cartCount > 0 && (
            <div style={{ position: "sticky", bottom: 0, background: "#fff", paddingTop: 10, paddingBottom: 16 }}>
              <button
                onClick={() => setStep("payment")}
                style={{ width: "100%", background: COLORS.primary, color: "#fff", border: "none", borderRadius: 14, padding: "15px 20px", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", display: "flex", justifyContent: "space-between", alignItems: "center" }}
              >
                <span style={{ background: "rgba(255,255,255,0.25)", borderRadius: 8, padding: "2px 10px", fontSize: 14 }}>{cartCount}</span>
                <span>اختر طريقة الدفع</span>
                <span>{cartTotal} ج.م</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Helpers ──────────────────────────────────────────────────────
function Row({ label, value, bold }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", borderBottom: "1px solid #e8e8e8" }}>
      <span style={{ fontSize: 13, color: "#757575" }}>{label}</span>
      <span style={{ fontSize: 13, fontWeight: bold ? 700 : 500, color: bold ? "#FF6B00" : "#212121" }}>{value}</span>
    </div>
  );
}

function qtyBtn(bg, color) {
  return { background: bg, border: "none", borderRadius: 8, width: 28, height: 28, color, fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" };
}

const overlay = { position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 200, display: "flex", flexDirection: "column", justifyContent: "flex-end" };
const sheet = { background: "#fff", borderRadius: "24px 24px 0 0", maxHeight: "92%", display: "flex", flexDirection: "column" };
