import { useCallback, useEffect, useState, type FormEvent } from 'react';
import PageTitle from '../components/PageTitle';
import { isSupabaseConfigured, supabase, type Enquiry } from '../lib/supabase';
import { LOCALES, useLang } from '../i18n/i18n';

type Row = Enquiry & { id: string; created_at: string; status: string };

export default function Admin() {
  const { t, lang } = useLang();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [rows, setRows] = useState<Row[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const loadRows = useCallback(async () => {
    if (!supabase) return;
    const { data, error: err } = await supabase
      .from('enquiries')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(200);
    if (err) {
      setError(t('Не удалось загрузить заявки: ') + err.message);
      return;
    }
    setRows((data ?? []) as Row[]);
  }, []);

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        setLoggedIn(true);
        void loadRows();
      }
    });
  }, [loadRows]);

  async function onLogin(e: FormEvent) {
    e.preventDefault();
    if (!supabase) return;
    setLoading(true);
    setError('');
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (err) {
      setError(t('Неверный email или пароль.'));
      return;
    }
    setLoggedIn(true);
    void loadRows();
  }

  async function onLogout() {
    await supabase?.auth.signOut();
    setLoggedIn(false);
    setRows([]);
  }

  async function toggleStatus(row: Row) {
    if (!supabase) return;
    const next = row.status === 'new' ? 'done' : 'new';
    const { error: err } = await supabase.from('enquiries').update({ status: next }).eq('id', row.id);
    if (!err) {
      setRows((prev) => prev.map((r) => (r.id === row.id ? { ...r, status: next } : r)));
    }
  }

  if (!isSupabaseConfigured) {
    return (
      <>
        <PageTitle title="Вход для администратора" />
        <section className="section">
          <div className="container form-wrap">
            <h1 className="section-title">{t('Заявки с сайта')}</h1>
            <p className="form-error" role="alert">
              {t('База данных ещё не подключена. После настройки Supabase здесь появится вход для администратора и список заявок.')}
            </p>
          </div>
        </section>
      </>
    );
  }

  if (!loggedIn) {
    return (
      <>
        <PageTitle title="Вход для администратора" />
        <section className="section">
          <div className="container form-wrap">
            <h1 className="section-title">{t('Вход для администратора')}</h1>
            <form className="form" onSubmit={onLogin}>
              <label className="field">
                <span>Email</span>
                <input type="email" autoComplete="username" required value={email} onChange={(e) => setEmail(e.target.value)} />
              </label>
              <label className="field">
                <span>{t('Пароль')}</span>
                <input type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} />
              </label>
              {error && <p className="form-error" role="alert">{error}</p>}
              <button type="submit" className="btn btn-primary btn-large" disabled={loading}>
                {loading ? t('Входим…') : t('Войти')}
              </button>
            </form>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageTitle title="Заявки с сайта" />
      <section className="section">
        <div className="container">
          <div className="admin-head">
            <h1 className="section-title">{t('Заявки с сайта')} ({rows.length})</h1>
            <button className="btn btn-ghost" onClick={onLogout}>{t('Выйти')}</button>
          </div>
          {error && <p className="form-error" role="alert">{error}</p>}
          {rows.length === 0 ? (
            <p>{t('Заявок пока нет.')}</p>
          ) : (
            <div className="table-wrap">
              <table className="table">
                <thead>
                  <tr>
                    <th>{t('Дата')}</th><th>{t('Имя')}</th><th>{t('Телефон')}</th><th>{t('Курс')}</th><th>{t('Комментарий')}</th><th>{t('Статус')}</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.id} className={r.status === 'done' ? 'row-done' : ''}>
                      <td>{new Date(r.created_at).toLocaleString(LOCALES[lang])}</td>
                      <td>{r.name}</td>
                      <td><a href={`tel:${r.phone}`}>{r.phone}</a></td>
                      <td>{t(r.course)}</td>
                      <td>{r.message ?? ''}</td>
                      <td>
                        <button className="btn btn-small btn-ghost" onClick={() => toggleStatus(r)}>
                          {r.status === 'new' ? t('Новая') : t('Обработана')}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
