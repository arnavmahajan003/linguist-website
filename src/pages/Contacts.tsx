import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import EnquiryForm from '../components/EnquiryForm';
import PageTitle from '../components/PageTitle';
import { CONTACTS } from '../data/content';
import { useLang } from '../i18n/i18n';

function CopyButton({ value, label }: { value: string; label: string }) {
  const { t } = useLang();
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable */
    }
  };
  return (
    <>
      <button type="button" className="copy-btn" onClick={copy} aria-label={`${t('Копировать')}: ${label}`}>
        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
          <rect x="9" y="9" width="11" height="11" rx="2" />
          <path d="M5 15V6a2 2 0 0 1 2-2h9" />
        </svg>
      </button>
      {copied && <span className="copied-note">{t('Скопировано')}</span>}
    </>
  );
}

export default function Contacts() {
  const { t } = useLang();
  const location = useLocation();
  useEffect(() => {
    if (location.hash === '#zayavka') {
      document.getElementById('zayavka')?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location.hash]);

  return (
    <>
      <PageTitle title="Контакты" />
      <section className="page-head">
        <div className="container">
          <h1>{t('Контакты')}</h1>
          <p className="section-lead">{t('Удобное расположение в центре Твери — приходите на бесплатное тестирование и пробный урок.')}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid grid-2">
            <div className="card">
              <h3>{t('Адрес и режим работы')}</h3>
              <ul className="contact-list">
                <li><strong>{t('Адрес')}:</strong> {t(CONTACTS.addressFull)}</li>
                <li><strong>{t('Телефон')}:</strong> <a href={CONTACTS.phoneHref}>{CONTACTS.phoneDisplay}</a><CopyButton value={CONTACTS.phoneDisplay} label={t('Телефон')} /></li>
                <li><strong>Email:</strong> <a href={`mailto:${CONTACTS.email}`}>{CONTACTS.email}</a><CopyButton value={CONTACTS.email} label="Email" /></li>
                <li><strong>{t('Режим работы')}:</strong> {t(CONTACTS.hours)}</li>
                <li><strong>{t('Занятия')}:</strong> {t('проводятся согласно расписанию')}</li>
              </ul>
              <p>
                <a
                  className="btn btn-ghost"
                  href="https://yandex.ru/maps/?text=%D0%A2%D0%B2%D0%B5%D1%80%D1%8C%2C%20%D0%BF%D1%80%D0%BE%D1%81%D0%BF%D0%B5%D0%BA%D1%82%20%D0%A7%D0%B0%D0%B9%D0%BA%D0%BE%D0%B2%D1%81%D0%BA%D0%BE%D0%B3%D0%BE%2C%2027%2F32"
                  target="_blank"
                  rel="noreferrer"
                >
                  {t('Открыть в Яндекс Картах')}
                </a>
              </p>
              <p>
                {t('Мы в соцсетях:')}{' '}
                <a href={CONTACTS.vk} target="_blank" rel="noreferrer">{t('ВКонтакте')}</a>
                {' · '}
                <a href={CONTACTS.telegram} target="_blank" rel="noreferrer">Telegram</a>
              </p>
            </div>
            <div className="card">
              <h3>{t('Для жителей области')}</h3>
              <p>
                {t('Для тех, кто проживает в близлежащих городах Тверской области, предусматриваются курсы выходного дня в любое удобное для вас время.')}
              </p>
              <h3>{t('Заявка онлайн')}</h3>
              <p>
                {t('Оставьте заявку в форме ниже — перезвоним в рабочее время, ответим на вопросы и запишем на бесплатное занятие.')}
              </p>
            </div>
          </div>
          <div className="card map-card">
            <iframe
              className="map-frame"
              title={t('Карта: проспект Чайковского, 27/32')}
              src="https://www.openstreetmap.org/export/embed.html?bbox=35.8946%2C56.8404%2C35.9066%2C56.8464&layer=mapnik&marker=56.8434240%2C35.9006378"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <section className="section section-tint" id="zayavka">
        <div className="container form-wrap">
          <h2 className="section-title">{t('Оставить заявку')}</h2>
          <EnquiryForm />
        </div>
      </section>
    </>
  );
}
