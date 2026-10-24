import { ImageResponse } from "next/og"

import { SITE } from "@/content/site"

export const alt = SITE.name
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

/**
 * Bitter 700 no está empaquetado como binario en el repo (solo se carga vía
 * next/font/google en el árbol de React normal). `ImageResponse` necesita los
 * bytes de la fuente directamente, así que se intenta traerlos de Google
 * Fonts en build time; si la red no está disponible (build aislado/offline)
 * se cae a un serif de sistema con tracking ajustado para no perder peso de
 * marca. TODO(wonderlabs): empaquetar el .ttf de Bitter en el repo para que
 * el build no dependa de red.
 */
async function loadBitterBold(): Promise<ArrayBuffer | null> {
  try {
    const cssResponse = await fetch(
      "https://fonts.googleapis.com/css2?family=Bitter:wght@700&display=swap",
      { headers: { "User-Agent": "Mozilla/5.0" } }
    )
    const css = await cssResponse.text()
    const match = css.match(/src: url\(([^)]+)\) format\('truetype'\)/)
    const fontUrl = match?.[1]
    if (!fontUrl) return null

    const fontResponse = await fetch(fontUrl)
    return await fontResponse.arrayBuffer()
  } catch {
    return null
  }
}

export default async function Image() {
  const bitterBold = await loadBitterBold()

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
        backgroundImage:
          "linear-gradient(160deg, #01242C, #003A45), radial-gradient(circle at 78% 30%, rgba(0,160,216,0.45), transparent 60%)",
        backgroundBlendMode: "normal, screen",
        fontFamily: bitterBold ? "Bitter" : "Georgia, 'Times New Roman', serif",
      }}
    >
      {/* Orbe degradé: eco de la molécula del hero, blue sobre midnight. */}
      <div
        style={{
          position: "absolute",
          top: "-120px",
          right: "-120px",
          width: "520px",
          height: "520px",
          borderRadius: "50%",
          backgroundImage: "radial-gradient(circle at 35% 30%, #00A0D8, #003A45)",
          opacity: 0.8,
        }}
      />

      <span
        style={{
          fontFamily: "monospace",
          fontSize: 24,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "rgba(245,245,245,0.72)",
        }}
      >
        IA aplicada · Colombia
      </span>

      <span
        style={{
          marginTop: 28,
          fontSize: 84,
          fontWeight: 700,
          color: "#F5F5F5",
          letterSpacing: "-0.01em",
        }}
      >
        Wonder Labs
      </span>

      <span
        style={{
          marginTop: 24,
          maxWidth: 820,
          fontSize: 32,
          lineHeight: 1.35,
          color: "rgba(245,245,245,0.82)",
        }}
      >
        Llevamos la IA de la promesa a la operación.
      </span>
    </div>,
    {
      ...size,
      fonts: bitterBold
        ? [{ name: "Bitter", data: bitterBold, style: "normal", weight: 700 }]
        : undefined,
    }
  )
}
