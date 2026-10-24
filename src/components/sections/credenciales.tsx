"use client"

import * as React from "react"
import { Check } from "lucide-react"
import { animate, useInView } from "motion/react"

import { Container } from "@/components/brand/container"
import { Eyebrow } from "@/components/brand/eyebrow"
import { Reveal } from "@/components/brand/reveal"
import { Section } from "@/components/brand/section"
import { HOME } from "@/content/home"
import { useReducedMotionSafe } from "@/lib/use-reduced-motion-safe"

/**
 * Cifra con count-up al entrar en viewport. El nodo de texto arranca ya en el
 * valor final (coincide con SSR) y el efecto, solo en cliente, anima desde 0
 * cuando `inView` se activa; con reduced-motion se salta la animación y deja
 * el valor final directo. `tabular-nums` fija el ancho de los dígitos para
 * que el conteo no produzca layout shift.
 */
function CountUpStat({ value, prefix }: { value: number; prefix: string }) {
  const ref = React.useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  const reduce = useReducedMotionSafe()

  React.useEffect(() => {
    const node = ref.current
    if (!node || !inView || reduce) return

    const controls = animate(0, value, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => {
        node.textContent = `${prefix}${Math.round(latest)}`
      },
    })

    return () => controls.stop()
  }, [inView, reduce, value, prefix])

  // Calculate final string length to reserve width (prevent layout shift during count-up)
  const finalString = `${prefix}${value}`
  const minWidth = `${finalString.length}ch`

  return (
    <span
      ref={ref}
      className="font-display inline-block text-left text-[clamp(3rem,6vw,4rem)] font-extrabold tabular-nums"
      style={{ minWidth }}
    >
      {prefix}
      {value}
    </span>
  )
}

/**
 * Credenciales: capítulo claro en formato banda (fondo blanco, bordes y
 * divisores timberwolf) con layout asimétrico — cifras apiladas a la
 * izquierda con count-up sutil, checklist a la derecha.
 */
function Credenciales() {
  return (
    <Section tone="light">
      <Container>
        <Reveal>
          {/*
           * Único título de sección sin h2 visible (el diseño apoya el peso
           * visual en las cifras, no en un titular): se añade un h2 sr-only
           * para no romper la jerarquía de encabezados (h3 más abajo).
           */}
          <h2 className="sr-only">{HOME.credenciales.eyebrow}</h2>
          <Eyebrow aria-hidden>{HOME.credenciales.eyebrow}</Eyebrow>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 overflow-hidden rounded-3xl border border-[var(--brand-timberwolf)] bg-white md:grid-cols-2">
          <div className="divide-y divide-[var(--brand-timberwolf)] md:border-r md:border-[var(--brand-timberwolf)]">
            {HOME.credenciales.stats.map((stat, index) => (
              <Reveal key={stat.label} delay={index * 0.06} className="p-8 md:p-10">
                <CountUpStat value={stat.value} prefix={stat.prefix} />
                <p className="text-muted-foreground mt-3 max-w-[38ch] text-base leading-relaxed">
                  {stat.label}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1} className="p-8 md:p-10">
            <h3 className="font-display text-xl font-bold">{HOME.credenciales.listIntro}</h3>
            <ul className="mt-6 flex flex-col gap-4">
              {HOME.credenciales.list.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="bg-brand-blue/10 mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full">
                    <Check aria-hidden className="text-brand-blue size-3.5" />
                  </span>
                  <span className="text-base leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* TODO(wonderlabs): validar certificaciones, cursos y asesoría antes de publicar (doc §2.5); logos de clientes pendientes de autorización */}
      </Container>
    </Section>
  )
}

export { Credenciales }
