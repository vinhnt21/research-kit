import { useState } from 'react';
import { Minimize2, ZoomIn } from 'lucide-react';

export default function FigureViewer({
  src,
  alt = 'Research Kit Figure',
  title = '',
  caption = '',
  minReadableWidth = 780,
  defaultMode = 'scroll',
  lang = 'vi',
  viewerText = {},
  className = '',
}) {
  const [mode, setMode] = useState(defaultMode === 'fit' ? 'fit' : 'scroll');
  const [hasScrolled, setHasScrolled] = useState(false);
  const fitLabel = viewerText.fit || (lang === 'vi' ? 'Thu vừa' : 'Fit');
  const zoomLabel = viewerText.zoom || (lang === 'vi' ? 'Phóng to' : 'Zoom');
  const scrollHint = viewerText.scrollHint || (lang === 'vi'
    ? '← Vuốt ngang để xem chi tiết'
    : '← Swipe horizontally to explore');

  const showDetail = (nextMode) => {
    setMode(nextMode);
    if (nextMode === 'scroll') setHasScrolled(false);
  };

  return (
    <figure className={`figure-viewer-card ${className}`}>
      <div className="figure-viewer-header">
        {title && <span className="figure-viewer-title">{title}</span>}
        <div className="figure-mode-toggle" role="group" aria-label={lang === 'vi' ? 'Chế độ xem hình' : 'Figure display mode'}>
          <button
            type="button"
            className={`figure-mode-btn${mode === 'fit' ? ' is-active' : ''}`}
            onClick={() => showDetail('fit')}
            aria-pressed={mode === 'fit'}
          >
            <Minimize2 size={14} />
            <span>{fitLabel}</span>
          </button>
          <button
            type="button"
            className={`figure-mode-btn${mode === 'scroll' ? ' is-active' : ''}`}
            onClick={() => showDetail('scroll')}
            aria-pressed={mode === 'scroll'}
          >
            <ZoomIn size={14} />
            <span>{zoomLabel}</span>
          </button>
        </div>
      </div>

      <div
        className={`figure-viewer-surface ${mode === 'scroll' ? 'is-scroll-mode' : 'is-fit-mode'}`}
        onScroll={() => {
          if (!hasScrolled) setHasScrolled(true);
        }}
      >
        <div
          className="figure-image-wrapper"
          style={mode === 'scroll' ? { '--figure-min-width': `${minReadableWidth}px` } : undefined}
        >
          <img src={src} alt={alt} className="figure-vector-img" />
        </div>

        {mode === 'scroll' && !hasScrolled && (
          <div className="figure-swipe-hint" onClick={() => setHasScrolled(true)}>
            <span>{scrollHint}</span>
          </div>
        )}
      </div>

      {caption && (
        <figcaption className="figure-viewer-caption">{caption}</figcaption>
      )}
    </figure>
  );
}
