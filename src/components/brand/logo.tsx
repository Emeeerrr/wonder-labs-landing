import { cn } from "@/lib/utils"

type LogoProps = {
  variant?: "wordmark" | "mark"
  className?: string
}

/**
 * Única pieza donde la marca se escribe "Wonder Labs" (en texto corrido
 * siempre es "WonderLabs"). El wordmark es tipográfico (Bitter 700) con el
 * punto final en Blue Green; el mark es un placeholder hasta tener el SVG
 * oficial del Brand Kit.
 */
function Logo({ variant = "wordmark", className }: LogoProps) {
  if (variant === "mark") {
    return (
      <svg
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className={cn("size-8", className)}
      >
        {/* TODO(wonderlabs): reemplazar por SVG oficial del Brand Kit */}
        <defs>
          <linearGradient
            id="wl-mark-gradient"
            x1="0"
            y1="0"
            x2="32"
            y2="32"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="var(--brand-midnight, #003a45)" />
            <stop offset="1" stopColor="var(--brand-blue, #00a0d8)" />
          </linearGradient>
        </defs>
        <circle cx="12" cy="12.5" r="8.5" fill="url(#wl-mark-gradient)" opacity="0.92" />
        <circle cx="20.5" cy="14" r="7" fill="url(#wl-mark-gradient)" opacity="0.72" />
        <circle cx="15" cy="21" r="8" fill="url(#wl-mark-gradient)" opacity="0.55" />
      </svg>
    )
  }

  return (
    <span className={cn("font-display text-xl font-bold tracking-tight", className)}>
      Wonder&nbsp;Labs<span className="text-brand-blue">.</span>
    </span>
  )
}

export { Logo }
