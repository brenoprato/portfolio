import { describe, expect, it, vi } from 'vitest';
import { safeStorageGet, safeStorageSet } from '../utils/storage';
import { parseTabHash, syncTabHash } from '../utils/tabHash';

describe('tabHash utilities', () => {
  it('parses valid tab hashes case-insensitively and falls back to about', () => {
    expect(parseTabHash('#about')).toBe('about');
    expect(parseTabHash('#projects')).toBe('projects');
    expect(parseTabHash('#contact')).toBe('contact');
    expect(parseTabHash('#PROJECTS')).toBe('projects');
    expect(parseTabHash('  #Contact  ')).toBe('contact');
    expect(parseTabHash('')).toBe('about');
    expect(parseTabHash('#')).toBe('about');
    expect(parseTabHash('#unknown-section')).toBe('about');
  });

  it('updates window.location.hash safely via syncTabHash', () => {
    syncTabHash('projects');
    expect(window.location.hash).toBe('#projects');

    syncTabHash('contact');
    expect(window.location.hash).toBe('#contact');
  });

  it('does not throw when history.replaceState fails', () => {
    const spy = vi.spyOn(window.history, 'replaceState').mockImplementation(() => {
      throw new DOMException('Blocked', 'SecurityError');
    });
    expect(() => syncTabHash('projects')).not.toThrow();
    spy.mockRestore();
  });
});

describe('storage utilities', () => {
  it('reads and writes localStorage and sessionStorage safely', () => {
    expect(safeStorageSet('local', 'k1', 'v1')).toBe(true);
    expect(safeStorageGet('local', 'k1')).toBe('v1');

    expect(safeStorageSet('session', 'k2', 'v2')).toBe(true);
    expect(safeStorageGet('session', 'k2')).toBe('v2');
  });

  it('degrades gracefully when storage throws SecurityError', () => {
    const getSpy = vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new DOMException('Denied', 'SecurityError');
    });
    const setSpy = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new DOMException('Denied', 'SecurityError');
    });

    expect(safeStorageGet('local', 'any')).toBeNull();
    expect(safeStorageSet('local', 'any', 'val')).toBe(false);
    expect(safeStorageGet('session', 'any')).toBeNull();
    expect(safeStorageSet('session', 'any', 'val')).toBe(false);

    getSpy.mockRestore();
    setSpy.mockRestore();
  });
});
