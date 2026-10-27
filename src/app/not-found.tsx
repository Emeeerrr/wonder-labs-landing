import Link from "next/link"

import { Container } from "@/components/brand/container"

/**
 * 404 propia: capítulo oscuro con el mismo registro del sitio. Header y footer
 * llegan por el layout raíz; aquí solo va el contenido de la página.
 */
function NotFound() {
  return (
    <section className="chapter-dark flex min-h-[70vh] flex-1 items-center py-24 md:py-32">
      <Container>
        <div className="max-w-[640px]">
          <p
            aria-hidden
            className="font-display text-[clamp(5rem,16vw,11rem)] leading-none font-medium italic"
          >
            404
          </p>
          <h1 className="font-display mt-6 text-[clamp(2.25rem,4.6vw,3.5rem)] leading-[1.1] font-medium">
            Esta página no existe.
          </h1>
          <p className="text-muted-foreground mt-6 max-w-[56ch] text-lg md:text-xl">
            Puede que el enlace esté roto o que la página se haya movido.
          </p>

          <div className="mt-10 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-8">
            <Link
              href="/contacto"
              className="bg-brand-tangerine text-brand-midnight-deep inline-flex h-14 items-center justify-center rounded-full px-9 text-base font-semibold transition-colors duration-200 ease-out hover:bg-[color-mix(in_srgb,var(--brand-tangerine)_92%,black)]"
            >
              Habla con nuestro equipo
            </Link>
            <Link
              href="/"
              className="text-foreground decoration-brand-blue hover:text-brand-blue inline-flex min-h-11 items-center text-base font-semibold underline decoration-2 underline-offset-4 transition-colors duration-200 ease-out"
            >
              Volver al inicio
            </Link>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default NotFound
