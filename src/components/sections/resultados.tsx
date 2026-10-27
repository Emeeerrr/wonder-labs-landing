import { Container } from "@/components/brand/container"
import { Eyebrow } from "@/components/brand/eyebrow"
import { Section } from "@/components/brand/section"
import { HOME } from "@/content/home"

/**
 * Resultados: cuatro beneficios como párrafos con cabeza embebida (run-in),
 * el recurso editorial de los informes impresos — el título en negrita abre
 * la frase y el texto corre a continuación. Sin reglas, sin iconos, sin grid
 * de tarjetas. El h3 inline conserva la jerarquía para lectores de pantalla.
 */
function Resultados() {
  return (
    <Section tone="light" className="pt-0">
      <Container>
        <Eyebrow>{HOME.resultados.eyebrow}</Eyebrow>
        <h2 className="font-display mt-4 max-w-[22ch] text-[clamp(2rem,4.2vw,3.25rem)] leading-[1.12] font-medium">
          {HOME.resultados.title}
        </h2>

        <div className="mt-12 grid max-w-[72rem] grid-cols-1 gap-x-16 gap-y-9 md:grid-cols-2">
          {HOME.resultados.benefits.map((benefit) => (
            <div key={benefit.title} className="max-w-[52ch] text-base leading-relaxed">
              <h3 className="inline font-sans text-base font-semibold">{benefit.title}.</h3>{" "}
              <p className="text-muted-foreground inline">{benefit.text}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}

export { Resultados }
