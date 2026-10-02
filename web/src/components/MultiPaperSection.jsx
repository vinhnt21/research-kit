import React from 'react';
import { Layers, FolderGit2, ShieldAlert, BookOpen } from 'lucide-react';

const principleIcons = [FolderGit2, ShieldAlert, BookOpen];

export default function MultiPaperSection({ t, lang }) {
  const papersImg = `/figures/papers-${lang}.svg`;

  return (
    <section className="section" id="multipaper">
      <div className="container">
        <div className="section-header fade-in">
          <span className="eyebrow emerald">
            <Layers size={14} />
            <span>{t.multipaper.eyebrow}</span>
          </span>
          <h2 className="section-title">{t.multipaper.heading}</h2>
          <p className="section-subtitle">{t.multipaper.subtitle}</p>
        </div>

        <div className="multipaper-grid">
          <div className="principles-list">
            {t.multipaper.principles.map((p, idx) => {
              const IconComp = principleIcons[idx] || FolderGit2;
              return (
                <div className={`principle-item fade-in stagger-${(idx % 3) + 1}`} key={idx}>
                  <div className="principle-num">{p.num}</div>
                  <div>
                    <h3 className="principle-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <IconComp size={18} style={{ color: 'var(--accent-blue)' }} />
                      <span>{p.title}</span>
                    </h3>
                    <p className="principle-desc">{p.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="diagram-container fade-in-scale">
            <img 
              src={papersImg} 
              alt="Multi-paper isolation architecture and read-only literature shelf" 
              className="diagram-img"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
