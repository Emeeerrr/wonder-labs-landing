export const SITE = {
  name: "WonderLabs",
  description:
    "Implementamos sistemas de IA y formamos equipos en Colombia. Diagnóstico, formación, implementación y acompañamiento para que la IA sea tu ventaja competitiva.",
  // TODO(wonderlabs): dominio real pendiente de compra/DNS; placeholder hasta entonces.
  url: "https://wonderlabs.example",
  nav: [
    { label: "Servicios", href: "/servicios" },
    { label: "Formación", href: "/servicios#formacion" },
    { label: "Contacto", href: "/contacto" },
  ],
  cta: { label: "Agenda una reunión", href: "/contacto" },
} as const

export type NavItem = (typeof SITE.nav)[number]
