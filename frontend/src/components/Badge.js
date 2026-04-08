export default function Badge({ text, color }) {
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
