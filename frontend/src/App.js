// frontend/src/App.js
import { useState } from "react";
import COLORS from "./constants/colors";
import S from "./styles";

// Screens
import HomeScreen       from "./screens/HomeScreen";
import FoodScreen       from "./screens/FoodScreen";
import SupermarketScreen from "./screens/SupermarketScreen";
import ElectronicsScreen from "./screens/ElectronicsScreen";
import CarsScreen       from "./screens/CarsScreen";
import RealEstateScreen  from "./screens/RealEstateScreen";
import TrackingScreen   from "./screens/TrackingScreen";
import LoyaltyScreen    from "./screens/LoyaltyScreen";
import OrdersScreen     from "./screens/OrdersScreen";
import ProfileScreen    from "./screens/ProfileScreen";

// Components
import RestaurantModal from "./components/RestaurantModal";
import NotifDrawer    from "./components/NotifDrawer";
import ProModal       from "./components/ProModal";
import RatingModal    from "./components/RatingModal";

const navItems = [
  { id: "home",     icon: "🏠", label: "الرئيسية" },
  { id: "tracking", icon: "🗺️", label: "تتبع" },
  { id: "loyalty",  icon: "💎", label: "نقاطي" },
  { id: "orders",   icon: "📋", label: "طلباتي" },
  { id: "profile",  icon: "👤", label: "حسابي" },
];

export default function App() {
  const [tab, setTab]       = useState("home");
  const [section, setSection] = useState(null); // food | supermarket | electronics | cars | realestate
  const [dark, setDark]     = useState(false);
  const [favIds, setFavIds] = useState([1, 3]);
  const [points, setPoints] = useState(1240);
  const [unread, setUnread] = useState(2);
  const [selectedR, setSelectedR] = useState(null);
  const [notifOpen, setNotifOpen] = useState(false);
  const [proOpen,   setProOpen]   = useState(false);
  const [ratingOpen, setRatingOpen] = useState(false);

  const toggleFav = id => setFavIds(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);

  const themeNav   = dark ? "#1C1C1C" : "#fff";
  const themeBorder = dark ? "rgba(255,255,255,.08)" : "#EBEBEB";

  const goBack = () => setSection(null);

  const renderSection = () => {
    if (section === "food")        return <FoodScreen favorites={favIds} toggleFav={toggleFav} onRestaurantPress={r => { setSelectedR(r); }} dark={dark} onBack={goBack} />;
    if (section === "supermarket") return <SupermarketScreen dark={dark} onBack={goBack} />;
    if (section === "electronics") return <ElectronicsScreen dark={dark} onBack={goBack} />;
    if (section === "cars")        return <CarsScreen dark={dark} onBack={goBack} />;
    if (section === "realestate")  return <RealEstateScreen dark={dark} onBack={goBack} />;
    return null;
  };

  const renderTab = () => {
    if (section) return renderSection();
    if (tab === "home")     return <HomeScreen dark={dark} onSectionPress={s => { setSection(s); }} />;
    if (tab === "tracking") return <TrackingScreen dark={dark} />;
    if (tab === "loyalty")  return <LoyaltyScreen points={points} onRedeem={cost => setPoints(p => p - cost)} dark={dark} />;
    if (tab === "orders")   return <OrdersScreen onRate={() => setRatingOpen(true)} onTrack={() => setTab("tracking")} dark={dark} />;
    if (tab === "profile")  return <ProfileScreen points={points} onOpenPro={() => setProOpen(true)} dark={dark} />;
  };

  return (
    <div style={{ ...S.container, background: dark ? "#111" : "#fff" }}>
      {/* ── Header ── */}
      <div style={{ background: dark ? "#1C1C1C" : "#fff", borderBottom: `1px solid ${themeBorder}`, padding: "10px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0, zIndex: 50 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 34, height: 34, borderRadius: 10, background: COLORS.primary, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🏪</div>
          <span style={{ fontSize: 20, fontWeight: 800, color: COLORS.primary }}>Forsale</span>
          <span style={{ background: "#FFD700", color: "#7A4F00", fontSize: 9, fontWeight: 800, borderRadius: 6, padding: "2px 6px" }}>PRO</span>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <button onClick={() => setDark(d => !d)} style={{ background: dark ? "#252525" : "#F5F5F5", border: `1px solid ${themeBorder}`, borderRadius: 10, width: 36, height: 36, cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {dark ? "☀️" : "🌙"}
          </button>
          <button onClick={() => { setNotifOpen(true); setUnread(0); }} style={{ background: dark ? "#252525" : "#F5F5F5", border: `1px solid ${themeBorder}`, borderRadius: 10, width: 36, height: 36, cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
            🔔
            {unread > 0 && <span style={{ position: "absolute", top: 4, right: 4, width: 16, height: 16, background: COLORS.red, borderRadius: "50%", fontSize: 9, color: "#fff", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>{unread}</span>}
          </button>
          <button onClick={() => setProOpen(true)} style={{ background: "linear-gradient(135deg,#FFD700,#FF8C00)", border: "none", borderRadius: 10, padding: "0 12px", height: 36, cursor: "pointer", fontSize: 12, fontWeight: 700, color: "#fff", fontFamily: "inherit" }}>
            Pro ✨
          </button>
        </div>
      </div>

      {/* ── Content ── */}
      {renderTab()}

      {/* ── Bottom Nav ── */}
      <div style={{ ...S.bottomNav, background: themeNav, borderTop: `1px solid ${themeBorder}` }}>
        {navItems.map(item => {
          const active = tab === item.id && !section;
          return (
            <button key={item.id}
              onClick={() => { setSection(null); setTab(item.id); }}
              style={{ ...S.navItem, color: active ? COLORS.primary : (dark ? "#666" : "#AAA"), fontFamily: "inherit" }}>
              <span style={{ ...S.navIcon, transform: active ? "scale(1.15)" : "scale(1)", transition: "transform .2s" }}>{item.icon}</span>
              <span style={{ ...S.navLabel, fontWeight: active ? 700 : 400 }}>{item.label}</span>
              {active && <div style={{ position: "absolute", bottom: 0, width: 24, height: 3, background: COLORS.primary, borderRadius: "3px 3px 0 0" }} />}
            </button>
          );
        })}
      </div>

      {/* ── Modals ── */}
      {selectedR  && <RestaurantModal r={selectedR} onClose={() => setSelectedR(null)} isFav={favIds.includes(selectedR.id)} onFav={() => toggleFav(selectedR.id)} onOrderConfirmed={() => setPoints(p => p + 120)} dark={dark} />}
      {notifOpen  && <NotifDrawer onClose={() => setNotifOpen(false)} dark={dark} />}
      {proOpen    && <ProModal onClose={() => setProOpen(false)} dark={dark} />}
      {ratingOpen && <RatingModal onClose={() => setRatingOpen(false)} onSubmit={() => { setPoints(p => p + 120); setRatingOpen(false); }} dark={dark} />}
    </div>
  );
}
