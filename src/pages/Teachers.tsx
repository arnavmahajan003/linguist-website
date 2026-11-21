import PageTitle from '../components/PageTitle';
import { TEACHERS } from '../data/content';
import { useLang } from '../i18n/i18n';

export default function Teachers() {
  const { t } = useLang();
  return (
    <>
      <PageTitle title="Преподаватели" />
      <section className="page-head">
        <div className="container">
          <h1>{t('Преподаватели')}</h1>
          <p className="section-lead">
            {t('Преподавательский состав курсов — молодые, опытные специалисты, имеющие опыт работы за границей, а также носители языка. Занятия для детей ведут штатные преподаватели центра.')}
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid grid-2">
            {TEACHERS.map((teacher) => (
              <article className="card teacher" key={teacher.name}>
                <div className="teacher-avatar" aria-hidden="true">
                  {teacher.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}
                </div>
                <h3>{teacher.name}</h3>
                <p className="teacher-role">{t(teacher.role)}</p>
                <p>
                  <a href={teacher.phoneHref}>{teacher.phone}</a>
                  <br />
                  <a href={`mailto:${teacher.email}`}>{teacher.email}</a>
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
