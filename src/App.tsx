import { LayoutGroup, MotionConfig } from 'motion/react';
import { HeroHeader } from './components/HeroHeader';
import { IntroOverlay } from './components/IntroOverlay';
import { TerminalWindow } from './components/TerminalWindow';
import { PROFILE } from './data/profile';
import { useIntroSequence } from './hooks/useIntroSequence';
import { useReducedMotion } from './hooks/useReducedMotion';
import { useTabNavigation } from './hooks/useTabNavigation';
import { I18nProvider } from './i18n/I18nContext';

function PortfolioShell() {
  const reducedMotion = useReducedMotion();
  const { isIntroActive, typedText, skip, replay } = useIntroSequence(
    PROFILE.greetingSignature,
    reducedMotion,
  );
  const { activeTab, selectTab } = useTabNavigation(isIntroActive);

  return (
    <LayoutGroup>
      {isIntroActive ? (
        <IntroOverlay typedText={typedText} onSkip={skip} />
      ) : (
        <div className="min-h-dvh w-full flex flex-col items-center justify-center px-3 py-6 sm:px-6 sm:py-12">
          <HeroHeader greeting={PROFILE.greetingSignature} reducedMotion={reducedMotion} />
          <TerminalWindow
            activeTab={activeTab}
            onSelectTab={selectTab}
            onReplayIntro={replay}
            reducedMotion={reducedMotion}
          />
        </div>
      )}
    </LayoutGroup>
  );
}

export function App() {
  return (
    <MotionConfig reducedMotion="user">
      <I18nProvider>
        <PortfolioShell />
      </I18nProvider>
    </MotionConfig>
  );
}

export default App;
