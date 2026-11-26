import { useCallback, useEffect, useState } from 'react';
import type { IntroPhase } from '../data/types';
import { safeStorageGet, safeStorageSet } from '../utils/storage';

export const INTRO_SEEN_STORAGE_KEY = 'breno_portfolio_intro_seen';
export const CHAR_INTERVAL_MS = 52;
export const PAUSE_BEFORE_TRANSITION_MS = 420;

interface UseIntroSequenceResult {
  readonly phase: IntroPhase;
  readonly typedText: string;
  readonly isIntroActive: boolean;
  readonly skip: () => void;
  readonly replay: () => void;
}

function shouldSkipOnBoot(reducedMotion: boolean): boolean {
  if (reducedMotion) {
    return true;
  }
  return safeStorageGet('session', INTRO_SEEN_STORAGE_KEY) === '1';
}

export function useIntroSequence(greeting: string, reducedMotion: boolean): UseIntroSequenceResult {
  const [phase, setPhase] = useState<IntroPhase>(() =>
    shouldSkipOnBoot(reducedMotion) ? 'done' : 'typing',
  );
  const [typedLength, setTypedLength] = useState<number>(() =>
    shouldSkipOnBoot(reducedMotion) ? greeting.length : 0,
  );

  const markComplete = useCallback(() => {
    safeStorageSet('session', INTRO_SEEN_STORAGE_KEY, '1');
    setTypedLength(greeting.length);
    setPhase('done');
  }, [greeting.length]);

  const skip = useCallback(() => {
    markComplete();
  }, [markComplete]);

  const replay = useCallback(() => {
    if (reducedMotion) {
      return;
    }
    setTypedLength(0);
    setPhase('typing');
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion && phase !== 'done') {
      markComplete();
    }
  }, [reducedMotion, phase, markComplete]);

  useEffect(() => {
    if (phase !== 'typing') {
      return;
    }

    if (typedLength >= greeting.length) {
      setPhase('pause');
      return;
    }

    const timer = window.setTimeout(() => {
      setTypedLength((prev) => prev + 1);
    }, CHAR_INTERVAL_MS);

    return () => window.clearTimeout(timer);
  }, [phase, typedLength, greeting.length]);

  useEffect(() => {
    if (phase !== 'pause') {
      return;
    }

    const timer = window.setTimeout(() => {
      markComplete();
    }, PAUSE_BEFORE_TRANSITION_MS);

    return () => window.clearTimeout(timer);
  }, [phase, markComplete]);

  useEffect(() => {
    if (phase === 'done') {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      event.stopPropagation();
      skip();
    };

    const handlePointerDown = () => {
      skip();
    };

    window.addEventListener('keydown', handleKeyDown, { capture: true });
    window.addEventListener('pointerdown', handlePointerDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown, { capture: true });
      window.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [phase, skip]);

  return {
    phase,
    typedText: greeting.slice(0, typedLength),
    isIntroActive: phase !== 'done',
    skip,
    replay,
  };
}
