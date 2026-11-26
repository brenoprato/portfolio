import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { ProjectsTab } from '../components/ProjectsTab';
import { PROJECTS } from '../data/projects';
import type { Project } from '../data/types';
import { I18nProvider } from '../i18n/I18nContext';
import { mockMatchMedia } from './setup';

function renderProjects(projects?: readonly Project[]) {
  return render(
    <I18nProvider>
      <ProjectsTab projects={projects} reducedMotion={true} />
    </I18nProvider>,
  );
}

describe('ProjectsTab', () => {
  beforeEach(() => {
    mockMatchMedia(true);
  });

  it('renders both GitHub projects collapsed by default and toggles accordion via click and keyboard', async () => {
    const user = userEvent.setup();
    renderProjects();

    const burnoutButton = screen.getByRole('button', {
      name: /supervised-learning-burnout-study/i,
    });
    const mp3Button = screen.getByRole('button', { name: /mp3-tui/i });

    expect(burnoutButton).toHaveAttribute('aria-expanded', 'false');
    expect(mp3Button).toHaveAttribute('aria-expanded', 'false');

    await user.click(burnoutButton);
    expect(burnoutButton).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText(/Remote Work Health Impact Survey 2025/i)).toBeInTheDocument();

    const burnoutRepoLink = screen.getByRole('link', { name: /view on github/i });
    expect(burnoutRepoLink).toHaveAttribute(
      'href',
      'https://github.com/brenoprato/supervised-learning-burnout-study',
    );
    expect(burnoutRepoLink).toHaveAttribute('target', '_blank');
    expect(burnoutRepoLink).toHaveAttribute('rel', 'noopener noreferrer');
    expect(screen.queryByRole('link', { name: /live demo/i })).not.toBeInTheDocument();

    mp3Button.focus();
    await user.keyboard('{Enter}');
    expect(mp3Button).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText(/SampleRingBuffer/i)).toBeInTheDocument();

    await user.keyboard(' ');
    expect(mp3Button).toHaveAttribute('aria-expanded', 'false');
  });

  it('renders optional demoUrl only when present', async () => {
    const user = userEvent.setup();
    const withDemo: readonly Project[] = [
      {
        ...PROJECTS[0],
        demoUrl: 'https://example.com/demo',
      },
    ];
    renderProjects(withDemo);

    await user.click(screen.getByRole('button', { name: /supervised-learning-burnout-study/i }));
    const demoLink = screen.getByRole('link', { name: /live demo/i });
    expect(demoLink).toHaveAttribute('href', 'https://example.com/demo');
    expect(demoLink).toHaveAttribute('target', '_blank');
    expect(demoLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders clean empty state when no projects exist', () => {
    renderProjects([]);
    expect(screen.getByText(/No projects published yet/i)).toBeInTheDocument();
  });
});
