import React, { useState, useEffect } from 'react';
import { Globe, Sun, Moon, Star, Menu, X } from 'lucide-react';

export default function Navbar({ lang, setLang, theme, setTheme, t, currentPage }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeId = currentPage === 'roadmap' ? 'roadmap' : currentPage === 'docs' ? 'docs' : 'intro';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLang = () => {
    setLang(lang === 'en' ? 'vi' : 'en');
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const navItems = [
    { 
      id: 'intro', 
      label: t.nav.intro, 
      href: currentPage === 'home' ? '#intro' : '/' 
    },
    { 
      id: 'roadmap', 
      label: t.nav.roadmap, 
      href: '/roadmap' 
    },
    { 
      id: 'docs', 
      label: t.nav.docs, 
      href: '/docs' 
    },
  ];

  const handleNavClick = (item) => {
    if (item.id === 'intro' && currentPage === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    closeMobileMenu();
  };

  return (
    <>
      <header className={`navbar ${scrolled ? 'scrolled' : ''}`} role="banner">
        <div className="container">
          <a href="/" className="brand" aria-label="Research Kit Home">
            <div className="brand-icon-wrapper">
              <img src="/brand/logo-icon.svg" alt="Research Kit" width="24" height="24" style={{ display: 'block' }} />
            </div>
            <span>Research Kit</span>
          </a>

          {/* Desktop Navigation Links - Giới thiệu, Nhật ký phát triển, Tài liệu */}
          <nav aria-label="Main Navigation">
            <ul className="nav-links">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a 
                    href={item.href}
                    className={`nav-link ${activeId === item.id ? 'active' : ''}`}
                    onClick={() => handleNavClick(item)}
                    aria-current={activeId === item.id ? 'page' : undefined}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Action buttons: Theme, Language, GitHub, Mobile Menu */}
          <div className="nav-actions">
            {/* Theme Toggle (Desktop Only) */}
            <button
              type="button"
              className="action-btn desktop-only"
              onClick={toggleTheme}
              title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
              aria-label={t.nav.toggleTheme}
              id="theme-toggle-btn"
            >
              {theme === 'light' ? (
                <Moon size={18} strokeWidth={2} />
              ) : (
                <Sun size={18} strokeWidth={2} />
              )}
            </button>

            {/* Language Toggle (Desktop Only) */}
            <button 
              type="button"
              className="action-btn desktop-only" 
              onClick={toggleLang}
              title={lang === 'en' ? 'Chuyển sang Tiếng Việt' : 'Switch to English'}
              aria-label="Toggle Language"
              id="lang-toggle-btn"
            >
              <Globe size={16} strokeWidth={2} />
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                {lang === 'en' ? 'VI' : 'EN'}
              </span>
            </button>
            
            {/* GitHub Star Button (Desktop Only) */}
            <a 
              href="https://github.com/vinhnt21/research-kit" 
              target="_blank" 
              rel="noopener noreferrer"
              className="action-btn btn-github desktop-only"
              id="github-star-btn"
              aria-label="Star on GitHub"
            >
              <Star size={16} strokeWidth={2} />
              <span>{t.nav.starGitHub}</span>
            </a>

            {/* Mobile Hamburger Button - GIỮ DUY NHẤT NÚT NÀY VÀ LOGO TRÊN MOBILE */}
            <button
              type="button"
              className="mobile-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? t.nav.close : t.nav.menu}
              aria-expanded={mobileMenuOpen}
              id="mobile-menu-toggle-btn"
            >
              {mobileMenuOpen ? (
                <X size={22} strokeWidth={2} />
              ) : (
                <Menu size={22} strokeWidth={2} />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation (Menu ẩn chứa toàn bộ nav links + controls) */}
      <div 
        className={`mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Drawer"
      >
        <ul className="mobile-nav-links">
          {navItems.map((item) => (
            <li key={item.id}>
              <a 
                href={item.href}
                className={activeId === item.id ? 'active' : ''}
                onClick={() => handleNavClick(item)}
                aria-current={activeId === item.id ? 'page' : undefined}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Khối controls được dồn vào menu ẩn */}
        <div className="mobile-drawer-controls">
          <div className="mobile-controls-row">
            {/* Đổi giao diện Sáng / Tối */}
            <button
              type="button"
              className="mobile-control-btn"
              onClick={toggleTheme}
            >
              {theme === 'light' ? (
                <>
                  <Moon size={18} strokeWidth={2} />
                  <span>{lang === 'vi' ? 'Chế độ tối' : 'Dark'}</span>
                </>
              ) : (
                <>
                  <Sun size={18} strokeWidth={2} />
                  <span>{lang === 'vi' ? 'Chế độ sáng' : 'Light'}</span>
                </>
              )}
            </button>

            {/* Đổi ngôn ngữ EN / VI */}
            <button
              type="button"
              className="mobile-control-btn"
              onClick={toggleLang}
            >
              <Globe size={18} strokeWidth={2} />
              <span>{lang === 'vi' ? 'Tiếng Anh' : 'Tiếng Việt'}</span>
            </button>
          </div>

          {/* GitHub Star Button */}
          <a 
            href="https://github.com/vinhnt21/research-kit"
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-github-btn"
            onClick={closeMobileMenu}
          >
            <Star size={18} strokeWidth={2} fill="#F59E0B" color="#F59E0B" />
            <span>{lang === 'vi' ? 'Ủng hộ 1 Star trên GitHub' : 'Star on GitHub'}</span>
          </a>
        </div>
      </div>
    </>
  );
}
