import COLORS from "../constants/colors";

const S = {
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100dvh",
    maxWidth: 430,
    margin: "0 auto",
    background: COLORS.white,
    overflow: "hidden",
    fontFamily: "'Cairo', 'Segoe UI', Tahoma, sans-serif",
    direction: "rtl",
  },
  screen: {
    flex: 1,
    overflowY: "auto",
    overflowX: "hidden",
    paddingBottom: 16,
    background: "#F4F4F4",
    WebkitOverflowScrolling: "touch",
  },
  bottomNav: {
    flexShrink: 0,
    height: 64,
    background: COLORS.white,
    borderTop: `1px solid #EBEBEB`,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    zIndex: 100,
  },
  navItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 3,
    flex: 1,
    cursor: "pointer",
    padding: "8px 0",
    background: "none",
    border: "none",
    fontFamily: "'Cairo', 'Segoe UI', Tahoma, sans-serif",
    position: "relative",
    height: "100%",
    justifyContent: "center",
  },
  navIcon: { fontSize: 20 },
  navLabel: { fontSize: 10 },
};

export default S;
