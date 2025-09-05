// Content fetching utilities for dynamic content

export type ContentData = {
  sections: Array<{
    id: string
    section_key: string
    section_name: string
    title: string
    subtitle?: string
    content?: string
    image_url?: string
    button_text?: string
    button_url?: string
    display_order: number
    is_active: boolean
  }>
  testimonials: Array<{
    id: string
    name: string
    location?: string
    avatar_url?: string
    testimonial: string
    prize_amount?: number
    win_date?: string
    rating: number
    is_featured: boolean
    is_active: boolean
    display_order: number
  }>
  faqs: Array<{
    id: string
    question: string
    answer: string
    category: string
    display_order: number
    is_active: boolean
  }>
  siteSettings: Record<string, string>
  socialLinks: Array<{
    id: string
    platform: string
    url: string
    icon_class?: string
    is_active: boolean
    display_order: number
  }>
  navigation: Array<{
    id: string
    menu_key: string
    label: string
    url: string
    parent_id?: string
    display_order: number
    is_active: boolean
  }>
}

export async function getContentData(): Promise<ContentData> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/content/public`, {
      cache: "no-store", // Always get fresh content
    })
    if (!res.ok) throw new Error("Failed to fetch content")
    return await res.json()
  } catch (error) {
    console.error("Error fetching content:", error)
    // Return fallback data
    return {
      sections: [],
      testimonials: [],
      faqs: [],
      siteSettings: {
        site_name: "Kerala Jackpot Mega Lottery",
        site_tagline: "Your Gateway to Fortune",
      },
      socialLinks: [],
      navigation: [],
    }
  }
}

export function getContentByKey(sections: ContentData["sections"], key: string) {
  return sections.find((section) => section.section_key === key)
}
