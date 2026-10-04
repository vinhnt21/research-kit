import React, { useState, useEffect } from 'react';
import { 
  List, 
  X, 
  ArrowUp, 
  Compass, 
  ShieldCheck, 
  Terminal, 
  HelpCircle,
  ChevronRight,
  ChevronDown
} from 'lucide-react';

const iconMap = {
  top: ArrowUp,
  lifecycle: Compass,
  advantages: ShieldCheck,
  install: Terminal,
  faq: HelpCircle,
};

export default function PageToc({ t, lang }) {
  // Giao diện máy tính (>= 1024px): MẶC ĐỊNH MỞ theo yêu cầu của người dùng
  const [isOpen, setIsOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 1024;
    }
    return false;
  });

  const [activeSection, setActiveSection] = useState('hero');
  const [showButton, setShowButton] = useState(false);

  const toc = t.toc || {
    button: lang === 'vi' ? 'Mục lục' : 'Contents',
    title: lang === 'vi' ? 'Mục Lục Trang' : 'Page Contents',
    subtitle: lang === 'vi' ? 'Chuyển nhanh đến phần nội dung' : 'Jump to section',
    close: lang === 'vi' ? 'Thu nhỏ' : 'Collapse',
    items: [
      { id: 'hero', label: lang === 'vi' ? 'Đầu trang' : 'Top', desc: lang === 'vi' ? 'Tổng quan & Giới thiệu' : 'Overview & Quick Start', icon: 'top' },
      { id: 'lifecycle', label: lang === 'vi' ? 'Vòng đời nghiên cứu' : 'Research Lifecycle', desc: lang === 'vi' ? '6 giai đoạn & 4 module' : '6 Stages & 4 Modules', icon: 'lifecycle' },
      { id: 'advantages', label: lang === 'vi' ? 'Tư duy tinh gọn' : 'Lean Mindset', desc: lang === 'vi' ? 'Trụ cột & So sánh context' : 'Pillars & Context Benchmark', icon: 'advantages' },
      { id: 'install', label: lang === 'vi' ? 'Cài đặt & Bắt đầu' : 'Installation', desc: lang === 'vi' ? 'File ZIP & Dòng lệnh CLI' : 'ZIP File & CLI Commands', icon: 'install' },
      { id: 'faq', label: lang === 'vi' ? 'Hỏi đáp thường gặp' : 'FAQ', desc: lang === 'vi' ? 'Giải đáp thắc mắc' : 'Common Questions', icon: 'faq' },
    ],
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowButton(scrollY > 150);

      // Cuộn sát đáy trang (kích hoạt faq)
      const isBottom = window.innerHeight + Math.round(scrollY) >= document.documentElement.scrollHeight - 80;
      if (isBottom) {
        setActiveSection('faq');
        return;
      }

      const sections = [
        { id: 'faq', threshold: 140 },
        { id: 'install', threshold: 140 },
        { id: 'advantages', threshold: 140 },
        { id: 'lifecycle', threshold: 140 },
      ];

      for (const sec of sections) {
        const el = document.getElementById(sec.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= sec.threshold) {
            setActiveSection(sec.id);
            return;
          }
        }
      }

      setActiveSection('hero');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Chỉ khóa cuộn trang nền khi mở modal bottom sheet trên điện thoại (< 1024px)
  useEffect(() => {
    if (typeof window !== 'undefined' && isOpen && window.innerWidth < 1024) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const scrollToSection = (id) => {
    // Trên điện thoại (< 1024px) thì đóng sheet sau khi chọn mục
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setIsOpen(false);
    }

    if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const currentItem = toc.items.find((item) => item.id === activeSection);
  const currentLabel = currentItem ? currentItem.label : toc.button;

  return (
    <>
      {/* Floating Toggle Button (Hiển thị khi thu nhỏ hoặc trên điện thoại) */}
      <aside 
        className={`page-toc-floater ${showButton || !isOpen ? 'visible' : ''} ${isOpen ? 'desktop-open' : ''}`}
        aria-label="Table of Contents Quick Jump"
      >
        <button
          type="button"
          className="toc-toggle-pill"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label={toc.button}
          id="toc-toggle-button"
        >
          <div className="toc-pill-icon">
            <List size={16} strokeWidth={2.2} />
          </div>
          <span className="toc-pill-label">{toc.button}</span>
          {activeSection !== 'hero' && (
            <span className="toc-pill-current">· {currentLabel}</span>
          )}
        </button>
      </aside>

      {/* Overlay Backdrop - Chỉ hiển thị trên điện thoại khi drawer mở */}
      {isOpen && (
        <div 
          className="toc-backdrop" 
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Khung Mục Lục (Mặc định mở trên máy tính, bottom sheet trên mobile) */}
      <nav 
        className={`toc-sheet ${isOpen ? 'open' : ''}`}
        role="dialog"
        aria-modal={typeof window !== 'undefined' && window.innerWidth < 1024}
        aria-label={toc.title}
      >
        <div className="toc-sheet-drag-handle" aria-hidden="true"></div>

        <div className="toc-sheet-header">
          <div className="toc-sheet-title-group">
            <h3 className="toc-sheet-title">{toc.title}</h3>
            <p className="toc-sheet-subtitle">{toc.subtitle}</p>
          </div>
          <button
            type="button"
            className="toc-sheet-close"
            onClick={() => setIsOpen(false)}
            title={toc.close}
            aria-label={toc.close}
          >
            <X size={18} strokeWidth={2.2} />
          </button>
        </div>

        <ul className="toc-sheet-list">
          {toc.items.map((item) => {
            const IconComponent = iconMap[item.icon] || Compass;
            const isActive = activeSection === item.id;

            return (
              <li key={item.id} className="toc-sheet-item">
                <button
                  type="button"
                  className={`toc-sheet-link ${isActive ? 'active' : ''}`}
                  onClick={() => scrollToSection(item.id)}
                >
                  <div className="toc-item-icon-box">
                    <IconComponent size={17} strokeWidth={2} />
                  </div>
                  <div className="toc-item-text">
                    <span className="toc-item-name">{item.label}</span>
                    <span className="toc-item-desc">{item.desc}</span>
                  </div>
                  <ChevronRight size={15} className="toc-item-arrow" />
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
