"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { MenuIcon, XIcon } from "lucide-react"

import { Container } from "@/components/brand/container"
import { Logo } from "@/components/brand/logo"
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { SITE } from "@/content/site"
import { cn } from "@/lib/utils"

/*
 * Convención de CTA del sitio: texto midnight-deep (#01242C) sobre Tangerine
 * (#F0801E). El blanco sobre tangerine queda en ~2.3:1 y no alcanza AA para
 * texto pequeño; el midnight-deep da ~6:1, cumple AA y lee cálido y seguro.
 * Hover: tangerine oscurecido un 8%.
 */
const ctaClassName =
  "inline-flex h-11 items-center justify-center rounded-full bg-brand-tangerine px-5 text-sm font-semibold text-brand-midnight-deep transition-colors duration-200 ease-out hover:bg-[color-mix(in_srgb,var(--brand-tangerine)_92%,black)]"

/*
 * Ruta activa: solo hrefs sin hash (un enlace con ancla no marca la página),
 * por coincidencia exacta o como raíz de sección (/servicios/...).
 */
function isActive(pathname: string, href: string) {
  if (href.includes("#")) return false
  return pathname === href || (href !== "/" && pathname.startsWith(`${href}/`))
}

/**
 * Header global. En `/` arranca transparente (el hero oscuro queda detrás) y
 * pasa a glass-midnight tras 24px de scroll; en el resto de rutas es
 * glass-midnight desde el inicio para garantizar legibilidad sobre fondos claros.
 */
function Header() {
  const pathname = usePathname()
  return <HeaderBar transparentAtTop={pathname === "/"} />
}

function HeaderBar({ transparentAtTop }: { transparentAtTop: boolean }) {
  const pathname = usePathname()
  const [scrolled, setScrolled] = React.useState(false)

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const glass = scrolled || !transparentAtTop

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ease-out",
        glass
          ? "bg-brand-midnight/70 border-white/10 backdrop-blur-md"
          : "border-transparent bg-transparent"
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-6 md:h-20">
        <Link
          href="/"
          aria-label="WonderLabs — inicio"
          className="text-brand-smoke inline-flex h-11 items-center"
        >
          <Logo variant="wordmark" />
        </Link>

        {/* Navegación de escritorio */}
        <nav aria-label="Principal" className="hidden items-center gap-8 md:flex">
          {SITE.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(pathname, item.href) ? "page" : undefined}
              className={cn(
                "hover:text-brand-blue text-brand-smoke inline-flex h-11 items-center text-sm transition-colors duration-200 ease-out",
                // Estado activo: subrayado azul, el texto conserva el contraste AA del smoke.
                isActive(pathname, item.href) &&
                  "decoration-brand-blue underline decoration-2 underline-offset-[6px]"
              )}
            >
              {item.label}
            </Link>
          ))}
          <Link href={SITE.cta.href} className={ctaClassName}>
            {SITE.cta.label}
          </Link>
        </nav>

        {/* Menú móvil */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger
              aria-label="Abrir menú"
              className="text-brand-smoke inline-flex size-11 items-center justify-center rounded-full transition-colors duration-200 ease-out hover:bg-white/10"
            >
              <MenuIcon className="size-6" />
            </SheetTrigger>
            <SheetContent
              side="right"
              showCloseButton={false}
              className="chapter-dark gap-0 border-white/10 p-6"
            >
              <SheetTitle className="sr-only">Menú de navegación</SheetTitle>
              <div className="flex items-center justify-between">
                <SheetClose
                  render={<Link href="/" />}
                  nativeButton={false}
                  aria-label="WonderLabs — inicio"
                  className="text-brand-smoke inline-flex h-11 items-center"
                >
                  <Logo variant="wordmark" />
                </SheetClose>
                <SheetClose
                  aria-label="Cerrar menú"
                  className="text-brand-smoke inline-flex size-11 items-center justify-center rounded-full transition-colors duration-200 ease-out hover:bg-white/10"
                >
                  <XIcon className="size-6" />
                </SheetClose>
              </div>
              <nav aria-label="Principal" className="mt-12 flex flex-col">
                {SITE.nav.map((item) => (
                  <SheetClose
                    key={item.href}
                    render={<Link href={item.href} />}
                    nativeButton={false}
                    aria-current={isActive(pathname, item.href) ? "page" : undefined}
                    className={cn(
                      "font-display hover:text-brand-blue inline-flex min-h-14 items-center text-3xl font-medium transition-colors duration-200 ease-out",
                      isActive(pathname, item.href) ? "text-brand-blue" : "text-brand-smoke"
                    )}
                  >
                    {item.label}
                  </SheetClose>
                ))}
              </nav>
              <div className="mt-12">
                <SheetClose
                  render={<Link href={SITE.cta.href} />}
                  nativeButton={false}
                  className={cn(ctaClassName, "w-full")}
                >
                  {SITE.cta.label}
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  )
}

export { Header }
