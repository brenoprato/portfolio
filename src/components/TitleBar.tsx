import { RotateCcw } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';

interface TitleBarProps {
  readonly pathLabel: string;
  readonly showReplay: boolean;
  readonly onReplay: () => void;
}

export function TitleBar({ pathLabel, showReplay, onReplay }: TitleBarProps) {
  const { locale, setLocale, t } = useI18n();

  return (
    <div className="flex items-center justify-between gap-3 px-3.5 sm:px-4 h-11 bg-[var(--surface)] border-b border-[var(--border)]">
      <div className="flex items-center gap-3 min-w-0">
        <div className="flex items-center gap-1.5 shrink-0" aria-hidden="true">
          <span className="h-3 w-3 rounded-full bg-[var(--window-dot-close)] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.18)]" />
          <span className="h-3 w-3 rounded-full bg-[var(--window-dot-minimize)] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.18)]" />
          <span className="h-3 w-3 rounded-full bg-[var(--window-dot-maximize)] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.18)]" />
        </div>
        <span className="text-xs text-[var(--text-muted)] truncate">{pathLabel}</span>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {showReplay && (
          <button
            type="button"
            onPointerDown={(event) => event.stopPropagation()}
            onClick={(event) => {
              event.stopPropagation();
              onReplay();
            }}
            aria-label={t.titlebar.replayLabel}
            title={t.titlebar.replayLabel}
            className="inline-flex items-center justify-center h-7 w-7 rounded-md text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-subtle)] border border-transparent hover:border-[var(--border)] transition-colors cursor-pointer"
          >
            <RotateCcw size={13} aria-hidden="true" />
          </button>
        )}

        <div
          role="group"
          aria-label={t.titlebar.languageGroupLabel}
          className="inline-flex items-center rounded-md border border-[var(--border)] bg-[var(--bg)] p-0.5 text-[11px]"
        >
          <button
            type="button"
            onClick={() => setLocale('en')}
            aria-pressed={locale === 'en'}
            aria-label={t.titlebar.switchToEn}
            className={`px-2 py-0.5 rounded-[4px] transition-colors cursor-pointer ${
              locale === 'en'
                ? 'bg-[var(--surface)] text-[var(--text-primary)] font-medium'
                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
            }`}
          >
            EN
          </button>
          <button
            type="button"
            onClick={() => setLocale('pt-BR')}
            aria-pressed={locale === 'pt-BR'}
            aria-label={t.titlebar.switchToPt}
            className={`px-2 py-0.5 rounded-[4px] transition-colors cursor-pointer ${
              locale === 'pt-BR'
                ? 'bg-[var(--surface)] text-[var(--text-primary)] font-medium'
                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
            }`}
          >
            PT
          </button>
        </div>
      </div>
    </div>
  );
}
