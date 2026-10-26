import Link from "next/link"

import { Container } from "@/components/brand/container"
import { Section } from "@/components/brand/section"
import { SERVICIOS } from "@/content/servicios"

/**
 * Banda de cierre de /servicios: mismo registro quieto que el CtaFinal de la
 * home — serif medium alineado a la izquierda, un solo botón tangerine, sin
 * glow ni flechas.
 */
function ServiciosCtaFinal() {
  return (
    <Section tone="dark">
      <Container>
        <div className="max-w-[760px]">
          <h2 className="font-display text-[clamp(2.25rem,4.6vw,3.5rem)] leading-[1.1] font-medium">
            {SERVICIOS.ctaFinal.title}
          </h2>
          <p className="text-muted-foreground mt-6 max-w-[56ch] text-lg md:text-xl">
            {SERVICIOS.ctaFinal.text}
          </p>

          <div className="mt-10">
            <Link
              href={SERVICIOS.ctaFinal.cta.href}
              className="bg-brand-tangerine text-brand-midnight-deep inline-flex h-14 items-center justify-center rounded-full px-9 text-base font-semibold transition-colors duration-200 ease-out hover:bg-[color-mix(in_srgb,var(--brand-tangerine)_92%,black)]"
            >
              {SERVICIOS.ctaFinal.cta.label}
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  )
}

export { ServiciosCtaFinal }
