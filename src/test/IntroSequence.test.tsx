import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { App } from '../App';
import { PROFILE } from '../data/profile';
import {
  CHAR_INTERVAL_MS,
  INTRO_SEEN_STORAGE_KEY,
  PAUSE_BEFORE_TRANSITION_MS,
} from '../hooks/useIntroSequence';
import { mockMatchMedia } from './setup';

describe('Intro sequence, skip, replay, sessionStorage, and prefers-reduced-motion', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('types greeting on first visit, finishes into main window, and persists sessionStorage', () => {
    vi.useFakeTimers();
    mockMatchMedia(false);

    render(<App />);

    expect(screen.getByRole('region', { name: /skip opening animation/i })).toBeInTheDocument();
    expect(screen.queryByRole('tablist')).not.toBeInTheDocument();

    for (let i = 0; i <= PROFILE.greetingSignature.length; i += 1) {
      act(() => {
        vi.advanceTimersByTime(CHAR_INTERVAL_MS);
      });
    }

    act(() => {
      vi.advanceTimersByTime(PAUSE_BEFORE_TRANSITION_MS);
    });

    expect(screen.getByRole('tablist')).toBeInTheDocument();
    expect(window.sessionStorage.getItem(INTRO_SEEN_STORAGE_KEY)).toBe('1');
  });

  it('skips intro immediately on click or keypress without triggering tab shortcut on the skip key', () => {
    mockMatchMedia(false);
    const { unmount } = render(<App />);

    fireEvent.click(screen.getByRole('region', { name: /skip opening animation/i }));
    expect(screen.getByRole('tablist')).toBeInTheDocument();
    expect(window.sessionStorage.getItem(INTRO_SEEN_STORAGE_KEY)).toBe('1');
    unmount();

    window.sessionStorage.clear();
    render(<App />);
    expect(screen.getByRole('region', { name: /skip opening animation/i })).toBeInTheDocument();

    fireEvent.keyDown(window, { key: '2' });
    expect(screen.getByRole('tablist')).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /about/i })).toHaveAttribute('aria-selected', 'true');
  });

  it('skips intro automatically on subsequent visits in the same session', () => {
    mockMatchMedia(false);
    window.sessionStorage.setItem(INTRO_SEEN_STORAGE_KEY, '1');

    render(<App />);
    expect(screen.getByRole('tablist')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /replay opening animation/i })).toBeInTheDocument();
  });

  it('skips intro and hides replay button when prefers-reduced-motion is reduce', () => {
    mockMatchMedia(true);

    render(<App />);
    expect(screen.getByRole('tablist')).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /replay opening animation/i }),
    ).not.toBeInTheDocument();
  });

  it('replays intro with fixed English signature while preserving active tab and locale', () => {
    mockMatchMedia(false);
    window.sessionStorage.setItem(INTRO_SEEN_STORAGE_KEY, '1');

    render(<App />);

    fireEvent.click(screen.getByRole('tab', { name: /projects/i }));
    fireEvent.click(screen.getByRole('button', { name: /switch language to portuguese/i }));
    expect(screen.getByRole('tab', { name: /projetos/i })).toHaveAttribute('aria-selected', 'true');

    fireEvent.click(screen.getByRole('button', { name: /rever animação de abertura/i }));

    const overlay = screen.getByRole('region', { name: /pular animação de abertura/i });
    expect(overlay).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 1, name: "hello!, i'm breno!" }),
    ).toBeInTheDocument();

    fireEvent.click(overlay);
    expect(screen.getByRole('tab', { name: /projetos/i })).toHaveAttribute('aria-selected', 'true');
    expect(document.documentElement.lang).toBe('pt-BR');
  });
});
