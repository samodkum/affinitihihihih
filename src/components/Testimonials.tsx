import React from 'react';
import './Testimonials.css';

const testimonials = [
  {
    name: "Capt. Rajesh Sharma",
    role: "Operational Director",
    quote: "Affinity Kraft Solution helped us improve our online visibility and generate quality leads. Their strategic focus on growth completely aligned with our core commercial objectives."
  },
  {
    name: "Anoop Kumar",
    role: "Senior Marketing Manager",
    quote: "The dealer network connect drive and localized digital ad strategies orchestrated by AKS amplified our tier-2 and tier-3 market penetration by leaps and bounds."
  },
  {
    name: "Dr. S. K. Mukhopadhyay",
    role: "Managing Director",
    quote: "Their strategic approach delivered measurable business growth. The marketing systems built by AKS are highly scalable and yield consistent, high-intent lead volume."
  },
  {
    name: "Saurabh Sharda",
    role: "Co-Founder & CMO",
    quote: "Professional team, transparent communication, and excellent results. If you are looking for an agency that operates on accountability and data, look no further."
  },
  {
    name: "Murli Dhar",
    role: "Founder",
    quote: "AKS automated our bulk booking pipelines and commercial catering outreach. We recorded an unprecedented surge in corporate event contracts in just 90 days."
  },
  {
    name: "Meagan Scott",
    role: "Head of Marketing",
    quote: "Our brand loyalty programs and regional fitness activations saw record participation because of AKS's precise segment targeting and motion-rich visual marketing."
  },
  {
    name: "Venkatesh Rao",
    role: "VP of Enterprise Solutions Marketing",
    quote: "The custom B2B content funnels and multi-channel lead enrichment pipelines built by the AKS team are highly integrated, enterprise-secure, and robust."
  },
  {
    name: "Zaeemuddin Ahmed",
    role: "Managing Partner",
    quote: "Their localized culinary storytelling and heritage-focused video campaigns brought thousands of new diners to our branches while honoring our historic culinary legacy."
  },
  {
    name: "Rajesh Gopinath",
    role: "Brand Manager",
    quote: "A highly competent partner for digital launch activations. AKS's automated distributor outreach and regional campaigns scaled our product roll-out smoothly."
  },
  {
    name: "Arjun Sen",
    role: "Director of Digital Commerce",
    quote: "AKS streamlined our direct subscription service, introducing custom checkout flows that reduced cart abandonment rates by over 30%."
  },
  {
    name: "Sanjay Kumar",
    role: "Head of Admissions & Marketing",
    quote: "Our student enrollment counseling lines were continuously filled with highly qualified applicants. AKS's lead verification pipeline works incredibly well."
  },
  {
    name: "Manish Agarwal",
    role: "VP of Corporate Gifting",
    quote: "AKS's digital strategy during key festival seasons catalyzed our premium corporate gift-box sales, delivering unmatched local performance across regions."
  },
  {
    name: "Ananya Roy",
    role: "Marketing Head",
    quote: "Their team rebuilt our entire content engine — the jump in consistency and quality was visible within the first quarter."
  },
  {
    name: "Rohan Malhotra",
    role: "Founder",
    quote: "Affinity Kraft Solution brought real structure to our digital presence: clear strategy, clean execution, genuine accountability."
  },
  {
    name: "Vikram Seth",
    role: "Director",
    quote: "What stood out was the transparency. Every campaign decision was backed by data we could actually see."
  },
  {
    name: "Shreya Ghoshal",
    role: "Brand Manager",
    quote: "They understood our brand voice better than agencies we'd worked with for years."
  },
  {
    name: "Nikhil Kapoor",
    role: "Co-Founder",
    quote: "From branding to lead generation, they handled it end-to-end so we could focus on operations."
  },
  {
    name: "Aditi Sharma",
    role: "CEO",
    quote: "Professional, responsive, and genuinely invested in our growth — a real partner, not just a vendor."
  },
  {
    name: "Siddharth Mehta",
    role: "Operations Lead",
    quote: "The automation systems they set up saved our team hours every week and tightened our follow-up."
  }
];

const Testimonials: React.FC = () => {
  const row1 = testimonials.slice(0, 10);
  const row2 = testimonials.slice(10);

  return (
    <section id="testimonials" className="section testimonials-section">
      <div className="section-header">
        <span className="section-tag">Client Testimonials</span>
        <h2 className="section-title">What Our <span>Partners Say</span></h2>
        <p className="section-desc">
          Hear from the leaders and visionaries who have experienced transformative growth and operational excellence through our strategic digital partnerships.
        </p>
      </div>

      <div className="testimonials-marquee-wrapper">
        <div className="marquee-row marquee-left">
          <div className="marquee-content">
            {row1.concat(row1).map((item, idx) => (
              <div key={idx} className="testimonial-card">
                <div className="testimonial-header">
                  <div className="testimonial-author">
                    <h4>{item.name}</h4>
                    <p>{item.role}</p>
                  </div>
                </div>
                <div className="testimonial-quote">
                  "{item.quote}"
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="marquee-row marquee-right">
          <div className="marquee-content">
            {row2.concat(row2).map((item, idx) => (
              <div key={idx} className="testimonial-card">
                <div className="testimonial-header">
                  <div className="testimonial-author">
                    <h4>{item.name}</h4>
                    <p>{item.role}</p>
                  </div>
                </div>
                <div className="testimonial-quote">
                  "{item.quote}"
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
