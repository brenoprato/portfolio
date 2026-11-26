import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import type { Project } from '../data/types';
import { useI18n } from '../i18n/I18nContext';

const ACCORDION_SPRING = {
  type: 'spring' as const,
  stiffness: 320,
  damping: 32,
};

interface ProjectAccordionItemProps {
  readonly project: Project;
  readonly isExpanded: boolean;
  readonly onToggle: () => void;
  readonly reducedMotion: boolean;
}

export function ProjectAccordionItem({
  project,
  isExpanded,
  onToggle,
  reducedMotion,
}: ProjectAccordionItemProps) {
  const { locale, t } = useI18n();
  const headerId = `project-header-${project.id}`;
  const panelId = `project-panel-${project.id}`;

  return (
    <article className="rounded-lg border border-[var(--border)] bg-[var(--surface-subtle)] transition-colors hover:border-[var(--border-strong)]">
      <button
        id={headerId}
        type="button"
        aria-expanded={isExpanded}
        aria-controls={panelId}
        onClick={onToggle}
        className="w-full text-left p-3.5 sm:p-4 flex items-start justify-between gap-3 cursor-pointer"
      >
        <div className="space-y-1.5 min-w-0">
          <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
            <h3 className="text-sm sm:text-base font-medium text-[var(--text-primary)] break-all sm:break-normal">
              {project.name}
            </h3>
            <span className="text-[11px] text-[var(--text-muted)]">
              {project.category[locale]} · {project.year} · {t.projects.statusLabels[project.status]}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
            {project.summary[locale]}
          </p>

          <p className="text-[11px] text-[var(--text-muted)] pt-0.5">
            {project.stack.join(' · ')}
          </p>
        </div>

        <span
          aria-hidden="true"
          className={`mt-0.5 shrink-0 text-[var(--text-muted)] transition-transform duration-200 ${
            isExpanded ? 'rotate-180 text-[var(--accent-primary)]' : ''
          }`}
        >
          <ChevronDown size={16} />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={headerId}
            initial={reducedMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reducedMotion ? undefined : { height: 0, opacity: 0 }}
            transition={reducedMotion ? { duration: 0 } : ACCORDION_SPRING}
            className="overflow-hidden"
          >
            <div className="px-3.5 sm:px-4 pb-4 pt-3 border-t border-[var(--border)] space-y-3.5">
              <div className="space-y-2">
                <h4 className="text-[11px] uppercase tracking-wider text-[var(--text-muted)]">
                  {t.projects.highlightsLabel}
                </h4>
                <ul className="space-y-1.5 text-xs text-[var(--text-secondary)] leading-relaxed">
                  {project.highlights[locale].map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span
                        aria-hidden="true"
                        className="text-[var(--accent-highlight)] shrink-0 mt-[1px]"
                      >
                        ▸
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                <span className="text-[11px] text-[var(--text-muted)]">
                  <strong className="font-medium text-[var(--text-secondary)]">
                    {t.projects.stackLabel}:
                  </strong>{' '}
                  {project.stack.join(' · ')}
                </span>

                <div className="flex items-center gap-3">
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-medium text-[var(--accent-primary)] hover:text-[var(--text-primary)] transition-colors"
                  >
                    <span>{t.projects.repoLink}</span>
                    <ArrowUpRight size={13} aria-hidden="true" />
                  </a>

                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-medium text-[var(--accent-highlight)] hover:text-[var(--text-primary)] transition-colors"
                    >
                      <span>{t.projects.demoLink}</span>
                      <ArrowUpRight size={13} aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}
