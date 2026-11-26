import { useRef, type KeyboardEvent } from 'react';
import { motion } from 'motion/react';
import { TAB_ORDER, type TabId } from '../data/types';
import { useI18n } from '../i18n/I18nContext';

const TAB_INDICES: Readonly<Record<TabId, string>> = {
  about: '01',
  projects: '02',
  contact: '03',
};

const TAB_SPRING = {
  type: 'spring' as const,
  stiffness: 420,
  damping: 34,
  mass: 0.8,
};

interface TabBarProps {
  readonly activeTab: TabId;
  readonly onSelectTab: (tab: TabId) => void;
  readonly reducedMotion: boolean;
}

export function TabBar({ activeTab, onSelectTab, reducedMotion }: TabBarProps) {
  const { t } = useI18n();
  const tabRefs = useRef<Partial<Record<TabId, HTMLButtonElement | null>>>({});

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const currentIndex = TAB_ORDER.indexOf(activeTab);
    let nextTab: TabId | null = null;

    if (event.key === 'ArrowRight') {
      nextTab = TAB_ORDER[(currentIndex + 1) % TAB_ORDER.length];
    } else if (event.key === 'ArrowLeft') {
      nextTab = TAB_ORDER[(currentIndex - 1 + TAB_ORDER.length) % TAB_ORDER.length];
    } else if (event.key === 'Home') {
      nextTab = TAB_ORDER[0];
    } else if (event.key === 'End') {
      nextTab = TAB_ORDER[TAB_ORDER.length - 1];
    }

    if (nextTab) {
      event.preventDefault();
      onSelectTab(nextTab);
      tabRefs.current[nextTab]?.focus();
    }
  };

  return (
    <div
      role="tablist"
      aria-label={t.tabs.navLabel}
      onKeyDown={handleKeyDown}
      className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 border-b border-[var(--border)] bg-[var(--surface-subtle)] overflow-x-auto"
    >
      {TAB_ORDER.map((tabId) => {
        const isActive = activeTab === tabId;
        return (
          <button
            key={tabId}
            ref={(el) => {
              tabRefs.current[tabId] = el;
            }}
            id={`tab-${tabId}`}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-controls={`panel-${tabId}`}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onSelectTab(tabId)}
            className={`relative px-2.5 sm:px-3.5 py-2.5 min-h-[44px] flex items-center text-xs sm:text-sm whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
              isActive
                ? 'text-[var(--text-primary)] font-medium'
                : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
            }`}
          >
            <span
              className={`mr-1.5 text-[11px] ${
                isActive ? 'text-[var(--accent-highlight)]' : 'text-[var(--text-subtle)]'
              }`}
            >
              {TAB_INDICES[tabId]}
            </span>
            <span>{t.tabs.labels[tabId]}</span>

            {isActive && (
              <motion.span
                layoutId="active-tab-indicator"
                transition={reducedMotion ? { duration: 0 } : TAB_SPRING}
                aria-hidden="true"
                className="absolute inset-x-1 bottom-0 h-[2px] rounded-full bg-[var(--accent-primary)]"
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
