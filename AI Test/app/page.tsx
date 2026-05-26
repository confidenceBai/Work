"use client"

import { useRef, useCallback } from "react"
import Link from "next/link"
import { useMotionValue } from "framer-motion"
import FloatingShowcaseImage from "@/components/floating-showcase-image"
import { colors, fonts } from "@/lib/design-tokens"

function CompanyLogo() {
  return (
    <span
      style={{
        display: "inline-block",
        width: 111,
        height: 40,
        verticalAlign: "middle",
        overflow: "hidden",
        position: "relative",
        flexShrink: 0,
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        style={{ position: "absolute", left: 42, top: -33, width: 27, height: 99, display: "block", transform: "rotate(90deg)" }}
        viewBox="0 0 26.912 99"
      >
        <path d="M 5.458 70.394 C 5.476 71.362 4.959 72.264 4.108 72.753 C 3.256 73.242 2.202 73.242 1.35 72.752 C 0.499 72.263 -0.017 71.361 0 70.393 C 0.001 68.915 1.223 67.716 2.73 67.716 C 4.237 67.717 5.459 68.916 5.459 70.394 Z M 11.294 72.835 C 9.929 72.835 8.823 71.737 8.823 70.394 C 8.823 69.052 9.928 67.963 11.294 67.953 L 19.978 67.953 C 21.817 67.953 23.58 68.669 24.881 69.945 C 26.181 71.22 26.912 72.95 26.912 74.754 C 26.912 76.558 26.182 78.288 24.882 79.564 C 23.581 80.839 21.818 81.556 19.979 81.556 L 14.897 81.556 C 13.817 81.556 12.941 82.415 12.941 83.475 C 12.941 84.535 13.817 85.394 14.897 85.394 L 14.927 85.394 C 14.93 85.394 14.932 85.394 14.935 85.394 L 24.406 85.394 C 25.748 85.437 26.814 86.518 26.814 87.835 C 26.814 89.153 25.748 90.233 24.406 90.276 L 24.406 90.278 L 14.899 90.278 C 13.818 90.278 12.942 91.137 12.942 92.197 C 12.942 93.257 13.818 94.117 14.899 94.117 L 24.407 94.117 C 25.749 94.16 26.815 95.24 26.815 96.558 C 26.815 97.875 25.749 98.955 24.407 98.998 L 24.407 99 L 13.971 99 C 11.422 99 9.148 97.431 8.286 95.078 C 7.424 92.724 8.161 90.094 10.127 88.503 C 10.343 88.347 10.47 88.1 10.47 87.837 C 10.47 87.575 10.343 87.328 10.127 87.172 C 8.159 85.581 7.422 82.95 8.284 80.596 C 9.146 78.243 11.422 76.673 13.971 76.675 L 19.875 76.675 C 20.956 76.675 21.832 75.815 21.832 74.755 C 21.832 73.695 20.956 72.836 19.875 72.836 L 11.294 72.836 Z" fill="rgb(116, 216, 241)" />
        <path d="M 7.552 0 C 7.552 0 7.569 1.361 8.617 2.188 C 9.82 3.141 11.621 2.737 12.054 2.62 C 13.582 1.711 15.436 1.178 17.438 1.178 C 22.651 1.178 26.877 4.795 26.877 9.26 C 26.877 13.724 22.651 17.341 17.438 17.341 C 12.224 17.341 7.998 13.724 7.998 9.26 C 7.998 8.375 8.166 7.497 8.493 6.672 C 8.571 6.387 8.712 5.798 8.617 5.522 C 8.536 5.292 8.351 5.059 8.138 4.789 C 7.791 4.353 7.371 3.823 7.208 3.064 C 6.855 1.404 7.552 0 7.552 0 Z M 17.438 13.301 C 20.054 13.301 22.174 11.492 22.174 9.26 C 22.174 7.028 20.054 5.218 17.438 5.218 C 14.821 5.218 12.701 7.028 12.701 9.26 C 12.701 11.492 14.821 13.301 17.437 13.301 Z" fill="rgb(80, 164, 222)" />
        <path d="M 24.406 25.558 L 12.358 25.558 L 3.456 30.38 C 3.456 30.38 3.117 30.588 2.642 30.588 C 1.99 30.588 1.52 30.133 1.502 29.498 L 1.5 27.107 C 1.5 26.654 1.761 26.261 2.143 26.064 L 6.891 23.49 C 6.891 23.49 7.164 23.338 7.164 23.094 C 7.164 22.849 6.89 22.727 6.89 22.727 L 2.285 20.232 C 1.758 19.947 1.515 19.652 1.502 19.159 L 1.5 16.769 C 1.5 16.074 1.99 15.619 2.633 15.619 C 3.118 15.619 3.436 15.828 3.436 15.828 L 12.381 20.675 L 24.404 20.675 C 25.757 20.703 26.837 21.788 26.834 23.116 C 26.839 24.443 25.759 25.53 24.406 25.559 Z M 9.519 31.525 C 9.7 31.345 9.878 31.169 9.848 31.056 C 9.792 30.848 8.576 30.772 8.311 30.755 C 8.267 30.753 8.249 30.752 8.27 30.752 C 7.589 30.743 6.68 30.793 6.59 30.955 C 6.544 31.042 6.778 31.35 6.838 31.431 L 6.852 31.448 L 7.649 32.57 C 7.879 32.896 7.978 33.017 8.099 33.017 C 8.237 33.017 8.358 32.878 8.555 32.619 C 8.648 32.497 8.763 32.35 8.888 32.205 C 9.092 31.973 9.302 31.746 9.519 31.525 Z" fill="rgb(80, 164, 222)" />
        <path d="M 17.438 29.935 C 22.651 29.935 26.877 33.553 26.877 38.017 C 26.877 42.481 22.651 46.098 17.438 46.098 C 12.225 46.098 7.998 42.481 7.998 38.017 C 7.998 33.553 12.224 29.935 17.438 29.935 Z M 17.437 33.976 C 14.821 33.976 12.701 35.785 12.701 38.017 C 12.701 40.249 14.821 42.058 17.438 42.058 C 20.054 42.058 22.175 40.249 22.175 38.017 C 22.175 35.785 20.054 33.976 17.437 33.976 Z" fill="rgb(80, 164, 222)" />
        <path d="M 26.843 51.907 C 26.843 53.249 25.739 54.338 24.372 54.348 L 17.678 54.348 C 17.052 54.348 16.545 54.845 16.545 55.459 L 16.545 58.086 C 16.545 58.7 17.053 59.198 17.678 59.198 L 24.372 59.198 C 25.746 59.198 26.86 60.29 26.86 61.638 C 26.86 62.986 25.746 64.079 24.372 64.079 L 3.982 64.079 C 2.645 64.03 1.587 62.952 1.587 61.639 C 1.587 60.326 2.645 59.248 3.982 59.199 L 10.16 59.197 C 10.784 59.197 11.29 58.703 11.294 58.091 L 11.294 55.46 C 11.294 54.846 10.786 54.348 10.16 54.348 L 3.982 54.348 C 2.634 54.313 1.559 53.231 1.559 51.907 C 1.559 50.584 2.634 49.501 3.982 49.466 L 24.372 49.466 C 25.739 49.476 26.842 50.565 26.843 51.906 Z" fill="rgb(80, 164, 222)" />
      </svg>
    </span>
  )
}

function TextEmbbedIcon({ rotation = 0, imageSrc }: { rotation?: number; imageSrc?: string }) {
  return (
    <span
      style={{
        display: "inline-block",
        width: imageSrc ? 38 : 32,
        height: imageSrc ? 29 : 24,
        borderRadius: 112,
        overflow: "hidden",
        backgroundColor: colors.dark[400],
        border: `1px solid ${colors.dark[50]}`,
        verticalAlign: "middle",
        position: "relative",
        transform: imageSrc ? "none" : `rotate(${rotation}deg)`,
        marginLeft: 4,
        flexShrink: 0,
      }}
    >
      {imageSrc ? (
        <img
          src={imageSrc}
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "50% 50%",
            transform: "scale(2)",
            transformOrigin: "50% 30%",
          }}
        />
      ) : (
        <span
          style={{
            position: "absolute",
            width: 13,
            height: 35,
            top: -30,
            left: -50,
            backgroundColor: "rgba(255, 255, 255, 0.53)",
            transform: "rotate(26deg)",
          }}
        />
      )}
    </span>
  )
}

