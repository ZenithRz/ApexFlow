"use client";

import { useRef, useCallback } from "react";
import { useMotionValue, useSpring, useTransform } from "framer-motion";

interface UseTiltOptions {
  intensity?: number;
  springConfig?: { stiffness?: number; damping?: number; mass?: number };
}

export function useTilt<T extends HTMLElement = HTMLDivElement>(
  { intensity = 15, springConfig = {} }: UseTiltOptions = {},
  elementRef?: React.RefObject<T>
) {
  const internalRef = useRef<T>(null);
  const ref = elementRef || internalRef;
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const springX = useSpring(x, { stiffness: 150, damping: 20, mass: 0.5, ...springConfig });
  const springY = useSpring(y, { stiffness: 150, damping: 20, mass: 0.5, ...springConfig });

  const rotateX = useTransform(springY, [0, 1], [intensity, -intensity]);
  const rotateY = useTransform(springX, [0, 1], [-intensity, intensity]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<T>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      x.set((e.clientX - rect.left) / rect.width);
      y.set((e.clientY - rect.top) / rect.height);
    },
    [x, y, ref]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0.5);
    y.set(0.5);
  }, [x, y]);

  return { ref, rotateX, rotateY, handleMouseMove, handleMouseLeave };
}
