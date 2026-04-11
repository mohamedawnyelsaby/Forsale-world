// frontend/src/screens/HomeScreen.js
import { useState } from "react";
import COLORS from "../constants/colors";
import S from "../styles";
import { mainSections, promoOffers } from "../data";

export default function HomeScreen({ dark, onSectionPress }) {
  const [imgErr, setImgErr] = useState({});
  const [promoIdx, setPromoIdx] = useState(0);

  const card    = dark ? "#1C1C1C" : "#FFFFFF";
  const cardAlt = dark ? "#252525" : "#F7F7F7";
  const border  = dark ? "rgba(255,255,255,.07)" : "#EFEFEF";
  const text    = dark ? "#F0F0F0" : "#1A1A1A";
  const muted   = dark ? "#888"    : "#777";
  const bg      = dark ? "#111"    : "#F2F2F2";

  return (
    <div style={{ ...S.screen, background: bg }}>

      {/* ── Header ── */}
      <div style={{ background: card, padding: "14px 16px 12px", borderBottom: `1px solid ${border}` }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 20 }}>📍</span>
            <div>
              <div style={{ fontSize: 11, color: muted }}>توصيل إلى</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: text, display: "flex", alignItems: "center", gap: 5 }}>
                شربين، الدقهلية
                <span style={{ color: COLORS.primary, fontSize: 11 }}>▼</span>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button style={{ background: cardAlt, border: `1px solid ${border}`, borderRadius: 12, width: 40, height: 40, cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center" }}>🔔</button>
            <button style={{ background: cardAlt, border: `1px solid ${border}`, borderRadius: 12, width: 40, height: 40, cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center" }}>🛒</button>
          </div>
        </div>
        {/* Search */}
        <div style={{ position: "relative" }}>
          <span style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", fontSize: 16, color: muted, pointerEvents: "none" }}>🔍</span>
          <input
            placeholder="ابحث عن منتج أو متجر أو عقار..."
            style={{ width: "100%", padding: "12px 44px 12px 16px", borderRadius: 14, border: `1.5px solid ${border}`, background: cardAlt, fontSize: 14, fontFamily: "inherit", direction: "rtl", boxSizing: "border-box", outline: "none", color: text }}
          />
        </div>
      </div>

      {/* ── Promo Banner ── */}
      <div style={{ padding: "14px 16px 0" }}>
        <div style={{ borderRadius: 20, overflow: "hidden", position: "relative", height: 160, boxShadow: "0 6px 24px rgba(0,0,0,.12)", cursor: "pointer" }}>
          {promoOffers[promoIdx].photo && !imgErr[promoIdx] ? (
            <img src={promoOffers[promoIdx].photo} alt="" onError={() => setImgErr(p => ({ ...p, [promoIdx]: true }))}
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <div style={{ position: "absolute", inset: 0, background: promoOffers[promoIdx].bg }} />
          )}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,.75) 0%, rgba(0,0,0,.2) 60%, transparent 100%)" }} />
          <div style={{ position: "absolute", bottom: 0, right: 0, left: 0, padding: "16px 18px" }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: "#fff", marginBottom: 3 }}>{promoOffers[promoIdx].text}</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,.85)", marginBottom: 10 }}>{promoOffers[promoIdx].sub}</div>
            <div style={{ display: "flex", gap: 5 }}>
              {promoOffers.map((_, i) => (
                <button key={i} onClick={() => setPromoIdx(i)}
                  style={{ width: i === promoIdx ? 24 : 7, height: 7, borderRadius: 4, background: i === promoIdx ? "#fff" : "rgba(255,255,255,.4)", border: "none", cursor: "pointer", padding: 0, transition: "width .3s", WebkitTapHighlightColor: "transparent" }} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Sections Title ── */}
      <div style={{ padding: "20px 16px 12px" }}>
        <div style={{ fontSize: 16, fontWeight: 800, color: text }}>وش تبحث عنه اليوم؟</div>
        <div style={{ fontSize: 12, color: muted, marginTop: 3 }}>اختر القسم المناسب</div>
      </div>

      {/* ── Main 5 Sections ── */}
      <div style={{ padding: "0 16px", display: "flex", flexDirection: "column", gap: 14 }}>
        {mainSections.map((sec, idx) => (
          <div
            key={sec.id}
            onClick={() => onSectionPress(sec.id)}
            style={{
              borderRadius: 20, overflow: "hidden", position: "relative",
              height: idx === 0 ? 180 : 130,
              cursor: "pointer", boxShadow: "0 4px 20px rgba(0,0,0,.1)",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            {/* Background image */}
            {sec.photo && !imgErr[`s${sec.id}`] ? (
              <img src={sec.photo} alt={sec.label}
                onError={() => setImgErr(p => ({ ...p, [`s${sec.id}`]: true }))}
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <div style={{ position: "absolute", inset: 0, background: sec.bg }} />
            )}
            {/* Overlay */}
            <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${sec.color}DD 0%, ${sec.color}88 50%, transparent 100%)` }} />
            {/* Content */}
            <div style={{ position: "absolute", inset: 0, padding: "20px", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
              <div style={{ fontSize: 28, marginBottom: 6 }}>{sec.icon}</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: "#fff", textShadow: "0 1px 6px rgba(0,0,0,.3)" }}>{sec.label}</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,.8)", marginTop: 4, display: "flex", alignItems: "center", gap: 4 }}>
                تصفح الآن <span>›</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ height: 20 }} />
    </div>
  );
}
