import React, { useState } from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isCareersOpen, setIsCareersOpen] = useState(false);

  return (
    <footer className="footer-section">
      <div className="footer-container">
        
        {/* Left Panel: Brand & Socials */}
        <div className="footer-panel-brand">
          <a href="#hero" aria-label="Affinity" className="footer-brand-logo-corner-link">
            <img 
              src="https://res.cloudinary.com/dzc1dckta/image/upload/v1783488868/Screenshot_2026-07-08_111053_ksa1ck.png" 
              alt="Affinity Logo" 
              className="footer-brand-logo-corner"
            />
          </a>

          <div className="brand-top">
            <h2 className="footer-logo">Affinity Kraft Solution</h2>
          </div>
          
          <div className="brand-bottom">
            <p className="brand-tagline">
              Smarter digital growth,<br />powered by AI.
            </p>
            <div className="brand-social-row">
              <span className="cursive-text">Stay in touch!</span>
              <div className="social-icons-group">
                <a href="https://x.com/affinitykraft?s=11&t=tab_UKNy7x6fMn2AywyJdg" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
                <a href="https://www.instagram.com/affinitykrafts.solutions/?hl=en" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204 0.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg></a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel: Links & Newsletter */}
        <div className="footer-panel-content">
          
          {/* Links Grid */}
          <div className="content-top">
            <div className="footer-links-col">
              <span className="cursive-text">Navigation</span>
              <a href="#hero">Home</a>
              <a href="#about">About</a>
              <a href="#services">Services</a>
              <a href="#industries">Industries</a>
              <a href="#portfolio">Case Studies</a>
              <a href="#testimonials">Testimonials</a>
              <a href="#contact">Contact</a>
            </div>
            
            <div className="footer-links-col">
              <span className="cursive-text">Services</span>
              <span className="footer-static-item">Branding</span>
              <span className="footer-static-item">Digital Marketing</span>
              <span className="footer-static-item">Social Media Marketing</span>
              <span className="footer-static-item">SEO</span>
              <span className="footer-static-item">Website Development</span>
              <span className="footer-static-item">Performance Marketing</span>
            </div>

            <div className="footer-links-col">
              <span className="cursive-text">Info</span>
              <button onClick={() => setIsCareersOpen(true)} className="footer-modal-trigger">Careers</button>
              <button onClick={() => setIsPrivacyOpen(true)} className="footer-modal-trigger">Privacy Policy</button>
              <button onClick={() => setIsTermsOpen(true)} className="footer-modal-trigger">Terms &amp; Conditions</button>
            </div>

            <div className="footer-links-col">
              <span className="cursive-text">Contact</span>
              <a href="tel:+919831567280" className="contact-info-item">9831567280</a>
              <a href="tel:+917044443346" className="contact-info-item">7044443346</a>
              <a href="mailto:marketing@affinitykraftsolution.com" className="contact-info-item">marketing@affinitykraftsolution.com</a>
              <a href="mailto:management@affinitykraftsolution.com" className="contact-info-item">management@affinitykraftsolution.com</a>
              <span className="contact-info-item">63/12 DumDum Rd, Kolkata - 700074</span>
              <span className="contact-info-item">Mon–Sat: 10:00 AM – 7:00 PM<br />(2nd &amp; 4th Saturday off)</span>
            </div>
          </div>

          {/* Copyright Area */}
          <div className="content-bottom">
            <div className="copyright">
              <p>© 2026 Affinity Kraft Solution Pvt Ltd. All rights reserved.</p>
              <p className="credit-text">Designed and Built by Aditya Suryavanshi</p>
            </div>
          </div>

        </div>
      </div>

      {/* Giant Background Text */}
      <div className="footer-giant-text">
        Affinity
      </div>

      {/* Privacy Policy Modal */}
      {isPrivacyOpen && (
        <div className="footer-modal-overlay" onClick={() => setIsPrivacyOpen(false)}>
          <div className="footer-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="footer-modal-close" onClick={() => setIsPrivacyOpen(false)}>&times;</button>
            <h3 className="footer-modal-title">Privacy Policy</h3>
            <div className="footer-modal-body">
              <p>At Affinity Kraft Solution Pvt. Ltd., we respect your privacy.</p>
              <p>Any information you share through our website is used only to respond to your inquiries, provide our services, and keep you informed about relevant updates. We do not sell, rent, or share your personal information with third parties unless required by law.</p>
            </div>
          </div>
        </div>
      )}

      {/* Terms & Conditions Modal */}
      {isTermsOpen && (
        <div className="footer-modal-overlay" onClick={() => setIsTermsOpen(false)}>
          <div className="footer-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="footer-modal-close" onClick={() => setIsTermsOpen(false)}>&times;</button>
            <h3 className="footer-modal-title">Terms & Conditions</h3>
            <div className="footer-modal-body">
              <p>By using this website, you agree to use its content responsibly and only for lawful purposes.</p>
              <p>All content, designs, graphics, logos, and other materials on this website are the property of Affinity Kraft Solution Pvt. Ltd. and may not be copied, reproduced, or used without prior permission.</p>
              <p>We reserve the right to update our services, pricing, and website content at any time without prior notice.</p>
            </div>
          </div>
        </div>
      )}

      {/* Careers Modal */}
      {isCareersOpen && (
        <div className="footer-modal-overlay" onClick={() => setIsCareersOpen(false)}>
          <div className="footer-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="footer-modal-close" onClick={() => setIsCareersOpen(false)}>&times;</button>
            <h3 className="footer-modal-title">Careers</h3>
            <div className="footer-modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <p>If you have a skill that can contribute to the growth of Affinity, we would love to hear from you!</p>
              <p>Please send your resume or portfolio to: <a href="mailto:hr@affinitykraftsolution.com" style={{ color: '#FF6A00', fontWeight: 'bold', textDecoration: 'none' }}>hr@affinitykraftsolution.com</a></p>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
