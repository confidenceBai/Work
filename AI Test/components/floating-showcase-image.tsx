"use client"

import { motion, useSpring, useTransform, MotionValue } from "framer-motion"
import Link from "next/link"
import { CSSProperties } from "react"

interface FloatingShowcaseImageProps {
  rotation?: number
  index?: number
  style?: CSSProperties
  mouseX: MotionValue<number>
  mouseY: MotionValue<number>
  intensity?: number
  imageSrc?: string
  href?: string
}

export default function FloatingShowcaseImage({
  rotation = 0,
  index = 0,
  style,
  mouseX,
  mouseY,
  intensity = 20,
  imageSrc,
  href,
}: FloatingShowcaseImageProps) {
  // direction="away": images move opposite to cursor
  const x = useSpring(useTransform(mouseX, [-0.5, 0.5], [intensity, -intensity]), {
    stiffness: 50,
    damping: 20,
  })
  const y = useSpring(useTransform(mouseY, [-0.5, 0.5], [intensity, -intensity]), {
    stiffness: 50,
    damping: 20,
  })

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
      animate={{ opacity: 1, scale: 1, rotate: rotation }}
      transition={{ delay: index * 0.12, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      exit={{ opacity: 0, scale: 0.5, rotate: 0, transition: { duration: 0.3, ease: "easeIn" } }}
      whileHover={{
        scale: 1.06,
        rotate: rotation + (rotation >= 0 ? 3 : -3),
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
      style={{
        position: "absolute",
        width: 400,
        height: 300,
        x,
        y,
        borderRadius: 16,
        boxShadow: "0px 0.84px 0.5px -0.31px rgba(0,0,0,0.13), 0px 1.99px 1.19px -0.63px rgba(0,0,0,0.13), 0px 3.63px 2.18px -0.94px rgba(0,0,0,0.13), 0px 6.04px 3.62px -1.25px rgba(0,0,0,0.13), 0px 9.75px 5.85px -1.56px rgba(0,0,0,0.13), 0px 15.96px 9.57px -1.88px rgba(0,0,0,0.13), 0px 27.48px 16.49px -2.19px rgba(0,0,0,0.13), 0px 50px 30px -2.5px rgba(0,0,0,0.13)",
        ...style,
      }}
    >
      <div style={{ width: "100%", height: "100%", clipPath: "inset(0px round 16px)", overflow: "hidden" }}>
        {href ? (
          <Link href={href} data-no-glow style={{ display: "block", width: "100%", height: "100%", position: "relative" }}>
            {imageSrc && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={imageSrc}
                alt=""
                data-no-lightbox
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            )}
          </Link>
        ) : (
          imageSrc && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageSrc}
              alt=""
              data-no-lightbox
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          )
        )}
      </div>
    </motion.div>
  )
}
