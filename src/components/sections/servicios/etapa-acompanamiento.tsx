import { CalendarCheck, LineChart, Lightbulb, LifeBuoy, Users } from "lucide-react"

import { Container } from "@/components/brand/container"
import { Eyebrow } from "@/components/brand/eyebrow"
import { Reveal } from "@/components/brand/reveal"
import { Section } from "@/components/brand/section"
import { SERVICIOS } from "@/content/servicios"

/** Un icono lucide fijo por item, en el mismo orden que `acompanamiento.items`. */
const ITEM_ICONS = [CalendarCheck, Lightbulb, LifeBuoy, LineChart, Users] as const

/**
 * Etapa 04 · Acompañamiento: capítulo claro, cierre de la ruta de cuatro
 * etapas. Intro + 5 items con icono, en el mismo grid 2 columnas que
 * Resultados/Reto en la home para mantener el ritmo visual del sitio.
 */
function EtapaAcompanamiento() {
  const { acompanamiento } = SERVICIOS

  return (
    <Section id="acompanamiento" tone="light" className="scroll-mt-32 md:scroll-mt-36">
      <Container>
        <Reveal>
          <span className="text-brand-blue font-mono text-2xl font-semibold tabular-nums md:text-3xl">
            {acompanamiento.number}
          </span>
          <Eyebrow className="mt-3">{acompanamiento.eyebrow}</Eyebrow>
          <h2 className="font-display mt-4 max-w-[26ch] text-[clamp(2rem,4vw,3rem)] font-extrabold tracking-tight">
            {acompanamiento.title}
          </h2>
          <p className="text-muted-foreground mt-6 max-w-[62ch] text-lg md:text-xl">
            {acompanamiento.intro}
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
          {acompanamiento.items.map((item, index) => {
            const Icon = ITEM_ICONS[index]
            return (
              <Reveal key={item.title} delay={index * 0.06}>
                <article className="h-full rounded-2xl bg-white p-7 shadow-xs transition-transform duration-200 ease-out hover:-translate-y-0.5">
                  <div className="bg-brand-blue/5 inline-flex size-11 items-center justify-center rounded-full">
                    <Icon aria-hidden className="text-brand-blue size-5" />
                  </div>
                  <h3 className="font-display mt-5 text-xl font-bold">{item.title}</h3>
                  <p className="text-muted-foreground mt-2 max-w-[42ch] text-base leading-relaxed">
                    {item.text}
                  </p>
                </article>
              </Reveal>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}

export { EtapaAcompanamiento }
