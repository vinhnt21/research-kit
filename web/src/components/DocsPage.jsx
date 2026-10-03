import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import {
  Copy,
  Check,
  Terminal,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Shield,
  Cpu,
  BookOpen,
  FileText,
} from 'lucide-react';
import { docsContent } from '../data/docsContent';

/* ─── Utility: copy to clipboard ─────────────────────────────────────── */
function useCopy() {
  const [copiedKey, setCopiedKey] = useState(null);
  const copy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };
  return { copy, copiedKey };
}

/* ─── Sub-component: inline copy button ─────────────────────────────── */
function CopyBtn({ text, id, copiedKey, copy, label = 'Copy' }) {
  const isCopied = copiedKey === id;
  return (
    <button
      type="button"
      className={`docs-copy-btn${isCopied ? ' copied' : ''}`}
      onClick={() => copy(text, id)}
      title={label}
    >
      {isCopied ? <Check size={13} /> : <Copy size={13} />}
      <span>{isCopied ? 'Copied!' : label}</span>
    </button>
  );
}

/* ─── Sub-component: code block ──────────────────────────────────────── */
function CodeBlock({ label, code, id, copiedKey, copy }) {
  return (
    <div className="docs-code-block">
      <div className="docs-code-header">
        <span className="docs-code-label">{label}</span>
        <CopyBtn text={code} id={id} copiedKey={copiedKey} copy={copy} />
      </div>
      <pre className="docs-code-pre"><code>{code}</code></pre>
    </div>
  );
}

