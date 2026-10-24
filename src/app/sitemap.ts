import type { MetadataRoute } from "next"

import { SITE } from "@/content/site"

const ROUTES = ["/", "/servicios", "/contacto", "/legal/privacidad", "/legal/terminos"] as const

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => ({
    url: `${SITE.url}${route}`,
    lastModified: new Date(),
  }))
}
