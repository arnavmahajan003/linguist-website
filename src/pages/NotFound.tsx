import { Link } from 'react-router-dom';
import PageTitle from '../components/PageTitle';
import { useLang } from '../i18n/i18n';

export default function NotFound() {
  const { t } = useLang();
  return (
    <>
      <PageTitle title="Страница не найдена" />
      <section className="section">
        <div className="container form-wrap" style={{ textAlign: 'center' }}>
          <h1 className="section-title">{t('404 — страница не найдена')}</h1>
          <p className="section-lead">{t('Такой страницы нет. Вернитесь на главную или посмотрите наши курсы.')}</p>
          <p>
            <Link className="btn btn-primary btn-large" to="/">{t('На главную')}</Link>{' '}
            <Link className="btn btn-ghost btn-large" to="/kursy">{t('Курсы')}</Link>
          </p>
        </div>
      </section>
    </>
  );
}
