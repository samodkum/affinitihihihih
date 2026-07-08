import React, { useState, useRef } from 'react';
import './CaseStudies.css';

interface CaseStudy {
  id: string;
  industry: string;
  clientName: string;
  title: string;
  metricPreview: string;
  challenge: string;
  outcomes: { label: string; value: string }[];
  strategies: string[];
  quote: { text: string; author: string };
  gradient: string;
}

const caseStudiesData: CaseStudy[] = [
  {
    id: "cs-1",
    industry: "Logistics & Shipping",
    clientName: "Sea Vision Shipping",
    title: "B2B Freight Lead Pipeline",
    metricPreview: "+310% Leads Lift",
    challenge: "Low B2B digital touchpoints and fragmented lead pipelines for international chartering and cargo transportation lines.",
    outcomes: [
      { label: "Leads Lift", value: "+310%" },
      { label: "CAC Decrease", value: "-42%" },
      { label: "Pipeline Value", value: "$2.4M" }
    ],
    strategies: [
      "Implemented search engine optimization.",
      "LinkedIn account-based marketing (ABM) for freight forwarders.",
      "Real-time custom CRM lead pipelines."
    ],
    quote: {
      text: "Affinity Kraft helped us improve our online visibility and generate quality leads. Their strategic focus on growth completely aligned with our core commercial objectives.",
      author: "Capt. Rajesh Sharma, Operational Director"
    },
    gradient: "linear-gradient(135deg, rgba(255,106,0,0.2), rgba(12,12,20,0.9))"
  },
  {
    id: "cs-2",
    industry: "Retail & E-Commerce",
    clientName: "Usha",
    title: "Tier-2 & Tier-3 Penetration",
    metricPreview: "+180% Dealer Leads",
    challenge: "Fragmented dealer connection footprint and low engagement across tier-2 and tier-3 markets for premium home appliances.",
    outcomes: [
      { label: "Dealer Leads", value: "+180%" },
      { label: "Ad Impressions", value: "3.4M+" },
      { label: "Sales Lift", value: "+28%" }
    ],
    strategies: [
      "Deployed hyper-local digital advertising.",
      "Interactive visual dealer locators.",
      "Geo-targeted social activations."
    ],
    quote: {
      text: "The dealer network connect drive and localized digital ad strategies orchestrated by AKS amplified our tier-2 and tier-3 market penetration by leaps and bounds.",
      author: "Anoop Kumar, Senior Marketing Manager"
    },
    gradient: "linear-gradient(135deg, rgba(255,140,26,0.15), rgba(12,12,20,0.95))"
  },
  {
    id: "cs-3",
    industry: "Healthcare & Clinics",
    clientName: "Cure & Safe Homoeo",
    title: "Clinical Trust & Patient Funnels",
    metricPreview: "+240% Doctor Consults",
    challenge: "High customer acquisition cost (CAC) and lower clinical trust on virtual consultation pathways.",
    outcomes: [
      { label: "Doctor Consults", value: "+240%" },
      { label: "CPA Reduction", value: "-55%" },
      { label: "Reviews Rating", value: "4.8" }
    ],
    strategies: [
      "Created trust-focused multi-channel video funnels.",
      "Automated patient booking systems.",
      "Google Local Services optimization."
    ],
    quote: {
      text: "Their strategic approach delivered measurable business growth. The marketing systems built by AKS are highly scalable and yield consistent, high-intent lead volume.",
      author: "Dr. S. K. Mukhopadhyay, Managing Director"
    },
    gradient: "linear-gradient(135deg, rgba(255,179,71,0.2), rgba(6,6,10,0.9))"
  },
  {
    id: "cs-4",
    industry: "Retail & E-Commerce",
    clientName: "Go Zero",
    title: "D2C Subscription Scaling",
    metricPreview: "+420% Subscription Sales",
    challenge: "Scaling Direct-to-Consumer (D2C) sugar-free ice cream subscriptions inside premium metro channels against heavy legacy competition.",
    outcomes: [
      { label: "Sub Sales", value: "+420%" },
      { label: "Viral Views", value: "15M+" },
      { label: "ROAS Boost", value: "3.8x" }
    ],
    strategies: [
      "Executed precise lifestyle Instagram visual ads.",
      "Direct micro-influencer product seeding.",
      "Deep checkout funnel optimization."
    ],
    quote: {
      text: "Professional team, transparent communication, and excellent results. If you are looking for an agency that operates on accountability and data, look no further.",
      author: "Saurabh Sharda, Co-Founder & CMO"
    },
    gradient: "linear-gradient(135deg, rgba(255,106,0,0.15), rgba(12,12,20,0.85))"
  },
  {
    id: "cs-5",
    industry: "Restaurants & Cafes",
    clientName: "Murli's",
    title: "Corporate Catering Pipelines",
    metricPreview: "+215% Catering Revenue",
    challenge: "Underutilized corporate catering capabilities and flat weekday bulk booking pipelines.",
    outcomes: [
      { label: "Catering Rev", value: "+215%" },
      { label: "Corporate Accts", value: "45+" },
      { label: "Inquiry Lift", value: "+85%" }
    ],
    strategies: [
      "Orchestrated targeted LinkedIn bulk B2B corporate catering campaigns.",
      "Interactive catering menu budget builder.",
      "Direct outreach automation."
    ],
    quote: {
      text: "AKS automated our bulk booking pipelines and commercial catering outreach. We recorded an unprecedented surge in corporate event contracts in just 90 days.",
      author: "Murli Dhar, Founder"
    },
    gradient: "linear-gradient(135deg, rgba(255,140,26,0.2), rgba(6,6,10,0.95))"
  },
  {
    id: "cs-6",
    industry: "Retail & E-Commerce",
    clientName: "ASICS",
    title: "Runner Club Engagement",
    metricPreview: "+140% Sign-ups",
    challenge: "Low member engagement for regional running programs and underperforming digital launch metrics on new footwear lines.",
    outcomes: [
      { label: "Club Sign-ups", value: "+140%" },
      { label: "Product Sell-out", value: "92%" },
      { label: "Conversion Rate", value: "4.2%" }
    ],
    strategies: [
      "Launched localized micro-influencer physical runs.",
      "Dynamic retargeting campaigns for cart abandoners.",
      "High-contrast motion banner ads."
    ],
    quote: {
      text: "Our brand loyalty programs and regional fitness activations saw record participation because of AKS's precise segment targeting and motion-rich visual marketing.",
      author: "Meagan Scott, Head of Marketing"
    },
    gradient: "linear-gradient(135deg, rgba(255,179,71,0.15), rgba(12,12,20,0.9))"
  },
  {
    id: "cs-7",
    industry: "Professional Services",
    clientName: "Wipro",
    title: "Account-Based Cloud Marketing",
    metricPreview: "+65% MQL Boost",
    challenge: "Long cloud consultancy sales cycles and poor initial content touchpoint interaction on enterprise solutions.",
    outcomes: [
      { label: "MQL Boost", value: "+65%" },
      { label: "Cycle Speed", value: "+30%" },
      { label: "Enterprise Ops", value: "12" }
    ],
    strategies: [
      "Deployed comprehensive LinkedIn Account-Based Marketing (ABM) pipelines.",
      "Premium educational asset downloads.",
      "Lead intelligence scoring."
    ],
    quote: {
      text: "The custom B2B content funnels and multi-channel lead enrichment pipelines built by the AKS team are highly integrated, enterprise-secure, and robust.",
      author: "Venkatesh Rao, VP of Enterprise Solutions Marketing"
    },
    gradient: "linear-gradient(135deg, rgba(255,106,0,0.25), rgba(6,6,10,0.85))"
  },
  {
    id: "cs-8",
    industry: "Restaurants & Cafes",
    clientName: "Karim's",
    title: "Cinematic Food Storytelling",
    metricPreview: "+48% Weekday Dine-in",
    challenge: "Attracting weekday family diners and adapting heritage marketing to millennial culinary consumers.",
    outcomes: [
      { label: "Weekday Dine-in", value: "+48%" },
      { label: "Video Reach", value: "8.5M" },
      { label: "Direct Delivery", value: "+110%" }
    ],
    strategies: [
      "Crafted cinematic storytelling culinary video series.",
      "Local food influencer degustation reviews.",
      "Hyper-targeted Instagram reels."
    ],
    quote: {
      text: "Their localized culinary storytelling and heritage-focused video campaigns brought thousands of new diners to our branches while honoring our historic culinary legacy.",
      author: "Zaeemuddin Ahmed, Managing Partner"
    },
    gradient: "linear-gradient(135deg, rgba(255,140,26,0.15), rgba(12,12,20,0.9))"
  },
  {
    id: "cs-9",
    industry: "Retail & E-Commerce",
    clientName: "ITC Limited",
    title: "Organic Distributor Launch",
    metricPreview: "+190% Dealer Trials",
    challenge: "Slow distributor adoption speed and low initial trial rates for a premium organic food portfolio.",
    outcomes: [
      { label: "Dealer Trials", value: "+190%" },
      { label: "Bulk Retailers", value: "8.5K+" },
      { label: "Time-to-Market", value: "35% Faster" }
    ],
    strategies: [
      "Built geo-fenced dealer awareness campaigns.",
      "Automated bulk wholesale self-service applications.",
      "Targeted trade-fair ads."
    ],
    quote: {
      text: "A highly competent partner for digital launch activations. AKS's automated distributor outreach and regional campaigns scaled our product roll-out smoothly.",
      author: "Rajesh Gopinath, Brand Manager"
    },
    gradient: "linear-gradient(135deg, rgba(255,179,71,0.2), rgba(6,6,10,0.95))"
  },
  {
    id: "cs-10",
    industry: "Retail & E-Commerce",
    clientName: "Chai Xpress",
    title: "Checkout Flow Optimization",
    metricPreview: "-32% Checkout Drop",
    challenge: "High cart abandonment rates on checkout page and stagnant subscription volume for international premium loose tea selections.",
    outcomes: [
      { label: "Tea Subscribers", value: "+160%" },
      { label: "Checkout Drop", value: "-32%" },
      { label: "ROAS Average", value: "4.5x" }
    ],
    strategies: [
      "Re-engineered frictionless checkout UI.",
      "Set up abandoned checkout automated SMS/email flows.",
      "Seasonal search ads."
    ],
    quote: {
      text: "AKS streamlined our direct subscription service, introducing custom checkout flows that reduced cart abandonment rates by over 30%.",
      author: "Arjun Sen, Director of Digital Commerce"
    },
    gradient: "linear-gradient(135deg, rgba(255,106,0,0.15), rgba(12,12,20,0.9))"
  },
  {
    id: "cs-11",
    industry: "Education",
    clientName: "Frankfinn",
    title: "Counseling Lead Qualification",
    metricPreview: "+270% Qualified Leads",
    challenge: "Low admissions team touch-rates due to high proportion of unverified and cold student inquiry forms.",
    outcomes: [
      { label: "Qualified Leads", value: "+270%" },
      { label: "Enrollment CR", value: "+45%" },
      { label: "Consultations", value: "400+" }
    ],
    strategies: [
      "Implemented multi-step educational qualifying landing pages.",
      "SMS-based verification layers.",
      "Local student seminar invitations."
    ],
    quote: {
      text: "Our student enrollment counseling lines were continuously filled with highly qualified applicants. AKS's lead verification pipeline works incredibly well.",
      author: "Sanjay Kumar, Head of Admissions & Marketing"
    },
    gradient: "linear-gradient(135deg, rgba(255,140,26,0.2), rgba(6,6,10,0.9))"
  },
  {
    id: "cs-12",
    industry: "Retail & E-Commerce",
    clientName: "Haldiram's",
    title: "Corporate Festive Gifting",
    metricPreview: "+195% Gifting Volume",
    challenge: "Inefficient outreach targeting corporate human resource and purchase leads during high-volume festive seasons.",
    outcomes: [
      { label: "Gifting Volume", value: "+195%" },
      { label: "Corporate Clients", value: "320" },
      { label: "Average Order", value: "+60%" }
    ],
    strategies: [
      "Developed LinkedIn corporate purchasing agent lists.",
      "Customized corporate gifting PDF builders.",
      "Direct email lead enrichment."
    ],
    quote: {
      text: "AKS's digital strategy during key festival seasons catalyzed our premium corporate gift-box sales, delivering unmatched local performance across regions.",
      author: "Manish Agarwal, VP of Corporate Gifting"
    },
    gradient: "linear-gradient(135deg, rgba(255,179,71,0.15), rgba(12,12,20,0.85))"
  }
];

