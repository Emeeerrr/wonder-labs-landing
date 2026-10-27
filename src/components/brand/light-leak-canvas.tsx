"use client"

import dynamic from "next/dynamic"

import type { LightLeakProps } from "./light-leak"

/*
 * WebGL2 solo existe en cliente: `ssr: false` deja el shader fuera del render
 * de servidor (en Next 15+ exige que este wrapper sea un Client Component).
 * El servidor no emite nada aquí, así que la sección que lo monta conserva su
 * propio fondo CSS como base sin JavaScript.
 */
const LightLeak = dynamic(() => import("./light-leak").then((m) => m.LightLeak), { ssr: false })

/** Light leak con carga diferida; el padre controla tamaño y posición. */
function LightLeakCanvas(props: LightLeakProps) {
  return <LightLeak {...props} />
}

export { LightLeakCanvas }
export type { LightLeakProps }
