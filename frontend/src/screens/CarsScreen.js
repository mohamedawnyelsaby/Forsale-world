// frontend/src/screens/CarsScreen.js
import { useState } from "react";
import COLORS from "../constants/colors";
import S from "../styles";
import { cars } from "../data";

export default function CarsScreen({ dark, onBack }) {
  const [tab, setTab]     = useState("all");
  const [imgErr, setImgErr] = useState({});
  const [selected, setSelected] = useState(null);

  const card    = dark ? "#1C1C1C" : "#fff";
  const cardAlt = dark ? "#252525" : "#F7F7F7";
  const border  = dark ? "rgba(255,255,255,.07)" : "#EFEFEF";
  const text    = dark ? "#F0F0F0" : "#1A1A1A";
  const muted   = dark ? "#888"    : "#777";
  const bg      = dark ? "#111"    : "#F2F2F2";

  const filtered = tab === "all" ? cars : cars.filter(c => c.type === tab);

  if (selected) {
    const c = selected;
    return (
      <div style={{ ...S.screen, background: bg }}>
        <div style={{ position: "relative", height: 240 }}>
          {c.photo && !imgErr[`d${c.id}`]
            ? <img src={c.photo} alt="" onError={() => setImgErr(p => ({ ...p, [`d${c.id}`]: true }))} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            : <div style={{ width: "100%", height: "100%", background: "#1a1a2e", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 64 }}>🚗</div>
          }
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,.6) 0%, transparent 60%)" }} />
          <button onClick={() => setSelected(null)} style={{ position: "absolute", top: 14, right: 14, background: "rgba(255,255,255,.9)", border: "none", borderRadius: "50%", width: 36, height: 36, cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center" }}>‹</button>
          <div style={{ position: "absolute", bottom: 16, right: 16, left: 16 }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: "#fff" }}>{c.name}</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: COLORS.primary, marginTop: 4 }}>{c.price}</div>
          </div>
        </div>
        <div style={{ padding: "16px" }}>
          <div style={{ background: card, borderRadius: 18, padding: "16px", marginBottom: 12, border: `1px solid ${border}` }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: text, marginBottom: 12 }}>تفاصيل السيارة</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {[["📅 السنة", c.year], ["⛽ الوقود", c.fuel], ["⚙️ الناقل", c.transmission], ["🎨 اللون", c.color], ...(c.km ? [["🏁 المسافة", c.km]] : []), ["📍 الموقع", c.location]].map(([label, val]) => (
                <div key={label} style={{ background: cardAlt, borderRadius: 12, padding: "10px 12px" }}>
                  <div style={{ fontSize: 11, color: muted }}>{label}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: text, marginTop: 3 }}>{val}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button style={{ flex: 1, background: COLORS.primary, color: "#fff", border: "none", borderRadius: 14, padding: "14px 0", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>📞 تواصل مع البائع</button>
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
          <div style={{ fontSize: 16, fontWeight: 800, color: text }}>🚗 سيارات</div>
          <div style={{ fontSize: 11, color: muted }}>جديد ومستعمل</div>
        </div>
        <button style={{ background: cardAlt, border: `1px solid ${border}`, borderRadius: 10, padding: "6px 12px", cursor: "pointer", fontSize: 12, color: text, fontFamily: "inherit" }}>⚙️ فلتر</button>
      </div>

      {/* Tabs */}
      <div style={{ background: card, padding: "10px 16px", borderBottom: `1px solid ${border}`, display: "flex", gap: 8 }}>
        {[["all", "الكل"], ["new", "جديدة ✨"], ["used", "مستعملة 🔄"]].map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)}
            style={{ flex: 1, padding: "9px 0", borderRadius: 12, border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 13, fontWeight: 700, background: tab === id ? COLORS.primary : cardAlt, color: tab === id ? "#fff" : muted, transition: "all .2s" }}>
            {label}
          </button>
        ))}
      </div>

      {/* Cars */}
      <div style={{ padding: "14px 16px 0" }}>
        <div style={{ fontWeight: 700, fontSize: 14, color: text, marginBottom: 12 }}>{filtered.length} سيارة متاحة</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {filtered.map(c => (
            <div key={c.id} onClick={() => setSelected(c)}
              style={{ background: card, borderRadius: 18, overflow: "hidden", boxShadow: "0 3px 16px rgba(0,0,0,.09)", cursor: "pointer" }}>
              <div style={{ height: 170, position: "relative", overflow: "hidden" }}>
                {c.photo && !imgErr[c.id]
                  ? <img src={c.photo} alt="" onError={() => setImgErr(p => ({ ...p, [c.id]: true }))} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  : <div style={{ width: "100%", height: "100%", background: "#1a1a2e", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 64 }}>🚗</div>
                }
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,.5) 0%, transparent 60%)" }} />
                <div style={{ position: "absolute", top: 12, right: 12, background: c.type === "new" ? COLORS.primary : "#7C3AED", color: "#fff", fontSize: 10, fontWeight: 700, borderRadius: 8, padding: "3px 10px" }}>{c.badge}</div>
              </div>
              <div style={{ padding: "12px 14px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: text }}>{c.name}</div>
                  <div style={{ fontSize: 16, fontWeight: 800, color: COLORS.primary }}>{c.price}</div>
                </div>
                <div style={{ display: "flex", gap: 12, fontSize: 12, color: muted }}>
                  <span>📅 {c.year}</span>
                  <span>⛽ {c.fuel}</span>
                  {c.km && <span>🏁 {c.km}</span>}
                  <span>📍 {c.location}</span>
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
