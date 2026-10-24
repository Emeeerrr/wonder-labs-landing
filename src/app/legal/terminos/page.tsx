import type { Metadata } from "next"

import { Container } from "@/components/brand/container"
import { Section } from "@/components/brand/section"

// TODO(task-8): description definitiva para metadata/OG (ver SEO final).
export const metadata: Metadata = {
  title: "Términos y condiciones",
  description: "Términos y condiciones de uso del sitio web de WonderLabs.",
}

function TerminosPage() {
  return (
    <Section tone="light">
      <Container>
        <article className="prose mx-auto max-w-[720px]">
          <h1 className="font-display text-[clamp(2rem,4vw,2.75rem)] font-extrabold tracking-tight">
            Términos y condiciones de uso
          </h1>
          <p className="text-muted-foreground mt-2 text-sm">
            Última actualización: octubre de 2026
          </p>

          <div className="mt-10 flex flex-col gap-8 text-base leading-relaxed">
            <section>
              <h2 className="font-display mt-0 text-xl font-bold">1. Aceptación de los términos</h2>
              <p>
                {/* TODO(wonderlabs): completar razón social y NIT antes de publicar — doc §10.5 */}
                Estos términos y condiciones regulan el acceso y uso del sitio web de WonderLabs. Al
                navegar este sitio o enviar el formulario de contacto, aceptas estos términos. Si no
                estás de acuerdo, te pedimos no usar el sitio.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold">2. Uso del sitio</h2>
              <p>
                Este sitio tiene fines informativos y comerciales: presentar los servicios de
                WonderLabs y permitir que personas interesadas se pongan en contacto con nosotros.
                Te comprometes a usarlo de forma lícita, sin intentar vulnerar su seguridad, enviar
                información falsa a través del formulario de contacto, ni usarlo para fines
                distintos a los previstos.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold">3. Propiedad intelectual</h2>
              <p>
                Los textos, gráficos, logotipos, marca y demás contenidos de este sitio son
                propiedad de WonderLabs o se usan con la autorización correspondiente, y están
                protegidos por las normas de propiedad intelectual vigentes en Colombia. No está
                permitida su reproducción, distribución o uso comercial sin autorización previa y
                escrita de WonderLabs.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold">4. Marcas de terceros</h2>
              <p>
                Claude, ChatGPT, Microsoft Copilot y Gemini son marcas de sus respectivos titulares;
                WonderLabs no está afiliada a ellas. Las mencionamos en este sitio únicamente con
                fines informativos, para describir las herramientas de inteligencia artificial sobre
                las que podemos prestar nuestros servicios de formación e implementación.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold">5. Limitación de responsabilidad</h2>
              <p>
                La información publicada en este sitio es de carácter general y no constituye una
                propuesta comercial vinculante ni asesoría legal, financiera o técnica. WonderLabs
                no garantiza que el sitio esté libre de errores o interrupciones, y no será
                responsable por daños derivados del uso o la imposibilidad de uso de este sitio,
                salvo en los casos en que la ley disponga lo contrario.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold">6. Enlaces a terceros</h2>
              <p>
                Este sitio puede incluir enlaces a sitios de terceros. WonderLabs no controla ni se
                hace responsable por el contenido, las políticas o las prácticas de esos sitios.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold">7. Modificaciones</h2>
              <p>
                WonderLabs puede actualizar estos términos en cualquier momento para reflejar
                cambios normativos, operativos o en los servicios ofrecidos. La versión vigente es
                siempre la publicada en esta página, con su fecha de última actualización.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold">8. Ley aplicable y jurisdicción</h2>
              <p>
                Estos términos se rigen por las leyes de la República de Colombia. Cualquier
                controversia derivada de su interpretación o aplicación se someterá a los jueces y
                tribunales competentes de Colombia.
              </p>
            </section>
          </div>

          {/* TODO(wonderlabs): revisión por abogado antes de publicar (doc §10.5) */}
        </article>
      </Container>
    </Section>
  )
}

export default TerminosPage
