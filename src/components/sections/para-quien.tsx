import Link from "next/link"

import { Container } from "@/components/brand/container"
import { Eyebrow } from "@/components/brand/eyebrow"
import { Section } from "@/components/brand/section"
import { HOME } from "@/content/home"

/**
 * Para quién: dos columnas de texto plano bajo un mismo titular, separadas
 * solo por el filete superior — sin tarjetas, sin pills, sin panel oscuro.
 * Las dos audiencias se leen a la par, como en un documento.
 */
function ParaQuien() {
  return (
    <Section tone="light" className="pt-0">
      <Container>
        <Eyebrow>{HOME.paraQuien.eyebrow}</Eyebrow>
        <h2 className="font-display mt-4 max-w-[24ch] text-[clamp(2rem,4.2vw,3.25rem)] leading-[1.12] font-medium">
          {HOME.paraQuien.title}
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-14">
          {HOME.paraQuien.panels.map((panel) => {
            const cta = "cta" in panel ? panel.cta : undefined
            return (
              <article key={panel.title} className="border-t border-[var(--brand-timberwolf)] pt-7">
                <h3 className="font-display text-2xl font-medium">{panel.title}</h3>
                <p className="text-muted-foreground mt-3 max-w-[52ch] text-base leading-relaxed">
                  {panel.text}
                </p>
                {cta ? (
                  <Link
                    href={cta.href}
                    className="text-brand-midnight decoration-brand-blue hover:text-brand-blue mt-6 inline-flex min-h-11 items-center text-base font-semibold underline decoration-2 underline-offset-4 transition-colors duration-200 ease-out"
                  >
                    {cta.label}
                  </Link>
                ) : null}
              </article>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}

export { ParaQuien }
