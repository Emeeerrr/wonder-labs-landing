import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Container } from "@/components/brand/container"
import { Eyebrow } from "@/components/brand/eyebrow"
import { Reveal } from "@/components/brand/reveal"
import { Section } from "@/components/brand/section"
import { SERVICIOS } from "@/content/servicios"

/**
 * FAQ: capítulo claro, cierre de contenido antes de la banda de CTA. Usa el
 * Accordion de shadcn/Base UI (teclado y aria nativos) con `multiple` para
 * que varias respuestas puedan quedar abiertas a la vez — útil en una FAQ
 * donde las preguntas son independientes entre sí.
 */
function Faq() {
  return (
    <Section id="faq" tone="light" className="scroll-mt-32 md:scroll-mt-36">
      <Container>
        <Reveal>
          <Eyebrow>{SERVICIOS.faq.eyebrow}</Eyebrow>
          <h2 className="font-display mt-4 max-w-[26ch] text-[clamp(2rem,4vw,3rem)] font-extrabold tracking-tight">
            {SERVICIOS.faq.title}
          </h2>
        </Reveal>

        <Reveal delay={0.08} className="mt-12 max-w-[72ch]">
          <Accordion
            multiple
            className="rounded-2xl border border-[var(--brand-timberwolf)] bg-white px-6 md:px-8"
          >
            {SERVICIOS.faq.items.map((item) => (
              <AccordionItem key={item.question} value={item.question}>
                <AccordionTrigger className="py-5 text-base font-semibold md:text-lg">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          {/* TODO(wonderlabs): detallar modalidades de contratación pública (licitación, contratación directa, convenios) una vez confirmadas */}
        </Reveal>
      </Container>
    </Section>
  )
}

export { Faq }
