"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

/** Hora local de Colombia (GMT-5), formato es-CO: "7:43 p. m.". */
const formatter = new Intl.DateTimeFormat("es-CO", {
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
  timeZone: "America/Bogota",
})

/**
 * Reloj en vivo de Bogotá. Es el único uso de la fuente mono fuera de datos
 * de etapa: marca que el equipo trabaja aquí, en este huso horario.
 *
 * La hora se lee solo en el cliente, dentro de un efecto (el prerender de
 * Next rechaza `new Date()` en componentes cliente); el `<time>` reserva su
 * ancho en `ch` para que la aparición no mueva el layout.
 */
function ColombiaClock({ className }: { className?: string }) {
  const [now, setNow] = React.useState<string | null>(null)

  React.useEffect(() => {
    const update = () => setNow(formatter.format(new Date()))
    update()
    const id = setInterval(update, 30_000)
    return () => clearInterval(id)
  }, [])

  return (
    <span
      className={cn("font-mono text-xs whitespace-nowrap tabular-nums", className)}
      title="Hora local en Colombia (GMT-5)"
    >
      Bogotá <time className="inline-block min-w-[10ch]">{now}</time>
    </span>
  )
}

export { ColombiaClock }
