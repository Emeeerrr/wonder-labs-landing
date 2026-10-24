"use server"

import { contactSchema } from "@/lib/schemas/contact"

export type ContactActionResult = {
  ok: boolean
  errors?: Record<string, string[]>
}

/** Latencia simulada para que el estado de carga del formulario sea perceptible. */
const SIMULATED_LATENCY_MS = 600

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
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

  await wait(SIMULATED_LATENCY_MS)

  const { website, ...lead } = parsed.data
  void website

  // TODO(wonderlabs): conectar destino real de leads (correo/CRM) — doc §7
  console.log("[contacto] nuevo lead", lead)

  return { ok: true }
}
