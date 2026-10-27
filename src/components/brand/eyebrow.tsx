import type * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Rótulo de capítulo: texto corto en caja de oración, sin mayúsculas
 * sostenidas ni mono (ese registro queda reservado a datos reales como el
 * reloj). El color sigue el tono de la sección vía `--muted-foreground`.
 */
function Eyebrow({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span className={cn("text-muted-foreground block text-sm font-medium", className)} {...props} />
  )
}

export { Eyebrow }
