import { useState, useEffect } from "react";
import COLORS from "../constants/colors";
import S from "../styles";
import { categories, restaurants, promoOffers } from "../data";
import RestaurantCard from "../components/RestaurantCard";

export default function HomeScreen({ favorites: favIds, toggleFav, onRestaurantPress, dark, onTabChange }) {
  const [promoIdx, setPromoIdx] = useState(0);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("شربين، الدقهلية");
  const [locLoading, setLocLoading] = useState(false);
  const [locError, setLocError] = useState(false);

  const card = dark ? "#1C1C1C" : COLORS.white;
  const cardAlt = dark ? "#252525" : "#F8F8F8";
  const border = dark ? "rgba(255,255,255,.08)" : "#EBEBEB";
  const text = dark ? "#F0F0F0" : COLORS.text;
  const muted = dark ? "#999" : COLORS.textMuted;
  const gray = dark ? "#555" : "#AAA";
  const bg = dark ? "#111" : "#F4F4F4";

  const getLocation = () => {
    if (!navigator.geolocation) return;
    setLocLoading(true);
    setLocError(false);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&format=json&accept-language=ar`
          );
          const data = await res.json();
          const city = data.address?.city || data.address?.town || data.address?.village || "شربين";
          const state = data.address?.state || "الدقهلية";
          setLocation(`${city}، ${state}`);
        } catch {
          setLocation("شربين، الدقهلية");
          setLocError(true);
        }
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

  return (
    <div style={{ ...S.screen, background: bg }}>
      {/* Top bar */}
      <div style={{ background: card, padding: "12px 16px 10px", borderBottom: `1px solid ${border}` }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
          <div onClick={getLocation} style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
            <span style={{ fontSize: 18 }}>📍</span>
            <div>
              <div style={{ fontSize: 10, color: gray }}>توصيل إلى</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: locError ? COLORS.red : text, display: "flex", alignItems: "center", gap: 4 }}>
                {locLoading
                  ? <span style={{ color: gray, fontSize: 12 }}>⏳ جاري التحديد...</span>
                  : <>{location} <span style={{ color: COLORS.primary, fontSize: 9 }}>▼</span></>
                }
              </div>
              {locError && <div style={{ fontSize: 9, color: gray, marginTop: 1 }}>اضغط لإعادة المحاولة</div>}
            </div>
          </div>
          <button style={{ background: COLORS.primaryLight, border: "none", borderRadius: 10, width: 36, height: 36, cursor: "pointer", fontSize: 16 }}>🛒</button>
        </div>
        <div style={{ position: "relative" }}>
          <span style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", fontSize: 14, color: gray }}>🔍</span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ابحث عن مطعم أو طبق..."
            style={{
              width: "100%", padding: "9px 38px 9px 12px",
              borderRadius: 12, border: `1.5px solid ${border}`,
              background: cardAlt, fontSize: 13,
              fontFamily: "inherit", direction: "rtl",
              boxSizing: "border-box", outline: "none", color: text,
            }}
          />
        </div>
      </div>

      {/* AI Suggestion */}
      <div style={{ padding: "10px 16px 0" }}>
        <div style={{
          background: card, borderRadius: 14, padding: "10px 14px",
          border: "1.5px solid rgba(255,107,0,.25)",
          display: "flex", alignItems: "center", gap: 10, cursor: "pointer",
        }}>
          <div style={{ width: 32, height: 32, borderRadius: 10, background: "linear-gradient(135deg,#FF6B00,#FF8C40)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>🤖</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 10, color: gray, marginBottom: 2 }}>AI اقتراح ذكي</div>
            <div style={{ fontSize: 12, fontWeight: 600, color: text }}>عادةً بتطلب جمعة بالليل 🍔 — برجر هاوس عنده خصم 20% دلوقتي!</div>
          </div>
          <button
            onClick={() => onRestaurantPress(restaurants[0])}
            style={{ background: COLORS.primary, color: "#fff", border: "none", borderRadius: 10, padding: "5px 10px", fontSize: 10, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap" }}
          >
            اطلب الآن
          </button>
        </div>
      </div>

      {/* Promo Banner */}
      <div style={{ padding: "10px 16px 0" }}>
        <div
          style={{ borderRadius: 16, background: promoOffers[promoIdx].bg, padding: "16px 20px", color: "#fff", position: "relative", overflow: "hidden", minHeight: 85, userSelect: "none" }}
          onTouchStart={(e) => { e._startX = e.touches[0].clientX; }}
          onTouchEnd={(e) => {
            const diff = e._startX - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 40) {
              if (diff > 0) setPromoIdx((p) => (p + 1) % promoOffers.length);
              else setPromoIdx((p) => (p - 1 + promoOffers.length) % promoOffers.length);
            }
          }}
        >
          <div style={{ fontSize: 32, position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", opacity: 0.22 }}>{promoOffers[promoIdx].emoji}</div>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 3 }}>{promoOffers[promoIdx].text}</div>
          <div style={{ fontSize: 12, opacity: 0.9 }}>{promoOffers[promoIdx].sub}</div>
          <div style={{ display: "flex", gap: 8, marginTop: 10, justifyContent: "center", alignItems: "center" }}>
            {promoOffers.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setPromoIdx(i); }}
                style={{
                  width: i === promoIdx ? 20 : 8,
                  height: 8,
                  borderRadius: 4,
                  background: i === promoIdx ? "#fff" : "rgba(255,255,255,.5)",
                  border: "none",
                  cursor: "pointer",
                  transition: "width .3s",
                  padding: 0,
                  minWidth: 8,
                  WebkitTapHighlightColor: "transparent",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Live Order Banner */}
      <div style={{ padding: "10px 16px 0" }}>
        <div
          onClick={() => onTabChange && onTabChange("tracking")}
          style={{ background: "linear-gradient(135deg,#0D1B4B,#1a3a8f)", borderRadius: 14, padding: "12px 16px", cursor: "pointer", display: "flex", alignItems: "center", gap: 12 }}
        >
          <div style={{ width: 40, height: 40, borderRadius: 12, background: "rgba(255,255,255,.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🛵</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>طلبك في الطريق!</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,.7)", marginTop: 2 }}>برجر هاوس • متبقي 12 دقيقة</div>
          </div>
          <div style={{ background: COLORS.primary, borderRadius: 10, padding: "4px 12px" }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: "#fff" }}>تتبع ›</span>
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
          {categories.map((cat) => (
            <div key={cat.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5, cursor: "pointer", minWidth: 54 }}>
              <div style={{ width: 52, height: 52, borderRadius: 16, background: COLORS.primaryLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>{cat.icon}</div>
              <span style={{ fontSize: 10, fontWeight: 600, color: muted, whiteSpace: "nowrap" }}>{cat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Restaurants */}
      <div style={{ padding: "14px 16px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
          <span style={{ fontWeight: 700, fontSize: 14, color: text }}>
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
