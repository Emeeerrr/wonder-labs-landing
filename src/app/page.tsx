import { ParaQuien } from "@/components/sections/para-quien"
import { Reto } from "@/components/sections/reto"
import { Ruta } from "@/components/sections/ruta"
import { Hero } from "@/components/sections/hero"

export default function Home() {
  return (
    <>
      <Hero />
      <Reto />
      <Ruta />
      <ParaQuien />
    </>
  )
}
