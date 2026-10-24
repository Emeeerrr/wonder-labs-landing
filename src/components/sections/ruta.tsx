"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"
import { motion, useScroll, useSpring, useTransform } from "motion/react"

import { Container } from "@/components/brand/container"
import { Eyebrow } from "@/components/brand/eyebrow"
import { Reveal } from "@/components/brand/reveal"
import { Section } from "@/components/brand/section"
import { HOME } from "@/content/home"
import { useReducedMotionSafe } from "@/lib/use-reduced-motion-safe"

/**
 * Línea de progreso: se traza con el scroll de la lista de etapas usando
 * `scaleY` (transform-only, sin layout thrash) con origen arriba. Un spring
 * suaviza el seguimiento del scroll sin introducir animación de layout.
 * Con reduced-motion se renderiza completa y estática.
 */
function ProgressLine({ targetRef }: { targetRef: React.RefObject<HTMLElement | null> }) {
  const reduce = useReducedMotionSafe()
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start center", "end center"],
  })
  const spring = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 })
  const scaleY = useTransform(spring, [0, 1], [0, 1])

  return (
    <div
      aria-hidden
      className="absolute top-0 bottom-0 left-0 w-px bg-white/12 md:left-0"
      style={{ transformOrigin: "top" }}
    >
      <motion.div
        className="from-brand-blue to-brand-midnight absolute inset-0 origin-top bg-gradient-to-b"
        style={{ scaleY: reduce ? 1 : scaleY }}
      />
    </div>
  )
}

/** Orbe degradé de 12px que marca cada etapa sobre la línea — eco de la molécula del hero. */
function StageOrb() {
  return (
    <span
      aria-hidden
      className="absolute top-1.5 left-0 size-3 -translate-x-1/2 rounded-full"
      style={{
        backgroundImage:
          "radial-gradient(circle at 35% 30%, var(--brand-blue), var(--brand-midnight))",
        boxShadow:
          "0 0 0 4px var(--brand-midnight), 0 0 12px color-mix(in srgb, var(--brand-blue) 60%, transparent)",
      }}
    />
  )
}

/**
 * La ruta: capítulo oscuro inmersivo, columna vertebral de la página. Cuatro
 * etapas con numeración mono, orbes sobre una línea de progreso que se dibuja
 * con el scroll, y una nota de cierre con CTA secundario hacia /servicios.
 */
function Ruta() {
  const listRef = React.useRef<HTMLOListElement>(null)

  return (
    <Section id="ruta" tone="dark">
      <Container>
        <Reveal>
          <Eyebrow>{HOME.ruta.eyebrow}</Eyebrow>
          <h2 className="font-display mt-4 max-w-[26ch] text-[clamp(2rem,4vw,3rem)] font-extrabold tracking-tight">
            {HOME.ruta.title}
          </h2>
        </Reveal>

        <ol ref={listRef} className="relative mt-16 flex flex-col gap-12 pl-10 md:gap-16 md:pl-16">
          <ProgressLine targetRef={listRef} />
          {HOME.ruta.stages.map((stage, index) => (
            <Reveal key={stage.number} delay={index * 0.08}>
              <li className="relative grid grid-cols-[auto_1fr] items-start gap-5 md:gap-8">
                <span className="absolute top-1.5 -left-10 md:-left-16">
                  <StageOrb />
                </span>
                <span className="text-brand-blue font-mono text-2xl font-semibold tabular-nums md:text-3xl">
                  {stage.number}
                </span>
                <div>
                  <h3 className="font-display text-[1.75rem] font-bold md:text-[2rem]">
                    {stage.title}
                  </h3>
                  <p className="text-muted-foreground mt-2 max-w-[46ch] text-base leading-relaxed md:text-lg">
                    {stage.text}
                  </p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={0.1} className="mt-16 max-w-[56ch] pl-10 md:pl-16">
          <p className="text-muted-foreground text-base leading-relaxed">{HOME.ruta.note}</p>
          <Link
            href={HOME.ruta.cta.href}
            className="group text-brand-blue mt-6 inline-flex min-h-11 items-center gap-2 text-base font-semibold transition-colors duration-200 ease-out hover:text-[color-mix(in_srgb,var(--brand-blue)_80%,white)]"
          >
            {HOME.ruta.cta.label}
            <ArrowRightIcon className="size-4 shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </Container>
    </Section>
  )
}

export { Ruta }
