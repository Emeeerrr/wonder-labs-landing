import { FlaskConical, ShieldAlert, Shuffle, UserMinus } from "lucide-react"

import { Container } from "@/components/brand/container"
import { Eyebrow } from "@/components/brand/eyebrow"
import { Reveal } from "@/components/brand/reveal"
import { Section } from "@/components/brand/section"
import { HOME } from "@/content/home"

/** Un icono lucide fijo por tarjeta, en el mismo orden que `HOME.reto.cards`. */
const CARD_ICONS = [Shuffle, ShieldAlert, FlaskConical, UserMinus] as const

/**
 * El reto: capítulo claro que diagnostica la brecha entre adopción individual
 * y transformación real. Grid 2×2 de tarjetas (1 col en mobile) seguido de un
 * cierre a modo de blockquote destacado.
 */
function Reto() {
  return (
    <Section tone="light">
      <Container>
        <Reveal>
          <Eyebrow>{HOME.reto.eyebrow}</Eyebrow>
          <h2 className="font-display mt-4 max-w-[22ch] text-[clamp(2rem,4vw,3rem)] font-extrabold tracking-tight">
            {HOME.reto.title}
          </h2>
          <p className="text-muted-foreground mt-6 max-w-[56ch] text-lg">{HOME.reto.intro}</p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
          {HOME.reto.cards.map((card, index) => {
            const Icon = CARD_ICONS[index]
            return (
              <Reveal key={card.title} delay={index * 0.06}>
                <article className="group hover:border-brand-blue h-full rounded-2xl border border-[var(--brand-timberwolf)] bg-white p-7 transition-[border-color,transform] duration-200 ease-out hover:-translate-y-0.5">
                  <div className="bg-brand-blue/10 inline-flex size-11 items-center justify-center rounded-full">
                    <Icon aria-hidden className="text-brand-blue size-5" />
                  </div>
                  <h3 className="font-display mt-5 text-xl font-bold">{card.title}</h3>
                  <p className="text-muted-foreground mt-2 max-w-[42ch] text-base leading-relaxed">
                    {card.text}
                  </p>
                </article>
              </Reveal>
            )
          })}
        </div>

        <Reveal delay={0.1} className="mt-16">
          <blockquote className="border-brand-blue max-w-[64ch] border-l-4 pl-6">
            <p className="font-display text-[1.375rem] leading-snug font-medium md:text-2xl">
              {HOME.reto.closing}
            </p>
          </blockquote>
        </Reveal>
      </Container>
    </Section>
  )
}

export { Reto }
