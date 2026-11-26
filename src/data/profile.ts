import type { ProfileData } from './types';

export const PROFILE: ProfileData = {
  name: 'Breno Porto',
  greetingSignature: "hello!, i'm breno!",
  terminalPath: '~/breno-porto',
  education: {
    institution: 'UNIFESP',
    degree: {
      en: 'B.Sc. in Computer Science',
      'pt-BR': 'Bacharelado em Ciência da Computação',
    },
    expectedGraduation: {
      en: 'Expected Dec/2028',
      'pt-BR': 'Previsão Dez/2028',
    },
    shortBadge: "UNIFESP · CS '28",
  },
  tagline: {
    en: 'Building software systems, ML pipelines, and resting at the occasional bonfire.',
    'pt-BR':
      'Construindo sistemas, pipelines de ML e descansando numa fogueira de vez em quando.',
  },
  bio: {
    en: [
      'Computer Science undergraduate at UNIFESP (Dec/2028), into Software Engineering, Machine Learning, and orchestrating AI agents with Spec-Driven Development.',
      'I like digging into how things work under the hood—pairing algorithms, data structures, and statistics to write reliable, testable, and well-documented code without overcomplicating it.',
    ],
    'pt-BR': [
      'Estudante de Bacharelado em Ciência da Computação na UNIFESP (Dez/2028), focado em Engenharia de Software, Machine Learning e orquestração de agentes de IA com Spec-Driven Development.',
      'Gosto de entender como as coisas funcionam por baixo dos panos — juntando algoritmos, estruturas de dados e estatística para escrever código confiável, testável e bem documentado, sem complicar à toa.',
    ],
  },
  sideQuests: [
    {
      id: 'gaming',
      label: {
        en: 'gaming',
        'pt-BR': 'videogames',
      },
      detail: {
        en: 'Big fan of video games—especially Dark Souls and Elden Ring. Nothing teaches patience and debugging quite like a tough boss fight.',
        'pt-BR':
          'Curto bastante jogar videogame — especialmente Dark Souls e Elden Ring. Nada ensina paciência e debugging melhor do que um boss difícil.',
      },
    },
    {
      id: 'tennis',
      label: {
        en: 'sports',
        'pt-BR': 'esportes',
      },
      detail: {
        en: 'I play tennis to step away from the screen, clear my head, and keep the momentum going off the keyboard.',
        'pt-BR':
          'Pratico tênis para sair um pouco da frente da tela, espairecer a mente e manter o ritmo fora do teclado.',
      },
    },
  ],
  contactNote: {
    en: 'Always up for talking about software engineering, machine learning, AI agents, or trading Elden Ring builds. Feel free to reach out anytime.',
    'pt-BR':
      'Sempre aberto para trocar ideia sobre engenharia de software, machine learning, agentes de IA ou builds de Elden Ring. Fique à vontade para mandar uma mensagem.',
  },
  contact: {
    email: 'brenoppprado@gmail.com',
    githubUrl: 'https://github.com/brenoprato',
    githubDisplay: 'github.com/brenoprato',
    linkedinUrl: 'https://www.linkedin.com/in/breno-porto/',
    linkedinDisplay: 'linkedin.com/in/breno-porto',
  },
};
