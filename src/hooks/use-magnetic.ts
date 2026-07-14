"use client";

import { useRef, useCallback } from "react";
import { useMotionValue, useSpring } from "framer-motion";

interface UseMagneticOptions {
  strength?: number;
  springConfig?: { stiffness?: number; damping?: number; mass?: number };
}

export function useMagnetic<T extends HTMLElement = HTMLDivElement>(
  { strength = 0.3, springConfig = {} }: UseMagneticOptions = {},
  elementRef?: React.RefObject<T>
) {
  const internalRef = useRef<T>(null);
  const ref = elementRef || internalRef;
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 300, damping: 20, ...springConfig });
  const springY = useSpring(y, { stiffness: 300, damping: 20, ...springConfig });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<T>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      x.set((e.clientX - centerX) * strength);
      y.set((e.clientY - centerY) * strength);
    },
    [x, y, strength, ref]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return { ref, x: springX, y: springY, handleMouseMove, handleMouseLeave };
}
