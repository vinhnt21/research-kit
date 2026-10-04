import React from 'react';
import {
  Sparkles,
  Calendar,
  ArrowUpRight,
  Cpu,
  BookmarkCheck,
  CheckCircle2,
  FileCode,
} from 'lucide-react';

const badgeIconMap = {
  feature: Cpu,
  protocol: BookmarkCheck,
  release: CheckCircle2,
  docs: FileCode,
};

export default function NewsSection({ t, lang }) {
  const news = t.news;
  if (!news || !news.items || news.items.length === 0) return null;

  return (
    <section className="section news-section" id="news">
      <div className="container">
        <div className="section-header fade-in">
          <span className="eyebrow emerald">
            <Sparkles size={14} />
            <span>{news.eyebrow}</span>
          </span>
          <h2 className="section-title">{news.title}</h2>
          <p className="section-subtitle">{news.subtitle}</p>
        </div>

        <div className="news-timeline fade-in">
          {news.items.map((item, index) => {
            const IconComp = badgeIconMap[item.badgeType] || Sparkles;
            return (
              <article key={index} className="news-card">
                <div className="news-card-meta">
                  <div className="news-date">
                    <Calendar size={13} className="news-date-icon" />
                    <time dateTime={item.date.replace(/\./g, '-')}>{item.date}</time>
                  </div>
                  <span className={`news-badge news-badge-${item.badgeType || 'default'}`}>
                    <IconComp size={12} strokeWidth={2.2} />
                    <span>{item.badge}</span>
                  </span>
                </div>

                <div className="news-card-content">
                  <h3 className="news-item-title">{item.title}</h3>
                  <p className="news-item-desc">{item.description}</p>
                  {item.link && (
                    <div className="news-item-footer">
                      <a
                        href={item.link}
                        className="news-item-link"
                        target={item.link.startsWith('http') ? '_blank' : '_self'}
                        rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                      >
                        <span>{item.linkText || (lang === 'vi' ? 'Xem chi tiết' : 'Learn more')}</span>
                        <ArrowUpRight size={14} strokeWidth={2.2} />
                      </a>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
