"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

type LightLeakProps = {
  /** Fondo sobre el que sangra la luz (hex). */
  backgroundColor?: string
  /** Borde del leak (hex). */
  leakColor?: string
  /** Medio cálido del leak (hex). */
  glowColor?: string
  /** Núcleo quemado del leak (hex). */
  hotColor?: string
  /** Exposición de la luz añadida, 0-2. */
  intensity?: number
  /** Grano de película, 0-1. */
  grain?: number
  /** Multiplicador del tiempo; 0 congela. */
  speed?: number
  leaks?: 1 | 2 | 3
  /** Escala de render sobre el DPR, 0.25-1. */
  quality?: number
  paused?: boolean
  /** Background CSS que se ve sin WebGL2. */
  fallback?: string
  className?: string
  children?: React.ReactNode
}

type RGB = [number, number, number]

type Settings = {
  background: RGB
  leak: RGB
  glow: RGB
  hot: RGB
  intensity: number
  grain: number
  speed: number
  leaks: number
  quality: number
  paused: boolean
}

const DEFAULT_COLORS = {
  background: "#01242C",
  leak: "#F0801E",
  glow: "#FFAB5C",
  hot: "#FFF3DE",
} as const

/** u_time del único frame que se pinta con prefers-reduced-motion. */
const REDUCED_MOTION_TIME = 12

/** #rgb o #rrggbb. */
const HEX_COLOR = /^#(?:[\da-f]{3}){1,2}$/i

const VERTEX_SHADER = `#version 300 es
layout(location = 0) in vec2 a_position;

void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`

const FRAGMENT_SHADER = `#version 300 es
precision highp float;

uniform float u_time;
uniform vec2 u_res;
uniform vec3 u_bg;
uniform vec3 u_leak;
uniform vec3 u_glow;
uniform vec3 u_hot;
uniform float u_intensity;
uniform float u_grain;
uniform float u_speed;
uniform int u_leaks;

out vec4 outColor;

// Anclas relativas a los bordes, lejos del texto (x en [0, aspect]; y crece hacia arriba).
vec2 leakAnchor(int i, float aspect) {
  if (i == 0) {
    // Esquina superior derecha. En pantallas angostas el H1 ocupa todo el ancho:
    // el leak se corre al 84% y sube fuera de cuadro para no tocarlo.
    float y0 = mix(1.06, 0.88, smoothstep(0.6, 1.0, aspect));
    return vec2(max(aspect - 0.16, aspect * 0.84), y0);
  }
  if (i == 1) return vec2(aspect * 0.42, 1.10); // derrame desde el borde superior (centro fuera de cuadro)
  return vec2(aspect + 0.10, 0.34); // derrame desde el borde derecho
}

// Estiramiento de cada streak sobre (p - ancla).
const vec2 STRETCH[3] = vec2[3](vec2(0.75, 1.7), vec2(0.6, 2.4), vec2(0.5, 1.6));

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = smoothstep(0.0, 1.0, f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  for (int octave = 0; octave < 3; octave++) {
    value += amplitude * noise(p);
    p *= 2.0;
    amplitude *= 0.5;
  }
  return value;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  float aspect = u_res.x / u_res.y;
  vec2 p = uv;
  p.x *= aspect;
  float t = u_time * u_speed;

  float field = 0.0;
  for (int i = 0; i < 3; i++) {
    if (i >= u_leaks) break;
    float fi = float(i);
    vec2 anchor = leakAnchor(i, aspect);
    // Deriva visible (~15 s por vuelta). La vertical es menor: en móvil el
    // ancla vive apenas fuera de cuadro y no debe bajar hasta el H1.
    anchor += vec2(0.09 * sin(t * 0.42 + fi * 2.1), 0.05 * cos(t * 0.31 + fi * 1.3));
    float d = length((p - anchor) * STRETCH[i]);
    // El borde ondula y fluye: el campo de ruido se desplaza en diagonal.
    d += 0.16 * fbm(p * 2.6 + vec2(t * 0.1, -t * 0.22) + fi * 7.0) - 0.08;
    // Igual a smoothstep(0.52, 0.0, d), que GLSL deja indefinido (edge0 >= edge1).
    float f = 1.0 - smoothstep(0.0, 0.52, d);
    // Respiración de exposición: la luz sube y baja como colándose por una rendija.
    f *= 0.82 + 0.18 * sin(t * 0.55 + fi * 2.7);
    field = max(field, f);
  }
  // El texto vive a la izquierda: la luz se apaga antes de llegar a esa zona.
  field *= smoothstep(0.12, 0.55, uv.x);

  vec3 add = vec3(0.0);
  add = mix(add, u_leak, smoothstep(0.08, 0.55, field));
  add = mix(add, u_glow, smoothstep(0.42, 0.8, field));
  add = mix(add, u_hot, smoothstep(0.78, 0.98, field));
  add *= u_intensity;
  add = 1.0 - exp(-add * 1.4);
  // Screen: donde no hay luz queda exactamente u_bg.
  vec3 col = 1.0 - (1.0 - u_bg) * (1.0 - add);

  float g = (hash(gl_FragCoord.xy + fract(t) * 61.0) - 0.5) * u_grain * 0.10;
  col += g;

  outColor = vec4(col, 1.0);
}
`

