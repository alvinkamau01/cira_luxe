import { HeroSection } from "./aboutPageComponents/heroSection"
import { MissionSection } from "./aboutPageComponents/mission"
import { ProductSection } from "./aboutPageComponents/products"
import { TestimonialSection } from "./aboutPageComponents/testimonials"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <MissionSection />
      <ProductSection />
      <TestimonialSection />
    </div>
  )
}

