import React, { useState, useEffect } from 'react';
import { Microscope, Globe, Sun, Moon, Star, Menu, X } from 'lucide-react';

export default function Navbar({ lang, setLang, theme, setTheme, t }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('lifecycle');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);

      // Khi cuộn xuống sát đáy trang (CTA / Footer), kích hoạt mục cuối 'faq'
      const isBottom = window.innerHeight + Math.round(window.scrollY) >= document.documentElement.scrollHeight - 70;
      if (isBottom) {
        setActiveSection('faq');
        return;
      }

      // Kiểm tra lần lượt từ section dưới lên trên
      const navSections = [
        { id: 'faq', threshold: 120 },
        { id: 'install', threshold: 120 },
        { id: 'advantages', threshold: 120 },
        { id: 'lifecycle', threshold: 120 },
      ];

      for (const sec of navSections) {
        const el = document.getElementById(sec.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= sec.threshold) {
            setActiveSection(sec.id);
            return;
          }
        }
      }

      // Mặc định ở phần đầu trang (Hero) là 'lifecycle' (Giới thiệu)
      setActiveSection('lifecycle');
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
    { id: 'lifecycle', label: t.nav.intro },
    { id: 'advantages', label: t.nav.advantages },
    { id: 'install', label: t.nav.install },
    { id: 'faq', label: t.nav.faq },
  ];

  return (
    <>
      <header className={`navbar ${scrolled ? 'scrolled' : ''}`} role="banner">
        <div className="container">
          <a href="#" className="brand" aria-label="Research Kit Home">
            <div className="brand-icon-wrapper">
              <Microscope size={22} strokeWidth={2.2} />
            </div>
            <span>Research Kit</span>
          </a>

          {/* Desktop Navigation Links - Sắp xếp chuẩn 4 phần UX có highlight section đang xem */}
          <nav aria-label="Main Navigation">
            <ul className="nav-links">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a 
                    href={`#${item.id}`} 
                    className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                    onClick={() => setActiveSection(item.id)}
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
                href={`#${item.id}`} 
                className={activeSection === item.id ? 'active' : ''}
                onClick={() => {
                  setActiveSection(item.id);
                  closeMobileMenu();
                }}
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
