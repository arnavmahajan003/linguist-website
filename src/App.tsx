import { useEffect, useRef, useState } from 'react';
import { BrowserRouter, Link, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Courses from './pages/Courses';
import Kids from './pages/Kids';
import Adults from './pages/Adults';
import About from './pages/About';
import Teachers from './pages/Teachers';
import Contacts from './pages/Contacts';
import Privacy from './pages/Privacy';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';
import { LanguageProvider, useLang } from './i18n/i18n';

function StickyCta() {
  const { pathname } = useLocation();
  const { t } = useLang();
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    const targets: Element[] = [];
    const formSection = document.getElementById('zayavka');
    if (formSection) targets.push(formSection);
    const footer = document.querySelector('footer');
    if (footer) targets.push(footer);
    if (targets.length === 0) return;
    const visible = new Set<Element>();
    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visible.add(entry.target);
        else visible.delete(entry.target);
      }
      setBlocked(visible.size > 0);
    });
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  if (pathname === '/kontakty' || pathname === '/admin' || blocked) return null;
  return (
    <Link className="sticky-cta" to="/kontakty#zayavka">{t('Бесплатное занятие')}</Link>
  );
}

function SkipLink() {
  const { t } = useLang();
  return (
    <a className="skip-link" href="#main">{t('Перейти к содержанию')}</a>
  );
}

function MotionManager() {
  const { pathname } = useLocation();

  // Scroll-reveal: cards fade/slide in once, on every browser.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!('IntersectionObserver' in window)) return;
    const els = Array.from(
      document.querySelectorAll<HTMLElement>('.card, .review, .form-wrap, .price-line'),
    );
    els.forEach((el) => el.classList.add('rv'));
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('rv-in');
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.1 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  // 3D tilt that follows the cursor on course and benefit cards (fine pointers only).
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let current: HTMLElement | null = null;
    const clear = () => {
      if (current) {
        current.style.transform = '';
        current = null;
      }
    };
    const onMove = (e: PointerEvent) => {
      const el = (e.target as HTMLElement).closest?.(
        '.card-link, .benefit-card',
      ) as HTMLElement | null;
      if (!el) {
        clear();
        return;
      }
      if (current && current !== el) clear();
      current = el;
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(900px) rotateX(${(-py * 6).toFixed(2)}deg) rotateY(${(px * 6).toFixed(2)}deg) translateY(-4px)`;
    };
    const onOut = (e: PointerEvent) => {
      if (current && !current.contains(e.relatedTarget as Node)) clear();
    };
    document.addEventListener('pointermove', onMove);
    document.addEventListener('pointerout', onOut);
    return () => {
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerout', onOut);
    };
  }, []);

  return null;
}

function PageChrome() {
  const { t } = useLang();
  const barRef = useRef<HTMLDivElement>(null);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      ticking = false;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const y = window.scrollY;
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`;
      }
      setShowTop(y > 600);
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <>
      <div className="scroll-progress" ref={barRef} aria-hidden="true" />
      <button
        type="button"
        className={`to-top${showTop ? ' visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label={t('Наверх')}
        tabIndex={showTop ? 0 : -1}
      >
        <span aria-hidden="true">↑</span>
      </button>
    </>
  );
}

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) window.scrollTo({ top: 0 });
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <LanguageProvider>
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '') || undefined}>
      <ScrollToTop />
      <MotionManager />
      <SkipLink />
      <Header />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/kursy" element={<Courses />} />
          <Route path="/detyam" element={<Kids />} />
          <Route path="/vzroslym" element={<Adults />} />
          <Route path="/o-tsentre" element={<About />} />
          <Route path="/prepodavateli" element={<Teachers />} />
          <Route path="/kontakty" element={<Contacts />} />
          <Route path="/konfidentsialnost" element={<Privacy />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <StickyCta />
      <PageChrome />
    </BrowserRouter>
    </LanguageProvider>
  );
}
