/**
 * Copy de /servicios. Verbatim del borrador §4–5 — no reescribir sin aprobación.
 * Anclas sin tildes (`#diagnostico`, `#formacion`, `#implementacion`,
 * `#acompanamiento`, `#faq`) para que coincidan con los href del header
 * (`SITE.nav`) y con el sub-nav del hero corto de esta página.
 */
export const SERVICIOS = {
  hero: {
    eyebrow: "Servicios",
    title: "Una sola ruta, cuatro etapas.",
    subtitle:
      "Puedes empezar por cualquier etapa. Cada una se contrata por separado; juntas convierten la IA en tu forma de trabajar.",
    subnav: [
      { label: "Diagnóstico", href: "#diagnostico" },
      { label: "Formación", href: "#formacion" },
      { label: "Implementación", href: "#implementacion" },
      { label: "Acompañamiento", href: "#acompanamiento" },
    ],
  },
  diagnostico: {
    number: "01",
    eyebrow: "Etapa 01 · Diagnóstico",
    title: "Antes de invertir, saber dónde está el retorno.",
    cards: [
      {
        title: "Reunión inicial",
        badge: "Sin costo",
        text: "Una conversación con tu equipo directivo para entender objetivos, retos y punto de partida.",
        resultLabel: "Resultado",
        result: "una propuesta con alcance y cronograma a la medida.",
      },
      {
        title: "Diagnóstico de madurez en IA",
        badge: "1 a 2 semanas",
        text: "Evaluamos cómo usa hoy la IA tu organización: personas, procesos, herramientas y reglas.",
      },
    ],
    entregablesTitle: "Entregables",
    entregables: [
      "Nivel de madurez en IA por área",
      "Mapa de oportunidades priorizado por retorno",
      "Hoja de ruta recomendada",
    ],
  },
  formacion: {
    number: "02",
    eyebrow: "Etapa 02 · Formación",
    title: "Formamos a tus equipos para operar con IA.",
    subtitle:
      "Programas de 2 a 3 meses, no talleres sueltos. En vivo, presencial o virtual. Formación inmersiva, interactiva y memorable.",
    herramientas:
      "Trabajamos sobre la herramienta que ya usa tu organización: Claude, ChatGPT, Microsoft Copilot, Gemini u otras.",
    liderazgo: {
      title: "Programa Liderazgo — Decidir y liderar con IA",
      meta: [
        { label: "Para quién", value: "CEOs, VPs, directores y líderes de área" },
        { label: "Formato", value: "6 sesiones en vivo de 2 horas, en grupos reducidos" },
        { label: "Resultado", value: "Cada líder sale con una hoja de ruta de IA para su área" },
      ],
      temarioTitle: "Temario",
      temario: [
        "Qué puede y qué no puede hacer la IA hoy en tu industria",
        "Dónde está el valor: identificar y priorizar casos de uso",
        "Datos, riesgos y gobernanza: las decisiones que le tocan a la dirección",
        "Cómo liderar la adopción en tu equipo",
        "Cómo medir el retorno de la IA",
        "Cierre: cada líder presenta su hoja de ruta",
      ],
    },
    equipos: {
      title: "Programa Equipos",
      intro:
        "Para equipos de cualquier área. Usar la IA en el trabajo diario con método, criterio y seguridad. El formato se ajusta al tamaño de tu equipo y al nivel de personalización que necesites.",
      modalidades: [
        {
          title: "Estándar",
          text: "Formación en una herramienta de IA, con ejercicios sobre el trabajo de cada participante.",
          meta: "8 sesiones · 90 min",
        },
        {
          title: "Personalizado",
          text: "Todos los ejemplos y ejercicios construidos sobre la operación real de tu organización.",
          meta: "6 sesiones · 120 min",
        },
        {
          title: "Gran escala",
          text: "Despliegue para cientos de personas en grupos paralelos, con sesiones presenciales y virtuales.",
          meta: "Varias semanas",
        },
      ],
    },
    incluye: {
      title: "Toda formación incluye",
      items: [
        {
          title: "Práctica con casos reales",
          text: "Sobre las tareas y documentos reales de tu equipo.",
        },
        {
          title: "Progresión de nivel",
          text: "Cada caso avanza de un primer resultado a una versión más sólida.",
        },
        {
          title: "Evaluación del avance",
          text: "Momentos de evaluación en los puntos clave.",
        },
        {
          title: "Cierre con casos propios",
          text: "Cada participante presenta lo que construyó.",
        },
        {
          title: "Informe final",
          text: "Resultados y nivel de adopción alcanzado.",
        },
      ],
    },
  },
  implementacion: {
    number: "03",
    eyebrow: "Etapa 03 · Implementación",
    title: "IA a la medida, sobre las herramientas que ya usas.",
    frentes: [
      {
        title: "Espacio de trabajo con IA",
        sub: "para los equipos",
        text: "La herramienta que ya usa tu organización, configurada para el trabajo diario.",
        incluyeTitle: "Incluye",
        incluye: [
          "Controles de administrador",
          "Espacios separados por área",
          "Biblioteca de instrucciones",
          "Asistentes a la medida",
          "Entregables con tu marca",
        ],
      },
      {
        title: "Agentes y automatizaciones",
        sub: "para los procesos",
        text: "Flujos que conectan tus sistemas y automatizan tareas repetitivas.",
        incluyeTitle: "Incluye",
        incluye: [
          "Conexión con correo, documentos y CRM",
          "Tareas que se ejecutan solas",
          "Menos trabajo manual y menos errores",
        ],
      },
      {
        title: "Gobernanza de IA",
        sub: "para crecer con orden",
        text: "Las reglas que hacen el uso de la IA seguro y sostenible.",
        incluyeTitle: "Incluye",
        incluye: [
          "Comité de IA",
          "Política de uso de IA",
          "Manejo de información sensible, alineado con la Ley 1581 de 2012",
        ],
      },
    ],
    fases: {
      title: "Cómo implementamos",
      subtitle: "Cuatro fases hasta que tu equipo opere solo",
      items: [
        {
          title: "Mapeo",
          text: "Mapeamos los procesos de tu equipo y priorizamos por retorno.",
        },
        {
          title: "Construcción",
          text: "Configuramos la base: espacio de trabajo, automatizaciones y reglas.",
        },
        {
          title: "Adopción",
          text: "Tu equipo trabaja sobre el sistema con acompañamiento cercano.",
        },
        {
          title: "Autonomía",
          text: "Tu equipo opera el sistema; nosotros quedamos como soporte.",
        },
      ],
      nota: "La duración de cada fase se define después del diagnóstico, según el alcance acordado.",
    },
  },
  acompanamiento: {
    number: "04",
    eyebrow: "Etapa 04 · Acompañamiento",
    title: "La adopción no termina con el programa.",
    intro:
      "Las herramientas de IA cambian cada mes. Te ayudamos a convertir esos cambios en trabajo mejor hecho. Se contrata mes a mes.",
    items: [
      {
        title: "Sesión mensual de formación",
        text: "Nuevas funciones y casos de uso para tu equipo.",
      },
      {
        title: "Nuevos casos de uso cada mes",
        text: "Mejoras sobre lo que ya funciona.",
      },
      {
        title: "Soporte a tu equipo",
        text: "Dudas resueltas y apoyo a los líderes de adopción.",
      },
      {
        title: "Reporte de adopción",
        text: "Qué se usa, cuánto y con qué resultados.",
      },
      {
        title: "Comité de IA",
        text: "Priorizamos juntos los siguientes pasos.",
      },
    ],
  },
  faq: {
    eyebrow: "Preguntas frecuentes",
    title: "Lo que suelen preguntarnos.",
    items: [
      {
        question: "¿Necesito licencias de una herramienta de IA antes de empezar?",
        answer:
          "No. En el diagnóstico y las primeras sesiones trabajamos sobre lo que ya tienes. Si hace falta, te ayudamos a elegir la herramienta y el plan que le sirve a tu operación.",
      },
      {
        question: "¿Las sesiones son presenciales o virtuales?",
        answer:
          "En vivo, presencial o virtual. Presencial en Medellín y Bogotá; virtual para el resto de Colombia y Latinoamérica.",
      },
      {
        question: "¿Pueden formar a cientos de personas?",
        answer:
          "Sí. La modalidad Gran escala despliega la formación en grupos paralelos, presenciales y virtuales, durante varias semanas.",
      },
      {
        question: "¿Trabajan con entidades públicas?",
        answer:
          "Sí. Formamos a servidores públicos y acompañamos la adopción con reglas claras de uso y protección de datos.",
      },
      {
        question: "¿Qué pasa con la información de mi organización?",
        answer:
          "La tratamos según la Ley 1581 de 2012: usamos solo los datos necesarios para la formación y definimos contigo qué información puede entrar a las herramientas y cuál no.",
      },
    ],
  },
  ctaFinal: {
    title: "Cotiza un programa para tu equipo",
    text: "Cuéntanos qué necesita tu organización y te presentamos una propuesta con alcance y cronograma a la medida.",
    cta: { label: "Cotiza un programa para tu equipo", href: "/contacto" },
  },
} as const

export type ServiciosContent = typeof SERVICIOS
