import React, { useState, useEffect, useLayoutEffect } from 'react';
import { content } from './data/content';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LifecycleSection from './components/LifecycleSection';
import Pillars from './components/Pillars';
import ContextSection from './components/ContextSection';
import ComparisonSection from './components/ComparisonSection';
import MultiPaperSection from './components/MultiPaperSection';
import InstallSection from './components/InstallSection';
import FAQSection from './components/FAQSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import RoadmapPage from './components/RoadmapPage';
import DocsPage from './components/DocsPage';

export default function App() {
  const path = window.location.pathname.replace(/\/+$/, '');
  const currentPage = path === '/roadmap'
    ? 'roadmap'
    : path === '/docs'
    ? 'docs'
    : 'home';

  // Mặc định là Tiếng Việt ('vi'), lưu vào localStorage để ghi nhớ lựa chọn của người dùng
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem('rk_lang') || 'vi';
    } catch {
      return 'vi';
    }
  });

  // Mặc định Light mode (hoặc theme đã lưu), lưu vào localStorage
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('rk_theme') || 'light';
    } catch {
      return 'light';
    }
  });

  // Đồng bộ thuộc tính lang và lưu vào localStorage
  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = currentPage === 'roadmap'
      ? `${content[lang]?.nav.roadmap || 'Roadmap'} | Research Kit`
      : currentPage === 'docs'
      ? `${content[lang]?.nav.docs || 'Documentation'} | Research Kit`
      : 'Research Kit — Lean Research Skills for AI Agents';
    try {
      localStorage.setItem('rk_lang', lang);
    } catch {}
  }, [lang, currentPage]);

  // Đồng bộ data-theme trên html root và lưu vào localStorage
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('rk_theme', theme);
    } catch {}
  }, [theme]);

  // Trên trang con, browser tải /#section trước khi React render section đích.
  // Cuộn lại sau khi DOM của trang chủ đã sẵn sàng để deep link luôn tới đúng vị trí.
  useLayoutEffect(() => {
    if (currentPage !== 'home' || !window.location.hash) return;

    const target = document.getElementById(window.location.hash.slice(1));
    target?.scrollIntoView({ block: 'start' });
  }, [currentPage]);

  // Scroll Reveal IntersectionObserver
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      document.querySelectorAll('.fade-in, .fade-in-scale').forEach((el) => {
        el.classList.add('is-visible');
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            entry.target.setAttribute('data-visible', 'true');
            obs.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.08,
      }
    );

    const elements = document.querySelectorAll('.fade-in, .fade-in-scale');
    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, [lang, currentPage]);

  const t = content[lang] || content.en;

  return (
    <div className={`app-wrapper ${currentPage === 'roadmap' ? 'roadmap-view' : currentPage === 'docs' ? 'docs-view' : ''}`}>
      <div className="bg-grid" aria-hidden="true"></div>
      
      <Navbar 
        lang={lang} 
        setLang={setLang} 
        theme={theme} 
        setTheme={setTheme} 
        t={t} 
        currentPage={currentPage}
      />
      
      <main id="main-content" role="main">
        {currentPage === 'roadmap' ? (
          <RoadmapPage t={t} />
        ) : currentPage === 'docs' ? (
          <DocsPage t={t} lang={lang} />
        ) : (
          <>
            {/* =================================================================
                1. GIỚI THIỆU (Overview & Architecture)
                - Hero: Định danh sản phẩm, 1-click install, quick stats
                - Lifecycle: Vòng đời nghiên cứu 6 bước cốt lõi + 4 module mở rộng
               ================================================================= */}
            <section id="intro">
              <Hero t={t} />
              <LifecycleSection t={t} lang={lang} />
            </section>

            {/* =================================================================
                2. ƯU ĐIỂM (Lean Mindset & Core Research Focus)
                - Pillars: 4 trụ cột tư duy tinh gọn & giá trị cốt lõi
                - Context: Hiệu năng tiết kiệm >13.000 token, chống FOMO số lượng
                - Comparison: Bảng đối đầu trực diện: Tinh gọn vs. Cồng kềnh
                - Multi-paper: Phân vùng Active Paper chống ô nhiễm chéo dữ liệu
               ================================================================= */}
            <section id="advantages">
              <Pillars t={t} />
              <ContextSection t={t} lang={lang} />
              <ComparisonSection t={t} />
              <MultiPaperSection t={t} lang={lang} />
            </section>

            {/* =================================================================
                3. CÀI ĐẶT (Installation Hub)
                - Cách A: Tải ZIP & Agent tự cài đặt (Zero Terminal)
                - Cách B: CLI commands (npx skills add, gh skill install, manual)
                - Test suite verification
               ================================================================= */}
            <InstallSection t={t} />

            {/* =================================================================
                4. FAQ (Hỏi đáp & Thắc mắc thường gặp)
                - Accordion giải đáp rào cản nhận thức
               ================================================================= */}
            <FAQSection t={t} />

            {/* CTA & Conversion Booster */}
            <CTASection t={t} />
          </>
        )}
      </main>

      <Footer t={t} />
    </div>
  );
}
