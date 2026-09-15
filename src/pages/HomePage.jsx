import HeroSection from '../components/sections/HeroSection';
import TrustSection from '../components/sections/TrustSection';
import ServicesOverview from '../components/sections/ServicesOverview';
import WhyChooseUs from '../components/sections/WhyChooseUs';
import ProcessSection from '../components/sections/ProcessSection';
import SolutionsSection from '../components/sections/SolutionsSection';
import IndustriesSection from '../components/sections/IndustriesSection';
import PortfolioSection from '../components/sections/PortfolioSection';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import PackagesSection from '../components/sections/PackagesSection';
import FAQSection from '../components/sections/FAQSection';
import CTASection from '../components/sections/CTASection';
import { usePageTitle } from '../hooks/usePageTitle';

const HomePage = () => {
  usePageTitle('Codex Developers — Digital Solutions That Help Your Business Grow');

  return (
    <div>
      <HeroSection />
      <TrustSection />
      <ServicesOverview />
      <WhyChooseUs />
      <ProcessSection />
      <SolutionsSection />
      <IndustriesSection />
      <PortfolioSection />
      <TestimonialsSection />
      <PackagesSection />
      <FAQSection />
      <CTASection />
    </div>
  );
};

export default HomePage;
