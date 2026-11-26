import { ArrowUpRight, Check, Copy, Flame, Mail } from 'lucide-react';
import { PROFILE } from '../data/profile';
import { useClipboard } from '../hooks/useClipboard';
import { useI18n } from '../i18n/I18nContext';

export function ContactTab() {
  const { locale, t } = useI18n();
  const { status, copy } = useClipboard(2000);

  const copyButtonText =
    status === 'copied'
      ? t.contact.copied
      : status === 'error'
        ? t.contact.copyFailed
        : t.contact.copy;

  const liveAnnouncement =
    status === 'copied' ? t.contact.copied : status === 'error' ? t.contact.copyFailed : '';

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-[var(--border)] bg-[var(--surface-subtle)] p-4 space-y-1.5">
        <p className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-[var(--accent-highlight)]">
          <Flame size={12} aria-hidden="true" />
          <span>{t.contact.summonTitle}</span>
        </p>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
          {PROFILE.contactNote[locale]}
        </p>
      </section>

      <section aria-label={t.contact.sectionHeader} className="space-y-3">
        <h2 className="text-xs uppercase tracking-wider text-[var(--text-subtle)]">
          {t.contact.sectionHeader}
        </h2>

        <div className="divide-y divide-[var(--border)] rounded-lg border border-[var(--border)] bg-[var(--surface-subtle)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 p-3.5 sm:px-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 min-w-0">
              <span className="text-xs text-[var(--text-muted)] sm:w-20 shrink-0">
                {t.contact.emailLabel}
              </span>
              <a
                href={`mailto:${PROFILE.contact.email}`}
                aria-label={t.contact.mailtoAriaLabel}
                className="inline-flex items-center gap-2 text-xs sm:text-sm text-[var(--text-primary)] hover:text-[var(--accent-primary)] transition-colors select-all break-all"
              >
                <Mail size={14} aria-hidden="true" className="text-[var(--text-muted)] shrink-0" />
                <span>{PROFILE.contact.email}</span>
              </a>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => void copy(PROFILE.contact.email)}
                aria-label={t.contact.copyAriaLabel}
                className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs transition-colors cursor-pointer ${
                  status === 'copied'
                    ? 'border-[var(--accent-highlight)] text-[var(--accent-highlight)] bg-[var(--bg)]'
                    : status === 'error'
                      ? 'border-[var(--accent-highlight-strong)] text-[var(--accent-highlight-strong)] bg-[var(--bg)]'
                      : 'border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)] bg-[var(--bg)]'
                }`}
              >
                {status === 'copied' ? (
                  <Check size={12} aria-hidden="true" />
                ) : (
                  <Copy size={12} aria-hidden="true" />
                )}
                <span>{copyButtonText}</span>
              </button>

              <span role="status" aria-live="polite" className="sr-only">
                {liveAnnouncement}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 p-3.5 sm:px-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 min-w-0">
              <span className="text-xs text-[var(--text-muted)] sm:w-20 shrink-0">
                {t.contact.githubLabel}
              </span>
              <a
                href={PROFILE.contact.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`GitHub ${PROFILE.contact.githubDisplay} ${t.contact.openExternalSuffix}`}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-[var(--text-primary)] hover:text-[var(--accent-primary)] transition-colors break-all"
              >
                <span>{PROFILE.contact.githubDisplay}</span>
                <ArrowUpRight size={13} aria-hidden="true" className="shrink-0" />
              </a>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 p-3.5 sm:px-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 min-w-0">
              <span className="text-xs text-[var(--text-muted)] sm:w-20 shrink-0">
                {t.contact.linkedinLabel}
              </span>
              <a
                href={PROFILE.contact.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`LinkedIn ${PROFILE.contact.linkedinDisplay} ${t.contact.openExternalSuffix}`}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-[var(--text-primary)] hover:text-[var(--accent-primary)] transition-colors break-all"
              >
                <span>{PROFILE.contact.linkedinDisplay}</span>
                <ArrowUpRight size={13} aria-hidden="true" className="shrink-0" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
