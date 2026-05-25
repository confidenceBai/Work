import CaseStudyCard from "@/components/case-study-card"
import { colors, fonts, text, shadows } from "@/lib/design-tokens"
import { WORKS } from "@/lib/works-data"

const SHAPES_ICON_URL = "/img/shapes-icon.png"

export default function WorkPage() {
  return (
    <main
      style={{
        position: "relative",
        minHeight: "100dvh",
        overflow: "clip",
      }}
    >
      {/* Top-right decorative shape */}
      <div
        style={{
          position: "absolute",
          width: 484,
          height: 491,
          top: -137,
          right: -137,
          overflow: "clip",
          zIndex: 4,
          pointerEvents: "none",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={SHAPES_ICON_URL}
          alt=""
          style={{
            position: "absolute",
            height: 533,
            aspectRatio: "1",
            right: -29,
            bottom: -28,
            left: -20,
            transform: "rotate(20deg)",
            objectFit: "contain",
          }}
        />
      </div>

      {/* Page content */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "160px 20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          zIndex: 4,
        }}
      >
        {/* Content column */}
        <div
          className="content-column"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          {/* Header card */}
          <div
            style={{
              boxSizing: "border-box",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              alignContent: "flex-start",
              flexWrap: "nowrap",
              gap: 8,
              padding: 24,
              borderRadius: 24,
              backgroundColor: colors.dark[700],
              borderTop: `1px solid ${colors.dark[400]}`,
              borderLeft: `1px solid ${colors.dark[400]}`,
              borderRight: "none",
              borderBottom: "none",
              boxShadow: shadows.ambient8,
            }}
          >
            <h1
              style={{
                margin: 0,
                fontFamily: fonts.sans,
                fontSize: text.h2.fontSize,
                lineHeight: text.h2.lineHeight,
                fontWeight: text.h2.fontWeight,
                color: colors.neutral[50],
              }}
            >
              重点项目一览
            </h1>
          </div>

          {/* Case study cards */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 24,
            }}
          >
            {WORKS.map((work, i) => (
              <CaseStudyCard key={i} {...work} />
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
