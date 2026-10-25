import type { Metadata } from "next"

import { EtapaAcompanamiento } from "@/components/sections/servicios/etapa-acompanamiento"
import { EtapaDiagnostico } from "@/components/sections/servicios/etapa-diagnostico"
import { EtapaFormacion } from "@/components/sections/servicios/etapa-formacion"
import { EtapaImplementacion } from "@/components/sections/servicios/etapa-implementacion"
import { Faq } from "@/components/sections/servicios/faq"
import { ServiciosCtaFinal } from "@/components/sections/servicios/cta-final"
import { ServiciosHero } from "@/components/sections/servicios/hero"

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Una ruta de cuatro etapas: diagnóstico, formación, implementación y acompañamiento. Programas de formación en IA para líderes y equipos.",
}

export default function Servicios() {
  return (
    <>
      <ServiciosHero />
      <EtapaDiagnostico />
      <EtapaFormacion />
      <EtapaImplementacion />
      <EtapaAcompanamiento />
      <Faq />
      <ServiciosCtaFinal />
    </>
  )
}
