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
        kicker: "B2B",
        title: "Empresas",
        text: "Trabajamos junto a directivos y equipos operativos de empresas medianas y grandes para que la adopción de la IA sea segura, fluida y orientada a resultados.",
      },
      {
        kicker: "B2G",
        title: "Sector público",
        text: "Acompañamos a entidades de gobierno a formar a sus equipos y adoptar la IA con reglas claras de uso, protección de datos y gobernanza.",
        cta: { label: "Habla con nuestro equipo", href: "/contacto" },
      },
    ],
  },
  /** Espacios reservados para material real (doc §8.5: aún sin fotos ni video público). */
  media: {
    /** Ancla del hero, como el material de producto de las referencias. */
    video: { label: "La visión de WonderLabs", aspect: "16/9" },
    fotos: [
      { label: "Sesión de formación en vivo", aspect: "5/4" },
      { label: "Equipo WonderLabs", aspect: "4/5" },
    ],
  },
  credenciales: {
    eyebrow: "Credenciales",
    stats: [
      {
        value: 5,
        prefix: "+",
        label: "años aplicando la metodología de formación de nuestro equipo",
      },
      {
        value: 50,
        prefix: "+",
        label: "clientes atendidos por nuestro equipo en Colombia, Estados Unidos y Latinoamérica",
      },
    ],
    listIntro: "Nuestro equipo cuenta con:",
    list: [
      "Certificaciones oficiales de Anthropic y Microsoft",
      "Instructores con cursos publicados en Platzi",
      "Asesoría al Gobierno de Colombia en la ley de inteligencia artificial",
      "Herramientas propias para las formaciones",
    ],
  },
  resultados: {
    eyebrow: "Resultados",
    title: "Lo que gana tu organización.",
    benefits: [
      {
        title: "Capacidad liberada",
        text: "El tiempo que hoy se va en tareas repetitivas vuelve a tu equipo para pensar y atender más trabajo.",
      },
      {
        title: "Conocimiento institucionalizado",
        text: "La forma de trabajar deja de depender de una o dos personas y queda en tu organización.",
      },
      {
        title: "Entregables más rápidos",
        text: "Informes, propuestas y presentaciones salen más rápido y con la identidad de tu marca.",
      },
      {
        title: "IA segura y bajo control",
        text: "Reglas claras sobre qué información se usa, quién decide y cómo se protege lo sensible.",
      },
    ],
  },
  ctaFinal: {
    eyebrow: "Siguiente paso",
    title: "Hagamos que la IA trabaje para tu organización.",
    text: "En una reunión inicial sin costo entendemos qué necesitas y te presentamos una propuesta con alcance y cronograma a la medida.",
    cta: { label: "Agenda la reunión inicial", href: "/contacto" },
  },
} as const

export type HomeContent = typeof HOME
