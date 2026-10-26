import { Container } from "@/components/brand/container"
import { Eyebrow } from "@/components/brand/eyebrow"
import { Reveal } from "@/components/brand/reveal"
import { Section } from "@/components/brand/section"
import { HOME } from "@/content/home"

/**
 * Resultados: capítulo claro, tipográfico. Cuatro beneficios en retícula de
 * dos columnas, cada uno abierto por una regla corta en Blue Green; sin
 * tarjetas, sombras ni iconos, para distinguirse de El reto y dejar que el
 * texto cargue el peso.
 */
function Resultados() {
  return (
    <Section tone="light">
      <Container>
        <Reveal>
          <Eyebrow>{HOME.resultados.eyebrow}</Eyebrow>
          <h2 className="font-display mt-4 max-w-[22ch] text-[clamp(2rem,4vw,3rem)] font-extrabold tracking-tight">
            {HOME.resultados.title}
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-x-14 gap-y-12 md:grid-cols-2">
          {HOME.resultados.benefits.map((benefit, index) => (
            <Reveal key={benefit.title} delay={index * 0.06}>
              <span aria-hidden className="bg-brand-blue block h-0.5 w-10" />
              <h3 className="font-display mt-5 text-xl font-bold">{benefit.title}</h3>
              <p className="text-muted-foreground mt-2 max-w-[46ch] text-base leading-relaxed">
                {benefit.text}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}

export { Resultados }
