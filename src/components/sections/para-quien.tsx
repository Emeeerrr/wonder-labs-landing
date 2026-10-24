import Link from "next/link"
import { ArrowRightIcon, Building2, Landmark } from "lucide-react"

import { Container } from "@/components/brand/container"
import { Eyebrow } from "@/components/brand/eyebrow"
import { Reveal } from "@/components/brand/reveal"
import { Section } from "@/components/brand/section"
import { HOME } from "@/content/home"

/** Un icono lucide fijo por panel, en el mismo orden que `HOME.paraQuien.panels`. */
const PANEL_ICONS = [Building2, Landmark] as const

/**
 * Para quién: capítulo claro con dos paneles asimétricos en contraste de
 * pareja B2B/B2G — Empresas en blanco, Sector público en midnight — para que
 * cada audiencia se reconozca de un vistazo.
 */
function ParaQuien() {
  return (
    <Section tone="light">
      <Container>
        <Reveal>
          <Eyebrow>{HOME.paraQuien.eyebrow}</Eyebrow>
          <h2 className="font-display mt-4 max-w-[24ch] text-[clamp(2rem,4vw,3rem)] font-extrabold tracking-tight">
            {HOME.paraQuien.title}
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-12">
          {HOME.paraQuien.panels.map((panel, index) => {
            const Icon = PANEL_ICONS[index]
            const isPublicSector = index === 1
            const cta = "cta" in panel ? panel.cta : undefined

            return (
              <Reveal key={panel.title} delay={index * 0.06} className="md:col-span-6">
                <article
                  className={
                    isPublicSector
                      ? "chapter-dark h-full rounded-3xl p-10"
                      : "h-full rounded-2xl border border-[var(--brand-timberwolf)] bg-white p-10"
                  }
                >
                  <div className="bg-brand-blue/15 inline-flex size-12 items-center justify-center rounded-full">
                    <Icon aria-hidden className="text-brand-blue size-6" />
                  </div>
                  <h3 className="font-display mt-6 text-2xl font-bold">{panel.title}</h3>
                  <p className="text-muted-foreground mt-3 max-w-[48ch] text-base leading-relaxed">
                    {panel.text}
                  </p>
                  {cta ? (
                    <Link
                      href={cta.href}
                      className="group text-brand-blue mt-6 inline-flex min-h-11 items-center gap-2 text-base font-semibold transition-colors duration-200 ease-out hover:text-[color-mix(in_srgb,var(--brand-blue)_80%,white)]"
                    >
                      {cta.label}
                      <ArrowRightIcon className="size-4 shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-1" />
                    </Link>
                  ) : null}
                </article>
              </Reveal>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}

export { ParaQuien }
