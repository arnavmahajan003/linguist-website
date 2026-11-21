import PageTitle from '../components/PageTitle';
import { CONTACTS } from '../data/content';
import { useLang } from '../i18n/i18n';

export default function Privacy() {
  const { t } = useLang();
  return (
    <>
      <PageTitle title="Политика конфиденциальности" />
      <section className="page-head">
        <div className="container">
          <h1>{t('Политика конфиденциальности')}</h1>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <p>
            {t('Оператор персональных данных —')} {CONTACTS.legalName} ({t('ИНН')} {CONTACTS.inn},
            {t('ОГРНИП')} {CONTACTS.ogrnip}), {t('языковой центр «Лингвист»')}, {t(CONTACTS.addressFull)}.
          </p>
          <h2>{t('Какие данные мы собираем')}</h2>
          <p>
            {t('Через формы на этом сайте мы получаем только то, что вы указываете сами: имя, номер телефона, выбранный курс и текст комментария. Данные используются для одного — связаться с вами по вашей заявке и подобрать программу обучения.')}
          </p>
          <h2>{t('Как мы используем данные')}</h2>
          <ul>
            <li>{t('Мы не продаём и не передаём ваши данные третьим лицам в рекламных целях.')}</li>
            <li>{t('Доступ к заявкам есть только у руководителя центра.')}</li>
            <li>{t('Заявка не может быть отправлена без вашего согласия на обработку персональных данных.')}</li>
          </ul>
          <h2>{t('Ваши права')}</h2>
          <p>
            {t('Вы можете в любой момент отозвать согласие и попросить удалить ваши данные, написав на')}{' '}
            <a href={`mailto:${CONTACTS.email}`}>{CONTACTS.email}</a> {t('или позвонив по телефону')}{' '}
            <a href={CONTACTS.phoneHref}>{CONTACTS.phoneDisplay}</a>.
          </p>
          <p>
            {t('Полный текст политики конфиденциальности и согласия на обработку персональных данных — на официальном сайте центра:')}{' '}
            <a
              href="https://www.course-linguist.ru/svedeniya-ob-obrazovatelnoj-organizatsii/politika-konfidentsialnosti-i-soglasie-na-obrabotku-personalnykh-dannykh"
              target="_blank"
              rel="noreferrer"
            >
              {t('открыть полный текст')}
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
