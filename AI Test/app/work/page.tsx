"use client"

import CaseStudyCard from "@/components/case-study-card"
import PageTransition from "@/components/page-transition"
import { colors, fonts, text, shadows } from "@/lib/design-tokens"
import { WORKS } from "@/lib/works-data"

export default function WorkPage() {
  return (
    <>
      <style>{`
        .work-listing-page {
          max-width: 1200px;
          margin: 0 auto;
          padding: 120px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          z-index: 4;
        }

        /* ─── Tablet (769-1200px) ─── */
        @media (min-width: 769px) and (max-width: 1200px) {
          .work-listing-page {
            padding: 120px 32px;
          }
        }

        /* ─── Mobile (<768px) ─── */
        @media (max-width: 768px) {
          .work-listing-page {
            padding: 120px 8px;
          }
        }
      `}</style>

      <main
        style={{
          position: "relative",
          minHeight: "100dvh",
          overflow: "clip",
        }}
      >
        <PageTransition>
        {/* Page content */}
        <div className="work-listing-page">
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
        </PageTransition>
      </main>
    </>
  )
}
