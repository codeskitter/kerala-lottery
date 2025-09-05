// Content Management Data Store

export type ContentSection = {
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
}

export type Testimonial = {
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
}

export type FAQ = {
  id: string
  question: string
  answer: string
  category: string
  display_order: number
  is_active: boolean
}

export type SiteConfig = {
  id: string
  config_key: string
  config_value: string
  config_type: "text" | "number" | "boolean" | "json" | "url" | "email"
  description?: string
  is_public: boolean
}

export type SocialLink = {
  id: string
  platform: string
  url: string
  icon_class?: string
  is_active: boolean
  display_order: number
}

export type NavigationItem = {
  id: string
  menu_key: string
  label: string
  url: string
  parent_id?: string
  display_order: number
  is_active: boolean
}

export type CarouselImage = {
  id: string
  image_url: string
  alt_text: string
  cta_text: string
  cta_link: string
  display_order: number
  is_active: boolean
  created_at: string
}

// In-memory data stores
let contentSections: ContentSection[] = [
  {
    id: "hero_1",
    section_key: "hero",
    section_name: "Hero Section",
    title: "Win Big with Kerala Jackpot Mega Lottery",
    subtitle: "Your chance to become a millionaire starts here",
    content:
      "Join thousands of winners who have changed their lives with our trusted lottery system. Safe, secure, and government approved.",
    button_text: "Buy Ticket Now",
    button_url: "/register",
    display_order: 1,
    is_active: true,
  },
  {
    id: "about_1",
    section_key: "about",
    section_name: "About Section",
    title: "What is State Kerala Lottery?",
    subtitle: "Government Approved & Trusted",
    content:
      "To participate in the lottery game, you have to buy a State Kerala Lottery ticket. And then one has to wait for the lottery to open. There is a fixed date when the lottery is announced.",
    button_text: "Learn More",
    button_url: "/about",
    display_order: 2,
    is_active: true,
  },
]

let testimonials: Testimonial[] = [
  {
    id: "test_1",
    name: "Rajesh Kumar",
    location: "Kochi, Kerala",
    testimonial: "I never believed I could win until I got the call! Kerala Lottery changed my life completely.",
    prize_amount: 500000,
    win_date: "2024-01-15",
    rating: 5,
    is_featured: true,
    is_active: true,
    display_order: 1,
  },
]

let faqs: FAQ[] = [
  {
    id: "faq_1",
    question: "How do I buy a lottery ticket?",
    answer: "You can buy tickets online through our secure payment system or visit authorized dealers across Kerala.",
    category: "tickets",
    display_order: 1,
    is_active: true,
  },
]

let siteConfigs: SiteConfig[] = [
  {
    id: "cfg_1",
    config_key: "site_name",
    config_value: "Kerala Jackpot Mega Lottery",
    config_type: "text",
    description: "Site name displayed in header",
    is_public: true,
  },
  {
    id: "cfg_2",
    config_key: "site_tagline",
    config_value: "Your Gateway to Fortune",
    config_type: "text",
    description: "Site tagline",
    is_public: true,
  },
]

let socialLinks: SocialLink[] = [
  {
    id: "social_1",
    platform: "Facebook",
    url: "https://facebook.com/keralajackpot",
    icon_class: "fab fa-facebook-f",
    is_active: true,
    display_order: 1,
  },
]

let carouselImages: CarouselImage[] = [
  {
    id: "carousel_1",
    image_url: "/lottery-winner-celebration.jpg",
    alt_text: "Kerala Lottery Winner Celebration",
    cta_text: "Join Now",
    cta_link: "/register",
    display_order: 1,
    is_active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "carousel_2",
    image_url: "/jackpot-prize-money.jpg",
    alt_text: "Jackpot Prize Money",
    cta_text: "Buy Ticket",
    cta_link: "/register",
    display_order: 2,
    is_active: true,
    created_at: new Date().toISOString(),
  },
]

let navigationItems: NavigationItem[] = [
  {
    id: "nav_1",
    menu_key: "home",
    label: "Home",
    url: "/",
    display_order: 1,
    is_active: true,
  },
]

