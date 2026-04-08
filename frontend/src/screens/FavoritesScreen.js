import COLORS from "../constants/colors";
import S from "../styles";
import { restaurants } from "../data";
import RestaurantCard from "../components/RestaurantCard";

export default function FavoritesScreen({ favIds, toggleFav, onRestaurantPress }) {
  const favRestaurants = restaurants.filter((r) => favIds.includes(r.id));

  return (
    <div style={S.screen}>
      <div
        style={{
          background: COLORS.white, padding: "16px 16px 12px",
          borderBottom: `1px solid ${COLORS.grayMid}`,
          position: "sticky", top: 0, zIndex: 10,
        }}
      >
        <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: COLORS.text }}>المفضلة</h2>
      </div>

      <div style={{ padding: "12px 16px", display: "flex", flexDirection: "column", gap: 12 }}>
        {favRestaurants.length === 0 ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: 300, gap: 12 }}>
            <span style={{ fontSize: 60 }}>🤍</span>
            <span style={{ fontSize: 16, color: COLORS.textMuted, fontWeight: 600 }}>لا يوجد مطاعم مفضلة بعد</span>
            <span style={{ fontSize: 13, color: COLORS.grayText }}>اضغط على ❤️ لإضافة مطعم لمفضلتك</span>
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
