interface ScrollableImageProps {
  src: string
  alt?: string
  height: number
  aspectRatio: number
  className?: string
}

export default function ScrollableImage({
  src,
  alt = "",
  height,
  aspectRatio,
  className = "",
}: ScrollableImageProps) {
  const minWidth = height * aspectRatio

  return (
    <div className={`overflow-x-auto w-full ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        style={{
          display: "block",
          width: "100%",
          height: `${height}px`,
          minWidth: `${minWidth}px`,
        }}
      />
    </div>
  )
}
