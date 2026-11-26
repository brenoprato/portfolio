# Plano de Implementação — Portfolio MVP

- [x] 1. Configurar projeto base, tokens Base2Tone e infraestrutura de testes
- [x] 1.1 Inicializar projeto Vite + React + TypeScript (strict) + Tailwind CSS v4 + Motion + Vitest
  - Criar `package.json`, `tsconfig.json` (modo strict), `vite.config.ts` (`base: process.env.VITE_BASE_PATH ?? './'`, plugins `@vitejs/plugin-react` e `@tailwindcss/vite`), `vitest.config.ts` (`environment: 'jsdom'`, `setupFiles`), `index.html` (metadados SEO/Open Graph e link de favicon) e `public/favicon.svg` minimalista coerente com Base2Tone Space Dark.
  - Instalar dependências (`react`, `react-dom`, `motion`, `@fontsource-variable/jetbrains-mono`, `lucide-react`) e devDependencies (`vite`, `@vitejs/plugin-react`, `typescript`, `@types/react`, `@types/react-dom`, `tailwindcss`, `@tailwindcss/vite`, `vitest`, `jsdom`, `@testing-library/react`, `@testing-library/user-event`, `@testing-library/jest-dom`).
  - Criar `src/test/setup.ts` configurando `@testing-library/jest-dom/vitest`, helper `mockMatchMedia(reduced: boolean)` e limpeza de `localStorage`, `sessionStorage` e `window.location.hash` entre testes.
  - _Requirements: 3.4, 9.1, 9.2, 9.3, 9.4_

- [x] 1.2 Criar tokens Base2Tone Space Dark e estilos globais com JetBrains Mono self-hosted
  - Criar `src/styles/tokens.css` com todas as CSS custom properties semânticas da paleta Base2Tone Space Dark sob `:root, [data-theme="base2tone-space-dark"]` (incluindo `--surface-subtle` derivado com `color-mix()` e garantia WCAG AA sobre `--surface`).
  - Criar `src/styles/index.css` com `@import "tailwindcss";`, mapeamento `@theme inline`, fonte JetBrains Mono, animação CSS de blink do cursor (desabilitada em `prefers-reduced-motion: reduce`), seleção e anel `:focus-visible`.
  - Criar `src/main.tsx` importando `@fontsource-variable/jetbrains-mono`, `src/styles/tokens.css` e `src/styles/index.css`.
  - _Requirements: 3.4, 4.7, 9.1, 9.3_

- [x] 2. Implementar camada de dados tipados, utilitários e internacionalização (i18n)
- [x] 2.1 Implementar contratos TypeScript e dados da fonte da verdade (`src/data/`) com testes de integridade
  - Criar `src/data/types.ts`, `src/data/profile.ts` (Breno Porto, UNIFESP Dez/2028, bio bilíngue, objetivo de estágio, certificação Six Sigma Green Belt, links GitHub/LinkedIn/e-mail, sem idade fixa e sem CV), `src/data/pillars.ts` (4 pilares técnicos) e `src/data/projects.ts` (`supervised-learning-burnout-study` e `mp3-tui` com métricas e destaques precisos).
  - Escrever e rodar `src/test/dataIntegrity.test.ts` validando traduções `en`/`pt-BR` não vazias, URLs oficiais e ausência de idade hardcoded.
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 6.1, 6.2, 7.1, 7.2_

- [x] 2.2 Implementar utilitários seguros (`storage.ts`, `tabHash.ts`) e testes unitários
  - Criar `src/utils/storage.ts` com wrappers `try/catch` para leitura/escrita segura em `localStorage` e `sessionStorage`.
  - Criar `src/utils/tabHash.ts` com `parseTabHash()` (normalização lowercase e fallback para `'about'`) e `syncTabHash()` usando `history.replaceState` seguro.
  - Escrever e rodar `src/test/tabHash.test.ts` validando hashes válidos, inválidos, vazios e degradação graciosa sob `SecurityError`.
  - _Requirements: 2.8, 4.2, 4.3, 4.4, 5.4_

- [x] 2.3 Implementar contexto de internacionalização `EN` / `PT-BR` (`src/i18n/`)
  - Criar `src/i18n/dictionaries.ts` com todas as strings de UI, abas, *status bar*, feedbacks de cópia, estado vazio de projetos e labels ARIA em `en` e `pt-BR`.
  - Criar `src/i18n/I18nContext.tsx` (`I18nProvider` e `useI18n`) inicializando em `'en'` por padrão, validando e persistindo em `localStorage` via `storage.ts` e sincronizando `document.documentElement.lang` e `document.title`.
  - _Requirements: 5.1, 5.2, 5.3, 5.4_

