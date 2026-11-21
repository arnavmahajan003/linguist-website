import PageTitle from '../components/PageTitle';
import { CONTACTS } from '../data/content';
import { useLang } from '../i18n/i18n';

const ICON_PROPS = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
} as const;

const ICON_BOOK = (
  <svg {...ICON_PROPS}><path d="M12 6c-1.8-1.5-4-2-7-2v14c3 0 5.2.5 7 2 1.8-1.5 4-2 7-2V4c-3 0-5.2.5-7 2z" /><path d="M12 6v14" /></svg>
);
const ICON_CLOCK = (
  <svg {...ICON_PROPS}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" /></svg>
);
const ICON_CHECK = (
  <svg {...ICON_PROPS}><rect x="5" y="3.5" width="14" height="17" rx="2" /><path d="M9 12.2l2.2 2.2 4.3-4.4" /></svg>
);
const ICON_GLOBE = (
  <svg {...ICON_PROPS}><circle cx="12" cy="12" r="9" /><path d="M3 12h18" /><path d="M12 3c2.5 2.6 3.9 5.7 3.9 9s-1.4 6.4-3.9 9c-2.5-2.6-3.9-5.7-3.9-9S9.5 5.6 12 3z" /></svg>
);
const ICON_STAR = (
  <svg {...ICON_PROPS}><path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L3.5 9.7l5.9-.9z" /></svg>
);
const ICON_GIFT = (
  <svg {...ICON_PROPS}><rect x="4" y="10" width="16" height="10" rx="2" /><path d="M12 10v10" /><path d="M4 14.5h16" /><path d="M12 10c-4.2 0-5.2-1.6-5.2-3.1 0-1.5 1.2-2.5 2.6-2.3C11 4.8 12 7 12 10zm0 0c4.2 0 5.2-1.6 5.2-3.1 0-1.5-1.2-2.5-2.6-2.3C13 4.8 12 7 12 10z" /></svg>
);
const ICON_IMAGE = (
  <svg {...ICON_PROPS}><rect x="3.5" y="5" width="17" height="14" rx="2" /><circle cx="9" cy="10" r="1.6" /><path d="M4 17l5-4 3.5 3L16 13l4 3.5" /></svg>
);

const MORE = [
  { icon: ICON_GLOBE, text: 'Образовательные поездки и летние обучающие курсы в Турции (Анталия), ОАЭ (Дубай) и Китае' },
  { icon: ICON_STAR, text: 'Благотворительные театрализованные представления на иностранных языках' },
  { icon: ICON_GIFT, text: 'Детские дни рождения на английском и немецком языках' },
  { icon: ICON_IMAGE, text: 'Фотогалерея поездок и мероприятий — на действующем сайте центра' },
];

export default function About() {
  const { t } = useLang();
  return (
    <>
      <PageTitle title="О языковом центре «Лингвист»" />
      <section className="page-head">
        <div className="container">
          <h1>{t('О центре')}</h1>
          <p className="section-lead lead-accent">
            {t('Языковой центр «Лингвист» — курсы иностранных языков в Твери. Центр создан в 2011 году и предлагает обучение английскому, немецкому и русскому языкам детям и взрослым.')}
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">{t('Как мы учим')}</h2>
          <div className="grid grid-3">
            <article className="card">
              <span className="benefit-icon" aria-hidden="true">{ICON_BOOK}</span>
              <p>
                {t('В процессе обучения применяются методики британских, американских и немецких издательств. Наша методика быстрого усвоения иностранных языков опирается на методы поддержки памяти, логику и прямое ассоциирование, а также на восприятие речи на слух вместо заучивания сотен грамматических правил.')}
              </p>
            </article>
            <article className="card">
              <span className="benefit-icon benefit-icon-sun" aria-hidden="true">{ICON_CLOCK}</span>
              <p>
                {t('Группы формируются с учётом психологических и личностных особенностей учащихся. Группы занимаются по расписанию, продолжительность одного занятия —')}{' '}
                <strong>{t('60 минут')}</strong>
                {t('. Приём на обучение — по результатам')}{' '}
                <strong>{t('бесплатного тестирования')}</strong>
                {t('.')}
              </p>
            </article>
            <article className="card">
              <span className="benefit-icon" aria-hidden="true">{ICON_CHECK}</span>
              <p>
                {t('Учащимся бесплатно предоставляется тестирование или пробный урок для выявления уровня подготовки. Все учащиеся, которые пройдут соответствующий языковой курс, получат сертификат негосударственного образца об его окончании.')}
              </p>
            </article>
          </div>

          <h2 className="section-title" style={{ marginTop: '48px' }}>{t('Что ещё делает центр')}</h2>
          <div className="grid grid-2">
            {MORE.map((item, i) => (
              <article className="card" key={item.text}>
                <span className={`benefit-icon${i % 2 ? ' benefit-icon-sun' : ''}`} aria-hidden="true">{item.icon}</span>
                <p>{t(item.text)}</p>
              </article>
            ))}
          </div>

          <h2 className="section-title" style={{ marginTop: '48px' }}>{t('Сведения об образовательной организации')}</h2>
          <div className="card info-card">
            <div className="info-row">
              <span className="info-label">{t('Полное наименование')}</span>
              <span className="info-value">{CONTACTS.legalName}</span>
            </div>
            <div className="info-row">
              <span className="info-label">{t('Дата создания')}</span>
              <span className="info-value">{t(CONTACTS.founded)}</span>
            </div>
            <div className="info-row">
              <span className="info-label">{t('ИНН')} · {t('ОГРНИП')}</span>
              <span className="info-value">{CONTACTS.inn}, {CONTACTS.ogrnip}</span>
            </div>
            <div className="info-row">
              <span className="info-label">{t('Адрес')}</span>
              <span className="info-value">{t(CONTACTS.addressFull)}</span>
            </div>
            <div className="info-row">
              <span className="info-label">{t('Режим работы')}</span>
              <span className="info-value">{t(CONTACTS.hours)}; {t('занятия проводятся согласно расписанию')}</span>
            </div>
            <div className="info-row">
              <span className="info-value">{t('Филиалов и представительств нет')}</span>
            </div>
          </div>
          <p style={{ marginTop: '20px' }}>
            {t('Полный раздел со сведениями об образовательной организации, документами и лицензией — на официальном сайте:')}{' '}
            <a
              href="https://www.course-linguist.ru/svedeniya-ob-obrazovatelnoj-organizatsii"
              target="_blank"
              rel="noreferrer"
            >
              course-linguist.ru/svedeniya
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
