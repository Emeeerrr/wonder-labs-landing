"use client"

import dynamic from "next/dynamic"

/**
 * Silueta estática de la molécula: glow radial midnight→blue difuminado.
 * Ocupa el mismo contenedor que el canvas (evita CLS mientras carga el bundle
 * de three) y queda como fallback si no hay JavaScript.
 */
function MoleculeGlow() {
  return (
    <div
      aria-hidden
      className="h-full w-full"
      style={{
        background:
          "radial-gradient(closest-side at 55% 46%, color-mix(in srgb, var(--brand-blue) 45%, var(--brand-midnight)) 0%, var(--brand-midnight) 55%, transparent 74%)",
        filter: "blur(80px)",
      }}
    />
  )
}

/*
 * three + R3F solo tienen sentido en cliente: `ssr: false` evita mandar el
 * bundle al render de servidor y el placeholder mantiene la composición.
 * (En Next 15+ `ssr: false` exige que este wrapper sea un Client Component.)
 */
const Molecule = dynamic(() => import("@/components/three/molecule").then((mod) => mod.Molecule), {
  ssr: false,
  loading: () => <MoleculeGlow />,
})

/** Molécula 3D con carga diferida; el padre controla tamaño y posición. */
function MoleculeCanvas() {
  return <Molecule />
}

export { MoleculeCanvas }
