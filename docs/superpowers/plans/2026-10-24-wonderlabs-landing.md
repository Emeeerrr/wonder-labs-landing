# WonderLabs Landing — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Landing pública de WonderLabs (consultora de IA, Colombia) en Next.js, lista para deploy en Vercel, con calidad visual de nivel awwwards.

**Architecture:** Next.js App Router estático (SSG), una home de secciones + páginas /servicios, /contacto y /legal/*. Componentes de sección en `src/components/sections`, primitivas de marca en `src/components/brand`, 3D aislado en `src/components/three` con import dinámico. Copy centralizado como constantes tipadas en `src/content`.

**Tech Stack:** Bun (package manager + runtime dev) · Next.js (latest, App Router, TypeScript estricto) · Tailwind CSS v4 · shadcn/ui · motion (motion/react) · three + @react-three/fiber + @react-three/drei · lucide-react · react-hook-form + zod · ESLint flat + Prettier (+ prettier-plugin-tailwindcss) · Docker multi-stage · Vercel.

## Global Constraints

**Fuente de verdad del contenido:** `C:\WonderLabs\WonderLabs_Landing_Borrador_v1.md` (el copy exacto ya está embebido en cada task — no inventes claims nuevos).

**Marca (verbatim del Brand Book):**
- Colores: Midnight Green `#003A45` (principal: fondos oscuros, titulares) · Blue Green `#00A0D8` (acentos, enlaces, degradés) · Vivid Tangerine `#F0801E` (SOLO CTAs y etiquetas de acción) · Timberwolf `#D2D3D3` (bordes, divisores) · White Smoke `#F5F5F5` (fondo claro) · Jet Black `#313130` (texto largo sobre claro). Derivado permitido para profundidad de degradé: `#01242C` (midnight-deep).
- Tipografía (next/font/google): **Bitter** (títulos; pesos 500/700/800) · **Manrope** (párrafos; 400–700) · **JetBrains Mono** (eyebrows, datos, labels técnicos).
- En TEXTOS la marca se escribe **"WonderLabs"** (una palabra). Solo el logotipo dice "Wonder Labs".
- Tono: tuteo ("tu empresa", "tu equipo"), frases cortas orientadas a resultado, sin jerga. Idioma: español (lang="es").

**Prohibido publicar (interno, del doc §10.3):** metas comerciales (3 clientes × 10M, +30 clientes/año, "firma más reconocida de LatAm"), horas de los socios, y los nombres Grupo Éxito / Falabella / Argos. Las cifras "+5 años" y "+50 clientes" SIEMPRE atribuidas a "nuestro equipo", nunca a WonderLabs como empresa. No usar logos de clientes.

**Datos de contacto reales no existen aún:** no inventar teléfonos, correos ni URLs de redes. El único canal es el formulario de /contacto. Donde el doc pide un dato faltante, dejar comentario `{/* TODO(wonderlabs): ... */}` en el código, nunca texto visible tipo "[por definir]".

**Accesibilidad (no negociable):** contraste ≥4.5:1 en texto, focus visible, `prefers-reduced-motion` respetado (desactiva morph 3D y reveals), navegación por teclado, jerarquía h1→h3 sin saltos, touch targets ≥44px, labels visibles en el formulario.

**Performance:** canvas 3D con `next/dynamic` (`ssr: false`) y DPR máx 1.75; todo lo bajo el fold con reveal lazy; `font-display: swap` (default de next/font); sin layout shift (reservar espacio); imágenes con next/image si se usan.

**Motion:** micro-interacciones 150–300ms, transiciones de sección ≤500ms, ease-out al entrar; nada de animaciones rápidas "baratas"; 1 momento orquestado (intro del hero) y reveals sutiles después; stagger 60–80ms.

**Verification cycle (reemplaza TDD para trabajo visual):** cada task termina con `bun run build` + `bunx tsc --noEmit` + `bun run lint` en verde. No escribir tests de humo que no afirmen nada (el build SSG ya falla si una página no renderiza). Commits frecuentes, mensajes en inglés convencional (`feat:`, `chore:`...), cada commit termina con la línea `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>`.

**Entorno:** Windows 11, shell Git Bash o PowerShell. Usar SIEMPRE `bun`/`bunx` (nunca npm/pnpm/npx). El repo está en `C:\WonderLabs\wonder-labs-landing`, rama de trabajo `feature/landing-v1`.

**Dirección de diseño (vinculante):**
- Página alterna "capítulos": Hero (oscuro) → El reto (claro) → La ruta (oscuro, inmersivo) → Para quién (claro) → Credenciales (claro) → Resultados (claro) → CTA final (oscuro).
- Elemento firma: **la molécula** — blob 3D orgánico con degradé Midnight→Blue Green en el hero; reaparece como orbes estáticos de degradé marcando los 4 nodos de la ruta.
- Display: Bitter 800, tracking -0.02em, tamaños clamp grandes (hero ~clamp(2.75rem,7vw,5.5rem)). Eyebrows: JetBrains Mono 12–13px uppercase tracking 0.18em en Blue Green (sobre oscuro) o Midnight (sobre claro).
- Numeración 01–04 SOLO en la ruta (secuencia real). Tangerine solo en CTAs primarios.
- Layout: contenedor max-w-[1200px], grid 12 col, secciones `py-24 md:py-32`, aire generoso tipo Sana Labs; jerarquía por tamaño y espacio, no por decoración.

---

### Task 1: Scaffold Next.js + toolchain (bun, Prettier, Docker, Vercel)

**Files:**
- Create: proyecto Next.js en la raíz del repo (`src/app/*`, `package.json`, etc. — generado)
- Create: `.prettierrc`, `.prettierignore`, `Dockerfile`, `.dockerignore`, `compose.yaml`, `vercel.json`
- Modify: `package.json` (scripts), `next.config.ts` (output standalone), `eslint.config.mjs` (prettier compat), `.gitignore` (añadir `.superpowers/`)
- Delete: assets demo de create-next-app que no se usen (`src/app/page.tsx` se reescribe en Task 3; limpiar svg demo de `public/`)

**Interfaces:**
- Produces: proyecto compilable con `bun run build`; alias `@/*` → `src/*`; shadcn inicializado con componentes `button, input, textarea, select, checkbox, label, form, accordion, sheet`; deps instaladas: `motion three @react-three/fiber @react-three/drei lucide-react react-hook-form zod @hookform/resolvers`.

- [ ] **Step 1: Scaffold.** Desde la raíz del repo (rama `feature/landing-v1`):

```bash
bunx --bun create-next-app@latest . --ts --tailwind --eslint --app --src-dir --import-alias "@/*" --use-bun --yes
```

Si create-next-app se queja por archivos existentes, verificar que solo existan `.git/`, `.gitignore` y `docs/` (ambos permitidos) y reintentar.

- [ ] **Step 2: Deps.**

```bash
bun add motion three @react-three/fiber @react-three/drei lucide-react react-hook-form zod @hookform/resolvers
bun add -d prettier prettier-plugin-tailwindcss eslint-config-prettier
```

- [ ] **Step 3: shadcn init + componentes.**

```bash
bunx --bun shadcn@latest init -y -b neutral
bunx --bun shadcn@latest add button input textarea select checkbox label form accordion sheet
```

- [ ] **Step 4: Prettier.** `.prettierrc`:

```json
{
  "semi": false,
  "singleQuote": false,
  "trailingComma": "es5",
  "printWidth": 100,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

`.prettierignore`: `node_modules`, `.next`, `bun.lock`, `docs`. Añadir `eslint-config-prettier` al final del array de `eslint.config.mjs`. Scripts en `package.json`: `"format": "prettier --write ."`, `"format:check": "prettier --check ."`, `"typecheck": "tsc --noEmit"`.

- [ ] **Step 5: next.config.ts** — añadir `output: "standalone"`.

- [ ] **Step 6: Docker.** `Dockerfile` multi-stage:

```dockerfile
# syntax=docker/dockerfile:1
FROM oven/bun:1 AS deps
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

FROM oven/bun:1 AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN bun run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 PORT=3000 HOSTNAME=0.0.0.0
RUN addgroup -S nodejs && adduser -S nextjs -G nodejs
COPY --from=build --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=build --chown=nextjs:nodejs /app/public ./public
USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
```

`.dockerignore`: `node_modules`, `.next`, `.git`, `docs`, `.superpowers`, `Dockerfile`, `compose.yaml`. `compose.yaml`:

```yaml
services:
  web:
    build: .
    ports:
      - "3000:3000"
  dev:
    image: oven/bun:1
    working_dir: /app
    volumes:
      - .:/app
    command: sh -c "bun install && bun run dev"
    ports:
      - "3001:3000"
    profiles: ["dev"]
```

- [ ] **Step 7: vercel.json** — `{ "$schema": "https://openapi.vercel.sh/vercel.json", "framework": "nextjs" }` (Vercel detecta bun por `bun.lock`).

- [ ] **Step 8: Gitignore.** Añadir `.superpowers/` al `.gitignore`.

- [ ] **Step 9: Verificar.** `bun run build && bunx tsc --noEmit && bun run lint` — todo en verde. `bun run format` para normalizar.

- [ ] **Step 10: Commits.** Separar en 2: `chore: scaffold next.js app with bun, tailwind v4 and shadcn/ui` (steps 1–3) y `chore: add prettier, docker and vercel config` (steps 4–8).

---

### Task 2: Tokens de marca, fuentes, Header y Footer

**Files:**
- Modify: `src/app/globals.css`, `src/app/layout.tsx`
- Create: `src/components/brand/logo.tsx`, `src/components/brand/container.tsx`, `src/components/brand/section.tsx`, `src/components/brand/eyebrow.tsx`, `src/components/layout/header.tsx`, `src/components/layout/footer.tsx`, `src/content/site.ts`

**Interfaces:**
- Produces:
  - CSS vars de marca en `:root`: `--brand-midnight: #003A45; --brand-midnight-deep: #01242C; --brand-blue: #00A0D8; --brand-tangerine: #F0801E; --brand-timberwolf: #D2D3D3; --brand-smoke: #F5F5F5; --brand-ink: #313130;` y mapeo de tokens shadcn (`--primary` → midnight, `--accent`/`--ring` → blue, fondo claro smoke). Clase utilitaria `.chapter-dark` que re-mapea tokens para secciones oscuras (fondo midnight-deep→midnight en degradé sutil, texto `#F5F5F5`, muted `rgba(245,245,245,0.64)`, bordes `rgba(245,245,245,0.14)`).
  - Fuentes expuestas como variables: `--font-display` (Bitter), `--font-sans` (Manrope), `--font-mono` (JetBrains Mono); en Tailwind v4 via `@theme inline` → `font-display`, `font-sans`, `font-mono`.
  - `<Container>` (max-w-[1200px] px-6 md:px-8 mx-auto), `<Section id tone="light"|"dark">` (py-24 md:py-32; tone dark aplica `.chapter-dark`), `<Eyebrow>` (mono uppercase 12px tracking-[0.18em], color según tono).
  - `<Logo variant="wordmark"|"mark">`: wordmark = "Wonder Labs" compuesto en Bitter 700 (texto, no imagen) con punto final en Blue Green; mark = SVG inline placeholder: cluster de 3 círculos orgánicos superpuestos con degradé midnight→blue (viewBox 0 0 32 32). Comentario `{/* TODO(wonderlabs): reemplazar por SVG oficial del Brand Kit */}`.
  - `src/content/site.ts` exporta `SITE = { name: "WonderLabs", description, url: "https://wonderlabs.example", nav: [{label:"Servicios", href:"/servicios"}, {label:"Formación", href:"/servicios#formacion"}, {label:"Contacto", href:"/contacto"}], cta: {label:"Agenda una reunión", href:"/contacto"} }` (description en Task 8).

- [ ] **Step 1: globals.css** — tokens arriba descritos + base: `body` fondo `--brand-smoke`, texto `--brand-ink`, `font-sans`; selection azul; `::focus-visible` ring blue 2px offset 2px; scrollbar discreto; `@media (prefers-reduced-motion: reduce)` mata transitions/animations largas.

- [ ] **Step 2: layout.tsx** — next/font/google: Bitter (`variable: "--font-display"`, weights 500/700/800), Manrope (`--font-sans`), JetBrains_Mono (`--font-mono`); `<html lang="es">`; metadata base provisional (title "WonderLabs"); body con las 3 variables.

- [ ] **Step 3: Header** (client component): fijo top, transparente sobre hero → al hacer scroll >24px pasa a glass (`backdrop-blur-md` + fondo midnight 70% + border-b white/10). Logo wordmark a la izquierda (link a `/`), nav center/right con los 3 links (Manrope 14px, hover Blue Green con underline offset animado 200ms), CTA botón tangerine (`bg-[--brand-tangerine]` hover darken 8%, texto white, rounded-full, px-5 h-11). Mobile (<768px): hamburguesa (lucide `Menu`) abre `Sheet` lado derecho fondo midnight con links grandes Bitter y CTA. Header siempre legible sobre fondo oscuro del hero (texto claro); en páginas de fondo claro el header lleva fondo midnight sólido desde el inicio (prop `solid`).

- [ ] **Step 4: Footer**: fondo `--brand-midnight-deep`, texto claro. Grid 12: col izq logo wordmark + frase "La unión entre el talento humano y el poder tecnológico." (Manrope, muted); col centro nav (Servicios, Formación, Contacto) + legal (Privacidad → /legal/privacidad, Términos → /legal/terminos); col der "Medellín · Bogotá · Colombia" + "Contacto comercial: Samuel Acosta · Fundador". Línea inferior: "© 2026 WonderLabs. Todos los derechos reservados." + aviso: "Claude, ChatGPT, Microsoft Copilot y Gemini son marcas de sus respectivos titulares." (11px, muted). Comentarios TODO para NIT/razón social y redes.

- [ ] **Step 5: Wire en layout** — Header y Footer en `layout.tsx` (Header con lógica de tono por defecto transparent; páginas claras usarán `<Header solid />`? No: simplificar — Header vive en cada page? No. Header global transparent→glass funciona sobre ambos tonos si el glass aparece desde 24px; en páginas claras el texto inicial sería claro sobre claro → solución: Header global SIEMPRE glass-midnight desde el inicio excepto en `/` donde empieza transparente. Implementar con prop desde un wrapper client que lee `usePathname()`).

- [ ] **Step 6: Verificar** `bun run build && bunx tsc --noEmit && bun run lint`. Commit: `feat: add brand tokens, typography, header and footer`.

---

### Task 3: Hero + molécula 3D

**Files:**
- Create: `src/components/three/molecule.tsx` (client), `src/components/three/molecule-canvas.tsx` (client, dynamic wrapper), `src/components/sections/hero.tsx`, `src/content/home.ts` (inicia con copy del hero)
- Modify: `src/app/page.tsx` (componer Header-safe hero; resto de secciones llegan en Tasks 4–5)

**Interfaces:**
- Consumes: `<Container>`, `<Eyebrow>`, tokens de Task 2.
- Produces: `<Hero />` autocontenido; `HOME` const en `src/content/home.ts` con `hero: { eyebrow, title, subtitle, ctaPrimary, ctaSecondary }`.

**Copy exacto (verbatim doc §2.1, titular opción A elegida para v1):**
- Eyebrow: `IA aplicada · Colombia`
- H1: `Llevamos la IA de la promesa a la operación.`
- Bajada: `Implementamos sistemas de IA y formamos a tus equipos para que la inteligencia artificial sea tu mayor ventaja competitiva.`
- CTA primario: `Agenda tu reunión inicial sin costo` → `/contacto`
- CTA secundario: `Conoce cómo trabajamos` → `#ruta` (scroll suave)
- Comentario en código: `{/* TODO(wonderlabs): titular opción A — confirmar con Samu (opciones B y C en el borrador §2.1) */}`

