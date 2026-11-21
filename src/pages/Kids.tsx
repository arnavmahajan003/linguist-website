import EnquiryForm from '../components/EnquiryForm';
import PageTitle from '../components/PageTitle';

export default function Kids() {
  return (
    <>
      <PageTitle title="Иностранные языки для детей" />
      <section className="page-head">
        <div className="container">
          <h1>Языки для детей</h1>
          <p className="section-lead">
            Занятия для детей с 6 лет и школьников 1–11 классов: раннее обучение, помощь со школьной
            программой и подготовка к экзаменам.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid grid-2">
            <article className="card">
              <h3>Игровые методики</h3>
              <p>
                Для детей применяются игровые методы обучения и мультимедийные технологии, чтобы ребёнок
                занимался с интересом и не боялся говорить на языке.
              </p>
            </article>
            <article className="card">
              <h3>Экзамены Cambridge</h3>
              <p>
                Готовим детей к международным экзаменам Cambridge: YLE (Young Learners), KET, PET и FCE.
                Занятия ведут только штатные преподаватели центра.
              </p>
            </article>
            <article className="card">
              <h3>Школьникам</h3>
              <p>
                Помощь учащимся начальной школы и школьникам 1–11 классов: домашние задания, подготовка
                к ОГЭ и ЕГЭ по английскому, немецкому и русскому языкам.
              </p>
            </article>
            <article className="card">
              <h3>Лето со скидкой</h3>
              <p>
                «Лето ближе — скидка больше!»: обучающие курсы летом дешевле на 15%. А ещё мы проводим
                детские дни рождения на английском и немецком языках.
              </p>
            </article>
          </div>
          <div className="prose">
            <h2>Как начать</h2>
            <p>
              Приходите на бесплатное тестирование: мы определим уровень ребёнка, подберём группу
              по возрасту и уровню подготовки и пригласим на пробный урок. Группы формируются с учётом
              психологических и личностных особенностей учащихся.
            </p>
          </div>
        </div>
      </section>

      <section className="section section-tint" id="zayavka">
        <div className="container form-wrap">
          <h2 className="section-title">Записать ребёнка на бесплатное занятие</h2>
          <EnquiryForm defaultCourse="Английский для детей" />
        </div>
      </section>
    </>
  );
}
