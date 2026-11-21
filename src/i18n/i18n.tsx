import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { DICTS, type Lang } from './translations';

export type { Lang };

export const LANGS: { code: Lang; label: string }[] = [
  { code: 'ru', label: 'RU' },
  { code: 'en', label: 'EN' },
  { code: 'zh', label: '中文' },
  { code: 'de', label: 'DE' },
  { code: 'fr', label: 'FR' },
];

export const LOCALES: Record<Lang, string> = {
  ru: 'ru-RU',
  en: 'en-GB',
  zh: 'zh-CN',
  de: 'de-DE',
  fr: 'fr-FR',
};

type LangContextValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (s: string) => string;
};

const LanguageContext = createContext<LangContextValue>({
  lang: 'ru',
  setLang: () => undefined,
  t: (s) => s,
});

function initialLang(): Lang {
  try {
    const v = localStorage.getItem('linguist-lang');
    if (v === 'en' || v === 'zh' || v === 'de' || v === 'fr') return v;
  } catch {
    /* storage unavailable */
  }
  return 'ru';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang);

  useEffect(() => {
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : lang;
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem('linguist-lang', l);
    } catch {
      /* storage unavailable */
    }
  };

  const t = (s: string): string => (lang === 'ru' ? s : DICTS[lang][s] ?? s);

  return <LanguageContext.Provider value={{ lang, setLang, t }}>{children}</LanguageContext.Provider>;
}

export function useLang(): LangContextValue {
  return useContext(LanguageContext);
}
