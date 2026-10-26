import Link from "next/link"

import { Container } from "@/components/brand/container"
import { Eyebrow } from "@/components/brand/eyebrow"
import { Section } from "@/components/brand/section"
import { HOME } from "@/content/home"

/**
 * CTA final: tercer acto, oscuro y quieto. Titular en serif, el texto de la
 * reunión inicial y un solo botón tangerine — sin glow radial ni adornos:
 * el cierre baja la voz en lugar de subirla.
 */
function CtaFinal() {
  return (
    <Section tone="dark">
      <Container>
        <div className="max-w-[760px]">
          <Eyebrow>{HOME.ctaFinal.eyebrow}</Eyebrow>
          <h2 className="font-display mt-4 text-[clamp(2.25rem,4.6vw,3.5rem)] leading-[1.1] font-medium">
            {HOME.ctaFinal.title}
          </h2>
          <p className="text-muted-foreground mt-6 max-w-[56ch] text-lg md:text-xl">
            {HOME.ctaFinal.text}
          </p>

          <div className="mt-10">
            <Link
              href={HOME.ctaFinal.cta.href}
              className="bg-brand-tangerine text-brand-midnight-deep inline-flex h-14 items-center justify-center rounded-full px-9 text-base font-semibold transition-colors duration-200 ease-out hover:bg-[color-mix(in_srgb,var(--brand-tangerine)_92%,black)]"
            >
              {HOME.ctaFinal.cta.label}
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  )
}

export { CtaFinal }
