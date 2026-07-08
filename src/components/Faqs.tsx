import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import './Faqs.css';

interface FaqItem {
  question: string;
  answer: string;
}

const faqData: FaqItem[] = [
  {
    question: 'How long does it take to see results?',
    answer: 'The timeline depends on the service you choose. In most cases, businesses start seeing noticeable improvements within 30 to 90 days.',
  },
  {
    question: 'Do you work with startups?',
    answer: 'Yes. We work with startups, small and medium-sized businesses, as well as established enterprises.',
  },
  {
    question: 'Do you provide website development?',
    answer: 'Yes. We design and develop business websites, landing pages, and e-commerce websites.',
  },
  {
    question: 'Do you manage social media completely?',
    answer: 'Yes. We handle everything from strategy and content creation to posting, community management, and paid advertising.',
  },
  {
    question: 'Do you run paid advertising campaigns?',
    answer: 'Absolutely. We manage Meta Ads, Google Ads, and lead generation campaigns designed to achieve your business goals.',
  },
];

export default function Faqs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faqs" className="faqs-section">
      <div className="faqs-container">
        <h2 className="faqs-title">
          Frequently Asked <span className="text-glow-orange">Questions</span>
        </h2>
        
        <div className="faqs-list">
          {faqData.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className={`faq-item ${isOpen ? 'faq-open' : ''}`}
                onClick={() => toggleFaq(index)}
              >
                <div className="faq-question-row">
                  <h3 className="faq-question">{faq.question}</h3>
                  <div className="faq-toggle-icon">
                    <ChevronDown size={20} className="faq-chevron" />
                  </div>
                </div>
                <div className={`faq-answer-wrapper ${isOpen ? 'show-answer' : ''}`}>
                  <p className="faq-answer">{faq.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
