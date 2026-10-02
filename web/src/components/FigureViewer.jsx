import { useState } from 'react';

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
  const [hasScrolled, setHasScrolled] = useState(false);
  const scrollHint = viewerText.scrollHint || (lang === 'vi'
    ? '← Vuốt ngang để xem chi tiết'
    : '← Swipe horizontally to explore');

  return (
    <figure className={`figure-viewer-card ${className}`}>
      {title && (
        <div className="figure-viewer-header">
          <span className="figure-viewer-title">{title}</span>
        </div>
      )}

      <div
        className={`figure-viewer-surface ${defaultMode === 'scroll' ? 'is-scroll-mode' : 'is-fit-mode'}`}
        onScroll={() => {
          if (!hasScrolled) setHasScrolled(true);
        }}
      >
        <div
          className="figure-image-wrapper"
          style={defaultMode === 'scroll' ? { '--figure-min-width': `${minReadableWidth}px` } : undefined}
        >
          <img src={src} alt={alt} className="figure-vector-img" />
        </div>

        {defaultMode === 'scroll' && !hasScrolled && (
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