/** Hex válido o el default: el shader y el fallback CSS pintan siempre el mismo color. */
function resolveHex(value: string | undefined, fallback: string) {
  return value !== undefined && HEX_COLOR.test(value) ? value : fallback
}

/** Sin gestión estricta de sRGB: dividir por 255 basta para el leak. */
function hexToRgb(hex: string): RGB {
  const digits = hex.length === 4 ? hex.slice(1).replace(/./g, "$&$&") : hex.slice(1)
  const value = Number.parseInt(digits, 16)
  return [((value >> 16) & 255) / 255, ((value >> 8) & 255) / 255, (value & 255) / 255]
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

/** Lo que se ve sin WebGL2: el leak principal aproximado en CSS. */
function fallbackBackground(leak: string, background: string) {
  return `radial-gradient(120% 90% at 85% 12%, color-mix(in srgb, ${leak} 26%, transparent), transparent 60%), linear-gradient(170deg, #012A33, ${background})`
}

function createProgram(gl: WebGL2RenderingContext) {
  const program = gl.createProgram()
  const vertex = gl.createShader(gl.VERTEX_SHADER)
  const fragment = gl.createShader(gl.FRAGMENT_SHADER)
  if (!program || !vertex || !fragment) return null

  gl.shaderSource(vertex, VERTEX_SHADER)
  gl.shaderSource(fragment, FRAGMENT_SHADER)
  gl.compileShader(vertex)
  gl.compileShader(fragment)
  gl.attachShader(program, vertex)
  gl.attachShader(program, fragment)
  gl.linkProgram(program)

  const linked = gl.getProgramParameter(program, gl.LINK_STATUS)
  if (!linked && process.env.NODE_ENV !== "production") {
    console.error(
      gl.getShaderInfoLog(fragment) || gl.getShaderInfoLog(vertex) || gl.getProgramInfoLog(program)
    )
  }
  gl.deleteShader(vertex)
  gl.deleteShader(fragment)
  if (linked) return program
  gl.deleteProgram(program)
  return null
}

/**
 * Light leak de película: luz cálida que sangra sobre el fondo oscuro, en
 * WebGL2 a mano. Misma API pública que el LightLeakShader de shadcn.io, para
 * que cambiarlo por el original sea directo. Solo anima en viewport, con la
 * pestaña visible y sin prefers-reduced-motion (ahí queda un frame fijo); sin
 * WebGL2, o si el contexto se pierde, queda el `fallback` CSS del contenedor.
 */
function LightLeak({
  backgroundColor,
  leakColor,
  glowColor,
  hotColor,
  intensity = 1,
  grain = 0.35,
  speed = 1,
  leaks = 2,
  quality = 1,
  paused = false,
  fallback,
  className,
  children,
}: LightLeakProps) {
  const rootRef = React.useRef<HTMLDivElement>(null)
  const syncRef = React.useRef<(() => void) | null>(null)

  const background = resolveHex(backgroundColor, DEFAULT_COLORS.background)
  const leak = resolveHex(leakColor, DEFAULT_COLORS.leak)
  const glow = resolveHex(glowColor, DEFAULT_COLORS.glow)
  const hot = resolveHex(hotColor, DEFAULT_COLORS.hot)

  const settings = React.useMemo<Settings>(
    () => ({
      background: hexToRgb(background),
      leak: hexToRgb(leak),
      glow: hexToRgb(glow),
      hot: hexToRgb(hot),
      intensity: clamp(intensity, 0, 2),
      grain: clamp(grain, 0, 1),
      speed,
      leaks,
      quality: clamp(quality, 0.25, 1),
      paused,
    }),
    [background, leak, glow, hot, intensity, grain, speed, leaks, quality, paused]
  )
  const settingsRef = React.useRef(settings)

  // Props nuevas sin recrear el contexto: el runtime vivo las aplica.
  React.useLayoutEffect(() => {
    settingsRef.current = settings
    syncRef.current?.()
  }, [settings])

  /*
   * El canvas nace y muere con el efecto. Activity (cacheComponents) y
   * StrictMode limpian y vuelven a correr los efectos sobre el mismo DOM, y un
   * contexto liberado con loseContext no revive en el mismo canvas: con uno
   * nuevo por ciclo la GPU se libera al ocultar la ruta y el shader vuelve al
   * regresar. Layout effect para que el primer frame llegue antes del paint.
   */
  React.useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return

    const canvas = document.createElement("canvas")
    canvas.setAttribute("aria-hidden", "true")
    canvas.className = "absolute inset-0 size-full"
    // Sin depth buffer: un triángulo de pantalla completa no lo usa. Con
    // failIfMajorPerformanceCaveat, un renderizador por software (SwiftShader,
    // GPU en lista negra) no crea contexto y queda el fallback CSS.
    const gl = canvas.getContext("webgl2", {
      antialias: false,
      alpha: false,
      depth: false,
      powerPreference: "low-power",
      failIfMajorPerformanceCaveat: true,
    })
    const program = gl && createProgram(gl)
    if (!gl || !program) {
      gl?.getExtension("WEBGL_lose_context")?.loseContext()
      root.dataset.state = "unsupported"
      return
    }

    // Triángulo que cubre todo el viewport.
    gl.bindVertexArray(gl.createVertexArray())
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer())
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    gl.enableVertexAttribArray(0)
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0)
    gl.useProgram(program)

    const uniform = (name: string) => gl.getUniformLocation(program, name)
    const uniforms = {
      time: uniform("u_time"),
      res: uniform("u_res"),
      bg: uniform("u_bg"),
      leak: uniform("u_leak"),
      glow: uniform("u_glow"),
      hot: uniform("u_hot"),
      intensity: uniform("u_intensity"),
      grain: uniform("u_grain"),
      speed: uniform("u_speed"),
      leaks: uniform("u_leaks"),
    }

    root.prepend(canvas)

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    let reduceMotion = motionQuery.matches
    let inView = false
    // Offset aleatorio: cada carga arranca en otro punto de la deriva.
    let time = Math.random() * 40
    let lastFrame: number | null = null
    let frameId = 0
    let width = 0
    let height = 0
    let stopped = false

    const draw = () => {
      gl.uniform1f(uniforms.time, reduceMotion ? REDUCED_MOTION_TIME : time)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }

    const resize = () => {
      const scale = Math.min(window.devicePixelRatio || 1, 2) * settingsRef.current.quality
      const nextWidth = Math.max(1, Math.round(root.clientWidth * scale))
      const nextHeight = Math.max(1, Math.round(root.clientHeight * scale))
      if (nextWidth === width && nextHeight === height) return false
      width = nextWidth
      height = nextHeight
      canvas.width = width
      canvas.height = height
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight)
      gl.uniform2f(uniforms.res, gl.drawingBufferWidth, gl.drawingBufferHeight)
      return true
    }

    const tick = (now: number) => {
      if (lastFrame !== null) time += (now - lastFrame) / 1000
      lastFrame = now
      draw()
      frameId = requestAnimationFrame(tick)
    }

    const updateLoop = () => {
      // Una entrada de IntersectionObserver ya encolada puede llegar tras disconnect.
      if (stopped) return
      const current = settingsRef.current
      const animate =
        inView &&
        document.visibilityState === "visible" &&
        !current.paused &&
        current.speed !== 0 &&
        !reduceMotion
      if (animate && !frameId) {
        lastFrame = null
        frameId = requestAnimationFrame(tick)
      } else if (!animate) {
        cancelAnimationFrame(frameId)
        frameId = 0
        draw()
      }
      root.dataset.state = animate ? "running" : "paused"
    }

    const sync = () => {
      const current = settingsRef.current
      gl.uniform3fv(uniforms.bg, current.background)
      gl.uniform3fv(uniforms.leak, current.leak)
      gl.uniform3fv(uniforms.glow, current.glow)
      gl.uniform3fv(uniforms.hot, current.hot)
      gl.uniform1f(uniforms.intensity, current.intensity)
      gl.uniform1f(uniforms.grain, current.grain)
      gl.uniform1f(uniforms.speed, current.speed)
      gl.uniform1i(uniforms.leaks, current.leaks)
      if (resize()) draw()
      updateLoop()
    }

    sync()
    syncRef.current = sync

    // Redimensionar vacía el buffer: se repinta antes del paint para no mostrar un frame negro.
    const resizeObserver = new ResizeObserver(() => {
      if (resize()) draw()
    })
    resizeObserver.observe(root)

    const intersectionObserver = new IntersectionObserver((entries) => {
      inView = entries[entries.length - 1].isIntersecting
      updateLoop()
    })
    intersectionObserver.observe(root)

    const listeners = new AbortController()
    const stop = () => {
      stopped = true
      cancelAnimationFrame(frameId)
      listeners.abort()
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      syncRef.current = null
    }

    document.addEventListener("visibilitychange", updateLoop, { signal: listeners.signal })
    motionQuery.addEventListener(
      "change",
      () => {
        reduceMotion = motionQuery.matches
        updateLoop()
      },
      { signal: listeners.signal }
    )
    canvas.addEventListener(
      "webglcontextlost",
      (event) => {
        event.preventDefault()
        stop()
        canvas.remove()
        root.dataset.state = "unsupported"
      },
      { signal: listeners.signal }
    )

    return () => {
      stop()
      if (!gl.isContextLost()) gl.getExtension("WEBGL_lose_context")?.loseContext()
      canvas.remove()
    }
  }, [])

  return (
    <div
      ref={rootRef}
      data-slot="light-leak"
      data-state="paused"
      className={cn("relative overflow-hidden", className)}
      style={{ background: fallback ?? fallbackBackground(leak, background) }}
    >
      {children ? <div className="relative z-10">{children}</div> : null}
    </div>
  )
}

export { LightLeak }
export type { LightLeakProps }