- [ ] **Step 1: Molécula 3D.** `molecule.tsx`: Canvas R3F `dpr={[1, 1.75]}` `gl={{ antialias: true, alpha: true }}` `camera={{ position: [0, 0, 5], fov: 40 }}`. Escena: esfera icosaedro `<Sphere args={[1.4, 96, 96]}>` con `MeshDistortMaterial` (drei): `distort 0.42`, `speed 1.6`, color base `#00546B` (mezcla midnight→blue), `roughness 0.18`, `metalness 0.1`; luces: ambient 0.4 + directional `#00A0D8` intensidad 2 desde [3,2,4] + point `#F0801E` intensidad 0.35 desde [-4,-2,-2] (el tangerine apenas besa el borde — eco del CTA); segundo blob pequeño (r 0.5, distort 0.3) orbitando lento abajo-izquierda, opacidad 0.85. `useFrame`: rotación muy lenta (0.05 rad/s) + parallax de mouse suave (lerp 0.05, amplitud ±0.15 rad). `useReducedMotion` (motion/react) o media query: si reduce → `distort 0`, `speed 0`, sin parallax (blob estático).
- [ ] **Step 2: Wrapper dinámico.** `molecule-canvas.tsx`: `next/dynamic` import de molecule, `ssr: false`, placeholder = div con radial-gradient midnight→blue blur 80px (misma silueta, evita CLS y sirve de fallback no-JS).
- [ ] **Step 3: Hero.** Sección full-viewport (`min-h-dvh`) fondo degradé `#01242C → #003A45` (160deg) + grano sutil (css noise opcional ≤3% opacidad). Grid 12: texto cols 1–7 (z-10), molécula posicionada cols 6–12 detrás (absolute right, ~56vw de ancho, overflow hidden, en mobile detrás del texto con opacidad 0.55 y menor tamaño). H1 en Bitter 800 `clamp(2.75rem,7vw,5.5rem)` leading-[1.02] tracking-tight texto `#F5F5F5`; la palabra `operación` envuelta en span con degradé text-clip blue→blue-light (único énfasis). Bajada Manrope 18–20px max-w-[52ch] muted. CTAs: primario botón tangerine rounded-full h-12 px-7 con `ArrowRight` (lucide) que se desplaza 4px en hover; secundario ghost claro con `ArrowDown`, scroll suave a `#ruta`. Indicador de scroll inferior (línea vertical 40px que pulsa, oculta en reduced-motion).
- [ ] **Step 4: Intro orquestada** (motion/react, solo primera carga): eyebrow fade 0.3s → líneas del H1 (dividir por `<br>` lógico o palabras clave) y+16 opacity stagger 80ms → bajada → CTAs → molécula fade+scale 0.96→1 (total ≤1.2s, ease-out). `useReducedMotion` → render final directo sin animación.
- [ ] **Step 5: page.tsx** — `<Hero />` + placeholders `<div id="ruta" />` temporal para el anchor (se reemplaza en Task 4).
- [ ] **Step 6: Verificar** build/typecheck/lint + commit `feat: add hero section with 3d molecule`.

