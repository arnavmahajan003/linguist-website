import { useLang } from '../i18n/i18n';

const BOOK_URL = `${import.meta.env.BASE_URL}book/linguist-a0-a1-exercise-book.pdf`;

export default function BookPromo() {
  const { t } = useLang();
  return (
    <section className="section book-section">
      <div className="container">
        <div className="book-card">
          <div className="book-cover" aria-hidden="true">
            <span className="book-cover-brand">ЛИНГВИСТ</span>
            <span className="book-cover-level">English A0–A1</span>
            <span className="book-cover-sub">{t('Английский с нуля')}</span>
            <span className="book-cover-badge">{t('100 страниц')}</span>
          </div>
          <div className="book-info">
            <h2 className="section-title">{t('Бесплатный учебник: Английский с нуля A0–A1')}</h2>
            <p className="section-lead">
              {t('Наш собственный учебник для тех, кто начинает с самого начала: 100 страниц понятных объяснений на русском, упражнений и письменной практики.')}
            </p>
            <ul className="book-features">
              <li>{t('Словарь с произношением в каждой теме')}</li>
              <li>{t('Упражнения и письменная практика в каждой теме')}</li>
              <li>{t('Ответы в конце книги — можно заниматься самостоятельно')}</li>
              <li>{t('Финальный тест A1 и сертификат')}</li>
            </ul>
            <div className="hero-actions">
              <a className="btn btn-primary btn-large" href={BOOK_URL} download="linguist-a0-a1-exercise-book.pdf">
                {t('Скачать учебник (PDF)')}
              </a>
              <a className="btn btn-ghost btn-large" href={BOOK_URL} target="_blank" rel="noreferrer">
                {t('Открыть онлайн')}
              </a>
            </div>
            <p className="book-note">{t('PDF, 100 страниц · бесплатно')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
