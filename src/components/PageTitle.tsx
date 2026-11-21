import { useEffect } from 'react';
import { useLang } from '../i18n/i18n';

export default function PageTitle({ title }: { title: string }) {
  const { t, lang } = useLang();
  useEffect(() => {
    document.title = `${t(title)} — ${t('Языковой центр «Лингвист», Тверь')}`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, lang]);
  return null;
}
