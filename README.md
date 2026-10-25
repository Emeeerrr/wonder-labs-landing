# WonderLabs — landing

Landing comercial de WonderLabs: home, `/servicios`, `/contacto` (formulario con server action) y páginas legales (`/legal/privacidad`, `/legal/terminos`). Next.js App Router con contenido en español (es_CO).

## Stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack)
- React 19
- TypeScript
- Tailwind CSS v4
- [Base UI](https://base-ui.com) + [shadcn](https://ui.shadcn.com) para primitivas accesibles (accordion, select, sheet, checkbox...)
- [motion](https://motion.dev) para animación e interacción (con soporte de `prefers-reduced-motion`)
- React Three Fiber + drei para la molécula 3D del hero
- react-hook-form + zod para el formulario de contacto
- Bun como runtime y gestor de paquetes

## Requisitos

- [Bun](https://bun.sh) 1.3+. Este proyecto usa únicamente `bun`/`bunx`; no hay `package-lock.json` ni `yarn.lock`.

## Desarrollo local

```bash
bun install
bun run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Scripts

| Comando                | Qué hace                                 |
| ---------------------- | ---------------------------------------- |
| `bun run dev`          | Servidor de desarrollo (Turbopack)       |
| `bun run build`        | Build de producción                      |
| `bun run start`        | Sirve el build de producción             |
| `bun run lint`         | ESLint (`eslint-config-next` + Prettier) |
| `bun run format`       | Formatea todo el repo con Prettier       |
| `bun run format:check` | Verifica formato sin escribir cambios    |
| `bun run typecheck`    | `tsc --noEmit`                           |

Antes de dar por cerrada una tarea, corre la verificación completa:

```bash
bun run build && bunx tsc --noEmit && bun run lint && bun run format:check
```

## Docker

El `Dockerfile` hace build multi-stage con `bun` y sirve con Next en modo `standalone` sobre `node:22-alpine`.

```bash
# Build + producción, puerto 3000
docker compose up web

# Desarrollo con hot reload (monta el repo como volumen), puerto 3001
docker compose --profile dev up dev
```

## Deploy en Vercel

El repo trae `vercel.json` (`framework: nextjs`), así que cualquiera de las dos vías funciona sin configuración adicional:

- **Git integration**: conecta el repo en el dashboard de Vercel; cada push a la rama por defecto dispara un deploy.
- **CLI**: `bunx vercel` (preview) o `bunx vercel --prod` (producción).

## Estructura de carpetas

```
src/
  app/                    Rutas (App Router): home, /servicios, /contacto, /legal/*,
                           sitemap.ts, robots.ts, icon.svg, opengraph-image.tsx
  assets/
    fonts/                 Bitter ExtraBold (.ttf) empaquetado para opengraph-image.tsx
                           (SIL Open Font License 1.1, ver OFL.txt)
  components/
    brand/                Primitivas de marca: Container, Section, Eyebrow, Logo, Reveal
    layout/                Header y Footer globales
    sections/              Secciones de la home y del formulario de contacto
    sections/servicios/    Secciones propias de /servicios (hero, etapas, FAQ, CTA)
    three/                 Molécula 3D del hero (React Three Fiber)
    ui/                     Primitivas shadcn/Base UI (accordion, select, sheet, field...)
  content/                 Copy del sitio tipado (site.ts, home.ts, servicios.ts)
  lib/                     Utilidades, schemas de zod, server actions, hooks
```

## Convenciones de marca y accesibilidad

- Paleta y tipografías de marca viven como tokens `--brand-*` en `src/app/globals.css`; las secciones oscuras usan la clase `.chapter-dark`, que remapea los tokens semánticos de shadcn.
- CTAs sobre Tangerine siempre usan texto `midnight-deep` (nunca blanco: el contraste blanco-sobre-tangerine es ~2.7:1, insuficiente para AA).
- Texto secundario sobre fondo oscuro usa `rgba(245,245,245,0.72)` como piso de contraste (~6.6:1 sobre Midnight).
- Toda animación con `motion` respeta `prefers-reduced-motion` vía el hook `useReducedMotionSafe` (`src/lib/use-reduced-motion-safe.ts`), que evita mismatches de hidratación entre servidor y cliente.
- Hay skip link ("Saltar al contenido") al `<main id="contenido">` como primer elemento enfocable de cada página.

## Pendientes de validación

Lo siguiente está marcado con comentarios `TODO(wonderlabs)` en el código y debe resolverse antes de publicar el sitio en producción:

- **Hero**: el titular definitivo (opción A) está pendiente de confirmación; las opciones B y C quedan documentadas en el borrador de copy.
- **Datos de contacto**: teléfono y correo directos del contacto comercial (`/contacto`), NIT y razón social (footer y páginas legales), canal de correo dedicado para solicitudes de habeas data.
- **Cifras y credenciales**: certificaciones, cursos y asesorías mencionadas en "Credenciales" (home) están pendientes de validación; logos de clientes pendientes de autorización.
- **Precios**: el precio del diagnóstico de madurez (`/servicios`) está sin confirmar.
- **Legales**: `/legal/privacidad` y `/legal/terminos` necesitan revisión de un abogado antes de publicarse, además de razón social y NIT.
- **Contratación pública**: modalidades (licitación, contratación directa, convenios) pendientes de detallar en la FAQ de `/servicios` una vez estén confirmadas.
- **Lead routing**: el server action de contacto (`src/lib/actions/contact.ts`) no está conectado a un destino real (correo/CRM); hoy solo valida y responde.
- **Plazo de respuesta**: el mensaje de confirmación del formulario dice "1 día hábil"; confirmar con el equipo comercial.
- **Redes sociales**: el footer no tiene enlaces a redes; agregar cuando existan.
- **SVGs de marca**: el isotipo (`src/components/brand/logo.tsx`, variante `mark`) y el favicon (`src/app/icon.svg`) son placeholders geométricos (tres círculos con degradé midnight→blue); reemplazar por los SVG oficiales del Brand Kit cuando estén disponibles.
- **Dominio**: `SITE.url` en `src/content/site.ts` es un placeholder (`https://wonderlabs.example`); actualizar con el dominio real antes de publicar (afecta metadata, sitemap y robots).
- **Fotos de equipo**: no hay fotografías reales del equipo en el sitio; pendiente de sesión de fotos.
