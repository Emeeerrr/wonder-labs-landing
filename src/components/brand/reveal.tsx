import type * as React from "react"

type RevealProps = {
  /** Conservado por compatibilidad con el API anterior; ya no tiene efecto. */
  delay?: number
  /** Elemento a renderizar: "li" cuando envuelve el contenido de una lista. */
  as?: "div" | "li"
} & React.HTMLAttributes<HTMLElement>

/**
 * En la v3 el sitio no anima nada al entrar en viewport: el fade + slide-up
 * por sección era el patrón de scroll más genérico del diseño generado y las
 * referencias (Sana, GIC, OneSeven) no lo usan. Este componente queda como
 * passthrough estático — mismo API, cero JS de animación — para que las
 * subpáginas que lo usan no requieran churn. La única animación de carga del
 * sitio vive en el hero de la home.
 */
function Reveal({ delay: _delay, as: Tag = "div", children, ...props }: RevealProps) {
  void _delay
  return <Tag {...props}>{children}</Tag>
}

export { Reveal }
