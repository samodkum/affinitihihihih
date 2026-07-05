import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, Compass, Sliders, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ProcessStep {
  id: number;
  number: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
}

const steps: ProcessStep[] = [
  {
    id: 1,
    number: '01',
    title: 'Discovery',
    desc: 'We conduct a deep dive into your current analytics, operational workflows, and growth bottlenecks to locate high-leverage scaling opportunities.',
    icon: <Search className="process-icon-svg" size={24} />,
  },
  {
    id: 2,
    number: '02',
    title: 'Strategy',
    desc: 'Designing a bespoke digital roadmap that integrates media acquisition, tailored conversions, and custom automated workflows.',
    icon: <Compass className="process-icon-svg" size={24} />,
  },
  {
    id: 3,
    number: '03',
    title: 'Implementation',
    desc: 'Deploying high-impact creative elements, API integrations, real-time BI dashboards, and bulletproof marketing automation setups.',
    icon: <Sliders className="process-icon-svg" size={24} />,
  },
  {
    id: 4,
    number: '04',
    title: 'Optimization',
    desc: 'Applying rigorous A/B testing, fine-tuning user retention flows, and optimizing attribution models to unlock compounding ROI.',
    icon: <Zap className="process-icon-svg" size={24} />,
  },
];

export default function OurProcess() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const wordOurRef = useRef<HTMLSpanElement>(null);
  const wordProcessRef = useRef<HTMLSpanElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const glowPathRef = useRef<SVGPathElement>(null);
  const bgPathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    // Setup path lengths for drawing animation
    const pathLength = glowPathRef.current?.getTotalLength() || 0;
    if (glowPathRef.current) {
      gsap.set(glowPathRef.current, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
      });
    }

    const trackVal = trackRef.current ? trackRef.current.offsetWidth : 2600;
    const getScrollDistance = () => {
      return trackVal - window.innerWidth;
    };

    // ─── DESKTOP / TABLET (min-width: 681px) ──────────────────────────────────
    mm.add("(min-width: 681px)", () => {
      // Centering and perspective setup
      gsap.set(titleRef.current, { xPercent: -50, yPercent: -50 });
      gsap.set(wordProcessRef.current, { transformPerspective: 800 });

      // 1. Initial Word Bounce/Flip Animation
      const entranceTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 95%',
          end: 'top top',
          scrub: 0.5,
        },
      });

      entranceTl.fromTo(
        wordOurRef.current,
        { scale: 0.4, rotate: -120, opacity: 0 },
        { scale: 1, rotate: 0, opacity: 1, duration: 1.2, ease: 'back.out(1.4)' }
      );

      entranceTl.fromTo(
        wordProcessRef.current,
        { scale: 0.4, rotate: -120, opacity: 0 },
        { scale: 1, rotate: 0, opacity: 1, duration: 1.2, ease: 'back.out(1.4)' },
        '-=0.6'
      );

      // 2. Primary Pin & Scroll Timeline
      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=300%',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      mainTl.to(
        titleRef.current,
        {
          opacity: 0,
          scale: 0.8,
          x: '-60vw',
          duration: 1.8,
          ease: 'power2.inOut',
        },
        0
      );

      mainTl.fromTo(
        trackRef.current,
        { x: '35vw' },
        {
          x: () => -getScrollDistance(),
          duration: 4.5,
          ease: 'none',
        },
        0
      );

      mainTl.fromTo(
        trackRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.0, ease: 'power2.out' },
        0
      );

      mainTl.to(
        glowPathRef.current,
        {
          strokeDashoffset: 0,
          duration: 4.0,
          ease: 'none',
        },
        0.8
      );

      // Horizontal scroll triggers for individual cards
      cardsRef.current.forEach((card, idx) => {
        if (!card) return;

        mainTl.fromTo(
          card,
          { opacity: 0, scale: 0.85 },
          { opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out' },
          1.2 + idx * 0.8
        );

        gsap.to(card, {
          scrollTrigger: {
            trigger: card,
            containerAnimation: mainTl,
            start: 'left 70%',
            end: 'right 30%',
            toggleActions: 'play reverse play reverse',
            onEnter: () => card.classList.add('card-active'),
            onLeave: () => card.classList.remove('card-active'),
            onEnterBack: () => card.classList.add('card-active'),
            onLeaveBack: () => card.classList.remove('card-active'),
          },
        });
      });
    });

    // ─── MOBILE (max-width: 680px) ───────────────────────────────────────────
    mm.add("(max-width: 680px)", () => {
      // Set the container to be visible initially, and let the entrance scrub the words.
      gsap.set(titleRef.current, { xPercent: -50, yPercent: -50, opacity: 1 });
      gsap.set(wordProcessRef.current, { transformPerspective: 800 });

      // Title entrance (before pin kicks in)
      const entranceTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 95%',
          end: 'top 70%',
          scrub: 0.5,
        },
      });

      entranceTl.fromTo(
        wordOurRef.current,
        { scale: 0.4, rotate: -120, opacity: 0 },
        { scale: 1, rotate: 0, opacity: 1, duration: 1.2, ease: 'back.out(1.4)' }
      );

      entranceTl.fromTo(
        wordProcessRef.current,
        { scale: 0.4, rotate: -120, opacity: 0 },
        { scale: 1, rotate: 0, opacity: 1, duration: 1.2, ease: 'back.out(1.4)' },
        '-=0.6'
      );

      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=250%',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Fade title out quickly at the start of scroll so it is gone when the first card appears
      mainTl.to(
        titleRef.current,
        {
          opacity: 0,
          scale: 0.7,
          x: '-50vw',
          duration: 1.0,
          ease: 'power2.inOut',
        },
        0.1
      );

      // Track slides horizontally
      mainTl.fromTo(
        trackRef.current,
        { x: '100vw' },
        {
          x: () => -getScrollDistance(),
          duration: 4.5,
          ease: 'none',
        },
        0
      );

      // Track fades in quickly at the start of scroll
      mainTl.fromTo(
        trackRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
        },
        0
      );

      // Animate line
      mainTl.to(
        glowPathRef.current,
        {
          strokeDashoffset: 0,
          duration: 4.0,
          ease: 'none',
        },
        0.6
      );

      // Setup cards
      cardsRef.current.forEach((card, idx) => {
        if (!card) return;
        mainTl.fromTo(
          card,
          { opacity: 0, scale: 0.92 },
          { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' },
          1.0 + idx * 0.8
        );

        gsap.to(card, {
          scrollTrigger: {
            trigger: card,
            containerAnimation: mainTl,
            start: 'left 60%',
            end: 'right 40%',
            toggleActions: 'play reverse play reverse',
            onEnter: () => card.classList.add('card-active'),
            onLeave: () => card.classList.remove('card-active'),
            onEnterBack: () => card.classList.add('card-active'),
            onLeaveBack: () => card.classList.remove('card-active'),
          },
        });
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} id="our-process" className="process-section">
      <div ref={viewportRef} className="process-viewport">
        {/* Pinned Title (starts centered, fades out on scroll) */}
        <h2 ref={titleRef} className="process-title">
          <div className="process-title-line">
            <span ref={wordOurRef} className="process-word">OUR</span>
          </div>
          <div className="process-title-line">
            <span ref={wordProcessRef} className="process-word">PROCESS</span>
          </div>
        </h2>

        {/* Horizontal Track */}
        <div ref={trackRef} className="process-track">
          
          {/* Connector Wavy SVG Line */}
          <svg
            className="process-svg-connector"
            viewBox="0 0 2600 600"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Glow Filter */}
              <filter id="glow-filter" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Gradient for the line */}
              <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FF6A00" />
                <stop offset="50%" stopColor="#FF8C1A" />
                <stop offset="100%" stopColor="#FFB347" />
              </linearGradient>
            </defs>

            {/* Background Path (subtle grey) */}
            <path
              ref={bgPathRef}
              d="M 150 180 C 250 180, 300 180, 400 180 C 700 180, 700 420, 1000 420 C 1300 420, 1300 180, 1600 180 C 1900 180, 1900 420, 2200 420 C 2300 420, 2350 420, 2450 420"
              stroke="rgba(255, 255, 255, 0.05)"
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* Glowing Active Path (animated) */}
            <path
              ref={glowPathRef}
              d="M 150 180 C 250 180, 300 180, 400 180 C 700 180, 700 420, 1000 420 C 1300 420, 1300 180, 1600 180 C 1900 180, 1900 420, 2200 420 C 2300 420, 2350 420, 2450 420"
              stroke="url(#line-gradient)"
              strokeWidth="4"
              strokeLinecap="round"
              filter="url(#glow-filter)"
            />
          </svg>

          {/* Cards (Alternate positions built in absolute values) */}
          {steps.map((step, idx) => {
            // Determine vertical position centered on Y=180 or Y=420
            const isTop = idx % 2 === 0;
            const topVal = isTop ? '180px' : '420px';
            const leftVal = `${400 + idx * 600}px`;

            return (
              <div
                key={step.id}
                ref={(el) => {
                  cardsRef.current[idx] = el;
                }}
                className={`process-card ${isTop ? 'card-top' : 'card-bottom'}`}
                style={{
                  left: leftVal,
                  top: topVal,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                {/* Node point (where the line intersects the card) */}
                <div className="process-node">
                  <div className="process-node-inner" />
                </div>

                <div className="process-card-content">
                  <div className="process-card-header">
                    <span className="process-step-num">{step.number}</span>
                    <span className="process-step-icon">{step.icon}</span>
                  </div>
                  <h3 className="process-card-title">{step.title}</h3>
                  <p className="process-card-desc">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
