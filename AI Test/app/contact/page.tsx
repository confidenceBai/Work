"use client"

import { colors, fonts, text, shadows } from "@/lib/design-tokens"
import PageTransition from "@/components/page-transition"

export default function ContactPage() {
  return (
    <main
      className="contact-page"
      style={{
        position: "relative",
        minHeight: "100dvh",
        overflow: "clip",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "120px 40px 144px",
        }}
      >
        <PageTransition>
          <div
            className="contact-page-inner"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 40,
              width: "100%",
            }}
          >
          {/* Header */}
          <section
            className="contact-header"
            style={{
              backgroundColor: colors.dark[700],
              borderRadius: 24,
              borderTop: `1px solid ${colors.dark[400]}`,
              borderLeft: `1px solid ${colors.dark[400]}`,
              borderRight: "none",
              borderBottom: "none",
              padding: 24,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              width: "100%",
              maxWidth: 666,
              flex: "none",
              position: "relative",
              overflow: "visible",
              boxShadow: shadows.ambient8,
            }}
          >
            <h1
              style={{
                margin: 0,
                width: "100%",
                fontFamily: fonts.sans,
                fontSize: text.h2.fontSize,
                lineHeight: text.h2.lineHeight,
                fontWeight: text.h2.fontWeight,
                color: colors.neutral[50],
                textAlign: "left",
              }}
            >
              与我联系
            </h1>
          </section>

          {/* Contact Form Card */}
          <section
            style={{
              backgroundColor: colors.dark[700],
              borderRadius: 24,
              borderTop: `1px solid ${colors.dark[400]}`,
              borderLeft: `1px solid ${colors.dark[400]}`,
              borderRight: "none",
              borderBottom: "none",
              padding: 24,
              width: "100%",
              maxWidth: 666,
              position: "relative",
              boxShadow: shadows.ambient8,
            }}
          >
            {/* Inner Card */}
            <div
              style={{
                borderRadius: 12,
                display: "flex",
                flexDirection: "column",
                gap: 24,
                width: "100%",
                position: "relative",
                zIndex: 2,
              }}
            >
              <div
                className="contact-form-row"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 12,
                  alignItems: "flex-start",
                  width: "100%",
                }}
              >
                {/* 个人照片 */}
                <div
                  style={{
                    width: 157,
                    aspectRatio: "0.785146",
                    borderRadius: 12,
                    flexShrink: 0,
                    overflow: "visible",
                    position: "relative",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/img/contact/photo.jpg"
                    alt="白子煜"
                    style={{
                      display: "block",
                      width: "100%",
                      height: "100%",
                      borderRadius: 12,
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                  />
                </div>

                {/* 内容卡片 */}
                <div
                  style={{
                    backgroundColor: colors.dark[500],
                    borderRadius: 12,
                    borderTop: `1px solid ${colors.dark[50]}`,
                    borderLeft: `1px solid ${colors.dark[50]}`,
                    borderRight: "none",
                    borderBottom: "none",
                    padding: 24,
                    minHeight: 200,
                    flex: "1 0 0",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    gap: 16,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: 32,
                      width: "100%",
                    }}
                  >
                    {/* 邮箱 */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                        gap: 8,
                        width: "100%",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: fonts.sans,
                          fontSize: 16,
                          lineHeight: "1.5em",
                          fontWeight: 500,
                          color: colors.neutral[50],
                          width: "100%",
                        }}
                      >
                        邮箱
                      </span>
                      <a
                        href="mailto:1624724153@qq.com"
                        style={{
                          fontFamily: fonts.sans,
                          fontSize: 16,
                          lineHeight: "22.4px",
                          fontWeight: 400,
                          color: colors.neutral[400],
                          textDecoration: "none",
                          width: "100%",
                        }}
                      >
                        1624724153@qq.com
                      </a>
                    </div>

                    {/* 电话 */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                        gap: 8,
                        width: "100%",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: fonts.sans,
                          fontSize: 16,
                          lineHeight: "1.5em",
                          fontWeight: 500,
                          color: colors.neutral[50],
                          width: "100%",
                        }}
                      >
                        电话
                      </span>
                      <a
                        href="tel:13950014653"
                        style={{
                          fontFamily: fonts.sans,
                          fontSize: 16,
                          lineHeight: "22.4px",
                          fontWeight: 400,
                          color: colors.neutral[400],
                          textDecoration: "none",
                          width: "100%",
                        }}
                      >
                        13950014653
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
            </div>
        </PageTransition>
      </div>
    </main>
  )
}
