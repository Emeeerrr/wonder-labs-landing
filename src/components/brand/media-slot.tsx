import { ImageIcon, PlayIcon } from "lucide-react"

import { cn } from "@/lib/utils"

type MediaSlotProps = {
  /** Qué pieza va aquí, p. ej. "Sesión de formación en vivo". */
  label: string
  kind?: "foto" | "video"
  /** Proporción CSS del material final, p. ej. "4/5" o "16/9". */
  aspect?: string
  tone?: "light" | "dark"
  className?: string
}

/**
 * Espacio reservado para una foto o un video reales del equipo (doc §8.5:
 * aún no hay fotografía ni versión pública de los videos). Mantiene la
 * proporción final para que el reemplazo no mueva el layout, y nombra en
 * pantalla la pieza que falta, de modo que el equipo pueda revisar la
 * composición antes de tener el material.
 */
// TODO(wonderlabs): reemplazar cada MediaSlot por la foto/video real (doc §8.5 y §10.6)
function MediaSlot({
  label,
  kind = "foto",
  aspect = "4/3",
  tone = "light",
  className,
}: MediaSlotProps) {
  const isVideo = kind === "video"
  const Icon = isVideo ? PlayIcon : ImageIcon
  const dark = tone === "dark"

  return (
    <figure
      className={cn(
        "relative overflow-hidden rounded-2xl border",
        dark ? "border-white/12" : "border-[var(--brand-timberwolf)]",
        className
      )}
      style={{
        aspectRatio: aspect,
        backgroundImage: dark
          ? "radial-gradient(circle at 78% 16%, color-mix(in srgb, var(--brand-blue) 22%, transparent), transparent 55%), linear-gradient(150deg, var(--brand-midnight), var(--brand-midnight-deep))"
          : "radial-gradient(circle at 78% 16%, color-mix(in srgb, var(--brand-blue) 14%, transparent), transparent 55%), linear-gradient(150deg, #ffffff, var(--brand-smoke) 70%)",
      }}
    >
      <div
        aria-hidden
        className={cn(
          "absolute inset-3 rounded-xl border border-dashed",
          dark ? "border-white/20" : "border-[color-mix(in_srgb,var(--brand-ink)_16%,transparent)]"
        )}
      />
      <div aria-hidden className="absolute inset-0 flex items-center justify-center">
        <span
          className={cn(
            "inline-flex size-12 items-center justify-center rounded-full",
            dark ? "text-brand-smoke bg-white/10" : "bg-brand-midnight/5 text-brand-midnight"
          )}
        >
          <Icon className="size-5" {...(isVideo ? { fill: "currentColor", strokeWidth: 0 } : {})} />
        </span>
      </div>
      <figcaption
        className={cn(
          "absolute bottom-4 left-5 text-xs font-medium",
          dark ? "text-brand-smoke/70" : "text-brand-ink/60"
        )}
      >
        {isVideo ? "Video" : "Foto"}: {label}
      </figcaption>
    </figure>
  )
}

export { MediaSlot }
