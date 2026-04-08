import { useState, useEffect } from "react";
import COLORS from "../constants/colors";
import S from "../styles";
import { categories, restaurants, promoOffers } from "../data";
import RestaurantCard from "../components/RestaurantCard";

export default function HomeScreen({ favorites: favIds, toggleFav, onRestaurantPress }) {
  const [promoIdx, setPromoIdx] = useState(0);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("شربين، الدقهلية");
  const [locLoading, setLocLoading] = useState(false);
  const [locError, setLocError] = useState(false);

  const getLocation = () => {
    if (!navigator.geolocation) {
      setLocation("شربين، الدقهلية");
      return;
    }
    setLocLoading(true);
    setLocError(false);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&accept-language=ar`
          );
          const data = await res.json();
          const city =
            data.address?.city ||
            data.address?.town ||
            data.address?.village ||
            data.address?.county ||
            "شربين";
          const state = data.address?.state || "الدقهلية";
          setLocation(`${city}، ${state}`);
        } catch {
          setLocation("شربين، الدقهلية");
          setLocError(true);
        }
        setLocLoading(false);
      },
      () => {
        setLocation("شربين، الدقهلية");
        setLocLoading(false);
        setLocError(true);
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  useEffect(() => {
    getLocation();
  }, []);

  const filtered = search
    ? restaurants.filter(
        (r) => r.name.includes(search) || r.category.includes(search)
      )
    : restaurants;

  return (
    <div style={S.screen}>
      {/* Top bar */}
      <div
        style={{
          background: COLORS.white,
          padding: "14px 16px 10px",
          borderBottom: `1px solid ${COLORS.grayMid}`,
        }}
      >
        {/* Location */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 12,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 18 }}>📍</span>
            <div>
              <div style={{ fontSize: 11, color: COLORS.grayText }}>توصيل إلى</div>
              <div
                onClick={getLocation}
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: locError ? COLORS.red : COLORS.text,
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  cursor: "pointer",
                }}
              >
                {locLoading ? (
                  <span style={{ color: COLORS.grayText, fontSize: 13 }}>
                    ⏳ جاري تحديد موقعك...
                  </span>
                ) : (
                  <>
                    {location}
                    <span style={{ color: COLORS.primary, fontSize: 10 }}>▼</span>
                  </>
                )}
              </div>
              {locError && (
                <div style={{ fontSize: 10, color: COLORS.grayText, marginTop: 1 }}>
                  اضغط لإعادة المحاولة
                </div>
              )}
            </div>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button
              style={{
                background: COLORS.primaryLight,
                border: "none",
                borderRadius: 10,
                width: 38,
                height: 38,
                cursor: "pointer",
                fontSize: 17,
              }}
            >
              🔔
            </button>
            <button
              style={{
                background: COLORS.primaryLight,
                border: "none",
                borderRadius: 10,
                width: 38,
                height: 38,
                cursor: "pointer",
                fontSize: 17,
              }}
            >
              🛒
            </button>
          </div>
        </div>

        {/* Search */}
        <div style={{ position: "relative" }}>
          <span
            style={{
              position: "absolute",
              right: 12,
              top: "50%",
              transform: "translateY(-50%)",
              fontSize: 16,
              color: COLORS.grayText,
            }}
          >
            🔍
          </span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ابحث عن مطعم أو طبق..."
            style={{
              width: "100%",
              padding: "10px 40px 10px 14px",
              borderRadius: 12,
              border: `1.5px solid ${COLORS.grayMid}`,
              background: COLORS.gray,
              fontSize: 13,
              fontFamily: "inherit",
              direction: "rtl",
              boxSizing: "border-box",
              outline: "none",
            }}
          />
        </div>
      </div>

      {/* Promo Banner */}
      <div style={{ padding: "14px 16px 0" }}>
        <div
          style={{
            borderRadius: 16,
            background: promoOffers[promoIdx].bg,
            padding: "18px 20px",
            color: COLORS.white,
            position: "relative",
            overflow: "hidden",
            minHeight: 100,
          }}
        >
          <div
            style={{
              fontSize: 32,
              position: "absolute",
              left: 20,
              top: "50%",
              transform: "translateY(-50%)",
              opacity: 0.3,
            }}
          >
            {promoOffers[promoIdx].emoji}
          </div>
          <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>
            {promoOffers[promoIdx].text}
          </div>
          <div style={{ fontSize: 12, opacity: 0.9 }}>{promoOffers[promoIdx].sub}</div>
          <div
            style={{
              display: "flex",
              gap: 6,
              marginTop: 14,
              justifyContent: "center",
            }}
          >
            {promoOffers.map((_, i) => (
              <button
                key={i}
                onClick={() => setPromoIdx(i)}
                style={{
                  width: i === promoIdx ? 18 : 7,
                  height: 7,
                  borderRadius: 4,
                  background:
                    i === promoIdx ? COLORS.white : "rgba(255,255,255,0.5)",
                  border: "none",
                  cursor: "pointer",
                  transition: "width 0.3s",
                  padding: 0,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Categories */}
      <div style={{ padding: "16px 0 0" }}>
        <div
          style={{
            paddingRight: 16,
            paddingLeft: 16,
            marginBottom: 10,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span style={{ fontWeight: 700, fontSize: 15, color: COLORS.text }}>
            الأصناف
          </span>
          <span style={{ fontSize: 13, color: COLORS.primary, fontWeight: 600 }}>
            عرض الكل
          </span>
        </div>
        <div
          style={{
            display: "flex",
            gap: 10,
            overflowX: "auto",
            paddingRight: 16,
            paddingLeft: 16,
            paddingBottom: 4,
            scrollbarWidth: "none",
          }}
        >
          {categories.map((cat) => (
            <div
              key={cat.id}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 6,
                cursor: "pointer",
                minWidth: 58,
              }}
            >
              <div
                style={{
                  width: 54,
                  height: 54,
                  borderRadius: 16,
                  background: COLORS.primaryLight,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 24,
                  flexShrink: 0,
                }}
              >
                {cat.icon}
              </div>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: COLORS.textMuted,
                  whiteSpace: "nowrap",
                }}
              >
                {cat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Restaurants */}
      <div style={{ padding: "16px 16px 0" }}>
        <div
          style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}
        >
          <span style={{ fontWeight: 700, fontSize: 15, color: COLORS.text }}>
            {search ? `نتائج البحث (${filtered.length})` : "المطاعم المتاحة"}
          </span>
          {!search && (
            <span style={{ fontSize: 13, color: COLORS.primary, fontWeight: 600 }}>
              تصفية ▾
            </span>
          )}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {filtered.map((r) => (
            <RestaurantCard
              key={r.id}
              r={r}
              isFav={favIds.includes(r.id)}
              onFav={() => toggleFav(r.id)}
              onPress={() => onRestaurantPress(r)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
