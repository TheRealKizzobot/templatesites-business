import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import About from '@/components/About';
import FeaturedDishes from '@/components/FeaturedDishes';
import Gallery from '@/components/Gallery';
import Testimonials from '@/components/Testimonials';
import HoursContact from '@/components/HoursContact';
import ReservationCTA from '@/components/ReservationCTA';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <FeaturedDishes />
        <Gallery />
        <Testimonials />
        <HoursContact />
        <ReservationCTA />
      </main>
      <Footer />
    </>
  );
}