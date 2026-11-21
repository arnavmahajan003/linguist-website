import { useEffect, useRef, useState } from 'react';
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
    text: 'Все учащиеся, прошедшие соответствующий языковой курс, получают сертификат негосударственного образца о его окончании.',
  },
];

const COURSES = [
  {
    to: '/kursy',
    title: 'Английский язык',
    text: 'Шесть уровней — от Beginner до Advanced. Группы и индивидуальные занятия для детей и взрослых.',
    tags: ['adults', 'exams'],
  },
  {
    to: '/kursy',
    title: 'Немецкий язык',
    text: 'Три уровня подготовки — начальный, средний и продвинутый. Подготовка к ОГЭ и ЕГЭ.',
    tags: ['adults', 'exams'],
  },
  {
    to: '/kursy',
    title: 'Русский язык',
    text: 'Подготовка к ОГЭ и ЕГЭ, итоговое сочинение, развитие речи, помощь школьникам 1–11 классов.',
    tags: ['kids', 'exams'],
  },
  {
    to: '/detyam',
    title: 'Детям',
    text: 'Занятия с 6 лет в игровой форме, мультимедиа, экзамены Cambridge YLE, KET, PET и FCE.',
    tags: ['kids'],
  },
  {
    to: '/vzroslym',
    title: 'Взрослым',
    text: 'Разговорный и деловой английский, корпоративное обучение, занятия с носителями языка.',
    tags: ['adults'],
  },
  {
    to: '/vzroslym',
    title: 'Образовательные поездки',
    text: 'Обучающие курсы и поездки: английский в Турции (Анталия), ОАЭ (Дубай) и Китае с носителями языка.',
    tags: ['kids', 'adults'],
  },
];

const COURSE_FILTERS = [
  { id: 'all', label: 'Все' },
  { id: 'kids', label: 'Детям' },
  { id: 'adults', label: 'Взрослым' },
  { id: 'exams', label: 'Экзамены' },
] as const;

const GREETINGS = {
  en: ['Hello', 'Hi', 'Hey'],
  de: ['Hallo', 'Guten Tag', 'Willkommen'],
  ru: ['Привет', 'Здравствуйте', 'Добрый день'],
};

type QuizSetId = 'en' | 'de' | 'ru';

const QUIZZES: Record<QuizSetId, { label: string; questions: { q: string; options: string[]; answer: number }[] }> = {
  en: {
    label: 'Английский язык',
    questions: [
      { q: 'She ___ to school every day.', options: ['go', 'goes', 'going'], answer: 1 },
      { q: 'I have lived in Tver ___ 2020.', options: ['for', 'since', 'at'], answer: 1 },
      { q: 'They ___ playing football now.', options: ['is', 'are', 'am'], answer: 1 },
      { q: 'He ___ a book yesterday.', options: ['reads', 'read', 'reading'], answer: 1 },
      { q: 'If it rains tomorrow, we ___ at home.', options: ['stays', 'will stay', 'stayed'], answer: 1 },
    ],
  },
  de: {
    label: 'Немецкий язык',
    questions: [
      { q: 'Ich ___ aus Tver.', options: ['kommst', 'komme', 'kommen'], answer: 1 },
      { q: 'Wir ___ Deutsch.', options: ['lernt', 'lernen', 'lerne'], answer: 1 },
      { q: 'Das ist ___ Buch.', options: ['meine', 'mein', 'meiner'], answer: 1 },
      { q: 'Er ___ einen Hund.', options: ['hast', 'hat', 'haben'], answer: 1 },
      { q: '___ alt bist du?', options: ['Was', 'Wer', 'Wie'], answer: 2 },
    ],
  },
  ru: {
    label: 'Русский язык',
    questions: [
      { q: 'Я ___ в Твери.', options: ['живёшь', 'живёт', 'живу'], answer: 2 },
      { q: 'Она ___ русский язык.', options: ['изучаю', 'изучает', 'изучаем'], answer: 1 },
      { q: 'Мы ___ в школу.', options: ['идёт', 'иду', 'идём'], answer: 2 },
      { q: 'Это моя ___ .', options: ['книгу', 'книга', 'книги'], answer: 1 },
      { q: 'Дети ___ в парке.', options: ['играет', 'играю', 'играют'], answer: 2 },
    ],
  },
};

