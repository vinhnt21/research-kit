import React, { useState } from 'react';
import { Copy, Check, Terminal, ArrowRight, Download, Star } from 'lucide-react';

import cursorLogo from '../assets/logos/cursor.png';
import claudeLogo from '../assets/logos/claude-code.png';
import codexLogo from '../assets/logos/openai-codex.png';
import antigravityLogo from '../assets/logos/google-antigravity.png';
import copilotLogo from '../assets/logos/github-copilot.png';

const agentLogos = [
  { name: 'Cursor', logo: cursorLogo, url: 'https://cursor.com' },
  { name: 'Claude Code', logo: claudeLogo, url: 'https://claude.ai' },
  { name: 'OpenAI Codex', logo: codexLogo, url: 'https://openai.com' },
  { name: 'Google Antigravity', logo: antigravityLogo, url: 'https://deepmind.google' },
  { name: 'GitHub Copilot', logo: copilotLogo, url: 'https://github.com/features/copilot' },
];

export default function Hero({ t }) {
  const [copied, setCopied] = useState(false);
  const command = 'npx skills add vinhnt21/research-kit';

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="hero-section" id="hero">
      <div className="container">
        <div className="hero-badge-wrapper fade-in">
          <span className="eyebrow">
            <Terminal size={14} />
            <span>{t.hero.badge}</span>
          </span>
        </div>

        <h1 className="hero-title fade-in stagger-1">{t.hero.title}</h1>
        
        <p className="hero-subtitle fade-in stagger-2">{t.hero.subtitle}</p>

        {/* Interactive Terminal */}
        <div className="terminal-box fade-in stagger-3" role="region" aria-label="Terminal installation widget">
          <div className="terminal-header">
            <div className="terminal-dots">
              <span className="dot red"></span>
              <span className="dot yellow"></span>
              <span className="dot green"></span>
            </div>
            <span className="terminal-label">{t.hero.installLabel}</span>
          </div>

          <div className="terminal-body">
            <div className="terminal-cmd">
              <span className="prompt-sym">$</span>
              <span className="cmd-text">{command}</span>
            </div>
            <button 
              type="button"
              className={`btn-copy ${copied ? 'copied' : ''}`} 
              onClick={handleCopy}
              id="hero-copy-command-btn"
              title="Copy installation command"
              aria-label={t.hero.copyBtn}
            >
              {copied ? (
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

          <div className="terminal-alt">
            <span>{t.hero.altInstallPrompt} </span>
            <code>gh skill install vinhnt21/research-kit --agent cursor</code>
          </div>
        </div>

        {/* Quick Zip & Agent Installer Notice */}
        <div className="hero-zip-notice fade-in stagger-3">
          <span>{t.hero.zipNotice}</span>
          <a href="#install" className="hero-zip-link">
            <Download size={15} />
            <span>{t.hero.zipLinkText}</span>
            <ArrowRight size={14} />
          </a>
        </div>

        {/* Kêu gọi Star ủng hộ dự án */}
        <div className="hero-star-banner fade-in stagger-3">
          <Star size={16} className="star-icon-gold" fill="#F59E0B" color="#F59E0B" />
          <span className="hero-star-text">{t.hero.starCallout}</span>
          <a 
            href="https://github.com/vinhnt21/research-kit" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hero-star-link"
          >
            <span>{t.hero.starCalloutLink}</span>
            <ArrowRight size={13} />
          </a>
        </div>

        {/* Supported AI Agents Strip - Biểu tượng logo trực quan */}
        <div className="agents-strip fade-in stagger-4">
          <span className="agents-label">{t.hero.supportedAgents}</span>
          <div className="agents-badges">
            {agentLogos.map((agent) => (
              <a 
                href={agent.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="agent-badge" 
                key={agent.name}
                title={agent.name}
              >
                <img src={agent.logo} alt={agent.name} className="agent-logo-img" />
                <span className="agent-badge-name">{agent.name}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          {t.hero.stats.map((stat, idx) => (
            <div className={`stat-card fade-in stagger-${(idx % 4) + 1}`} key={idx}>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
              <div className="stat-sub">{stat.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
