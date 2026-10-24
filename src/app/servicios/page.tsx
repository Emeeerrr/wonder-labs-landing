import type { Metadata } from "next"

import { EtapaAcompanamiento } from "@/components/sections/servicios/etapa-acompanamiento"
import { EtapaDiagnostico } from "@/components/sections/servicios/etapa-diagnostico"
import { EtapaFormacion } from "@/components/sections/servicios/etapa-formacion"
import { EtapaImplementacion } from "@/components/sections/servicios/etapa-implementacion"
import { Faq } from "@/components/sections/servicios/faq"
import { ServiciosCtaFinal } from "@/components/sections/servicios/cta-final"
import { ServiciosHero } from "@/components/sections/servicios/hero"

// TODO(task-8): description definitiva para metadata/OG (ver SEO final).
export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Diagnóstico, formación, implementación y acompañamiento en IA para empresas y entidades públicas en Colombia.",
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
