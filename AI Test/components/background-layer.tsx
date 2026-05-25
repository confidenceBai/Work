export default function BackgroundLayer() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        overflow: "hidden",
        background: "linear-gradient(180deg, rgb(156, 96, 96) 0%, rgb(0, 53, 150) 100%)",
      }}
    >
      {/* Grain overlay — CSS-only stepped animation, no JS */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
        <div className="grain-overlay" />
      </div>

      {/* Bottom blur gradient — sits above grain, behind nav */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "106px",
          background:
            "linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 100%)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          maskImage: "linear-gradient(to top, black 0%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to top, black 0%, transparent 100%)",
        }}
      />
    </div>
  )
}
