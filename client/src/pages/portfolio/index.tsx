import { motion } from "framer-motion";
import PortfolioHero from "@/components/portfolio/portfolio-hero";
import PortfolioGrid from "@/components/portfolio/portfolio-grid";

export default function PortfolioIndex() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-white"
    >
      {/* Portfolio Hero */}
      <PortfolioHero
        totalProjects={50}
        totalIndustries={8}
        yearsExperience={5}
        satisfaction={98}
      />
      
      {/* Portfolio Grid with Filters */}
      <PortfolioGrid
        showFilters={true}
        showViewToggle={true}
        showLoadMore={true}
      />
    </motion.div>
  );
}