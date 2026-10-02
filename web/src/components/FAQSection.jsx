import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';

export default function FAQSection({ t }) {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <section className="section" id="faq">
      <div className="container">
        <div className="section-header fade-in">
          <span className="eyebrow">
            <HelpCircle size={14} />
            <span>{t.faq.eyebrow}</span>
          </span>
          <h2 className="section-title">{t.faq.heading}</h2>
        </div>

        <div className="faq-grid fade-in">
          {t.faq.items.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div className={`faq-item ${isOpen ? 'open' : ''}`} key={idx}>
                <button
                  type="button"
                  className="faq-question"
                  onClick={() => toggleAccordion(idx)}
                  aria-expanded={isOpen}
                >
                  <span>{item.q}</span>
                  <ChevronDown 
                    size={20} 
                    className="faq-chevron" 
                  />
                </button>
                {isOpen && (
                  <div className="faq-answer">
                    <p>{item.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
