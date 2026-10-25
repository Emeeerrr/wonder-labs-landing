import type { Metadata } from "next"
import { Bitter, JetBrains_Mono, Manrope } from "next/font/google"
import "./globals.css"

import { Footer } from "@/components/layout/footer"
import { Header } from "@/components/layout/header"
import { SITE } from "@/content/site"

const bitter = Bitter({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "700", "800"],
})

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
})

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "WonderLabs — IA aplicada para empresas y entidades públicas",
    template: "%s — WonderLabs",
  },
  description: SITE.description,
  openGraph: {
    type: "website",
    locale: "es_CO",
    siteName: SITE.name,
  },
  twitter: {
    card: "summary_large_image",
    title: "WonderLabs — IA aplicada para empresas y entidades públicas",
    description: SITE.description,
  },
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${bitter.variable} ${manrope.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        {/*
         * Sin JS las animaciones de entrada (`motion`'s `initial`) no corren:
         * fuerza el estado final para que el contenido sea visible. Cubre la
         * intro del hero (`data-hero-intro`) y todos los `Reveal` del sitio
         * (`data-reveal`) — un solo bloque global para que aplique en
         * cualquier página, no solo en la home.
         */}
        <noscript>
          <style>{`[data-hero-intro],[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <a
          href="#contenido"
          className="bg-brand-blue text-brand-midnight-deep sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:no-underline focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          Saltar al contenido
        </a>
        <Header />
        <main id="contenido" className="flex flex-1 flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
