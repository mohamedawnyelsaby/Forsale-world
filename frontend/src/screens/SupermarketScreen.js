// frontend/src/screens/SupermarketScreen.js
import { useState } from "react";
import COLORS from "../constants/colors";
import S from "../styles";
import { supermarketCategories, supermarkets, supermarketProducts } from "../data";

export default function SupermarketScreen({ dark, onBack }) {
  const [selCat, setSelCat] = useState(null);
  const [cart, setCart]     = useState({});
  const [imgErr, setImgErr] = useState({});

  const card    = dark ? "#1C1C1C" : "#fff";
  const cardAlt = dark ? "#252525" : "#F7F7F7";
  const border  = dark ? "rgba(255,255,255,.07)" : "#EFEFEF";
  const text    = dark ? "#F0F0F0" : "#1A1A1A";
  const muted   = dark ? "#888"    : "#777";
  const bg      = dark ? "#111"    : "#F2F2F2";

  const addItem = id => setCart(p => ({ ...p, [id]: (p[id] || 0) + 1 }));
  const rmItem  = id => setCart(p => { const n = { ...p }; if (n[id] > 1) n[id]--; else delete n[id]; return n; });
  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const filtered = selCat ? supermarketProducts.filter(p => p.cat === selCat) : supermarketProducts;

  return (
    <div style={{ ...S.screen, background: bg }}>
      {/* Header */}
      <div style={{ background: card, padding: "12px 16px", borderBottom: `1px solid ${border}`, display: "flex", alignItems: "center", gap: 12 }}>
        <button onClick={onBack} style={{ background: cardAlt, border: "none", borderRadius: 12, width: 38, height: 38, cursor: "pointer", fontSize: 20, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>‹</button>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 16, fontWeight: 800, color: text }}>🛒 سوبرماركت وهايبر</div>
          <div style={{ fontSize: 11, color: muted }}>توصيل طازج لحد بيتك</div>
        </div>
        <div style={{ position: "relative" }}>
          <button style={{ background: COLORS.primaryLight, border: "none", borderRadius: 12, width: 40, height: 40, cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center" }}>🛒</button>
          {cartCount > 0 && <div style={{ position: "absolute", top: -4, left: -4, width: 18, height: 18, background: COLORS.primary, borderRadius: "50%", fontSize: 10, color: "#fff", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>{cartCount}</div>}
        </div>
      </div>

      {/* Categories */}
      <div style={{ padding: "12px 0 0" }}>
        <div style={{ display: "flex", gap: 10, overflowX: "auto", padding: "0 16px 4px", scrollbarWidth: "none" }}>
          <div onClick={() => setSelCat(null)}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5, cursor: "pointer", minWidth: 56 }}>
            <div style={{ width: 54, height: 54, borderRadius: 16, background: !selCat ? COLORS.primary : (dark ? "#252525" : "#F0F0F0"), display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>🏪</div>
            <span style={{ fontSize: 10, fontWeight: 600, color: !selCat ? COLORS.primary : muted, whiteSpace: "nowrap" }}>الكل</span>
          </div>
          {supermarketCategories.map(cat => (
            <div key={cat.id} onClick={() => setSelCat(cat.label)}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5, cursor: "pointer", minWidth: 56 }}>
              <div style={{ width: 54, height: 54, borderRadius: 16, background: selCat === cat.label ? COLORS.primary : (dark ? "#252525" : "#F0F0F0"), display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>{cat.icon}</div>
              <span style={{ fontSize: 10, fontWeight: 600, color: selCat === cat.label ? COLORS.primary : muted, whiteSpace: "nowrap" }}>{cat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Stores */}
      <div style={{ padding: "14px 16px 0" }}>
        <div style={{ fontWeight: 700, fontSize: 14, color: text, marginBottom: 10 }}>المتاجر المتاحة</div>
        <div style={{ display: "flex", gap: 12, overflowX: "auto", paddingBottom: 4, scrollbarWidth: "none" }}>
          {supermarkets.map(s => (
            <div key={s.id} style={{ background: card, borderRadius: 16, overflow: "hidden", minWidth: 140, boxShadow: "0 2px 12px rgba(0,0,0,.08)", cursor: "pointer", flexShrink: 0 }}>
              <div style={{ height: 80, position: "relative", background: s.bg }}>
                {s.photo && !imgErr[`sm${s.id}`]
                  ? <img src={s.photo} alt="" onError={() => setImgErr(p => ({ ...p, [`sm${s.id}`]: true }))} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  : <div style={{ width: "100%", height: "100%", background: s.bg }} />
                }
                {s.offer && <div style={{ position: "absolute", top: 6, right: 6, background: COLORS.primary, color: "#fff", fontSize: 9, fontWeight: 700, borderRadius: 6, padding: "2px 6px" }}>{s.offer}</div>}
              </div>
              <div style={{ padding: "8px 10px" }}>
                <div style={{ fontWeight: 700, fontSize: 13, color: text }}>{s.name}</div>
                <div style={{ fontSize: 10, color: muted, marginTop: 2 }}>⏱ {s.time} دق  •  🛵 {s.fee}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Products grid */}
      <div style={{ padding: "14px 16px 0" }}>
        <div style={{ fontWeight: 700, fontSize: 14, color: text, marginBottom: 12 }}>{selCat || "جميع المنتجات"}</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {filtered.map(prod => (
            <div key={prod.id} style={{ background: card, borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 10px rgba(0,0,0,.07)" }}>
              <div style={{ height: 110, overflow: "hidden" }}>
                {prod.photo && !imgErr[`p${prod.id}`]
                  ? <img src={prod.photo} alt="" onError={() => setImgErr(p => ({ ...p, [`p${prod.id}`]: true }))} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  : <div style={{ width: "100%", height: "100%", background: "#f0f0f0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36 }}>🛒</div>
                }
              </div>
              <div style={{ padding: "8px 10px" }}>
                <div style={{ fontWeight: 600, fontSize: 13, color: text, marginBottom: 2 }}>{prod.name}</div>
                <div style={{ fontSize: 11, color: muted, marginBottom: 6 }}>{prod.unit}</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontWeight: 800, fontSize: 14, color: COLORS.primary }}>{prod.price} ج.م</span>
                  {cart[prod.id] ? (
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <button onClick={() => rmItem(prod.id)} style={{ background: cardAlt, border: "none", borderRadius: 6, width: 24, height: 24, cursor: "pointer", fontSize: 14, color: text }}>−</button>
                      <span style={{ fontWeight: 700, fontSize: 13, color: text }}>{cart[prod.id]}</span>
                      <button onClick={() => addItem(prod.id)} style={{ background: COLORS.primary, border: "none", borderRadius: 6, width: 24, height: 24, cursor: "pointer", fontSize: 14, color: "#fff" }}>+</button>
                    </div>
                  ) : (
                    <button onClick={() => addItem(prod.id)} style={{ background: COLORS.primary, border: "none", borderRadius: 8, width: 28, height: 28, cursor: "pointer", fontSize: 16, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ height: 20 }} />
    </div>
  );
}
