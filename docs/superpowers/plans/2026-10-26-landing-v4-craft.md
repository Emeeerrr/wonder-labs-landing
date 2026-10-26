# Landing v4 — capa de oficio (rama feature/landing-v4-craft)

Fecha: 2026-10-26. Base: feature/landing-v3-editorial (a961c8d). Pedido del usuario: rediseño de absolutamente todo el sitio para que se vea hecho por profesionales de UX/UI y frontend, usando el shader de light leak de shadcn.io, con subagentes, sin merge a develop.

## Diagnóstico

La v3 eliminó los patrones de diseño generado (eyebrows mono caps, reveals al scroll, flechas, extrabold, esfera 3D) y dejó una base editorial sobria. Lo que falta no es más limpieza: es la **capa de oficio** que distingue una página profesional de un wireframe bonito:

1. **Atmósfera**: los capítulos oscuros son planos. El light leak (luz cálida de película sangrando sobre midnight) les da materia. La tangerine de marca ES un color de light leak natural.
2. **Interacción real**: las filas de la ruta no hacen nada al pasar el mouse — y las etapas tienen anclas reales en /servicios. Afordancia falsa en unas partes, afordancia ausente en otras.
3. **Momentos diseñados**: el footer es utilitario, el 404 es el default de Next, el header no marca la ruta activa.
4. **Estados del formulario**: enviar/éxito/error existen pero sin diseño intencional.

## Contrato de diseño (anti-ui-slop)

- Usuario primario: directivo de empresa mediana/grande o entidad pública en Colombia evaluando un socio de adopción de IA. Acción primaria: agendar la reunión inicial. Contenido: el copy verbatim del borrador. Restricción: cero datos inventados.
- La jerarquía v3 se conserva: 3 actos (oscuro problema → claro método → oscuro cierre), Bitter 500 como voz, última línea del H1 en cursiva azul.
- El shader aparece SOLO en los bookends oscuros (hero y CTA final de cada página que los tenga): el acto claro queda limpio. Dos instancias máximo por página.
- Toda interacción visible es real: nada de hover sobre elementos inertes; todo lo clickeable tiene hover + focus-visible + cursor correcto.

## Global Constraints

Binding para TODOS los tasks. El reviewer las recibe como lente.

1. **Gestor de paquetes**: bun/bunx exclusivamente. Jamás npm/npx/pnpm.
2. **Copy**: el texto visible viene verbatim de `src/content/home.ts`, `src/content/servicios.ts`, `src/content/site.ts` — NO reescribir ni re-puntuar copy existente. Microcopy nuevo (estados, 404): es-CO, tuteo, caja de oración, concreto; prohibidos em dashes (—), puntos medios (·), MAYÚSCULAS sostenidas, flechas (→) en CTAs/links, y las palabras/patrones vetados por no-ai-slop.
3. **Marca**: Tangerine `#F0801E` SOLO en CTAs como color de UI, siempre con texto `#01242C` (blanco sobre tangerine prohibido, falla contraste). Carve-out (ruling del controller tras el review del Task 1): la luz ambiental del shader LightLeak usa tangerine como color de leak — es atmósfera derivada del acento de marca, no un elemento de interfaz, y no compite con la señal de los CTAs. Azul `#00A0D8` para acentos y links. Piso de contraste AA: en capítulos oscuros el muted es `rgba(245,245,245,0.72)`; texto sobre el shader debe seguir cumpliendo AA (leaks sesgados lejos del texto, intensidad contenida).
4. **Prohibiciones de patrón** (reintroducir cualquiera = defecto): eyebrow mono en mayúsculas, animaciones de entrada al scroll (el componente `Reveal` es un passthrough estático y así se queda), flechas pegadas a CTAs, puntos medios como separador, count-up de cifras, grids de tarjetas con chips de icono, `font-extrabold tracking-tight`, glows radiales CSS decorativos, acentos de una sola palabra en titulares (la línea cursiva azul del H1 es el único acento bendecido).
5. **Tipografía**: display Bitter 400/500/700 + cursiva (títulos en 500, tracking normal); cuerpo Manrope; JetBrains Mono solo para datos (números de etapa). Nada de pesos 800.
6. **Motion**: solo (a) la intro de carga del hero, (b) feedback a acciones del usuario (hover/focus/press, 150-300ms), (c) el shader como fondo ambiental — que debe pausarse fuera de viewport y quedar en frame estático con `prefers-reduced-motion`. Cualquier uso de motion/react en árboles SSR usa `useReducedMotionSafe` (`src/lib/use-reduced-motion-safe.ts`), nunca el hook crudo.
7. **Performance**: cero dependencias nuevas de runtime (el shader es WebGL2 a mano, sin three ni vgpu). El canvas se monta con `next/dynamic` `ssr: false`. DPR cap 2. rAF solo cuando visible (IntersectionObserver + visibilitychange). Server components por defecto; "use client" solo donde hay estado/efectos.
8. **a11y**: canvas `aria-hidden`; `:focus-visible` visible en todo interactivo; jerarquía de encabezados sin saltos; touch targets ≥44px; `cursor-pointer` en clickeables.
9. **Verificación por task**: `bun run build && bunx tsc --noEmit && bun run lint && bun run format` en verde antes de commitear. Commits convencionales en español terminando con `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>`.
10. **Git**: todo en `feature/landing-v4-craft`. Jamás tocar develop/main. No push.
11. **Next 16**: ante cualquier duda de API de Next, leer la guía en `node_modules/next/dist/docs/` (ver AGENTS.md). Un bloque AGENTS.md re-aparece solo — no pelear con él.
12. **Datos**: no inventar métricas, testimonios, logos ni contactos. Los `TODO(wonderlabs)` existentes se conservan.