// Utility functions
export function uid(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}`
}

// Database query function
export async function query(sql: string, params: any[] = []): Promise<any> {
  // This is a placeholder implementation - in a real app this would connect to your database
  // For now, we'll use the in-memory contentStore
  console.log("[v0] Database query:", sql, params)

  // Simple query routing based on SQL patterns
  if (sql.includes("SELECT * FROM carousel_images")) {
    return carouselImages.filter((img) => img.is_active).sort((a, b) => a.display_order - b.display_order)
  }

  if (sql.includes("INSERT INTO carousel_images")) {
    const newId = uid("carousel")
    const newImage = {
      id: newId,
      image_url: params[0],
      alt_text: params[1],
      cta_text: params[2],
      cta_link: params[3],
      display_order: params[4] || carouselImages.length + 1,
      is_active: params[5] !== false,
      created_at: new Date().toISOString(),
    }
    carouselImages.push(newImage)
    return { insertId: newId }
  }

  // For other queries, return empty results
  return []
}

// Content Management Store
export const contentStore = {
  // Content Sections
  listContentSections: () => contentSections.sort((a, b) => a.display_order - b.display_order),
  getContentSection: (id: string) => contentSections.find((s) => s.id === id),
  getContentSectionByKey: (key: string) => contentSections.find((s) => s.section_key === key),
  addContentSection: (data: Omit<ContentSection, "id">) => {
    const newSection: ContentSection = { id: uid("section"), ...data }
    contentSections = [...contentSections, newSection]
    return newSection
  },
  updateContentSection: (id: string, patch: Partial<Omit<ContentSection, "id">>) => {
    const idx = contentSections.findIndex((s) => s.id === id)
    if (idx === -1) return null
    contentSections[idx] = { ...contentSections[idx], ...patch }
    return contentSections[idx]
  },
  deleteContentSection: (id: string) => {
    const before = contentSections.length
    contentSections = contentSections.filter((s) => s.id !== id)
    return contentSections.length < before
  },

  // Testimonials
  listTestimonials: () => testimonials.sort((a, b) => a.display_order - b.display_order),
  getTestimonial: (id: string) => testimonials.find((t) => t.id === id),
  addTestimonial: (data: Omit<Testimonial, "id">) => {
    const newTestimonial: Testimonial = { id: uid("test"), ...data }
    testimonials = [...testimonials, newTestimonial]
    return newTestimonial
  },
  updateTestimonial: (id: string, patch: Partial<Omit<Testimonial, "id">>) => {
    const idx = testimonials.findIndex((t) => t.id === id)
    if (idx === -1) return null
    testimonials[idx] = { ...testimonials[idx], ...patch }
    return testimonials[idx]
  },
  deleteTestimonial: (id: string) => {
    const before = testimonials.length
    testimonials = testimonials.filter((t) => t.id !== id)
    return testimonials.length < before
  },

  // FAQs
  listFAQs: () => faqs.sort((a, b) => a.display_order - b.display_order),
  getFAQ: (id: string) => faqs.find((f) => f.id === id),
  addFAQ: (data: Omit<FAQ, "id">) => {
    const newFAQ: FAQ = { id: uid("faq"), ...data }
    faqs = [...faqs, newFAQ]
    return newFAQ
  },
  updateFAQ: (id: string, patch: Partial<Omit<FAQ, "id">>) => {
    const idx = faqs.findIndex((f) => f.id === id)
    if (idx === -1) return null
    faqs[idx] = { ...faqs[idx], ...patch }
    return faqs[idx]
  },
  deleteFAQ: (id: string) => {
    const before = faqs.length
    faqs = faqs.filter((f) => f.id !== id)
    return faqs.length < before
  },

  // Site Config
  listSiteConfigs: () => siteConfigs,
  getSiteConfig: (key: string) => siteConfigs.find((c) => c.config_key === key),
  addSiteConfig: (data: Omit<SiteConfig, "id">) => {
    const newConfig: SiteConfig = { id: uid("cfg"), ...data }
    siteConfigs = [...siteConfigs, newConfig]
    return newConfig
  },
  updateSiteConfig: (key: string, patch: Partial<Omit<SiteConfig, "id" | "config_key">>) => {
    const idx = siteConfigs.findIndex((c) => c.config_key === key)
    if (idx === -1) return null
    siteConfigs[idx] = { ...siteConfigs[idx], ...patch }
    return siteConfigs[idx]
  },
  deleteSiteConfig: (key: string) => {
    const before = siteConfigs.length
    siteConfigs = siteConfigs.filter((c) => c.config_key !== key)
    return siteConfigs.length < before
  },

  // Social Links
  listSocialLinks: () => socialLinks.sort((a, b) => a.display_order - b.display_order),
  getSocialLink: (id: string) => socialLinks.find((s) => s.id === id),
  addSocialLink: (data: Omit<SocialLink, "id">) => {
    const newLink: SocialLink = { id: uid("social"), ...data }
    socialLinks = [...socialLinks, newLink]
    return newLink
  },
  updateSocialLink: (id: string, patch: Partial<Omit<SocialLink, "id">>) => {
    const idx = socialLinks.findIndex((s) => s.id === id)
    if (idx === -1) return null
    socialLinks[idx] = { ...socialLinks[idx], ...patch }
    return socialLinks[idx]
  },
  deleteSocialLink: (id: string) => {
    const before = socialLinks.length
    socialLinks = socialLinks.filter((s) => s.id !== id)
    return socialLinks.length < before
  },

  // Navigation
  listNavigationItems: () => navigationItems.sort((a, b) => a.display_order - b.display_order),
  getNavigationItem: (id: string) => navigationItems.find((n) => n.id === id),
  addNavigationItem: (data: Omit<NavigationItem, "id">) => {
    const newItem: NavigationItem = { id: uid("nav"), ...data }
    navigationItems = [...navigationItems, newItem]
    return newItem
  },
  updateNavigationItem: (id: string, patch: Partial<Omit<NavigationItem, "id">>) => {
    const idx = navigationItems.findIndex((n) => n.id === id)
    if (idx === -1) return null
    navigationItems[idx] = { ...navigationItems[idx], ...patch }
    return navigationItems[idx]
  },
  deleteNavigationItem: (id: string) => {
    const before = navigationItems.length
    navigationItems = navigationItems.filter((n) => n.id !== id)
    return navigationItems.length < before
  },

  // Carousel Images
  listCarouselImages: () =>
    carouselImages.filter((img) => img.is_active).sort((a, b) => a.display_order - b.display_order),
  getCarouselImage: (id: string) => carouselImages.find((img) => img.id === id),
  addCarouselImage: (data: Omit<CarouselImage, "id" | "created_at">) => {
    const newImage: CarouselImage = { id: uid("carousel"), created_at: new Date().toISOString(), ...data }
    carouselImages = [...carouselImages, newImage]
    return newImage
  },
  updateCarouselImage: (id: string, patch: Partial<Omit<CarouselImage, "id" | "created_at">>) => {
    const idx = carouselImages.findIndex((img) => img.id === id)
    if (idx === -1) return null
    carouselImages[idx] = { ...carouselImages[idx], ...patch }
    return carouselImages[idx]
  },
  deleteCarouselImage: (id: string) => {
    const before = carouselImages.length
    carouselImages = carouselImages.filter((img) => img.id !== id)
    return carouselImages.length < before
  },
}
