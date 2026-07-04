import { useState } from 'react';
import Preloader from './components/Preloader';
import Hero from './components/Hero';
import Services from './components/Services';
import Brands from './components/Brands';
import OurProcess from './components/OurProcess';
import About from './components/About';
import WhyChooseUs from './components/WhyChooseUs';
import Industries from './components/Industries';
import Testimonials from './components/Testimonials';
import CaseStudies from './components/CaseStudies';
import Contact from './components/Contact';
import Footer from './components/Footer';
import MobileMenu from './components/MobileMenu';

function App() {
  const [videoUrl, setVideoUrl] = useState<string>('');

  return (
    <div className="app-container">
      {/* Premium Media and Image Preloader */}
      <Preloader onComplete={(url) => setVideoUrl(url)} />

      {/* Hero Section */}
      <Hero preloadedVideoUrl={videoUrl} />

      {/* Brands / Portfolio Section */}
      <Brands />

      {/* Services Section */}
      <Services />

      {/* About Us Section */}
      <About />

      {/* Why Choose Us Section */}
      <WhyChooseUs />

      {/* Our Process Section */}
      <OurProcess />

      {/* Industries We Serve Section */}
      <Industries />

      {/* Client Testimonials Section */}
      <Testimonials />

      {/* Case Studies Hub */}
      <CaseStudies />

      {/* Contact Section */}
      <Contact />

      {/* Footer Section */}
      <Footer />

      {/* Mobile Glassmorphic 3-Dots Navigation Menu (Hidden on desktop via CSS) */}
      <MobileMenu />
    </div>
  );
}

export default App;
