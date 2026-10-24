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
  // TODO(task-8): metadata definitiva (OG, canonical, title template).
  title: SITE.name,
  description: SITE.description,
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${bitter.variable} ${manrope.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Header />
        <div className="flex flex-1 flex-col">{children}</div>
        <Footer />
      </body>
    </html>
  )
}
