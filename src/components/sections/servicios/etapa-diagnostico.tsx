import { FileSearch, Map, TrendingUp } from "lucide-react"

import { Container } from "@/components/brand/container"
import { Eyebrow } from "@/components/brand/eyebrow"
import { Reveal } from "@/components/brand/reveal"
import { Section } from "@/components/brand/section"
import { SERVICIOS } from "@/content/servicios"

/** Un icono lucide fijo por entregable, en el mismo orden que `entregables`. */
const ENTREGABLE_ICONS = [TrendingUp, Map, FileSearch] as const

/**
 * Etapa 01 · Diagnóstico: capítulo claro. Dos tarjetas (reunión inicial +
 * diagnóstico de madurez) con el número de etapa en mono Blue Green, eco de
 * la numeración 01–04 de la home (`ruta.tsx`), seguidas de la lista de
 * entregables.
 */
function EtapaDiagnostico() {
  const { diagnostico } = SERVICIOS

  return (
    <Section id="diagnostico" tone="light" className="scroll-mt-32 md:scroll-mt-36">
      <Container>
        <Reveal>
          <Eyebrow>{diagnostico.eyebrow}</Eyebrow>
          <h2 className="font-display mt-4 max-w-[26ch] text-[clamp(2rem,4vw,3rem)] leading-[1.12] font-medium">
            {diagnostico.title}
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
          {diagnostico.cards.map((card, index) => (
            <Reveal key={card.title} delay={index * 0.06}>
              <article className="h-full rounded-2xl border border-[var(--brand-timberwolf)] bg-white p-7">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="font-display text-xl font-medium">{card.title}</h3>
                  {/*
                   * "Tangerine suave": única excepción deliberada a la regla
                   * "tangerine solo en CTAs" — señal de precio/acción con
                   * relleno al 10% y texto oscurecido un 30% (en vez del
                   * tangerine puro, que da 2.7:1 sobre blanco) para alcanzar
                   * ~4.9:1 y cumplir AA en texto pequeño.
                   */}
                  <span
                    className="bg-brand-tangerine/10 inline-flex h-6 items-center rounded-full px-3 text-xs font-semibold"
                    style={{ color: "color-mix(in srgb, var(--brand-tangerine) 70%, black)" }}
                  >
                    {card.badge}
                  </span>
                </div>
                <p className="text-muted-foreground mt-4 max-w-[46ch] text-base leading-relaxed">
                  {card.text}
                </p>
                {"result" in card ? (
                  <p className="mt-4 text-base leading-relaxed">
                    <span className="font-semibold">{card.resultLabel}:</span> {card.result}
                  </p>
                ) : null}
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.12} className="mt-12">
          <h3 className="font-display text-xl font-medium">{diagnostico.entregablesTitle}</h3>
          <ul className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            {diagnostico.entregables.map((item, index) => {
              const Icon = ENTREGABLE_ICONS[index]
              return (
                <li key={item} className="flex items-start gap-3">
                  <span className="bg-brand-blue/10 mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-full">
                    <Icon aria-hidden className="text-brand-blue size-4.5" />
                  </span>
                  <span className="text-base leading-relaxed">{item}</span>
                </li>
              )
            })}
          </ul>
        </Reveal>

        {/* TODO(wonderlabs): precio del diagnóstico de madurez pendiente de confirmar (doc §4.1) */}
      </Container>
    </Section>
  )
}

export { EtapaDiagnostico }
