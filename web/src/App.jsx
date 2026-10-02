import React, { useState, useEffect } from 'react';
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

export default function App() {
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
    try {
      localStorage.setItem('rk_lang', lang);
    } catch (e) {}
  }, [lang]);

  // Đồng bộ data-theme trên html root và lưu vào localStorage
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('rk_theme', theme);
    } catch (e) {}
  }, [theme]);

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
  }, [lang]);

  const t = content[lang] || content.en;

  return (
    <div className="app-wrapper">
      <div className="bg-grid" aria-hidden="true"></div>
      
      <Navbar 
        lang={lang} 
        setLang={setLang} 
        theme={theme} 
        setTheme={setTheme} 
        t={t} 
      />
      
      <main id="main-content" role="main">
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
      </main>

      <Footer t={t} />
    </div>
  );
}
