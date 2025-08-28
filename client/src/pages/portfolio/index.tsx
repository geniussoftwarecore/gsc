import { motion } from "framer-motion";
import EnhancedPortfolioHero from "@/components/portfolio/enhanced-portfolio-hero";
import EnhancedPortfolioGrid from "@/components/portfolio/enhanced-portfolio-grid";
import { portfolioProjects } from "@/data/portfolio";

export default function PortfolioIndex() {
  const stats = {
    totalProjects: portfolioProjects.length,
    totalIndustries: Array.from(new Set(portfolioProjects.map(p => p.sector))).length,
    yearsExperience: 5,
    satisfaction: 98,
    totalClients: 150,
    totalTechnologies: Array.from(new Set(portfolioProjects.flatMap(p => p.tech))).length
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-brand-bg"
    >
      {/* Enhanced Portfolio Hero */}
      <EnhancedPortfolioHero
        totalProjects={stats.totalProjects}
        totalIndustries={stats.totalIndustries}
        yearsExperience={stats.yearsExperience}
        satisfaction={stats.satisfaction}
        totalClients={stats.totalClients}
        totalTechnologies={stats.totalTechnologies}
      />
      
      {/* Enhanced Portfolio Grid with Filters */}
      <EnhancedPortfolioGrid
        showFilters={true}
        showViewToggle={true}
        showLoadMore={true}
      />
    </motion.div>
  );
}