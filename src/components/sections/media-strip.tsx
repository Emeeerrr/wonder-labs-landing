import { Container } from "@/components/brand/container"
import { MediaSlot } from "@/components/brand/media-slot"
import { HOME } from "@/content/home"

/**
 * Franja de medios del acto claro: los dos espacios de fotografía (sesión en
 * vivo y equipo) en una composición asimétrica, sin encabezado propio. El
 * video de visión vive en el hero.
 */
function MediaStrip() {
  const [sesion, equipo] = HOME.media.fotos
  return (
    <section id="medios" className="py-10 md:py-14">
      <Container>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-12 md:gap-6">
          <div className="md:col-span-7">
            <MediaSlot label={sesion.label} aspect={sesion.aspect} tone="light" />
          </div>
          <div className="md:col-span-4 md:col-start-9 md:mt-20">
            <MediaSlot label={equipo.label} aspect={equipo.aspect} tone="light" />
          </div>
        </div>
      </Container>
    </section>
  )
}

export { MediaStrip }
