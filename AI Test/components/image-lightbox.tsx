"use client";

import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function ImageLightbox() {
  const [src, setSrc] = useState<string | null>(null);
  const [scale, setScale] = useState(1);

  const close = useCallback(() => {
    setSrc(null);
    setScale(1);
  }, []);

  // Global click handler — captures clicks on any <img> that doesn't have data-no-lightbox
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName !== "IMG") return;
      if (target.hasAttribute("data-no-lightbox")) return;
      const img = target as HTMLImageElement;
      if (!img.src) return;
      e.preventDefault();
      e.stopPropagation();
      setSrc(img.src);
    };
    document.addEventListener("click", handler, true);
    return () => document.removeEventListener("click", handler, true);
  }, []);

  // ESC to close
  useEffect(() => {
    if (!src) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [src, close]);

  // Lock body scroll when open
  useEffect(() => {
    if (!src) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [src]);

  // Mouse wheel zoom
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    setScale((s) => {
      const next = s - e.deltaY * 0.002;
      return Math.min(Math.max(next, 1), 4);
    });
  }, []);

  return (
    <AnimatePresence>
      {src && (
        <motion.div
          key="image-lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={close}
          onWheel={handleWheel}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "zoom-out",
          }}
        >
          {/* Close hint */}
          <div
            style={{
              position: "absolute",
              top: 20,
              right: 24,
              color: "rgba(255,255,255,0.5)",
              fontSize: 14,
              fontFamily: "Inter, sans-serif",
              pointerEvents: "none",
              userSelect: "none",
            }}
          >
            ESC / 点击关闭
          </div>

          <motion.img
            key={src}
            src={src}
            alt=""
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            draggable={false}
            style={{
              maxWidth: "90vw",
              maxHeight: "90vh",
              objectFit: "contain",
              borderRadius: 8,
              transform: `scale(${scale})`,
              transition: "transform 0.1s ease-out",
              cursor: scale > 1 ? "zoom-out" : "default",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