const themes = ['theme-orange', 'theme-white', 'theme-charcoal', 'theme-black'];

const CaseStudies: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(caseStudiesData[0].id);
  const [activeCard, setActiveCard] = useState<CaseStudy | null>(null);
  
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const isTouchActionRef = useRef<boolean>(false);
  const wasExpandedRef = useRef<boolean>(false);

  const scrollLeft = () => {
    if (scrollTrackRef.current) {
      scrollTrackRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollTrackRef.current) {
      scrollTrackRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const handleCardClick = (study: CaseStudy) => {
    if (isTouchActionRef.current) {
      isTouchActionRef.current = false; // Reset
      if (!wasExpandedRef.current) {
        // If it wasn't expanded when touch started, just expand it (which touchstart did)
        // and prevent opening the modal.
        return;
      }
    }
    setActiveCard(study);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };

  const handleTouchStart = (id: string) => {
    isTouchActionRef.current = true;
    wasExpandedRef.current = (hoveredId === id);
    setHoveredId(id);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 0) return;
    const touch = e.touches[0];
    const element = document.elementFromPoint(touch.clientX, touch.clientY);
    if (element) {
      const card = element.closest('.cs-accordion-card');
      if (card) {
        const cardId = card.getAttribute('data-id');
        if (cardId && cardId !== hoveredId) {
          setHoveredId(cardId);
          wasExpandedRef.current = false; // Sliding onto a new card counts as not expanded initially
        }
      }
    }
  };

  const handleCloseActive = () => {
    setActiveCard(null);
    document.body.style.overflow = '';
  };

  // When mouse leaves the track, we want to maintain a default opened card (like the first one)
  // or leave the last hovered open. For now, leaving the last hovered open feels smoother.
  // The prompt says "First card is expanded by default when nothing is hovered".
  const handleMouseLeaveTrack = () => {
    setHoveredId(caseStudiesData[0].id);
  };

  const activeCardIndex = activeCard ? caseStudiesData.findIndex(cs => cs.id === activeCard.id) : -1;
  const activeThemeClass = activeCardIndex !== -1 ? themes[activeCardIndex % themes.length] : '';

  return (
    <section id="case-studies" className="section case-studies-section">
      <div className="section-header">
        <span className="section-tag">Case Studies Hub</span>
        <h2 className="section-title">Proven <span>Outcomes</span></h2>
        <p className="section-desc">
          Explore how we've engineered exponential growth and solved complex marketing challenges for industry leaders.
        </p>
      </div>

      <div className="cs-carousel-container" onMouseLeave={handleMouseLeaveTrack}>
        {/* Scroll Track & Mask */}
        <div className="cs-scroll-mask">
          <div 
            className="cs-scroll-track" 
            ref={scrollTrackRef}
            onTouchMove={handleTouchMove}
          >
            {caseStudiesData.map((study, idx) => {
              const isHovered = hoveredId === study.id;
              const themeClass = themes[idx % themes.length];
              
              return (
                <div 
                  key={study.id}
                  data-id={study.id}
                  className={`cs-accordion-card ${isHovered ? 'expanded' : 'collapsed'} ${themeClass}`}
                  onMouseEnter={() => setHoveredId(study.id)}
                  onTouchStart={() => handleTouchStart(study.id)}
                  onClick={() => handleCardClick(study)}
                >
                  <div className="cs-card-inner">
                    {/* Collapsed State Title */}
                    <div className="cs-collapsed-title">
                      <h3>{study.clientName}</h3>
                    </div>

                    {/* Expanded State Content */}
                    <div className="cs-expanded-content">
                      <div className="cs-content-inner">
                        <div className="cs-meta">
                          <span className="cs-industry">{study.industry}</span>
                          <span className="cs-client">{study.clientName}</span>
                        </div>
                        <h3 className="cs-title-expanded">{study.title}</h3>
                        <div className="cs-metric-badge">{study.metricPreview}</div>
                        <p className="cs-challenge-preview">{study.challenge}</p>
                        <button className="cs-explore-btn">
                          View Case Study 
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Scroll Controls (Placed after mask for z-index stacking context) */}
        <button className="cs-scroll-btn left" onClick={scrollLeft} aria-label="Scroll left">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 19l-7-7 7-7" /></svg>
        </button>
        <button className="cs-scroll-btn right" onClick={scrollRight} aria-label="Scroll right">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>

      {/* 3D Center Flip Modal */}
      <div className={`cs-modal-overlay ${activeCard ? 'active' : ''}`} onClick={handleCloseActive}>
        <div className="cs-modal-perspective">
          <div 
            className={`cs-3d-card ${activeCard ? 'flipped' : ''} ${activeThemeClass}`} 
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking card
          >
            {activeCard && (
              <>
                {/* Front Side (Visual anchor during flight) */}
                <div className="cs-card-face cs-card-front">
                  <div className="cs-meta">
                    <span>{activeCard.industry}</span>
                  </div>
                  <h3>{activeCard.title}</h3>
                </div>

                {/* Back Side (The actual case study details) */}
                <div className="cs-card-face cs-card-back">
                  <button className="cs-close-btn" onClick={handleCloseActive}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                  </button>
                  
                  <div className="cs-back-scrollable">
                    <div className="cs-back-header">
                      <span className="cs-back-industry">{activeCard.industry}</span>
                      <h2>{activeCard.clientName}</h2>
                      <p className="cs-back-subtitle">{activeCard.title}</p>
                    </div>

                    <div className="cs-metrics-grid">
                      {activeCard.outcomes.map((outcome, idx) => (
                        <div key={idx} className="cs-metric-box">
                          <h4>{outcome.value}</h4>
                          <p>{outcome.label}</p>
                        </div>
                      ))}
                    </div>

                    <div className="cs-back-section">
                      <h3>The Challenge</h3>
                      <p>{activeCard.challenge}</p>
                    </div>

                    <div className="cs-back-section">
                      <h3>Our Strategy</h3>
                      <ul className="cs-strategy-list">
                        {activeCard.strategies.map((strategy, idx) => (
                          <li key={idx}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="var(--accent-purple)" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            {strategy}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="cs-back-quote">
                      <p>"{activeCard.quote.text}"</p>
                      <span>- {activeCard.quote.author}</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
