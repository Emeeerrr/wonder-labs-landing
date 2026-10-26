import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

import { Container } from "@/components/brand/container"
import { Eyebrow } from "@/components/brand/eyebrow"
import { Reveal } from "@/components/brand/reveal"
import { Section } from "@/components/brand/section"
import { HOME } from "@/content/home"
import { cn } from "@/lib/utils"

/**
 * Para quién: capítulo claro con dos paneles en contraste de pareja B2B/B2G —
 * Empresas en blanco, Sector público en midnight — para que cada audiencia se
 * reconozca de un vistazo. El kicker mono (B2B/B2G) reemplaza al icono: dice
 * más con menos.
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
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full border px-3 py-1 font-mono text-[11px] tracking-[0.18em] uppercase",
                      isPublicSector
                        ? "text-brand-smoke/80 border-white/25"
                        : "text-brand-ink/70 border-[var(--brand-timberwolf)]"
                    )}
                  >
                    {panel.kicker}
                  </span>
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
