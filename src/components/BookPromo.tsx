import { useLang } from '../i18n/i18n';

type Book = {
  url: string;
  fileName: string;
  level: string;
  coverClass?: string;
  subKey: string;
  titleKey: string;
  leadKey: string;
  featureKeys: string[];
};

const BOOKS: Book[] = [
  {
    url: `${import.meta.env.BASE_URL}book/linguist-a0-a1-exercise-book.pdf`,
    fileName: 'linguist-a0-a1-exercise-book.pdf',
    level: 'English A0–A1',
    subKey: 'Английский с нуля',
    titleKey: 'Бесплатный учебник: Английский с нуля A0–A1',
    leadKey:
      'Наш собственный учебник для тех, кто начинает с самого начала: 100 страниц понятных объяснений на русском, упражнений и письменной практики.',
    featureKeys: [
      'Словарь с произношением в каждой теме',
      'Упражнения и письменная практика в каждой теме',
      'Ответы в конце книги — можно заниматься самостоятельно',
      'Финальный тест A1 и сертификат',
    ],
  },
  {
    url: `${import.meta.env.BASE_URL}book/linguist-chinese-a0-a1-book.pdf`,
    fileName: 'linguist-chinese-a0-a1-book.pdf',
    level: '中文 Chinese A0–A1',
    coverClass: 'book-cover-zh',
    subKey: 'Китайский с нуля',
    titleKey: 'Бесплатный учебник: Китайский с нуля A0–A1',
    leadKey:
      'Наш собственный учебник китайского для тех, кто начинает с самого начала: 100 страниц понятных объяснений на русском, иероглифов с пиньинь и практики письма иероглифов.',
    featureKeys: [
      'Иероглифы с пиньинь и тонами в каждой теме',
      'Словарь с произношением в каждой теме',
      'Упражнения и практика письма иероглифов',
      'Ответы в конце книги — можно заниматься самостоятельно',
      'Финальный тест уровня HSK 1',
    ],
  },
  {
    url: `${import.meta.env.BASE_URL}book/linguist-german-a0-a1-book.pdf`,
    fileName: 'linguist-german-a0-a1-book.pdf',
    level: 'Deutsch A0–A1',
    coverClass: 'book-cover-de',
    subKey: 'Немецкий с нуля',
    titleKey: 'Бесплатный учебник: Немецкий с нуля A0–A1',
    leadKey:
      'Наш собственный учебник немецкого для тех, кто начинает с самого начала: 100 страниц понятных объяснений на русском, упражнений и письменной практики.',
    featureKeys: [
      'Слова с артиклями der/die/das и произношением в каждой теме',
      'Упражнения и письменная практика в каждой теме',
      'Ответы в конце книги — можно заниматься самостоятельно',
      'Финальный тест A1',
    ],
  },
];

export default function BookPromo() {
  const { t } = useLang();
  return (
    <section className="section book-section">
      <div className="container">
        <div className="book-list">
          {BOOKS.map((book) => (
            <div className="book-card" key={book.fileName}>
              <div className={`book-cover${book.coverClass ? ` ${book.coverClass}` : ''}`} aria-hidden="true">
                <span className="book-cover-brand">ЛИНГВИСТ</span>
                <span className="book-cover-level">{book.level}</span>
                <span className="book-cover-sub">{t(book.subKey)}</span>
                <span className="book-cover-badge">{t('100 страниц')}</span>
              </div>
              <div className="book-info">
                <h2 className="section-title">{t(book.titleKey)}</h2>
                <p className="section-lead">{t(book.leadKey)}</p>
                <ul className="book-features">
                  {book.featureKeys.map((key) => (
                    <li key={key}>{t(key)}</li>
                  ))}
                </ul>
                <div className="hero-actions">
                  <a className="btn btn-primary btn-large" href={book.url} download={book.fileName}>
                    {t('Скачать учебник (PDF)')}
                  </a>
                  <a className="btn btn-ghost btn-large" href={book.url} target="_blank" rel="noreferrer">
                    {t('Открыть онлайн')}
                  </a>
                </div>
                <p className="book-note">{t('PDF, 100 страниц · бесплатно')}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