---

### Task 4: Home — El reto, La ruta, Para quién

**Files:**
- Create: `src/components/sections/reto.tsx`, `src/components/sections/ruta.tsx`, `src/components/sections/para-quien.tsx`, `src/components/brand/reveal.tsx` (helper scroll-reveal con motion: fade + y 24px, 0.5s ease-out, `once`, respeta reduced-motion)
- Modify: `src/app/page.tsx`, `src/content/home.ts` (añadir `reto`, `ruta`, `paraQuien`)

**Interfaces:**
- Consumes: `<Section>`, `<Container>`, `<Eyebrow>`, `<Reveal>`.
- Produces: secciones listas; `ruta.tsx` expone `id="ruta"`.

**Copy exacto (doc §2.2–2.4):**

Reto (tone: light). Eyebrow `El reto`. H2: `La IA ya llegó a tu empresa. La adopción todavía no.` Intro: `Lo que vemos en organizaciones que empiezan a usar IA:`. 4 tarjetas (título / texto):
1. `Uso sin método` / `Cada persona usa la IA a su manera. Los resultados dependen de quién la use.`
2. `Riesgo con la información` / `Datos de clientes y documentos internos terminan en herramientas sin reglas claras.`
3. `Pilotos que no escalan` / `El equipo prueba, se entusiasma y a los pocos meses todo vuelve a como estaba.`
4. `Conocimiento en pocas personas` / `Lo que funciona vive en la cabeza de una o dos personas y se va con ellas.`
Cierre destacado (blockquote grande Bitter 500 con borde izquierdo blue): `Comprar licencias no es adoptar IA. La verdadera innovación no genera fricción, genera rendimiento.`

