"use client"

import { motion } from "framer-motion"
import { Shapes, Phone, EnvelopeSimple } from "@phosphor-icons/react"
import Divider from "@/components/divider"
import { colors, fonts, text, styles } from "@/lib/design-tokens"

export default function ContactPage() {
  return (
    <main
      style={{
        position: "relative",
        minHeight: "100dvh",
        overflow: "clip",
      }}
    >
      {/* Decorative shapes icon */}
      <div
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          transform: "rotate(20deg)",
          opacity: 0.3,
          zIndex: 1,
        }}
      >
        <Shapes size={48} color={colors.neutral[400]} weight="fill" />
      </div>

      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "160px 20px 120px",
        }}
      >
        <div
          className="content-column"
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <motion.div
            className="contact-card"
            style={{
              ...styles.card,
              padding: 32,
              display: "flex",
              gap: 32,
              width: "100%",
            }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Left: QR Code */}
            <div
              style={{
                ...styles.subCard,
                padding: 24,
                flexShrink: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <motion.img
                src="/img/wechat-qr.svg"
                alt="微信二维码"
                style={{
                  width: 200,
                  height: 200,
                  borderRadius: 12,
                  display: "block",
                  objectFit: "contain",
                }}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.4,
                  delay: 0.15,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              />
            </div>

            {/* Right: Contact Details */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                flex: 1,
                minWidth: 0,
              }}
            >
              <div>
                <h2
                  style={{
                    fontFamily: fonts.sans,
                    fontSize: text.h4.fontSize,
                    lineHeight: text.h4.lineHeight,
                    fontWeight: text.h4.fontWeight,
                    color: "#FF9191",
                    margin: 0,
                  }}
                >
                  与我联系
                </h2>

                <Divider />

                {/* Phone */}
                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    alignItems: "center",
                    marginTop: 16,
                  }}
                >
                  <Phone
                    size={18}
                    color={colors.neutral[600]}
                    weight="fill"
                    style={{ flexShrink: 0 }}
                  />
                  <span
                    style={{
                      fontFamily: fonts.display,
                      fontSize: text.label.fontSize,
                      lineHeight: text.label.lineHeight,
                      fontWeight: text.label.fontWeight,
                      letterSpacing: text.label.letterSpacing,
                      color: colors.neutral[400],
                      minWidth: 40,
                    }}
                  >
                    电话
                  </span>
                  <a
                    href="tel:13950014653"
                    style={{
                      fontFamily: fonts.sans,
                      fontSize: text.body.fontSize,
                      lineHeight: text.body.lineHeight,
                      fontWeight: text.body.fontWeight,
                      color: colors.neutral[50],
                      textDecoration: "none",
                    }}
                  >
                    13950014653
                  </a>
                </div>

                {/* Email */}
                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    alignItems: "center",
                    marginTop: 12,
                  }}
                >
                  <EnvelopeSimple
                    size={18}
                    color={colors.neutral[600]}
                    weight="fill"
                    style={{ flexShrink: 0 }}
                  />
                  <span
                    style={{
                      fontFamily: fonts.display,
                      fontSize: text.label.fontSize,
                      lineHeight: text.label.lineHeight,
                      fontWeight: text.label.fontWeight,
                      letterSpacing: text.label.letterSpacing,
                      color: colors.neutral[400],
                      minWidth: 40,
                    }}
                  >
                    邮箱
                  </span>
                  <a
                    href="mailto:1624724153@qq.com"
                    style={{
                      fontFamily: fonts.sans,
                      fontSize: text.body.fontSize,
                      lineHeight: text.body.lineHeight,
                      fontWeight: text.body.fontWeight,
                      color: colors.neutral[50],
                      textDecoration: "none",
                    }}
                  >
                    1624724153@qq.com
                  </a>
                </div>
              </div>

              {/* Sign-off */}
              <div
                style={{
                  fontFamily: fonts.sans,
                  fontSize: text.body.fontSize,
                  fontWeight: 500,
                  color: colors.neutral[400],
                  textAlign: "right",
                  marginTop: 24,
                }}
              >
                白子煜
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
