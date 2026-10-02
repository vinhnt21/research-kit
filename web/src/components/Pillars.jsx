import React from 'react';
import { Zap, ShieldCheck, Layers, Unlock, Sparkles } from 'lucide-react';

const iconMap = {
  zap: Zap,
  shield: ShieldCheck,
  layers: Layers,
  unlock: Unlock,
};

export default function Pillars({ t }) {
  return (
    <section className="section" id="pillars">
      <div className="container">
        <div className="section-header fade-in">
          <span className="eyebrow">
            <Sparkles size={14} />
            <span>{t.pillars.eyebrow}</span>
          </span>
          <h2 className="section-title">{t.pillars.heading}</h2>
        </div>

        <div className="pillars-grid">
          {t.pillars.cards.map((card, idx) => {
            const IconComponent = iconMap[card.iconKey] || Zap;
            return (
              <div className={`pillar-card fade-in stagger-${(idx % 4) + 1}`} key={idx}>
                <div className="pillar-icon-box">
                  <IconComponent size={24} strokeWidth={2} />
                </div>
                <h3 className="pillar-title">{card.title}</h3>
                <p className="pillar-desc">{card.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
