// frontend/src/screens/ElectronicsScreen.js
import { useState } from "react";
import COLORS from "../constants/colors";
import S from "../styles";
import { electronicsCategories, electronicsProducts } from "../data";

export default function ElectronicsScreen({ dark, onBack }) {
  const [selCat, setSelCat] = useState(null);
  const [imgErr, setImgErr] = useState({});

  const card    = dark ? "#1C1C1C" : "#fff";
  const cardAlt = dark ? "#252525" : "#F7F7F7";
  const border  = dark ? "rgba(255,255,255,.07)" : "#EFEFEF";
  const text    = dark ? "#F0F0F0" : "#1A1A1A";
  const muted   = dark ? "#888"    : "#777";
  const bg      = dark ? "#111"    : "#F2F2F2";

  const filtered = selCat ? electronicsProducts.filter(p => p.cat === selCat) : electronicsProducts;

  return (
    <div style={{ ...S.screen, background: bg }}>
      {/* Header */}
      <div style={{ background: card, padding: "12px 16px", borderBottom: `1px solid ${border}`, display: "flex", alignItems: "center", gap: 12 }}>
        <button onClick={onBack} style={{ background: cardAlt, border: "none", borderRadius: 12, width: 38, height: 38, cursor: "pointer", fontSize: 20, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>‹</button>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 16, fontWeight: 800, color: text }}>📱 إلكترونيات ومنزل</div>
          <div style={{ fontSize: 11, color: muted }}>أحدث التقنيات والأجهزة</div>
        </div>
      </div>

      {/* Banner */}
      <div style={{ margin: "12px 16px 0", borderRadius: 18, overflow: "hidden", height: 120, background: "linear-gradient(135deg,#1565C0,#42A5F5)", position: "relative", display: "flex", alignItems: "center", padding: "0 20px" }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 18, fontWeight: 800, color: "#fff" }}>عروض الموسم 🔥</div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,.85)", marginTop: 4 }}>خصومات حتى 30% على الإلكترونيات</div>
          <div style={{ marginTop: 10, background: "#fff", color: "#1565C0", fontSize: 11, fontWeight: 700, borderRadius: 8, padding: "4px 14px", display: "inline-block" }}>تسوق الآن</div>
        </div>
        <div style={{ fontSize: 56, opacity: .3 }}>📱</div>
      </div>

      {/* Categories */}
      <div style={{ padding: "14px 0 0" }}>
        <div style={{ display: "flex", gap: 10, overflowX: "auto", padding: "0 16px 4px", scrollbarWidth: "none" }}>
          <div onClick={() => setSelCat(null)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5, cursor: "pointer", minWidth: 56 }}>
            <div style={{ width: 54, height: 54, borderRadius: 16, background: !selCat ? "#1565C0" : (dark ? "#252525" : "#E3F2FD"), display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>📦</div>
            <span style={{ fontSize: 10, fontWeight: 600, color: !selCat ? "#1565C0" : muted }}>الكل</span>
          </div>
          {electronicsCategories.map(cat => (
            <div key={cat.id} onClick={() => setSelCat(cat.label)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5, cursor: "pointer", minWidth: 56 }}>
              <div style={{ width: 54, height: 54, borderRadius: 16, background: selCat === cat.label ? "#1565C0" : (dark ? "#252525" : "#E3F2FD"), display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>{cat.icon}</div>
              <span style={{ fontSize: 10, fontWeight: 600, color: selCat === cat.label ? "#1565C0" : muted, whiteSpace: "nowrap" }}>{cat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Products */}
      <div style={{ padding: "14px 16px 0" }}>
        <div style={{ fontWeight: 700, fontSize: 14, color: text, marginBottom: 12 }}>{selCat || "جميع المنتجات"} ({filtered.length})</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {filtered.map(prod => (
            <div key={prod.id} style={{ background: card, borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,.08)", cursor: "pointer" }}>
              <div style={{ height: 130, overflow: "hidden", position: "relative", background: "#f5f5f5" }}>
                {prod.photo && !imgErr[prod.id]
                  ? <img src={prod.photo} alt="" onError={() => setImgErr(p => ({ ...p, [prod.id]: true }))} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 44 }}>📱</div>
                }
                {prod.badge && <div style={{ position: "absolute", top: 8, right: 8, background: COLORS.primary, color: "#fff", fontSize: 9, fontWeight: 700, borderRadius: 6, padding: "3px 7px" }}>{prod.badge}</div>}
              </div>
              <div style={{ padding: "10px 10px 12px" }}>
                <div style={{ fontWeight: 600, fontSize: 12, color: text, marginBottom: 4, lineHeight: 1.4 }}>{prod.name}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 6 }}>
                  <span style={{ color: COLORS.star, fontSize: 11 }}>★</span>
                  <span style={{ fontSize: 11, color: muted }}>{prod.rating} ({prod.reviews})</span>
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: COLORS.primary }}>{prod.price.toLocaleString()} ج.م</div>
                  {prod.oldPrice && <div style={{ fontSize: 11, color: muted, textDecoration: "line-through" }}>{prod.oldPrice.toLocaleString()} ج.م</div>}
                </div>
                <button style={{ width: "100%", marginTop: 8, background: "#E3F2FD", color: "#1565C0", border: "none", borderRadius: 10, padding: "7px 0", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>أضف للسلة</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ height: 20 }} />
    </div>
  );
}