Ruta (tone: dark, `id="ruta"`). Eyebrow `Cómo trabajamos`. H2: `De la primera conversación a la autonomía.` 4 etapas (número mono / título Bitter / texto):
01 `Diagnóstico` / `Entendemos tu operación y priorizamos dónde la IA genera más retorno.`
02 `Formación` / `Programas de 2 a 3 meses para líderes y equipos.`
03 `Implementación` / `Sistemas de IA en tus procesos: espacios de trabajo, agentes y gobernanza.`
04 `Acompañamiento` / `Soporte mensual para sostener y ampliar la adopción.`
Nota bajo la lista: `Puedes empezar por cualquier etapa. Cada una se contrata por separado; juntas convierten la IA en tu forma de trabajar.` CTA link: `Ver servicios` → `/servicios` (flecha, estilo link blue).

Para quién (tone: light). Eyebrow `Para quién`. H2: `IA aplicada para empresas y entidades públicas.` 2 paneles:
- `Empresas` / `Trabajamos junto a directivos y equipos operativos de empresas medianas y grandes para que la adopción de la IA sea segura, fluida y orientada a resultados.`
- `Sector público` / `Acompañamos a entidades de gobierno a formar a sus equipos y adoptar la IA con reglas claras de uso, protección de datos y gobernanza.`

