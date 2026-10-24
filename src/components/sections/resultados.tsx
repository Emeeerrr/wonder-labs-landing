import { Clock3, FileCheck2, Library, ShieldCheck } from "lucide-react"

import { Container } from "@/components/brand/container"
import { Eyebrow } from "@/components/brand/eyebrow"
import { Reveal } from "@/components/brand/reveal"
import { Section } from "@/components/brand/section"
import { HOME } from "@/content/home"

/** Un icono lucide fijo por beneficio, en el mismo orden que `HOME.resultados.benefits`. */
const BENEFIT_ICONS = [Clock3, Library, FileCheck2, ShieldCheck] as const

/**
 * Resultados: capítulo claro con grid 2×2 (1 col en mobile) de tarjetas sin
 * borde — solo fondo blanco y sombra sutil — con chips de icono más livianos
 * que los de El reto, para distinguir "beneficio" de "problema".
 */
function Resultados() {
  return (
    <Section tone="light">
      <Container>
        <Reveal>
          <Eyebrow>{HOME.resultados.eyebrow}</Eyebrow>
          <h2 className="font-display mt-4 max-w-[22ch] text-[clamp(2rem,4vw,3rem)] font-extrabold tracking-tight">
            {HOME.resultados.title}
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
          {HOME.resultados.benefits.map((benefit, index) => {
            const Icon = BENEFIT_ICONS[index]
            return (
              <Reveal key={benefit.title} delay={index * 0.06}>
                <article className="h-full rounded-2xl bg-white p-7 shadow-xs transition-transform duration-200 ease-out hover:-translate-y-0.5">
                  <div className="bg-brand-blue/5 inline-flex size-11 items-center justify-center rounded-full">
                    <Icon aria-hidden className="text-brand-blue size-5" />
                  </div>
                  <h3 className="font-display mt-5 text-xl font-bold">{benefit.title}</h3>
                  <p className="text-muted-foreground mt-2 max-w-[42ch] text-base leading-relaxed">
                    {benefit.text}
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

export { Resultados }
