import { useState } from "react";
import COLORS from "../constants/colors";
import { paymentMethods, menuItems } from "../data";

export default function RestaurantModal({ r, onClose, isFav, onFav, onOrderConfirmed, dark }) {
  const [cart, setCart] = useState({});
  const [step, setStep] = useState("menu");
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [groupOpen, setGroupOpen] = useState(false);
  const [schedOpen, setSchedOpen] = useState(false);
  const [schedTime, setSchedTime] = useState("14:30");

  const card = dark ? "#1C1C1C" : COLORS.white;
  const cardAlt = dark ? "#252525" : "#F8F8F8";
  const border = dark ? "rgba(255,255,255,.08)" : "#EBEBEB";
  const text = dark ? "#F0F0F0" : COLORS.text;
  const muted = dark ? "#999" : COLORS.textMuted;
  const grayText = dark ? "#555" : "#AAA";

  const addItem = (id) => setCart((p) => ({ ...p, [id]: (p[id] || 0) + 1 }));
  const removeItem = (id) =>
    setCart((p) => {
      const n = { ...p };
      if (n[id] > 1) n[id]--;
      else delete n[id];
      return n;
    });

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const cartTotal = menuItems.reduce((s, i) => s + (cart[i.id] || 0) * i.price, 0);

  const overlay = {
    position: "absolute", inset: 0, background: "rgba(0,0,0,.5)",
    zIndex: 200, display: "flex", flexDirection: "column", justifyContent: "flex-end",
  };
  const sheet = {
    background: card, borderRadius: "24px 24px 0 0",
    maxHeight: "93%", display: "flex", flexDirection: "column",
    animation: "slideUp .35s ease",
  };

  // ── CONFIRM ──
  if (step === "confirm") {
    const method = paymentMethods.find((p) => p.id === selectedPayment);
    return (
      <div style={overlay} onClick={onClose}>
        <div style={sheet} onClick={(e) => e.stopPropagation()}>
          <div style={{ padding: "32px 20px", textAlign: "center" }}>
            <div style={{ fontSize: 56, marginBottom: 12 }}>✅</div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: text, margin: "0 0 6px" }}>تم تأكيد الطلب!</h2>
            <p style={{ fontSize: 13, color: muted, margin: "0 0 20px" }}>طلبك في الطريق إليك 🛵</p>
            <div style={{ background: cardAlt, borderRadius: 14, padding: "14px 16px", marginBottom: 14, textAlign: "right" }}>
              {[["المطعم", r.name], ["المجموع", `${cartTotal} ج.م`], ["طريقة الدفع", method?.name], ["وقت التوصيل", `${r.time} دقيقة`]].map(([l, v]) => (
                <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", borderBottom: `1px solid ${border}` }}>
                  <span style={{ fontSize: 12, color: muted }}>{l}</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: text }}>{v}</span>
                </div>
              ))}
            </div>
            <div style={{ background: "#FFF3EB", borderRadius: 12, padding: 10, marginBottom: 16, display: "flex", alignItems: "center", gap: 8, justifyContent: "center" }}>
              <span style={{ fontSize: 16 }}>🎁</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: COLORS.primary }}>حصلت على 120 نقطة ولاء!</span>
            </div>
            {selectedPayment === "fawry" && (
              <div style={{ background: "#FFF5E6", border: "1px solid #FF8C00", borderRadius: 12, padding: "12px 16px", marginBottom: 12, textAlign: "right" }}>
                <p style={{ fontSize: 13, color: "#FF8C00", fontWeight: 700, marginBottom: 4 }}>كود فوري للدفع</p>
                <p style={{ fontSize: 20, fontWeight: 800, color: "#E07000", letterSpacing: 2 }}>
                  {Math.floor(Math.random() * 9000000000 + 1000000000)}
                </p>
              </div>
            )}
            {selectedPayment === "vodafone_cash" && (
              <div style={{ background: "#FFF0F0", border: "1px solid #E60000", borderRadius: 12, padding: "12px 16px", marginBottom: 12, textAlign: "right" }}>
                <p style={{ fontSize: 13, color: "#E60000", fontWeight: 700, marginBottom: 4 }}>حوّل على رقم فودافون كاش</p>
                <p style={{ fontSize: 18, fontWeight: 800, color: "#B00000" }}>01001234567</p>
                <p style={{ fontSize: 11, color: "#E60000", marginTop: 4 }}>المبلغ: {cartTotal} ج.م</p>
              </div>
            )}
            {selectedPayment === "instapay" && (
              <div style={{ background: "#F5EDFF", border: "1px solid #7B2FBE", borderRadius: 12, padding: "12px 16px", marginBottom: 12, textAlign: "right" }}>
                <p style={{ fontSize: 13, color: "#7B2FBE", fontWeight: 700, marginBottom: 4 }}>حوّل عبر إنستاباي</p>
                <p style={{ fontSize: 16, fontWeight: 800, color: "#5A1E9A" }}>forsale@instapay</p>
                <p style={{ fontSize: 11, color: "#7B2FBE", marginTop: 4 }}>المبلغ: {cartTotal} ج.م</p>
              </div>
            )}
            <button
              onClick={() => { if (onOrderConfirmed) onOrderConfirmed(cartTotal); onClose(); }}
              style={{ width: "100%", background: "linear-gradient(135deg,#FF6B00,#CC5500)", color: "#fff", border: "none", borderRadius: 14, padding: "14px 0", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}
            >
              العودة للرئيسية
            </button>
          </div>
        </div>
        <style>{`@keyframes slideUp{from{transform:translateY(100%)}to{transform:translateY(0)}}`}</style>
      </div>
    );
  }

  // ── PAYMENT ──
  if (step === "payment") {
    return (
      <div style={overlay} onClick={() => setStep("menu")}>
        <div style={sheet} onClick={(e) => e.stopPropagation()}>
          <div style={{ padding: "14px 16px", borderBottom: `1px solid ${border}`, display: "flex", alignItems: "center", gap: 10 }}>
            <button onClick={() => setStep("menu")} style={{ background: cardAlt, border: "none", borderRadius: "50%", width: 32, height: 32, cursor: "pointer", fontSize: 16 }}>‹</button>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: text, margin: 0 }}>اختر طريقة الدفع</h2>
          </div>
          <div style={{ padding: "14px 16px 24px", overflowY: "auto", maxHeight: 500 }}>
            <div style={{ background: "#FFF3EB", borderRadius: 14, padding: "12px 16px", marginBottom: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 13, color: COLORS.primary }}>إجمالي الطلب</span>
              <span style={{ fontSize: 22, fontWeight: 800, color: COLORS.primary }}>{cartTotal} ج.م</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {paymentMethods.map((method) => {
                const active = selectedPayment === method.id;
                return (
                  <button
                    key={method.id}
                    onClick={() => setSelectedPayment(method.id)}
                    style={{
                      display: "flex", alignItems: "center", gap: 12,
                      background: active ? method.bg : cardAlt,
                      border: `2px solid ${active ? method.color : border}`,
                      borderRadius: 14, padding: "12px 14px",
                      cursor: "pointer", fontFamily: "inherit", textAlign: "right",
                      transition: "all .2s",
                    }}
                  >
                    <div style={{ width: 42, height: 42, borderRadius: 12, background: method.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>
                      {method.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: 14, color: text }}>{method.name}</div>
                      <div style={{ fontSize: 11, color: grayText, marginTop: 2 }}>{method.description}</div>
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
            <button
              onClick={() => { if (selectedPayment) setStep("confirm"); }}
              disabled={!selectedPayment}
              style={{
                width: "100%", marginTop: 16,
                background: selectedPayment ? "linear-gradient(135deg,#FF6B00,#CC5500)" : (dark ? "#2a2a2a" : "#F0F0F0"),
                color: selectedPayment ? "#fff" : grayText,
                border: "none", borderRadius: 14, padding: 14,
                fontSize: 15, fontWeight: 700,
                cursor: selectedPayment ? "pointer" : "not-allowed",
                fontFamily: "inherit", transition: "background .2s",
              }}
            >
              {selectedPayment ? `تأكيد الدفع — ${cartTotal} ج.م` : "اختر طريقة دفع أولاً"}
            </button>
          </div>
        </div>
        <style>{`@keyframes slideUp{from{transform:translateY(100%)}to{transform:translateY(0)}}`}</style>
      </div>
    );
  }

  // ── MENU ──
  return (
    <div style={overlay} onClick={onClose}>
      <div style={sheet} onClick={(e) => e.stopPropagation()}>
        <div style={{ height: 138, background: r.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 62, borderRadius: "24px 24px 0 0", position: "relative" }}>
          {r.image}
          <button onClick={onClose} style={{ position: "absolute", top: 12, right: 12, background: "#fff", border: "none", borderRadius: "50%", width: 32, height: 32, fontSize: 14, cursor: "pointer" }}>✕</button>
          <button onClick={onFav} style={{ position: "absolute", top: 12, left: 12, background: "#fff", border: "none", borderRadius: "50%", width: 32, height: 32, fontSize: 14, cursor: "pointer" }}>{isFav ? "❤️" : "🤍"}</button>
        </div>

        <div style={{ padding: "14px 16px 0", overflowY: "auto", maxHeight: 560 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 3 }}>
            <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: text }}>{r.name}</h2>
            <span style={{ fontSize: 13, color: COLORS.star }}>★ {r.rating}</span>
          </div>
          <p style={{ margin: "0 0 12px", fontSize: 12, color: muted }}>{r.category}</p>

          {/* Group & Schedule buttons */}
          <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
            <button
              onClick={() => setGroupOpen(!groupOpen)}
              style={{
                flex: 1, background: groupOpen ? "#FFF3EB" : cardAlt, color: COLORS.primary,
                border: `1.5px solid ${groupOpen ? "rgba(255,107,0,.4)" : border}`,
                borderRadius: 10, padding: "9px 0", fontSize: 11, fontWeight: 700,
                cursor: "pointer", fontFamily: "inherit", transition: "all .2s",
              }}
            >
              👥 طلب جماعي
            </button>
            <button
              onClick={() => setSchedOpen(!schedOpen)}
              style={{
                flex: 1, background: schedOpen ? "#F3E8FF" : cardAlt, color: COLORS.purple,
                border: `1.5px solid ${schedOpen ? "rgba(123,47,190,.4)" : border}`,
                borderRadius: 10, padding: "9px 0", fontSize: 11, fontWeight: 700,
                cursor: "pointer", fontFamily: "inherit", transition: "all .2s",
              }}
            >
              🕐 جدولة الطلب
            </button>
          </div>

          {/* Group Order Panel */}
          {groupOpen && (
            <div style={{ background: "#FFF3EB", borderRadius: 14, padding: "12px 14px", marginBottom: 12, border: "1.5px solid rgba(255,107,0,.25)" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.primary, marginBottom: 6 }}>👥 الطلب الجماعي</div>
              <div style={{ fontSize: 11, color: "#CC5500", marginBottom: 8 }}>شارك الرابط مع أصحابك عشان كل واحد يضيف طلبه</div>
              <div style={{ background: "#fff", borderRadius: 10, padding: "8px 12px", display: "flex", justifyContent: "space-between", alignItems: "center", border: "1px solid rgba(255,107,0,.2)" }}>
                <span style={{ fontSize: 11, color: "#888", fontFamily: "monospace" }}>forsale.app/group/XK9M2</span>
                <button style={{ background: COLORS.primary, color: "#fff", border: "none", borderRadius: 8, padding: "4px 10px", fontSize: 10, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>نسخ</button>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 8, alignItems: "center" }}>
                {["أ", "م"].map((l) => (
                  <div key={l} style={{ width: 30, height: 30, borderRadius: "50%", background: COLORS.primary, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#fff", fontWeight: 700 }}>{l}</div>
                ))}
                <div style={{ width: 30, height: 30, borderRadius: "50%", background: "rgba(255,107,0,.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, color: COLORS.primary }}>+</div>
                <span style={{ fontSize: 11, color: "#CC5500" }}>شخصان انضموا</span>
              </div>
            </div>
          )}

          {/* Schedule Panel */}
          {schedOpen && (
            <div style={{ background: "#F3E8FF", borderRadius: 14, padding: "12px 14px", marginBottom: 12, border: "1.5px solid rgba(123,47,190,.25)" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.purple, marginBottom: 6 }}>🕐 جدولة الطلب</div>
              <div style={{ fontSize: 11, color: "#5A1E9A", marginBottom: 8 }}>اختر وقت التوصيل المناسب ليك</div>
              <input
                type="time"
                value={schedTime}
                onChange={(e) => setSchedTime(e.target.value)}
                style={{ width: "100%", background: "#fff", border: "1px solid rgba(123,47,190,.3)", borderRadius: 10, padding: "8px 12px", fontSize: 14, color: "#5A1E9A", fontFamily: "inherit", outline: "none", boxSizing: "border-box" }}
              />
              <div style={{ fontSize: 10, color: COLORS.purple, marginTop: 6 }}>سيصلك طلبك في تمام {schedTime} ✨</div>
            </div>
          )}

          {/* Menu */}
          <h3 style={{ fontSize: 13, fontWeight: 700, color: text, margin: "0 0 10px", borderRight: `3px solid ${COLORS.primary}`, paddingRight: 8 }}>القائمة</h3>
          {menuItems.map((item) => (
            <div key={item.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: `1px solid ${border}` }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: r.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0 }}>{item.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 13, color: text }}>{item.name}</div>
                <div style={{ fontSize: 11, color: grayText, marginTop: 2 }}>{item.desc}</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
                <span style={{ fontWeight: 700, fontSize: 13, color: COLORS.primary }}>{item.price} ج.م</span>
                {cart[item.id] ? (
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <button onClick={() => removeItem(item.id)} style={{ background: cardAlt, border: "none", borderRadius: 8, width: 26, height: 26, color: text, fontSize: 16, cursor: "pointer" }}>−</button>
                    <span style={{ fontWeight: 700, fontSize: 13, minWidth: 14, textAlign: "center", color: text }}>{cart[item.id]}</span>
                    <button onClick={() => addItem(item.id)} style={{ background: COLORS.primary, border: "none", borderRadius: 8, width: 26, height: 26, color: "#fff", fontSize: 16, cursor: "pointer" }}>+</button>
                  </div>
                ) : (
                  <button onClick={() => addItem(item.id)} style={{ background: COLORS.primary, border: "none", borderRadius: 8, width: 26, height: 26, color: "#fff", fontSize: 16, cursor: "pointer" }}>+</button>
                )}
              </div>
            </div>
          ))}

          {/* Cart bar */}
          {cartCount > 0 && (
            <div style={{ position: "sticky", bottom: 0, background: card, paddingTop: 10, paddingBottom: 16 }}>
              <button
                onClick={() => setStep("payment")}
                style={{
                  width: "100%", background: "linear-gradient(135deg,#FF6B00,#CC5500)",
                  color: "#fff", border: "none", borderRadius: 14,
                  padding: "14px 20px", fontSize: 14, fontWeight: 700,
                  cursor: "pointer", fontFamily: "inherit",
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                }}
              >
                <span style={{ background: "rgba(255,255,255,.25)", borderRadius: 8, padding: "2px 8px", fontSize: 13 }}>{cartCount}</span>
                <span>اختر طريقة الدفع</span>
                <span>{cartTotal} ج.م</span>
              </button>
            </div>
          )}
        </div>
      </div>
      <style>{`@keyframes slideUp{from{transform:translateY(100%)}to{transform:translateY(0)}}`}</style>
    </div>
  );
}
