import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { Locale } from '../data/types';
import { safeStorageGet, safeStorageSet } from '../utils/storage';
import { DICTIONARIES, type UiDictionary } from './dictionaries';

export const LOCALE_STORAGE_KEY = 'breno_portfolio_locale';

interface I18nContextValue {
  readonly locale: Locale;
  readonly setLocale: (next: Locale) => void;
  readonly t: UiDictionary;
}

const I18nContext = createContext<I18nContextValue | null>(null);

function resolveInitialLocale(): Locale {
  const stored = safeStorageGet('local', LOCALE_STORAGE_KEY);
  if (stored === 'en' || stored === 'pt-BR') {
    return stored;
  }
  return 'en';
}

export function I18nProvider({ children }: { readonly children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(resolveInitialLocale);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    safeStorageSet('local', LOCALE_STORAGE_KEY, next);
  }, []);

  useEffect(() => {
    const dictionary = DICTIONARIES[locale];
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale;
      document.title = dictionary.pageTitle;
    }
  }, [locale]);

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      setLocale,
      t: DICTIONARIES[locale],
    }),
    [locale, setLocale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error('useI18n must be used inside I18nProvider');
  }
  return ctx;
}
