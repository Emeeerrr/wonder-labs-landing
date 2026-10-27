"use client"

import * as React from "react"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoaderCircleIcon } from "lucide-react"
import { Controller, useForm, type FieldErrors } from "react-hook-form"

import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldDescription, FieldError, FieldLabel, FieldSet } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { submitContact } from "@/lib/actions/contact"
import { contactSchema, type ContactInput } from "@/lib/schemas/contact"
import { cn } from "@/lib/utils"

const TIPO_ORGANIZACION_OPTIONS = ["Empresa privada", "Entidad pública", "Otra"] as const
const TAMANO_EQUIPO_OPTIONS = ["1–20", "20–200", "200–1.000", "+1.000"] as const
const INTERES_OPTIONS = [
  "Diagnóstico",
  "Formación",
  "Implementación",
  "Acompañamiento",
  "No estoy seguro",
] as const
const HERRAMIENTA_OPTIONS = ["Claude", "ChatGPT", "Copilot", "Gemini", "Ninguna", "Otra"] as const

const DEFAULT_VALUES: Partial<ContactInput> = {
  nombre: "",
  cargo: "",
  organizacion: "",
  correo: "",
  telefono: "",
  mensaje: "",
  website: "",
  autorizacion: undefined as unknown as true,
}

/** Clase compartida por todos los inputs de texto: altura táctil ≥44px. */
const controlClassName = "h-11 text-base md:text-base"

/**
 * Igual que `controlClassName`, pero para `SelectTrigger`: el componente base
 * fija su altura con `data-[size=default]:h-8`, que empata en especificidad
 * con un `h-11` plano y puede ganar según el orden de generación de Tailwind.
 * Se repite el mismo variant para asegurar la altura táctil ≥44px.
 */
const selectControlClassName = "data-[size=default]:h-11 text-base md:text-base"

/**
 * Formulario de /contacto. react-hook-form + zodResolver validan en el
 * cliente (modo `onTouched`: valida al salir de cada campo y luego en cada
 * cambio; `shouldFocusError` queda activo por defecto); el server action
 * `submitContact` vuelve a validar con el mismo esquema. Al enviar con éxito,
 * el formulario se reemplaza por un panel de confirmación que recibe el foco.
 */
