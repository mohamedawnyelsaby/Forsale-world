// frontend/src/screens/HomeScreen.js
import { useState, useEffect, useRef } from "react";
import COLORS from "../constants/colors";
import S from "../styles";
import { categories, restaurants, promoOffers } from "../data";
import RestaurantCard from "../components/RestaurantCard";

export default function HomeScreen({ favorites: favIds, toggleFav, onRestaurantPress, dark, onTabChange }) {
  const [promoIdx, setPromoIdx]     = useState(0);
  const [search, setSearch]         = useState("");
  const [location, setLocation]     = useState("شربين، الدقهلية");
  const [imgErrors, setImgErrors]   = useState({});
  const timerRef  = useRef(null);
  const touchX    = useRef(0);

  const card    = dark ? "#1C1C1C" : "#FFFFFF";
  const cardAlt = dark ? "#252525" : "#F7F7F7";
  const border  = dark ? "rgba(255,255,255,.07)" : "#EFEFEF";
  const text    = dark ? "#F0F0F0" : "#1A1A1A";
  const muted   = dark ? "#888"    : "#777";
  const bg      = dark ? "#111"    : "#F2F2F2";

  // ── Auto-slide ──
  const startTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setPromoIdx((p) => (p + 1) % promoOffers.length);
    }, 3500);
  };
  useEffect(() => { startTimer(); return () => clearInterval(timerRef.current); }, []);

  // ── GPS (silent — no error shown to user) ──
  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const res  = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&format=json&accept-language=ar`);
          const data = await res.json();
          const city = data.address?.city || data.address?.town || data.address?.village || "شربين";
          setLocation(`${city}، ${data.address?.state || "الدقهلية"}`);
        } catch {}
      },
      () => {},
      { enableHighAccuracy: true, timeout: 8000 }
    );
  }, []);

  const filtered = search
    ? restaurants.filter((r) => r.name.includes(search) || r.category.includes(search))
    : restaurants;

  return (
    <div style={{ ...S.screen, background: bg }}>

      {/* ══ HEADER ══ */}
      <div style={{ background: card, padding: "14px 16px 12px", borderBottom: `1px solid ${border}` }}>

        {/* Location row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 20 }}>📍</span>
            <div>
              <div style={{ fontSize: 11, color: muted }}>توصيل إلى</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: text, display: "flex", alignItems: "center", gap: 5 }}>
                {location}
                <span style={{ color: COLORS.primary, fontSize: 11 }}>▼</span>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button style={{ background: cardAlt, border: `1px solid ${border}`, borderRadius: 12, width: 40, height: 40, cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center" }}>🔔</button>
            <button style={{ background: cardAlt, border: `1px solid ${border}`, borderRadius: 12, width: 40, height: 40, cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center" }}>🛒</button>
          </div>
        </div>

        {/* Search bar */}
        <div style={{ position: "relative" }}>
          <span style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", fontSize: 16, color: muted, pointerEvents: "none" }}>🔍</span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ابحث عن مطعم أو طبق..."
            style={{
              width: "100%", padding: "12px 44px 12px 16px",
              borderRadius: 14, border: `1.5px solid ${border}`,
              background: cardAlt, fontSize: 14, fontFamily: "inherit",
              direction: "rtl", boxSizing: "border-box",
              outline: "none", color: text,
              transition: "border-color .2s",
            }}
          />
        </div>
      </div>

      {/* ══ AI CHIP ══ */}
      <div style={{ padding: "12px 16px 0" }}>
        <div style={{
          background: card, borderRadius: 16, padding: "12px 14px",
          border: `1px solid rgba(255,107,0,.2)`,
          display: "flex", alignItems: "center", gap: 12,
          boxShadow: "0 2px 12px rgba(255,107,0,.07)",
        }}>
          <div style={{ width: 36, height: 36, borderRadius: 11, background: "linear-gradient(135deg,#FF6B00,#FF9A40)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>🤖</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 10, color: muted, marginBottom: 2 }}>AI اقتراح ذكي</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: text, lineHeight: 1.4 }}>عادةً بتطلب جمعة بالليل — برجر هاوس عنده خصم 20%!</div>
          </div>
          <button
            onClick={() => onRestaurantPress(restaurants[0])}
            style={{ background: COLORS.primary, color: "#fff", border: "none", borderRadius: 10, padding: "7px 13px", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", flexShrink: 0 }}
          >
            اطلب الآن
          </button>
        </div>
      </div>

      {/* ══ PROMO BANNER ══ */}
      <div style={{ padding: "12px 16px 0" }}>
        <div
          onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
          onTouchEnd={(e) => {
            const diff = touchX.current - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 40) {
              clearInterval(timerRef.current);
              setPromoIdx((p) => diff > 0
                ? (p + 1) % promoOffers.length
                : (p - 1 + promoOffers.length) % promoOffers.length
              );
              startTimer();
            }
          }}
          style={{ borderRadius: 20, overflow: "hidden", position: "relative", height: 170, boxShadow: "0 6px 24px rgba(0,0,0,.13)", cursor: "pointer" }}
        >
          {/* Real image */}
          {promoOffers[promoIdx].photo && !imgErrors[promoIdx] ? (
            <img
              src={promoOffers[promoIdx].photo}
              alt=""
              onError={() => setImgErrors((p) => ({ ...p, [promoIdx]: true }))}
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <div style={{ position: "absolute", inset: 0, background: promoOffers[promoIdx].bg }} />
          )}

          {/* LIGHT overlay — just enough to read text */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,.72) 0%, rgba(0,0,0,.3) 55%, rgba(0,0,0,.05) 100%)" }} />

          {/* Text at bottom */}
          <div style={{ position: "absolute", bottom: 0, right: 0, left: 0, padding: "16px 18px" }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: "#fff", marginBottom: 3, lineHeight: 1.3 }}>
              {promoOffers[promoIdx].text}
            </div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,.85)", marginBottom: 10 }}>
              {promoOffers[promoIdx].sub}
            </div>
            {/* Dots */}
            <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
              {promoOffers.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); clearInterval(timerRef.current); setPromoIdx(i); startTimer(); }}
                  style={{
                    width: i === promoIdx ? 24 : 7, height: 7, borderRadius: 4,
                    background: i === promoIdx ? "#fff" : "rgba(255,255,255,.4)",
                    border: "none", cursor: "pointer", padding: 0, flexShrink: 0,
                    transition: "width .3s ease",
                    WebkitTapHighlightColor: "transparent",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ══ LIVE ORDER BANNER ══ */}
      <div style={{ padding: "12px 16px 0" }}>
        <div
          onClick={() => onTabChange && onTabChange("tracking")}
          style={{ background: "linear-gradient(135deg,#0D1B4B,#1C3A8A)", borderRadius: 16, padding: "13px 16px", cursor: "pointer", display: "flex", alignItems: "center", gap: 12, boxShadow: "0 4px 16px rgba(13,27,75,.25)", WebkitTapHighlightColor: "transparent" }}
        >
          <div style={{ width: 44, height: 44, borderRadius: 13, background: "rgba(255,255,255,.13)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>🛵</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>طلبك في الطريق!</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,.65)", marginTop: 2 }}>برجر هاوس • متبقي 12 دقيقة</div>
          </div>
          <div style={{ background: COLORS.primary, borderRadius: 10, padding: "6px 14px", boxShadow: "0 2px 8px rgba(255,107,0,.35)" }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>تتبع ›</span>
          </div>
        </div>
      </div>

      {/* ══ CATEGORIES ══ */}
      <div style={{ padding: "18px 0 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 16px", marginBottom: 12 }}>
          <span style={{ fontWeight: 700, fontSize: 15, color: text }}>الأصناف</span>
          <span style={{ fontSize: 12, color: COLORS.primary, fontWeight: 600 }}>عرض الكل</span>
        </div>
        <div style={{ display: "flex", gap: 12, overflowX: "auto", padding: "0 16px 4px", scrollbarWidth: "none" }}>
          {categories.map((cat) => (
            <div key={cat.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, cursor: "pointer", minWidth: 58, WebkitTapHighlightColor: "transparent" }}>
              <div style={{ width: 56, height: 56, borderRadius: 18, background: dark ? "#252525" : "#FFF3EB", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, boxShadow: dark ? "none" : "0 2px 8px rgba(255,107,0,.08)" }}>
                {cat.icon}
              </div>
              <span style={{ fontSize: 11, fontWeight: 600, color: muted, whiteSpace: "nowrap" }}>{cat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ══ RESTAURANTS ══ */}
      <div style={{ padding: "18px 16px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <span style={{ fontWeight: 700, fontSize: 15, color: text }}>
            {search ? `نتائج البحث (${filtered.length})` : "المطاعم المتاحة"}
          </span>
          {!search && <span style={{ fontSize: 12, color: COLORS.primary, fontWeight: 600 }}>تصفية ▾</span>}
        </div>
        {filtered.map((r) => (
          <RestaurantCard
            key={r.id} r={r}
            isFav={favIds.includes(r.id)}
            onFav={() => toggleFav(r.id)}
            onPress={() => onRestaurantPress(r)}
            dark={dark}
          />
        ))}
      </div>

    </div>
  );
}
