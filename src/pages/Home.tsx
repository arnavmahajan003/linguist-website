import { Link } from 'react-router-dom';
import EnquiryForm from '../components/EnquiryForm';
import PageTitle from '../components/PageTitle';
import { CONTACTS, REVIEWS } from '../data/content';

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
  return (
    <>
      <PageTitle title="Курсы иностранных языков в Твери" />
      <section className="hero">
        <div className="container hero-inner">
          <p className="hero-badge">Языковой центр в Твери · работаем с 2011 года</p>
          <h1>Иностранные языки — легко, в мини-группах и с результатом</h1>
          <p className="hero-lead">
            Английский, немецкий и русский языки для детей и взрослых. Подготовка к ОГЭ, ЕГЭ и экзаменам
            Cambridge, деловые курсы и образовательные поездки за рубеж.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-primary btn-large" to="/kontakty#zayavka">Записаться на бесплатное занятие</Link>
            <Link className="btn btn-ghost btn-large" to="/kursy">Смотреть курсы</Link>
          </div>
          <ul className="hero-points">
            <li>Мини-группы 3–5 человек</li>
            <li>Бесплатное тестирование уровня</li>
            <li>Два первых занятия — бесплатно</li>
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Почему именно «Лингвист»?</h2>
          <div className="grid grid-3">
            {ADVANTAGES.map((a) => (
              <article className="card" key={a.title}>
                <h3>{a.title}</h3>
                <p>{a.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-tint">
        <div className="container">
          <h2 className="section-title">Наши курсы</h2>
          <div className="grid grid-3">
            {COURSES.map((c) => (
              <Link className="card card-link" to={c.to} key={c.title}>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
                <span className="card-more">Подробнее →</span>
              </Link>
            ))}
          </div>
          <p className="price-line">
            Стоимость обучения — <strong>{CONTACTS.price}</strong> по одной программе. Точную стоимость
            подскажем после бесплатного тестирования.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Отзывы наших выпускников</h2>
          <div className="grid grid-2">
            {REVIEWS.map((r) => (
              <figure className="review" key={r.name}>
                <blockquote>«{r.text}»</blockquote>
                <figcaption>{r.name}, {r.age}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-tint" id="zayavka">
        <div className="container form-wrap">
          <h2 className="section-title">Запишитесь на бесплатное занятие</h2>
          <p className="section-lead">
            Оставьте заявку — мы перезвоним в рабочее время ({CONTACTS.hours.toLowerCase()}), подберём
            программу и пригласим на бесплатное тестирование и пробный урок.
          </p>
          <EnquiryForm />
        </div>
      </section>
    </>
  );
}