- [x] 3. Implementar hooks de movimento, intro, navegação e clipboard
- [x] 3.1 Implementar `useReducedMotion` e `useIntroSequence`
  - Criar `src/hooks/useReducedMotion.ts` escutando `matchMedia('(prefers-reduced-motion: reduce)')` com fallback seguro caso `matchMedia` esteja ausente.
  - Criar `src/hooks/useIntroSequence.ts` com a máquina de estados `typing -> pause -> done` para a assinatura fixa `"hello!, i'm breno!"`, persistência em `sessionStorage`, skip imediato por clique/tecla com cleanup de timers, salto automático sob `reducedMotion` e ação `replay()`.
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8_

- [x] 3.2 Implementar `useTabNavigation` e `useClipboard`
  - Criar `src/hooks/useTabNavigation.ts` sincronizando aba ativa com URL hash (`hashchange` + `syncTabHash`) e tratando atalhos globais (`1`, `2`, `3`, `ArrowLeft`, `ArrowRight`) apenas quando `!isIntroActive`, sem teclas modificadoras (`Ctrl`/`Meta`/`Alt`) e fora de elementos editáveis.
  - Criar `src/hooks/useClipboard.ts` usando `navigator.clipboard.writeText`, fallback síncrono com `<textarea>` off-screen + `document.execCommand('copy')`, estado `'idle' | 'copied' | 'error'` e cleanup seguro do temporizador (~2s) em cliques consecutivos e unmount.
  - _Requirements: 4.2, 4.3, 4.4, 4.5, 4.6, 8.2, 8.3, 8.4_

- [x] 4. Construir sequência de abertura e moldura Ghostty/macOS
- [x] 4.1 Implementar `IntroOverlay` e `HeroHeader` com transição *shared layout*
  - Criar `src/components/IntroOverlay.tsx` exibindo a digitação centralizada de `"hello!, i'm breno!"` com cursor em `--accent-highlight`, dica discreta de skip e `layoutId="hero-greeting"` com `layout="position"`.
  - Criar `src/components/HeroHeader.tsx` exibindo o hero minimalista acima da janela com o mesmo `layoutId="hero-greeting"` e `layout="position"` (evitando distorção de aspecto no texto).
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.6, 3.1_

- [x] 4.2 Implementar `TitleBar`, `TabBar`, `StatusBar` e `TerminalWindow`
  - Criar `src/components/TitleBar.tsx` com 3 controles decorativos monocromáticos Base2Tone (`aria-hidden="true"`), caminho `~/breno-porto`, botão de replay (oculto quando `reducedMotion === true`) e switch acessível `EN | PT`.
  - Criar `src/components/TabBar.tsx` seguindo WAI-ARIA Tabs (`role="tablist"`, `role="tab"`, `aria-selected`, `aria-controls`, roving `tabIndex`, `ArrowLeft`/`ArrowRight`/`Home`/`End` com foco programático) e indicador deslizante `<motion.span layoutId="active-tab-indicator">`.
  - Criar `src/components/StatusBar.tsx` exibindo `UNIFESP · CS '28`, dot em `--accent-highlight` + status de disponibilidade traduzido e dica `[1-3]` responsiva.
  - Criar `src/components/TerminalWindow.tsx` integrando a moldura mobile-first (`>= 320px`), `TitleBar`, `TabBar`, `AnimatePresence` para o `role="tabpanel"` ativo e `StatusBar`.
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 4.1, 4.2, 4.6, 4.7, 5.2_

- [x] 5. Implementar o conteúdo das abas (`About`, `Projects`, `Contact`)
- [x] 5.1 Implementar `AboutTab`
  - Criar `src/components/AboutTab.tsx` apresentando formação na UNIFESP (Dez/2028), objetivo de estágio, bio bilíngue, grid responsivo dos 4 pilares técnicos em estética estruturada de terminal e destaque limpo da certificação **Six Sigma Green Belt**.
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 3.5, 6.1, 6.2_

