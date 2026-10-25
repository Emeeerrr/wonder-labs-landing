"use client"

import type * as React from "react"
import { motion } from "motion/react"

import { useReducedMotionSafe } from "@/lib/use-reduced-motion-safe"

type RevealOwnProps = {
  /** Retardo en segundos, útil para orquestar un stagger manual entre hermanos. */
  delay?: number
}

type RevealDivProps = RevealOwnProps & {
  /**
   * Elemento a renderizar. Por defecto "div". Usa "li" cuando Reveal envuelve
   * directamente el contenido de un `<li>` dentro de un `<ol>`/`<ul>` — así el
   * nodo animado es el propio `<li>` y no rompe el content model de la lista.
   */
  as?: "div"
} & Omit<
    React.ComponentProps<typeof motion.div>,
    "initial" | "whileInView" | "viewport" | "transition"
  >

type RevealLiProps = RevealOwnProps & {
  as: "li"
} & Omit<
    React.ComponentProps<typeof motion.li>,
    "initial" | "whileInView" | "viewport" | "transition"
  >

type RevealProps = RevealDivProps | RevealLiProps

/**
 * Revelado de entrada al scroll: fade + y 24px, 0.5s ease-out, una sola vez
 * (`viewport: { once: true, margin: "-80px" }` dispara un poco antes de que
 * el elemento toque el borde inferior del viewport). Con reduced-motion no
 * anima: se pinta directamente en su estado final.
 *
 * `data-reveal` marca el nodo para el override `<noscript>` global en
 * `layout.tsx` ([data-reveal]{opacity:1!important;transform:none!important}):
 * sin JS, `initial` deja el contenido en opacity:0 / translateY para siempre,
 * así que ese CSS fuerza el estado final visible.
 */
function Reveal({ delay = 0, as = "div", className, children, ...props }: RevealProps) {
  const reduce = useReducedMotionSafe()

  const sharedProps = {
    "data-reveal": "",
    className,
    initial: reduce ? false : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: reduce ? { duration: 0 } : { duration: 0.5, delay, ease: "easeOut" as const },
  }

  if (as === "li") {
    return (
      <motion.li {...sharedProps} {...(props as Omit<RevealLiProps, "as" | "delay">)}>
        {children}
      </motion.li>
    )
  }

  return (
    <motion.div {...sharedProps} {...(props as Omit<RevealDivProps, "as" | "delay">)}>
      {children}
    </motion.div>
  )
}

export { Reveal }
