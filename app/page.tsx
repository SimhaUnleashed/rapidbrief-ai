import CTASection from "@/components/home/CTASection";
import DemoSection from "@/components/home/DemoSection";
import HeroSection from "@/components/home/HeroSection";
import HowItWorksSection from "@/components/home/HowItWorks";
import PricingSection from "@/components/home/PricingSection";
import Image from "next/image";

export default function Home() {
  return (
    <div className="relative w-full">
      <div className="flex flex-col">
        <HeroSection/>
        <DemoSection/>
        <HowItWorksSection/>
        <PricingSection/>
        <CTASection/>
      </div>
      
    </div>
  );
}
