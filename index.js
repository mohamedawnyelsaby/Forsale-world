import { useState } from "react";

const COLORS = {
  primary: "#FF6B00",
  primaryLight: "#FFF3EB",
  primaryDark: "#E05A00",
  dark: "#1A1A2E",
  gray: "#F5F5F5",
  grayMid: "#E0E0E0",
  grayText: "#9E9E9E",
  white: "#FFFFFF",
  text: "#212121",
  textMuted: "#757575",
  star: "#FFB800",
  green: "#2ECC71",
  red: "#E74C3C",
};

const categories = [
  { id: 1, icon: "🍔", label: "برجر" },
  { id: 2, icon: "🍕", label: "بيتزا" },
  { id: 3, icon: "🌮", label: "شاورما" },
  { id: 4, icon: "🍗", label: "دجاج" },
  { id: 5, icon: "🍜", label: "آسيوي" },
  { id: 6, icon: "🥗", label: "سلطات" },
  { id: 7, icon: "🍣", label: "سوشي" },
  { id: 8, icon: "🧃", label: "عصائر" },
  { id: 9, icon: "🍰", label: "حلويات" },
  { id: 10, icon: "☕", label: "قهوة" },
];

const restaurants = [
  {
    id: 1,
    name: "برجر هاوس",
    category: "برجر • أمريكي",
    rating: 4.7,
    reviews: 1240,
    time: "25-35",
    fee: "مجاني",
    minOrder: "25 ر.س",
    offer: "خصم 20%",
    offerColor: COLORS.primary,
    image: "🍔",
    bg: "#FFF3EB",
    open: true,
  },
  {
    id: 2,
    name: "بيتزا بالاس",
    category: "بيتزا • إيطالي",
    rating: 4.5,
    reviews: 890,
    time: "30-45",
    fee: "5 ر.س",
    minOrder: "30 ر.س",
    offer: "اشتري 1 واحصل على 1",
    offerColor: "#8E44AD",
    image: "🍕",
    bg: "#F3E8FF",
    open: true,
  },
  {
    id: 3,
    name: "شاورما كينج",
    category: "شاورما • شرقي",
    rating: 4.9,
    reviews: 3400,
    time: "20-30",
    fee: "مجاني",
    minOrder: "15 ر.س",
    offer: null,
    image: "🌯",
    bg: "#E8F5E9",
    open: true,
  },
  {
    id: 4,
    name: "سوشي ماستر",
    category: "سوشي • ياباني",
    rating: 4.6,
    reviews: 560,
    time: "40-55",
    fee: "8 ر.س",
    minOrder: "50 ر.س",
    offer: "توصيل مجاني",
    offerColor: COLORS.green,
    image: "🍣",
    bg: "#E3F2FD",
    open: false,
  },
  {
    id: 5,
    name: "دجاج دليشس",
    category: "دجاج • مشوي",
    rating: 4.4,
    reviews: 2100,
    time: "25-40",
    fee: "مجاني",
    minOrder: "20 ر.س",
    offer: "خصم 15%",
    offerColor: COLORS.red,
    image: "🍗",
    bg: "#FFF8E1",
    open: true,
  },
  {
    id: 6,
    name: "حلويات النور",
    category: "حلويات • شرقية",
    rating: 4.8,
    reviews: 720,
    time: "30-45",
    fee: "6 ر.س",
    minOrder: "25 ر.س",
    offer: null,
    image: "🍰",
    bg: "#FCE4EC",
    open: true,
  },
];

