import PageTitle from '../components/PageTitle';
import { TEACHERS } from '../data/content';

export default function Teachers() {
  return (
    <>
      <PageTitle title="Преподаватели" />
      <section className="page-head">
        <div className="container">
          <h1>Преподаватели</h1>
          <p className="section-lead">
            Преподавательский состав курсов — молодые, опытные специалисты, имеющие опыт работы
            за границей, а также носители языка. Занятия для детей ведут штатные преподаватели центра.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid grid-2">
            {TEACHERS.map((t) => (
              <article className="card teacher" key={t.name}>
                <div className="teacher-avatar" aria-hidden="true">
                  {t.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}
                </div>
                <h3>{t.name}</h3>
                <p className="teacher-role">{t.role}</p>
                <p>
                  <a href={t.phoneHref}>{t.phone}</a>
                  <br />
                  <a href={`mailto:${t.email}`}>{t.email}</a>
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
