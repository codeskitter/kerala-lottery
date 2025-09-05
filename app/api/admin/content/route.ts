import { NextResponse } from "next/server"
import { contentStore } from "../_content-data"

export async function GET() {
  return NextResponse.json({
    sections: contentStore.listContentSections(),
    testimonials: contentStore.listTestimonials(),
    faqs: contentStore.listFAQs(),
    configs: contentStore.listSiteConfigs(),
    socialLinks: contentStore.listSocialLinks(),
    navigation: contentStore.listNavigationItems(),
  })
}
