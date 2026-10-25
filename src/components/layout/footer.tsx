import Link from "next/link"

import { Container } from "@/components/brand/container"
import { Logo } from "@/components/brand/logo"
import { SITE } from "@/content/site"

const LEGAL_LINKS = [
  { label: "Privacidad", href: "/legal/privacidad" },
  { label: "Términos", href: "/legal/terminos" },
] as const

const footerLinkClassName =
  "inline-flex min-h-11 w-fit items-center text-sm text-muted-foreground transition-colors duration-200 ease-out hover:text-brand-blue"

function Footer() {
  return (
    // El footer usa chapter-dark con el degradé colapsado a midnight-deep sólido.
    <footer className="chapter-dark [--chapter-from:var(--brand-midnight-deep)]">
      <Container className="py-16 md:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="flex flex-col gap-4 md:col-span-5">
            <Link
              href="/"
              aria-label="WonderLabs — inicio"
              className="inline-flex h-11 w-fit items-center"
            >
              <Logo variant="wordmark" />
            </Link>
            <p className="text-muted-foreground max-w-xs text-sm leading-relaxed">
              La unión entre el talento humano y el poder tecnológico.
            </p>
          </div>

          <nav aria-label="Pie de página" className="flex flex-col gap-8 md:col-span-4">
            <ul className="flex flex-col">
              {SITE.nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={footerLinkClassName}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="flex flex-col">
              {LEGAL_LINKS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={footerLinkClassName}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="text-muted-foreground flex flex-col gap-3 text-sm md:col-span-3">
            <p>Medellín · Bogotá · Colombia</p>
            <p>
              Contacto comercial:
              <br />
              Samuel Acosta · Fundador
            </p>
            {/* TODO(wonderlabs): NIT y razón social */}
            {/* TODO(wonderlabs): enlaces a redes sociales */}
          </div>
        </div>

        <div className="border-border mt-16 flex flex-col gap-2 border-t pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-muted-foreground text-[11px]">
            © 2026 WonderLabs. Todos los derechos reservados.
          </p>
          <p className="text-muted-foreground text-[11px]">
            Claude, ChatGPT, Microsoft Copilot y Gemini son marcas de sus respectivos titulares.
          </p>
        </div>
      </Container>
    </footer>
  )
}

export { Footer }
