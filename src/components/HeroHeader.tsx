import { motion } from 'motion/react';

const HERO_SPRING = {
  type: 'spring' as const,
  stiffness: 260,
  damping: 28,
  mass: 0.9,
};

interface HeroHeaderProps {
  readonly greeting: string;
  readonly reducedMotion: boolean;
}

export function HeroHeader({ greeting, reducedMotion }: HeroHeaderProps) {
  return (
    <header className="w-full max-w-[820px] mb-4 sm:mb-5 px-1">
      <motion.div
        layoutId="hero-greeting"
        layout="position"
        transition={reducedMotion ? { duration: 0 } : HERO_SPRING}
        className="flex items-center"
      >
        <h1 className="text-2xl sm:text-3xl font-medium tracking-tight text-[var(--text-primary)]">
          <span>{greeting}</span>
          <span
            aria-hidden="true"
            className="terminal-cursor inline-block w-[0.55ch] h-[1.05em] ml-1 align-[-0.14em] bg-[var(--accent-highlight)] rounded-[1px]"
          />
        </h1>
      </motion.div>
    </header>
  );
}
