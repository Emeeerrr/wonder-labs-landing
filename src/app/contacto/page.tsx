import type { Metadata } from "next"

import { Container } from "@/components/brand/container"
import { Eyebrow } from "@/components/brand/eyebrow"
import { MediaSlot } from "@/components/brand/media-slot"
import { Reveal } from "@/components/brand/reveal"
import { Section } from "@/components/brand/section"
import { ContactForm } from "@/components/sections/contact-form"

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Agenda una reunión inicial sin costo. Te respondemos con una propuesta con alcance y cronograma a la medida.",
}

function ContactoPage() {
  return (
    <Section tone="light">
      <Container>
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-7">
            <Eyebrow>Contacto</Eyebrow>
            <h1 className="font-display mt-4 text-[clamp(2.25rem,4.5vw,3.25rem)] leading-[1.12] font-medium">
              Agenda la reunión inicial sin costo.
            </h1>
            <p className="text-muted-foreground mt-6 max-w-[56ch] text-lg">
              En una conversación con tu equipo directivo entendemos objetivos, retos y punto de
              partida. Después te presentamos una propuesta con alcance y cronograma a la medida.
            </p>

            <div className="mt-10">
              <ContactForm />
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-5">
            <div className="border-border bg-card flex flex-col gap-8 rounded-2xl border p-8">
              <MediaSlot label="Samuel Acosta" aspect="4/5" tone="light" />
              <div>
                <h2 className="font-display text-lg font-medium">Contacto comercial</h2>
                <p className="text-muted-foreground mt-2">Samuel Acosta, fundador</p>
                {/* TODO(wonderlabs): teléfono y correo directos de contacto comercial */}
              </div>

              <div>
                <h2 className="font-display text-lg font-medium">Dónde estamos</h2>
                <p className="text-muted-foreground mt-2">Medellín y Bogotá, Colombia</p>
              </div>

              <div className="border-border border-t pt-6">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Trabajamos con empresas privadas y entidades públicas en toda Colombia, de forma
                  presencial o virtual.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}

export default ContactoPage
