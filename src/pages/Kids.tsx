import EnquiryForm from '../components/EnquiryForm';
import PageTitle from '../components/PageTitle';
import { useLang } from '../i18n/i18n';

export default function Kids() {
  const { t } = useLang();
  return (
    <>
      <PageTitle title="Иностранные языки для детей" />
      <section className="page-head">
        <div className="container">
          <h1>{t('Языки для детей')}</h1>
          <p className="section-lead">
            {t('Занятия для детей с 6 лет и школьников 1–11 классов: раннее обучение, помощь со школьной программой и подготовка к экзаменам.')}
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid grid-2">
            <article className="card">
              <h3>{t('Игровые методики')}</h3>
              <p>
                {t('Для детей применяются игровые методы обучения и мультимедийные технологии, чтобы ребёнок занимался с интересом и не боялся говорить на языке.')}
              </p>
            </article>
            <article className="card">
              <h3>{t('Экзамены Cambridge')}</h3>
              <p>
                {t('Готовим детей к международным экзаменам Cambridge: YLE (Young Learners), KET, PET и FCE. Занятия ведут только штатные преподаватели центра.')}
              </p>
            </article>
            <article className="card">
              <h3>{t('Школьникам')}</h3>
              <p>
                {t('Помощь учащимся начальной школы и школьникам 1–11 классов: домашние задания, подготовка к ОГЭ и ЕГЭ по английскому, немецкому и русскому языкам.')}
              </p>
            </article>
            <article className="card">
              <h3>{t('Лето со скидкой')}</h3>
              <p>
                {t('«Лето ближе — скидка больше!»: обучающие курсы летом дешевле на 15%. А ещё мы проводим детские дни рождения на английском и немецком языках.')}
              </p>
            </article>
          </div>
          <div className="prose">
            <h2>{t('Как начать')}</h2>
            <p>
              {t('Приходите на бесплатное тестирование: мы определим уровень ребёнка, подберём группу по возрасту и уровню подготовки и пригласим на пробный урок. Группы формируются с учётом психологических и личностных особенностей учащихся.')}
            </p>
          </div>
        </div>
      </section>

      <section className="section section-tint" id="zayavka">
        <div className="container form-wrap">
          <h2 className="section-title">{t('Записать ребёнка на бесплатное занятие')}</h2>
          <EnquiryForm defaultCourse="Английский для детей" />
        </div>
      </section>
    </>
  );
}
