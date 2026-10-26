import { Container } from "@/components/brand/container"
import { MediaSlot } from "@/components/brand/media-slot"
import { Reveal } from "@/components/brand/reveal"
import { HOME } from "@/content/home"

/** Desfases verticales por marco en desktop, para romper la retícula. */
const OFFSETS = ["", "md:mt-12", "md:mt-24"] as const
const SPANS = ["md:col-span-4", "md:col-span-5", "md:col-span-3"] as const

/**
 * Franja de medios entre Para quién y Credenciales: tres espacios reservados
 * (sesión en vivo, video de visión, equipo) con alturas y desfases distintos.
 * Sin encabezado propio: los marcos y sus rótulos hablan solos.
 */
function MediaStrip() {
  return (
    <section id="medios" className="py-10 md:py-14">
      <Container>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-12 md:gap-6">
          {HOME.media.items.map((item, index) => (
            <Reveal key={item.label} delay={index * 0.08} className={SPANS[index]}>
              <div className={OFFSETS[index]}>
                <MediaSlot label={item.label} kind={item.kind} aspect={item.aspect} tone="light" />
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}

export { MediaStrip }