- [ ] **Step 1: Reveal helper** (`whileInView`, viewport `{ once: true, margin: "-80px" }`).
- [ ] **Step 2: Reto** — grid 2×2 (1 col mobile) de tarjetas: fondo white, borde Timberwolf, rounded-2xl, p-7; icono lucide por tarjeta (`Shuffle`, `ShieldAlert`, `FlaskConical`, `UserMinus`) 20px en Blue Green dentro de chip redondo `bg-[--brand-blue]/10`; hover: borde blue + translate-y-[-2px] 200ms. Stagger 60ms. Blockquote de cierre a ancho ~8 cols.
- [ ] **Step 3: Ruta** — capítulo oscuro inmersivo: línea vertical de progreso (desktop: izquierda de la lista; mobile: borde izq) que se dibuja con scroll (`useScroll` + `scaleY` spring de motion); cada etapa es fila grid: número mono grande (01–04, Blue Green, tabular), orbe degradé 12px (eco de la molécula) sobre la línea, título Bitter 700 28–32px, texto muted max-w-[46ch]. Reveal secuencial. Reduced-motion: línea completa estática.
- [ ] **Step 4: Para quién** — 2 paneles asimétricos (grid cols 6/6): cada panel rounded-3xl p-10, `Empresas` fondo white borde timberwolf, `Sector público` fondo midnight texto claro (contraste de pareja B2B/B2G); icono lucide (`Building2`, `Landmark`); mini-link en panel público `Habla con nuestro equipo` → `/contacto`.
- [ ] **Step 5: Componer en page.tsx** (quitar placeholder `#ruta`). Verificar + commit `feat: add reto, ruta and para-quien sections`.

---

### Task 5: Home — Credenciales, Resultados, CTA final

**Files:**
- Create: `src/components/sections/credenciales.tsx`, `src/components/sections/resultados.tsx`, `src/components/sections/cta-final.tsx`
- Modify: `src/app/page.tsx`, `src/content/home.ts`

**Copy exacto (doc §2.5–2.7):**

Credenciales (tone: light, variante banda — fondo white, borde y/divisores timberwolf). Eyebrow `Credenciales`. Cifras (mono tabular grande Bitter 800 48–64px + label Manrope):
- `+5` / `años aplicando la metodología de formación de nuestro equipo`
- `+50` / `clientes atendidos por nuestro equipo en Colombia, Estados Unidos y Latinoamérica`
Lista "Nuestro equipo cuenta con:" (4 items con `Check` lucide blue):
- `Certificaciones oficiales de Anthropic y Microsoft`
- `Instructores con cursos publicados en Platzi`
- `Asesoría al Gobierno de Colombia en la ley de inteligencia artificial`
- `Herramientas propias para las formaciones`
Comentario: `{/* TODO(wonderlabs): validar certificaciones, cursos y asesoría antes de publicar (doc §2.5); logos de clientes pendientes de autorización */}`

Resultados (tone: light). Eyebrow `Resultados`. H2: `Lo que gana tu organización.` 4 beneficios (título/texto):
- `Capacidad liberada` / `El tiempo que hoy se va en tareas repetitivas vuelve a tu equipo para pensar y atender más trabajo.`
- `Conocimiento institucionalizado` / `La forma de trabajar deja de depender de una o dos personas y queda en tu organización.`
- `Entregables más rápidos` / `Informes, propuestas y presentaciones salen más rápido y con la identidad de tu marca.`
- `IA segura y bajo control` / `Reglas claras sobre qué información se usa, quién decide y cómo se protege lo sensible.`

CTA final (tone: dark, reprise de la molécula como degradé radial estático de fondo). H2 Bitter 800 grande: `Hagamos que la IA trabaje para tu organización.` Texto: `En una reunión inicial sin costo entendemos qué necesitas y te presentamos una propuesta con alcance y cronograma a la medida.` Botón tangerine: `Agenda la reunión inicial` → `/contacto`.

- [ ] **Step 1: Credenciales** — layout asimétrico: cifras a la izquierda (2 bloques apilados con divisor), lista a la derecha; sin counter animado salvo count-up sutil con motion `useInView` (respetando reduced-motion → valor final directo).
- [ ] **Step 2: Resultados** — grid 2×2 tarjetas sin borde (solo fondo white + sombra xs), icono lucide (`Clock3`, `Library`, `Zap`→ NO: Zap es cliché — usar `FileCheck2`, y `ShieldCheck` para seguridad; set: `Clock3`, `Library`, `FileCheck2`, `ShieldCheck`).
- [ ] **Step 3: CTA final** — centrado, max-w-[700px], degradé radial blue/midnight de fondo + viñeta oscura; botón grande h-14.
- [ ] **Step 4: Componer, verificar, commit** `feat: add credentials, results and final cta sections`.

---

### Task 6: Página /servicios (4 etapas + formación completa)

**Files:**
- Create: `src/app/servicios/page.tsx`, `src/components/sections/servicios/*.tsx` (hero corto, etapa-diagnostico, etapa-formacion, etapa-implementacion, etapa-acompanamiento, faq), `src/content/servicios.ts`
- Modify: ninguno estructural

**Interfaces:**
- Consumes: primitivas de Task 2, `<Reveal>` de Task 4, shadcn `Accordion`.
- Produces: página completa `/servicios` con anclas `#diagnostico #formacion #implementacion #acompanamiento #faq`.

