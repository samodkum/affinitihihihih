import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const [activeTab, setActiveTab] = useState<'perf' | 'ops' | 'creatives'>('ops');
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const underlineRef = useRef<HTMLDivElement>(null);
  const row1CardRef = useRef<HTMLDivElement>(null);
  const row1BlockRef = useRef<HTMLDivElement>(null);
  const row2CardRef = useRef<HTMLDivElement>(null);
  const row2BlockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title and underline drawing
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
          }
        }
      );

      gsap.fromTo(
        underlineRef.current,
        { width: '0%', opacity: 0 },
        {
          width: '120px',
          opacity: 1,
          duration: 1.0,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
          }
        }
      );

      // Row 1 3D entrance
      const row1Tl = gsap.timeline({
        scrollTrigger: {
          trigger: row1CardRef.current,
          start: 'top 80%',
        }
      });

      row1Tl.fromTo(
        row1CardRef.current,
        { opacity: 0, x: -60, rotateY: 10, transformPerspective: 1000 },
        { opacity: 1, x: 0, rotateY: 0, duration: 0.9, ease: 'power3.out' }
      );

      row1Tl.fromTo(
        row1BlockRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
        '-=0.5'
      );

      // Row 2 3D entrance
      const row2Tl = gsap.timeline({
        scrollTrigger: {
          trigger: row2CardRef.current,
          start: 'top 80%',
        }
      });

      row2Tl.fromTo(
        row2CardRef.current,
        { opacity: 0, x: 60, rotateY: -10, transformPerspective: 1000 },
        { opacity: 1, x: 0, rotateY: 0, duration: 0.9, ease: 'power3.out' }
      );

      row2Tl.fromTo(
        row2BlockRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
        '-=0.5'
      );

      // Parallax effect on card images
      const visualContainers = document.querySelectorAll('.about-card-visual');
      visualContainers.forEach((container) => {
        const img = container.querySelector('img');
        if (img) {
          gsap.fromTo(
            img,
            { yPercent: -8, scale: 1.05 },
            {
              yPercent: 8,
              scale: 1.0,
              ease: 'none',
              scrollTrigger: {
                trigger: container,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
              }
            }
          );
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="about-section">
      {/* Header */}
      <div className="about-header">
        <h2 ref={titleRef} className="about-section-title">About Us</h2>
        <div ref={underlineRef} className="about-title-underline" />
      </div>

      <div className="about-content">
        {/* Row 1 */}
        <div className="about-row about-row-1">
          {/* Large Container Left (Image Left, Text Right) */}
          <div ref={row1CardRef} className="about-large-card card-glow-orange">
            <div className="about-card-split">
              <div className="about-card-visual">
                <img
                  src="/about_data_systems.png"
                  alt="Data Systems & Analytics"
                  className="about-card-img"
                />
              </div>
              <div className="about-card-info">
                <h3 className="about-card-title">Our philosophy is built on data-driven growth</h3>
                <p className="about-card-text">
                  We believe that marketing is a science, not a guessing game. By engineering bulletproof marketing systems and scaling automation workflows, we give ambitious brands the leverage they need to dominate search and social auctions.
                </p>
                <p className="about-card-text text-muted-warm">
                  Our custom analytics and cohort tracking protocols remove the guesswork, letting you allocate spend with absolute confidence.
                </p>
              </div>
            </div>
          </div>

          {/* Small Block Right (Floating Text + Button) */}
          <div ref={row1BlockRef} className="about-small-block">
            <p className="about-small-text">
              We engineer the marketing automation and tracking systems that help your brand scale predictably.
            </p>
            <button className="about-pill-btn">
              Our Philosophy <ArrowRight size={14} className="about-pill-arrow" />
            </button>
          </div>
        </div>

        {/* Row 2 */}
        <div className="about-row about-row-2">
          {/* Small Block Left (Floating Text + Button) */}
          <div ref={row2BlockRef} className="about-small-block">
            <p className="about-small-text">
              Partner directly with certified marketing engineers, data architects, and creative strategists.
            </p>
            <button className="about-pill-btn">
              Meet the Team <ArrowRight size={14} className="about-pill-arrow" />
            </button>
          </div>

          {/* Large Container Right (Text Left, Image Right) */}
          <div ref={row2CardRef} className="about-large-card card-glow-amber">
            <div className="about-card-split split-reverse">
              <div className="about-card-info">
                <h3 className="about-card-title">High-performance execution meets creative design</h3>
                
                {/* Smooth Tab Content Wrapper */}
                <div className="about-tab-content-wrapper">
                  <div className={`about-card-text tab-pane ${activeTab === 'perf' ? 'active' : ''}`}>
                    Our performance operations are focused on maximizing capital efficiency. We integrate predictive cohort analysis and API-level attribution to lower acquisition costs.
                  </div>
                  <div className={`about-card-text tab-pane ${activeTab === 'ops' ? 'active' : ''}`}>
                    From tracking infrastructure to CRM integrations, we design operations that unify marketing datasets and streamline workflows, letting your team focus on core growth.
                  </div>
                  <div className={`about-card-text tab-pane ${activeTab === 'creatives' ? 'active' : ''}`}>
                    We develop creative assets engineered to capture attention and convert. By combining behavioral psychology with premium aesthetics, our layouts drive actions.
                  </div>
                </div>

                {/* Bottom Toggle Controls */}
                <div className="about-card-toggles">
                  <button
                    className={`about-toggle-btn ${activeTab === 'perf' ? 'active' : ''}`}
                    onClick={() => setActiveTab('perf')}
                  >
                    Performance
                  </button>
 
                  <div className="about-toggle-nav">
                    <button
                      className="about-toggle-arrow"
                      onClick={() => {
                        if (activeTab === 'ops') setActiveTab('perf');
                        else if (activeTab === 'creatives') setActiveTab('ops');
                        else setActiveTab('creatives');
                      }}
                      aria-label="Previous option"
                    >
                      <ChevronLeft size={14} />
                    </button>
                    <span className="about-toggle-nav-label">
                      {activeTab === 'perf' && 'Strategy'}
                      {activeTab === 'ops' && 'Look for'}
                      {activeTab === 'creatives' && 'Assets'}
                    </span>
                    <button
                      className="about-toggle-arrow"
                      onClick={() => {
                        if (activeTab === 'perf') setActiveTab('ops');
                        else if (activeTab === 'ops') setActiveTab('creatives');
                        else setActiveTab('perf');
                      }}
                      aria-label="Next option"
                    >
                      <ChevronRight size={14} />
                    </button>
                  </div>
 
                  <button
                    className={`about-toggle-btn ${activeTab === 'creatives' ? 'active' : ''}`}
                    onClick={() => setActiveTab('creatives')}
                  >
                    Creatives
                  </button>
                </div>
              </div>
              <div className="about-card-visual">
                <img
                  src="/about_team_execution.png"
                  alt="Team Work & Strategy"
                  className="about-card-img"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
