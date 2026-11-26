import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, beforeEach } from 'vitest';

if (typeof globalThis.ResizeObserver === 'undefined') {
  globalThis.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}

interface MockMediaQueryController {
  setMatches: (next: boolean) => void;
}

export function mockMatchMedia(reduced: boolean): MockMediaQueryController {
  let currentMatches = reduced;
  const listeners = new Set<(event: MediaQueryListEvent) => void>();

  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    configurable: true,
    value: (query: string): MediaQueryList => ({
      get matches() {
        return query === '(prefers-reduced-motion: reduce)' ? currentMatches : false;
      },
      media: query,
      onchange: null,
      addEventListener: (_type: string, listener: EventListenerOrEventListenerObject) => {
        if (typeof listener === 'function') {
          listeners.add(listener as (event: MediaQueryListEvent) => void);
        }
      },
      removeEventListener: (_type: string, listener: EventListenerOrEventListenerObject) => {
        if (typeof listener === 'function') {
          listeners.delete(listener as (event: MediaQueryListEvent) => void);
        }
      },
      addListener: (listener: (event: MediaQueryListEvent) => void) => {
        listeners.add(listener);
      },
      removeListener: (listener: (event: MediaQueryListEvent) => void) => {
        listeners.delete(listener);
      },
      dispatchEvent: () => false,
    }),
  });

  return {
    setMatches(next: boolean) {
      currentMatches = next;
      const event = {
        matches: next,
        media: '(prefers-reduced-motion: reduce)',
      } as MediaQueryListEvent;
      for (const listener of listeners) {
        listener(event);
      }
    },
  };
}

beforeEach(() => {
  mockMatchMedia(false);
  try {
    window.localStorage.clear();
  } catch {
    // ignore storage errors in mocked tests
  }
  try {
    window.sessionStorage.clear();
  } catch {
    // ignore storage errors in mocked tests
  }
  window.history.replaceState(null, '', window.location.pathname);
});

afterEach(() => {
  cleanup();
});
