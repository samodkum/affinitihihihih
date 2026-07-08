import React, { useEffect, useRef, useState } from 'react';
import './Contact.css';

const Contact: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitStatus('submitting');
    setErrorMessage('');

    const formEl = e.currentTarget;
    const formData = new FormData(formEl);

    // Merge country code with phone number
    const countryCode = formData.get('countryCode')?.toString() || '';
    const rawPhone = formData.get('phone')?.toString() || '';
    const fullPhone = `${countryCode} ${rawPhone}`.trim();
    // Prepend a single quote if it starts with '+' to prevent Google Sheets formula parsing error (#ERROR!)
    const safePhone = fullPhone.startsWith('+') ? `'${fullPhone}` : fullPhone;
    formData.set('phone', safePhone);
    formData.delete('countryCode');

    const googleSheetsUrl = import.meta.env.VITE_GOOGLE_SHEETS_URL || 'https://script.google.com/macros/s/AKfycbyVTsZjWWsx2vtrmA1kwpWqLAavR5-9OK7i1KYl_X5lk79fdaH3HA5k0K4r1CLHugQE/exec';

    if (!googleSheetsUrl) {
      console.warn("VITE_GOOGLE_SHEETS_URL is not configured. Simulating successful form submission.");
      setTimeout(() => {
        setSubmitStatus('success');
        formEl.reset();
      }, 1500);
      return;
    }

    try {
      const urlEncoded = new URLSearchParams();
      formData.forEach((value, key) => {
        urlEncoded.append(key, value.toString());
      });

      await fetch(googleSheetsUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: urlEncoded.toString(),
      });

      setSubmitStatus('success');
      formEl.reset();
    } catch (error: any) {
      console.error('Error submitting form to Google Sheets:', error);
      setErrorMessage(error.message || 'Could not send details. Please check your network and try again.');
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 6000);
    }
  };

  return (
    <section id="contact" className="section contact-section" ref={sectionRef}>
      <div className="contact-container">
        
        {/* Left Side: Typography */}
        <div className="contact-left">
          <h2 className={`contact-title ${isVisible ? 'animate-in' : ''}`}>
            <span className="line"><span className="word word-lets">CONTACT</span></span>
            <span className="line"><span className="word word-touch highlight">US</span></span>
          </h2>
          <p className={`contact-desc ${isVisible ? 'animate-in' : ''}`}>
            <strong style={{ display: 'block', fontSize: '1.25rem', color: '#fff', marginBottom: '12px' }}>Ready to grow your business?</strong>
            Fill out the form below, and our team will get in touch to understand your requirements and discuss the best solution for your business.
          </p>
        </div>

        {/* Right Side: Form / Success Screen */}
        <div className={`contact-right ${isVisible ? 'animate-in' : ''}`}>
          {submitStatus === 'success' ? (
            <div className="contact-success-screen">
              <div className="success-icon-wrapper">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <h3 className="success-title">Message Sent!</h3>
              <p className="success-message">
                Thank you for reaching out to Affinity Kraft Solution. Your details have been successfully recorded. Our growth team will get in touch with you shortly.
              </p>
              <button className="reset-btn" onClick={() => setSubmitStatus('idle')}>
                Send Another Message
              </button>
            </div>
          ) : (
            <>
              {submitStatus === 'error' && (
                <div className="contact-status-alert error">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  <div>
                    <h4>Submission Failed</h4>
                    <p>{errorMessage || 'Could not connect to the server. Please try again.'}</p>
                  </div>
                </div>
              )}

              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row stagger-1">
                  <div className="form-group">
                    <label htmlFor="fullName">Full Name</label>
                    <input type="text" id="fullName" name="fullName" placeholder="John Doe" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="companyName">Company Name</label>
                    <input type="text" id="companyName" name="companyName" placeholder="Company Ltd" required />
                  </div>
                </div>

                <div className="form-row stagger-2">
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input type="email" id="email" name="email" placeholder="john@example.com" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <div className="phone-input-container">
                      <select name="countryCode" className="country-code-select" defaultValue="+91" required>
                        <option value="+91">🇮🇳 +91</option>
                        <option value="+1">🇺🇸 +1</option>
                        <option value="+44">🇬🇧 +44</option>
                        <option value="+971">🇦🇪 +971</option>
                        <option value="+91">🇮🇳 +91</option>
                        <option value="+61">🇦🇺 +61</option>
                        <option value="+65">🇸🇬 +65</option>
                        <option value="+81">🇯🇵 +81</option>
                        <option value="+49">🇩🇪 +49</option>
                        <option value="+33">🇫🇷 +33</option>
                        <option value="+1">🇨🇦 +1</option>
                      </select>
                      <input type="tel" id="phone" name="phone" placeholder="98765 43210" required />
                    </div>
                  </div>
                </div>

                <div className="form-group stagger-3">
                  <label htmlFor="services">Services You're Interested In</label>
                  <select id="services" name="services" required defaultValue="">
                    <option value="" disabled hidden>Select a service...</option>
                    <option value="Brand & Creative">Brand & Creative</option>
                    <option value="Social & Content">Social & Content</option>
                    <option value="Performance & SEO">Performance & SEO</option>
                    <option value="Web & Video">Web & Video</option>
                    <option value="Tech & Automation">Tech & Automation</option>
                  </select>
                </div>

                <div className="form-group stagger-4">
                  <label htmlFor="message">Message / Project Requirements</label>
                  <textarea id="message" name="message" rows={4} placeholder="Your message or project details..." required></textarea>
                </div>

                <button type="submit" className="submit-btn stagger-5" disabled={submitStatus === 'submitting'}>
                  <span>{submitStatus === 'submitting' ? 'Sending Details...' : "Let's Grow Together"}</span>
                  {submitStatus === 'submitting' ? (
                    <div className="submit-loader"></div>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  )}
                </button>
              </form>
            </>
          )}
        </div>

      </div>
    </section>
  );
};

export default Contact;
