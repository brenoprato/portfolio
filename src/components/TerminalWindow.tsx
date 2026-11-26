import { AnimatePresence, motion } from 'motion/react';
import { PROFILE } from '../data/profile';
import type { TabId } from '../data/types';
import { AboutTab } from './AboutTab';
import { ContactTab } from './ContactTab';
import { ProjectsTab } from './ProjectsTab';
import { StatusBar } from './StatusBar';
import { TabBar } from './TabBar';
import { TitleBar } from './TitleBar';

const WINDOW_SPRING = {
  type: 'spring' as const,
  stiffness: 240,
  damping: 26,
  delay: 0.08,
};

interface TerminalWindowProps {
  readonly activeTab: TabId;
  readonly onSelectTab: (tab: TabId) => void;
  readonly onReplayIntro: () => void;
  readonly reducedMotion: boolean;
}

export function TerminalWindow({
  activeTab,
  onSelectTab,
  onReplayIntro,
  reducedMotion,
}: TerminalWindowProps) {
  return (
    <motion.main
      initial={reducedMotion ? false : { opacity: 0, scale: 0.97, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={reducedMotion ? { duration: 0 } : WINDOW_SPRING}
      className="w-full max-w-[820px] rounded-xl border border-[var(--border)] bg-[var(--bg)] shadow-[0_24px_70px_-18px_rgba(0,0,0,0.65)] overflow-hidden"
    >
      <TitleBar
        pathLabel={PROFILE.terminalPath}
        showReplay={!reducedMotion}
        onReplay={onReplayIntro}
      />

      <TabBar activeTab={activeTab} onSelectTab={onSelectTab} reducedMotion={reducedMotion} />

      <div className="p-4 sm:p-6 min-h-[340px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.section
            key={activeTab}
            id={`panel-${activeTab}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeTab}`}
            tabIndex={0}
            initial={reducedMotion ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? undefined : { opacity: 0, y: -4 }}
            transition={reducedMotion ? { duration: 0 } : { duration: 0.16, ease: 'easeOut' }}
            className="focus:outline-none"
          >
            {activeTab === 'about' && <AboutTab />}
            {activeTab === 'projects' && <ProjectsTab reducedMotion={reducedMotion} />}
            {activeTab === 'contact' && <ContactTab />}
          </motion.section>
        </AnimatePresence>
      </div>

      <StatusBar />
    </motion.main>
  );
}
