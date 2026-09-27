import Hero from "@/components/site/hero";
import TemplateShowcase from "@/components/site/template-showcase";
import About from "@/components/site/about";
import Pricing from "@/components/site/pricing";
import Contact from "@/components/site/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <TemplateShowcase />
      <About />
      <Pricing />
      <Contact />
    </>
  );
}
