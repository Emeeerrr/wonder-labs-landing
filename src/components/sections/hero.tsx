"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowDownIcon, ArrowRightIcon } from "lucide-react"
import { motion, MotionConfig } from "motion/react"

import { Container } from "@/components/brand/container"
import { Eyebrow } from "@/components/brand/eyebrow"
import { MoleculeCanvas } from "@/components/three/molecule-canvas"
import { HOME } from "@/content/home"
import { useReducedMotionSafe } from "@/lib/use-reduced-motion-safe"

/** Curva ease-out compartida por toda la intro. */
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

/**
 * Líneas lógicas del H1 para el stagger de entrada.
 * Unidas con espacios deben reconstruir HOME.hero.title verbatim
 * (el lector de pantalla recibe el titular completo vía aria-label).
 */
const TITLE_LINES = ["Llevamos la IA", "de la promesa", "a la operación."] as const

/** Única palabra con énfasis: degradé blue→blue-light con text-clip. */
const ACCENT_WORD = "operación"

/** Grano sutil (feTurbulence inline, ≤3% de opacidad sobre el degradé). */
const NOISE_TEXTURE = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`

function renderTitleLine(line: string) {
  const index = line.indexOf(ACCENT_WORD)
  if (index === -1) return line
  return (
    <>
      {line.slice(0, index)}
      <span className="from-brand-blue bg-linear-to-r to-[#7cd4f2] bg-clip-text text-transparent">
        {ACCENT_WORD}
      </span>
      {line.slice(index + ACCENT_WORD.length)}
    </>
  )
}

/**
 * Hero: capítulo oscuro a viewport completo con la molécula 3D viva detrás.
 * La intro orquestada corre solo en la primera carga (eyebrow → H1 → bajada →
 * CTAs → molécula, ≤1.2s); con reduced-motion se pinta el estado final.
 */
function Hero() {
  /*
   * Boolean normalizado y seguro para hidratación (ver useReducedMotionSafe).
   * El primer paint queda además cubierto por <MotionConfig reducedMotion="user">,
   * que desactiva las animaciones de transform a nivel de motion-dom
   * (los fades de opacidad pueden permanecer — los disparadores vestibulares
   * son transforms/parallax).
   */
  const reduce = useReducedMotionSafe()

  const fadeUp = (delay: number, y = 16) => ({
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
      <section className="chapter-dark relative flex min-h-dvh flex-col overflow-hidden bg-[linear-gradient(160deg,var(--brand-midnight-deep),var(--brand-midnight))]">
        {/* Grano sutil sobre el degradé */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: NOISE_TEXTURE }}
        />

        {/* Molécula: a la derecha en desktop; detrás del texto, atenuada, en mobile */}
        <motion.div
          aria-hidden
          data-hero-intro=""
          className="pointer-events-none absolute inset-0"
          initial={reduce ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={reduce ? { duration: 0 } : { duration: 0.7, delay: 0.25, ease: EASE }}
        >
          <div className="absolute inset-x-[-12%] top-1/2 h-[62dvh] -translate-y-1/2 opacity-55 lg:inset-x-auto lg:inset-y-0 lg:right-[-6vw] lg:h-auto lg:w-[56vw] lg:translate-y-0 lg:opacity-100">
            <MoleculeCanvas />
          </div>
        </motion.div>

        <Container className="relative z-10 grid flex-1 grid-cols-12 items-center pt-28 pb-24 md:pt-32">
          <div className="col-span-12 lg:col-span-7">
            <motion.div
              data-hero-intro=""
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={reduce ? { duration: 0 } : { duration: 0.3, ease: "easeOut" }}
            >
              <Eyebrow>{HOME.hero.eyebrow}</Eyebrow>
            </motion.div>

            {/* TODO(wonderlabs): titular opción A — confirmar con Samu (opciones B y C en el borrador §2.1) */}
            <h1
              aria-label={HOME.hero.title}
              className="font-display text-brand-smoke mt-6 text-[clamp(2.75rem,7vw,5.5rem)] leading-[1.02] font-extrabold tracking-tight"
            >
              {TITLE_LINES.map((line, index) => (
                <motion.span
                  key={line}
                  aria-hidden
                  className="block"
                  {...fadeUp(0.1 + index * 0.08)}
                >
                  {renderTitleLine(line)}
                </motion.span>
              ))}
            </h1>

            <motion.p
              className="text-muted-foreground mt-6 max-w-[52ch] text-lg md:text-xl"
              {...fadeUp(0.42, 12)}
            >
              {HOME.hero.subtitle}
            </motion.p>

            <motion.div
              className="mt-10 flex w-full flex-col gap-3 md:w-auto md:flex-row md:items-center md:gap-4"
              {...fadeUp(0.52, 12)}
            >
              <Link
                href={HOME.hero.ctaPrimary.href}
                className="group bg-brand-tangerine text-brand-midnight-deep inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-7 py-2.5 text-base font-semibold transition-colors duration-200 ease-out hover:bg-[color-mix(in_srgb,var(--brand-tangerine)_92%,black)]"
              >
                {HOME.hero.ctaPrimary.label}
                <ArrowRightIcon className="size-4 shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-1" />
              </Link>
              <a
                href={HOME.hero.ctaSecondary.href}
                onClick={onSecondaryClick}
                className="group text-brand-smoke inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/25 px-7 py-2.5 text-base font-semibold transition-colors duration-200 ease-out hover:border-white/40 hover:bg-white/10"
              >
                {HOME.hero.ctaSecondary.label}
                <ArrowDownIcon className="size-4 shrink-0 transition-transform duration-200 ease-out group-hover:translate-y-1" />
              </a>
            </motion.div>
          </div>
        </Container>

        {/*
         * Indicador de scroll: línea vertical que pulsa. Siempre se renderiza
         * (misma estructura en servidor y cliente); con reduced-motion lo oculta
         * CSS (`motion-reduce:hidden`), que aplica antes de la hidratación.
         */}
        <motion.div
          aria-hidden
          className="absolute bottom-6 left-1/2 -translate-x-1/2 motion-reduce:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={reduce ? { duration: 0 } : { duration: 0.3, delay: 0.9, ease: "easeOut" }}
        >
          <motion.span
            className="from-brand-smoke/70 block h-10 w-px origin-top bg-linear-to-b to-transparent"
            animate={
              reduce
                ? { scaleY: 1, opacity: 0.4 }
                : { scaleY: [0.25, 1, 0.25], opacity: [0.4, 1, 0.4] }
            }
            transition={
              reduce ? { duration: 0 } : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
            }
          />
        </motion.div>
      </section>
    </MotionConfig>
  )
}

export { Hero }
