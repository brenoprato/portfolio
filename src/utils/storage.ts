export type StorageArea = 'local' | 'session';

function resolveStorage(area: StorageArea): Storage | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    return area === 'local' ? window.localStorage : window.sessionStorage;
  } catch {
    return null;
  }
}

export function safeStorageGet(area: StorageArea, key: string): string | null {
  try {
    const storage = resolveStorage(area);
    if (!storage) {
      return null;
    }
    return storage.getItem(key);
  } catch {
    return null;
  }
}

export function safeStorageSet(area: StorageArea, key: string, value: string): boolean {
  try {
    const storage = resolveStorage(area);
    if (!storage) {
      return false;
    }
    storage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}
