import { Container } from "@/components/brand/container"
import { Eyebrow } from "@/components/brand/eyebrow"
import { Section } from "@/components/brand/section"
import { HOME } from "@/content/home"

/**
 * Credenciales: las cifras grandes a la izquierda y la lista del equipo a la
 * derecha, directamente sobre el fondo claro — sin caja blanca, sin chips de
 * check, sin count-up. Los números se imprimen quietos, como en un informe.
 */
function Credenciales() {
  return (
    <Section tone="light">
      <Container>
        {/*
         * Único título de sección sin h2 visible (el peso visual está en las
         * cifras): h2 sr-only para no romper la jerarquía de encabezados.
         */}
        <h2 className="sr-only">{HOME.credenciales.eyebrow}</h2>
        <Eyebrow aria-hidden>{HOME.credenciales.eyebrow}</Eyebrow>

        <div className="mt-10 grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
          <div className="flex flex-col gap-12 md:col-span-6">
            {HOME.credenciales.stats.map((stat) => (
              <div key={stat.label}>
                <span className="font-display block text-[clamp(3.25rem,7vw,5rem)] leading-none font-medium italic tabular-nums">
                  {stat.prefix}
                  {stat.value}
                </span>
                <p className="text-muted-foreground mt-4 max-w-[38ch] text-base leading-relaxed">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <div className="md:col-span-5 md:col-start-8">
            <h3 className="font-display text-xl font-medium">{HOME.credenciales.listIntro}</h3>
            <ul className="mt-6">
              {HOME.credenciales.list.map((item) => (
                <li
                  key={item}
                  className="border-t border-[var(--brand-timberwolf)] py-4 text-base leading-relaxed last:border-b"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* TODO(wonderlabs): validar certificaciones, cursos y asesoría antes de publicar (doc §2.5); logos de clientes pendientes de autorización */}
      </Container>
    </Section>
  )
}

export { Credenciales }
