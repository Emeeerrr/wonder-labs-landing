import Link from "next/link"

import { Container } from "@/components/brand/container"
import { Eyebrow } from "@/components/brand/eyebrow"
import { Section } from "@/components/brand/section"
import { HOME } from "@/content/home"

/**
 * La ruta: abre el acto claro como una tabla de documento. Las cuatro etapas
 * son una secuencia real de trabajo, así que la numeración es información,
 * no decoración: número mono pequeño, título en serif y descripción, fila a
 * fila sobre filetes Timberwolf. Sin orbes, sin línea de progreso animada.
 */
function Ruta() {
  return (
    <Section id="ruta" tone="light" className="scroll-mt-20">
      <Container>
        <Eyebrow>{HOME.ruta.eyebrow}</Eyebrow>
        <h2 className="font-display mt-4 max-w-[26ch] text-[clamp(2rem,4.2vw,3.25rem)] leading-[1.12] font-medium">
          {HOME.ruta.title}
        </h2>

        <ol className="mt-14 border-t border-[var(--brand-timberwolf)]">
          {HOME.ruta.stages.map((stage) => (
            <li
              key={stage.number}
              className="grid grid-cols-[3.5rem_1fr] gap-x-4 gap-y-1 border-b border-[var(--brand-timberwolf)] py-7 md:grid-cols-[6rem_minmax(0,16rem)_1fr] md:gap-x-8 md:py-9"
            >
              <span className="text-muted-foreground pt-1.5 font-mono text-sm tabular-nums">
                {stage.number}
              </span>
              <h3 className="font-display text-2xl font-medium">{stage.title}</h3>
              <p className="text-muted-foreground col-start-2 max-w-[52ch] text-base leading-relaxed md:col-start-3 md:pt-1">
                {stage.text}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-10 max-w-[56ch]">
          <p className="text-muted-foreground text-base leading-relaxed">{HOME.ruta.note}</p>
          <Link
            href={HOME.ruta.cta.href}
            className="text-brand-midnight decoration-brand-blue hover:text-brand-blue mt-5 inline-flex min-h-11 items-center text-base font-semibold underline decoration-2 underline-offset-4 transition-colors duration-200 ease-out"
          >
            {HOME.ruta.cta.label}
          </Link>
        </div>
      </Container>
    </Section>
  )
}

export { Ruta }
