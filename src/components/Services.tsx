import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TrendingUp, Cpu, BarChart3, Target, Sparkles, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ServiceDrawerCategory {
  title: string;
  items: string[];
}

interface ServiceCard {
  id: number;
  title: string;
  cardSubServices: string[];
  categories: ServiceDrawerCategory[];
  icon: React.ReactNode;
  tag?: {
    text: string;
    color: 'orange' | 'amber';
  };
  gradient: string;
  longDescription: string;
}

const services: ServiceCard[] = [
  {
    id: 1,
    title: 'Brand & Creative',
    cardSubServices: [
      'Brand Strategy', 'Logo Design', 'Social Media Creatives', 'Print Design'
    ],
    categories: [
      {
        title: 'Branding',
        items: ['Brand Strategy', 'Logo Design', 'Brand Identity', 'Packaging Design', 'Corporate Branding']
      },
      {
        title: 'Creative Designing',
        items: ['Social Media Creatives', 'Brochures', 'Flyers', 'Company Profiles', 'Catalogues', 'Presentation Design', 'Print Design']
      }
    ],
    icon: <Sparkles className="service-icon-svg" size={24} />,
    tag: { text: '@brand', color: 'orange' },
    gradient: 'linear-gradient(135deg, #FF6A00 0%, #FF8C1A 100%)',
    longDescription: 'Position your brand as an industry leader. We develop cohesive identities, packaging, and high-impact design assets that capture attention and build lasting trust.'
  },
  {
    id: 2,
    title: 'Social & Content',
    cardSubServices: [
      'Instagram Marketing', 'Content Strategy', 'Copywriting', 'Email Marketing'
    ],
    categories: [
      {
        title: 'Social Media Marketing',
        items: ['Instagram Marketing', 'Facebook Marketing', 'LinkedIn Marketing', 'Content Strategy', 'Reels Marketing', 'Community Management']
      },
      {
        title: 'Content Marketing',
        items: ['Copywriting', 'Blogs', 'Website Content', 'Email Marketing', 'Case Studies']
      }
    ],
    icon: <TrendingUp className="service-icon-svg" size={24} />,
    tag: { text: '@social', color: 'amber' },
    gradient: 'linear-gradient(135deg, #FF8C1A 0%, #FFB347 100%)',
    longDescription: 'Amplify your message across digital channels. We craft data-driven content strategies, manage communities, and write copy that drives engagement and action.'
  },
  {
    id: 3,
    title: 'Performance & SEO',
    cardSubServices: [
      'Meta & Google Ads', 'Lead Generation', 'Technical SEO', 'Keyword Research'
    ],
    categories: [
      {
        title: 'Performance Marketing',
        items: ['Meta Ads', 'Google Ads', 'Lead Generation', 'Sales Campaigns', 'Retargeting Campaigns', 'Conversion Optimization']
      },
      {
        title: 'Search Engine Optimization (SEO)',
        items: ['Local SEO', 'Technical SEO', 'On-Page SEO', 'Off-Page SEO', 'Keyword Research', 'Website Audit']
      }
    ],
    icon: <Target className="service-icon-svg" size={24} />,
    gradient: 'linear-gradient(135deg, #FFB347 0%, #FFF4D6 100%)',
    longDescription: 'Drive measurable business growth. Our campaigns optimize ad spend to acquire high-value leads, while search engine optimization maximizes your organic visibility.'
  },
  {
    id: 4,
    title: 'Web & Video',
    cardSubServices: [
      'Business Websites', 'Landing Pages', 'Brand Shoots', 'Video Editing'
    ],
    categories: [
      {
        title: 'Website Development',
        items: ['Business Websites', 'Landing Pages', 'E-commerce Websites', 'WordPress Development', 'Website Maintenance']
      },
      {
        title: 'Video Production',
        items: ['Brand Shoots', 'Product Shoots', 'Corporate Shoots', 'Reels Production', 'Drone Shoots', 'Video Editing']
      }
    ],
    icon: <BarChart3 className="service-icon-svg" size={24} />,
    gradient: 'linear-gradient(135deg, #FF6A00 0%, #FFB347 100%)',
    longDescription: 'Build a premium digital presence. We construct responsive, lightning-fast websites and produce cinematic video content that brings your brand story to life.'
  },
  {
    id: 5,
    title: 'Tech & Automation',
    cardSubServices: [
      'CRM Setup', 'Marketing Automation', 'AI Chatbots', 'AI Workflow Integration'
    ],
    categories: [
      {
        title: 'Marketing Automation',
        items: ['CRM Setup', 'Email Automation', 'WhatsApp Automation', 'Lead Funnels', 'Workflow Automation']
      },
      {
        title: 'AI Solutions',
        items: ['AI Chatbots', 'AI Content Automation', 'AI Workflow Integration', 'AI Customer Support']
      }
    ],
    icon: <Cpu className="service-icon-svg" size={24} />,
    tag: { text: '@ai', color: 'orange' },
    gradient: 'linear-gradient(135deg, #FF8C1A 0%, #FFF4D6 100%)',
    longDescription: 'Streamline operations with cutting-edge tech. We set up automated lead funnels, CRM systems, and integrate artificial intelligence to optimize support and tasks.'
  }
];

