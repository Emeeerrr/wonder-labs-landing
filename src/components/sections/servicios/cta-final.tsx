import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

import { Container } from "@/components/brand/container"
import { Reveal } from "@/components/brand/reveal"
import { Section } from "@/components/brand/section"
import { SERVICIOS } from "@/content/servicios"

/**
 * Banda de cierre de /servicios: mismo patrón que `CtaFinal` de la home
 * (capítulo oscuro, glow radial blue→midnight) pero sin extraer una
 * abstracción compartida — el copy difiere lo suficiente (título = label del
 * CTA, texto propio) para que forzar un componente común no ahorre nada.
 */
function ServiciosCtaFinal() {
  return (
    <Section tone="dark" className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(closest-side at 50% 42%, color-mix(in srgb, var(--brand-blue) 38%, var(--brand-midnight)) 0%, var(--brand-midnight) 55%, transparent 76%), radial-gradient(ellipse at center, transparent 40%, var(--brand-midnight-deep) 100%)",
        }}
      />

      <Container className="relative z-10 flex flex-col items-center text-center">
        <Reveal className="max-w-[700px]">
          <h2 className="font-display text-[clamp(2.25rem,5vw,3.5rem)] font-extrabold tracking-tight">
            {SERVICIOS.ctaFinal.title}
          </h2>
          <p className="text-muted-foreground mx-auto mt-6 max-w-[56ch] text-lg md:text-xl">
            {SERVICIOS.ctaFinal.text}
          </p>

          <div className="mt-10 flex justify-center">
            <Link
              href={SERVICIOS.ctaFinal.cta.href}
              className="group bg-brand-tangerine text-brand-midnight-deep inline-flex h-14 items-center justify-center gap-2 rounded-full px-9 text-base font-semibold transition-colors duration-200 ease-out hover:bg-[color-mix(in_srgb,var(--brand-tangerine)_92%,black)]"
            >
              {SERVICIOS.ctaFinal.cta.label}
              <ArrowRightIcon className="size-4 shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}

export { ServiciosCtaFinal }
