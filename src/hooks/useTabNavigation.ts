import { useCallback, useEffect, useState } from 'react';
import { TAB_ORDER, type TabId } from '../data/types';
import { parseTabHash, syncTabHash } from '../utils/tabHash';

function isEditableElement(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) {
    return false;
  }
  const tagName = target.tagName;
  return (
    tagName === 'INPUT' ||
    tagName === 'TEXTAREA' ||
    tagName === 'SELECT' ||
    target.isContentEditable
  );
}

function isInsideTablist(target: EventTarget | null): boolean {
  return target instanceof HTMLElement && Boolean(target.closest('[role="tablist"]'));
}

export function useTabNavigation(isIntroActive: boolean) {
  const [activeTab, setActiveTab] = useState<TabId>(() =>
    typeof window !== 'undefined' ? parseTabHash(window.location.hash) : 'about',
  );

  const selectTab = useCallback((nextTab: TabId) => {
    setActiveTab(nextTab);
    syncTabHash(nextTab);
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      setActiveTab(parseTabHash(window.location.hash));
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    if (isIntroActive) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.ctrlKey || event.metaKey || event.altKey) {
        return;
      }

      if (isEditableElement(event.target)) {
        return;
      }

      if (event.key === '1') {
        selectTab('about');
        return;
      }
      if (event.key === '2') {
        selectTab('projects');
        return;
      }
      if (event.key === '3') {
        selectTab('contact');
        return;
      }

      if (isInsideTablist(event.target)) {
        return;
      }

      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        const currentIndex = TAB_ORDER.indexOf(activeTab);
        const delta = event.key === 'ArrowRight' ? 1 : -1;
        const nextIndex = (currentIndex + delta + TAB_ORDER.length) % TAB_ORDER.length;
        selectTab(TAB_ORDER[nextIndex]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTab, isIntroActive, selectTab]);

  return { activeTab, selectTab };
}
