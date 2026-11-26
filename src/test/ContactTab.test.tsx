import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ContactTab } from '../components/ContactTab';
import { I18nProvider, LOCALE_STORAGE_KEY } from '../i18n/I18nContext';

function renderContact() {
  return render(
    <I18nProvider>
      <ContactTab />
    </I18nProvider>,
  );
}

describe('ContactTab & clipboard behavior', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('copies email with Clipboard API, announces status, resets after 2s, and resets timer on rapid clicks', async () => {
    vi.useFakeTimers();
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText },
    });

    renderContact();

    const copyButton = screen.getByRole('button', { name: /copy email address/i });
    await act(async () => {
      fireEvent.click(copyButton);
    });

    expect(writeText).toHaveBeenCalledWith('brenoppprado@gmail.com');
    expect(copyButton).toHaveTextContent('copied!');
    expect(screen.getByRole('status')).toHaveTextContent('copied!');

    act(() => {
      vi.advanceTimersByTime(1500);
    });
    expect(copyButton).toHaveTextContent('copied!');

    await act(async () => {
      fireEvent.click(copyButton);
    });
    expect(writeText).toHaveBeenCalledTimes(2);

    act(() => {
      vi.advanceTimersByTime(1500);
    });
    expect(copyButton).toHaveTextContent('copied!');

    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(copyButton).toHaveTextContent('copy');
  });

  it('falls back to document.execCommand when Clipboard API fails, and shows localized error if both fail', async () => {
    vi.useFakeTimers();
    window.localStorage.setItem(LOCALE_STORAGE_KEY, 'pt-BR');

    const writeText = vi.fn().mockRejectedValue(new Error('Clipboard blocked'));
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText },
    });

    const execCommandMock = vi.fn().mockReturnValue(true);
    Object.defineProperty(document, 'execCommand', {
      configurable: true,
      value: execCommandMock,
    });

    renderContact();
    const copyButton = screen.getByRole('button', { name: /copiar endereço de e-mail/i });

    await act(async () => {
      fireEvent.click(copyButton);
    });
    expect(execCommandMock).toHaveBeenCalledWith('copy');
    expect(copyButton).toHaveTextContent('copiado!');

    execCommandMock.mockReturnValue(false);
    await act(async () => {
      fireEvent.click(copyButton);
    });
    expect(copyButton).toHaveTextContent('erro ao copiar');
    expect(screen.getByRole('status')).toHaveTextContent('erro ao copiar');

    const mailtoLink = screen.getByRole('link', { name: /enviar e-mail para breno porto/i });
    expect(mailtoLink).toHaveAttribute('href', 'mailto:brenoppprado@gmail.com');
  });

  it('renders GitHub and LinkedIn links with safe external attributes', () => {
    renderContact();

    const githubLink = screen.getByRole('link', { name: /github\.com\/brenoprato/i });
    expect(githubLink).toHaveAttribute('href', 'https://github.com/brenoprato');
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');

    const linkedinLink = screen.getByRole('link', { name: /linkedin\.com\/in\/breno-porto/i });
    expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/breno-porto/');
    expect(linkedinLink).toHaveAttribute('target', '_blank');
    expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
