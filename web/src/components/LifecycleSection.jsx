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
  ArrowUpRight,
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

function DocsLink({ href, label }) {
  return (
    <a className="lifecycle-docs-link" href={href}>
      <span>{label}</span>
      <ArrowUpRight size={16} strokeWidth={2.2} />
    </a>
  );
}

export default function LifecycleSection({ t }) {
  const docsLabel = t.lifecycle.docsLink;

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

        <div className="lifecycle-compact fade-in">
          <div className="lifecycle-group">
            <div className="lifecycle-group-head">
              <h3>{t.lifecycle.coreTitle}</h3>
              <DocsLink href="/docs#core-skills" label={docsLabel} />
            </div>
            <ol className="lifecycle-pipeline">
              {t.lifecycle.skills.map((skill) => {
                const IconComp = iconMap[skill.iconKey] || Search;
                return (
                  <li key={skill.id}>
                    <a className="lifecycle-step" href={`/docs#skill-${skill.id}`}>
                      <span className="lifecycle-step-top">
                        <span className="lifecycle-step-num">{skill.stage}</span>
                        <IconComp size={16} strokeWidth={2} />
                      </span>
                      <span className="lifecycle-step-id">@{skill.id}</span>
                      <span className="lifecycle-step-name">{skill.short || skill.name}</span>
                    </a>
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="lifecycle-group">
            <div className="lifecycle-group-head">
              <h3>{t.lifecycle.domainTitle}</h3>
              <DocsLink href="/docs#domain-skills" label={docsLabel} />
            </div>
            <ul className="lifecycle-domains">
              {t.lifecycle.domains.map((dom) => {
                const IconComp = iconMap[dom.iconKey] || Cpu;
                return (
                  <li key={dom.id}>
                    <a className="lifecycle-domain" href={`/docs#skill-${dom.id}`}>
                      <span className="skill-icon-pill">
                        <IconComp size={16} strokeWidth={2} />
                      </span>
                      <span className="lifecycle-domain-copy">
                        <span className="lifecycle-step-id">@{dom.id}</span>
                        <span className="lifecycle-step-name">{dom.domain}</span>
                      </span>
                      <ArrowUpRight size={16} strokeWidth={2.2} />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
