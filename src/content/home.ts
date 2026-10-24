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
  reto: {
    eyebrow: "El reto",
    title: "La IA ya llegó a tu empresa. La adopción todavía no.",
    intro: "Lo que vemos en organizaciones que empiezan a usar IA:",
    cards: [
      {
        title: "Uso sin método",
        text: "Cada persona usa la IA a su manera. Los resultados dependen de quién la use.",
      },
      {
        title: "Riesgo con la información",
        text: "Datos de clientes y documentos internos terminan en herramientas sin reglas claras.",
      },
      {
        title: "Pilotos que no escalan",
        text: "El equipo prueba, se entusiasma y a los pocos meses todo vuelve a como estaba.",
      },
      {
        title: "Conocimiento en pocas personas",
        text: "Lo que funciona vive en la cabeza de una o dos personas y se va con ellas.",
      },
    ],
    closing:
      "Comprar licencias no es adoptar IA. La verdadera innovación no genera fricción, genera rendimiento.",
  },
  ruta: {
    eyebrow: "Cómo trabajamos",
    title: "De la primera conversación a la autonomía.",
    stages: [
      {
        number: "01",
        title: "Diagnóstico",
        text: "Entendemos tu operación y priorizamos dónde la IA genera más retorno.",
      },
      {
        number: "02",
        title: "Formación",
        text: "Programas de 2 a 3 meses para líderes y equipos.",
      },
      {
        number: "03",
        title: "Implementación",
        text: "Sistemas de IA en tus procesos: espacios de trabajo, agentes y gobernanza.",
      },
      {
        number: "04",
        title: "Acompañamiento",
        text: "Soporte mensual para sostener y ampliar la adopción.",
      },
    ],
    note: "Puedes empezar por cualquier etapa. Cada una se contrata por separado; juntas convierten la IA en tu forma de trabajar.",
    cta: { label: "Ver servicios", href: "/servicios" },
  },
  paraQuien: {
    eyebrow: "Para quién",
    title: "IA aplicada para empresas y entidades públicas.",
    panels: [
      {
        title: "Empresas",
        text: "Trabajamos junto a directivos y equipos operativos de empresas medianas y grandes para que la adopción de la IA sea segura, fluida y orientada a resultados.",
      },
      {
        title: "Sector público",
        text: "Acompañamos a entidades de gobierno a formar a sus equipos y adoptar la IA con reglas claras de uso, protección de datos y gobernanza.",
        cta: { label: "Habla con nuestro equipo", href: "/contacto" },
      },
    ],
  },
} as const

export type HomeContent = typeof HOME
