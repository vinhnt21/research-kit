import { ArrowRight } from 'lucide-react';
import FigureViewer from './FigureViewer';

export default function RoadmapPage({ t }) {
  const roadmap = t.roadmap;
  const isVi = t.nav?.roadmap === 'Lộ trình';

  return (
    <section className="roadmap-page" aria-labelledby="roadmap-title">
      <div className="roadmap-intro">
        <div className="container">
          <header className="roadmap-intro-header fade-in">
            <span className="eyebrow">{roadmap.eyebrow}</span>
            <h1 id="roadmap-title">{roadmap.title}</h1>
            <p className="roadmap-intro-subtitle">
              {roadmap.explanation} {roadmap.subtitle}
            </p>
          </header>

          <FigureViewer
            src={roadmap.figure.src}
            alt={roadmap.figure.alt}
            label={roadmap.figure.label}
            title={roadmap.title}
            caption={roadmap.figure.caption}
            minReadableWidth={880}
            defaultMode="scroll"
            lang={isVi ? 'vi' : 'en'}
            viewerText={t.figureViewer}
            className="fade-in-scale"
          />
        </div>
      </div>

      <div className="container roadmap-content">
        <div className="roadmap-split">
          <div className="roadmap-timeline">
            <header className="roadmap-timeline-header">
              <span>{roadmap.timelineEyebrow}</span>
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

          <section className="roadmap-devlog" aria-labelledby="roadmap-devlog-title">
            <header className="roadmap-timeline-header">
              <span>{roadmap.devlogEyebrow}</span>
              <h2 id="roadmap-devlog-title">{roadmap.devlogTitle}</h2>
              <p>{roadmap.devlogSubtitle}</p>
            </header>
            <ol className="roadmap-devlog-list" aria-label={roadmap.devlogLabel}>
              {roadmap.entries.map((entry) => (
                <li key={`${entry.date}-${entry.title}`}>
                  <time dateTime={entry.date}>{entry.date}</time>
                  <h3>{entry.title}</h3>
                  <p>{entry.note}</p>
                </li>
              ))}
            </ol>
          </section>
        </div>

        <a className="roadmap-explore-link roadmap-explore-link-simple" href="/#lifecycle">
          {roadmap.explore}
          <ArrowRight size={18} strokeWidth={2} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
