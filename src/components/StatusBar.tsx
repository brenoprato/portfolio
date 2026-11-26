import { Flame } from 'lucide-react';
import { PROFILE } from '../data/profile';
import { useI18n } from '../i18n/I18nContext';

export function StatusBar() {
  const { t } = useI18n();

  return (
    <footer className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 px-3.5 sm:px-4 min-h-9 py-1.5 bg-[var(--surface)] border-t border-[var(--border)] text-[11px] sm:text-xs text-[var(--text-muted)]">
      <span>{PROFILE.education.shortBadge}</span>

      <div className="flex items-center gap-3 sm:gap-4">
        <span className="inline-flex items-center gap-1.5">
          <Flame
            size={12}
            aria-hidden="true"
            className="text-[var(--accent-highlight)] shrink-0"
          />
          <span>{t.status.bonfireLit}</span>
        </span>
        <span
          title={t.status.shortcutsTitle}
          className="hidden sm:inline text-[var(--text-muted)]"
        >
          {t.status.shortcutsHint}
        </span>
      </div>
    </footer>
  );
}
