import { Container } from "@/components/brand/container"
import { Eyebrow } from "@/components/brand/eyebrow"
import { Reveal } from "@/components/brand/reveal"
import { Section } from "@/components/brand/section"
import { HOME } from "@/content/home"

/**
 * El reto: capítulo claro, editorial. Intro fija a la izquierda (sticky en
 * desktop) y, a la derecha, los cuatro problemas como filas de lectura con
 * filetes Timberwolf, sin tarjetas ni iconos. Cierra el blockquote destacado.
 */
function Reto() {
  return (
    <Section tone="light">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <Reveal className="lg:sticky lg:top-28">
              <Eyebrow>{HOME.reto.eyebrow}</Eyebrow>
              <h2 className="font-display mt-4 max-w-[18ch] text-[clamp(2rem,4vw,3rem)] font-extrabold tracking-tight">
                {HOME.reto.title}
              </h2>
              <p className="text-muted-foreground mt-6 max-w-[40ch] text-lg">{HOME.reto.intro}</p>
            </Reveal>
          </div>

          <ul className="lg:col-span-7">
            {HOME.reto.cards.map((card, index) => (
              <Reveal
                as="li"
                key={card.title}
                delay={index * 0.06}
                className="grid grid-cols-1 gap-2 border-t border-[var(--brand-timberwolf)] py-7 first:border-t-0 first:pt-0 md:grid-cols-[minmax(0,14rem)_1fr] md:gap-6 md:py-8"
              >
                <h3 className="font-display text-xl font-bold">{card.title}</h3>
                <p className="text-muted-foreground max-w-[46ch] text-base leading-relaxed">
                  {card.text}
                </p>
              </Reveal>
            ))}
          </ul>
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
