import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

import { Container } from "@/components/brand/container"
import { Eyebrow } from "@/components/brand/eyebrow"
import { Reveal } from "@/components/brand/reveal"
import { Section } from "@/components/brand/section"
import { HOME } from "@/content/home"

/**
 * CTA final: capítulo oscuro, cierre de la página. El glow radial de la
 * molécula reaparece como degradé estático (sin canvas), desplazado a la
 * derecha como en el hero; el contenido va alineado a la izquierda, no
 * centrado, para cerrar con el mismo registro editorial del resto.
 */
function CtaFinal() {
  return (
    <Section tone="dark" className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(closest-side at 72% 38%, color-mix(in srgb, var(--brand-blue) 38%, var(--brand-midnight)) 0%, var(--brand-midnight) 55%, transparent 76%), radial-gradient(ellipse at center, transparent 40%, var(--brand-midnight-deep) 100%)",
        }}
      />

      <Container className="relative z-10">
        <Reveal className="max-w-[760px]">
          <Eyebrow>{HOME.ctaFinal.eyebrow}</Eyebrow>
          <h2 className="font-display mt-4 text-[clamp(2.25rem,5vw,3.5rem)] font-extrabold tracking-tight">
            {HOME.ctaFinal.title}
          </h2>
          <p className="text-muted-foreground mt-6 max-w-[56ch] text-lg md:text-xl">
            {HOME.ctaFinal.text}
          </p>

          <div className="mt-10">
            <Link
              href={HOME.ctaFinal.cta.href}
              className="group bg-brand-tangerine text-brand-midnight-deep inline-flex h-14 items-center justify-center gap-2 rounded-full px-9 text-base font-semibold transition-colors duration-200 ease-out hover:bg-[color-mix(in_srgb,var(--brand-tangerine)_92%,black)]"
            >
              {HOME.ctaFinal.cta.label}
              <ArrowRightIcon className="size-4 shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}

export { CtaFinal }
