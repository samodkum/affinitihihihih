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
    industry: "E-Commerce",
    clientName: "Zephyr Retail",
    title: "Scaling Direct-to-Consumer Growth",
    metricPreview: "+340% ROAS",
    challenge: "Zephyr Retail was struggling with high customer acquisition costs and low retention in a saturated fashion market. They needed a robust digital pipeline to scale profitably.",
    outcomes: [
      { label: "ROAS Increase", value: "340%" },
      { label: "CAC Reduction", value: "45%" },
      { label: "New Users", value: "120K+" }
    ],
    strategies: [
      "Implemented a hyper-segmented performance marketing funnel.",
      "Redesigned the checkout flow to reduce friction, dropping abandonment by 25%.",
      "Deployed automated email sequences for cart recovery and post-purchase upselling."
    ],
    quote: {
      text: "AKS didn't just run ads; they re-engineered our growth engine. The returns have been nothing short of phenomenal.",
      author: "CEO, Zephyr Retail"
    },
    gradient: "linear-gradient(135deg, rgba(255,106,0,0.2), rgba(12,12,20,0.9))"
  },
  {
    id: "cs-2",
    industry: "Healthcare SaaS",
    clientName: "MedFlow Systems",
    title: "Enterprise Lead Generation",
    metricPreview: "4x Qualified Leads",
    challenge: "MedFlow's sales team was wasting hours on unqualified leads. They needed a B2B demand generation strategy that filtered intent and nurtured enterprise prospects.",
    outcomes: [
      { label: "MQL to SQL", value: "65%" },
      { label: "Sales Cycle", value: "-30 days" },
      { label: "Pipeline Value", value: "$4.2M" }
    ],
    strategies: [
      "Developed an authoritative content hub with gated whitepapers.",
      "Launched account-based marketing (ABM) campaigns targeting hospital administrators.",
      "Integrated lead scoring models via HubSpot and LinkedIn matched audiences."
    ],
    quote: {
      text: "The quality of conversations our sales team is having now is incredible. Every lead is verified, educated, and ready to buy.",
      author: "VP of Sales, MedFlow Systems"
    },
    gradient: "linear-gradient(135deg, rgba(255,140,26,0.15), rgba(12,12,20,0.95))"
  },
  {
    id: "cs-3",
    industry: "Real Estate",
    clientName: "Oasis Properties",
    title: "Premium Property Launches",
    metricPreview: "100% Sold in 48h",
    challenge: "Oasis needed to launch a luxury villa project but faced a stagnant local market. They required a high-impact digital launch to attract high-net-worth investors.",
    outcomes: [
      { label: "Inventory Sold", value: "100%" },
      { label: "Launch Time", value: "48 Hours" },
      { label: "Cost per Lead", value: "-60%" }
    ],
    strategies: [
      "Created an immersive 3D virtual tour landing page experience.",
      "Executed a geo-fenced programmatic ad campaign targeting luxury enclaves.",
      "Built a VIP early-access WhatsApp community to drive urgency."
    ],
    quote: {
      text: "A masterclass in digital luxury marketing. They sold out our flagship project before the physical launch event even started.",
      author: "Director, Oasis Properties"
    },
    gradient: "linear-gradient(135deg, rgba(255,179,71,0.2), rgba(6,6,10,0.9))"
  },
  {
    id: "cs-4",
    industry: "Fintech",
    clientName: "Finova App",
    title: "App User Acquisition",
    metricPreview: "2M+ Downloads",
    challenge: "A new personal finance app needed to break through the noise of established competitors and acquire loyal, daily active users at scale.",
    outcomes: [
      { label: "Total Installs", value: "2.5M" },
      { label: "Cost per Install", value: "$0.85" },
      { label: "App Rating", value: "4.8/5" }
    ],
    strategies: [
      "Leveraged influencer marketing and user-generated content (UGC) for TikTok and Reels.",
      "Optimized App Store (ASO) listings with localized keywords and A/B tested screenshots.",
      "Implemented gamified referral loops inside the app to drive viral coefficient."
    ],
    quote: {
      text: "Our user base exploded globally. The blend of creative viral content and precise media buying was the perfect catalyst.",
      author: "Co-Founder, Finova App"
    },
    gradient: "linear-gradient(135deg, rgba(255,106,0,0.15), rgba(12,12,20,0.85))"
  },
  {
    id: "cs-5",
    industry: "Hospitality",
    clientName: "Grand Azure Hotels",
    title: "Direct Booking Domination",
    metricPreview: "+210% Direct Revenue",
    challenge: "Grand Azure was losing excessive margins to online travel agencies (OTAs) and needed to shift their revenue mix toward direct website bookings.",
    outcomes: [
      { label: "Direct Bookings", value: "+210%" },
      { label: "OTA Dependency", value: "-40%" },
      { label: "Loyalty Signups", value: "55K" }
    ],
    strategies: [
      "Redesigned the booking engine for zero-friction mobile conversions.",
      "Launched targeted search (SEM) campaigns bidding on high-intent vacation keywords.",
      "Introduced a 'Direct Price Match' guarantee with exclusive perks marketed via social."
    ],
    quote: {
      text: "We took back control of our margins. The new direct booking strategy completely transformed our profitability this season.",
      author: "CMO, Grand Azure Hotels"
    },
    gradient: "linear-gradient(135deg, rgba(255,140,26,0.2), rgba(6,6,10,0.95))"
  },
  {
    id: "cs-6",
    industry: "Education Tech",
    clientName: "SkillBridge",
    title: "Global Student Enrollment",
    metricPreview: "15k+ Enrollments",
    challenge: "SkillBridge wanted to scale their online certification courses globally but struggled with varied localization and high competition in the ed-tech space.",
    outcomes: [
      { label: "Total Enrollments", value: "15,240" },
      { label: "Global Reach", value: "42 Countries" },
      { label: "CPA Reduction", value: "35%" }
    ],
    strategies: [
      "Deployed dynamically translated ad creatives across 15 regions.",
      "Built localized landing pages highlighting region-specific career outcomes.",
      "Utilized YouTube in-stream ads focusing on student success stories."
    ],
    quote: {
      text: "The precision of their global targeting model allowed us to enter markets we hadn't even considered viable.",
      author: "Head of Marketing, SkillBridge"
    },
    gradient: "linear-gradient(135deg, rgba(255,179,71,0.15), rgba(12,12,20,0.9))"
  },
  {
    id: "cs-7",
    industry: "Automotive",
    clientName: "Apex Motors",
    title: "Dealership Footfall Drive",
    metricPreview: "+450 Test Drives",
    challenge: "A regional dealership network was struggling to convert digital interest into physical showroom visits for their new electric vehicle line.",
    outcomes: [
      { label: "Test Drives Booked", value: "450+" },
      { label: "Showroom Footfall", value: "+85%" },
      { label: "Sales Conversion", value: "18%" }
    ],
    strategies: [
      "Launched localized geo-fencing campaigns around competitor dealerships.",
      "Implemented a seamless 'One-Click Booking' funnel via WhatsApp API.",
      "Created highly targeted Facebook Lead Ads focusing on EV tax incentives."
    ],
    quote: {
      text: "The digital-to-physical bridge they built resulted in our best quarter for showroom conversions in five years.",
      author: "Regional Director, Apex Motors"
    },
    gradient: "linear-gradient(135deg, rgba(255,106,0,0.25), rgba(6,6,10,0.85))"
  },
  {
    id: "cs-8",
    industry: "FMCG",
    clientName: "Nature's Crave",
    title: "Omnichannel Brand Launch",
    metricPreview: "#1 Category Rank",
    challenge: "Nature's Crave launched a new healthy snack line but lacked brand awareness and retail velocity to sustain shelf space in major supermarkets.",
    outcomes: [
      { label: "Market Share", value: "12%" },
      { label: "Social Impressions", value: "14M+" },
      { label: "Retail Velocity", value: "3x" }
    ],
    strategies: [
      "Executed a massive influencer sampling campaign on Instagram and TikTok.",
      "Ran retail-specific localized ads directing foot traffic to stocking stores.",
      "Deployed retargeting campaigns for their direct-to-consumer e-commerce site."
    ],
    quote: {
      text: "Our product was flying off the shelves so fast that supermarkets were requesting emergency restocking within weeks.",
      author: "Brand Manager, Nature's Crave"
    },
    gradient: "linear-gradient(135deg, rgba(255,140,26,0.15), rgba(12,12,20,0.9))"
  },
  {
    id: "cs-9",
    industry: "B2B Logistics",
    clientName: "FreightX",
    title: "Digital Freight Booking",
    metricPreview: "65% Process Automation",
    challenge: "FreightX relied heavily on manual sales processes. They needed a digital transformation to capture inbound logistics requests and automate quoting.",
    outcomes: [
      { label: "Inbound Leads", value: "+280%" },
      { label: "Quote Time", value: "< 2 mins" },
      { label: "Revenue Growth", value: "40%" }
    ],
    strategies: [
      "Built a custom API-integrated quoting engine on their landing page.",
      "Executed high-intent LinkedIn Ads targeting supply chain executives.",
      "Optimized their website for technical logistics SEO terms."
    ],
    quote: {
      text: "They dragged our traditional business into the digital age, completely automating our inbound funnel and supercharging our growth.",
      author: "COO, FreightX"
    },
    gradient: "linear-gradient(135deg, rgba(255,179,71,0.2), rgba(6,6,10,0.95))"
  },
  {
    id: "cs-10",
    industry: "D2C Beauty",
    clientName: "Lumiere Cosmetics",
    title: "Viral Product Launch",
    metricPreview: "Sold Out in 6 Days",
    challenge: "Lumiere needed to launch their new skincare serum but possessed a limited initial marketing budget, requiring maximum viral efficiency.",
    outcomes: [
      { label: "Inventory Cleared", value: "10,000 Units" },
      { label: "Viral Views", value: "8M+" },
      { label: "Waitlist Size", value: "25K" }
    ],
    strategies: [
      "Created a 'challenge' based UGC campaign on TikTok focusing on before/after results.",
      "Utilized micro-influencer seeding to generate authentic review content.",
      "Implemented a scarcity-driven email countdown sequence."
    ],
    quote: {
      text: "The momentum they generated online was staggering. We went from a quiet launch to a massive waitlist overnight.",
      author: "Founder, Lumiere Cosmetics"
    },
    gradient: "linear-gradient(135deg, rgba(255,106,0,0.15), rgba(12,12,20,0.9))"
  },
  {
    id: "cs-11",
    industry: "Non-Profit",
    clientName: "Green Earth Initiative",
    title: "Donor Acquisition Drive",
    metricPreview: "$1.2M Raised",
    challenge: "The initiative needed to expand their recurring donor base beyond their traditional offline fundraising channels to fund upcoming projects.",
    outcomes: [
      { label: "Total Raised", value: "$1.2M" },
      { label: "Recurring Donors", value: "8,500" },
      { label: "ROI", value: "5.5x" }
    ],
    strategies: [
      "Produced emotional, high-impact video storytelling for Facebook & Instagram.",
      "Optimized the donation landing page for 1-click Apple/Google Pay conversions.",
      "Implemented Google Ad Grants to capture intent-based search traffic."
    ],
    quote: {
      text: "Their digital campaigns didn't just raise funds; they built a community of passionate, recurring supporters for our cause.",
      author: "Executive Director, Green Earth"
    },
    gradient: "linear-gradient(135deg, rgba(255,140,26,0.2), rgba(6,6,10,0.9))"
  },
  {
    id: "cs-12",
    industry: "PropTech",
    clientName: "NestIQ",
    title: "Platform Adoption",
    metricPreview: "50k Active Users",
    challenge: "NestIQ's new property management platform faced high barriers to entry with landlords accustomed to legacy software solutions.",
    outcomes: [
      { label: "Active Users", value: "50K+" },
      { label: "Onboarding Time", value: "-60%" },
      { label: "Market Pen", value: "18%" }
    ],
    strategies: [
      "Launched educational webinars and content marketing demystifying PropTech.",
      "Executed targeted search campaigns for legacy software replacement keywords.",
      "Created a frictionless freemium onboarding funnel."
    ],
    quote: {
      text: "They effectively communicated our complex technical value proposition into compelling, digestible marketing that drove mass adoption.",
      author: "CEO, NestIQ"
    },
    gradient: "linear-gradient(135deg, rgba(255,179,71,0.15), rgba(12,12,20,0.85))"
  }
];

const themes = ['theme-orange', 'theme-white', 'theme-charcoal', 'theme-black'];

const CaseStudies: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(caseStudiesData[0].id);
  const [activeCard, setActiveCard] = useState<CaseStudy | null>(null);
  
  const scrollTrackRef = useRef<HTMLDivElement>(null);

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
    setActiveCard(study);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
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
          <div className="cs-scroll-track" ref={scrollTrackRef}>
            {caseStudiesData.map((study, idx) => {
              const isHovered = hoveredId === study.id;
              const themeClass = themes[idx % themes.length];
              
              return (
                <div 
                  key={study.id}
                  className={`cs-accordion-card ${isHovered ? 'expanded' : 'collapsed'} ${themeClass}`}
                  onMouseEnter={() => setHoveredId(study.id)}
                  onClick={() => handleCardClick(study)}
                >
                  <div className="cs-card-inner">
                    {/* Collapsed State Title */}
                    <div className="cs-collapsed-title">
                      <h3>{study.title}</h3>
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
