import PortfolioGrid from "@/components/sections/portfolio-grid";

export default function Portfolio() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-light py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-6xl font-bold text-secondary mb-6 leading-tight">
              معرض أعمالنا
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              مجموعة مختارة من مشاريعنا المميزة والناجحة التي أنجزناها لعملائنا
            </p>
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <PortfolioGrid showFilter={true} />
    </div>
  );
}
