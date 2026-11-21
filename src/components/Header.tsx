import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { CONTACTS } from '../data/content';

const NAV = [
  { to: '/', label: 'Главная' },
  { to: '/kursy', label: 'Курсы' },
  { to: '/detyam', label: 'Детям' },
  { to: '/vzroslym', label: 'Взрослым' },
  { to: '/o-tsentre', label: 'О центре' },
  { to: '/prepodavateli', label: 'Преподаватели' },
  { to: '/kontakty', label: 'Контакты' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="header">
      <div className="container header-inner">
        <Link to="/" className="logo" aria-label="Языковой центр «Лингвист» — на главную">
          <span className="logo-mark" aria-hidden="true">Л</span>
          <span className="logo-text">
            <span className="logo-name">Лингвист</span>
            <span className="logo-sub">языковой центр · Тверь</span>
          </span>
        </Link>
        <button
          className="burger"
          aria-expanded={open}
          aria-controls="main-nav"
          aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
          onClick={() => setOpen((v) => !v)}
        >
          <span aria-hidden="true">{open ? '✕' : '☰'}</span>
        </button>
        <nav id="main-nav" className={`nav ${open ? 'nav-open' : ''}`} aria-label="Основная навигация">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="header-cta">
          <a className="header-phone" href={CONTACTS.phoneHref}>{CONTACTS.phoneDisplay}</a>
          <Link className="btn btn-primary btn-small" to="/kontakty#zayavka" onClick={() => setOpen(false)}>
            Бесплатное занятие
          </Link>
        </div>
      </div>
    </header>
  );
}
