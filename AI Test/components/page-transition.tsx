"use client"

import { motion } from "framer-motion"

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
}

const pageTransition = {
  duration: 0.4,
  ease: [0.25, 0.1, 0.25, 1] as const,
}

export default function PageTransition({
  children,
  className,
  style,
}: {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={pageVariants}
      transition={pageTransition}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  )
}