**Copy exacto (doc §4–5):**

Hero corto (dark, compacto py-24): Eyebrow `Servicios`. H1: `Una sola ruta, cuatro etapas.` Bajada: `Puedes empezar por cualquier etapa. Cada una se contrata por separado; juntas convierten la IA en tu forma de trabajar.` Sub-nav sticky de anclas (mono 12px): Diagnóstico · Formación · Implementación · Acompañamiento.

**Etapa 01 · Diagnóstico** (`id="diagnostico"`, light). H2: `Antes de invertir, saber dónde está el retorno.` Dos tarjetas:
- `Reunión inicial` · badge `Sin costo` (tangerine suave) · `Una conversación con tu equipo directivo para entender objetivos, retos y punto de partida.` · Resultado: `una propuesta con alcance y cronograma a la medida.`
- `Diagnóstico de madurez en IA` · badge `1 a 2 semanas` · `Evaluamos cómo usa hoy la IA tu organización: personas, procesos, herramientas y reglas.`
Entregables (3 items, `FileSearch`-style lucide icons): `Nivel de madurez en IA por área` / `Mapa de oportunidades priorizado por retorno` / `Hoja de ruta recomendada`. TODO comment: precio del diagnóstico pendiente (doc §4.1).

**Etapa 02 · Formación** (`id="formacion"`, dark). H2: `Formamos a tus equipos para operar con IA.` Bajada: `Programas de 2 a 3 meses, no talleres sueltos. En vivo, presencial o virtual. Formación inmersiva, interactiva y memorable.` Línea herramientas: `Trabajamos sobre la herramienta que ya usa tu organización: Claude, ChatGPT, Microsoft Copilot, Gemini u otras.` (texto plano, SIN logos de terceros).
Programa Liderazgo — card ancha: título `Programa Liderazgo — Decidir y liderar con IA`; meta rows: Para quién `CEOs, VPs, directores y líderes de área` · Formato `6 sesiones en vivo de 2 horas, en grupos reducidos` · Resultado `Cada líder sale con una hoja de ruta de IA para su área`. Temario numerado 1–6:
1. `Qué puede y qué no puede hacer la IA hoy en tu industria`
2. `Dónde está el valor: identificar y priorizar casos de uso`
3. `Datos, riesgos y gobernanza: las decisiones que le tocan a la dirección`
4. `Cómo liderar la adopción en tu equipo`
5. `Cómo medir el retorno de la IA`
6. `Cierre: cada líder presenta su hoja de ruta`
Programa Equipos — intro: `Para equipos de cualquier área. Usar la IA en el trabajo diario con método, criterio y seguridad. El formato se ajusta al tamaño de tu equipo y al nivel de personalización que necesites.` 3 modalidades (cards):
- `Estándar` / `Formación en una herramienta de IA, con ejercicios sobre el trabajo de cada participante.` / `8 sesiones · 90 min`
- `Personalizado` / `Todos los ejemplos y ejercicios construidos sobre la operación real de tu organización.` / `6 sesiones · 120 min`
- `Gran escala` / `Despliegue para cientos de personas en grupos paralelos, con sesiones presenciales y virtuales.` / `Varias semanas`
Bloque "Toda formación incluye" (5 items numerados — secuencia real del proceso):
1. `Práctica con casos reales — Sobre las tareas y documentos reales de tu equipo.`
2. `Progresión de nivel — Cada caso avanza de un primer resultado a una versión más sólida.`
3. `Evaluación del avance — Momentos de evaluación en los puntos clave.`
4. `Cierre con casos propios — Cada participante presenta lo que construyó.`
5. `Informe final — Resultados y nivel de adopción alcanzado.`

**Etapa 03 · Implementación** (`id="implementacion"`, light). H2: `IA a la medida, sobre las herramientas que ya usas.` 3 frentes (cards con lista "Incluye"):
- `Espacio de trabajo con IA` (sub `para los equipos`) / `La herramienta que ya usa tu organización, configurada para el trabajo diario.` / Incluye: `Controles de administrador · Espacios separados por área · Biblioteca de instrucciones · Asistentes a la medida · Entregables con tu marca`
- `Agentes y automatizaciones` (sub `para los procesos`) / `Flujos que conectan tus sistemas y automatizan tareas repetitivas.` / Incluye: `Conexión con correo, documentos y CRM · Tareas que se ejecutan solas · Menos trabajo manual y menos errores`
- `Gobernanza de IA` (sub `para crecer con orden`) / `Las reglas que hacen el uso de la IA seguro y sostenible.` / Incluye: `Comité de IA · Política de uso de IA · Manejo de información sensible, alineado con la Ley 1581 de 2012`
Sub-bloque "Cómo implementamos — cuatro fases hasta que tu equipo opere solo" (mini-timeline horizontal 1–4): `Mapeo — Mapeamos los procesos de tu equipo y priorizamos por retorno.` / `Construcción — Configuramos la base: espacio de trabajo, automatizaciones y reglas.` / `Adopción — Tu equipo trabaja sobre el sistema con acompañamiento cercano.` / `Autonomía — Tu equipo opera el sistema; nosotros quedamos como soporte.` Nota: `La duración de cada fase se define después del diagnóstico, según el alcance acordado.`

