import { Credenciales } from "@/components/sections/credenciales"
import { CtaFinal } from "@/components/sections/cta-final"
import { ParaQuien } from "@/components/sections/para-quien"
import { Resultados } from "@/components/sections/resultados"
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
      <Credenciales />
      <Resultados />
      <CtaFinal />
    </>
  )
}
