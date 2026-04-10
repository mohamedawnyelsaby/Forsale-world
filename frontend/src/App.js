import { useState } from "react";
import COLORS from "./constants/colors";
import S from "./styles";
import HomeScreen from "./screens/HomeScreen";
import TrackingScreen from "./screens/TrackingScreen";
import LoyaltyScreen from "./screens/LoyaltyScreen";
import OrdersScreen from "./screens/OrdersScreen";
import FavoritesScreen from "./screens/FavoritesScreen";
import ProfileScreen from "./screens/ProfileScreen";
import RestaurantModal from "./components/RestaurantModal";
import NotifDrawer from "./components/NotifDrawer";
import ProModal from "./components/ProModal";
import RatingModal from "./components/RatingModal";

const navItems = [
  { id: "home",     icon: "🏠", label: "الرئيسية" },
  { id: "tracking", icon: "🗺️", label: "تتبع" },
  { id: "loyalty",  icon: "💎", label: "نقاطي" },
  { id: "orders",   icon: "📋", label: "طلباتي" },
  { id: "profile",  icon: "👤", label: "حسابي" },
];

export default function App() {
  const [tab, setTab] = useState("home");
  const [dark, setDark] = useState(false);
  const [favIds, setFavIds] = useState([1, 3]);
  const [points, setPoints] = useState(1240);
  const [unread, setUnread] = useState(2);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [notifOpen, setNotifOpen] = useState(false);
  const [proOpen, setProOpen] = useState(false);
  const [ratingOpen, setRatingOpen] = useState(false);

  const toggleFav = (id) =>
    setFavIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  const handleOrderConfirmed = () => {
    setPoints((p) => p + 120);
  };

  const handleRatingSubmit = (stars) => {
    setPoints((p) => p + 120);
    setRatingOpen(false);
  };

  const themeContainerStyle = {
    ...S.container,
    background: dark ? "#111" : COLORS.white,
    color: dark ? "#F0F0F0" : COLORS.text,
  };

  const navBg = dark ? "#1C1C1C" : COLORS.white;
  const navBorder = dark ? "rgba(255,255,255,.08)" : "#EBEBEB";

  return (
    <div style={themeContainerStyle}>
      {/* Header */}
      <div style={{
        background: dark ? "#1C1C1C" : COLORS.white,
        borderBottom: `1px solid ${dark ? "rgba(255,255,255,.08)" : "#EBEBEB"}`,
        padding: "10px 16px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        zIndex: 50, flexShrink: 0,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 34, height: 34, borderRadius: 10, background: COLORS.primary, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🏪</div>
          <span style={{ fontSize: 20, fontWeight: 800, color: COLORS.primary }}>Forsale</span>
          <span style={{ background: "#FFD700", color: "#7A4F00", fontSize: 9, fontWeight: 800, borderRadius: 6, padding: "2px 6px", marginTop: 2 }}>PRO</span>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <button
            onClick={() => setDark((d) => !d)}
            style={{ background: dark ? "#252525" : "#F5F5F5", border: `1px solid ${dark ? "rgba(255,255,255,.1)" : "#E0E0E0"}`, borderRadius: 10, width: 36, height: 36, cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            {dark ? "☀️" : "🌙"}
          </button>
          <button
            onClick={() => { setNotifOpen(true); setUnread(0); }}
            style={{ background: dark ? "#252525" : "#F5F5F5", border: `1px solid ${dark ? "rgba(255,255,255,.1)" : "#E0E0E0"}`, borderRadius: 10, width: 36, height: 36, cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}
          >
            🔔
            {unread > 0 && (
              <span style={{ position: "absolute", top: 4, right: 4, width: 16, height: 16, background: COLORS.red, borderRadius: "50%", fontSize: 9, color: "#fff", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>{unread}</span>
            )}
          </button>
          <button
            onClick={() => setProOpen(true)}
            style={{ background: "linear-gradient(135deg,#FFD700,#FF8C00)", border: "none", borderRadius: 10, padding: "0 12px", height: 36, cursor: "pointer", fontSize: 12, fontWeight: 700, color: "#fff", fontFamily: "inherit" }}
          >
            Pro ✨
          </button>
        </div>
      </div>

      {/* Screens */}
      {tab === "home" && (
        <HomeScreen
          favorites={favIds}
          toggleFav={toggleFav}
          onRestaurantPress={(r) => setSelectedRestaurant(r)}
          dark={dark}
          onTabChange={setTab}
        />
      )}
      {tab === "tracking" && <TrackingScreen dark={dark} />}
      {tab === "loyalty" && (
        <LoyaltyScreen
          points={points}
          onRedeem={(cost) => setPoints((p) => p - cost)}
          dark={dark}
        />
      )}
      {tab === "orders" && (
        <OrdersScreen
          onRate={() => setRatingOpen(true)}
          onTrack={() => setTab("tracking")}
          dark={dark}
        />
      )}
      {tab === "profile" && (
        <ProfileScreen
          points={points}
          onOpenPro={() => setProOpen(true)}
          dark={dark}
        />
      )}

      {/* Bottom Navigation */}
      <div style={{ ...S.bottomNav, background: navBg, borderTop: `1px solid ${navBorder}`, position: "static" }}>
        {navItems.map((item) => {
          const active = tab === item.id;
          return (
            <button
              key={item.id}
              style={{ ...S.navItem, color: active ? COLORS.primary : (dark ? "#666" : "#AAA"), fontFamily: "inherit" }}
              onClick={() => setTab(item.id)}
            >
              <span style={{ ...S.navIcon, transform: active ? "scale(1.15)" : "scale(1)", transition: "transform .2s" }}>
                {item.icon}
              </span>
              <span style={{ ...S.navLabel, fontWeight: active ? 700 : 400 }}>
                {item.label}
              </span>
              {active && (
                <div style={{ position: "absolute", bottom: 0, width: 24, height: 3, background: COLORS.primary, borderRadius: "3px 3px 0 0" }} />
              )}
            </button>
          );
        })}
      </div>

      {/* Modals & Drawers */}
      {selectedRestaurant && (
        <RestaurantModal
          r={selectedRestaurant}
          onClose={() => setSelectedRestaurant(null)}
          isFav={favIds.includes(selectedRestaurant.id)}
          onFav={() => toggleFav(selectedRestaurant.id)}
          onOrderConfirmed={handleOrderConfirmed}
          dark={dark}
        />
      )}
      {notifOpen && <NotifDrawer onClose={() => setNotifOpen(false)} dark={dark} />}
      {proOpen && <ProModal onClose={() => setProOpen(false)} dark={dark} />}
      {ratingOpen && (
        <RatingModal
          onClose={() => setRatingOpen(false)}
          onSubmit={handleRatingSubmit}
          dark={dark}
        />
      )}
    </div>
  );
}