**Etapa 04 · Acompañamiento** (`id="acompanamiento"`, light con card dark? → light). H2: `La adopción no termina con el programa.` Intro: `Las herramientas de IA cambian cada mes. Te ayudamos a convertir esos cambios en trabajo mejor hecho. Se contrata mes a mes.` 5 items (icono + título + texto):
- `Sesión mensual de formación` / `Nuevas funciones y casos de uso para tu equipo.`
- `Nuevos casos de uso cada mes` / `Mejoras sobre lo que ya funciona.`
- `Soporte a tu equipo` / `Dudas resueltas y apoyo a los líderes de adopción.`
- `Reporte de adopción` / `Qué se usa, cuánto y con qué resultados.`
- `Comité de IA` / `Priorizamos juntos los siguientes pasos.`

**FAQ** (`id="faq"`, light, Accordion shadcn, 5 ítems — respuestas nuevas, tono corto y concreto):
1. `¿Necesito licencias de una herramienta de IA antes de empezar?` → `No. En el diagnóstico y las primeras sesiones trabajamos sobre lo que ya tienes. Si hace falta, te ayudamos a elegir la herramienta y el plan que le sirve a tu operación.`
2. `¿Las sesiones son presenciales o virtuales?` → `En vivo, presencial o virtual. Presencial en Medellín y Bogotá; virtual para el resto de Colombia y Latinoamérica.`
3. `¿Pueden formar a cientos de personas?` → `Sí. La modalidad Gran escala despliega la formación en grupos paralelos, presenciales y virtuales, durante varias semanas.`
4. `¿Trabajan con entidades públicas?` → `Sí. Formamos a servidores públicos y acompañamos la adopción con reglas claras de uso y protección de datos.` (TODO: modalidades de contratación pública)
5. `¿Qué pasa con la información de mi organización?` → `La tratamos según la Ley 1581 de 2012: usamos solo los datos necesarios para la formación y definimos contigo qué información puede entrar a las herramientas y cuál no.`

CTA de página: banda final `Cotiza un programa para tu equipo` → `/contacto` (botón tangerine).

- [ ] **Step 1–5:** construir secciones en orden, componer página con sub-nav sticky (scroll-spy simple con IntersectionObserver o CSS `scroll-margin-top`), metadata `title: "Servicios — WonderLabs"`.
- [ ] **Step 6: Verificar + commit** `feat: add servicios page with formacion programs and faq`.

---

### Task 7: /contacto + páginas legales + sitemap/robots

**Files:**
- Create: `src/app/contacto/page.tsx`, `src/components/sections/contact-form.tsx` (client), `src/lib/actions/contact.ts` (server action), `src/lib/schemas/contact.ts`, `src/app/legal/privacidad/page.tsx`, `src/app/legal/terminos/page.tsx`, `src/app/sitemap.ts`, `src/app/robots.ts`

**Copy /contacto (doc §7):** H1 `Agenda la reunión inicial sin costo.` Bajada: `En una conversación con tu equipo directivo entendemos objetivos, retos y punto de partida. Después te presentamos una propuesta con alcance y cronograma a la medida.` Lateral: `Contacto comercial — Samuel Acosta · Fundador` + `Medellín · Bogotá · Colombia`. (Sin teléfono/correo: TODO comments.)

**Schema zod (`src/lib/schemas/contact.ts`):**

```ts
import { z } from "zod"

export const contactSchema = z.object({
  nombre: z.string().min(2, "Escribe tu nombre y apellido."),
  cargo: z.string().min(2, "Escribe tu cargo."),
  organizacion: z.string().min(2, "Escribe el nombre de tu organización."),
  tipoOrganizacion: z.enum(["Empresa privada", "Entidad pública", "Otra"], {
    message: "Selecciona el tipo de organización.",
  }),
  tamanoEquipo: z.enum(["1–20", "20–200", "200–1.000", "+1.000"], {
    message: "Selecciona el tamaño del equipo.",
  }),
  correo: z.string().email("Escribe un correo corporativo válido."),
  telefono: z.string().optional(),
  interes: z
    .enum(["Diagnóstico", "Formación", "Implementación", "Acompañamiento", "No estoy seguro"])
    .optional(),
  herramienta: z
    .enum(["Claude", "ChatGPT", "Copilot", "Gemini", "Ninguna", "Otra"])
    .optional(),
  mensaje: z.string().max(2000).optional(),
  autorizacion: z.literal(true, {
    message: "Debes autorizar el tratamiento de datos para enviar la solicitud.",
  }),
  website: z.string().max(0).optional(), // honeypot
})

export type ContactInput = z.infer<typeof contactSchema>
```

**Server action:** `'use server'`; valida con `contactSchema.safeParse`; si honeypot lleno → `{ ok: true }` silencioso; TODO destino de leads (`// TODO(wonderlabs): conectar destino real de leads (correo/CRM) — doc §7`); `console.log` del lead; devuelve `{ ok: boolean, errors? }`. Simular latencia 600ms.

**Form UX:** react-hook-form + zodResolver + componentes shadcn `Form`; labels visibles; error bajo cada campo; asterisco en obligatorios; botón `Enviar solicitud` con estado loading (spinner lucide `LoaderCircle` animate-spin) y disabled; al éxito reemplazar el form por panel de confirmación: `¡Gracias! Te escribiremos en 1 día hábil para agendar la reunión.` (TODO plazo). Checkbox: `Autorizo el tratamiento de mis datos personales según la <Link href="/legal/privacidad">política de privacidad</Link>.` Inputs con `autocomplete` y tipos semánticos (`email`, `tel`). Focus al primer error tras submit fallido.

