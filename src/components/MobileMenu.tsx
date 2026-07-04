import React, { useState, useEffect } from 'react';
import { Menu, X, Home, Sparkles, Layers, Info, Briefcase, Mail } from 'lucide-react';
import './MobileMenu.css';

const navItems = [
  {
    icon: <Home size={18} />,
    label: 'Home',
    href: '#hero',
  },
  {
    icon: <Sparkles size={18} />,
    label: 'Services',
    href: '#services',
  },
  {
    icon: <Layers size={18} />,
    label: 'Process',
    href: '#our-process',
  },
  {
    icon: <Info size={18} />,
    label: 'About',
    href: '#about',
  },
  {
    icon: <Briefcase size={18} />,
    label: 'Work',
    href: '#portfolio',
  },
  {
    icon: <Mail size={18} />,
    label: 'Contact',
    href: '#contact',
  },
];

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    
    // Smooth scroll to target
    setTimeout(() => {
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: 'smooth' });
    }, 300); // Wait for menu close transition
  };

  return (
    <div className="mobile-menu-container">
      {/* Floating Hamburger Menu Trigger Button */}
      <button 
        className={`mobile-menu-trigger ${isOpen ? 'menu-active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Navigation Menu"
        aria-expanded={isOpen}
      >
        {isOpen ? <X size={22} /> : <Menu size={24} />}
      </button>

      {/* Fullscreen Glassmorphic Menu Overlay */}
      <div className={`mobile-menu-overlay ${isOpen ? 'overlay-open' : ''}`}>
        <div className="mobile-menu-content">
          <div className="mobile-menu-logo">
            <span className="logo-accent">AFFINITY</span> KRAFT
          </div>
          
          <nav className="mobile-menu-nav">
            {navItems.map((item, idx) => (
              <a
                key={item.label}
                href={item.href}
                className="mobile-menu-link"
                style={{ '--link-index': idx } as React.CSSProperties}
                onClick={(e) => handleLinkClick(e, item.href)}
              >
                <span className="link-icon">{item.icon}</span>
                <span className="link-text">{item.label}</span>
              </a>
            ))}
          </nav>

          <div className="mobile-menu-footer">
            <p className="footer-company">Affinity Kraft Solution Pvt Ltd.</p>
            <p className="footer-tagline">Systems simplify growth.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
