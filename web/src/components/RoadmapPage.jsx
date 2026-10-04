import React, { useEffect, useRef, useState } from 'react';
import { 
  Calendar, 
  Sparkles, 
  Cpu, 
  BookmarkCheck, 
  CheckCircle2, 
  FileCode, 
  ArrowUpRight, 
  ArrowRight,
  Compass,
  X
} from 'lucide-react';

const badgeIconMap = {
  feature: Cpu,
  protocol: BookmarkCheck,
  release: CheckCircle2,
  docs: FileCode,
};

function FormattedText({ text }) {
  if (!text) return null;
  const parts = text.split(/(`[^`]+`)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('`') && part.endsWith('`')) {
          return (
            <code key={i} className="roadmap-inline-code">
              {part.slice(1, -1)}
            </code>
          );
        }
        return part;
      })}
    </>
  );
}

export default function RoadmapPage({ t, lang }) {
  const roadmap = t.roadmap;
  const news = t.news;
  const isVI = lang === 'vi';
  const [preview, setPreview] = useState(null);
  const previewDialog = useRef(null);

  useEffect(() => {
    if (!preview) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    previewDialog.current.showModal();
    previewDialog.current.scrollTop = 0;
    return () => { document.body.style.overflow = previousOverflow; };
  }, [preview]);

  return (
    <div className="roadmap-page">
      <div className="container roadmap-content">
        {/* Header chính của trang Nhật ký phát triển */}
        <header className="roadmap-hero-header fade-in">
          <span className="eyebrow emerald">
            <Sparkles size={14} />
            <span>{news?.eyebrow || (isVI ? 'LỊCH SỬ PHÁT TRIỂN & CẬP NHẬT' : 'SYSTEM EVOLUTION & CHANGELOG')}</span>
          </span>
          <h1 id="roadmap-devlog-title" className="roadmap-main-title">
            {news?.title || (isVI ? 'Nhật Ký Cải Tiến' : 'News & System Evolution Log')}
          </h1>
          <p className="roadmap-main-subtitle">
            {news?.subtitle || (isVI 
              ? 'Ghi chép tuần tự theo thời gian về những bước nâng cấp công cụ toán học, kiểm tra slide và chuẩn hóa quy trình học thuật.' 
              : 'Reverse-chronological engineering record of mathematical toolchains, slide layout audits, and protocol refinements.')}
          </p>
        </header>

        {/* Khối Nhật Ký Phát Triển chuyên nghiệp chuẩn cấu trúc README */}
        <section className="roadmap-changelog-section fade-in" aria-labelledby="roadmap-devlog-title">
          <div className="roadmap-changelog-feed">
            {news?.items?.map((item, index) => {
              const IconComp = badgeIconMap[item.badgeType] || Sparkles;
              return (
                <article key={index} id={item.id} className="roadmap-log-card">
                  <div className="roadmap-log-card-header">
                    <div className="roadmap-log-meta-left">
                      <div className="roadmap-log-date">
                        <Calendar size={13} className="news-date-icon" />
                        <time dateTime={item.date.replace(/\./g, '-')}>{item.date}</time>
                      </div>
                      <span className={`news-badge news-badge-${item.badgeType || 'default'}`}>
                        <IconComp size={12} strokeWidth={2.2} />
                        <span>{item.badge}</span>
                      </span>
                    </div>

                    {item.link && (
                      <a
                        href={item.link}
                        className="roadmap-log-link"
                        target={item.link.startsWith('http') ? '_blank' : '_self'}
                        rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                      >
                        <span>{item.linkText || (isVI ? 'Xem chi tiết' : 'Details')}</span>
                        <ArrowUpRight size={14} strokeWidth={2.2} />
                      </a>
                    )}
                  </div>

                  <h2 className="roadmap-log-title">{item.title}</h2>
                  <div className="roadmap-log-body">
                    <p className="roadmap-log-desc">
                      <FormattedText text={item.description} />
                    </p>
                    {item.image && (
                      <figure className="roadmap-log-thumbnail">
                        <a
                          href={item.image.src}
                          aria-label={item.image.openLabel}
                          title={item.image.openLabel}
                          onClick={(event) => {
                            if (typeof previewDialog.current?.showModal !== 'function') return;
                            event.preventDefault();
                            setPreview(item.image);
                          }}
                        >
                          <img
                            src={item.image.src}
                            alt={item.image.alt}
                            width={item.image.width}
                            height={item.image.height}
                            loading="lazy"
                            decoding="async"
                          />
                        </a>
                        <figcaption>{item.image.caption}</figcaption>
                      </figure>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Khối Lộ trình hoàn thiện từng giai đoạn (Milestones Timeline) */}
        <div className="roadmap-timeline fade-in">
          <header className="roadmap-timeline-header">
            <span className="eyebrow blue">
              <Compass size={14} />
              <span>{roadmap.timelineEyebrow}</span>
            </span>
            <h2>{roadmap.timelineTitle}</h2>
            <p>{roadmap.timelineSubtitle}</p>
          </header>

          <ol className="roadmap-milestone-axis" aria-label={roadmap.sequenceLabel}>
            {roadmap.milestones.map((milestone) => (
              <li
                className={`roadmap-milestone roadmap-milestone-${milestone.tone}`}
                key={milestone.number}
              >
                <div className="roadmap-milestone-node" aria-hidden="true">
                  {milestone.number}
                </div>
                <article className="roadmap-milestone-copy">
                  <span>{milestone.phase}</span>
                  <h3>{milestone.title}</h3>
                  <p>{milestone.description}</p>
                </article>
              </li>
            ))}
          </ol>
        </div>

        {/* Nút quay lại khám phá bộ skill */}
        <a className="roadmap-explore-link roadmap-explore-link-simple" href="/#lifecycle">
          <span>{roadmap.explore}</span>
          <ArrowRight size={18} strokeWidth={2} aria-hidden="true" />
        </a>
      </div>

      <dialog
        ref={previewDialog}
        className="roadmap-image-dialog"
        aria-label={preview?.openLabel}
        onClose={() => setPreview(null)}
      >
        {preview && (
          <>
            <div className="roadmap-image-dialog-header">
              <span>{preview.openLabel}</span>
              <button
                type="button"
                aria-label={isVI ? 'Đóng' : 'Close'}
                title={isVI ? 'Đóng' : 'Close'}
                onClick={() => previewDialog.current.close()}
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>
            <img src={preview.src} alt={preview.alt} width={preview.width} height={preview.height} />
          </>
        )}
      </dialog>
    </div>
  );
}
