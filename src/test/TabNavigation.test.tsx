import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { App } from '../App';
import { INTRO_SEEN_STORAGE_KEY } from '../hooks/useIntroSequence';
import { mockMatchMedia } from './setup';

describe('Tab navigation, keyboard shortcuts, WAI-ARIA, and hash sync', () => {
  beforeEach(() => {
    window.sessionStorage.setItem(INTRO_SEEN_STORAGE_KEY, '1');
    mockMatchMedia(true);
  });

  it('switches tabs via click, updates WAI-ARIA attributes, and syncs URL hash', async () => {
    const user = userEvent.setup();
    render(<App />);

    const tablist = screen.getByRole('tablist');
    expect(tablist).toBeInTheDocument();

    const aboutTab = screen.getByRole('tab', { name: /about/i });
    const projectsTab = screen.getByRole('tab', { name: /projects/i });
    const contactTab = screen.getByRole('tab', { name: /contact/i });

    expect(aboutTab).toHaveAttribute('aria-selected', 'true');
    expect(aboutTab).toHaveAttribute('tabindex', '0');
    expect(aboutTab).toHaveAttribute('aria-controls', 'panel-about');
    expect(projectsTab).toHaveAttribute('aria-selected', 'false');
    expect(projectsTab).toHaveAttribute('tabindex', '-1');

    const initialPanel = screen.getByRole('tabpanel');
    expect(initialPanel).toHaveAttribute('aria-labelledby', 'tab-about');

    await user.click(projectsTab);
    expect(projectsTab).toHaveAttribute('aria-selected', 'true');
    expect(projectsTab).toHaveAttribute('tabindex', '0');
    expect(aboutTab).toHaveAttribute('aria-selected', 'false');
    expect(window.location.hash).toBe('#projects');
    expect(screen.getByRole('tabpanel')).toHaveAttribute('aria-labelledby', 'tab-projects');

    await user.click(contactTab);
    expect(contactTab).toHaveAttribute('aria-selected', 'true');
    expect(window.location.hash).toBe('#contact');
    expect(screen.getByRole('tabpanel')).toHaveAttribute('aria-labelledby', 'tab-contact');
  });

  it('supports keyboard shortcuts 1, 2, 3 and ignores modifier combinations', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.keyboard('{Control>}2{/Control}');
    expect(screen.getByRole('tab', { name: /about/i })).toHaveAttribute('aria-selected', 'true');

    await user.keyboard('2');
    expect(screen.getByRole('tab', { name: /projects/i })).toHaveAttribute('aria-selected', 'true');
    expect(window.location.hash).toBe('#projects');

    await user.keyboard('3');
    expect(screen.getByRole('tab', { name: /contact/i })).toHaveAttribute('aria-selected', 'true');
    expect(window.location.hash).toBe('#contact');

    await user.keyboard('1');
    expect(screen.getByRole('tab', { name: /about/i })).toHaveAttribute('aria-selected', 'true');
    expect(window.location.hash).toBe('#about');
  });

  it('supports cyclic ArrowLeft, ArrowRight, Home, and End navigation on tablist', async () => {
    const user = userEvent.setup();
    render(<App />);

    const aboutTab = screen.getByRole('tab', { name: /about/i });
    const projectsTab = screen.getByRole('tab', { name: /projects/i });
    const contactTab = screen.getByRole('tab', { name: /contact/i });

    aboutTab.focus();
    expect(aboutTab).toHaveFocus();

    await user.keyboard('{ArrowRight}');
    expect(projectsTab).toHaveAttribute('aria-selected', 'true');
    expect(projectsTab).toHaveFocus();

    await user.keyboard('{End}');
    expect(contactTab).toHaveAttribute('aria-selected', 'true');
    expect(contactTab).toHaveFocus();

    await user.keyboard('{ArrowRight}');
    expect(aboutTab).toHaveAttribute('aria-selected', 'true');
    expect(aboutTab).toHaveFocus();

    await user.keyboard('{ArrowLeft}');
    expect(contactTab).toHaveAttribute('aria-selected', 'true');
    expect(contactTab).toHaveFocus();

    await user.keyboard('{Home}');
    expect(aboutTab).toHaveAttribute('aria-selected', 'true');
    expect(aboutTab).toHaveFocus();
  });

  it('opens initial tab from valid URL hash, falls back on invalid hash, and listens to hashchange', () => {
    window.history.replaceState(null, '', '#projects');
    const { unmount } = render(<App />);

    expect(screen.getByRole('tab', { name: /projects/i })).toHaveAttribute('aria-selected', 'true');

    act(() => {
      window.location.hash = '#contact';
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    });
    expect(screen.getByRole('tab', { name: /contact/i })).toHaveAttribute('aria-selected', 'true');

    unmount();

    window.history.replaceState(null, '', '#unknown-tab');
    render(<App />);
    expect(screen.getByRole('tab', { name: /about/i })).toHaveAttribute('aria-selected', 'true');
  });
});