const themes = ['theme-orange', 'theme-white', 'theme-charcoal', 'theme-black'];

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardStackRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const footerRef = useRef<HTMLDivElement>(null);

  // Responsive state
  const [isMobile, setIsMobile] = useState(false);

  // Mobile Gallery Stack State
  const [stackOrder, setStackOrder] = useState<number[]>([0, 1, 2, 3, 4]);
  const [swipingIndex, setSwipingIndex] = useState<number | null>(null);

  // Drawer details state
  const [activeService, setActiveService] = useState<ServiceCard | null>(null);

  // Touch gesture refs for swiping
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const touchEndRef = useRef<{ x: number; y: number } | null>(null);
  const isSwipedRef = useRef<boolean>(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    touchEndRef.current = null;
    isSwipedRef.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchEndRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (index: number) => {
    if (!touchStartRef.current || !touchEndRef.current) return;

    const diffX = touchEndRef.current.x - touchStartRef.current.x;
    const diffY = touchEndRef.current.y - touchStartRef.current.y;
    const threshold = 50; // swiped 50px horizontally

    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > threshold) {
      isSwipedRef.current = true;
      handleCardTap(index);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 680);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    // ─── DESKTOP / TABLET: existing fan-spread animation ─────────────────
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=150%',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 0.5 }
      );

      tl.fromTo(
        cardStackRef.current,
        { y: '80vh', opacity: 0, scale: 0.85 },
        { y: '0vh', opacity: 1, scale: 1, duration: 1, ease: 'power2.out' },
        '-=0.2'
      );

      const cardAnimations = [
        { x: -380, rotation: -16, y: 35 },
        { x: -190, rotation: -8, y: 10 },
        { x: 0, rotation: 0, y: 0 },
        { x: 190, rotation: 8, y: 10 },
        { x: 380, rotation: 16, y: 35 },
      ];

      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        const anim = cardAnimations[index];
        const bubble = card.querySelector('.service-bubble-tag');

        tl.to(
          card,
          { x: anim.x, y: anim.y, rotation: anim.rotation, duration: 1.2, ease: 'power3.out' },
          'spread'
        );

        if (bubble) {
          tl.fromTo(
            bubble,
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' },
            'spread+=0.4'
          );
        }
      });

      tl.fromTo(
        footerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.4'
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isMobile]);

  // Lock scroll and handle Esc key when drawer is open
  useEffect(() => {
    if (!activeService) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveService(null);
      }
    };

    // Lock body and html scroll
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeService]);

  // Mobile card tap transition handler
  const handleCardTap = (index: number) => {
    // Only allow tapping the top card
    if (stackOrder[0] !== index || swipingIndex !== null) return;

    setSwipingIndex(index);

    setTimeout(() => {
      setStackOrder((prev) => {
        const [top, ...rest] = prev;
        return [...rest, top]; // move top card to bottom
      });
      setSwipingIndex(null);
    }, 450); // matches the CSS transition time
  };

  return (
    <section ref={containerRef} id="services" className="services-section">
      {/* Title block */}
      <div ref={titleRef} className="services-title-wrapper">
        <h2 className="services-title">
          Our <span className="text-glow-orange">Services</span>
        </h2>
        <p className="services-subtitle">
          Engineered growth systems designed to automate and scale modern brands.
        </p>
      </div>

      {/* Main card viewport / animation zone */}
      <div className="services-viewport">
        <div ref={cardStackRef} className="services-card-stack">
          {services.map((service, index) => {
            // Determine styling parameters for mobile stack or desktop stack
            let position = stackOrder.indexOf(index);
            let isSwiping = swipingIndex === index;

            // Mobile interactive stack style
            const mobileStyle: React.CSSProperties = isMobile
              ? {
                  position: 'absolute',
                  zIndex: isSwiping ? 50 : 20 - position,
                  opacity: isSwiping ? 0 : 1 - position * 0.15,
                  transform: isSwiping
                    ? 'translate3d(120%, -30px, 0) rotate(15deg) scale(0.95)'
                    : `translate3d(0, ${position * 12}px, 0) scale(${1 - position * 0.04}) rotate(${
                        position === 0 ? 0 : position % 2 === 0 ? 2 : -2
                      }deg)`,
                  transition: 'transform 0.45s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 0.45s cubic-bezier(0.25, 0.8, 0.25, 1)',
                  pointerEvents: position === 0 ? 'auto' : 'none',
                  cursor: position === 0 ? 'pointer' : 'default',
                }
              : {
                  zIndex: index + 10,
                };

            const themeClass = themes[index % themes.length];

            return (
              <div
                key={service.id}
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                className={`service-card ${themeClass} ${isMobile ? 'mobile-interactive-card' : ''} ${
                  isMobile && position === 0 ? 'top-card-glow' : ''
                }`}
                style={mobileStyle}
                onTouchStart={isMobile ? handleTouchStart : undefined}
                onTouchMove={isMobile ? handleTouchMove : undefined}
                onTouchEnd={isMobile ? () => handleTouchEnd(index) : undefined}
                onClick={() => {
                  if (isMobile) {
                    if (!isSwipedRef.current) {
                      setActiveService(service);
                    }
                  } else {
                    setActiveService(service);
                  }
                }}
              >
                {/* Optional speech bubble tags */}
                {service.tag && (
                  <div className={`service-bubble-tag bubble-${service.tag.color}`}>
                    <span>{service.tag.text}</span>
                    <div className="bubble-arrow" />
                  </div>
                )}

                {/* Card visual wrapper */}
                <div className="service-card-inner">
                  {/* Top header: logo/icon + serial */}
                  <div className="service-card-header">
                    <div className="service-icon-bg" style={{ background: service.gradient }}>
                      {service.icon}
                    </div>
                    <span className="service-card-num">0{index + 1}</span>
                  </div>

                  {/* Body details */}
                  <div className="service-card-body centered-body">
                    <h3 className="service-card-title">{service.title}</h3>
                  </div>

                  {/* Swipe hint for top card */}
                  {isMobile && position === 0 && (
                    <div className="service-swipe-hint">
                      Swipe to see next →
                    </div>
                  )}

                  {/* Card footer action */}
                  <div className="service-card-footer-action">
                    <span className="click-more-text">
                      {isMobile ? 'Tap to see more' : 'Click to see more →'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom text block & CTA buttons */}
      <div ref={footerRef} className="services-footer">
        <p className="services-subtext">
          Our systems streamline growth operations, giving ambitious brands the infrastructure to scale.
        </p>
        <div className="services-cta-group">
          <a href="#contact" className="services-btn-primary">
            Launch systems
          </a>
          <a href="#portfolio" className="services-btn-secondary">
            Explore works
          </a>
        </div>
      </div>

      {/* Details Drawer */}
      <div 
        className={`services-drawer-overlay ${activeService ? 'is-open' : ''}`}
        onClick={() => setActiveService(null)}
      >
        <div 
          className="services-drawer"
          onClick={(e) => e.stopPropagation()}
        >
          {activeService && (
            <>
              {/* Drawer Header */}
              <div className="drawer-header">
                <div className="drawer-title-row">
                  <div className="drawer-icon-bg" style={{ background: activeService.gradient }}>
                    {activeService.icon}
                  </div>
                  <h3 className="drawer-title">{activeService.title}</h3>
                </div>
                <button className="drawer-close-btn" onClick={() => setActiveService(null)} aria-label="Close details">
                  <X size={24} />
                </button>
              </div>

              {/* Drawer Body */}
              <div className="drawer-body">
                <p className="drawer-description">{activeService.longDescription}</p>
                
                <div className="drawer-categories">
                  {activeService.categories.map((category, idx) => (
                    <div key={idx} className="drawer-category-group">
                      <h4 className="drawer-category-title">{category.title}</h4>
                      <ul className="drawer-category-list">
                        {category.items.map((item, itemIdx) => (
                          <li key={itemIdx} className="drawer-category-item">
                            <span className="drawer-item-dot" style={{ background: activeService.gradient }} />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Drawer Footer */}
              <div className="drawer-footer">
                <a 
                  href="#contact" 
                  className="drawer-cta-btn" 
                  style={{ background: activeService.gradient }}
                  onClick={() => setActiveService(null)}
                >
                  Discuss this Service
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
