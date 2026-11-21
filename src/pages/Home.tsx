import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import EnquiryForm from '../components/EnquiryForm';
import PageTitle from '../components/PageTitle';
import { CONTACTS, REVIEWS } from '../data/content';
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

const ICONS = [
  <svg {...ICON_PROPS}><circle cx="12" cy="12" r="9" /><path d="M3 12h18" /><path d="M12 3c2.5 2.6 3.9 5.7 3.9 9s-1.4 6.4-3.9 9c-2.5-2.6-3.9-5.7-3.9-9S9.5 5.6 12 3z" /></svg>,
  <svg {...ICON_PROPS}><circle cx="9" cy="8" r="3.5" /><path d="M3.5 19c.6-3 2.8-4.5 5.5-4.5s4.9 1.5 5.5 4.5" /><circle cx="17" cy="9" r="2.6" /><path d="M15.5 14.6c2.3.2 4.3 1.6 5 4.4" /></svg>,
  <svg {...ICON_PROPS}><rect x="4" y="10" width="16" height="10" rx="2" /><path d="M12 10v10" /><path d="M4 14.5h16" /><path d="M12 10c-4.2 0-5.2-1.6-5.2-3.1 0-1.5 1.2-2.5 2.6-2.3C11 4.8 12 7 12 10zm0 0c4.2 0 5.2-1.6 5.2-3.1 0-1.5-1.2-2.5-2.6-2.3C13 4.8 12 7 12 10z" /></svg>,
  <svg {...ICON_PROPS}><rect x="5" y="3.5" width="14" height="17" rx="2" /><path d="M9 12.2l2.2 2.2 4.3-4.4" /></svg>,
  <svg {...ICON_PROPS}><path d="M2.5 9.5L12 5l9.5 4.5L12 14 2.5 9.5z" /><path d="M6.5 11.5V16c0 1.4 2.5 2.8 5.5 2.8s5.5-1.4 5.5-2.8v-4.5" /><path d="M21.5 9.5V15" /></svg>,
  <svg {...ICON_PROPS}><rect x="3.5" y="5" width="17" height="12" rx="2" /><circle cx="12" cy="11" r="2.6" /><path d="M10.8 13.2L10.3 17l1.7-1 1.7 1-.5-3.8" /></svg>,
];

const ADVANTAGES = [
  {
    title: 'Широкий выбор программ',
    text: 'Базовые, разговорные, интенсивные и бизнес-курсы по английскому и немецкому языкам, программы по русскому языку, подготовка к международным и государственным экзаменам.',
  },
  {
    title: 'Мини-группы и индивидуально',
    text: 'Обучение в мини-группах от 3 до 5 человек, индивидуальные занятия и корпоративное обучение — в удобное для вас время.',
  },
  {
    title: 'Бесплатный старт',
    text: 'Бесплатное тестирование для определения уровня, бесплатные открытые уроки, а по купону — два первых занятия по английскому или немецкому бесплатно.',
  },
  {
    title: 'Подготовка к экзаменам',
    text: 'Подготовка к ОГЭ и ЕГЭ, а также к международным экзаменам Cambridge: YLE, KET, PET и FCE для детей, Advanced — к кембриджским экзаменам для взрослых.',
  },
  {
    title: 'Опытные преподаватели',
    text: 'Молодые, опытные специалисты, имеющие опыт работы за границей, а также носители языка. Методики британских, американских и немецких издательств.',
  },
  {
    title: 'Сертификат по окончании',
    text: 'Все учащиеся, прошедшие соответствующий языковой курс, получают сертификат негосударственного образца об его окончании.',
  },
];

const COURSES = [
  {
    to: '/kursy',
    title: 'Английский язык',
    text: 'Шесть уровней — от Beginner до Advanced. Группы и индивидуальные занятия для детей и взрослых.',
  },
  {
    to: '/kursy',
    title: 'Немецкий язык',
    text: 'Три уровня подготовки — начальный, средний и продвинутый. Подготовка к ОГЭ и ЕГЭ.',
  },
  {
    to: '/kursy',
    title: 'Русский язык',
    text: 'Подготовка к ОГЭ и ЕГЭ, итоговое сочинение, развитие речи, помощь школьникам 1–11 классов.',
  },
  {
    to: '/detyam',
    title: 'Детям',
    text: 'Занятия с 6 лет в игровой форме, мультимедиа, экзамены Cambridge YLE, KET, PET и FCE.',
  },
  {
    to: '/vzroslym',
    title: 'Взрослым',
    text: 'Разговорный и деловой английский, корпоративное обучение, занятия с носителями языка.',
  },
  {
    to: '/vzroslym',
    title: 'Образовательные поездки',
    text: 'Обучающие курсы и поездки: английский в Турции (Анталия), ОАЭ (Дубай) и Китае с носителями языка.',
  },
];