function ContactForm() {
  const [isPending, setIsPending] = React.useState(false)
  const [isSubmitted, setIsSubmitted] = React.useState(false)
  const [submitError, setSubmitError] = React.useState(false)
  const formRef = React.useRef<HTMLFormElement>(null)
  const successRef = React.useRef<HTMLDivElement>(null)

  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
    defaultValues: DEFAULT_VALUES,
  })

  // Enfoca el primer campo inválido tras un submit fallido (cliente o servidor).
  // Para los Select (Base UI) `elements.namedItem(name)` resuelve al input
  // oculto que sincroniza el valor del formulario, no al trigger visible: no
  // es focusable y `.focus()` no hace nada. En ese caso caemos al trigger
  // real por id (`${name}-trigger`, ver los `SelectTrigger` más abajo).
  const focusFirstInvalidField = React.useCallback((fieldNames: Iterable<string>) => {
    const firstInvalidName = Array.from(fieldNames)[0]
    if (!firstInvalidName || !formRef.current) return

    const field = formRef.current.elements.namedItem(firstInvalidName)
    if (field instanceof HTMLElement && field.offsetParent !== null) {
      field.focus()
      return
    }

    const trigger = document.getElementById(`${firstInvalidName}-trigger`)
    if (trigger instanceof HTMLElement) {
      trigger.focus()
    }
  }, [])

  const onSubmit = React.useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      // Evita un segundo envío mientras el primero sigue en vuelo.
      if (isPending) return

      const onValid = async (data: ContactInput) => {
        setIsPending(true)
        setSubmitError(false)
        try {
          const result = await submitContact(data)

          if (!result.ok) {
            // Errores de campo → bajo cada campo. Sin ninguno aplicable, es un
            // fallo del servidor y nunca puede quedar en silencio.
            const fieldNames: string[] = []
            for (const [field, messages] of Object.entries(result.errors ?? {})) {
              if (messages?.[0]) {
                setError(field as keyof ContactInput, { type: "server", message: messages[0] })
                fieldNames.push(field)
              }
            }
            if (fieldNames.length > 0) {
              focusFirstInvalidField(fieldNames)
            } else {
              setSubmitError(true)
            }
            return
          }

          setIsSubmitted(true)
        } catch {
          setSubmitError(true)
        } finally {
          setIsPending(false)
        }
      }

      const onInvalid = (fieldErrors: FieldErrors<ContactInput>) => {
        // Un reintento inválido no debe dejar la alerta del envío anterior.
        setSubmitError(false)
        focusFirstInvalidField(Object.keys(fieldErrors))
      }

      void handleSubmit(onValid, onInvalid)(event)
    },
    [handleSubmit, setError, focusFirstInvalidField, isPending]
  )

  // El panel de éxito reemplaza al formulario: el foco se mueve a él para que
  // el lector de pantalla lo anuncie y el foco no quede en un nodo desmontado.
  React.useEffect(() => {
    if (isSubmitted) successRef.current?.focus()
  }, [isSubmitted])

  if (isSubmitted) {
    return (
      <div
        ref={successRef}
        role="status"
        tabIndex={-1}
        className="border-border bg-card flex flex-col gap-3 rounded-2xl border p-8 text-center outline-none md:p-10"
      >
        <p className="font-display text-xl font-medium md:text-2xl">
          ¡Gracias! Te escribiremos en 1 día hábil para agendar la reunión.
        </p>
        {/* TODO(wonderlabs): confirmar el plazo real de respuesta con el equipo comercial — doc §7 */}
      </div>
    )
  }

  return (
    <form ref={formRef} noValidate onSubmit={onSubmit} className="flex flex-col gap-8">
      <FieldSet>
        <Field>
          <FieldLabel htmlFor="nombre">
            Nombre y apellido <span aria-hidden>*</span>
          </FieldLabel>
          <Input
            id="nombre"
            type="text"
            autoComplete="name"
            className={controlClassName}
            aria-invalid={!!errors.nombre}
            aria-describedby={errors.nombre ? "nombre-error" : undefined}
            {...register("nombre")}
          />
          <FieldError id="nombre-error" errors={errors.nombre ? [errors.nombre] : undefined} />
        </Field>

        <Field>
          <FieldLabel htmlFor="cargo">
            Cargo <span aria-hidden>*</span>
          </FieldLabel>
          <Input
            id="cargo"
            type="text"
            autoComplete="organization-title"
            className={controlClassName}
            aria-invalid={!!errors.cargo}
            aria-describedby={errors.cargo ? "cargo-error" : undefined}
            {...register("cargo")}
          />
          <FieldError id="cargo-error" errors={errors.cargo ? [errors.cargo] : undefined} />
        </Field>

        <Field>
          <FieldLabel htmlFor="organizacion">
            Organización <span aria-hidden>*</span>
          </FieldLabel>
          <Input
            id="organizacion"
            type="text"
            autoComplete="organization"
            className={controlClassName}
            aria-invalid={!!errors.organizacion}
            aria-describedby={errors.organizacion ? "organizacion-error" : undefined}
            {...register("organizacion")}
          />
          <FieldError
            id="organizacion-error"
            errors={errors.organizacion ? [errors.organizacion] : undefined}
          />
        </Field>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="tipoOrganizacion-trigger">
              Tipo de organización <span aria-hidden>*</span>
            </FieldLabel>
            <Controller
              control={control}
              name="tipoOrganizacion"
              render={({ field }) => (
                <Select
                  name={field.name}
                  value={field.value ?? null}
                  onValueChange={(value) => field.onChange(value)}
                >
                  <SelectTrigger
                    id="tipoOrganizacion-trigger"
                    onBlur={field.onBlur}
                    className={cn("w-full", selectControlClassName)}
                    aria-invalid={!!errors.tipoOrganizacion}
                    aria-describedby={
                      errors.tipoOrganizacion ? "tipoOrganizacion-error" : undefined
                    }
                  >
                    <SelectValue placeholder="Selecciona una opción" />
                  </SelectTrigger>
                  <SelectContent>
                    {TIPO_ORGANIZACION_OPTIONS.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            <FieldError
              id="tipoOrganizacion-error"
              errors={errors.tipoOrganizacion ? [errors.tipoOrganizacion] : undefined}
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="tamanoEquipo-trigger">
              Tamaño del equipo <span aria-hidden>*</span>
            </FieldLabel>
            <Controller
              control={control}
              name="tamanoEquipo"
              render={({ field }) => (
                <Select
                  name={field.name}
                  value={field.value ?? null}
                  onValueChange={(value) => field.onChange(value)}
                >
                  <SelectTrigger
                    id="tamanoEquipo-trigger"
                    onBlur={field.onBlur}
                    className={cn("w-full", selectControlClassName)}
                    aria-invalid={!!errors.tamanoEquipo}
                    aria-describedby={errors.tamanoEquipo ? "tamanoEquipo-error" : undefined}
                  >
                    <SelectValue placeholder="Selecciona una opción" />
                  </SelectTrigger>
                  <SelectContent>
                    {TAMANO_EQUIPO_OPTIONS.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            <FieldError
              id="tamanoEquipo-error"
              errors={errors.tamanoEquipo ? [errors.tamanoEquipo] : undefined}
            />
          </Field>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="correo">
              Correo corporativo <span aria-hidden>*</span>
            </FieldLabel>
            <Input
              id="correo"
              type="email"
              autoComplete="email"
              className={controlClassName}
              aria-invalid={!!errors.correo}
              aria-describedby={errors.correo ? "correo-error" : undefined}
              {...register("correo")}
            />
            <FieldError id="correo-error" errors={errors.correo ? [errors.correo] : undefined} />
          </Field>

          <Field>
            <FieldLabel htmlFor="telefono">Teléfono</FieldLabel>
            <Input
              id="telefono"
              type="tel"
              autoComplete="tel"
              className={controlClassName}
              aria-invalid={!!errors.telefono}
              aria-describedby={errors.telefono ? "telefono-error" : undefined}
              {...register("telefono")}
            />
            <FieldError
              id="telefono-error"
              errors={errors.telefono ? [errors.telefono] : undefined}
            />
          </Field>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="interes-trigger">Interés principal</FieldLabel>
            <Controller
              control={control}
              name="interes"
              render={({ field }) => (
                <Select
                  name={field.name}
                  value={field.value ?? null}
                  onValueChange={(value) => field.onChange(value)}
                >
                  <SelectTrigger
                    id="interes-trigger"
                    onBlur={field.onBlur}
                    className={cn("w-full", selectControlClassName)}
                    aria-invalid={!!errors.interes}
                    aria-describedby={errors.interes ? "interes-error" : undefined}
                  >
                    <SelectValue placeholder="Selecciona una opción" />
                  </SelectTrigger>
                  <SelectContent>
                    {INTERES_OPTIONS.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            <FieldError id="interes-error" errors={errors.interes ? [errors.interes] : undefined} />
          </Field>

          <Field>
            <FieldLabel htmlFor="herramienta-trigger">Herramienta de IA que usan hoy</FieldLabel>
            <Controller
              control={control}
              name="herramienta"
              render={({ field }) => (
                <Select
                  name={field.name}
                  value={field.value ?? null}
                  onValueChange={(value) => field.onChange(value)}
                >
                  <SelectTrigger
                    id="herramienta-trigger"
                    onBlur={field.onBlur}
                    className={cn("w-full", selectControlClassName)}
                    aria-invalid={!!errors.herramienta}
                    aria-describedby={errors.herramienta ? "herramienta-error" : undefined}
                  >
                    <SelectValue placeholder="Selecciona una opción" />
                  </SelectTrigger>
                  <SelectContent>
                    {HERRAMIENTA_OPTIONS.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            <FieldError
              id="herramienta-error"
              errors={errors.herramienta ? [errors.herramienta] : undefined}
            />
          </Field>
        </div>

        <Field>
          <FieldLabel htmlFor="mensaje">Mensaje</FieldLabel>
          <Textarea
            id="mensaje"
            rows={5}
            className="text-base md:text-base"
            aria-invalid={!!errors.mensaje}
            aria-describedby={errors.mensaje ? "mensaje-error" : undefined}
            {...register("mensaje")}
          />
          <FieldError id="mensaje-error" errors={errors.mensaje ? [errors.mensaje] : undefined} />
        </Field>

        {/* Honeypot: oculto para personas, visible para formularios automáticos. */}
        <div aria-hidden="true" className="sr-only">
          <label htmlFor="website">No completar este campo</label>
          <input
            id="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...register("website")}
          />
        </div>

        <Field orientation="horizontal" className="min-h-11 items-start py-1.5">
          <Controller
            control={control}
            name="autorizacion"
            render={({ field }) => (
              <Checkbox
                id="autorizacion"
                checked={field.value === true}
                onCheckedChange={(checked) => field.onChange(checked)}
                onBlur={field.onBlur}
                aria-invalid={!!errors.autorizacion}
                aria-describedby={errors.autorizacion ? "autorizacion-error" : undefined}
                className="mt-0.5"
              />
            )}
          />
          <FieldLabel htmlFor="autorizacion" className="min-h-11 items-start py-1.5 font-normal">
            Autorizo el tratamiento de mis datos personales según la{" "}
            <Link href="/legal/privacidad" className="underline underline-offset-4">
              política de privacidad
            </Link>
            . <span aria-hidden>*</span>
          </FieldLabel>
        </Field>
        <FieldError
          id="autorizacion-error"
          errors={errors.autorizacion ? [errors.autorizacion] : undefined}
        />
      </FieldSet>

      <FieldDescription>Los campos marcados con * son obligatorios.</FieldDescription>

      {submitError && (
        <p role="alert" className="text-destructive text-sm font-normal">
          No pudimos enviar tu solicitud. Inténtalo de nuevo. Si sigue fallando, escríbenos.
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="group bg-brand-tangerine text-brand-midnight-deep inline-flex h-12 min-h-11 w-full items-center justify-center gap-2 rounded-full px-7 text-base font-semibold transition-colors duration-200 ease-out hover:bg-[color-mix(in_srgb,var(--brand-tangerine)_92%,black)] disabled:cursor-not-allowed disabled:opacity-60 md:w-auto md:min-w-48"
      >
        {isPending && <LoaderCircleIcon className="size-4 shrink-0 animate-spin" aria-hidden />}
        {isPending ? "Enviando..." : "Enviar solicitud"}
      </button>
    </form>
  )
}

export { ContactForm }
