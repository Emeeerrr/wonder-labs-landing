import { Container } from "@/components/brand/container"
import { Eyebrow } from "@/components/brand/eyebrow"
import { MediaSlot } from "@/components/brand/media-slot"
import { Reveal } from "@/components/brand/reveal"
import { Section } from "@/components/brand/section"
import { SERVICIOS } from "@/content/servicios"

/**
 * Etapa 02 · Formación: capítulo oscuro, el más denso de la página. Intro +
 * línea de herramientas (texto plano, sin logos de terceros) → Programa
 * Liderazgo (card ancha con meta rows + temario numerado 1–6) → Programa
 * Equipos (intro + 3 tarjetas de modalidad) → "Toda formación incluye"
 * (5 pasos numerados, secuencia real del proceso).
 */
function EtapaFormacion() {
  const { formacion } = SERVICIOS

  return (
    <Section id="formacion" tone="dark" className="scroll-mt-32 md:scroll-mt-36">
      <Container>
        <Reveal>
          <Eyebrow>{formacion.eyebrow}</Eyebrow>
          <h2 className="font-display mt-4 max-w-[26ch] text-[clamp(2rem,4vw,3rem)] leading-[1.12] font-medium">
            {formacion.title}
          </h2>
          <p className="text-muted-foreground mt-6 max-w-[62ch] text-lg md:text-xl">
            {formacion.subtitle}
          </p>
          <p className="text-muted-foreground mt-4 max-w-[62ch] text-sm leading-relaxed">
            {formacion.herramientas}
          </p>
        </Reveal>

        <Reveal delay={0.06} className="mt-12">
          <MediaSlot
            label="Programa Equipos, sesión presencial"
            aspect="16/9"
            tone="dark"
            className="md:max-w-[82%]"
          />
        </Reveal>

        {/* Programa Liderazgo */}
        <Reveal delay={0.08} className="mt-16">
          <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 md:p-10">
            <h3 className="font-display text-2xl font-medium md:text-[1.75rem]">
              {formacion.liderazgo.title}
            </h3>

            <dl className="mt-8 grid grid-cols-1 gap-6 border-t border-white/10 pt-8 md:grid-cols-3">
              {formacion.liderazgo.meta.map((row) => (
                <div key={row.label}>
                  <dt className="text-muted-foreground text-xs font-semibold">{row.label}</dt>
                  <dd className="mt-2 text-base leading-relaxed">{row.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-10 border-t border-white/10 pt-8">
              <h4 className="font-display text-lg font-medium">
                {formacion.liderazgo.temarioTitle}
              </h4>
              <ol className="mt-5 flex flex-col gap-4">
                {formacion.liderazgo.temario.map((item, index) => (
                  <li key={item} className="flex items-start gap-4">
                    <span className="text-brand-blue font-mono text-sm font-semibold tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-base leading-relaxed">{item}</span>
                  </li>
                ))}
              </ol>
            </div>
          </article>
        </Reveal>

        {/* Programa Equipos */}
        <Reveal delay={0.1} className="mt-16">
          <h3 className="font-display text-2xl font-medium md:text-[1.75rem]">
            {formacion.equipos.title}
          </h3>
          <p className="text-muted-foreground mt-4 max-w-[62ch] text-base leading-relaxed md:text-lg">
            {formacion.equipos.intro}
          </p>

          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
            {formacion.equipos.modalidades.map((modalidad, index) => (
              <Reveal key={modalidad.title} delay={index * 0.06}>
                <article className="h-full rounded-2xl border border-white/10 bg-white/[0.04] p-7">
                  <h4 className="font-display text-xl font-medium">{modalidad.title}</h4>
                  <p className="text-muted-foreground mt-3 text-base leading-relaxed">
                    {modalidad.text}
                  </p>
                  <p className="text-brand-blue mt-5 text-xs font-semibold">{modalidad.meta}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Reveal>

        {/* Toda formación incluye */}
        <Reveal delay={0.12} className="mt-16 border-t border-white/10 pt-12">
          <h3 className="font-display text-2xl font-medium">{formacion.incluye.title}</h3>
          <ol className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            {formacion.incluye.items.map((item, index) => (
              <li key={item.title} className="flex items-start gap-4">
                <span className="text-brand-blue font-mono text-sm font-semibold tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-muted-foreground mt-1 text-base leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </Container>
    </Section>
  )
}

export { EtapaFormacion }
