import React, { useState } from 'react';
import { Terminal, Check, Star } from 'lucide-react';

export default function CTASection({ t }) {
  const [copied, setCopied] = useState(false);
  const command = 'npx skills add vinhnt21/research-kit';

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="cta-section">
      <div className="container">
        <div className="cta-box fade-in-scale">
          <h2 className="cta-title">{t.cta.title}</h2>
          <p className="cta-subtitle">{t.cta.subtitle}</p>

          <div className="cta-actions">
            <button
              type="button"
              className="btn-primary"
              onClick={handleCopy}
              id="cta-install-btn"
            >
              {copied ? (
                <>
                  <Check size={18} strokeWidth={2.5} />
                  <span>{t.hero.copied}</span>
                </>
              ) : (
                <>
                  <Terminal size={18} />
                  <span>{t.cta.button}</span>
                </>
              )}
            </button>

            <a
              href="https://github.com/vinhnt21/research-kit"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              <span>{t.cta.secondary}</span>
            </a>
          </div>

          <div className="cta-star-callout">
            <span>
              {t.cta.starCallout}
              </span>
            <a
              href="https://github.com/vinhnt21/research-kit"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-star-callout-link"
            >
              {t.cta.starCalloutLink} &rarr;
              <Star size={16} fill="#F59E0B" color="#F59E0B" />

            </a>
          </div>

          <div className="cta-meta">{t.cta.meta}</div>
        </div>
      </div>
    </section>
  );
}
