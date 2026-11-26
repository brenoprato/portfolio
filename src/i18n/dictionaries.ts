import type { Locale, ProjectStatus, TabId } from '../data/types';

export interface UiDictionary {
  readonly pageTitle: string;
  readonly intro: {
    readonly skipHint: string;
    readonly skipAriaLabel: string;
  };
  readonly titlebar: {
    readonly replayLabel: string;
    readonly languageGroupLabel: string;
    readonly switchToEn: string;
    readonly switchToPt: string;
  };
  readonly tabs: {
    readonly navLabel: string;
    readonly labels: Readonly<Record<TabId, string>>;
  };
  readonly about: {
    readonly focusLabel: string;
    readonly educationLabel: string;
    readonly bioSection: string;
    readonly pillarsSection: string;
    readonly sideQuestsSection: string;
  };
  readonly projects: {
    readonly sectionHeader: string;
    readonly emptyState: string;
    readonly highlightsLabel: string;
    readonly stackLabel: string;
    readonly repoLink: string;
    readonly demoLink: string;
    readonly expandLabel: string;
    readonly collapseLabel: string;
    readonly statusLabels: Readonly<Record<ProjectStatus, string>>;
  };
  readonly contact: {
    readonly sectionHeader: string;
    readonly summonTitle: string;
    readonly emailLabel: string;
    readonly githubLabel: string;
    readonly linkedinLabel: string;
    readonly copy: string;
    readonly copied: string;
    readonly copyFailed: string;
    readonly copyAriaLabel: string;
    readonly mailtoAriaLabel: string;
    readonly openExternalSuffix: string;
  };
  readonly status: {
    readonly bonfireLit: string;
    readonly shortcutsHint: string;
    readonly shortcutsTitle: string;
  };
}

export const DICTIONARIES: Readonly<Record<Locale, UiDictionary>> = {
  en: {
    pageTitle: 'Breno Porto — Software Engineering & ML',
    intro: {
      skipHint: 'click or press any key to skip',
      skipAriaLabel: 'Skip opening animation',
    },
    titlebar: {
      replayLabel: 'Replay opening animation',
      languageGroupLabel: 'Language selector',
      switchToEn: 'Switch language to English',
      switchToPt: 'Switch language to Portuguese',
    },
    tabs: {
      navLabel: 'Portfolio sections',
      labels: {
        about: 'about',
        projects: 'projects',
        contact: 'contact',
      },
    },
    about: {
      focusLabel: 'focus',
      educationLabel: 'education',
      bioSection: '// overview',
      pillarsSection: '// technical pillars',
      sideQuestsSection: '// side quests',
    },
    projects: {
      sectionHeader: '// selected repositories',
      emptyState: 'No projects published yet. Add items in src/data/projects.ts.',
      highlightsLabel: 'technical highlights',
      stackLabel: 'stack',
      repoLink: 'view on github',
      demoLink: 'live demo',
      expandLabel: 'Expand project details',
      collapseLabel: 'Collapse project details',
      statusLabels: {
        completed: 'completed',
        active: 'active',
        archived: 'archived',
      },
    },
    contact: {
      sectionHeader: '// direct channels',
      summonTitle: 'summon sign',
      emailLabel: 'email',
      githubLabel: 'github',
      linkedinLabel: 'linkedin',
      copy: 'copy',
      copied: 'copied!',
      copyFailed: 'copy failed',
      copyAriaLabel: 'Copy email address',
      mailtoAriaLabel: 'Send email to Breno Porto',
      openExternalSuffix: '(opens in new tab)',
    },
    status: {
      bonfireLit: 'bonfire lit',
      shortcutsHint: '[1-3]',
      shortcutsTitle: 'Keyboard shortcuts: 1, 2, 3 or arrow keys',
    },
  },
  'pt-BR': {
    pageTitle: 'Breno Porto — Engenharia de Software & ML',
    intro: {
      skipHint: 'clique ou pressione qualquer tecla para pular',
      skipAriaLabel: 'Pular animação de abertura',
    },
    titlebar: {
      replayLabel: 'Rever animação de abertura',
      languageGroupLabel: 'Seletor de idioma',
      switchToEn: 'Mudar idioma para Inglês',
      switchToPt: 'Mudar idioma para Português',
    },
    tabs: {
      navLabel: 'Seções do portfólio',
      labels: {
        about: 'sobre',
        projects: 'projetos',
        contact: 'contato',
      },
    },
    about: {
      focusLabel: 'foco',
      educationLabel: 'formação',
      bioSection: '// resumo',
      pillarsSection: '// pilares técnicos',
      sideQuestsSection: '// side quests',
    },
    projects: {
      sectionHeader: '// repositórios em destaque',
      emptyState: 'Nenhum projeto publicado ainda. Adicione itens em src/data/projects.ts.',
      highlightsLabel: 'destaques técnicos',
      stackLabel: 'stack',
      repoLink: 'ver no github',
      demoLink: 'demo',
      expandLabel: 'Expandir detalhes do projeto',
      collapseLabel: 'Recolher detalhes do projeto',
      statusLabels: {
        completed: 'concluído',
        active: 'ativo',
        archived: 'arquivado',
      },
    },
    contact: {
      sectionHeader: '// canais diretos',
      summonTitle: 'sinal de invocação',
      emailLabel: 'e-mail',
      githubLabel: 'github',
      linkedinLabel: 'linkedin',
      copy: 'copiar',
      copied: 'copiado!',
      copyFailed: 'erro ao copiar',
      copyAriaLabel: 'Copiar endereço de e-mail',
      mailtoAriaLabel: 'Enviar e-mail para Breno Porto',
      openExternalSuffix: '(abre em nova aba)',
    },
    status: {
      bonfireLit: 'fogueira acesa',
      shortcutsHint: '[1-3]',
      shortcutsTitle: 'Atalhos de teclado: 1, 2, 3 ou setas',
    },
  },
};