## Task 1: Componente LightLeak y hero de la home

**Crear `src/components/brand/light-leak.tsx`** — réplica funcional del LightLeakShader de shadcn.io (su instalador está detrás de login; misma API pública para que un swap futuro sea drop-in), en WebGL2 puro, cero dependencias.

Props (todas opcionales):

```ts
type LightLeakProps = {
  backgroundColor?: string // default "#01242C"
  leakColor?: string // default "#F0801E" (borde del leak)
  glowColor?: string // default "#FFAB5C" (medio cálido)
  hotColor?: string // default "#FFF3DE" (núcleo quemado)
  intensity?: number // 0-2, default 1 (exposición)
  grain?: number // 0-1, default 0.35 (grano de película)
  speed?: number // default 1; 0 congela
  leaks?: 1 | 2 | 3 // default 2
  quality?: number // 0.25-1, default 1 (escala de render)
  paused?: boolean // default false
  fallback?: string // CSS background si no hay WebGL2
  className?: string
  children?: React.ReactNode
}
```

Estructura DOM: `<div data-slot="light-leak" data-state="running|paused|unsupported" className={cn("relative overflow-hidden", className)}>` con `<canvas aria-hidden className="absolute inset-0 size-full">` y `{children}` en un wrapper `relative z-10` (solo si hay children). El div raíz lleva `style={{ background: fallbackResuelto }}` SIEMPRE (es lo que se ve antes del primer frame, sin WebGL2 y sin JS cuando el caller lo renderiza server-side vía wrapper dinámico). Fallback default: `radial-gradient(120% 90% at 85% 12%, color-mix(in srgb, LEAK 26%, transparent), transparent 60%), linear-gradient(170deg, #012A33, BG)` con LEAK/BG = props.

Shader (fragment, GLSL ES 3.00). Uniforms: `u_time, u_res (vec2), u_bg, u_leak, u_glow, u_hot (vec3), u_intensity, u_grain, u_speed` y `u_leaks (int)`. Receta exacta:

