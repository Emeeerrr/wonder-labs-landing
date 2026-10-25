import { readFile } from "node:fs/promises"
import { join } from "node:path"

import { ImageResponse } from "next/og"

import { SITE } from "@/content/site"

export const alt = SITE.name
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

/**
 * Bitter ExtraBold (800), empaquetado como .ttf estático en el repo
 * (`src/assets/fonts/bitter-extrabold.ttf`, instanciado desde el variable
 * font oficial de google/fonts) para que `ImageResponse` no dependa de red
 * en build time. Mismo peso que usa el resto del sitio para `font-display`
 * (`font-extrabold` = 800, ver hero). Licencia SIL Open Font License 1.1,
 * ver `src/assets/fonts/OFL.txt`.
 */
const bitterExtraBold = await readFile(join(process.cwd(), "src/assets/fonts/bitter-extrabold.ttf"))

export default async function Image() {
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
        fontFamily: "Bitter",
        position: "relative",
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
          fontWeight: 800,
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
      fonts: [{ name: "Bitter", data: bitterExtraBold, style: "normal", weight: 800 }],
    }
  )
}