const FLOATING_IMAGES = [
  // 顶部(1) → 左上(2) → 左下(3) → 右下(4) → 右上(5)：逆时针排列
  { rotation: 0,   style: { top: -123, left: "calc(51% - 200px)" }, imageSrc: "/img/fm/封面.png",        href: "/work/fm" },
  { rotation: 11,  style: { top: 110, left: -79 },                 imageSrc: "/img/抽奖/封面.jpeg",      href: "/work/lottery" },
  { rotation: -9,  style: { bottom: -94, left: -5 },               imageSrc: "/img/Rooms/封面.png",      href: "/work/wave-rooms" },
  { rotation: 15,  style: { bottom: -104, left: 796 },             imageSrc: "/img/HoYoWave/封面.png",   href: "/work/hoyowave" },
  { rotation: -15, style: { top: 68, right: -102 },                imageSrc: "/img/CC/封面.png",         href: "/work/component-checker" },
] as const

export default function Home() {
  const containerRef = useRef<HTMLElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) return
      mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
      mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
    },
    [mouseX, mouseY]
  )

  return (
    <main
      ref={containerRef}
      onMouseMove={handleMouseMove}
      style={{
        position: "relative",
        minHeight: "100dvh",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 1200,
          height: 800,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          overflow: "visible",
          zIndex: 4,
        }}
      >
        {FLOATING_IMAGES.map((img, i) => (
          <FloatingShowcaseImage
            key={i}
            rotation={img.rotation}
            style={img.style as React.CSSProperties}
            mouseX={mouseX}
            mouseY={mouseY}
            imageSrc={img.imageSrc}
            href={img.href}
          />
        ))}
      </div>

      <article
        style={{
          position: "relative",
          zIndex: 4,
          width: 480,
          minWidth: 480,
          maxWidth: 480,
          borderRadius: 24,
          backgroundColor: colors.dark[700],
          borderTopWidth: 1,
          borderLeftWidth: 1,
          borderRightWidth: 0,
          borderBottomWidth: 0,
          borderStyle: "solid",
          borderColor: colors.dark[400],
          padding: 24,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1
          style={{
            fontFamily: fonts.sans,
            fontWeight: 400,
            fontSize: 28,
            lineHeight: "1.2em",
            letterSpacing: 0,
            textAlign: "center",
            color: colors.neutral[50],
            margin: 0,
            textWrap: "balance",
          }}
        >
          Hi，我叫{" "}
          <Link href="/about-us" style={{ fontWeight: 500, color: "#FF9191", textDecoration: "none" }}>白子煜</Link>
          <TextEmbbedIcon rotation={8} imageSrc="/img/about-us/BJdnkVSaKuHEVB3S7uHPJok6aNA.jpeg" />
          {" "}有着{" "}
          <Link href="/about-us" style={{ fontWeight: 500, color: "#DDE83F", textDecoration: "none" }}>四年工作经验</Link>
          {" "}<span style={{ whiteSpace: "nowrap" }}>目前就职于<CompanyLogo />的</span> UX 设计师一枚
        </h1>
      </article>
    </main>
  )
}
