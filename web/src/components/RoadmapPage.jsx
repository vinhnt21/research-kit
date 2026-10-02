import { ArrowRight } from 'lucide-react';

export default function RoadmapPage({ t }) {
  const roadmap = t.roadmap;

  return (
    <section className="roadmap-page" aria-labelledby="roadmap-title">
      <div className="roadmap-intro">
        <div className="container">
          <header className="roadmap-intro-header fade-in">
            <span className="eyebrow">{roadmap.eyebrow}</span>
            <h1 id="roadmap-title">{roadmap.title}</h1>
            <div className="roadmap-explanation">
              <p>{roadmap.explanation}</p>
            </div>
            <p className="roadmap-intro-subtitle">{roadmap.subtitle}</p>
          </header>

          <figure className="roadmap-paper-figure fade-in-scale">
            <div className="roadmap-figure-scroll">
              <img src={roadmap.figure.src} alt={roadmap.figure.alt} />
            </div>
            <figcaption>
              <span>{roadmap.figure.label}</span>
              {roadmap.figure.caption}
            </figcaption>
          </figure>
        </div>
      </div>

      <div className="container roadmap-content">
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

        <a className="roadmap-explore-link roadmap-explore-link-simple" href="/#lifecycle">
          {roadmap.explore}
          <ArrowRight size={18} strokeWidth={2} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
