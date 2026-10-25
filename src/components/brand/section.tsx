import type * as React from "react"

import { cn } from "@/lib/utils"

type SectionProps = React.ComponentProps<"section"> & {
  /**
   * "light" hereda el fondo White Smoke del body; "dark" aplica `.chapter-dark`,
   * que re-mapea los tokens semánticos y pinta el degradé midnight → midnight-deep.
   */
  tone?: "light" | "dark"
}

function Section({ tone = "light", className, ...props }: SectionProps) {
  return (
    <section
      data-tone={tone}
      className={cn("py-24 md:py-32", tone === "dark" && "chapter-dark", className)}
      {...props}
    />
  )
}

export { Section }
