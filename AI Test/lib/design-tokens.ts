export const shadows = {
  ambient8: [
    "0px 0.84px 0.5px -0.31px rgba(0,0,0,0.13)",
    "0px 1.99px 1.19px -0.63px rgba(0,0,0,0.13)",
    "0px 3.63px 2.18px -0.94px rgba(0,0,0,0.13)",
    "0px 6.04px 3.62px -1.25px rgba(0,0,0,0.13)",
    "0px 9.75px 5.85px -1.56px rgba(0,0,0,0.13)",
    "0px 15.96px 9.57px -1.88px rgba(0,0,0,0.13)",
    "0px 27.48px 16.49px -2.19px rgba(0,0,0,0.13)",
    "0px 50px 30px -2.5px rgba(0,0,0,0.13)",
  ].join(", "),
} as const

export const colors = {
  neutral: {
    50:  "rgb(252, 252, 252)",
    100: "rgb(242, 242, 245)",
    200: "rgb(227, 227, 232)",
    300: "rgb(204, 204, 214)",
    400: "rgb(174, 174, 188)",
    500: "rgb(137, 137, 159)",
    600: "rgb(99, 99, 121)",
    800: "rgb(39, 39, 48)",
  },
  dark: {
    50:  "rgb(58, 61, 67)",
    400: "rgb(46, 49, 56)",
    500: "rgb(41, 44, 51)",
    600: "rgb(39, 42, 49)",
    700: "rgb(31, 33, 38)",
    800: "rgb(21, 22, 26)",
    900: "rgb(14, 15, 16)",
  },
  black: "#000000",
} as const

export const styles = {
  card: {
    width: "100%",
    backgroundColor: colors.dark[700],
    borderRadius: 24,
    borderTop: `1px solid ${colors.dark[400]}`,
    borderLeft: `1px solid ${colors.dark[400]}`,
    boxShadow: shadows.ambient8,
  } as React.CSSProperties,
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: colors.dark[600],
    marginTop: 12,
    marginBottom: 12,
  } as React.CSSProperties,
  featureRow: {
    width: "100%",
    display: "flex",
    gap: 8,
    alignItems: "flex-start",
  } as React.CSSProperties,
  featureTitle: {
    margin: 0,
    width: "25%",
    minWidth: 90,
    flexShrink: 0,
  } as React.CSSProperties,
  featureDesc: {
    margin: 0,
    width: "100%",
  } as React.CSSProperties,
  subCard: {
    width: "100%",
    backgroundColor: colors.dark[500],
    borderRadius: 12,
    borderTop: `1px solid ${colors.dark[50]}`,
    borderLeft: `1px solid ${colors.dark[50]}`,
  } as React.CSSProperties,
} as const

export const glow = {
  color: "rgba(94, 106, 210, 0.08)",
  radius: 400,
  transition: "opacity 0.3s ease",
  shadow: "0 2px 20px rgba(0,0,0,0.4), 0 0 40px rgba(0,0,0,0.2)",
  shadowHover: "0 8px 40px rgba(0,0,0,0.5), 0 0 80px rgba(94,106,210,0.1)",
} as const

export const interactiveGlow = {
  radius: 120,
  color: "rgba(255, 255, 255, 0.12)",
  transition: "opacity 0.2s ease",
} as const

export const flowingBorder = {
  color: "rgba(175, 175, 175, 0.6)",
  colorTransparent: "rgba(175, 175, 175, 0)",
  radius: 400,
  transition: "opacity 0.3s ease",
  width: 1,
} as const

export const syntax = {
  comment:  "rgba(128, 128, 128, 0.7)",
  keyword:  "#569CD6",
  variable: "#9CDCFE",
  number:   "rgba(181, 206, 168, 0.9)",
  text:     "rgba(220, 220, 220, 0.85)",
} as const

export const fonts = {
  sans: "system-ui, -apple-system, 'PingFang SC', 'Noto Sans SC', sans-serif",
  display: "InterDisplay, 'Inter Display', Inter, sans-serif",
} as const

export const text = {
  h1: { fontSize: 72, lineHeight: "1.2em", fontWeight: 500 },
  h2: { fontSize: 40, lineHeight: "1.2em", fontWeight: 600 },
  h3: { fontSize: 32, lineHeight: "1.2em", fontWeight: 600 },
  h4: { fontSize: 20, lineHeight: "1.2em", fontWeight: 600 },
  h5: { fontSize: 18, lineHeight: "1.4em", fontWeight: 500 },
  h6: { fontSize: 16, lineHeight: "1.4em", fontWeight: 500 },
  body: { fontSize: 16, lineHeight: "22.4px", fontWeight: 400 },
  label: { fontSize: 14, lineHeight: "1.5em", fontWeight: 500, letterSpacing: "0.08em" },
} as const
