"use client"

import { useId } from "react"

interface GradientSparkleIconProps {
  size?: number
  className?: string
}

export default function GradientSparkleIcon({ size = 20, className }: GradientSparkleIconProps) {
  const id = useId()

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 256 256"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient
          id={id}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
          gradientTransform="rotate(45)"
        >
          <stop offset="0%" stopColor="#706FD9" />
          <stop offset="100%" stopColor="#548AFF" />
        </linearGradient>
      </defs>
      <path
        d="M208,144a15.78,15.78,0,0,1-10.42,14.94L146,178l-19,51.62a15.92,15.92,0,0,1-29.88,0L78,178l-51.62-19a15.92,15.92,0,0,1,0-29.88L78,110l19-51.62a15.92,15.92,0,0,1,29.88,0L146,110l51.62,19A15.78,15.78,0,0,1,208,144ZM152,48h16V64a8,8,0,0,0,16,0V48h16a8,8,0,0,0,0-16H184V16a8,8,0,0,0-16,0V32H152a8,8,0,0,0,0,16Zm88,32h-8V72a8,8,0,0,0-16,0v8h-8a8,8,0,0,0,0,16h8v8a8,8,0,0,0,16,0V96h8a8,8,0,0,0,0-16Z"
        fill={`url(#${id})`}
      />
    </svg>
  )
}
