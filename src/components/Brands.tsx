import { useRef, useEffect, useState } from 'react';

interface BrandCard {
  id: number;
  name: string;
  category: string;
  initial: string;
  logo?: string;
  cardImg?: string;
}

const brands: BrandCard[] = [
  { id: 1, name: 'WIPRO', category: 'TECH CONSULTING', logo: 'https://res.cloudinary.com/dzc1dckta/image/upload/v1783176575/7fe50562-401b-4b07-83e0-0403e8623a7d_zlkafn.png', initial: 'WP' },
  { id: 2, name: 'USHA', category: 'PARTNER CLIENT', logo: 'https://res.cloudinary.com/dzc1dckta/image/upload/v1783176459/09268353-e979-4e36-b321-f47c29402a77_duggis.png', initial: 'U' },
  { id: 3, name: "MURLI'S", category: 'FOOD & HOSPITALITY', logo: 'https://res.cloudinary.com/dzc1dckta/image/upload/v1783176447/abc13492-b3f6-4698-aa8d-1e4963b60a56_betacv.png', initial: 'MR' },
  { id: 4, name: "KARIM'S", category: 'FINE DINING', logo: 'https://res.cloudinary.com/dzc1dckta/image/upload/v1783176433/01c4bde0-35eb-49d1-a84d-e2398dcd88bd_x55pkj.png', cardImg: 'https://res.cloudinary.com/dzc1dckta/image/upload/v1783176433/01c4bde0-35eb-49d1-a84d-e2398dcd88bd_x55pkj.png', initial: 'KM' },
  { id: 5, name: 'ITC LTD', category: 'CONGLOMERATE', logo: 'https://res.cloudinary.com/dzc1dckta/image/upload/v1783176329/796af120-ea7e-42a3-b718-bfb58202b343_uejoyf.png', initial: 'ITC' },
  { id: 6, name: 'HALDIRAM', category: 'PACKAGED FOODS', logo: 'https://res.cloudinary.com/dzc1dckta/image/upload/v1783176114/a6c82763-2b7e-4441-8782-e51c5c812f2e_nzkqri.png', initial: 'HR' },
  { id: 7, name: 'GO ZERO', category: 'FOOD & BEVERAGE', logo: 'https://res.cloudinary.com/dzc1dckta/image/upload/v1783176107/05ff8729-9e5f-4052-a5bc-de8bd13c6d2f_vcr86b.png', initial: 'GZ' },
  { id: 8, name: 'FRANKINN', category: 'INDUSTRIES', logo: 'https://res.cloudinary.com/dzc1dckta/image/upload/v1783175957/4afc1aa6-05df-419a-83cf-9bd4723d886e_k2ho56.png', initial: 'FR' },
  { id: 9, name: 'CURE & SAFE', category: 'HOMEOPATHY', logo: 'https://res.cloudinary.com/dzc1dckta/image/upload/v1783175851/ff4a87af-4dd3-4bdf-8bd2-7b860bba3da6_blx363.png', initial: 'CS' },
  { id: 10, name: 'ASICS', category: 'SPORTSWEAR', logo: 'https://res.cloudinary.com/dzc1dckta/image/upload/v1783175844/ac0c201e-ac19-4e73-92aa-3fc966eae0d8_xhnwlj.png', initial: 'AS' },
  { id: 11, name: 'K.P', category: 'PARTNER GROUP', logo: 'https://res.cloudinary.com/dzc1dckta/image/upload/v1783175350/61b6b1bf-8c67-48ee-844d-56d94828afd6_hdwywj.png', initial: 'KP' },
  { id: 12, name: 'KATHLEEN', category: 'CONFECTIONERS', logo: 'https://res.cloudinary.com/dzc1dckta/image/upload/v1783175321/79d309c2-1b7d-40dd-b266-e11224854ad5_ehcocb.png', initial: 'KC' },
  { id: 13, name: 'PORTRONICS', category: 'ELECTRONICS', logo: 'https://res.cloudinary.com/dzc1dckta/image/upload/v1783175307/ed450ced-185d-4f24-a0e3-0a7651177f2c_buqo4l.png', initial: 'PT' },
  { id: 14, name: 'ILS HOSPITAL', category: 'HEALTHCARE', logo: 'https://res.cloudinary.com/dzc1dckta/image/upload/v1783174891/cb3b2fda-8bd7-47ca-bee1-202ea5a320f3_xvc7ai.png', initial: 'ILS' },
  { id: 15, name: 'NETMEDS', category: 'PHARMACY', logo: 'https://res.cloudinary.com/dzc1dckta/image/upload/v1783174850/90b4ce01-96eb-4472-8ee7-37f32131f242_rk0dis.png', initial: 'NM' },
  { id: 16, name: 'SEA VISION', category: 'SHIPPING CO.', logo: 'https://res.cloudinary.com/dzc1dckta/image/upload/v1781607710/Screenshot_2026-06-07_171134_o9vmc4.png', initial: 'SV' },
  { id: 17, name: 'CHAI XPRESS', category: 'CAFE / FOOD', logo: 'https://res.cloudinary.com/dzc1dckta/image/upload/v1774343553/Gemini_Generated_Image_pu8p2ppu8p2ppu8p-removebg-preview_w0sdcy.png', initial: 'CX' }
];

