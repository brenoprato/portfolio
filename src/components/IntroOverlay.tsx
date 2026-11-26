import { motion } from 'motion/react';
import { PROFILE } from '../data/profile';
import { useI18n } from '../i18n/I18nContext';

const HERO_SPRING = {
  type: 'spring' as const,
  stiffness: 260,
  damping: 28,
  mass: 0.9,
};

interface IntroOverlayProps {
  readonly typedText: string;
  readonly onSkip: () => void;
}

export function IntroOverlay({ typedText, onSkip }: IntroOverlayProps) {
  const { t } = useI18n();

  return (
    <div
      className="min-h-dvh w-full flex flex-col items-center justify-center px-4 cursor-pointer select-none"
      onClick={onSkip}
      role="region"
      aria-label={t.intro.skipAriaLabel}
    >
      <motion.div
        layoutId="hero-greeting"
        layout="position"
        transition={HERO_SPRING}
        className="flex items-center"
      >
        <h1
          aria-label={PROFILE.greetingSignature}
          className="text-2xl sm:text-3xl font-medium tracking-tight text-[var(--text-primary)]"
        >
          <span aria-hidden="true">{typedText}</span>
          <span
            aria-hidden="true"
            className="terminal-cursor inline-block w-[0.55ch] h-[1.05em] ml-1 align-[-0.14em] bg-[var(--accent-highlight)] rounded-[1px]"
          />
        </h1>
      </motion.div>

      <p className="mt-6 text-xs text-[var(--text-muted)] tracking-wide">
        {t.intro.skipHint}
      </p>
    </div>
  );
}