const orders = [
  {
    id: "ORD-1021",
    restaurant: "برجر هاوس",
    icon: "🍔",
    status: "قيد التوصيل",
    statusColor: COLORS.primary,
    items: "برجر كلاسيك × 2، بطاطس كبير",
    total: "75 ر.س",
    date: "اليوم، 2:30 م",
  },
  {
    id: "ORD-1018",
    restaurant: "بيتزا بالاس",
    icon: "🍕",
    status: "تم التسليم",
    statusColor: COLORS.green,
    items: "بيتزا مارغريتا × 1، بيبسي",
    total: "62 ر.س",
    date: "أمس، 8:15 م",
  },
  {
    id: "ORD-1014",
    restaurant: "شاورما كينج",
    icon: "🌯",
    status: "تم التسليم",
    statusColor: COLORS.green,
    items: "شاورما دجاج × 3، حمص",
    total: "45 ر.س",
    date: "منذ يومين",
  },
  {
    id: "ORD-1009",
    restaurant: "سوشي ماستر",
    icon: "🍣",
    status: "ملغي",
    statusColor: COLORS.red,
    items: "رول سالمون × 2",
    total: "90 ر.س",
    date: "3 مارس",
  },
];

const favorites = restaurants.filter((r) => [1, 3, 5].includes(r.id));

const promoOffers = [
  { id: 1, bg: "#FF6B00", text: "وصّل مجاناً على أول طلب!", sub: "استخدم كود: FORSALE", emoji: "🎉" },
  { id: 2, bg: "#8E44AD", text: "عروض اليوم فقط", sub: "خصم حتى 40% على المطاعم المميزة", emoji: "⚡" },
  { id: 3, bg: "#16A085", text: "اشتري 2 واحصل على 1", sub: "على أصناف مختارة من برجر هاوس", emoji: "🎁" },
];

