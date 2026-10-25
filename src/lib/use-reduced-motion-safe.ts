"use client"

import * as React from "react"

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)"

function subscribeReducedMotion(onChange: () => void) {
  const mql = window.matchMedia(REDUCED_MOTION_QUERY)
  mql.addEventListener("change", onChange)
  return () => mql.removeEventListener("change", onChange)
}

/**
 * `useReducedMotion()` de motion lee matchMedia de forma síncrona en el primer
 * render de cliente pero devuelve null en SSR; ramificar props/JSX con ese
 * valor desincroniza el HTML del servidor y la hidratación para usuarios con
 * reduced-motion. `useSyncExternalStore` garantiza que servidor y render de
 * hidratación coincidan siempre (snapshot de servidor: false) y aplica la
 * preferencia real inmediatamente después de hidratar, sin mismatch.
 */
function useReducedMotionSafe() {
  return React.useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => false
  )
}

export { useReducedMotionSafe }
