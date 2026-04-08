import { useState } from "react";
import COLORS from "./constants/colors";
import S from "./styles";
import HomeScreen from "./screens/HomeScreen";
import OrdersScreen from "./screens/OrdersScreen";
import FavoritesScreen from "./screens/FavoritesScreen";
import ProfileScreen from "./screens/ProfileScreen";
import RestaurantModal from "./components/RestaurantModal";

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
      {/* Logo Header */}
      <div
        style={{
          background: COLORS.white, padding: "12px 20px",
          display: "flex", alignItems: "center", justifyContent: "center",
          borderBottom: tab !== "home" ? `1px solid ${COLORS.grayMid}` : "none",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              width: 36, height: 36, borderRadius: 10,
              background: COLORS.primary,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 18,
            }}
          >
            🏪
          </div>
          <span style={{ fontSize: 22, fontWeight: 800, color: COLORS.primary, letterSpacing: -0.5 }}>
            Forsale
          </span>
        </div>
      </div>

      {/* Screens */}
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

      {/* Bottom Navigation */}
      <div style={S.bottomNav}>
        {navItems.map((item) => {
          const active = tab === item.id;
          return (
            <button
              key={item.id}
              style={{ ...S.navItem, color: active ? COLORS.primary : COLORS.grayText }}
              onClick={() => setTab(item.id)}
            >
              <span style={{ ...S.navIcon, transform: active ? "scale(1.15)" : "scale(1)", transition: "transform 0.2s" }}>
                {item.icon}
              </span>
              <span style={{ ...S.navLabel, fontWeight: active ? 700 : 400 }}>
                {item.label}
              </span>
              {active && (
                <div
                  style={{
                    position: "absolute", bottom: 0,
                    width: 28, height: 3,
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
