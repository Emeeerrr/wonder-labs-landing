import { Hero } from "@/components/sections/hero"

export default function Home() {
  return (
    <>
      <Hero />
      {/* TODO(task-4): ancla temporal para "Conoce cómo trabajamos"; la sección Ruta la reemplaza. */}
      <div id="ruta" aria-hidden />
    </>
  )
}
