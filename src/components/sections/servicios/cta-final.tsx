import Link from "next/link"

import { Container } from "@/components/brand/container"
import { LightLeakCanvas } from "@/components/brand/light-leak-canvas"
import { Section } from "@/components/brand/section"
import { SERVICIOS } from "@/content/servicios"

/**
 * Banda de cierre de /servicios: misma familia que el CtaFinal de la home —
 * serif medium alineado a la izquierda, un solo botón tangerine, light leak
 * ambiental detrás y sin flechas.
 */
function ServiciosCtaFinal() {
  return (
    <Section tone="dark" className="relative overflow-hidden">
      {/* Light leak de película; sin JS queda el degradé chapter-dark de la sección. */}
      <div aria-hidden className="absolute inset-0">
        <LightLeakCanvas
          className="size-full"
          intensity={0.8}
          grain={0.3}
          speed={0.6}
          leaks={2}
          quality={0.6}
        />
      </div>

      <Container className="relative z-10">
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
