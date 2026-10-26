"use server"

import { contactSchema, type ContactInput } from "@/lib/schemas/contact"

export type ContactActionResult = {
  ok: boolean
  errors?: Record<string, string[]>
}

/** Latencia simulada para que el estado de carga sea perceptible cuando no hay envío real. */
const SIMULATED_LATENCY_MS = 600

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

type Lead = Omit<ContactInput, "website">

function formatLeadEmail(lead: Lead): string {
  const lines = [
    `Nombre: ${lead.nombre}`,
    `Cargo: ${lead.cargo}`,
    `Organización: ${lead.organizacion}`,
    `Tipo de organización: ${lead.tipoOrganizacion}`,
    `Tamaño del equipo: ${lead.tamanoEquipo}`,
    `Correo: ${lead.correo}`,
    lead.telefono ? `Teléfono / WhatsApp: ${lead.telefono}` : null,
    lead.interes ? `Interés: ${lead.interes}` : null,
    lead.herramienta ? `Herramienta actual: ${lead.herramienta}` : null,
    lead.mensaje ? `\nMensaje:\n${lead.mensaje}` : null,
  ]
  return lines.filter(Boolean).join("\n")
}

/**
 * Envía el lead por correo vía Resend (https://resend.com) cuando las dos
 * variables de entorno están configuradas:
 *
 *   RESEND_API_KEY      — API key de la cuenta de Resend
 *   CONTACT_LEADS_EMAIL — buzón que recibe los leads (p. ej. ventas@...)
 *
 * Devuelve true si el correo salió. Sin configuración devuelve false y el
 * caller deja el respaldo en los logs del servidor (en Vercel: Logs del
 * proyecto). El remitente onboarding@resend.dev funciona sin verificar
 * dominio; al tener dominio propio, cambiarlo por p. ej. web@wonderlabs.co.
 */
// TODO(wonderlabs): definir buzón/CRM definitivo de leads (doc §10.4) y dominio remitente
async function deliverLeadByEmail(lead: Lead): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_LEADS_EMAIL
  if (!apiKey || !to) return false

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "WonderLabs Web <onboarding@resend.dev>",
      to: [to],
      reply_to: lead.correo,
      subject: `Nuevo lead: ${lead.nombre} · ${lead.organizacion}`,
      text: formatLeadEmail(lead),
    }),
  })

  if (!response.ok) {
    console.error("[contacto] fallo el envío del lead por correo", {
      status: response.status,
      body: await response.text().catch(() => ""),
    })
    return false
  }

  return true
}

/**
 * Procesa el formulario de /contacto. Valida de nuevo en el servidor (el
 * cliente ya valida con el mismo `contactSchema` vía zodResolver) y descarta
 * en silencio los envíos de bots que llenan el honeypot `website`.
 */
export async function submitContact(input: unknown): Promise<ContactActionResult> {
  // Honeypot: se revisa antes de validar con zod porque el esquema exige
  // `website` vacío (`max(0)`) — un bot que lo rellene fallaría esa regla y
  // recibiría un error, delatando la trampa. Comprobamos el valor crudo del
  // campo y respondemos éxito sin procesar nada más.
  if (
    input &&
    typeof input === "object" &&
    "website" in input &&
    typeof (input as { website?: unknown }).website === "string" &&
    (input as { website: string }).website.length > 0
  ) {
    return { ok: true }
  }

  const parsed = contactSchema.safeParse(input)

  if (!parsed.success) {
    return { ok: false, errors: parsed.error.flatten().fieldErrors as Record<string, string[]> }
  }

  const { website, ...lead } = parsed.data
  void website

  // Respaldo siempre presente: el lead queda en los logs del servidor
  // (en Vercel: pestaña Logs del proyecto) aunque el correo falle.
  console.log("[contacto] nuevo lead", lead)

  const delivered = await deliverLeadByEmail(lead).catch((error) => {
    console.error("[contacto] error enviando el lead por correo", error)
    return false
  })

  if (!delivered) {
    // Sin envío real configurado: latencia simulada para que el estado de
    // carga del formulario sea perceptible.
    await wait(SIMULATED_LATENCY_MS)
  }

  return { ok: true }
}
