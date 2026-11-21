import { Link } from 'react-router-dom';
import { CONTACTS } from '../data/content';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <p className="footer-brand">Языковой центр «Лингвист»</p>
          <p className="footer-text">
            Курсы английского, немецкого и русского языков в Твери для детей и взрослых. Работаем с 2011 года.
          </p>
          <p className="footer-text">
            <a href={CONTACTS.vk} target="_blank" rel="noreferrer">ВКонтакте</a>
            {' · '}
            <a href={CONTACTS.telegram} target="_blank" rel="noreferrer">Telegram</a>
          </p>
        </div>
        <nav aria-label="Навигация в подвале">
          <p className="footer-heading">Разделы</p>
          <ul className="footer-list">
            <li><Link to="/kursy">Курсы</Link></li>
            <li><Link to="/detyam">Детям</Link></li>
            <li><Link to="/vzroslym">Взрослым</Link></li>
            <li><Link to="/o-tsentre">О центре</Link></li>
            <li><Link to="/prepodavateli">Преподаватели</Link></li>
            <li><Link to="/kontakty">Контакты</Link></li>
          </ul>
        </nav>
        <div>
          <p className="footer-heading">Контакты</p>
          <ul className="footer-list">
            <li>{CONTACTS.addressFull}</li>
            <li><a href={CONTACTS.phoneHref}>{CONTACTS.phoneDisplay}</a></li>
            <li><a href={`mailto:${CONTACTS.email}`}>{CONTACTS.email}</a></li>
            <li>{CONTACTS.hours}</li>
          </ul>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>
          © {new Date().getFullYear()} {CONTACTS.legalName} · ИНН {CONTACTS.inn} · ОГРНИП {CONTACTS.ogrnip}
        </p>
        <p>
          <Link to="/konfidentsialnost">Политика конфиденциальности</Link>
          {' · '}
          <a
            href="https://www.course-linguist.ru/svedeniya-ob-obrazovatelnoj-organizatsii"
            target="_blank"
            rel="noreferrer"
          >
            Сведения об образовательной организации
          </a>
        </p>
      </div>
    </footer>
  );
}
