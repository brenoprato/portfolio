import { useState } from 'react';
import { PROJECTS } from '../data/projects';
import type { Project } from '../data/types';
import { useI18n } from '../i18n/I18nContext';
import { ProjectAccordionItem } from './ProjectAccordionItem';

interface ProjectsTabProps {
  readonly projects?: readonly Project[];
  readonly reducedMotion: boolean;
}

export function ProjectsTab({ projects = PROJECTS, reducedMotion }: ProjectsTabProps) {
  const { t } = useI18n();
  const [expandedIds, setExpandedIds] = useState<ReadonlySet<string>>(() => new Set());

  const toggleProject = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xs uppercase tracking-wider text-[var(--text-subtle)]">
        {t.projects.sectionHeader}
      </h2>

      {projects.length === 0 ? (
        <div className="rounded-lg border border-dashed border-[var(--border)] bg-[var(--surface-subtle)] p-6 text-center text-xs sm:text-sm text-[var(--text-muted)]">
          {t.projects.emptyState}
        </div>
      ) : (
        <div className="space-y-3">
          {projects.map((project) => (
            <ProjectAccordionItem
              key={project.id}
              project={project}
              isExpanded={expandedIds.has(project.id)}
              onToggle={() => toggleProject(project.id)}
              reducedMotion={reducedMotion}
            />
          ))}
        </div>
      )}
    </div>
  );
}
