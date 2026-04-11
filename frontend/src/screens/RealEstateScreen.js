// frontend/src/screens/RealEstateScreen.js
import { useState } from "react";
import COLORS from "../constants/colors";
import S from "../styles";
import { realEstateCategories, properties } from "../data";

export default function RealEstateScreen({ dark, onBack }) {
  const [selType, setSelType] = useState(null);
  const [imgErr, setImgErr]   = useState({});
  const [selected, setSelected] = useState(null);

  const card    = dark ? "#1C1C1C" : "#fff";
  const cardAlt = dark ? "#252525" : "#F7F7F7";
  const border  = dark ? "rgba(255,255,255,.07)" : "#EFEFEF";
  const text    = dark ? "#F0F0F0" : "#1A1A1A";
  const muted   = dark ? "#888"    : "#777";
  const bg      = dark ? "#111"    : "#F2F2F2";

  const filtered = selType ? properties.filter(p => p.type === selType) : properties;

  if (selected) {
    const p = selected;
    return (
      <div style={{ ...S.screen, background: bg }}>
        <div style={{ position: "relative", height: 260 }}>
          {p.photo && !imgErr[`d${p.id}`]
            ? <img src={p.photo} alt="" onError={() => setImgErr(pr => ({ ...pr, [`d${p.id}`]: true }))} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            : <div style={{ width: "100%", height: "100%", background: "#4A148C", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 64 }}>🏠</div>
          }
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,.65) 0%, transparent 55%)" }} />
          <button onClick={() => setSelected(null)} style={{ position: "absolute", top: 14, right: 14, background: "rgba(255,255,255,.9)", border: "none", borderRadius: "50%", width: 36, height: 36, cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center" }}>‹</button>
          <div style={{ position: "absolute", bottom: 16, right: 16, left: 16 }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: "#fff" }}>{p.name}</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,.8)", marginTop: 3 }}>📍 {p.location}</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: COLORS.primary, marginTop: 6 }}>{p.price}</div>
          </div>
        </div>
        <div style={{ padding: "16px" }}>
          <div style={{ background: card, borderRadius: 18, padding: "16px", marginBottom: 12, border: `1px solid ${border}` }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: text, marginBottom: 12 }}>تفاصيل العقار</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {[
                ["📐 المساحة", `${p.area} م²`],
                ...(p.rooms ? [["🛏️ الغرف", `${p.rooms} غرف`]] : []),
                ...(p.baths ? [["🚿 الحمامات", `${p.baths} حمام`]] : []),
                ...(p.floor ? [["🏢 الطابق", `الطابق ${p.floor}`]] : []),
                ["🛋️ الفرش", p.furnished ? "مفروشة" : "غير مفروشة"],
                ["📍 الموقع", p.location],
              ].map(([label, val]) => (
                <div key={label} style={{ background: cardAlt, borderRadius: 12, padding: "10px 12px" }}>
                  <div style={{ fontSize: 11, color: muted }}>{label}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: text, marginTop: 3 }}>{val}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button style={{ flex: 1, background: COLORS.primary, color: "#fff", border: "none", borderRadius: 14, padding: "14px 0", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>📞 تواصل الآن</button>
            <button style={{ flex: 1, background: cardAlt, color: text, border: `1px solid ${border}`, borderRadius: 14, padding: "14px 0", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>❤️ حفظ</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ ...S.screen, background: bg }}>
      {/* Header */}
      <div style={{ background: card, padding: "12px 16px", borderBottom: `1px solid ${border}`, display: "flex", alignItems: "center", gap: 12 }}>
        <button onClick={onBack} style={{ background: cardAlt, border: "none", borderRadius: 12, width: 38, height: 38, cursor: "pointer", fontSize: 20, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>‹</button>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 16, fontWeight: 800, color: text }}>🏠 عقارات</div>
          <div style={{ fontSize: 11, color: muted }}>شقق • فيلل • أراضي • مكاتب</div>
        </div>
        <button style={{ background: cardAlt, border: `1px solid ${border}`, borderRadius: 10, padding: "6px 12px", cursor: "pointer", fontSize: 12, color: text, fontFamily: "inherit" }}>⚙️ فلتر</button>
      </div>

      {/* Banner */}
      <div style={{ margin: "12px 16px 0", borderRadius: 18, overflow: "hidden", height: 110, background: "linear-gradient(135deg,#4A148C,#7B1FA2)", position: "relative", display: "flex", alignItems: "center", padding: "0 20px" }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 17, fontWeight: 800, color: "#fff" }}>ابحث عن بيت أحلامك 🏡</div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,.8)", marginTop: 4 }}>أكثر من 500 عقار متاح</div>
        </div>
        <div style={{ fontSize: 52, opacity: .25 }}>🏠</div>
      </div>

      {/* Type filters */}
      <div style={{ padding: "14px 16px 0" }}>
        <div style={{ display: "flex", gap: 8, overflowX: "auto", scrollbarWidth: "none" }}>
          <button onClick={() => setSelType(null)}
            style={{ padding: "8px 16px", borderRadius: 20, border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 12, fontWeight: 700, background: !selType ? "#4A148C" : cardAlt, color: !selType ? "#fff" : muted, flexShrink: 0 }}>
            الكل
          </button>
          {realEstateCategories.map(cat => (
            <button key={cat.id} onClick={() => setSelType(cat.id)}
              style={{ padding: "8px 16px", borderRadius: 20, border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 12, fontWeight: 700, background: selType === cat.id ? "#4A148C" : cardAlt, color: selType === cat.id ? "#fff" : muted, flexShrink: 0, whiteSpace: "nowrap" }}>
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Properties */}
      <div style={{ padding: "14px 16px 0" }}>
        <div style={{ fontWeight: 700, fontSize: 14, color: text, marginBottom: 12 }}>{filtered.length} عقار متاح</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {filtered.map(prop => (
            <div key={prop.id} onClick={() => setSelected(prop)}
              style={{ background: card, borderRadius: 18, overflow: "hidden", boxShadow: "0 3px 16px rgba(0,0,0,.09)", cursor: "pointer" }}>
              <div style={{ height: 180, position: "relative", overflow: "hidden" }}>
                {prop.photo && !imgErr[prop.id]
                  ? <img src={prop.photo} alt="" onError={() => setImgErr(p => ({ ...p, [prop.id]: true }))} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  : <div style={{ width: "100%", height: "100%", background: "#4A148C", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 64 }}>🏠</div>
                }
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,.55) 0%, transparent 60%)" }} />
                {prop.badge && <div style={{ position: "absolute", top: 12, right: 12, background: COLORS.primary, color: "#fff", fontSize: 10, fontWeight: 700, borderRadius: 8, padding: "3px 10px" }}>{prop.badge}</div>}
                <div style={{ position: "absolute", bottom: 12, right: 14, left: 14 }}>
                  <div style={{ fontSize: 16, fontWeight: 800, color: "#fff" }}>{prop.name}</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,.8)", marginTop: 2 }}>📍 {prop.location}</div>
                </div>
              </div>
              <div style={{ padding: "12px 14px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <div style={{ fontSize: 17, fontWeight: 800, color: COLORS.primary }}>{prop.price}</div>
                  <div style={{ background: "#F3E5F5", color: "#4A148C", fontSize: 10, fontWeight: 700, borderRadius: 8, padding: "3px 10px" }}>
                    {realEstateCategories.find(c => c.id === prop.type)?.label}
                  </div>
                </div>
                <div style={{ display: "flex", gap: 14, fontSize: 12, color: muted }}>
                  <span>📐 {prop.area} م²</span>
                  {prop.rooms && <span>🛏️ {prop.rooms} غرف</span>}
                  {prop.baths && <span>🚿 {prop.baths} حمام</span>}
                  <span>🛋️ {prop.furnished ? "مفروشة" : "غير مفروشة"}</span>
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
