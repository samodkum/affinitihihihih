import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';

interface HeroProps {
  preloadedVideoUrl?: string;
}

export default function Hero({ preloadedVideoUrl }: HeroProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Navigation sliding pointer states
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [indicatorStyle, setIndicatorStyle] = useState<React.CSSProperties>({ opacity: 0 });
  
  const navRef = useRef<HTMLElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const textContainerRef = useRef<HTMLDivElement>(null);

  // Animate text on load
  useEffect(() => {
    if (textContainerRef.current) {
      const q = gsap.utils.selector(textContainerRef.current);
      const tl = gsap.timeline({ delay: 0.5 });
      
      tl.fromTo(
        q('.hero-main-title'),
        { opacity: 0, y: 50, filter: 'blur(10px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: 'power3.out' }
      )
      .fromTo(
        q('.hero-subtext'),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
        "-=0.8"
      )
      .fromTo(
        q('.hero-cta-buttons'),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        "-=0.6"
      );
    }
  }, []);

  const handleVideoCanPlay = () => {
    if (!isLoaded) {
      setIsLoaded(true);
    }
  };

  useEffect(() => {
    if (videoRef.current && videoRef.current.readyState >= 3) {
      handleVideoCanPlay();
    }
  }, []);

  // Update sliding indicator style on state change or resize
  useEffect(() => {
    const updatePosition = () => {
      const activeTargetIndex = hoveredIndex !== null ? hoveredIndex : activeIndex;
      const activeLink = linkRefs.current[activeTargetIndex];
      const nav = navRef.current;

      if (activeLink && nav) {
        const linkRect = activeLink.getBoundingClientRect();
        const navRect = nav.getBoundingClientRect();

        // Add visual padding to the sliding backdrop (14px left/right, 6px top/bottom)
        const padX = 14;
        const padY = 6;

        setIndicatorStyle({
          width: `${linkRect.width + (padX * 2)}px`,
          height: `${linkRect.height + (padY * 2)}px`,
          left: `${(linkRect.left - navRect.left) - padX}px`,
          top: `${(linkRect.top - navRect.top) - padY}px`,
          opacity: 1,
        });
      } else {
        setIndicatorStyle({ opacity: 0 });
      }
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    
    // Tiny timeout to make sure fonts are fully loaded/layout is computed
    const timeoutId = setTimeout(updatePosition, 100);

    return () => {
      window.removeEventListener('resize', updatePosition);
      clearTimeout(timeoutId);
    };
  }, [activeIndex, hoveredIndex]);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Services', href: '#services' },
    { label: 'About', href: '#about' },
    { label: 'Industries', href: '#industries' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Process', href: '#process' }
  ];

  return (
    <section id="hero" className="hero">
      <div className="hero-video-container">
        <video
          ref={videoRef}
          src={preloadedVideoUrl || "https://res.cloudinary.com/dzc1dckta/video/upload/v1782894914/01c1a040-5653-4ad2-aa1a-7b7597f5f09a_jfwatg.mp4"}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onCanPlayThrough={handleVideoCanPlay}
          onCanPlay={handleVideoCanPlay}
          className={isLoaded ? 'loaded' : ''}
        />
        <div className="hero-overlay" />
      </div>

      {/* Floating UI Content Overlay */}
      <div className="hero-content-overlay">
        {/* Navigation Bar */}
        <div className="hero-navbar-wrapper">
          <nav
            ref={navRef}
            className="hero-navbar"
            style={{ position: 'relative' }}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Apple-style sliding backdrop indicator */}
            <div className="hero-nav-indicator" style={indicatorStyle} />

            {navLinks.map((link, idx) => (
              <a
                key={link.label}
                ref={(el) => { linkRefs.current[idx] = el; }}
                href={link.href}
                className={`hero-nav-link ${activeIndex === idx ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveIndex(idx);
                }}
                onMouseEnter={() => setHoveredIndex(idx)}
              >
                {link.label}
              </a>
            ))}
            <button
              className="hero-navbar-btn"
              onMouseEnter={() => setHoveredIndex(null)}
            >
              Let's talk
            </button>
          </nav>
        </div>

        {/* Text Block (Title & Subtext) */}
        <div ref={textContainerRef} className="hero-text-block">
          <h1 className="hero-main-title">
            Systems simplify<br />
            growth for modern<br />
            brands.
          </h1>
          <p className="hero-subtext">
            Affinity Kraft Solution enables ambitious businesses to launch and automate the marketing systems that scale revenue, with data.
          </p>

          {/* CTA Buttons */}
          <div className="hero-cta-buttons">
            <button className="cta-btn-primary">
              Book a demo <ArrowRight size={16} />
            </button>
            <button className="cta-btn-secondary">
              Learn more <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Stats Cards Row */}
        <div className="hero-stats-row">
          <div className="hero-stat-card">
            <span className="hero-stat-label">Spend Managed</span>
            <div className="hero-stat-value">$ 2.4M</div>
          </div>

          <div className="hero-stat-card">
            <span className="hero-stat-label">Leads Driven</span>
            <div className="hero-stat-value">14.2K</div>
          </div>

          <div className="hero-stat-card">
            <span className="hero-stat-label">Average ROAS</span>
            <div className="hero-stat-value">4.2x</div>
          </div>

          <div className="hero-stat-card">
            <span className="hero-stat-label">CAC Cut</span>
            <div className="hero-stat-value">-35%</div>
          </div>
        </div>
      </div>
    </section>
  );
}
