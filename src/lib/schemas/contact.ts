import { z } from "zod"

export const contactSchema = z.object({
  nombre: z.string().min(2, "Escribe tu nombre y apellido."),
  cargo: z.string().min(2, "Escribe tu cargo."),
  organizacion: z.string().min(2, "Escribe el nombre de tu organización."),
  tipoOrganizacion: z.enum(["Empresa privada", "Entidad pública", "Otra"], {
    message: "Selecciona el tipo de organización.",
  }),
  tamanoEquipo: z.enum(["1–20", "20–200", "200–1.000", "+1.000"], {
    message: "Selecciona el tamaño del equipo.",
  }),
  correo: z.string().email("Escribe un correo corporativo válido."),
  telefono: z.string().optional(),
  interes: z
    .enum(["Diagnóstico", "Formación", "Implementación", "Acompañamiento", "No estoy seguro"])
    .optional(),
  herramienta: z.enum(["Claude", "ChatGPT", "Copilot", "Gemini", "Ninguna", "Otra"]).optional(),
  mensaje: z.string().max(2000).optional(),
  autorizacion: z.literal(true, {
    message: "Debes autorizar el tratamiento de datos para enviar la solicitud.",
  }),
  website: z.string().max(0).optional(), // honeypot
})

export type ContactInput = z.infer<typeof contactSchema>