export default function Home() {
  const { t } = useLang();

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const hero = document.querySelector<HTMLElement>('.hero');
    const visual = document.querySelector<HTMLElement>('.hero-visual');
    if (!hero || !visual) return;
    const onMove = (e: PointerEvent) => {
      const r = hero.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      visual.style.transform = `translate(${(x * 14).toFixed(1)}px, ${(y * 10).toFixed(1)}px)`;
    };
    const onLeave = () => {
      visual.style.transform = '';
    };
    hero.addEventListener('pointermove', onMove);
    hero.addEventListener('pointerleave', onLeave);
    return () => {
      hero.removeEventListener('pointermove', onMove);
      hero.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <>
      <PageTitle title="Курсы иностранных языков в Твери" />
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-inner">
          <p className="hero-badge">{t('Языковой центр в Твери · работаем с 2011 года')}</p>
          <h1>{t('Иностранные языки — легко, в мини-группах и с результатом')}</h1>
          <p className="hero-lead">
            {t('Английский, немецкий и русский языки для детей и взрослых. Подготовка к ОГЭ, ЕГЭ и экзаменам Cambridge, деловые курсы и образовательные поездки за рубеж.')}
          </p>
          <div className="hero-actions">
            <Link className="btn btn-primary btn-large" to="/kontakty#zayavka">{t('Записаться на бесплатное занятие')}</Link>
            <Link className="btn btn-ghost btn-large" to="/kursy">{t('Смотреть курсы')}</Link>
          </div>
          <ul className="hero-points">
            <li>{t('Мини-группы 3–5 человек')}</li>
            <li>{t('Бесплатное тестирование уровня')}</li>
            <li>{t('Два первых занятия — бесплатно')}</li>
          </ul>
          </div>
          <div className="hero-visual" aria-hidden="true">
            <span className="deco deco-circle-a" />
            <span className="deco deco-square-a" />
            <svg className="globe" viewBox="0 0 200 200">
              <defs>
                <clipPath id="globe-clip"><circle cx="100" cy="100" r="86" /></clipPath>
                <radialGradient id="globe-fill" cx="35%" cy="30%" r="85%">
                  <stop offset="0%" stopColor="#5f7cff" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#2a45d4" stopOpacity="0.1" />
                </radialGradient>
              </defs>
              <circle cx="100" cy="100" r="86" fill="url(#globe-fill)" />
              <g clipPath="url(#globe-clip)" className="globe-lines">
                <ellipse cx="100" cy="100" rx="86" ry="30" />
                <ellipse cx="100" cy="100" rx="86" ry="58" />
                <line x1="14" y1="100" x2="186" y2="100" />
                <ellipse cx="100" cy="100" rx="34" ry="86" className="globe-meridian m1" />
                <ellipse cx="100" cy="100" rx="34" ry="86" className="globe-meridian m2" />
                <ellipse cx="100" cy="100" rx="34" ry="86" className="globe-meridian m3" />
              </g>
              <circle cx="100" cy="100" r="86" className="globe-outline" />
              <circle cx="100" cy="100" r="97" className="globe-orbit" />
            </svg>
            <div className="bubble bubble-hello">Hello</div>
            <div className="bubble bubble-hallo">Hallo</div>
            <div className="bubble bubble-privet">Привет</div>
          </div>
        </div>
      </section>

      <section className="section section-overlap">
        <div className="container">
          <h2 className="section-title">{t('Почему именно «Лингвист»?')}</h2>
          <div className="grid grid-3 benefits-grid">
            {ADVANTAGES.map((a, i) => (
              <article className={`card benefit-card${i === 2 ? ' benefit-free' : ''}`} key={a.title}>
                <span className={`benefit-icon${i % 2 ? ' benefit-icon-sun' : ''}`} aria-hidden="true">{ICONS[i]}</span>
                <h3>{t(a.title)}</h3>
                <p>{t(a.text)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-tint">
        <div className="container">
          <h2 className="section-title">{t('Наши курсы')}</h2>
          <div className="grid grid-3 courses-grid">
            {COURSES.map((c) => (
              <Link className="card card-link" to={c.to} key={c.title}>
                <h3>{t(c.title)}</h3>
                <p>{t(c.text)}</p>
                <span className="card-more">{t('Подробнее →')}</span>
              </Link>
            ))}
          </div>
          <p className="price-line">
            {t('Стоимость обучения')} — <strong>{t(CONTACTS.price)}</strong> {t('по одной программе. Точную стоимость подскажем после бесплатного тестирования.')}
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">{t('Отзывы наших выпускников')}</h2>
          <div className="grid grid-2">
            {REVIEWS.map((r) => (
              <figure className="review" key={r.name}>
                <blockquote>«{t(r.text)}»</blockquote>
                <figcaption>{r.name}, {t(r.age)}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-tint" id="zayavka">
        <div className="container form-wrap">
          <h2 className="section-title">{t('Запишитесь на бесплатное занятие')}</h2>
          <p className="section-lead">
            {t('Оставьте заявку — мы перезвоним в рабочее время (')}{t(CONTACTS.hours.toLowerCase())}{t('), подберём программу и пригласим на бесплатное тестирование и пробный урок.')}
          </p>
          <EnquiryForm />
        </div>
      </section>
    </>
  );
}
