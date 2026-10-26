"use client"

import * as React from "react"
import Link from "next/link"
import { motion, MotionConfig } from "motion/react"

import { Container } from "@/components/brand/container"
import { LightLeakCanvas } from "@/components/brand/light-leak-canvas"
import { MediaSlot } from "@/components/brand/media-slot"
import { HOME } from "@/content/home"
import { useReducedMotionSafe } from "@/lib/use-reduced-motion-safe"

/** Curva ease-out compartida por toda la intro. */
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

/**
 * Líneas lógicas del H1 para el stagger de entrada.
 * Unidas con espacios deben reconstruir HOME.hero.title verbatim
 * (el lector de pantalla recibe el titular completo vía aria-label).
 * La última línea — la frase que resume el servicio — va en cursiva y azul.
 */
const TITLE_LINES = ["Llevamos la IA", "de la promesa", "a la operación."] as const
const ACCENT_LINE_INDEX = 2

/**
 * Hero: capítulo oscuro puramente tipográfico. El titular en Bitter 500 carga
 * la página — sin molécula 3D ni adornos — y el espacio reservado del video de
 * visión lo ancla, como el material real que tendrá que ocupar ese lugar.
 * La intro orquestada corre solo en la primera carga (≤1s); aparte del light
 * leak ambiental del fondo, es la única animación no disparada por el usuario
 * en toda la página.
 */
function Hero() {
  const reduce = useReducedMotionSafe()

  const fadeUp = (delay: number, y = 14) => ({
    "data-hero-intro": "",
    initial: reduce ? false : { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: reduce ? { duration: 0 } : { duration: 0.5, delay, ease: EASE },
  })

  const onSecondaryClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const target = document.querySelector(HOME.hero.ctaSecondary.href)
    if (!target) return
    event.preventDefault()
    target.scrollIntoView({ behavior: reduce ? "auto" : "smooth" })
  }

  return (
    <MotionConfig reducedMotion="user">
      <section className="chapter-dark bg-brand-midnight-deep relative overflow-hidden bg-none">
        {/* Light leak de película; sin JS queda el piso midnight-deep de la sección. */}
        <div aria-hidden className="absolute inset-0">
          <LightLeakCanvas
            className="size-full"
            intensity={0.55}
            grain={0.3}
            speed={0.7}
            leaks={2}
            quality={0.6}
          />
        </div>

        <Container className="relative z-10 pt-36 pb-16 md:pt-44 md:pb-20">
          {/* TODO(wonderlabs): titular opción A — confirmar con Samu (opciones B y C en el borrador §2.1) */}
          <h1
            aria-label={HOME.hero.title}
            className="font-display text-brand-smoke max-w-[16ch] text-[clamp(2.75rem,6.5vw,5.25rem)] leading-[1.06] font-medium"
          >
            {TITLE_LINES.map((line, index) => (
              <motion.span
                key={line}
                aria-hidden
                className={index === ACCENT_LINE_INDEX ? "text-brand-blue block italic" : "block"}
                {...fadeUp(0.08 + index * 0.09)}
              >
                {line}
              </motion.span>
            ))}
          </h1>

          <motion.p
            className="text-muted-foreground mt-8 max-w-[52ch] text-lg leading-relaxed md:text-xl"
            {...fadeUp(0.4, 10)}
          >
            {HOME.hero.subtitle}
          </motion.p>

          <motion.div
            className="mt-10 flex w-full flex-col gap-3 md:w-auto md:flex-row md:items-center md:gap-4"
            {...fadeUp(0.5, 10)}
          >
            <Link
              href={HOME.hero.ctaPrimary.href}
              className="bg-brand-tangerine text-brand-midnight-deep inline-flex min-h-12 items-center justify-center rounded-full px-7 py-2.5 text-base font-semibold transition-colors duration-200 ease-out hover:bg-[color-mix(in_srgb,var(--brand-tangerine)_92%,black)]"
            >
              {HOME.hero.ctaPrimary.label}
            </Link>
            <a
              href={HOME.hero.ctaSecondary.href}
              onClick={onSecondaryClick}
              className="text-brand-smoke inline-flex min-h-12 items-center justify-center rounded-full border border-white/25 px-7 py-2.5 text-base font-semibold transition-colors duration-200 ease-out hover:border-white/40 hover:bg-white/10"
            >
              {HOME.hero.ctaSecondary.label}
            </a>
          </motion.div>

          {/* El material real que anclará la página: el video de visión. */}
          <motion.div className="mt-16 md:mt-20" {...fadeUp(0.62, 12)}>
            <MediaSlot
              label={HOME.media.video.label}
              kind="video"
              aspect={HOME.media.video.aspect}
              tone="dark"
            />
          </motion.div>
        </Container>
      </section>
    </MotionConfig>
  )
}

export { Hero }
