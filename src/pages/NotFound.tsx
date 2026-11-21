import { Link } from 'react-router-dom';
import PageTitle from '../components/PageTitle';

export default function NotFound() {
  return (
    <>
      <PageTitle title="Страница не найдена" />
      <section className="section">
        <div className="container form-wrap" style={{ textAlign: 'center' }}>
          <h1 className="section-title">404 — страница не найдена</h1>
          <p className="section-lead">Такой страницы нет. Вернитесь на главную или посмотрите наши курсы.</p>
          <p>
            <Link className="btn btn-primary btn-large" to="/">На главную</Link>{' '}
            <Link className="btn btn-ghost btn-large" to="/kursy">Курсы</Link>
          </p>
        </div>
      </section>
    </>
  );
}
