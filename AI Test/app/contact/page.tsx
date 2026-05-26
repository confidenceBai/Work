"use client"

import { motion } from "framer-motion"
import { colors, fonts } from "@/lib/design-tokens"

function ChatBubbleIcon() {
  return (
    <svg
      width="362"
      height="384"
      viewBox="0 0 362 384"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ position: "absolute", top: 0, left: 0 }}
    >
      <defs>
        <path
          d="M 327.5 283.069 L 317.5 296.124 L 306 307.674 L 289.5 322.236 L 266 337.803 L 240.5 349.352 L 215.5 356.382 L 200.5 358.391 L 184 358.893 L 172.5 358.391 L 161.5 357.386 L 141.5 353.369 L 136 351.361 L 127.5 352.365 L 117.5 356.382 L 60.5 380.987 L 51.5 384 L 46 384 L 40 382.996 L 34.5 379.481 L 29.5 374.459 L 25.5 365.923 L 26.5 357.386 L 30.5 339.811 L 36 323.742 L 43 301.648 L 43.399 293.644 C 16.341 262.536 0 222.145 0 178 C 0 79.693 81.036 0 181 0 C 280.964 0 362 79.693 362 178 C 362 215.664 350.105 250.595 329.808 279.359 Z"
          id="bubble-path"
        />
        <filter
          id="bubble-shadow"
          filterUnits="objectBoundingBox"
          x="-17.4%"
          y="-29.4%"
          width="134.8%"
          height="158.9%"
        >
          <feOffset dx="0" dy="50" in="SourceAlpha" result="a1012z" />
          <feGaussianBlur stdDeviation="15" in="a1012z" result="a1013z" />
          <feFlood floodColor="rgba(0, 0, 0, 0.13)" result="a1014z" />
          <feComposite in="a1014z" in2="a1013z" operator="in" result="a1003z" />
          <feOffset dx="0" dy="27.48" in="SourceAlpha" result="a1015z" />
          <feGaussianBlur stdDeviation="8.245" in="a1015z" result="a1016z" />
          <feFlood floodColor="rgba(0, 0, 0, 0.13)" result="a1017z" />
          <feComposite in="a1017z" in2="a1016z" operator="in" result="a1004z" />
          <feOffset dx="0" dy="15.96" in="SourceAlpha" result="a1018z" />
          <feGaussianBlur stdDeviation="4.785" in="a1018z" result="a1019z" />
          <feFlood floodColor="rgba(0, 0, 0, 0.13)" result="a1020z" />
          <feComposite in="a1020z" in2="a1019z" operator="in" result="a1005z" />
          <feOffset dx="0" dy="9.75" in="SourceAlpha" result="a1021z" />
          <feGaussianBlur stdDeviation="2.925" in="a1021z" result="a1022z" />
          <feFlood floodColor="rgba(0, 0, 0, 0.13)" result="a1023z" />
          <feComposite in="a1023z" in2="a1022z" operator="in" result="a1006z" />
          <feOffset dx="0" dy="6.04" in="SourceAlpha" result="a1024z" />
          <feGaussianBlur stdDeviation="1.81" in="a1024z" result="a1025z" />
          <feFlood floodColor="rgba(0, 0, 0, 0.13)" result="a1026z" />
          <feComposite in="a1026z" in2="a1025z" operator="in" result="a1007z" />
          <feOffset dx="0" dy="3.63" in="SourceAlpha" result="a1027z" />
          <feGaussianBlur stdDeviation="1.09" in="a1027z" result="a1028z" />
          <feFlood floodColor="rgba(0, 0, 0, 0.13)" result="a1029z" />
          <feComposite in="a1029z" in2="a1028z" operator="in" result="a1008z" />
          <feOffset dx="0" dy="1.99" in="SourceAlpha" result="a1030z" />
          <feGaussianBlur stdDeviation="0.595" in="a1030z" result="a1031z" />
          <feFlood floodColor="rgba(0, 0, 0, 0.13)" result="a1032z" />
          <feComposite in="a1032z" in2="a1031z" operator="in" result="a1009z" />
          <feOffset dx="0" dy="0.84" in="SourceAlpha" result="a1033z" />
          <feGaussianBlur stdDeviation="0.25" in="a1033z" result="a1034z" />
          <feFlood floodColor="rgba(0, 0, 0, 0.13)" result="a1035z" />
          <feComposite in="a1035z" in2="a1034z" operator="in" result="a1010z" />
          <feMerge>
            <feMergeNode in="a1003z" />
            <feMergeNode in="a1004z" />
            <feMergeNode in="a1005z" />
            <feMergeNode in="a1006z" />
            <feMergeNode in="a1007z" />
            <feMergeNode in="a1008z" />
            <feMergeNode in="a1009z" />
            <feMergeNode in="a1010z" />
          </feMerge>
        </filter>
      </defs>
      <g filter="url(#bubble-shadow)">
        <use href="#bubble-path" fill={colors.dark[700]} />
      </g>
    </svg>
  )
}

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
          padding: "176px 40px 144px",
        }}
      >
        <motion.div
          className="contact-page-inner"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 40,
            width: "100%",
          }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Header */}
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
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <h1
              style={{
                fontFamily: fonts.sans,
                fontSize: 40,
                lineHeight: "1.2em",
                fontWeight: 500,
                color: colors.neutral[50],
                margin: 0,
                letterSpacing: 0,
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
            }}
          >
            {/* Chat Icon 装饰 */}
            <figure
              className="chat-icon-decoration"
              style={{
                position: "absolute",
                top: -137,
                right: -137,
                width: 369,
                height: 393,
                zIndex: 4,
                margin: 0,
                pointerEvents: "none",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: 362,
                  height: 387,
                  top: "calc(50.6361% - 193.5px)",
                  left: "calc(50.1355% - 181px)",
                }}
              >
                <ChatBubbleIcon />
                <div
                  style={{
                    position: "absolute",
                    top: "calc(49.8728% - 195.5px)",
                    left: 0,
                    right: 0,
                    height: 391,
                    zIndex: 1,
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/img/contact/chat-icon.png"
                    alt=""
                    style={{
                      display: "block",
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                  />
                </div>
              </div>
            </figure>

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
                    height: 200,
                    flex: "1 0 0",
                    width: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    gap: 16,
                    overflow: "hidden",
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
                      overflow: "hidden",
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
        </motion.div>
      </div>
    </main>
  )
}
