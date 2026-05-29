import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Founder from '@/components/Founder';
import Services from '@/components/Services';
import Programs from '@/components/Programs';
import Trust from '@/components/Trust';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import RevealRuntime from '@/components/RevealRuntime';

export default function HomePage() {
  return (
    <>
      <CustomCursor />
      <RevealRuntime />
      <Nav />
      <Hero />
      <About />
      <Founder />
      <Services />
      <Programs />
      <Trust />
      <Contact />
      <Footer />
    </>
  );
}
