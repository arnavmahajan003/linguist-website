import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { CONTACTS } from '../data/content';
import { LANGS, useLang, type Lang } from '../i18n/i18n';

const NAV = [
  { to: '/', label: 'Главная' },
  { to: '/kursy', label: 'Курсы' },
  { to: '/detyam', label: 'Детям' },
  { to: '/vzroslym', label: 'Взрослым' },
  { to: '/o-tsentre', label: 'О центре' },
  { to: '/prepodavateli', label: 'Преподаватели' },
  { to: '/kontakty', label: 'Контакты' },
];

type Theme = 'dark' | 'light';

function initialTheme(): Theme {
  if (typeof document !== 'undefined' && document.documentElement.dataset.theme === 'light') {
    return 'light';
  }
  return 'dark';
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>(initialTheme);
  const { lang, setLang, t } = useLang();

  const toggleTheme = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem('linguist-theme', next);
    } catch {
      /* storage unavailable */
    }
    setTheme(next);
  };

  return (
    <header className="header">
      <div className="container header-inner">
        <Link to="/" className="logo" aria-label={t('Языковой центр «Лингвист» — на главную')}>
          <span className="logo-mark" aria-hidden="true">Л</span>
          <span className="logo-text">
            <span className="logo-name">Лингвист</span>
            <span className="logo-sub">{t('языковой центр · Тверь')}</span>
          </span>
        </Link>
        <div className="header-actions">
          <select
            className="lang-select"
            aria-label={t('Язык сайта')}
            value={lang}
            onChange={(e) => setLang(e.target.value as Lang)}
          >
            {LANGS.map((l) => (
              <option key={l.code} value={l.code}>{l.label}</option>
            ))}
          </select>
          <button
            type="button"
            className="theme-btn"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? t('Светлая тема') : t('Тёмная тема')}
          >
            <span aria-hidden="true">{theme === 'dark' ? '☀' : '☾'}</span>
          </button>
          <button
            className="burger"
            aria-expanded={open}
            aria-controls="main-nav"
            aria-label={open ? t('Закрыть меню') : t('Открыть меню')}
            onClick={() => setOpen((v) => !v)}
          >
            <span aria-hidden="true">{open ? '✕' : '☰'}</span>
          </button>
        </div>
        <nav id="main-nav" className={`nav ${open ? 'nav-open' : ''}`} aria-label={t('Основная навигация')}>
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}
              onClick={() => setOpen(false)}
            >
              {t(item.label)}
            </NavLink>
          ))}
          <div className="menu-controls">
            <a className="menu-phone" href={CONTACTS.phoneHref}>{CONTACTS.phoneDisplay}</a>
            <Link className="btn btn-primary" to="/kontakty#zayavka" onClick={() => setOpen(false)}>
              {t('Бесплатное занятие')}
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
