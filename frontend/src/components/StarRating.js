import COLORS from "../constants/colors";

export default function StarRating({ rating }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 2 }}>
      <span style={{ color: COLORS.star, fontSize: 13 }}>★</span>
      <span style={{ fontSize: 12, fontWeight: 600, color: COLORS.text }}>{rating}</span>
    </span>
  );
}
