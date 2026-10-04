import React, { useState } from 'react';
import { Download, Bot, Copy, Check, Terminal, TestTube2 } from 'lucide-react';

export default function InstallSection({ t }) {
  const [activeTab, setActiveTab] = useState(t.install.tabs[0].id);
  const [copiedCmd, setCopiedCmd] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  const currentTab = t.install.tabs.find((tab) => tab.id === activeTab) || t.install.tabs[0];
  const { agentAssistedCard } = t.install;

  const handleCopyCmd = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2000);
  };

  const handleCopyPrompt = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2500);
  };

  return (
    <section className="section" id="install">
      <div className="container">
        <div className="section-header fade-in">
          <span className="eyebrow">
            <Terminal size={14} />
            <span>{t.install.eyebrow}</span>
          </span>
          <h2 className="section-title">{t.install.heading}</h2>
          <p className="section-subtitle">{t.install.subtitle}</p>
        </div>

        {/* FEATURED: Agent-Assisted ZIP Download & Auto-Install Card */}
        <div className="agent-assisted-card fade-in-scale" role="region" aria-label="Agent Assisted Installation">
          <div className="agent-assisted-header">
            <h3 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Bot size={22} style={{ color: 'var(--accent-blue)' }} />
              <span>{agentAssistedCard.title}</span>
            </h3>
          </div>

          <div className="install-steps-grid">
            {/* Step 1: Download ZIP */}
            <div className="install-step-box">
              <div className="install-step-title">
                <Download size={16} style={{ color: 'var(--accent-blue)' }} />
                <span>{agentAssistedCard.step1Label}</span>
              </div>
              <a 
                href={agentAssistedCard.downloadUrl}
                download="research-kit-main.zip"
                className="btn-download-zip"
                id="download-zip-btn"
              >
                <Download size={18} />
                <span>{agentAssistedCard.downloadBtn}</span>
              </a>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '10px', textAlign: 'center' }}>
                GitHub Official Archive (.zip)
              </p>
            </div>

            {/* Step 2: Paste prompt into Agent */}
            <div className="install-step-box">
              <div className="install-step-title">
                <Bot size={16} style={{ color: 'var(--accent-blue)' }} />
                <span>{agentAssistedCard.step2Label}</span>
              </div>
              <div className="prompt-copy-box">
                {agentAssistedCard.agentPrompt}
              </div>
              <button
                type="button"
                className={`btn-copy-prompt ${copiedPrompt ? 'copied' : ''}`}
                onClick={() => handleCopyPrompt(agentAssistedCard.agentPrompt)}
                id="copy-agent-prompt-btn"
              >
                {copiedPrompt ? (
                  <>
                    <Check size={16} strokeWidth={2.5} />
                    <span>{agentAssistedCard.copiedPrompt}</span>
                  </>
                ) : (
                  <>
                    <Copy size={16} />
                    <span>{agentAssistedCard.copyPromptBtn}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Alternative: Terminal Command Tabs */}
        <div className="fade-in" style={{ textAlign: 'center', marginBottom: '20px' }}>
          <h4 style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
            {t.install.cliHeading}
          </h4>
        </div>

        <div className="install-tabs-nav fade-in" role="tablist">
          {t.install.tabs.map((tab) => (
            <button
              type="button"
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Tab Pane */}
        <div className="tab-pane fade-in" role="tabpanel">
          <p className="tab-desc">{currentTab.desc}</p>
          <div className="code-snippet-box">
            <div className="code-snippet-header">
              <div className="code-snippet-meta">
                <span className="code-tag">bash</span>
              </div>
              <button
                type="button"
                className={`btn-copy ${copiedCmd ? 'copied' : ''}`}
                onClick={() => handleCopyCmd(currentTab.cmd)}
                title="Copy code"
                aria-label={t.hero.copyBtn}
              >
                {copiedCmd ? (
                  <>
                    <Check size={14} strokeWidth={2.5} />
                    <span>{t.hero.copied}</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} strokeWidth={2} />
                    <span>{t.hero.copyBtn}</span>
                  </>
                )}
              </button>
            </div>
            <div className="code-snippet">{currentTab.cmd}</div>
          </div>
          {currentTab.note && (
            <p className="tab-note" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '12px', background: 'rgba(56, 189, 248, 0.06)', borderLeft: '3px solid var(--accent-blue)', padding: '8px 12px', borderRadius: '4px' }}>
              💡 {currentTab.note}
            </p>
          )}
        </div>

        {/* Suite Verification Box */}
        <div className="verify-box fade-in">
          <div>
            <h4>
              <TestTube2 size={18} style={{ color: 'var(--accent-blue)' }} />
              <span>{t.install.verifyTitle}</span>
            </h4>
            <p>{t.install.verifyDesc}</p>
          </div>
          <code style={{ background: 'var(--terminal-bg)', padding: '10px 16px', borderRadius: '6px', color: '#38BDF8', border: '1px solid var(--border-accent)' }}>
            {t.install.verifyCmd}
          </code>
        </div>
      </div>
    </section>
  );
}