**Legales:** layout simple de prosa (max-w-[720px], Bitter para h1/h2, Manrope cuerpo, `Última actualización: octubre de 2026`).
- Privacidad: estructura Ley 1581/2012 + Decreto 1377/2013: Responsable (placeholder `WonderLabs` + TODO razón social/NIT), datos que recogemos (los del formulario), finalidades (responder solicitudes, agendar reuniones, enviar información comercial), derechos del titular (conocer, actualizar, rectificar, suprimir, revocar), canal de consultas (formulario de contacto, TODO correo), vigencia.
- Términos: uso del sitio, propiedad intelectual, aviso de marcas de terceros ("Claude, ChatGPT, Microsoft Copilot y Gemini son marcas de sus respectivos titulares; WonderLabs no está afiliada a ellas"), limitación de responsabilidad, ley aplicable (Colombia).
- Ambas con nota HTML comment: `{/* TODO(wonderlabs): revisión por abogado antes de publicar (doc §10.5) */}`

**sitemap.ts / robots.ts:** rutas `/`, `/servicios`, `/contacto`, `/legal/privacidad`, `/legal/terminos` sobre `SITE.url`; robots allow all + sitemap.

- [ ] Steps: schema → action → form → página contacto (grid: form 7 cols, lateral 5) → legales → sitemap/robots → verificar + commit `feat: add contact form, legal pages and seo routes`.

---

### Task 8: Polish — SEO, OG, favicon, accesibilidad, responsive, README

**Files:**
- Create: `src/app/icon.svg` (isotipo placeholder: 3 círculos orgánicos degradé midnight→blue sobre fondo transparente), `src/app/opengraph-image.tsx` (ImageResponse 1200×630: fondo degradé midnight-deep→midnight, wordmark "Wonder Labs" Bitter claro, tagline hero, orbe degradé blue), `README.md` (reescribir)
- Modify: `src/app/layout.tsx` + páginas (metadata final), `src/content/site.ts` (description final), ajustes de accesibilidad/responsive que surjan

**Metadata:**
- Base: title default `WonderLabs — IA aplicada para empresas y entidades públicas`, template `%s — WonderLabs`; description: `Implementamos sistemas de IA y formamos equipos en Colombia. Diagnóstico, formación, implementación y acompañamiento para que la IA sea tu ventaja competitiva.`; `metadataBase: new URL(SITE.url)`; openGraph locale `es_CO`, type website.
- /servicios: `Servicios` + description `Una ruta de cuatro etapas: diagnóstico, formación, implementación y acompañamiento. Programas de formación en IA para líderes y equipos.`
- /contacto: `Contacto` + description `Agenda una reunión inicial sin costo. Te respondemos con una propuesta con alcance y cronograma a la medida.`
- Legales: `noindex` opcional NO (indexables, es normal), titles `Política de privacidad` / `Términos y condiciones`.

**Checklist de cierre (ejecutar y corregir lo que falle):**
- [ ] Skip link "Saltar al contenido" (sr-only hasta focus) + `<main id="contenido">`.
- [ ] Verificar jerarquía headings por página (un solo h1).
- [ ] Focus visible en nav, acordeón, form, CTAs (sobre oscuro: ring blue-green claro).
- [ ] `prefers-reduced-motion`: molécula estática, reveals y count-up desactivados, scroll-cue oculto.
- [ ] Contraste: muted sobre midnight ≥4.5:1 (usar `rgba(245,245,245,0.72)` mínimo para texto informativo), tangerine sobre white solo en elementos grandes/CTA con texto blanco → verificar ratio texto-blanco-sobre-tangerine (#F0801E vs white = ~2.5:1 — INSUFICIENTE para texto pequeño: usar texto `#1F1203` o midnight-deep sobre tangerine, o tangerine más oscuro `#C9630F` de hover; decidir y aplicar consistente).
- [ ] Mobile 375px: hero legible, molécula no tapa texto, tablas de programas colapsan a cards, sub-nav sticky scrolleable horizontal.
- [ ] `touch-action: manipulation` en botones/links; targets ≥44px.
- [ ] Revisar que no exista ningún texto visible tipo "[POR COMPLETAR]" ni lorem ipsum; los pendientes viven solo en comentarios TODO(wonderlabs).
- [ ] Pase no-ai-slop sobre TODO el copy nuevo (microcopy, FAQ, legales, metas): sin "potenciar/impulsar/transformar" gratuitos, sin em-dashes decorativos, frases cortas, concretas.
- [ ] README.md: qué es, stack, `bun install && bun run dev`, scripts (dev/build/lint/format/typecheck), Docker (`docker compose up web` / perfil dev), deploy en Vercel (Git integration o `bunx vercel`), estructura de carpetas, sección **"Pendientes de validación"** con la lista de TODOs del borrador (hero definitivo, datos de contacto, cifras, certificaciones, legales con abogado, SVGs oficiales del Brand Kit, fotos equipo).
- [ ] Verificación final completa: `bun run build && bunx tsc --noEmit && bun run lint && bun run format:check`.
- [ ] Commit `feat: add seo metadata, og image, accessibility polish and readme` (separar en 2 commits si el diff es grande: polish a11y/responsive vs seo/readme).

---

## Post-plan (controller, fuera de tasks)

1. Review final de rama completa (superpowers:requesting-code-review) + wave de fixes si aplica.
2. Verificación visual con preview (screenshots 375/768/1440, light) por el controller.
3. Merge `feature/landing-v1` → `develop` (`--no-ff`). `main` queda para release.
4. Resumen al usuario con pendientes de validación.
