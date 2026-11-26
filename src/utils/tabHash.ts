import { TAB_ORDER, type TabId } from '../data/types';

export function parseTabHash(hash: string): TabId {
  const normalized = hash.trim().replace(/^#/, '').trim().toLowerCase();
  if ((TAB_ORDER as readonly string[]).includes(normalized)) {
    return normalized as TabId;
  }
  return 'about';
}

export function syncTabHash(tab: TabId): void {
  if (typeof window === 'undefined') {
    return;
  }

  const targetHash = `#${tab}`;
  if (window.location.hash === targetHash) {
    return;
  }

  try {
    window.history.replaceState(null, '', targetHash);
  } catch {
    // ignore history errors in restricted environments
  }
}
