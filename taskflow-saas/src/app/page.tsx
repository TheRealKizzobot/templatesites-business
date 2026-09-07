import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import DemoSection from '@/components/DemoSection';
import Pricing from '@/components/Pricing';
import Testimonials from '@/components/Testimonials';
import CtaBand from '@/components/CtaBand';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Features />
        <DemoSection />
        <Pricing />
        <Testimonials />
        <CtaBand />
      </main>
      <Footer />
    </>
  );
}