import { useEffect } from 'react';

export default function PageTitle({ title }: { title: string }) {
  useEffect(() => {
    document.title = `${title} — Языковой центр «Лингвист», Тверь`;
  }, [title]);
  return null;
}
