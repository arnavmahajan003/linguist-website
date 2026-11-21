import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { COURSE_OPTIONS } from '../data/content';
import { submitEnquiry } from '../lib/supabase';
import { useLang } from '../i18n/i18n';

type Status = 'idle' | 'sending' | 'sent' | 'error';

export default function EnquiryForm({ defaultCourse = '' }: { defaultCourse?: string }) {
  const { t } = useLang();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [course, setCourse] = useState(defaultCourse);
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [errorText, setErrorText] = useState('');

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setErrorText(t('Пожалуйста, укажите имя и телефон.'));
      setStatus('error');
      return;
    }
    if (!consent) {
      setErrorText(t('Для отправки заявки нужно согласие на обработку персональных данных.'));
      setStatus('error');
      return;
    }
    setStatus('sending');
    try {
      await submitEnquiry({
        name: name.trim(),
        phone: phone.trim(),
        course: course || 'Не выбран',
        message: message.trim() || null,
        consent,
      });
      setStatus('sent');
    } catch {
      setErrorText(t('Не удалось отправить заявку. Позвоните нам, пожалуйста: 8 (920) 186-99-69.'));
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return (
      <div className="form-success" role="status">
        <p className="form-success-title">{t('Заявка принята!')}</p>
        <p>{t('Спасибо')}, {name.trim()}. {t('Мы свяжемся с вами в рабочее время: Пн–Пт с 10:00 до 19:00.')}</p>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate={false}>
      <div className="form-row">
        <label className="field">
          <span>{t('Ваше имя *')}</span>
          <input
            type="text"
            name="name"
            autoComplete="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t('Например, Анна')}
          />
        </label>
        <label className="field">
          <span>{t('Телефон *')}</span>
          <input
            type="tel"
            name="phone"
            autoComplete="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+7 (___) ___-__-__"
          />
        </label>
      </div>
      <label className="field">
        <span>{t('Интересующий курс')}</span>
        <select name="course" value={course} onChange={(e) => setCourse(e.target.value)}>
          <option value="">{t('Выберите курс…')}</option>
          {COURSE_OPTIONS.map((c) => (
            <option key={c} value={c}>{t(c)}</option>
          ))}
        </select>
      </label>
      <label className="field">
        <span>{t('Комментарий')}</span>
        <textarea
          name="message"
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={t('Например: хочу записать ребёнка 9 лет на английский')}
        />
      </label>
      <label className="consent">
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} required />
        <span>
          {t('Соглашаюсь с')} <Link to="/konfidentsialnost">{t('обработкой персональных данных')}</Link> *
        </span>
      </label>
      {status === 'error' && (
        <p className="form-error" role="alert">{errorText}</p>
      )}
      <button type="submit" className="btn btn-primary btn-large" disabled={status === 'sending'}>
        {status === 'sending' ? t('Отправляем…') : t('Записаться на бесплатное занятие')}
      </button>
      <p className="form-note">{t('Первое занятие и тестирование уровня — бесплатно.')}</p>
    </form>
  );
}
