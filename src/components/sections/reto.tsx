import { Container } from "@/components/brand/container"
import { Eyebrow } from "@/components/brand/eyebrow"
import { Section } from "@/components/brand/section"
import { HOME } from "@/content/home"

/**
 * El reto: cierra el primer acto oscuro como un manifiesto. El titular grande
 * plantea el problema, los cuatro síntomas se leen como filas de documento y
 * la cita final — la frase más fuerte del borrador — cierra el acto en
 * cursiva grande. Sin tarjetas, sin iconos, sin animación de scroll.
 */
function Reto() {
  return (
    <Section tone="dark" className="pt-10 [--chapter-from:var(--brand-midnight-deep)] md:pt-12">
      <Container>
        <div className="max-w-[720px]">
          <Eyebrow>{HOME.reto.eyebrow}</Eyebrow>
          <h2 className="font-display mt-4 max-w-[24ch] text-[clamp(2rem,4.2vw,3.25rem)] leading-[1.12] font-medium">
            {HOME.reto.title}
          </h2>
          <p className="text-muted-foreground mt-6 text-lg">{HOME.reto.intro}</p>
        </div>

        <ul className="mt-14 border-t border-white/10">
          {HOME.reto.cards.map((card) => (
            <li
              key={card.title}
              className="grid grid-cols-1 gap-2 border-b border-white/10 py-7 md:grid-cols-[minmax(0,16rem)_1fr] md:gap-8 md:py-8"
            >
              <h3 className="font-display text-xl font-medium">{card.title}</h3>
              <p className="text-muted-foreground max-w-[52ch] text-base leading-relaxed">
                {card.text}
              </p>
            </li>
          ))}
        </ul>

        <blockquote className="mt-16 max-w-[40ch] md:mt-20">
          <p className="font-display text-[clamp(1.5rem,3vw,2.25rem)] leading-snug font-medium italic">
            {HOME.reto.closing}
          </p>
        </blockquote>
      </Container>
    </Section>
  )
}

export { Reto }
