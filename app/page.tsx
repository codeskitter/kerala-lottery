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
import WelcomeRegisterSection from "@/components/sections/welcome-register"
import { LotteryStatusCheckSection } from "@/components/sections/lottery-status-check"
import DailyLotteryOfferSection from "@/components/sections/daily-lottery-offer"
import { RecentWinners } from "@/components/sections/recent-winners"
import { AboutOverview } from "@/components/sections/about-overview"
import { PrizeTable } from "@/components/sections/prize-table"
import PaymentDetailsSection from "@/components/sections/payment-details"
import { getContentData } from "@/lib/content"

export default async function HomePage() {
  const contentData = await getContentData()

  return (
    <>
      {/* Image slider at the very top */}
      <ImageSlider />
      {/* Registration section */}
      <WelcomeRegisterSection contentData={contentData} />
      <PaymentDetailsSection />
      {/* keep "Check Your Lottery Result" as its own separate section right after registration+payments */}
      <ResultsCTA />
      <DailyLotteryOfferSection contentData={contentData} />

      <PrizeTable />

      <RecentWinners contentData={contentData} />
      <AboutOverview contentData={contentData} />
      <LotteryStatusCheckSection />
      <Hero contentData={contentData} />
      {/* Insert the new bumper offer section right below the hero */}
      <BumperOfferSection />
      <VideoSection />
      {/* Prizes grid kept as an additional view, if desired */}
      <PrizesGrid />
      <HowItWorks contentData={contentData} />
      <UpcomingDraw />
      <WhyChoose contentData={contentData} />
      {/* New sections to match provided screenshots */}
      <AnnouncementTrust />
      <Testimonials contentData={contentData} />
      <FAQ contentData={contentData} />
      <FooterCTA />
    </>
  )
}