- `hash(vec2)` clásico (`fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453)`) y `noise(vec2)` value noise con smoothstep; `fbm` de 3 octavas.
- Coordenadas `uv = gl_FragCoord.xy / u_res`, `p = uv` con aspecto corregido (`p.x *= u_res.x / u_res.y`).
- Anclas de leaks SESGADAS AL CUADRANTE DERECHO/SUPERIOR (el texto vive a la izquierda): leak 0 en `vec2(aspect * 0.88, 0.78)`, leak 1 en `vec2(aspect * 0.70, 0.12)`, leak 2 en `vec2(aspect * 1.02, 0.35)`. Cada ancla deriva lento: `ancla += 0.06 * vec2(sin(t * 0.21 + i * 2.1), cos(t * 0.17 + i * 1.3))` con `t = u_time * u_speed`.
- Campo por leak: distancia anisótropa alargada en diagonal — `d = length((p - ancla) * vec2(0.85, 1.55))` — deformada con fbm: `d += 0.22 * fbm(p * 2.6 + t * 0.05 + float(i) * 7.0) - 0.11`. Contribución `f = smoothstep(0.78, 0.0, d)`; acumular `field = max(field, f)` y también `soft += f * 0.5`.
- Color: partir de `col = u_bg` más una respiración mínima de fondo (`u_bg * 0.35 * fbm(p * 1.4 - t * 0.02)` sumada). Ramp: `col = mix(col, u_leak, smoothstep(0.08, 0.55, field))`, luego `col = mix(col, u_glow, smoothstep(0.42, 0.8, field))`, luego `col = mix(col, u_hot, smoothstep(0.78, 0.98, field))`. Exposición: `col *= u_intensity` SOLO sobre la parte añadida (aplicar como `col = u_bg + (col - u_bg) * u_intensity`). Tonemap suave: `col = 1.0 - exp(-col * 1.4)`.
- Grano: `g = (hash(gl_FragCoord.xy + fract(t) * 61.0) - 0.5) * u_grain * 0.10; col += g;`
- Salida `vec4(col, 1.0)`.

Runtime:

