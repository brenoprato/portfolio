import { useCallback, useEffect, useRef, useState } from 'react';
import type { CopyStatus } from '../data/types';

function fallbackCopyText(text: string): boolean {
  if (typeof document === 'undefined' || typeof document.execCommand !== 'function') {
    return false;
  }

  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.top = '-9999px';
  textarea.style.left = '-9999px';
  textarea.style.opacity = '0';

  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();

  try {
    return document.execCommand('copy');
  } catch {
    return false;
  } finally {
    document.body.removeChild(textarea);
  }
}

export function useClipboard(resetDelayMs = 2000) {
  const [status, setStatus] = useState<CopyStatus>('idle');
  const timeoutRef = useRef<number | null>(null);
  const isMountedRef = useRef(true);

  const clearPendingTimer = useCallback(() => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      clearPendingTimer();
    };
  }, [clearPendingTimer]);

  const reset = useCallback(() => {
    clearPendingTimer();
    setStatus('idle');
  }, [clearPendingTimer]);

  const copy = useCallback(
    async (text: string) => {
      clearPendingTimer();

      let succeeded = false;

      if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
        try {
          await navigator.clipboard.writeText(text);
          succeeded = true;
        } catch {
          succeeded = fallbackCopyText(text);
        }
      } else {
        succeeded = fallbackCopyText(text);
      }

      if (!isMountedRef.current) {
        return;
      }

      setStatus(succeeded ? 'copied' : 'error');

      timeoutRef.current = window.setTimeout(() => {
        if (isMountedRef.current) {
          setStatus('idle');
        }
        timeoutRef.current = null;
      }, resetDelayMs);
    },
    [clearPendingTimer, resetDelayMs],
  );

  return { status, copy, reset };
}
