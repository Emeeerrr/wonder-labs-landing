import type { Metadata } from "next"
import Link from "next/link"

import { Container } from "@/components/brand/container"
import { Section } from "@/components/brand/section"

export const metadata: Metadata = {
  title: "Política de privacidad",
  description: "Política de tratamiento de datos personales de WonderLabs.",
}

function PrivacidadPage() {
  return (
    <Section tone="light">
      <Container>
        <article className="mx-auto max-w-[720px]">
          <h1 className="font-display text-[clamp(2rem,4vw,2.75rem)] leading-[1.12] font-medium">
            Política de tratamiento de datos personales
          </h1>
          <p className="text-muted-foreground mt-2 text-sm">
            Última actualización: octubre de 2026
          </p>

          <div className="mt-10 flex flex-col gap-8 text-base leading-relaxed">
            <section>
              <h2 className="font-display mt-0 mb-3 text-xl font-medium">
                1. Responsable del tratamiento
              </h2>
              <p>
                {/* TODO(wonderlabs): completar razón social y NIT antes de publicar — doc §10.5 */}
                WonderLabs (&ldquo;WonderLabs&rdquo;, &ldquo;nosotros&rdquo;) es responsable del
                tratamiento de los datos personales que recoge a través de este sitio web, de
                conformidad con la Ley 1581 de 2012, el Decreto 1377 de 2013 y las demás normas que
                los desarrollen o modifiquen.
              </p>
            </section>

            <section>
              <h2 className="font-display mb-3 text-xl font-medium">2. Datos que recogemos</h2>
              <p>
                A través del formulario de{" "}
                <Link href="/contacto" className="underline underline-offset-4">
                  contacto
                </Link>{" "}
                recogemos los datos que la persona titular decide suministrar voluntariamente:
                nombre y apellido, cargo, organización, tipo de organización, tamaño del equipo,
                correo corporativo, teléfono (opcional), interés principal (opcional), herramienta
                de inteligencia artificial que usa hoy (opcional) y el mensaje que escriba
                (opcional). No recogemos datos sensibles ni datos de menores de edad a través de
                este formulario.
              </p>
            </section>

            <section>
              <h2 className="font-display mb-3 text-xl font-medium">
                3. Finalidades del tratamiento
              </h2>
              <p className="mb-3">Los datos recogidos se usan únicamente para:</p>
              <ul className="flex list-disc flex-col gap-2 pl-5">
                <li>Responder a la solicitud de contacto enviada por el titular.</li>
                <li>Agendar y gestionar reuniones comerciales con el titular o su organización.</li>
                <li>
                  Enviar información comercial sobre los servicios de WonderLabs, cuando el titular
                  lo haya autorizado expresamente.
                </li>
                <li>Elaborar propuestas, cronogramas y alcance de los servicios solicitados.</li>
              </ul>
              <p className="mt-3">
                No usamos los datos para finalidades distintas a las aquí descritas, ni los cedemos
                a terceros sin autorización previa del titular, salvo requerimiento de autoridad
                competente.
              </p>
            </section>

            <section>
              <h2 className="font-display mb-3 text-xl font-medium">4. Derechos del titular</h2>
              <p>
                Como titular de los datos, tienes derecho a conocer, actualizar, rectificar y
                suprimir tus datos personales, así como a revocar la autorización otorgada para su
                tratamiento, en los términos del artículo 8 de la Ley 1581 de 2012. Para ejercer
                estos derechos puedes escribirnos a través del{" "}
                <Link href="/contacto" className="underline underline-offset-4">
                  formulario de contacto
                </Link>
                {/* TODO(wonderlabs): canal de correo dedicado para solicitudes de habeas data */},
                indicando el derecho que deseas ejercer y los datos que permitan identificarte.
                Responderemos tu solicitud dentro de los plazos establecidos por la ley.
              </p>
            </section>

            <section>
              <h2 className="font-display mb-3 text-xl font-medium">
                5. Seguridad de la información
              </h2>
              <p>
                Implementamos medidas técnicas, humanas y administrativas razonables para proteger
                los datos personales que tratamos contra pérdida, acceso no autorizado, uso
                indebido, alteración o divulgación.
              </p>
            </section>

            <section>
              <h2 className="font-display mb-3 text-xl font-medium">6. Vigencia</h2>
              <p>
                Los datos personales se conservarán durante el tiempo necesario para cumplir las
                finalidades descritas en esta política, y posteriormente durante el plazo que exijan
                las normas aplicables en materia comercial, contable o de archivo. Esta política
                rige a partir de su fecha de última actualización y podrá ser modificada para
                reflejar cambios normativos o en nuestras prácticas de tratamiento de datos.
              </p>
            </section>
          </div>

          {/* TODO(wonderlabs): revisión por abogado antes de publicar (doc §10.5) */}
        </article>
      </Container>
    </Section>
  )
}

export default PrivacidadPage
