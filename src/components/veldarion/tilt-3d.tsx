"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";

/* ================================================================
   Tilt3D — spring-physics pointer tilt (CSS 3D)
   ----------------------------------------------------------------
   Gives any card the feel of a physical object held in the hand:
   a brief, a fee agreement, a control panel. Pure transform-layer
   3D (no WebGL), so it costs nothing until a pointer arrives.

   - pointer:fine only — touch devices never tilt
   - prefers-reduced-motion disables the effect entirely
   - springs (stiffness 160 / damping 18) settle to zero idle cost
   - children can opt into depth with Tailwind's
     [transform:translateZ(Npx)] + [transform-style:preserve-3d]
================================================================ */

export default function Tilt3D({
  children,
  className = "",
  max = 4,
  perspective = 1100,
  lift = 0,
}: {
  children: ReactNode;
  className?: string;
  /** Maximum tilt in degrees on either axis */
  max?: number;
  /** Perspective distance in px — smaller = more dramatic */
  perspective?: number;
  /** Optional translateZ applied while hovering (px) */
  lift?: number;
}) {
  const reduce = useReducedMotion() ?? false;
  const ref = useRef<HTMLDivElement>(null);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const z = useMotionValue(0);

  const spring = { stiffness: 160, damping: 18, mass: 0.4 };
  const sx = useSpring(rotateX, spring);
  const sy = useSpring(rotateY, spring);
  const sz = useSpring(z, { stiffness: 200, damping: 22, mass: 0.5 });

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5; // -0.5..0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * max * 2);
    rotateX.set(-py * max * 2);
    if (lift) z.set(lift);
  };

  const onPointerLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    z.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className={className}
      style={{
        rotateX: sx,
        rotateY: sy,
        z: sz,
        transformPerspective: perspective,
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </motion.div>
  );
}
