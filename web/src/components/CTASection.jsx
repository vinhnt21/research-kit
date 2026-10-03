import React from 'react';
import { Download, Star } from 'lucide-react';

export default function CTASection({ t }) {
  return (
    <section className="cta-section">
      <div className="container">
        <div className="cta-box fade-in-scale">
          <h2 className="cta-title">{t.cta.title}</h2>
          <p className="cta-subtitle">{t.cta.subtitle}</p>

          <div className="cta-actions">
            <a
              href="#install"
              className="btn-primary"
              id="cta-install-btn"
            >
              <Download size={18} aria-hidden="true" />
              <span>{t.cta.button}</span>
            </a>

            <a
              href="https://github.com/vinhnt21/research-kit"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary btn-github-icon"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.56 9.56 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
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

          <a
            className="author-link"
            href={t.cta.authorUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.cta.authorLink}
          </a>
        </div>
      </div>
    </section>
  );
}
