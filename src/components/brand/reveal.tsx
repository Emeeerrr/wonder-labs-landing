"use client"

import type * as React from "react"
import { motion } from "motion/react"

import { useReducedMotionSafe } from "@/lib/use-reduced-motion-safe"

type RevealProps = Omit<
  React.ComponentProps<typeof motion.div>,
  "initial" | "whileInView" | "viewport" | "transition"
> & {
  /** Retardo en segundos, útil para orquestar un stagger manual entre hermanos. */
  delay?: number
}

/**
 * Revelado de entrada al scroll: fade + y 24px, 0.5s ease-out, una sola vez
 * (`viewport: { once: true, margin: "-80px" }` dispara un poco antes de que
 * el elemento toque el borde inferior del viewport). Con reduced-motion no
 * anima: se pinta directamente en su estado final.
 */
function Reveal({ delay = 0, className, children, ...props }: RevealProps) {
  const reduce = useReducedMotionSafe()

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={reduce ? { duration: 0 } : { duration: 0.5, delay, ease: "easeOut" }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export { Reveal }
