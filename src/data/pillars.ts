import type { TechnicalPillar } from './types';

export const TECHNICAL_PILLARS: readonly TechnicalPillar[] = [
  {
    id: 'ml-statistics',
    index: '01',
    title: {
      en: 'Machine Learning & Statistics',
      'pt-BR': 'Machine Learning & Estatística',
    },
    summary: {
      en: 'End-to-end Python pipelines, exploratory data analysis, preprocessing, statistical validation (normality tests, Spearman correlation, hypothesis testing, multiple regression), and scoring interfaces.',
      'pt-BR':
        'Pipelines em Python, análise exploratória de dados (EDA), pré-processamento, validação estatística (testes de normalidade, correlação de Spearman, testes de hipóteses, regressão múltipla) e interfaces de scoring.',
    },
    stackLine: 'Python · Pandas · Linear Regression · Random Forest · XGBoost',
  },
  {
    id: 'software-systems',
    index: '02',
    title: {
      en: 'Software & Systems Engineering',
      'pt-BR': 'Desenvolvimento de Software & Sistemas',
    },
    summary: {
      en: 'Logic, data structures, OOP, REST API integration, Linux shell automation, and code quality with automated tests. Complementary knowledge in HTML, CSS, and JavaScript/Node.js.',
      'pt-BR':
        'Foco em lógica, estruturas de dados, POO, integração via APIs REST, automação com Shell Script em ambiente Linux e qualidade de código com testes automatizados. Base complementar em HTML, CSS e JS/Node.js.',
    },
    stackLine: 'Python · C · C++ · Rust · Go · Java · Shell · Node.js',
  },
  {
    id: 'data-versioning',
    index: '03',
    title: {
      en: 'Data & Versioning',
      'pt-BR': 'Dados & Versionamento',
    },
    summary: {
      en: 'Relational database querying and modeling, disciplined version control workflows, introductory containerization, and clear technical documentation.',
      'pt-BR':
        'Consultas e modelagem em bancos de dados relacionais, versionamento disciplinado com Git/GitHub, Docker (introdutório) e documentação técnica.',
    },
    stackLine: 'SQL · MySQL · Git · GitHub · Docker (intro)',
  },
  {
    id: 'ai-assisted-process',
    index: '04',
    title: {
      en: 'AI Agents & Spec-Driven Dev',
      'pt-BR': 'Agentes de IA & Spec-Driven Dev',
    },
    summary: {
      en: 'Hands-on orchestration of AI agents and subagents paired with Spec-Driven Development for structured architecture, diagnostics, automation, and high-velocity software delivery.',
      'pt-BR':
        'Orquestração prática de agentes e subagentes de IA aliada a Spec-Driven Development para arquitetura estruturada, diagnóstico, automação e entrega confiável de software.',
    },
    stackLine: 'Claude Code · OpenCode · Multi-Agent Orchestration · Spec-Driven Dev',
  },
];
