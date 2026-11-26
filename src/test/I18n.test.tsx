import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { App } from '../App';
import { INTRO_SEEN_STORAGE_KEY } from '../hooks/useIntroSequence';
import { LOCALE_STORAGE_KEY } from '../i18n/I18nContext';
import { mockMatchMedia } from './setup';

describe('Internationalization (EN / PT-BR)', () => {
  beforeEach(() => {
    window.sessionStorage.setItem(INTRO_SEEN_STORAGE_KEY, '1');
    mockMatchMedia(true);
  });

  it('defaults to English and translates all visible UI and metadata to Portuguese on toggle', async () => {
    const user = userEvent.setup();
    render(<App />);

    expect(document.documentElement.lang).toBe('en');
    expect(document.title).toContain('Software Engineering & ML');
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent("hello!, i'm breno!");
    expect(screen.getByRole('tab', { name: /about/i })).toBeInTheDocument();
    expect(screen.getByText('bonfire lit')).toBeInTheDocument();

    const enButton = screen.getByRole('button', { name: /switch language to english/i });
    const ptButton = screen.getByRole('button', { name: /switch language to portuguese/i });
    expect(enButton).toHaveAttribute('aria-pressed', 'true');
    expect(ptButton).toHaveAttribute('aria-pressed', 'false');

    await user.click(ptButton);

    expect(document.documentElement.lang).toBe('pt-BR');
    expect(document.title).toContain('Engenharia de Software & ML');
    expect(window.localStorage.getItem(LOCALE_STORAGE_KEY)).toBe('pt-BR');
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent("hello!, i'm breno!");
    expect(screen.getByRole('tab', { name: /sobre/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /projetos/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /contato/i })).toBeInTheDocument();
    expect(screen.getByText('fogueira acesa')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /mudar idioma para português/i })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
  });

  it('restores persisted pt-BR locale from localStorage and falls back to en on invalid or blocked storage', () => {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, 'pt-BR');
    const { unmount } = render(<App />);
    expect(document.documentElement.lang).toBe('pt-BR');
    expect(screen.getByRole('tab', { name: /sobre/i })).toBeInTheDocument();
    unmount();

    window.localStorage.setItem(LOCALE_STORAGE_KEY, 'fr');
    const { unmount: unmountInvalid } = render(<App />);
    expect(document.documentElement.lang).toBe('en');
    expect(screen.getByRole('tab', { name: /about/i })).toBeInTheDocument();
    unmountInvalid();

    const getSpy = vi.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
      if (key === INTRO_SEEN_STORAGE_KEY) {
        return '1';
      }
      throw new DOMException('Blocked', 'SecurityError');
    });

    render(<App />);
    expect(document.documentElement.lang).toBe('en');
    getSpy.mockRestore();
  });
});
