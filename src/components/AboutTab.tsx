import { Flame } from 'lucide-react';
import { TECHNICAL_PILLARS } from '../data/pillars';
import { PROFILE } from '../data/profile';
import { useI18n } from '../i18n/I18nContext';

export function AboutTab() {
  const { locale, t } = useI18n();

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
          <h2 className="text-base sm:text-lg font-medium text-[var(--text-primary)]">
            {PROFILE.name}
          </h2>
          <p className="text-xs text-[var(--text-muted)]">
            {PROFILE.education.degree[locale]} · {PROFILE.education.institution} (
            {PROFILE.education.expectedGraduation[locale]})
          </p>
        </div>

        <p className="border-l-2 border-[var(--accent-highlight)] pl-3 py-0.5 text-xs sm:text-sm text-[var(--text-primary)] leading-relaxed flex items-start gap-2">
          <Flame
            size={14}
            aria-hidden="true"
            className="text-[var(--accent-highlight)] shrink-0 mt-0.5"
          />
          <span>{PROFILE.tagline[locale]}</span>
        </p>
      </div>

      <section aria-label={t.about.bioSection} className="space-y-2.5">
        <h3 className="text-xs uppercase tracking-wider text-[var(--text-subtle)]">
          {t.about.bioSection}
        </h3>
        <div className="space-y-2.5 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
          {PROFILE.bio[locale].map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section aria-label={t.about.pillarsSection} className="space-y-3">
        <h3 className="text-xs uppercase tracking-wider text-[var(--text-subtle)]">
          {t.about.pillarsSection}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {TECHNICAL_PILLARS.map((pillar) => (
            <article
              key={pillar.id}
              className="rounded-lg border border-[var(--border)] bg-[var(--surface-subtle)] p-3.5 space-y-2"
            >
              <div className="flex items-baseline gap-2">
                <span className="text-[11px] font-medium text-[var(--accent-highlight)]">
                  {pillar.index}
                </span>
                <h4 className="text-xs sm:text-sm font-medium text-[var(--text-primary)]">
                  {pillar.title[locale]}
                </h4>
              </div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                {pillar.summary[locale]}
              </p>
              <p className="text-[11px] text-[var(--text-muted)] pt-1 border-t border-[var(--border)]/60">
                {pillar.stackLine}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section aria-label={t.about.sideQuestsSection} className="space-y-3">
        <h3 className="text-xs uppercase tracking-wider text-[var(--text-subtle)]">
          {t.about.sideQuestsSection}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {PROFILE.sideQuests.map((quest) => (
            <article
              key={quest.id}
              className="rounded-lg border border-[var(--border)] bg-[var(--surface-subtle)]/70 p-3.5 space-y-1.5"
            >
              <p className="text-[11px] uppercase tracking-wider text-[var(--accent-primary)]">
                {quest.label[locale]}
              </p>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                {quest.detail[locale]}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
