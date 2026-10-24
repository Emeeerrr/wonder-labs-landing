/**
 * Copy de la home. Verbatim del borrador §2.1 — no reescribir sin aprobación.
 * El hero usa la opción A del titular (B y C quedan en el borrador).
 */
export const HOME = {
  hero: {
    eyebrow: "IA aplicada · Colombia",
    title: "Llevamos la IA de la promesa a la operación.",
    subtitle:
      "Implementamos sistemas de IA y formamos a tus equipos para que la inteligencia artificial sea tu mayor ventaja competitiva.",
    ctaPrimary: { label: "Agenda tu reunión inicial sin costo", href: "/contacto" },
    ctaSecondary: { label: "Conoce cómo trabajamos", href: "#ruta" },
  },
} as const

export type HomeContent = typeof HOME
