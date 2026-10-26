"use client"

import * as React from "react"
import { MeshDistortMaterial, Sphere } from "@react-three/drei"
import { Canvas, useFrame } from "@react-three/fiber"
import { useReducedMotion } from "motion/react"
import { MathUtils } from "three"
import type { Group, Mesh } from "three"

/*
 * La molécula: un organismo de gradiente vivo, no una bola tech brillante.
 * Esfera distorsionada en la mezcla midnight→blue, iluminada en azul desde
 * arriba-derecha; el point light tangerine (eco del CTA) apenas besa el borde
 * inferior-izquierdo. Un segundo blob pequeño orbita lento abajo-izquierda.
 */

/** Anclaje del blob secundario (abajo-izquierda, levemente al fondo). */
const BLOB_ANCHOR = { x: -1.7, y: -1.15, z: -0.6 } as const

/** Amplitud del parallax de mouse en radianes (±0.15). */
const PARALLAX_AMPLITUDE = 0.15

/** Factor de lerp por frame del parallax. */
const PARALLAX_LERP = 0.05

/** Velocidad de rotación base de la esfera principal (rad/s). */
const SPIN_SPEED = 0.05

function MoleculeScene({ reduce }: { reduce: boolean }) {
  const tiltRef = React.useRef<Group>(null)
  const spinRef = React.useRef<Group>(null)
  const blobRef = React.useRef<Mesh>(null)
  // Posición del puntero normalizada a [-1, 1] sobre el viewport completo
  // (el canvas es pointer-events: none; escuchamos en window).
  const pointer = React.useRef({ x: 0, y: 0 })
  const parallax = React.useRef({ x: 0, y: 0 })

  React.useEffect(() => {
    if (reduce) return
    const onPointerMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener("pointermove", onPointerMove, { passive: true })
    return () => window.removeEventListener("pointermove", onPointerMove)
  }, [reduce])

  useFrame((state, delta) => {
    if (reduce) return
    const t = state.clock.elapsedTime

    // Parallax suave: el grupo entero se inclina hacia el mouse.
    parallax.current.x = MathUtils.lerp(
      parallax.current.x,
      pointer.current.y * PARALLAX_AMPLITUDE,
      PARALLAX_LERP
    )
    parallax.current.y = MathUtils.lerp(
      parallax.current.y,
      pointer.current.x * PARALLAX_AMPLITUDE,
      PARALLAX_LERP
    )
    if (tiltRef.current) {
      tiltRef.current.rotation.x = parallax.current.x
      tiltRef.current.rotation.y = parallax.current.y
    }

    // Rotación muy lenta de la esfera principal.
    if (spinRef.current) {
      spinRef.current.rotation.y += SPIN_SPEED * delta
    }

    // Órbita lenta del blob secundario alrededor de su anclaje.
    if (blobRef.current) {
      blobRef.current.position.x = BLOB_ANCHOR.x + Math.cos(t * 0.3) * 0.18
      blobRef.current.position.y = BLOB_ANCHOR.y + Math.sin(t * 0.3) * 0.14
    }
  })

  return (
    <>
      <ambientLight intensity={0.35} />
      {/* Hemisferio cielo-azul / suelo-midnight: envuelve la esfera en el degradé de marca. */}
      <hemisphereLight args={["#00A0D8", "#01242C", 0.8]} />
      <directionalLight color="#00A0D8" intensity={2.6} position={[3, 2, 4]} />
      {/*
       * decay 0 conserva la intensidad del spec con las unidades físicas
       * de three (con decay 2 la atenuación a ~5 unidades la haría invisible).
       */}
      <pointLight color="#F0801E" intensity={0.45} decay={0} position={[-4, -2, -2]} />

      <group ref={tiltRef}>
        <group ref={spinRef}>
          <Sphere args={[1.4, 96, 96]} position={[0.1, 0.1, 0]}>
            <MeshDistortMaterial
              color="#0B6B8C"
              distort={reduce ? 0 : 0.42}
              speed={reduce ? 0 : 1.6}
              roughness={0.32}
              metalness={0.1}
            />
          </Sphere>
        </group>
        <Sphere
          ref={blobRef}
          args={[0.5, 64, 64]}
          position={[BLOB_ANCHOR.x, BLOB_ANCHOR.y, BLOB_ANCHOR.z]}
        >
          <MeshDistortMaterial
            color="#0A6080"
            distort={reduce ? 0 : 0.3}
            speed={reduce ? 0 : 1.6}
            roughness={0.3}
            metalness={0.1}
            transparent
            opacity={0.85}
          />
        </Sphere>
      </group>
    </>
  )
}

/**
 * Canvas R3F de la molécula. Con `prefers-reduced-motion` queda estática:
 * distort/speed 0, sin parallax ni órbita, y frameloop bajo demanda.
 */
function Molecule() {
  /*
   * A diferencia del hero (que normaliza el hook vía estado + efecto para no
   * desincronizar SSR e hidratación), aquí `?? false` es seguro: este
   * componente nunca se renderiza en servidor (import dinámico con
   * `ssr: false`), así que no existe HTML de SSR con el que el primer render
   * de cliente pueda discrepar.
   */
  const reduce = useReducedMotion() ?? false

  return (
    <Canvas
      className="h-full w-full"
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 5], fov: 40 }}
      frameloop={reduce ? "demand" : "always"}
    >
      <MoleculeScene reduce={reduce} />
    </Canvas>
  )
}

export { Molecule }
