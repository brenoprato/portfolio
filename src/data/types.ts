export type Locale = 'en' | 'pt-BR';

export const TAB_ORDER = ['about', 'projects', 'contact'] as const;
export type TabId = (typeof TAB_ORDER)[number];

export type IntroPhase = 'typing' | 'pause' | 'done';
export type CopyStatus = 'idle' | 'copied' | 'error';
export type ProjectStatus = 'completed' | 'active' | 'archived';

export type LocalizedText = Readonly<Record<Locale, string>>;
export type LocalizedList = Readonly<Record<Locale, readonly string[]>>;

export interface TechnicalPillar {
  readonly id: string;
  readonly index: string;
  readonly title: LocalizedText;
  readonly summary: LocalizedText;
  readonly stackLine: string;
}

export interface Project {
  readonly id: string;
  readonly name: string;
  readonly category: LocalizedText;
  readonly year: string;
  readonly status: ProjectStatus;
  readonly summary: LocalizedText;
  readonly highlights: LocalizedList;
  readonly stack: readonly string[];
  readonly repoUrl: string;
  readonly demoUrl?: string;
}

export interface SideQuest {
  readonly id: string;
  readonly label: LocalizedText;
  readonly detail: LocalizedText;
}

export interface ProfileData {
  readonly name: string;
  readonly greetingSignature: string;
  readonly terminalPath: string;
  readonly education: {
    readonly institution: string;
    readonly degree: LocalizedText;
    readonly expectedGraduation: LocalizedText;
    readonly shortBadge: string;
  };
  readonly tagline: LocalizedText;
  readonly bio: LocalizedList;
  readonly sideQuests: readonly SideQuest[];
  readonly contactNote: LocalizedText;
  readonly contact: {
    readonly email: string;
    readonly githubUrl: string;
    readonly githubDisplay: string;
    readonly linkedinUrl: string;
    readonly linkedinDisplay: string;
  };
}
