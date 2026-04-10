import COLORS from "../constants/colors";
import S from "../styles";
import { restaurants } from "../data";
import RestaurantCard from "../components/RestaurantCard";

export default function FavoritesScreen({ favIds, toggleFav, onRestaurantPress, dark }) {
  const favRestaurants = restaurants.filter((r) => favIds.includes(r.id));
  const card = dark ? "#1C1C1C" : COLORS.white;
  const border = dark ? "rgba(255,255,255,.08)" : "#EBEBEB";
  const text = dark ? "#F0F0F0" : COLORS.text;
  const muted = dark ? "#999" : COLORS.textMuted;
  const grayText = dark ? "#555" : "#AAA";
  const bg = dark ? "#111" : "#F4F4F4";

  return (
    <div style={{ ...S.screen, background: bg }}>
      <div style={{ background: card, padding: "14px 16px 12px", borderBottom: `1px solid ${border}`, position: "sticky", top: 0, zIndex: 10 }}>
        <h2 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: text }}>المفضلة</h2>
      </div>
      <div style={{ padding: "12px 16px" }}>
        {favRestaurants.length === 0 ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: 300, gap: 12 }}>
            <span style={{ fontSize: 60 }}>🤍</span>
            <span style={{ fontSize: 16, color: muted, fontWeight: 600 }}>لا يوجد مطاعم مفضلة بعد</span>
            <span style={{ fontSize: 13, color: grayText }}>اضغط على ❤️ لإضافة مطعم لمفضلتك</span>
          </div>
        ) : (
          favRestaurants.map((r) => (
            <RestaurantCard
              key={r.id}
              r={r}
              isFav={true}
              onFav={() => toggleFav(r.id)}
              onPress={() => onRestaurantPress(r)}
              dark={dark}
            />
          ))
        )}
      </div>
    </div>
  );
}
