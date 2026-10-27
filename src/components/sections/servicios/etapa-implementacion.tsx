import { Check } from "lucide-react"

import { Container } from "@/components/brand/container"
import { Eyebrow } from "@/components/brand/eyebrow"
import { Reveal } from "@/components/brand/reveal"
import { Section } from "@/components/brand/section"
import { SERVICIOS } from "@/content/servicios"

/**
 * Etapa 03 · Implementación: capítulo claro. Tres frentes (espacio de
 * trabajo, agentes, gobernanza) con lista "Incluye", seguidos de una
 * mini-timeline horizontal de 4 fases ("Cómo implementamos") y la nota de
 * duración.
 */
function EtapaImplementacion() {
  const { implementacion } = SERVICIOS

  return (
    <Section id="implementacion" tone="light" className="scroll-mt-32 md:scroll-mt-36">
      <Container>
        <Reveal>
          <Eyebrow>{implementacion.eyebrow}</Eyebrow>
          <h2 className="font-display mt-4 max-w-[26ch] text-[clamp(2rem,4vw,3rem)] leading-[1.12] font-medium">
            {implementacion.title}
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
          {implementacion.frentes.map((frente, index) => (
            <Reveal key={frente.title} delay={index * 0.06}>
              <article className="h-full rounded-2xl border border-[var(--brand-timberwolf)] bg-white p-7">
                <h3 className="font-display text-xl font-medium">{frente.title}</h3>
                <p className="text-muted-foreground mt-1 text-xs font-semibold">{frente.sub}</p>
                <p className="mt-4 text-base leading-relaxed">{frente.text}</p>

                <h4 className="text-muted-foreground mt-6 text-xs font-semibold">
                  {frente.incluyeTitle}
                </h4>
                <ul className="mt-4 flex flex-col gap-3">
                  {frente.incluye.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <Check aria-hidden className="text-brand-blue mt-1 size-4 shrink-0" />
                      <span className="text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Cómo implementamos — mini-timeline horizontal de 4 fases */}
        <Reveal delay={0.1} className="mt-16 border-t border-[var(--brand-timberwolf)] pt-12">
          <h3 className="font-display text-2xl font-medium">{implementacion.fases.title}</h3>
          <p className="text-muted-foreground mt-2 text-base">{implementacion.fases.subtitle}</p>

          <ol className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-4 md:gap-6">
            {implementacion.fases.items.map((fase, index) => (
              <li key={fase.title} className="relative">
                <div className="flex items-center gap-3 md:flex-col md:items-start md:gap-0">
                  <span className="text-brand-blue font-mono text-sm font-semibold tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    aria-hidden
                    className="hidden h-px flex-1 bg-[var(--brand-timberwolf)] md:mt-3 md:mb-4 md:block"
                  />
                </div>
                <h4 className="font-display mt-2 text-lg font-medium md:mt-0">{fase.title}</h4>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{fase.text}</p>
              </li>
            ))}
          </ol>

          <p className="text-muted-foreground mt-10 max-w-[64ch] text-sm leading-relaxed">
            {implementacion.fases.nota}
          </p>
        </Reveal>
      </Container>
    </Section>
  )
}

export { EtapaImplementacion }