/* ─── Main Component ─────────────────────────────────────────────────── */
export default function DocsPage({ t, lang }) {
  const d = docsContent[lang] || docsContent.en;
  const [activeTab, setActiveTab] = useState(d.lifecycle.methods[0]?.id ?? 'skills-cli');
  const [activeSection, setActiveSection] = useState('lifecycle');
  const [tocOpen, setTocOpen] = useState(false);
  const { copy, copiedKey } = useCopy();
  const contentRef = useRef(null);

  useLayoutEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;
    document.getElementById(id)?.scrollIntoView({ block: 'start' });
  }, [lang]);

  /* ── Active section highlight via IntersectionObserver ─── */
  useEffect(() => {
    const sections = document.querySelectorAll('.docs-section[id]');
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [lang]);

  const isVI = lang === 'vi';

  /* ── Sidebar nav items ────────────────────────────────────── */
  const navGroups = [
    {
      label: isVI ? 'Cài đặt' : 'Setup',
      items: [
        { id: 'lifecycle', label: d.nav.lifecycle, icon: <Terminal size={14} /> },
        { id: 'architecture', label: d.nav.architecture, icon: <FileText size={14} /> },
      ],
    },
    {
      label: isVI ? '6 Kỹ năng cốt lõi' : '6 Core Skills',
      items: d.coreSkills.items.map((sk) => ({
        id: `skill-${sk.id}`,
        label: `${sk.id}`,
        sub: sk.name,
      })),
    },
    {
      label: isVI ? '4 Module chuyên ngành' : '4 Domain Modules',
      items: d.domainSkills.items.map((sk) => ({
        id: `skill-${sk.id}`,
        label: sk.id,
        sub: sk.domain,
      })),
    },
    {
      label: isVI ? 'Tham khảo' : 'Reference',
      items: [
        { id: 'playbook', label: d.nav.playbook, icon: <BookOpen size={14} /> },
        { id: 'cheatsheet', label: d.nav.cheatsheet, icon: <Shield size={14} /> },
        { id: 'antipatterns', label: d.nav.antipatterns, icon: <Cpu size={14} /> },
      ],
    },
  ];

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTocOpen(false);
  };

  const tocLabel = isVI ? 'Mục lục' : 'Contents';
  const sectionLabels = {
    'core-skills': navGroups[1].label,
    'domain-skills': navGroups[2].label,
  };
  const currentItem = navGroups.flatMap((group) => group.items).find((item) => item.id === activeSection);
  const currentTitle = currentItem?.sub || currentItem?.label || sectionLabels[activeSection] || tocLabel;
  const showCurrent = currentTitle.toLowerCase() !== tocLabel.toLowerCase();

  return (
    <div className="docs-page">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <div className="docs-hero-bar">
        <div className="container docs-hero-inner">
          <div className="docs-hero-text">
            <span className="docs-eyebrow">{d.hero.eyebrow}</span>
            <h1 className="docs-hero-title">{d.hero.title}</h1>
            <p className="docs-hero-sub">{d.hero.subtitle}</p>
          </div>

          <div className="docs-hero-meta">
            {d.hero.stats.map((st, i) => (
              <div key={i} className="docs-meta-item">
                <span className="docs-meta-value">{st.value}</span>
                <span className="docs-meta-label">{st.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Layout ───────────────────────────────────────────── */}
      <div className="container docs-body">
        {/* Sidebar */}
        <div className={`docs-toc-shell${tocOpen ? ' is-open' : ''}`}>
          <button
            type="button"
            className="docs-toc-toggle"
            aria-expanded={tocOpen}
            onClick={() => setTocOpen((open) => !open)}
          >
            <span className="docs-toc-toggle-kicker">{tocLabel}</span>
            {showCurrent && <span className="docs-toc-toggle-current">{currentTitle}</span>}
            <ChevronDown size={18} className={`docs-toc-chevron${tocOpen ? ' is-open' : ''}`} aria-hidden="true" />
          </button>
        <nav className="docs-toc" aria-label="Table of contents">
          <div className="docs-toc-inner">
            {navGroups.map((group) => (
              <div
                key={group.label}
                className={`docs-toc-group${
                  group.items.some((item) => item.id === activeSection) || group.label === sectionLabels[activeSection]
                    ? ' is-current'
                    : ''
                }`}
              >
                <span className="docs-toc-group-label">{group.label}</span>
                {group.items.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={`docs-toc-link${activeSection === item.id ? ' active' : ''}`}
                    onClick={() => scrollTo(item.id)}
                  >
                    {item.icon && <span className="toc-icon">{item.icon}</span>}
                    <span className="toc-label-wrap">
                      <span className="toc-label">{item.label}</span>
                      {item.sub && <span className="toc-sub">{item.sub}</span>}
                    </span>
                    <ChevronRight size={12} className="toc-arrow" />
                  </button>
                ))}
              </div>
            ))}

            <div className="docs-toc-footer">
              <a
                href={isVI
                  ? 'https://github.com/vinhnt21/research-kit/blob/main/documents/guide.vi.md'
                  : 'https://github.com/vinhnt21/research-kit/blob/main/documents/guide.md'}
                target="_blank"
                rel="noopener noreferrer"
                className="docs-github-link"
              >
                <FileText size={13} />
                <span>{isVI ? 'Xem trên GitHub' : 'View on GitHub'}</span>
                <ExternalLink size={11} />
              </a>
            </div>
          </div>
        </nav>
        </div>

        {/* Main content */}
        <main className="docs-main" ref={contentRef} id="docs-main-content">

          {/* ═══════════════════════════════════════════════════
              §1  LIFECYCLE
          ═══════════════════════════════════════════════════ */}
          <section id="lifecycle" className="docs-section">
            <div className="docs-section-label">01</div>
            <h2 className="docs-section-title">{d.lifecycle.title}</h2>
            <p className="docs-section-lead">{d.lifecycle.desc}</p>

            {/* Method tabs */}
            <div className="docs-tabs" role="tablist">
              {d.lifecycle.methods.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === m.id}
                  className={`docs-tab${activeTab === m.id ? ' active' : ''}`}
                  onClick={() => setActiveTab(m.id)}
                >
                  {m.name}
                </button>
              ))}
            </div>

            {d.lifecycle.methods
              .filter((m) => m.id === activeTab)
              .map((m) => (
                <div key={m.id} className="docs-tab-panel">
                  <p className="docs-tab-desc">{m.desc}</p>
                  <CodeBlock
                    label={isVI ? '1. Cài đặt (Install)' : '1. Install'}
                    code={m.installCmd}
                    id={`${m.id}-install`}
                    copiedKey={copiedKey}
                    copy={copy}
                  />
                  <CodeBlock
                    label={isVI ? '2. Cập nhật (Update)' : '2. Update'}
                    code={m.updateCmd}
                    id={`${m.id}-update`}
                    copiedKey={copiedKey}
                    copy={copy}
                  />
                  <CodeBlock
                    label={isVI ? '3. Gỡ bỏ (Remove)' : '3. Remove'}
                    code={m.removeCmd}
                    id={`${m.id}-remove`}
                    copiedKey={copiedKey}
                    copy={copy}
                  />
                </div>
              ))}

            {/* Health check callout */}
            <div className="docs-callout docs-callout--green">
              <strong>{d.lifecycle.healthCheckTitle}</strong>
              <p>{d.lifecycle.healthCheckDesc}</p>
              <div className="docs-inline-cmd">
                <code>{d.lifecycle.healthCheckCmd}</code>
                <CopyBtn
                  text={d.lifecycle.healthCheckCmd}
                  id="healthcheck"
                  copiedKey={copiedKey}
                  copy={copy}
                />
              </div>
            </div>

            <div className="docs-callout docs-callout--amber">
              <p>{d.lifecycle.cacheWarning}</p>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════
              §2  ARCHITECTURE
          ═══════════════════════════════════════════════════ */}
          <section id="architecture" className="docs-section">
            <div className="docs-section-label">02</div>
            <h2 className="docs-section-title">{d.architecture.title}</h2>
            <p className="docs-section-lead">{d.architecture.desc}</p>

            <div className="docs-principles">
              {d.architecture.principles.map((pr, idx) => (
                <div key={idx} className="docs-principle">
                  <span className="docs-principle-num">{String(idx + 1).padStart(2, '0')}</span>
                  <div>
                    <strong>{pr.title}</strong>
                    <p>{pr.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="docs-code-block docs-code-block--tree">
              <div className="docs-code-header">
                <span className="docs-code-label">
                  {isVI ? 'Cấu trúc thư mục Lab tiêu chuẩn' : 'Standard Research Lab Directory'}
                </span>
              </div>
              <pre className="docs-code-pre"><code>{d.architecture.tree}</code></pre>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════
              §3  CORE SKILLS
          ═══════════════════════════════════════════════════ */}
          <section id="core-skills" className="docs-section">
            <div className="docs-section-label">03</div>
            <h2 className="docs-section-title">{d.coreSkills.title}</h2>
            <p className="docs-section-lead">{d.coreSkills.desc}</p>

            {d.coreSkills.items.map((sk) => (
              <article key={sk.id} id={`skill-${sk.id}`} className="docs-skill-entry">
                <div className="docs-skill-header">
                  <div className="docs-skill-id-wrap">
                    <code className="docs-skill-id">@{sk.id}</code>
                    <span className="docs-skill-stage">{sk.stage}</span>
                  </div>
                  <h3 className="docs-skill-name">{sk.name}</h3>
                </div>

                <p className="docs-skill-duty">{sk.duty}</p>

                <table className="docs-skill-table">
                  <tbody>
                    <tr>
                      <td className="docs-skill-table-key">{isVI ? 'Khi nào dùng' : 'When to use'}</td>
                      <td className="docs-skill-table-val docs-skill-table-val--green">{sk.whenToUse}</td>
                    </tr>
                    <tr>
                      <td className="docs-skill-table-key">{isVI ? 'Khi nào không dùng' : 'When NOT to use'}</td>
                      <td className="docs-skill-table-val docs-skill-table-val--red">{sk.whenNotToUse}</td>
                    </tr>
                    <tr>
                      <td className="docs-skill-table-key">{isVI ? 'Đầu vào' : 'Inputs'}</td>
                      <td className="docs-skill-table-val">{sk.inputs}</td>
                    </tr>
                    <tr>
                      <td className="docs-skill-table-key">{isVI ? 'Đầu ra' : 'Outputs'}</td>
                      <td className="docs-skill-table-val"><code className="docs-output-code">{sk.outputs}</code></td>
                    </tr>
                  </tbody>
                </table>

                <div className="docs-gate">
                  <Shield size={14} className="docs-gate-icon" />
                  <div>
                    <span className="docs-gate-label">{isVI ? 'Mốc kiểm chứng' : 'Pass condition'}</span>
                    <p>{sk.gate}</p>
                  </div>
                </div>

                <div className="docs-prompt">
                  <div className="docs-prompt-header">
                    <span>{isVI ? 'Prompt mẫu' : 'Sample prompt'}</span>
                    <CopyBtn
                      text={isVI ? sk.promptVi : sk.promptEn}
                      id={`prompt-${sk.id}`}
                      copiedKey={copiedKey}
                      copy={copy}
                      label={isVI ? 'Sao chép' : 'Copy'}
                    />
                  </div>
                  <p className="docs-prompt-text">"{isVI ? sk.promptVi : sk.promptEn}"</p>
                </div>
              </article>
            ))}
          </section>

          {/* ═══════════════════════════════════════════════════
              §4  DOMAIN SKILLS
          ═══════════════════════════════════════════════════ */}
          <section id="domain-skills" className="docs-section">
            <div className="docs-section-label">04</div>
            <h2 className="docs-section-title">{d.domainSkills.title}</h2>
            <p className="docs-section-lead">{d.domainSkills.desc}</p>

            <div className="docs-domain-grid">
              {d.domainSkills.items.map((sk) => (
                <article key={sk.id} id={`skill-${sk.id}`} className="docs-domain-entry">
                  <div className="docs-skill-header">
                    <div className="docs-skill-id-wrap">
                      <code className="docs-skill-id">@{sk.id}</code>
                      <span className="docs-domain-badge">{sk.domain}</span>
                    </div>
                  </div>

                  <p className="docs-skill-duty">{sk.duty}</p>

                  <div className="docs-domain-invariant">
                    <span className="docs-domain-invariant-label">
                      {isVI ? 'Quy tắc cứng' : 'Hard rule'}
                    </span>
                    <p>{sk.invariant}</p>
                  </div>

                  <div className="docs-prompt docs-prompt--sm">
                    <div className="docs-prompt-header">
                      <span>{isVI ? 'Prompt mẫu' : 'Sample prompt'}</span>
                      <CopyBtn
                        text={isVI ? sk.promptVi : sk.promptEn}
                        id={`domain-${sk.id}`}
                        copiedKey={copiedKey}
                        copy={copy}
                        label={isVI ? 'Sao chép' : 'Copy'}
                      />
                    </div>
                    <p className="docs-prompt-text">"{isVI ? sk.promptVi : sk.promptEn}"</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════
              §5  PLAYBOOK
          ═══════════════════════════════════════════════════ */}
          <section id="playbook" className="docs-section">
            <div className="docs-section-label">05</div>
            <h2 className="docs-section-title">{d.playbook.title}</h2>
            <p className="docs-section-lead">{d.playbook.desc}</p>

            <div className="docs-playbook">
              {d.playbook.steps.map((st, idx) => (
                <div key={idx} className="docs-playbook-step">
                  <div className="docs-playbook-phase">{st.phase}</div>
                  <div className="docs-playbook-content">
                    <div className="docs-playbook-top">
                      <strong>{st.title}</strong>
                      <code className="docs-playbook-skill">@{st.skill}</code>
                    </div>
                    <p>{st.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════
              §6  CHEATSHEET
          ═══════════════════════════════════════════════════ */}
          <section id="cheatsheet" className="docs-section">
            <div className="docs-section-label">06</div>
            <h2 className="docs-section-title">{d.cheatsheet.title}</h2>
            <p className="docs-section-lead">{d.cheatsheet.desc}</p>

            <div className="docs-table-wrap">
              <table className="docs-table">
                <thead>
                  <tr>
                    {d.cheatsheet.headers.map((h, i) => <th key={i}>{h}</th>)}
                    <th aria-label="Action"></th>
                  </tr>
                </thead>
                <tbody>
                  {d.cheatsheet.rows.map((r, idx) => (
                    <tr key={idx}>
                      <td><strong>{r.task}</strong></td>
                      <td><code className="docs-skill-chip">@{r.skill}</code></td>
                      <td className="docs-prompt-cell"><code>{r.prompt}</code></td>
                      <td>
                        <CopyBtn
                          text={r.prompt}
                          id={`table-${idx}`}
                          copiedKey={copiedKey}
                          copy={copy}
                          label=""
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════
              §7  ANTI-PATTERNS
          ═══════════════════════════════════════════════════ */}
          <section id="antipatterns" className="docs-section">
            <div className="docs-section-label">07</div>
            <h2 className="docs-section-title">{d.antipatterns.title}</h2>
            <p className="docs-section-lead">{d.antipatterns.desc}</p>

            <div className="docs-antip-list">
              {d.antipatterns.items.map((ap, idx) => (
                <div key={idx} className="docs-antip-item">
                  <h4 className="docs-antip-name">{ap.name}</h4>
                  <div className="docs-antip-row">
                    <div className="docs-antip-problem">
                      <span className="docs-antip-badge docs-antip-badge--red">
                        {isVI ? 'Cạm bẫy AI' : 'AI Trap'}
                      </span>
                      <p>{ap.problem}</p>
                    </div>
                    <div className="docs-antip-safe">
                      <span className="docs-antip-badge docs-antip-badge--green">
                        {isVI ? 'Cơ chế phòng vệ' : 'Safeguard'}
                      </span>
                      <p>{ap.safeguard}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}
