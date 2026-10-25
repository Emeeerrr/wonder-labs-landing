import type * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Etiqueta mono para abrir capítulos y marcar datos. El color sigue el tono de
 * la sección vía `--muted-foreground` (re-mapeado por `.chapter-dark`), con
 * contraste AA sobre ambos fondos.
 */
function Eyebrow({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "text-muted-foreground block font-mono text-xs tracking-[0.18em] uppercase",
        className
      )}
      {...props}
    />
  )
}

export { Eyebrow }
