import { Container } from "@/components/brand/container"
import { Eyebrow } from "@/components/brand/eyebrow"
import { Reveal } from "@/components/brand/reveal"
import { SERVICIOS } from "@/content/servicios"

/**
 * Sub-nav de anclas a las cuatro etapas. Fija "sticky" justo debajo del
 * header global (h-16 en mobile, h-20 desde md): `top-16 md:top-20`. Se
 * desplaza horizontalmente en mobile sin romper el layout (`overflow-x-auto`,
 * `whitespace-nowrap`) y no implementa scroll-spy — con cuatro anclas simples
 * un estado activo añade complejidad sin beneficio claro para el usuario.
 */
function ServiciosSubnav() {
  return (
    <nav
      aria-label="Etapas del servicio"
      className="chapter-dark bg-brand-midnight/95 sticky top-16 z-40 border-b border-white/10 backdrop-blur-md md:top-20"
    >
      <Container>
        <ul className="flex [scrollbar-width:none] gap-6 overflow-x-auto py-3 whitespace-nowrap [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {SERVICIOS.hero.subnav.map((item) => (
            <li key={item.href} className="shrink-0">
              <a
                href={item.href}
                className="text-muted-foreground hover:text-brand-blue inline-flex min-h-11 items-center font-mono text-xs tracking-[0.1em] uppercase transition-colors duration-200 ease-out"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </nav>
  )
}

/**
 * Hero corto: capítulo oscuro compacto (py-24, sin molécula 3D) que abre la
 * página de servicios y entrega directo al sub-nav sticky de las cuatro
 * etapas.
 */
function ServiciosHero() {
  return (
    <>
      <section className="chapter-dark bg-[linear-gradient(160deg,var(--brand-midnight-deep),var(--brand-midnight))] py-24">
        <Container>
          <Reveal>
            <Eyebrow>{SERVICIOS.hero.eyebrow}</Eyebrow>
            <h1 className="font-display mt-4 max-w-[26ch] text-[clamp(2.5rem,6vw,4rem)] font-extrabold tracking-tight">
              {SERVICIOS.hero.title}
            </h1>
            <p className="text-muted-foreground mt-6 max-w-[56ch] text-lg md:text-xl">
              {SERVICIOS.hero.subtitle}
            </p>
          </Reveal>
        </Container>
      </section>
      <ServiciosSubnav />
    </>
  )
}

export { ServiciosHero }