const S = {
  // layout
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    maxWidth: 430,
    margin: "0 auto",
    background: COLORS.white,
    position: "relative",
    overflow: "hidden",
    fontFamily: "'Cairo', 'Segoe UI', sans-serif",
    direction: "rtl",
  },
  screen: {
    flex: 1,
    overflowY: "auto",
    paddingBottom: 80,
    background: COLORS.gray,
  },
  // header
  header: {
    background: COLORS.white,
    padding: "14px 16px 12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: `1px solid ${COLORS.grayMid}`,
    position: "sticky",
    top: 0,
    zIndex: 50,
  },
  // bottom nav
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    background: COLORS.white,
    borderTop: `1px solid ${COLORS.grayMid}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    zIndex: 100,
  },
  navItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
    flex: 1,
    cursor: "pointer",
    padding: "8px 0",
    background: "none",
    border: "none",
  },
  navIcon: {
    fontSize: 22,
  },
  navLabel: {
    fontSize: 11,
    fontWeight: 500,
  },
};

function StarRating({ rating }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 2 }}>
      <span style={{ color: COLORS.star, fontSize: 13 }}>★</span>
      <span style={{ fontSize: 12, fontWeight: 600, color: COLORS.text }}>{rating}</span>
    </span>
  );
}

function Badge({ text, color }) {
  return (
    <span
      style={{
        background: color + "1A",
        color: color,
        fontSize: 10,
        fontWeight: 700,
        borderRadius: 6,
        padding: "2px 7px",
        whiteSpace: "nowrap",
      }}
    >
      {text}
    </span>
  );
}

function HomeScreen({ favorites: favIds, toggleFav, onRestaurantPress }) {
  const [promoIdx, setPromoIdx] = useState(0);
  const [search, setSearch] = useState("");

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
              <div style={{ fontSize: 11, color: COLORS.grayText }}>
                توصيل إلى
              </div>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: COLORS.text,
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                الرياض، حي العليا
                <span style={{ color: COLORS.primary, fontSize: 10 }}>▼</span>
              </div>
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
          <div
            style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}
          >
            {promoOffers[promoIdx].text}
          </div>
          <div style={{ fontSize: 12, opacity: 0.9 }}>
            {promoOffers[promoIdx].sub}
          </div>
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
                  background: i === promoIdx ? COLORS.white : "rgba(255,255,255,0.5)",
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
            marginBottom: 10,
            display: "flex",
            justifyContent: "space-between",
            paddingLeft: 16,
          }}
        >
          <span style={{ fontWeight: 700, fontSize: 15, color: COLORS.text }}>
            الأصناف
          </span>
          <span
            style={{ fontSize: 13, color: COLORS.primary, fontWeight: 600 }}
          >
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
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 12,
          }}
        >
          <span style={{ fontWeight: 700, fontSize: 15, color: COLORS.text }}>
            {search ? `نتائج البحث (${filtered.length})` : "المطاعم المتاحة"}
          </span>
          {!search && (
            <span
              style={{
                fontSize: 13,
                color: COLORS.primary,
                fontWeight: 600,
              }}
            >
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

function RestaurantCard({ r, isFav, onFav, onPress }) {
  return (
    <div
      onClick={onPress}
      style={{
        background: COLORS.white,
        borderRadius: 16,
        overflow: "hidden",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        cursor: "pointer",
        position: "relative",
      }}
    >
      {/* Image area */}
      <div
        style={{
          height: 130,
          background: r.bg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 64,
          position: "relative",
        }}
      >
        {r.image}
        {!r.open && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.45)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 0,
            }}
          >
            <span
              style={{
                background: COLORS.white,
                color: COLORS.text,
                fontWeight: 700,
                fontSize: 13,
                padding: "6px 14px",
                borderRadius: 20,
              }}
            >
              مغلق حالياً
            </span>
          </div>
        )}
        {r.offer && (
          <div
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              background: r.offerColor,
              color: COLORS.white,
              fontSize: 10,
              fontWeight: 700,
              borderRadius: 8,
              padding: "3px 8px",
            }}
          >
            {r.offer}
          </div>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onFav();
          }}
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            background: COLORS.white,
            border: "none",
            borderRadius: 50,
            width: 32,
            height: 32,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            fontSize: 16,
            boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
          }}
        >
          {isFav ? "❤️" : "🤍"}
        </button>
      </div>

      {/* Info area */}
      <div style={{ padding: "10px 12px 12px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 4,
          }}
        >
          <span
            style={{ fontWeight: 700, fontSize: 15, color: COLORS.text }}
          >
            {r.name}
          </span>
          <StarRating rating={r.rating} />
        </div>
        <div
          style={{
            fontSize: 12,
            color: COLORS.textMuted,
            marginBottom: 8,
          }}
        >
          {r.category} • ({r.reviews.toLocaleString()} تقييم)
        </div>
        <div
          style={{
            display: "flex",
            gap: 12,
            fontSize: 12,
            color: COLORS.textMuted,
          }}
        >
          <span>⏱ {r.time} دقيقة</span>
          <span>🛵 {r.fee}</span>
          <span>📦 الحد الأدنى {r.minOrder}</span>
        </div>
      </div>
    </div>
  );
}

function OrdersScreen() {
  return (
    <div style={S.screen}>
      <div
        style={{
          background: COLORS.white,
          padding: "16px 16px 12px",
          borderBottom: `1px solid ${COLORS.grayMid}`,
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: 18,
            fontWeight: 700,
            color: COLORS.text,
          }}
        >
          طلباتي
        </h2>
      </div>

      <div style={{ padding: "12px 16px", display: "flex", flexDirection: "column", gap: 12 }}>
        {orders.map((order) => (
          <div
            key={order.id}
            style={{
              background: COLORS.white,
              borderRadius: 16,
              padding: "14px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 10,
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: COLORS.primaryLight,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 26,
                  flexShrink: 0,
                }}
              >
                {order.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontWeight: 700,
                      fontSize: 14,
                      color: COLORS.text,
                    }}
                  >
                    {order.restaurant}
                  </span>
                  <Badge text={order.status} color={order.statusColor} />
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: COLORS.textMuted,
                    marginTop: 2,
                  }}
                >
                  {order.id} · {order.date}
                </div>
              </div>
            </div>
            <div
              style={{
                fontSize: 12,
                color: COLORS.textMuted,
                borderTop: `1px solid ${COLORS.grayMid}`,
                paddingTop: 10,
                marginBottom: 10,
              }}
            >
              {order.items}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontWeight: 700,
                  fontSize: 14,
                  color: COLORS.primary,
                }}
              >
                المجموع: {order.total}
              </span>
              <button
                style={{
                  background: COLORS.primaryLight,
                  color: COLORS.primary,
                  border: "none",
                  borderRadius: 10,
                  padding: "7px 14px",
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                إعادة الطلب
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FavoritesScreen({ favIds, toggleFav, onRestaurantPress }) {
  const favRestaurants = restaurants.filter((r) => favIds.includes(r.id));

  return (
    <div style={S.screen}>
      <div
        style={{
          background: COLORS.white,
          padding: "16px 16px 12px",
          borderBottom: `1px solid ${COLORS.grayMid}`,
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: 18,
            fontWeight: 700,
            color: COLORS.text,
          }}
        >
          المفضلة
        </h2>
      </div>

      <div style={{ padding: "12px 16px", display: "flex", flexDirection: "column", gap: 12 }}>
        {favRestaurants.length === 0 ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: 300,
              gap: 12,
            }}
          >
            <span style={{ fontSize: 60 }}>🤍</span>
            <span
              style={{
                fontSize: 16,
                color: COLORS.textMuted,
                fontWeight: 600,
              }}
            >
              لا يوجد مطاعم مفضلة بعد
            </span>
            <span style={{ fontSize: 13, color: COLORS.grayText }}>
              اضغط على ❤️ لإضافة مطعم لمفضلتك
            </span>
          </div>
        ) : (
          favRestaurants.map((r) => (
            <RestaurantCard
              key={r.id}
              r={r}
              isFav={true}
              onFav={() => toggleFav(r.id)}
              onPress={() => onRestaurantPress(r)}
            />
          ))
        )}
      </div>
    </div>
  );
}

function ProfileScreen() {
  const menuItems = [
    { icon: "📍", label: "عناوين التوصيل", sub: "إدارة عناوينك المحفوظة" },
    { icon: "💳", label: "طرق الدفع", sub: "بطاقات الائتمان ومحفظة Forsale" },
    { icon: "🎁", label: "العروض والكوبونات", sub: "عروضك الحالية المتاحة" },
    { icon: "⭐", label: "نقاط المكافآت", sub: "1,240 نقطة متاحة" },
    { icon: "🔔", label: "الإشعارات", sub: "ضبط إشعاراتك" },
    { icon: "🌐", label: "اللغة", sub: "العربية" },
    { icon: "🛟", label: "الدعم والمساعدة", sub: "تواصل معنا" },
    { icon: "⚙️", label: "الإعدادات", sub: "الخصوصية والأمان" },
  ];

  return (
    <div style={S.screen}>
      {/* Header */}
      <div
        style={{
          background: COLORS.primary,
          padding: "30px 20px 24px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              background: COLORS.white,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              flexShrink: 0,
            }}
          >
            👤
          </div>
          <div>
            <div
              style={{
                color: COLORS.white,
                fontWeight: 700,
                fontSize: 18,
                marginBottom: 4,
              }}
            >
              أحمد محمد
            </div>
            <div
              style={{
                color: "rgba(255,255,255,0.8)",
                fontSize: 13,
              }}
            >
              +966 50 123 4567
            </div>
            <div
              style={{
                color: "rgba(255,255,255,0.8)",
                fontSize: 12,
                marginTop: 2,
              }}
            >
              ahmed@example.com
            </div>
          </div>
          <button
            style={{
              marginRight: "auto",
              background: "rgba(255,255,255,0.2)",
              border: "none",
              borderRadius: 10,
              padding: "6px 12px",
              color: COLORS.white,
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            تعديل
          </button>
        </div>

        {/* Stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 10,
            marginTop: 20,
          }}
        >
          {[
            { label: "الطلبات", value: "24" },
            { label: "المفضلة", value: "3" },
            { label: "التقييمات", value: "18" },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                background: "rgba(255,255,255,0.15)",
                borderRadius: 12,
                padding: "10px 0",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  color: COLORS.white,
                  fontWeight: 700,
                  fontSize: 20,
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  color: "rgba(255,255,255,0.8)",
                  fontSize: 11,
                  marginTop: 2,
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Menu */}
      <div style={{ padding: "12px 16px", display: "flex", flexDirection: "column", gap: 8 }}>
        {menuItems.map((item, i) => (
          <div
            key={i}
            style={{
              background: COLORS.white,
              borderRadius: 14,
              padding: "13px 14px",
              display: "flex",
              alignItems: "center",
              gap: 12,
              cursor: "pointer",
              boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
            }}
          >
            <span
              style={{
                fontSize: 22,
                width: 40,
                height: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: COLORS.primaryLight,
                borderRadius: 10,
                flexShrink: 0,
              }}
            >
              {item.icon}
            </span>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontWeight: 600,
                  fontSize: 14,
                  color: COLORS.text,
                }}
              >
                {item.label}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: COLORS.grayText,
                  marginTop: 1,
                }}
              >
                {item.sub}
              </div>
            </div>
            <span style={{ color: COLORS.grayText, fontSize: 16 }}>‹</span>
          </div>
        ))}

        {/* Logout */}
        <div
          style={{
            background: "#FFF3F3",
            borderRadius: 14,
            padding: "13px 14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            cursor: "pointer",
            marginTop: 4,
          }}
        >
          <span style={{ fontSize: 18 }}>🚪</span>
          <span
            style={{
              fontWeight: 700,
              fontSize: 14,
              color: COLORS.red,
            }}
          >
            تسجيل الخروج
          </span>
        </div>
      </div>
    </div>
  );
}

function RestaurantModal({ r, onClose, isFav, onFav }) {
  const menuItems = [
    { name: "الأكثر مبيعاً", items: [
      { name: r.name === "برجر هاوس" ? "برجر كلاسيك" : "الطبق الرئيسي", price: "32 ر.س", desc: "وصف الطبق وإضافاته المتاحة", emoji: r.image },
      { name: "وجبة عائلية", price: "89 ر.س", desc: "مناسبة لـ 4 أشخاص مع مشروبات", emoji: "🍽️" },
    ]},
    { name: "المشروبات", items: [
      { name: "مشروب غازي", price: "8 ر.س", desc: "بيبسي، ميرندا، 7 أب", emoji: "🥤" },
      { name: "عصير طازج", price: "15 ر.س", desc: "متنوع حسب الموسم", emoji: "🧃" },
    ]},
  ];

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        zIndex: 200,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: COLORS.white,
          borderRadius: "24px 24px 0 0",
          maxHeight: "85%",
          overflowY: "auto",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header image */}
        <div
          style={{
            height: 160,
            background: r.bg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 72,
            borderRadius: "24px 24px 0 0",
            position: "relative",
          }}
        >
          {r.image}
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: 14,
              right: 14,
              background: COLORS.white,
              border: "none",
              borderRadius: "50%",
              width: 34,
              height: 34,
              fontSize: 16,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ✕
          </button>
          <button
            onClick={onFav}
            style={{
              position: "absolute",
              top: 14,
              left: 14,
              background: COLORS.white,
              border: "none",
              borderRadius: "50%",
              width: 34,
              height: 34,
              fontSize: 16,
              cursor: "pointer",
            }}
          >
            {isFav ? "❤️" : "🤍"}
          </button>
        </div>

        {/* Info */}
        <div style={{ padding: "16px 16px 20px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: 6,
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: 20,
                fontWeight: 700,
                color: COLORS.text,
              }}
            >
              {r.name}
            </h2>
            <StarRating rating={r.rating} />
          </div>
          <p
            style={{
              margin: "0 0 12px",
              fontSize: 13,
              color: COLORS.textMuted,
            }}
          >
            {r.category}
          </p>

          <div
            style={{
              display: "flex",
              gap: 8,
              flexWrap: "wrap",
              marginBottom: 16,
            }}
          >
            <Badge text={`⏱ ${r.time} دقيقة`} color={COLORS.primary} />
            <Badge text={`🛵 ${r.fee}`} color={COLORS.green} />
            <Badge text={`📦 ${r.minOrder}`} color="#8E44AD" />
          </div>

          {/* Menu sections */}
          {menuItems.map((section) => (
            <div key={section.name} style={{ marginBottom: 16 }}>
              <h3
                style={{
                  margin: "0 0 10px",
                  fontSize: 14,
                  fontWeight: 700,
                  color: COLORS.text,
                  borderRight: `3px solid ${COLORS.primary}`,
                  paddingRight: 8,
                }}
              >
                {section.name}
              </h3>
              {section.items.map((item) => (
                <div
                  key={item.name}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "10px 0",
                    borderBottom: `1px solid ${COLORS.grayMid}`,
                  }}
                >
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: 12,
                      background: r.bg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 26,
                      flexShrink: 0,
                    }}
                  >
                    {item.emoji}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontWeight: 600,
                        fontSize: 14,
                        color: COLORS.text,
                      }}
                    >
                      {item.name}
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        color: COLORS.grayText,
                        marginTop: 2,
                      }}
                    >
                      {item.desc}
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
                    <span
                      style={{
                        fontWeight: 700,
                        fontSize: 14,
                        color: COLORS.primary,
                      }}
                    >
                      {item.price}
                    </span>
                    <button
                      style={{
                        background: COLORS.primary,
                        border: "none",
                        borderRadius: 8,
                        width: 28,
                        height: 28,
                        color: COLORS.white,
                        fontSize: 18,
                        fontWeight: 700,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const navItems = [
  { id: "home", icon: "🏠", label: "الرئيسية" },
  { id: "orders", icon: "📋", label: "طلباتي" },
  { id: "favorites", icon: "❤️", label: "المفضلة" },
  { id: "profile", icon: "👤", label: "حسابي" },
];

export default function App() {
  const [tab, setTab] = useState("home");
  const [favIds, setFavIds] = useState([1, 3, 5]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  const toggleFav = (id) => {
    setFavIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div style={S.container}>
      {/* Logo header */}
      <div
        style={{
          background: COLORS.white,
          padding: "12px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderBottom: tab !== "home" ? `1px solid ${COLORS.grayMid}` : "none",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: COLORS.primary,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
            }}
          >
            🏪
          </div>
          <span
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: COLORS.primary,
              letterSpacing: -0.5,
            }}
          >
            Forsale
          </span>
        </div>
      </div>

      {/* Main content */}
      {tab === "home" && (
        <HomeScreen
          favorites={favIds}
          toggleFav={toggleFav}
          onRestaurantPress={setSelectedRestaurant}
        />
      )}
      {tab === "orders" && <OrdersScreen />}
      {tab === "favorites" && (
        <FavoritesScreen
          favIds={favIds}
          toggleFav={toggleFav}
          onRestaurantPress={setSelectedRestaurant}
        />
      )}
      {tab === "profile" && <ProfileScreen />}

      {/* Bottom Nav */}
      <div style={S.bottomNav}>
        {navItems.map((item) => {
          const active = tab === item.id;
          return (
            <button
              key={item.id}
              style={{
                ...S.navItem,
                color: active ? COLORS.primary : COLORS.grayText,
              }}
              onClick={() => setTab(item.id)}
            >
              <span
                style={{
                  ...S.navIcon,
                  transform: active ? "scale(1.15)" : "scale(1)",
                  transition: "transform 0.2s",
                }}
              >
                {item.icon}
              </span>
              <span
                style={{
                  ...S.navLabel,
                  fontWeight: active ? 700 : 400,
                }}
              >
                {item.label}
              </span>
              {active && (
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    width: 28,
                    height: 3,
                    background: COLORS.primary,
                    borderRadius: "3px 3px 0 0",
                  }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Restaurant Modal */}
      {selectedRestaurant && (
        <RestaurantModal
          r={selectedRestaurant}
          onClose={() => setSelectedRestaurant(null)}
          isFav={favIds.includes(selectedRestaurant.id)}
          onFav={() => toggleFav(selectedRestaurant.id)}
        />
      )}
    </div>
  );
}