const headlineLines = [
  { parts: [{ text: 'We are the talented team and', type: 'white' }] },
  { parts: [
      { text: 'passionate experts ', type: 'white' },
      { text: '–',                  type: 'dash'  },
      { text: ' shaping your',      type: 'white' },
    ]
  },
  { parts: [
      { text: "brand's digital journey,", type: 'white'  },
      { text: ' turning',               type: 'italic' },
    ]
  },
  { parts: [{ text: 'visions into meaningful stories that', type: 'italic' }] },
  { parts: [{ text: 'connect',                              type: 'italic' }] },
];

export default function Brands() {
  const [revealed, setRevealed] = useState(false);
  const headlineRef = useRef<HTMLDivElement>(null);

  // Scroll reveal observer for headline animation
  useEffect(() => {
    const el = headlineRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { setRevealed(entry.isIntersecting); },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Double the dataset for seamless infinite loop marquee scrolling
  const doubledBrands = [...brands, ...brands];

  return (
    <section id="portfolio" className="pf-section">
      {/* ── Headline with line-by-line reveal ── */}
      <div ref={headlineRef} className="pf-headline-wrap">
        <h2 className="pf-headline" aria-label="We are the talented team and passionate experts shaping your brand's digital journey, turning visions into meaningful stories that connect">
          {headlineLines.map((line, lineIdx) => (
            <span key={lineIdx} className="pf-line-clip">
              <span
                className="pf-line-inner"
                style={{
                  transform: revealed ? 'translateY(0)' : 'translateY(110%)',
                  opacity:   revealed ? 1 : 0,
                  transition: `transform 0.85s cubic-bezier(0.16,1,0.3,1) ${lineIdx * 110}ms,
                               opacity   0.55s ease              ${lineIdx * 110}ms`,
                }}
              >
                {line.parts.map((part, pIdx) => (
                  <span
                    key={pIdx}
                    className={
                      part.type === 'white'  ? 'pf-h-white'  :
                      part.type === 'dash'   ? 'pf-h-dash'   :
                      'pf-h-italic'
                    }
                  >
                    {part.text}
                  </span>
                ))}
              </span>
            </span>
          ))}
        </h2>
      </div>

      {/* Brands We've Worked With Subtitle */}
      <div className="pf-brands-subtitle-wrap">
        <h3 className="pf-brands-subtitle">Brands we've worked with</h3>
      </div>
 
      {/* ── Infinite Marquee Ticker ── */}
      <div className="pf-marquee-container">
        <div className="pf-marquee-track">
          {doubledBrands.map((brand, idx) => (
            <div key={`${brand.id}-${idx}`} className="pf-brand-item">
              <div className="pf-brand-logo-wrap">
                <img 
                  src={brand.logo} 
                  alt={`${brand.name} logo`} 
                  className="pf-brand-logo-img" 
                />
              </div>
              <div className="pf-brand-name">{brand.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
