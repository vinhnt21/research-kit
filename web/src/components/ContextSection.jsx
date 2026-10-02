import React from 'react';
import { Gauge, Sparkles, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function ContextSection({ t, lang }) {
  const contextImg = `/figures/context-${lang}.svg`;

  return (
    <section className="section" id="context">
      <div className="container">
        <div className="section-header fade-in">
          <span className="eyebrow">
            <Gauge size={14} />
            <span>{t.context.eyebrow}</span>
          </span>
          <h2 className="section-title">{t.context.heading}</h2>
          <p className="section-subtitle">{t.context.subtitle}</p>
        </div>

        {/* Savings Announcement Banner */}
        <div className="context-banner fade-in stagger-1">
          <Sparkles size={18} />
          <span>{t.context.savingsHeadline}</span>
        </div>

        {/* Head-to-Head Cards */}
        <div className="context-showdown">
          <div className="context-card competitor fade-in stagger-2">
            <div className="context-card-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <AlertTriangle size={13} />
              <span>Catalog Bloat</span>
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>{t.context.competitorTitle}</h3>
            <div className="context-num">{t.context.competitorTokens}</div>
            <div className="context-percent">{t.context.competitorPercent}</div>
            <p className="context-desc">{t.context.competitorDesc}</p>
          </div>

          <div className="context-card winner fade-in stagger-3">
            <div className="context-card-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={13} />
              <span>Lean Mindset</span>
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>{t.context.kitTitle}</h3>
            <div className="context-num">{t.context.kitTokens}</div>
            <div className="context-percent">{t.context.kitPercent}</div>
            <p className="context-desc">{t.context.kitDesc}</p>
          </div>
        </div>

        {/* Diagram Image */}
        <div className="diagram-container fade-in-scale">
          <img 
            src={contextImg} 
            alt="Context token comparison between Scientific Agent Skills and Research Kit" 
            className="diagram-img"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
