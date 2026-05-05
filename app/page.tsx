import {
  HeroSection,
  HowtoStartSection,
  AboutUsSection,
  TopReviewSection,
  TestimonialsSection,
  FAQsSection,
  ProgramsSection,
  BottomCTASection,
  TeamSection
} from "@/components/Sections/";

async function RootPage() {

  return (
    <>
      <HeroSection />
      <TopReviewSection />
      <AboutUsSection />

      <ProgramsSection />

      <TeamSection />
      <HowtoStartSection />
      <TestimonialsSection />
      <FAQsSection />
      <BottomCTASection />
    </>
  )
}

export default RootPage