- [x] 5.2 Implementar `ProjectAccordionItem` e `ProjectsTab`
  - Criar `src/components/ProjectAccordionItem.tsx` com cabeçalho acessível (`aria-expanded`, `aria-controls`), expansão/recolhimento inline com física de mola (instantânea sob `reducedMotion`), destaques técnicos, stack e links (`target="_blank" rel="noopener noreferrer"`, omitindo `demoUrl` quando indefinido).
  - Criar `src/components/ProjectsTab.tsx` consumindo `PROJECTS` (aceitando prop opcional `projects` para testabilidade), estado multi-expansível (`Set<string>`) e estado vazio localizado.
  - _Requirements: 3.5, 7.1, 7.2, 7.3, 7.4, 7.5_

- [x] 5.3 Implementar `ContactTab`
  - Criar `src/components/ContactTab.tsx` exibindo nota de disponibilidade para estágio e canais diretos: E-mail (`brenoppprado@gmail.com` com link `mailto:` + botão de cópia em 1 clique + feedback animado + região `role="status" aria-live="polite"`), GitHub e LinkedIn com `target="_blank" rel="noopener noreferrer"`.
  - _Requirements: 1.1, 1.4, 3.5, 8.1, 8.2, 8.3, 8.4, 8.5_

- [x] 6. Integrar a aplicação completa em `App.tsx`
  - Conectar `<MotionConfig reducedMotion="user">`, `<I18nProvider>`, `<LayoutGroup>`, `useReducedMotion`, `useIntroSequence`, `useTabNavigation`, `IntroOverlay`, `HeroHeader` e `TerminalWindow` com animação *fade + scale* da janela após a conclusão da intro.
  - Garantir navegação 100% visual/clicável (com atalhos opcionais), sem nenhum prompt digitável ou parser de comandos.
  - _Requirements: 2.1, 2.2, 2.6, 2.7, 3.1, 3.6, 4.2, 4.5, 5.1_

- [x] 7. Implementar suíte completa de testes de componentes e integração
- [x] 7.1 Escrever testes de navegação por abas e internacionalização (`TabNavigation.test.tsx`, `I18n.test.tsx`)
  - Em `src/test/TabNavigation.test.tsx`: validar troca de abas por clique, atributos WAI-ARIA Tabs, atalhos `1`/`2`/`3` (ignorando modificadores `Ctrl`/`Meta`/`Alt`), `ArrowLeft`/`ArrowRight`/`Home`/`End`, abertura inicial via `#projects`, fallback `#invalid` e evento `hashchange`.
  - Em `src/test/I18n.test.tsx`: validar inicialização padrão `en`, switch `EN | PT`, tradução completa das abas/conteúdo/ARIA, assinatura fixa `"hello!, i'm breno!"`, atualização de `document.documentElement.lang` e `document.title`, persistência e fallback seguro em `localStorage`.
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 5.1, 5.2, 5.3, 5.4, 9.4_

- [x] 7.2 Escrever testes de projetos, contato/clipboard e intro/reduced-motion (`ProjectsTab.test.tsx`, `ContactTab.test.tsx`, `IntroSequence.test.tsx`)
  - Em `src/test/ProjectsTab.test.tsx`: validar `supervised-learning-burnout-study` e `mp3-tui`, expansão/recolhimento por clique e teclado (`Enter`/`Space`), `aria-expanded`, links externos seguros, omissão de `demoUrl` e estado vazio (`projects={[]}`).
  - Em `src/test/ContactTab.test.tsx`: validar cópia via Clipboard API, `copied!` / `copiado!`, `aria-live`, reversão após ~2s (fake timers), limpeza de timer em cliques repetidos/unmount, fallback via `execCommand` e estado de erro mantendo `mailto:` operacional.
  - Em `src/test/IntroSequence.test.tsx`: validar digitação inicial, skip por clique e tecla, persistência em `sessionStorage`, salto automático na 2ª visita da sessão, salto automático + botão de replay oculto sob `prefers-reduced-motion: reduce` e replay preservando aba ativa.
  - _Requirements: 2.1, 2.3, 2.4, 2.5, 2.6, 2.7, 7.2, 7.3, 7.4, 7.5, 8.1, 8.2, 8.3, 8.4, 8.5, 9.4_

- [x] 8. Validar tipagem estrita, suíte de testes e build de produção
  - Executar `npx tsc --noEmit`, `npm test` e `npm run build` confirmando zero erros de TypeScript, 100% dos testes verdes e bundle estático portável gerado em `dist/`.
  - Conferir todos os critérios de aceitação de `requirements.md` e `design.md` contra o código entregue.
  - _Requirements: 9.1, 9.2, 9.3, 9.4_
