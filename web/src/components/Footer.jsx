import React from 'react';
import { ExternalLink } from 'lucide-react';

export default function Footer({ t }) {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer-top fade-in">
          <div>
            <div className="brand">
              <div className="brand-icon-wrapper" style={{ width: '32px', height: '32px' }}>
                <img src="/brand/logo-icon.svg" alt="Research Kit" width="20" height="20" style={{ display: 'block' }} />
              </div>
              <span>Research Kit</span>
            </div>
            <div className="footer-tagline">{t.footer.tagline}</div>
          </div>

          <ul className="footer-links">
            <li>
              <a href="https://github.com/vinhnt21/research-kit" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <span>{t.footer.repo}</span>
                <ExternalLink size={13} />
              </a>
            </li>
            <li>
              <a href="/docs">
                {t.footer.docs}
              </a>
            </li>
            <li>
              <a href={t.footer.guideUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <span>{t.footer.guides}</span>
                <ExternalLink size={13} />
              </a>
            </li>
            <li>
              <a href="https://github.com/vinhnt21/research-kit/blob/main/LICENSE" target="_blank" rel="noopener noreferrer">
                {t.footer.license}
              </a>
            </li>
            <li>
              <a href="https://github.com/vinhnt21/research-kit/issues" target="_blank" rel="noopener noreferrer">
                {t.footer.issues}
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-bottom">
          <p>{t.footer.copy}</p>
        </div>
      </div>
    </footer>
  );
}
