export const SITE = {
  name: "WonderLabs",
  // TODO(task-8): description definitiva para metadata/OG.
  description: "La unión entre el talento humano y el poder tecnológico.",
  url: "https://wonderlabs.example",
  nav: [
    { label: "Servicios", href: "/servicios" },
    { label: "Formación", href: "/servicios#formacion" },
    { label: "Contacto", href: "/contacto" },
  ],
  cta: { label: "Agenda una reunión", href: "/contacto" },
} as const

export type NavItem = (typeof SITE.nav)[number]
