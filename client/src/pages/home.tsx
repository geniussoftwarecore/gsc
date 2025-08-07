import Hero from "@/components/sections/hero";
import ServicesOverview from "@/components/sections/services-overview";
import AboutStats from "@/components/sections/about-stats";
import PortfolioGrid from "@/components/sections/portfolio-grid";
import Testimonials from "@/components/sections/testimonials";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <ServicesOverview />
      <AboutStats />
      <PortfolioGrid showFilter={false} limit={6} />
      <Testimonials />
    </div>
  );
}
