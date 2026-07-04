import { useState, useEffect } from 'react';
import { 
  Utensils, Building, Stethoscope, GraduationCap, Truck, ShoppingBag, 
  Briefcase, Rocket, Coins, Dumbbell, Car, Bed, Cpu, Plane, Coffee, Store
} from 'lucide-react';
import CircularGallery from './CircularGallery';

interface IndustryItem {
  id: number;
  text: string;
  image: string;
  icon: React.ReactNode;
}

const industryItems: IndustryItem[] = [
  {
    id: 1,
    text: 'Restaurants & Cafes',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80&sig=1&cors=true',
    icon: <Utensils size={18} />
  },
  {
    id: 2,
    text: 'Real Estate',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80&sig=2&cors=true',
    icon: <Building size={18} />
  },
  {
    id: 3,
    text: 'Healthcare',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80&sig=3&cors=true',
    icon: <Stethoscope size={18} />
  },
  {
    id: 4,
    text: 'Education',
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80&sig=4&cors=true',
    icon: <GraduationCap size={18} />
  },
  {
    id: 5,
    text: 'Logistics & Shipping',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80&sig=5&cors=true',
    icon: <Truck size={18} />
  },
  {
    id: 6,
    text: 'Retail & E-Commerce',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80&sig=6&cors=true',
    icon: <ShoppingBag size={18} />
  },
  {
    id: 7,
    text: 'Professional Services',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80&sig=7&cors=true',
    icon: <Briefcase size={18} />
  },
  {
    id: 8,
    text: 'Startups & SMEs',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80&sig=8&cors=true',
    icon: <Rocket size={18} />
  },
  {
    id: 9,
    text: 'Finance & Fintech',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80&sig=9&cors=true',
    icon: <Coins size={18} />
  },
  {
    id: 10,
    text: 'Fitness & Wellness',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80&sig=10&cors=true',
    icon: <Dumbbell size={18} />
  },
  {
    id: 11,
    text: 'Automotive',
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80&sig=11&cors=true',
    icon: <Car size={18} />
  },
  {
    id: 12,
    text: 'Hotels & Hospitality',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80&sig=12&cors=true',
    icon: <Bed size={18} />
  },
  {
    id: 13,
    text: 'Tech & SaaS',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80&sig=13&cors=true',
    icon: <Cpu size={18} />
  },
  {
    id: 14,
    text: 'Travel & Tourism',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80&sig=14&cors=true',
    icon: <Plane size={18} />
  },
  {
    id: 15,
    text: 'Food & Beverage',
    image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80&sig=15&cors=true',
    icon: <Coffee size={18} />
  },
  {
    id: 16,
    text: 'Local Retail',
    image: 'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?auto=format&fit=crop&w=800&q=80&sig=16&cors=true',
    icon: <Store size={18} />
  }
];

export default function Industries() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Group industries for the 3 marquee rows on mobile
  const row1 = [0, 1, 2, 3, 4];
  const row2 = [5, 6, 7, 8, 9, 10];
  const row3 = [11, 12, 13, 14, 15];

  // Helper to render duplicate array for smooth seamless marquee scroll
  const renderMarqueeRow = (indices: number[], direction: 'left' | 'right') => {
    const items = indices.map(idx => industryItems[idx]);
    // Duplicate items to ensure seamless infinite looping
    const doubledItems = [...items, ...items, ...items];
    
    return (
      <div className={`ind-marquee-track marquee-${direction}`}>
        {doubledItems.map((item, idx) => (
          <div
            key={`${item.text}-${idx}`}
            className="ind-marquee-pill"
          >
            <span className="pill-icon">{item.icon}</span>
            <span className="pill-text">{item.text}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <section id="industries" className="industries-section">
      <div className="industries-header">
        <span className="industries-badge">Sectors We Scale</span>
        <h2 className="industries-title">Industries We Serve</h2>
        <p className="industries-subtitle">
          Engineered solutions and interactive growth platforms tailored for forward-thinking businesses.
        </p>
      </div>

      {!isMobile ? (
        // DESKTOP: Keep the WebGL circular gallery
        <div className="industries-gallery-container">
          <CircularGallery 
            items={industryItems} 
            bend={5} 
            borderRadius={0.05} 
            textColor="#ffffff"
            autoplay={true}
            autoplaySpeed={0.12}
          />
        </div>
      ) : (
        // MOBILE: Infinite marquee rows only (no cards)
        <div className="industries-mobile-container">
          <div className="ind-marquees-wrapper">
            <div className="ind-marquee-row">{renderMarqueeRow(row1, 'left')}</div>
            <div className="ind-marquee-row">{renderMarqueeRow(row2, 'right')}</div>
            <div className="ind-marquee-row">{renderMarqueeRow(row3, 'left')}</div>
          </div>
        </div>
      )}

      {!isMobile && (
        <div className="industries-footer">
          <p className="industries-hint">Drag or scroll to rotate • Auto-animating infinitely</p>
        </div>
      )}
    </section>
  );
}
