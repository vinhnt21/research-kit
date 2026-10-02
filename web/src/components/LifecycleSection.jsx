import React from 'react';
import { 
  Compass, 
  Search, 
  Lightbulb, 
  FlaskConical, 
  BarChart3, 
  FileText, 
  Share2, 
  Cpu, 
  Network, 
  Brain, 
  Presentation, 
  ShieldCheck 
} from 'lucide-react';

const iconMap = {
  search: Search,
  lightbulb: Lightbulb,
  flask: FlaskConical,
  barChart: BarChart3,
  fileText: FileText,
  share2: Share2,
  cpu: Cpu,
  network: Network,
  brain: Brain,
  presentation: Presentation,
};

export default function LifecycleSection({ t, lang }) {
  const workflowImg = `/figures/workflow-${lang}.svg`;

  return (
    <section className="section" id="lifecycle">
      <div className="container">
        <div className="section-header fade-in">
          <span className="eyebrow">
            <Compass size={14} />
            <span>{t.lifecycle.eyebrow}</span>
          </span>
          <h2 className="section-title">{t.lifecycle.heading}</h2>
          <p className="section-subtitle">{t.lifecycle.subtitle}</p>
        </div>

        {/* Vector SVG Diagram */}
        <div className="diagram-container fade-in-scale">
          <img 
            src={workflowImg} 
            alt="Research Kit 6-Stage Core Workflow and 4 Domain Extensions" 
            className="diagram-img"
            loading="lazy"
          />
        </div>

        {/* Part 1: Core 6 Skills */}
        <div className="fade-in" style={{ marginBottom: '40px' }}>
          <h3 style={{ fontSize: '1.4rem', marginBottom: '8px' }}>{t.lifecycle.coreTitle}</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>{t.lifecycle.coreSubtitle}</p>
          
          <div className="lifecycle-tabs">
            {t.lifecycle.skills.map((skill, idx) => {
              const IconComp = iconMap[skill.iconKey] || Search;
              return (
                <div className={`lifecycle-card fade-in stagger-${(idx % 3) + 1}`} key={skill.id}>
                  <div>
                    <span className="stage-badge">{skill.stage}</span>
                    <div className="skill-code-wrapper">
                      <div className="skill-icon-pill">
                        <IconComp size={16} strokeWidth={2} />
                      </div>
                      <span className="skill-code">@{skill.id}</span>
                    </div>
                  </div>
                  <div>
                    <div className="stage-name">{skill.name}</div>
                    <div className="stage-duty">{skill.duty}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '8px', fontFamily: 'var(--font-mono)' }}>
                      {skill.files}
                    </div>
                  </div>
                  <div className="stage-gate">
                    <div className="gate-label">
                      <ShieldCheck size={14} strokeWidth={2.5} />
                      <span>Verification Gate</span>
                    </div>
                    <div className="gate-text">{skill.gate}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Part 2: 4 Domain Modules */}
        <div className="fade-in">
          <h3 style={{ fontSize: '1.4rem', marginBottom: '8px' }}>{t.lifecycle.domainTitle}</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>{t.lifecycle.domainSubtitle}</p>

          <div className="domains-grid">
            {t.lifecycle.domains.map((dom, idx) => {
              const IconComp = iconMap[dom.iconKey] || Cpu;
              return (
                <div className={`domain-card fade-in stagger-${(idx % 4) + 1}`} key={dom.id}>
                  <div className="domain-header">
                    <div className="skill-icon-pill">
                      <IconComp size={16} strokeWidth={2} />
                    </div>
                    <span className="domain-name">@{dom.id}</span>
                  </div>
                  <div className="domain-field">{dom.domain}</div>
                  <div className="domain-desc">{dom.duty}</div>
                  <div className="domain-gate">
                    <strong>Gate:</strong> {dom.gate}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
