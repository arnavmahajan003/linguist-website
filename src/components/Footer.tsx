import { Link } from 'react-router-dom';
import { CONTACTS } from '../data/content';
import { useLang } from '../i18n/i18n';

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <p className="footer-brand">{t('Языковой центр «Лингвист»')}</p>
          <p className="footer-text">
            {t('Курсы английского, немецкого и русского языков в Твери для детей и взрослых. Работаем с 2011 года.')}
          </p>
          <p className="footer-text">
            <a href={CONTACTS.vk} target="_blank" rel="noreferrer">{t('ВКонтакте')}</a>
            {' · '}
            <a href={CONTACTS.telegram} target="_blank" rel="noreferrer">Telegram</a>
          </p>
        </div>
        <nav aria-label={t('Навигация в подвале')}>
          <p className="footer-heading">{t('Разделы')}</p>
          <ul className="footer-list">
            <li><Link to="/kursy">{t('Курсы')}</Link></li>
            <li><Link to="/detyam">{t('Детям')}</Link></li>
            <li><Link to="/vzroslym">{t('Взрослым')}</Link></li>
            <li><Link to="/o-tsentre">{t('О центре')}</Link></li>
            <li><Link to="/prepodavateli">{t('Преподаватели')}</Link></li>
            <li><Link to="/kontakty">{t('Контакты')}</Link></li>
          </ul>
        </nav>
        <div>
          <p className="footer-heading">{t('Контакты')}</p>
          <ul className="footer-list">
            <li>{t(CONTACTS.addressFull)}</li>
            <li><a href={CONTACTS.phoneHref}>{CONTACTS.phoneDisplay}</a></li>
            <li><a href={`mailto:${CONTACTS.email}`}>{CONTACTS.email}</a></li>
            <li>{t(CONTACTS.hours)}</li>
          </ul>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>
          © {new Date().getFullYear()} {CONTACTS.legalName} · {t('ИНН')} {CONTACTS.inn} · {t('ОГРНИП')} {CONTACTS.ogrnip}
        </p>
        <p>
          <Link to="/konfidentsialnost">{t('Политика конфиденциальности')}</Link>
          {' · '}
          <a
            href="https://www.course-linguist.ru/svedeniya-ob-obrazovatelnoj-organizatsii"
            target="_blank"
            rel="noreferrer"
          >
            {t('Сведения об образовательной организации')}
          </a>
        </p>
      </div>
    </footer>
  );
}
