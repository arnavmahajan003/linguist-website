import PageTitle from '../components/PageTitle';
import { CONTACTS } from '../data/content';

export default function Privacy() {
  return (
    <>
      <PageTitle title="Политика конфиденциальности" />
      <section className="page-head">
        <div className="container">
          <h1>Политика конфиденциальности</h1>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <p>
            Оператор персональных данных — {CONTACTS.legalName} (ИНН {CONTACTS.inn},
            ОГРНИП {CONTACTS.ogrnip}), языковой центр «Лингвист», {CONTACTS.addressFull}.
          </p>
          <h2>Какие данные мы собираем</h2>
          <p>
            Через формы на этом сайте мы получаем только то, что вы указываете сами: имя, номер
            телефона, выбранный курс и текст комментария. Данные используются для одного — связаться
            с вами по вашей заявке и подобрать программу обучения.
          </p>
          <h2>Как мы используем данные</h2>
          <ul>
            <li>Мы не продаём и не передаём ваши данные третьим лицам в рекламных целях.</li>
            <li>Доступ к заявкам есть только у руководителя центра.</li>
            <li>Заявка не может быть отправлена без вашего согласия на обработку персональных данных.</li>
          </ul>
          <h2>Ваши права</h2>
          <p>
            Вы можете в любой момент отозвать согласие и попросить удалить ваши данные, написав на{' '}
            <a href={`mailto:${CONTACTS.email}`}>{CONTACTS.email}</a> или позвонив по телефону{' '}
            <a href={CONTACTS.phoneHref}>{CONTACTS.phoneDisplay}</a>.
          </p>
          <p>
            Полный текст политики конфиденциальности и согласия на обработку персональных данных —
            на официальном сайте центра:{' '}
            <a
              href="https://www.course-linguist.ru/svedeniya-ob-obrazovatelnoj-organizatsii/politika-konfidentsialnosti-i-soglasie-na-obrabotku-personalnykh-dannykh"
              target="_blank"
              rel="noreferrer"
            >
              открыть полный текст
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
