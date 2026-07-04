import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function WhyChooseUs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleWrapperRef = useRef<HTMLDivElement>(null);
  const wordWhyRef = useRef<HTMLSpanElement>(null);
  const wordChooseRef = useRef<HTMLSpanElement>(null);
  const wordUsRef = useRef<HTMLDivElement>(null);
  const layoutContainerRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Perspective container set-up for 3D flip animation on CHOOSE
      gsap.set(wordChooseRef.current, { transformPerspective: 800 });

      // ScrollTrigger 1: Word Entrance animations (Triggers when the TITLE ITSELF enters the viewport bottom)
      const entranceTl = gsap.timeline({
        scrollTrigger: {
          trigger: titleWrapperRef.current,
          start: 'top 95%', // Starts exactly when the title starts entering the bottom of the viewport
          end: 'top 15%',   // Finishes when the title reaches its resting spot (right before section pins)
          scrub: 0.5,       // Fast responsive scrub
        },
      });

      // 1. "WHY" slides down and fades in
      entranceTl.fromTo(
        wordWhyRef.current,
        { y: -80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power2.out' }
      );

      // 2. "CHOOSE" 3D flips down from top
      entranceTl.fromTo(
        wordChooseRef.current,
        { rotationX: -70, y: 40, opacity: 0, transformOrigin: 'top center' },
        { rotationX: 0, y: 0, opacity: 1, duration: 1, ease: 'power2.out' },
        '-=0.4'
      );

      // 3. "→ US?" scale-spins up from center
      entranceTl.fromTo(
        wordUsRef.current,
        { scale: 0.4, rotate: -120, opacity: 0 },
        { scale: 1, rotate: 0, opacity: 1, duration: 1, ease: 'back.out(1.2)' },
        '-=0.4'
      );

      // ScrollTrigger 2: Pinning & Layout Reveal (Triggers once section reaches top)
      const pinTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=100%',     // Amount of scroll height to pin and reveal cards
          scrub: 0.5,        // Fast responsive scrub
          pin: true,         // Pin section
          anticipatePin: 1,
        },
      });

      // Phase 2a: Shift title wrapper slightly to left to focus (reactive shift)
      pinTl.to(titleWrapperRef.current, {
        scale: 0.94,
        x: -30,
        duration: 0.6,
        ease: 'power2.inOut',
      });

      // Phase 2b: Layout container rises up on the right side
      pinTl.fromTo(
        layoutContainerRef.current,
        { y: 180, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power2.out' },
        '-=0.3'
      );

      // Card-specific reveals inside layouts
      pinTl.fromTo(
        [card1Ref.current, card2Ref.current, card3Ref.current],
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.15, duration: 0.6, ease: 'power2.out' },
        '-=0.6'
      );

      pinTl.fromTo(
        rightCardRef.current,
        { scale: 0.92, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.2)' },
        '-=0.4'
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="why-choose-us" className="wcu-section">
      {/* Left Side: Title zone */}
      <div ref={titleWrapperRef} className="wcu-title-wrapper">
        <h2 className="wcu-main-title">
          <span ref={wordWhyRef} className="wcu-word wcu-why">
            WHY
          </span>
          <br />
          <span ref={wordChooseRef} className="wcu-word wcu-choose">
            CHOOSE
          </span>
          <br />
          <div ref={wordUsRef} className="wcu-word-row-us">
            <span className="wcu-arrow-circle">
              <ArrowRight className="wcu-arrow-icon" size={48} />
            </span>
            <span className="wcu-word wcu-us">
              US?
            </span>
          </div>
        </h2>
      </div>

      {/* Right Side: Content Layout Container (Rises on scroll) */}
      <div ref={layoutContainerRef} className="wcu-layout-container">
        {/* Stats Cards Grid */}
        <div className="wcu-stats-grid">
          {/* Card 1: Experience (Wide) */}
          <div ref={card1Ref} className="wcu-stat-card wcu-card-wide">
            <div className="wcu-stat-value">5+</div>
            <div className="wcu-stat-label">years of industry experience</div>
          </div>

          {/* Card 2: Partners */}
          <div ref={card2Ref} className="wcu-stat-card">
            <div className="wcu-stat-value">10+</div>
            <div className="wcu-stat-label">brand partners</div>
          </div>

          {/* Card 3: Team */}
          <div ref={card3Ref} className="wcu-stat-card">
            <div className="wcu-stat-value">10+</div>
            <div className="wcu-stat-label">team members</div>
          </div>
        </div>

        {/* Description Card */}
        <div ref={rightCardRef} className="wcu-description-card">
          <p className="wcu-description-text">
            At Affinity Kraft Solution, we provide personalized, data-first systems tailored to your brand. Our integrated engineering and creative teams collaborate closely to translate growth goals into predictable revenue systems. With a passion for performance and technical expertise, we design the marketing infrastructure that makes a lasting impact.
          </p>
        </div>
      </div>
    </section>
  );
}
