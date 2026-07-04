import { useEffect, useState, useRef } from 'react';
import { Sparkles } from 'lucide-react';
import gsap from 'gsap';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Entrance Animation
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out', delay: 0.5 }
      );
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav ref={navRef} className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-logo">
        <Sparkles className="nav-logo-icon" />
        <span>KRAFT</span>
      </div>
      <ul className="nav-links">
        <li><a href="#hero">Home</a></li>
        <li><a href="#about">Philosophy</a></li>
        <li><a href="#experience">Excellence</a></li>
        <li><a href="#connect">Connect</a></li>
      </ul>
      <button className="nav-btn">Elevate Now</button>
    </nav>
  );
}
