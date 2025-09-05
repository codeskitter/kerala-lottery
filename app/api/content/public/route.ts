import { NextResponse } from "next/server"
import { contentStore } from "../../admin/_content-data"

export async function GET() {
  // Return only public content for frontend consumption
  const sections = contentStore.listContentSections().filter((s) => s.is_active)
  const testimonials = contentStore.listTestimonials().filter((t) => t.is_active)
  const faqs = contentStore.listFAQs().filter((f) => f.is_active)
  const configs = contentStore.listSiteConfigs().filter((c) => c.is_public)
  const socialLinks = contentStore.listSocialLinks().filter((s) => s.is_active)
  const navigation = contentStore.listNavigationItems().filter((n) => n.is_active)

  // Convert configs to key-value pairs for easier frontend consumption
  const siteSettings = configs.reduce(
    (acc, config) => {
      acc[config.config_key] = config.config_value
      return acc
    },
    {} as Record<string, string>,
  )

  return NextResponse.json({
    sections,
    testimonials,
    faqs,
    siteSettings,
    socialLinks,
    navigation,
  })
}
