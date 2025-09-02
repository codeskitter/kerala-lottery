import { Hero } from "@/components/sections/hero"
import { ResultsCTA } from "@/components/sections/results-cta"
import { PrizesGrid } from "@/components/sections/prizes-grid"
import { HowItWorks } from "@/components/sections/how-it-works"
import { UpcomingDraw } from "@/components/sections/upcoming-draw"
import { WhyChoose } from "@/components/sections/why-choose"
import { ImageSlider } from "@/components/sections/image-slider"
import { AnnouncementTrust } from "@/components/sections/announcement-trust"
import { Testimonials } from "@/components/sections/testimonials"
import { FAQ } from "@/components/sections/faq"
import { FooterCTA } from "@/components/sections/footer-cta"
import { VideoSection } from "@/components/sections/video"
import { BumperOfferSection } from "@/components/sections/bumper-offer"
// import { SiteFooter } from "@/components/site-footer"

export default function HomePage() {
  return (
    <>
      {/* Image slider at the very top */}
      <ImageSlider />
      <Hero />
      {/* Insert the new bumper offer section right below the hero */}
      <BumperOfferSection />
      <VideoSection />
      <ResultsCTA />
      <PrizesGrid />
      <HowItWorks />
      <UpcomingDraw />
      <WhyChoose />
      {/* New sections to match provided screenshots */}
      <AnnouncementTrust />
      <Testimonials />
      <FAQ />
      <FooterCTA />
    </>
  )
}
