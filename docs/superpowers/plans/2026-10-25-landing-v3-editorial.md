# Landing v3 — rework editorial (rama feature/landing-v3-editorial)

Fecha: 2026-10-25. Referencias pedidas: sanalabs.com, generalintelligencecompany.com, oneseventech.com.

## Diagnóstico (por qué la v2 seguía leyéndose "hecha con IA")

La v2 usaba, en todas las secciones, los patrones más reconocibles del diseño generado:

1. Eyebrow mono EN MAYÚSCULAS con tracking 0.18em sobre cada título.
2. Fade + slide-up al scroll (`Reveal`) en cada bloque de cada sección.
3. Una sola palabra acentuada en el H1 (azul + subrayado dibujado).
4. Metadatos unidos con puntos medios ("01 Diagnóstico · 02 Formación…").
5. Flecha `→` pegada a cada CTA y enlace.
6. `font-extrabold tracking-tight` en todos los títulos (vuelve cualquier serif un bloque genérico).
7. Esfera 3D distorsionada con glow — el visual de hero IA más repetido de 2024-2026.
8. Count-up en cifras, orbes con gradiente, glow radial en el CTA.
9. El mismo andamiaje `Section > Eyebrow + h2 clamp` repetido 8 veces.

## Qué hacen las referencias

- **Sana**: restraint. Sans de peso medio, espacio en blanco, paneles grandes con material real, logo wall, casi nada se anima.
- **General Intelligence Co.**: un solo concepto fuerte (escena ilustrada de NYC), identidad de lugar y hora (reloj en vivo "11:48 PM NYC"), serif, anotación tipo paper ("Fig. 1").
- **OneSeven**: editorial sobre negro. Serif enorme con una FRASE en cursiva y color, las cifras cargan la página, pasos numerados reales, voz directa, versalitas para etiquetas de industria.

## Concepto v3: "documento de trabajo, no deck de slides"

La página se lee como el argumento escrito de un consultor, en tres actos:
**Acto I (oscuro)** el problema · **Acto II (claro)** el método y la prueba · **Acto III (oscuro)** el cierre.

### Tokens

- **Color**: paleta de marca intacta. Midnight deep/midnight para actos I y III; White Smoke para el acto II. Tangerine solo CTAs (texto midnight-deep). Azul para la frase acentuada del H1 y enlaces.
- **Tipo**: Bitter 400/500/700 + cursiva. Display = Bitter 500, tracking normal (nunca extrabold tight). Cuerpo = Manrope. JetBrains Mono queda SOLO para datos reales: el reloj de Colombia y los números de etapa.
- **Layout**: columna editorial, H1 a la izquierda. Cada sección tiene una forma propia: manifiesto (reto), tabla de etapas con filete (ruta), columnas gemelas (para quién), cifras grandes sin caja (credenciales), lista run-in (resultados).
- **Principios**:
  - Una sola entrada orquestada (el hero, ≤1s). Nada más se anima al scroll.
  - Detalles concretos en vez de decoración: reloj en vivo de Bogotá (GMT-5) en el header, "Etapa 01…04" porque la ruta sí es secuencial, cifras +5/+50 grandes y atribuidas.
  - Sin iconos decorativos, sin pills de kicker, sin flechas en CTAs, sin puntos medios, sin count-up, sin glows radiales.
  - La molécula 3D se elimina (y con ella three.js: ~600 KB menos de JS).
  - El video "La visión de WonderLabs" (MediaSlot) ancla el hero, como el screenshot de producto de OneSeven.

### Auto-revisión contra defaults genéricos

- ¿Crema + serif + terracota? No: midnight teal + slab serif propia de la marca.
- ¿Negro + acento ácido? No: paleta de marca de 7 tonos.
- ¿Broadsheet rígido? No: pills y radios se conservan donde son marca.
- La frase en cursiva con color viene del brief (OneSeven es referencia nombrada por el cliente).

## Alcance

Home completa + componentes globales (Eyebrow, header con reloj, footer, MediaSlot) + pase ligero en /servicios y /contacto (pesos tipográficos, flechas, glows) para que hereden el registro. Copy intacto (verbatim del borrador). Sin merge a develop hasta aprobación.
