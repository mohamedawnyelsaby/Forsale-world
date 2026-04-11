// frontend/src/screens/HomeScreen.js
import { useState, useEffect, useRef } from "react";
import COLORS from "../constants/colors";
import S from "../styles";
import { categories, restaurants, promoOffers } from "../data";
import RestaurantCard from "../components/RestaurantCard";

export default function HomeScreen({ favorites: favIds, toggleFav, onRestaurantPress, dark, onTabChange }) {
  const [promoIdx, setPromoIdx]   = useState(0);
  const [search, setSearch]       = useState("");
  const [location, setLocation]   = useState("شربين، الدقهلية");
  const [locLoading, setLocLoading] = useState(false);
  const [locError, setLocError]   = useState(false);
  const [imgErrors, setImgErrors] = useState({});
  const timerRef = useRef(null);

  const card    = dark ? "#1C1C1C" : COLORS.white;
  const cardAlt = dark ? "#252525" : "#F8F8F8";
  const border  = dark ? "rgba(255,255,255,.08)" : "#EBEBEB";
  const text    = dark ? "#F0F0F0" : COLORS.text;
  const muted   = dark ? "#999"    : COLORS.textMuted;
  const gray    = dark ? "#555"    : "#AAA";
  const bg      = dark ? "#111"    : "#F0F0F0";

  // Auto-slide promo
  const startTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setPromoIdx((p) => (p + 1) % promoOffers.length);
    }, 3500);
  };
  useEffect(() => { startTimer(); return () => clearInterval(timerRef.current); }, []);

  // GPS
  const getLocation = () => {
    if (!navigator.geolocation) return;
    setLocLoading(true); setLocError(false);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const res  = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&format=json&accept-language=ar`);
          const data = await res.json();
          const city = data.address?.city || data.address?.town || data.address?.village || "شربين";
          setLocation(`${city}، ${data.address?.state || "الدقهلية"}`);
        } catch { setLocError(true); }
        setLocLoading(false);
      },
      () => { setLocLoading(false); setLocError(true); },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };
  useEffect(() => { getLocation(); }, []);

  const filtered = search
    ? restaurants.filter((r) => r.name.includes(search) || r.category.includes(search))
    : restaurants;

  // Swipe on promo
  let touchStartX = 0;
  const handleTouchStart = (e) => { touchStartX = e.touches[0].clientX; };
  const handleTouchEnd   = (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      clearInterval(timerRef.current);
      if (diff > 0) setPromoIdx((p) => (p + 1) % promoOffers.length);
      else           setPromoIdx((p) => (p - 1 + promoOffers.length) % promoOffers.length);
      startTimer();
    }
  };

  return (
    <div style={{ ...S.screen, background: bg }}>

      {/* ── Top bar ── */}
      <div style={{ background: card, padding: "12px 16px 10px", borderBottom: `1px solid ${border}`, boxShadow: dark ? "none" : "0 1px 8px rgba(0,0,0,.06)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
          <div onClick={getLocation} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: COLORS.primaryLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>📍</div>
            <div>
              <div style={{ fontSize: 10, color: gray }}>توصيل إلى</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: locError ? COLORS.red : text, display: "flex", alignItems: "center", gap: 4 }}>
                {locLoading
                  ? <span style={{ color: gray, fontSize: 12 }}>⏳ جاري التحديد...</span>
                  : <>{location} <span style={{ color: COLORS.primary, fontSize: 10 }}>▼</span></>}
              </div>
              {locError && <div style={{ fontSize: 9, color: gray }}>اضغط لإعادة المحاولة</div>}
            </div>
          </div>
          <button style={{ background: COLORS.primaryLight, border: "none", borderRadius: 12, width: 38, height: 38, cursor: "pointer", fontSize: 17, display: "flex", alignItems: "center", justifyContent: "center" }}>🛒</button>
        </div>

        {/* Search */}
        <div style={{ position: "relative" }}>
          <span style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", fontSize: 15, color: gray }}>🔍</span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ابحث عن مطعم أو طبق..."
            style={{
              width: "100%", padding: "11px 42px 11px 14px",
              borderRadius: 14, border: `1.5px solid ${border}`,
              background: cardAlt, fontSize: 13, fontFamily: "inherit",
              direction: "rtl", boxSizing: "border-box", outline: "none", color: text,
              boxShadow: "inset 0 1px 3px rgba(0,0,0,.04)",
            }}
          />
        </div>
      </div>

      {/* ── AI suggestion ── */}
      <div style={{ padding: "12px 16px 0" }}>
        <div style={{ background: card, borderRadius: 16, padding: "11px 14px", border: `1.5px solid rgba(255,107,0,.2)`, display: "flex", alignItems: "center", gap: 10, boxShadow: dark ? "none" : "0 2px 12px rgba(255,107,0,.08)" }}>
          <div style={{ width: 34, height: 34, borderRadius: 10, background: "linear-gradient(135deg,#FF6B00,#FF8C40)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>🤖</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 10, color: gray, marginBottom: 2 }}>AI اقتراح ذكي</div>
            <div style={{ fontSize: 12, fontWeight: 600, color: text }}>عادةً بتطلب جمعة بالليل — برجر هاوس عنده خصم 20% دلوقتي!</div>
          </div>
          <button
            onClick={() => onRestaurantPress(restaurants[0])}
            style={{ background: COLORS.primary, color: "#fff", border: "none", borderRadius: 10, padding: "6px 12px", fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap", flexShrink: 0 }}
          >
            اطلب الآن
          </button>
        </div>
      </div>

      {/* ── Promo Banner with REAL IMAGE ── */}
      <div style={{ padding: "12px 16px 0" }}>
        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          style={{ borderRadius: 20, overflow: "hidden", position: "relative", height: 160, cursor: "pointer", boxShadow: "0 6px 24px rgba(0,0,0,.15)" }}
        >
          {/* Background image */}
          {promoOffers[promoIdx].photo && !imgErrors[promoIdx] ? (
            <img
              src={promoOffers[promoIdx].photo}
              alt=""
              onError={() => setImgErrors((p) => ({ ...p, [promoIdx]: true }))}
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "opacity .4s" }}
            />
          ) : (
            <div style={{ position: "absolute", inset: 0, background: promoOffers[promoIdx].bg }} />
          )}

          {/* Color overlay */}
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${promoOffers[promoIdx].bg}EE 0%, ${promoOffers[promoIdx].bg}99 50%, transparent 100%)` }} />

          {/* Content */}
          <div style={{ position: "absolute", inset: 0, padding: "20px 20px", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
            <div style={{ fontSize: 17, fontWeight: 800, color: "#fff", marginBottom: 4, textShadow: "0 1px 6px rgba(0,0,0,.3)", lineHeight: 1.3 }}>
              {promoOffers[promoIdx].text}
            </div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,.9)", marginBottom: 12 }}>{promoOffers[promoIdx].sub}</div>
            {/* Dots */}
            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
              {promoOffers.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); clearInterval(timerRef.current); setPromoIdx(i); startTimer(); }}
                  style={{
                    width: i === promoIdx ? 22 : 7, height: 7,
                    borderRadius: 4,
                    background: i === promoIdx ? "#fff" : "rgba(255,255,255,.45)",
                    border: "none", cursor: "pointer",
                    transition: "width .35s ease",
                    padding: 0, flexShrink: 0,
                    WebkitTapHighlightColor: "transparent",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Live Order Banner ── */}
      <div style={{ padding: "12px 16px 0" }}>
        <div
          onClick={() => onTabChange && onTabChange("tracking")}
          style={{ background: "linear-gradient(135deg,#0D1B4B,#1a3a8f)", borderRadius: 16, padding: "13px 16px", cursor: "pointer", display: "flex", alignItems: "center", gap: 12, boxShadow: "0 4px 16px rgba(13,27,75,.3)", WebkitTapHighlightColor: "transparent" }}
        >
          <div style={{ width: 42, height: 42, borderRadius: 12, background: "rgba(255,255,255,.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>🛵</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>طلبك في الطريق!</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,.7)", marginTop: 2 }}>برجر هاوس • متبقي 12 دقيقة</div>
          </div>
          <div style={{ background: COLORS.primary, borderRadius: 10, padding: "5px 14px", boxShadow: "0 2px 8px rgba(255,107,0,.4)" }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>تتبع ›</span>
          </div>
        </div>
      </div>

      {/* ── Categories ── */}
      <div style={{ padding: "16px 0 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "0 16px", marginBottom: 12 }}>
          <span style={{ fontWeight: 700, fontSize: 15, color: text }}>الأصناف</span>
          <span style={{ fontSize: 12, color: COLORS.primary, fontWeight: 600 }}>عرض الكل</span>
        </div>
        <div style={{ display: "flex", gap: 10, overflowX: "auto", padding: "0 16px 6px", scrollbarWidth: "none" }}>
          {categories.map((cat) => (
            <div key={cat.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, cursor: "pointer", minWidth: 60, WebkitTapHighlightColor: "transparent" }}>
              <div style={{ width: 56, height: 56, borderRadius: 18, background: dark ? "#252525" : COLORS.primaryLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, boxShadow: dark ? "none" : "0 2px 8px rgba(255,107,0,.1)" }}>
                {cat.icon}
              </div>
              <span style={{ fontSize: 11, fontWeight: 600, color: muted, whiteSpace: "nowrap" }}>{cat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Restaurants ── */}
      <div style={{ padding: "14px 16px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
          <span style={{ fontWeight: 700, fontSize: 15, color: text }}>
            {search ? `نتائج البحث (${filtered.length})` : "المطاعم المتاحة"}
          </span>
          {!search && <span style={{ fontSize: 12, color: COLORS.primary, fontWeight: 600 }}>تصفية ▾</span>}
        </div>
        {filtered.map((r) => (
          <RestaurantCard
            key={r.id}
            r={r}
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
