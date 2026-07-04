import React, { useEffect, useRef, useState } from 'react';
import './Contact.css';

const Contact: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="contact" className="section contact-section" ref={sectionRef}>
      <div className="contact-container">
        
        {/* Left Side: Typography */}
        <div className="contact-left">
          <h2 className={`contact-title ${isVisible ? 'animate-in' : ''}`}>
            <span className="line"><span className="word word-lets">LET'S</span></span>
            <span className="line"><span className="word word-getin">GET IN</span></span>
            <span className="line"><span className="word word-touch highlight">TOUCH</span></span>
          </h2>
          <p className={`contact-desc ${isVisible ? 'animate-in' : ''}`}>
            We'd love to hear from you! Whether you have questions, feedback, or need support, feel free to reach out to us.
          </p>
        </div>

        {/* Right Side: Form */}
        <div className={`contact-right ${isVisible ? 'animate-in' : ''}`}>
          <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-row stagger-1">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input type="text" id="firstName" name="firstName" placeholder="John" />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input type="text" id="lastName" name="lastName" placeholder="Doe" />
              </div>
            </div>

            <div className="form-group stagger-2">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" placeholder="john@example.com" />
            </div>

            <div className="form-group stagger-3">
              <label htmlFor="subject">Subject</label>
              <input type="text" id="subject" name="subject" placeholder="How can we help?" />
            </div>

            <div className="form-group stagger-4">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows={4} placeholder="Your message here..."></textarea>
            </div>

            <button type="submit" className="submit-btn stagger-5">
              <span>Send Message</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </button>
          </form>
        </div>

      </div>
    </section>
  );
};

export default Contact;