- Parse de colores hex (#rgb/#rrggbb) a vec3 lineal-ish (no gestionar sRGB estricto; dividir por 255 basta). Si un color no parsea, usar el default.
- `getContext("webgl2", { antialias: false, alpha: false, powerPreference: "low-power" })`. Si null → `data-state="unsupported"`, no canvas visible (el background CSS del div queda).
- Tamaño: ResizeObserver sobre el div; `canvas.width = ancho * dpr * quality` con `dpr = Math.min(devicePixelRatio, 2)`; redondear; `gl.viewport`.
- Loop: rAF solo cuando (a) IntersectionObserver reporta visible, (b) `document.visibilityState === "visible"`, (c) `!paused`, (d) `speed !== 0`, (e) sin reduced motion. `matchMedia("(prefers-reduced-motion: reduce)")`: si reduce, dibujar UN frame con `u_time = 12.0` y no animar (y escuchar cambios del media query). `paused` o `speed 0` → dibujar frame actual y detener. Al pausar, `data-state="paused"`.
- `webglcontextlost` → preventDefault, parar loop, `data-state="unsupported"` (background CSS cubre). Cleanup completo en unmount (cancelAnimationFrame, observers, loseContext si existe la extensión).
- El tiempo arranca en un offset aleatorio (`Math.random() * 40`) para que cada carga se vea distinta.

**Crear `src/components/brand/light-leak-canvas.tsx`**: wrapper `"use client"` que hace `next/dynamic(() => import("./light-leak").then(m => m.LightLeak), { ssr: false })` y re-exporta con el mismo tipo de props (patrón del viejo molecule-canvas). Los callers server-side usan este wrapper; como `ssr: false` no renderiza nada en servidor, el section caller debe mantener su propio background CSS de base para no-JS.

**Modificar `src/components/sections/hero.tsx`**: detrás del contenido (entre el fondo y el Container), montar `<div aria-hidden className="absolute inset-0"><LightLeakCanvas className="size-full" intensity={0.55} grain={0.3} speed={0.7} leaks={2} /></div>`. La sección conserva su `bg-[linear-gradient(...)]` actual como base no-JS y elimina el NOISE_TEXTURE CSS (el shader trae grano propio; sin WebGL2 el grano CSS no se extraña). El contenido existente (H1, bajada, CTAs, MediaSlot video) NO cambia — mismo copy, mismas clases, misma intro. El canvas queda bajo `Container` (`relative z-10` ya existe).

Verificación: ciclo completo en verde + en el navegador: el hero muestra leaks cálidos arriba a la derecha, el texto de la izquierda se lee igual que antes (contraste intacto), consola sin errores. Commit.

## Task 2: Bookends oscuros — CTA final de home y servicios, y continuidad del acto I

**`src/components/sections/cta-final.tsx` (home)**: convertir la Section dark en el segundo momento del shader. Estructura: `<Section tone="dark" className="relative overflow-hidden">`, dentro un `<div aria-hidden className="absolute inset-0"><LightLeakCanvas intensity={0.8} grain={0.3} speed={0.6} leaks={2} className="size-full" /></div>` y el `<Container className="relative z-10">` con el contenido actual intacto (Eyebrow, h2, texto, botón tangerine). La Section mantiene su fondo `.chapter-dark` como base no-JS.

**`src/components/sections/servicios/cta-final.tsx`**: mismo tratamiento exacto (misma intensidad y props) para que el cierre de /servicios pertenezca a la misma familia.

**`src/components/sections/reto.tsx`**: SIN shader (el acto I solo lo lleva el hero; el reto es lectura). Única corrección: el arco de fondo — hoy hero termina en midnight y reto pinta midnight→deep; revisar que la unión no muestre banda. Si la hay, fijar `[--chapter-from:var(--brand-midnight)]` explícito o ajustar el gradiente del hero. Nada más.

Contraste: en ambos CTA finales el texto va a la izquierda y los leaks viven a la derecha/arriba; verificar en navegador que título y párrafo mantienen lectura limpia. Si un leak invade la zona de texto, bajar `intensity` a 0.65 antes que mover el layout.

Verificación: ciclo + navegador (home completa y /servicios final). Commit.

## Task 3: Interacción real — filas de la ruta como enlaces, ruta activa en el header, pulido del acto claro

**`src/components/sections/ruta.tsx`**: cada etapa YA tiene ancla real en /servicios (`#diagnostico`, `#formacion`, `#implementacion`, `#acompanamiento` — verificar los ids exactos en `src/components/sections/servicios/etapa-*.tsx` antes de escribir los hrefs). Convertir cada `<li>` en fila-enlace: el `<li>` envuelve un `<Link href="/servicios#...">` display block/grid que contiene número, título y texto (el grid actual se mueve al Link; el li queda como wrapper de lista). Hover: fondo de fila `bg-[color-mix(in_srgb,var(--brand-blue)_6%,transparent)]` + título subrayado `decoration-brand-blue decoration-2 underline-offset-4` (aparece en hover, `transition-colors`); focus-visible: el ring global sobre el Link. `cursor-pointer` implícito en Link. El mapeo número→ancla: 01→#diagnostico, 02→#formacion, 03→#implementacion, 04→#acompanamiento. La nota y el link "Ver servicios" actuales se conservan.

**`src/components/layout/header.tsx`**: estado de ruta activa. Con `usePathname()` (ya importado): el item cuyo `href` coincide con el pathname actual (o es prefijo para subrutas, p. ej. /servicios) recibe `aria-current="page"` y `text-brand-blue`; los demás quedan como están. Aplicar en nav desktop y en el sheet móvil.

**`src/components/sections/credenciales.tsx`**: las dos cifras (`+5`, `+50`) pasan a cursiva (`italic`) manteniendo peso 500 — eco del acento cursivo del H1. Nada más cambia.

**Pulido menor del acto claro** (solo si el ciclo de verificación lo permite sin riesgo): en `src/components/sections/media-strip.tsx` y `resultados.tsx` revisar en navegador 375px y 1024px que no haya desbordes ni huecos raros; corregir solo lo observable.

Verificación: ciclo + navegador (hover/focus de filas con teclado y mouse, aria-current presente, cifras en cursiva). Commit.

## Task 4: Footer diseñado, 404 propia y metadata

**`src/components/layout/footer.tsx`**: rediseño como momento de cierre. Estructura nueva dentro del mismo `chapter-dark` sólido deep:

1. Bloque superior: wordmark grande tipográfico — `<p aria-hidden className="font-display font-medium text-[clamp(2.5rem,8vw,6rem)] leading-none">Wonder Labs<span className="text-brand-blue">.</span></p>` (decorativo; el Logo linkeado existente se conserva en el bloque de abajo para navegación). Debajo a la derecha (en desktop), el tagline actual "La unión entre el talento humano y el poder tecnológico." en `text-muted-foreground`.
2. Bloque medio: las columnas actuales (Logo + nav + legal + ubicación/contacto) se conservan con su contenido EXACTO (incluidos los TODO comments).
3. Barra inferior: las dos líneas legales actuales.

Separaciones con `border-white/10`. Sin iconos nuevos, sin redes (TODO existente se queda como comment).

**Crear `src/app/not-found.tsx`**: página 404 propia, capítulo oscuro a viewport (`chapter-dark min-h-[70vh]` aprox): número `404` en Bitter 500 cursiva grande con el punto en azul, línea `Esta página no existe.` como h1 (font-display), párrafo corto `Puede que el enlace esté roto o que la página se haya movido.`, dos acciones: Link a `/` con el estilo de link subrayado del sitio ("Volver al inicio") y Link a `/contacto` como botón tangerine estándar ("Habla con nuestro equipo"). Header/footer llegan solos por el layout. Microcopy exacto el citado aquí (cumple constraint 2).

**`src/app/layout.tsx`**: exportar `viewport` con `themeColor: "#01242C"` (Next 16: `import type { Viewport }`; verificar API exacta en `node_modules/next/dist/docs/` si hay duda). No tocar nada más del layout.

Verificación: ciclo + navegador (footer en home, /ruta-inexistente muestra la 404 propia). Commit.

## Task 5: Subpáginas — hero de servicios con shader y estados del formulario

**`src/components/sections/servicios/hero.tsx`**: añadir el shader tenue al hero oscuro de /servicios: mismo patrón del hero home (`<div aria-hidden className="absolute inset-0">` + `LightLeakCanvas intensity={0.45} grain={0.3} speed={0.7} leaks={1}` ), la section pasa a `relative overflow-hidden` y el Container a `relative z-10`. El subnav sticky no se toca.

**`src/components/sections/contact-form.tsx`** — auditoría de estados (anti-ui-slop paso 4). Leer el componente entero primero y cubrir:

1. **Enviando**: botón submit `disabled` con texto "Enviando..." (si ya existe, verificar que el disabled sea real y con `disabled:opacity-*` perceptible; mantener su altura para no mover layout).
2. **Éxito**: el bloque de éxito actual se rediseña al registro v4: `font-display font-medium` para el titular (ya no font-bold tras el pase v3 — confirmar), texto siguiente concreto, y un link "Volver al inicio" o similar SOLO si ya existe; no inventar flujos nuevos. Debe recibir el foco (`tabIndex={-1}` + `focus()` o `role="status"` ya presente — verificar y completar lo que falte) para que un lector de pantalla lo anuncie.
3. **Error de servidor**: si `submitContact` devuelve `{ok:false}` sin errores de campo o lanza, debe verse un mensaje inline visible (`role="alert"`) con recuperación clara ("Inténtalo de nuevo. Si sigue fallando, escríbenos."), no un fallo silencioso. Revisar el catch actual.
4. **Validación inline**: RHF debe validar al blur (`mode: "onTouched"` o equivalente) y enfocar el primer campo inválido al enviar (comportamiento default de RHF `shouldFocusError` — verificar que no esté apagado). Errores bajo cada campo (ya existen vía FieldError — verificar).
5. **Honeypot**: intacto.

No cambiar el schema zod ni el server action. Labels y mensajes existentes se conservan salvo los nuevos textos citados arriba.

**Legal pages**: solo verificación visual rápida (ya heredaron el pase v3); corregir únicamente defectos observables.

Verificación: ciclo + navegador en /servicios (shader tenue, subnav funciona) y /contacto (flujo completo del form: error de validación, envío, éxito — el envío real solo loguea en dev, está bien). Commit.
