import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TrendingUp, Cpu, BarChart3, Target, Sparkles, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ServiceCard {
  id: number;
  title: string;
  desc: string;
  icon: React.ReactNode;
  tag?: {
    text: string;
    color: 'orange' | 'amber';
  };
  gradient: string;
}

const services: ServiceCard[] = [
  {
    id: 1,
    title: 'Growth Systems',
    desc: 'Scale your paid media & acquisition channels with high-yielding, data-backed campaigns.',
    icon: <TrendingUp className="service-icon-svg" size={24} />,
    tag: { text: '@growth', color: 'orange' },
    gradient: 'linear-gradient(135deg, #FF6A00 0%, #FF8C1A 100%)',
  },
  {
    id: 2,
    title: 'Automations',
    desc: 'Streamline customer journeys & back-office operations with advanced workflow integrations.',
    icon: <Cpu className="service-icon-svg" size={24} />,
    gradient: 'linear-gradient(135deg, #FF8C1A 0%, #FFB347 100%)',
  },
  {
    id: 3,
    title: 'Analytics & BI',
    desc: 'Remove the guesswork with custom BI dashboards and bulletproof attribution modeling.',
    icon: <BarChart3 className="service-icon-svg" size={24} />,
    gradient: 'linear-gradient(135deg, #FFB347 0%, #FFF4D6 100%)',
  },
  {
    id: 4,
    title: 'Conversion (CRO)',
    desc: 'Turn clicks into customers by refining landing pages and high-impact conversion funnels.',
    icon: <Target className="service-icon-svg" size={24} />,
    gradient: 'linear-gradient(135deg, #FF6A00 0%, #FFB347 100%)',
  },
  {
    id: 5,
    title: 'Creative Systems',
    desc: 'Transform visual branding with custom assets engineered to convert modern audiences.',
    icon: <Sparkles className="service-icon-svg" size={24} />,
    tag: { text: '@creative', color: 'amber' },
    gradient: 'linear-gradient(135deg, #FF8C1A 0%, #FFF4D6 100%)',
  },
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
                onClick={() => isMobile && handleCardTap(index)}
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
                  <div className="service-card-body">
                    <h3 className="service-card-title">{service.title}</h3>
                    <p className="service-card-desc">{service.desc}</p>
                  </div>

                  {/* Card footer: decorative pill badge */}
                  <div className="service-card-footer">
                    <span className="service-pill-btn">
                      {isMobile && position === 0 ? 'Tap to Swipe' : 'Details'}{' '}
                      <ArrowRight size={12} className="pill-arrow" />
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
          <a href="#connect" className="services-btn-primary">
            Launch systems
          </a>
          <a href="#portfolio" className="services-btn-secondary">
            Explore works
          </a>
        </div>
      </div>
    </section>
  );
}