function Stat({ value, prefix, label, count }: { value: number; prefix?: string; label: string; count?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const render = (v: number) => {
      el.textContent = `${prefix ?? ''}${v}`;
    };
    if (!count || window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      render(value);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const duration = 900;
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          render(Math.round(value * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value, prefix, count]);
  return (
    <div className="stat">
      <span className="stat-num" ref={ref}>{prefix}{value}</span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

function LevelQuiz() {
  const { t, lang } = useLang();
  const defaultSet: QuizSetId = lang === 'en' ? 'ru' : lang === 'de' ? 'de' : 'en';
  const [setId, setSetId] = useState<QuizSetId>(defaultSet);
  const [step, setStep] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const questions = QUIZZES[setId].questions;
  const done = step >= questions.length;

  useEffect(() => {
    setSetId(defaultSet);
  }, [defaultSet]);

  useEffect(() => {
    setStep(0);
    setScore(0);
    setPicked(null);
  }, [setId]);

  const pick = (i: number) => {
    if (picked !== null || done) return;
    setPicked(i);
    if (i === questions[step].answer) setScore((s) => s + 1);
    window.setTimeout(() => {
      setStep((s) => s + 1);
      setPicked(null);
    }, 1100);
  };

  const reset = () => {
    setStep(0);
    setScore(0);
    setPicked(null);
  };

  return (
    <>
      <div className="chips quiz-tabs" role="group">
        {(Object.keys(QUIZZES) as QuizSetId[]).map((id) => (
          <button
            key={id}
            type="button"
            className={`chip${setId === id ? ' chip-active' : ''}`}
            onClick={() => setSetId(id)}
            aria-pressed={setId === id}
          >
            {t(QUIZZES[id].label)}
          </button>
        ))}
      </div>
      <div className="quiz-card">
        <div className="quiz-dots" aria-hidden="true">
          {questions.map((_, i) => (
            <span key={i} className={`quiz-dot${i < step ? ' done' : ''}`} />
          ))}
        </div>
        {done ? (
          <div className="quiz-result">
            <p className="quiz-score">{t('Ваш результат:')} {score} / {questions.length}</p>
            <p className="section-lead quiz-note">{t('Точный уровень мы определим на бесплатном тестировании.')}</p>
            <div className="hero-actions quiz-actions">
              <Link className="btn btn-primary" to="/kontakty#zayavka">{t('Записаться на бесплатное занятие')}</Link>
              <button type="button" className="btn btn-ghost" onClick={reset}>{t('Пройти ещё раз')}</button>
            </div>
          </div>
        ) : (
          <>
            <p className="quiz-q">{questions[step].q}</p>
            <div className="quiz-opts">
              {questions[step].options.map((opt, i) => {
                const cls = picked === null
                  ? ''
                  : i === questions[step].answer
                    ? ' correct'
                    : i === picked
                      ? ' wrong'
                      : ' dim';
                return (
                  <button
                    key={opt}
                    type="button"
                    className={`quiz-opt${cls}`}
                    onClick={() => pick(i)}
                    disabled={picked !== null}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
}

type OpenState = 'open' | 'lunch' | 'closed';

function currentOpenState(): OpenState {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Moscow',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(new Date());
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '';
  const workday = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].includes(get('weekday'));
  const mins = parseInt(get('hour'), 10) * 60 + parseInt(get('minute'), 10);
  if (!workday) return 'closed';
  if (mins >= 780 && mins < 840) return 'lunch';
  if (mins >= 600 && mins < 1140) return 'open';
  return 'closed';
}

const FLIP_WORDS = [
  { front: 'Hello', back: 'Привет', lang: 'English' },
  { front: 'Hallo', back: 'Привет', lang: 'Deutsch' },
  { front: 'Thank you', back: 'Спасибо', lang: 'English' },
  { front: 'Guten Morgen', back: 'Доброе утро', lang: 'Deutsch' },
];

function FlipCard({ front, back, lang }: { front: string; back: string; lang: string }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <button
      type="button"
      className={`flip-card${flipped ? ' flipped' : ''}`}
      onClick={() => setFlipped((v) => !v)}
      aria-pressed={flipped}
    >
      <span className="flip-inner">
        <span className="flip-face flip-front">
          <span className="flip-word">{front}</span>
          <span className="flip-lang">{lang}</span>
        </span>
        <span className="flip-face flip-back">
          <span className="flip-word">{back}</span>
          <span className="flip-lang">{lang}</span>
        </span>
      </span>
    </button>
  );
}

export default function Home() {
  const { t } = useLang();
  const [greet, setGreet] = useState({ en: 0, de: 0, ru: 0 });
  const [filter, setFilter] = useState<string>('all');
  const visibleCourses = filter === 'all' ? COURSES : COURSES.filter((c) => c.tags.includes(filter));
  const cycleGreeting = (key: 'en' | 'de' | 'ru') =>
    setGreet((g) => ({ ...g, [key]: (g[key] + 1) % GREETINGS[key].length }));
  const [openState, setOpenState] = useState<OpenState>(() => currentOpenState());
  useEffect(() => {
    const id = window.setInterval(() => setOpenState(currentOpenState()), 60000);
    return () => window.clearInterval(id);
  }, []);
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollReviews = (dir: number) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: dir * Math.min(track.clientWidth * 0.85, 420), behavior: 'smooth' });
  };

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
          <p className="open-status">
            <span className={`status-dot ${openState}`} aria-hidden="true" />
            {openState === 'open' ? t('Сейчас открыто') : openState === 'lunch' ? t('Обеденный перерыв') : t('Сейчас закрыто')}
          </p>
          <ul className="hero-points">
            <li>{t('Мини-группы 3–5 человек')}</li>
            <li>{t('Бесплатное тестирование уровня')}</li>
            <li>{t('Два первых занятия — бесплатно')}</li>
          </ul>
          </div>
          <div className="hero-visual" aria-hidden="true">
            <span className="deco deco-circle-a" />
            <span className="deco deco-square-a" />
            <div className="bubble bubble-hello" onClick={() => cycleGreeting('en')}>
              <span className="bubble-word" key={greet.en}>{GREETINGS.en[greet.en]}</span>
            </div>
            <div className="bubble bubble-hallo" onClick={() => cycleGreeting('de')}>
              <span className="bubble-word" key={greet.de}>{GREETINGS.de[greet.de]}</span>
            </div>
            <div className="bubble bubble-privet" onClick={() => cycleGreeting('ru')}>
              <span className="bubble-word" key={greet.ru}>{GREETINGS.ru[greet.ru]}</span>
            </div>
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

      <section className="section section-tint stats-band">
        <div className="container stats-grid">
          <Stat value={2011} label={t('год основания центра')} />
          <Stat value={6} count label={t('уровней английского языка')} />
          <Stat value={5} count prefix="3–" label={t('человека в мини-группе')} />
          <Stat value={2} count label={t('первых занятия — бесплатно')} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">{t('Переверни карточку')}</h2>
          <p className="section-lead flip-hint">{t('Нажмите на карточку, чтобы увидеть перевод')}</p>
          <div className="flip-grid">
            {FLIP_WORDS.map((w) => (
              <FlipCard key={w.front} front={w.front} back={w.back} lang={w.lang} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section-tint">
        <div className="container">
          <h2 className="section-title">{t('Наши курсы')}</h2>
          <div className="chips" role="group">
            {COURSE_FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                className={`chip${filter === f.id ? ' chip-active' : ''}`}
                onClick={() => setFilter(f.id)}
                aria-pressed={filter === f.id}
              >
                {t(f.label)}
              </button>
            ))}
          </div>
          <div className="grid grid-3 courses-grid">
            {visibleCourses.map((c) => (
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
          <h2 className="section-title">{t('Мини-тест: проверьте свой уровень')}</h2>
          <LevelQuiz />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">{t('Отзывы наших выпускников')}</h2>
          <div className="reviews-track" ref={trackRef}>
            {REVIEWS.map((r) => (
              <figure className="review" key={r.name}>
                <blockquote>«{t(r.text)}»</blockquote>
                <figcaption>{r.name}, {t(r.age)}</figcaption>
              </figure>
            ))}
          </div>
          <div className="reviews-nav">
            <button type="button" className="reviews-btn" onClick={() => scrollReviews(-1)} aria-label={t('Предыдущие отзывы')}>
              <span aria-hidden="true">←</span>
            </button>
            <button type="button" className="reviews-btn" onClick={() => scrollReviews(1)} aria-label={t('Следующие отзывы')}>
              <span aria-hidden="true">→</span>
            </button>
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
