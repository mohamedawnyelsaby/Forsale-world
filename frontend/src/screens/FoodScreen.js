// frontend/src/screens/FoodScreen.js
import { useState, useEffect, useRef } from "react";
import COLORS from "../constants/colors";
import S from "../styles";
import { foodCategories, restaurants, promoOffers } from "../data";
import RestaurantCard from "../components/RestaurantCard";

export default function FoodScreen({ favorites: favIds, toggleFav, onRestaurantPress, dark, onBack }) {
  const [search, setSearch]   = useState("");
  const [promoIdx, setPromoIdx] = useState(0);
  const [imgErr, setImgErr]   = useState({});
  const timerRef = useRef(null);

  const card    = dark ? "#1C1C1C" : "#fff";
  const cardAlt = dark ? "#252525" : "#F7F7F7";
  const border  = dark ? "rgba(255,255,255,.07)" : "#EFEFEF";
  const text    = dark ? "#F0F0F0" : "#1A1A1A";
  const muted   = dark ? "#888"    : "#777";
  const bg      = dark ? "#111"    : "#F2F2F2";

  useEffect(() => {
    timerRef.current = setInterval(() => setPromoIdx(p => (p + 1) % promoOffers.length), 3500);
    return () => clearInterval(timerRef.current);
  }, []);

  const filtered = search
    ? restaurants.filter(r => r.name.includes(search) || r.category.includes(search))
    : restaurants;

  return (
    <div style={{ ...S.screen, background: bg }}>
      {/* Header */}
      <div style={{ background: card, padding: "12px 16px", borderBottom: `1px solid ${border}`, display: "flex", alignItems: "center", gap: 12 }}>
        <button onClick={onBack} style={{ background: cardAlt, border: "none", borderRadius: 12, width: 38, height: 38, cursor: "pointer", fontSize: 20, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>‹</button>
        <div style={{ flex: 1, position: "relative" }}>
          <span style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", fontSize: 15, color: muted, pointerEvents: "none" }}>🔍</span>
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="ابحث عن مطعم أو طبق..."
            style={{ width: "100%", padding: "10px 38px 10px 14px", borderRadius: 12, border: `1.5px solid ${border}`, background: cardAlt, fontSize: 13, fontFamily: "inherit", direction: "rtl", boxSizing: "border-box", outline: "none", color: text }} />
        </div>
      </div>

      {/* Promo */}
      <div style={{ padding: "12px 16px 0" }}>
        <div style={{ borderRadius: 18, overflow: "hidden", position: "relative", height: 150, boxShadow: "0 4px 16px rgba(0,0,0,.12)", cursor: "pointer" }}>
          {promoOffers[promoIdx].photo && !imgErr[promoIdx]
            ? <img src={promoOffers[promoIdx].photo} alt="" onError={() => setImgErr(p => ({ ...p, [promoIdx]: true }))} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
            : <div style={{ position: "absolute", inset: 0, background: promoOffers[promoIdx].bg }} />
          }
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,.72) 0%, rgba(0,0,0,.15) 60%, transparent 100%)" }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "14px 16px" }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#fff", marginBottom: 2 }}>{promoOffers[promoIdx].text}</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,.85)", marginBottom: 8 }}>{promoOffers[promoIdx].sub}</div>
            <div style={{ display: "flex", gap: 5 }}>
              {promoOffers.map((_, i) => (
                <button key={i} onClick={() => { clearInterval(timerRef.current); setPromoIdx(i); timerRef.current = setInterval(() => setPromoIdx(p => (p+1) % promoOffers.length), 3500); }}
                  style={{ width: i === promoIdx ? 22 : 6, height: 6, borderRadius: 3, background: i === promoIdx ? "#fff" : "rgba(255,255,255,.4)", border: "none", cursor: "pointer", padding: 0, transition: "width .3s" }} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div style={{ padding: "14px 0 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "0 16px", marginBottom: 10 }}>
          <span style={{ fontWeight: 700, fontSize: 14, color: text }}>الأصناف</span>
          <span style={{ fontSize: 12, color: COLORS.primary, fontWeight: 600 }}>عرض الكل</span>
        </div>
        <div style={{ display: "flex", gap: 10, overflowX: "auto", padding: "0 16px 4px", scrollbarWidth: "none" }}>
          {foodCategories.map(cat => (
            <div key={cat.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5, cursor: "pointer", minWidth: 56 }}>
              <div style={{ width: 54, height: 54, borderRadius: 16, background: dark ? "#252525" : "#FFF3EB", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>{cat.icon}</div>
              <span style={{ fontSize: 10, fontWeight: 600, color: muted, whiteSpace: "nowrap" }}>{cat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Restaurants */}
      <div style={{ padding: "14px 16px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
          <span style={{ fontWeight: 700, fontSize: 14, color: text }}>{search ? `نتائج (${filtered.length})` : "المطاعم المتاحة"}</span>
          {!search && <span style={{ fontSize: 12, color: COLORS.primary, fontWeight: 600 }}>تصفية ▾</span>}
        </div>
        {filtered.map(r => (
          <RestaurantCard key={r.id} r={r} isFav={favIds.includes(r.id)} onFav={() => toggleFav(r.id)} onPress={() => onRestaurantPress(r)} dark={dark} />
        ))}
      </div>
    </div>
  );
}
