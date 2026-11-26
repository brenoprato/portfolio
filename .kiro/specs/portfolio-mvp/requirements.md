# Documento de Requisitos — Portfolio MVP

## Introdução

Este documento define os requisitos funcionais e não-funcionais do MVP do portfólio web de **Breno Porto**: uma aplicação estática minimalista, rápida e memorável voltada a recrutadores e engenheiros, com foco em oportunidades de **estágio em Engenharia de Software (Backend)** ou **Machine Learning / Ciência de Dados**.

O portfólio combina a estética de um **terminal moderno estilo Ghostty/Kitty no macOS** (paleta **Base2Tone Space Dark**, tipografia **JetBrains Mono** self-hosted, janela com borda fina, *titlebar* minimalista e *status bar* estilo tmux/Yazi) com **animações fluidas com física de mola (spring transitions)**, mantendo navegação 100% visual, clicável e intuitiva — **sem** comportamento de terminal interativo ou digitação de comandos.

### Decisões Consolidadas (Grill-Me)
- **Destino da intro (`"hello!, i'm breno!"`):** pousa como hero minimalista **acima da janela do terminal**, mantendo a *titlebar* limpa (`~/breno-porto`, botão de replay e switch `EN | PT`).
- **Assinatura bilíngue da intro:** a frase `"hello!, i'm breno!"` permanece fixa nos dois idiomas (`EN` e `PT-BR`), inclusive no replay.
- **Detalhes de projetos:** expansão em **acordeão inline com mola (spring)** dentro da aba `projects`.
- **Tipografia e controles da janela:** **JetBrains Mono self-hosted** + 3 controles decorativos **monocromáticos sutis** na paleta Base2Tone.
- **Deep-linking e CV:** sincronização da aba ativa na URL via hash (`#about`, `#projects`, `#contact`) e **sem botão de download de CV/PDF** no MVP.

---

## Requisitos

### Requisito 1: Identidade, Conteúdo e Fonte da Verdade
**História de Usuário:** Como recrutador ou engenheiro avaliando o perfil de Breno Porto, eu quero visualizar informações profissionais precisas, atuais e concisas sobre sua formação, pilares técnicos e objetivo de estágio, para que eu consiga avaliar rapidamente seu encaixe para vagas de Backend ou ML/Ciência de Dados.

#### Critérios de Aceitação
1. QUANDO a aplicação renderizar qualquer informação biográfica, acadêmica ou de contato ENTÃO o sistema DEVE utilizar exclusivamente a fonte da verdade fornecida pelo usuário: nome `Breno Porto`, Bacharelado em Ciência da Computação na **UNIFESP** (previsão de conclusão **Dez/2028**), foco em Engenharia de Software e Machine Learning, objetivo de estágio em **Desenvolvimento de Software (Backend / Engenharia de Software)** ou **Machine Learning / Ciência de Dados**, e links `https://github.com/brenoprato`, `https://www.linkedin.com/in/breno-porto/` e `brenoppprado@gmail.com`.
2. QUANDO o sistema exibir informações pessoais ENTÃO o sistema NÃO DEVE conter idade fixa (hardcoded); no MVP, a idade DEVE ser omitida.
3. QUANDO o sistema exibir a apresentação técnica ENTÃO o sistema DEVE contemplar integralmente os 4 pilares técnicos (Machine Learning & Estatística, Desenvolvimento de Software & Sistemas, Dados & Versionamento, Desenvolvimento Assistido por IA & Processos) e a certificação **Six Sigma Green Belt**.
4. ENQUANTO o sistema estiver no escopo do MVP, o sistema NÃO DEVE exibir botão/link de download de CV (PDF), mantendo os canais restritos a GitHub, LinkedIn e E-mail.

---

### Requisito 2: Sequência de Abertura (Intro -> Hero Header) e Preferência de Movimento
**História de Usuário:** Como visitante abrindo o portfólio pela primeira vez na sessão, eu quero vivenciar uma abertura marcante e fluida estilo macOS sem ficar preso a uma animação longa, para que a primeira impressão seja memorável sem prejudicar a usabilidade.

#### Critérios de Aceitação
1. QUANDO o visitante abrir o site pela primeira vez na sessão (`sessionStorage` sem registro de conclusão) E `prefers-reduced-motion` não estiver definido como `reduce` ENTÃO o sistema DEVE exibir uma tela limpa digitando `"hello!, i'm breno!"` no centro com cursor de terminal piscando.
2. QUANDO a digitação de `"hello!, i'm breno!"` terminar ENTÃO o sistema DEVE aguardar uma breve pausa e transicionar suavemente o título para o **hero header minimalista acima da janela do terminal** utilizando animação com física de mola (*shared layout / `layoutId`*), enquanto a janela principal do portfólio surge com *fade + scale* suave.
3. QUANDO a intro for exibida na abertura ou via replay em qualquer idioma (`EN` ou `PT-BR`) ENTÃO o sistema DEVE manter o texto fixo `"hello!, i'm breno!"` como assinatura visual única.
4. ENQUANTO a sequência de intro estiver em andamento, QUANDO o visitante clicar/tocar em qualquer área da tela ou pressionar qualquer tecla ENTÃO o sistema DEVE pular imediatamente a animação, exibir o layout principal completo (hero + janela do terminal) e registrar a intro como concluída na sessão.
5. QUANDO a intro concluir naturalmente ou for pulada ENTÃO o sistema DEVE persistir o estado de conclusão em `sessionStorage`, de modo que recarregamentos subsequentes na mesma aba abram diretamente no layout principal.
6. SE `prefers-reduced-motion: reduce` estiver ativo no sistema operacional/navegador ENTÃO o sistema DEVE pular automaticamente a intro no carregamento, renderizar imediatamente o layout principal sem animações de movimento/mola e ocultar o botão de replay da *titlebar*.
7. QUANDO `prefers-reduced-motion` não estiver ativo e o visitante acionar o botão discreto de *replay* na *titlebar* ENTÃO o sistema DEVE reexecutar a sequência completa da intro (`digitação -> pausa -> transição em mola para o hero`) preservando a aba ativa selecionada.
8. SE o acesso a `sessionStorage` lançar exceção (ex.: política restritiva do navegador) ENTÃO o sistema DEVE degradar graciosamente em memória sem interromper a renderização ou a navegação.

---

### Requisito 3: Estética de Terminal Moderno (Ghostty/Kitty + macOS) e Paleta Base2Tone
**História de Usuário:** Como visitante em desktop ou dispositivo móvel, eu quero navegar em uma interface limpa inspirada em terminais modernos no macOS com paleta de baixo ruído visual, para que a leitura seja confortável e visualmente distinta sem exigir comandos digitados.

#### Critérios de Aceitação
1. QUANDO a interface principal for renderizada ENTÃO o sistema DEVE apresentar o hero `"hello!, i'm breno!"` acima de uma janela de terminal centralizada com cantos arredondados suaves, borda fina de `1px`, *titlebar* estilo macOS e *status bar* discreta no rodapé.
2. QUANDO a *titlebar* for renderizada ENTÃO o sistema DEVE exibir: à esquerda, 3 controles decorativos monocromáticos sutis derivados da paleta Base2Tone (`aria-hidden="true"`); título discreto `~/breno-porto`; à direita, o botão discreto de *replay* (quando permitido por movimento) e o switch de idioma `EN | PT`.
3. QUANDO a *status bar* no rodapé da janela for renderizada ENTÃO o sistema DEVE exibir `UNIFESP · CS '28`, um indicador sutil de disponibilidade para estágio (`open to internships` em EN / `disponível para estágio` em PT-BR) e uma dica discreta de atalhos `[1-3]` (adequada à largura da tela).
4. QUANDO os estilos forem aplicados ENTÃO o sistema DEVE carregar a tipografia **JetBrains Mono self-hosted** e mapear 100% das cores da paleta **Base2Tone Space Dark** (`#24242e`, `#333342`, `#515167`, `#5b5b76`, `#ebebff`, `#cecee3`, `#a1a1b5`, `#8a8aa3`, `#7676f4`, `#6363ee`, `#fe8c52`, `#ec7336`) via CSS custom properties semânticas (`--bg`, `--surface`, `--border`, `--text-primary`, `--text-muted`, `--accent-primary`, `--accent-highlight` e variantes), preparadas para futuras paletas Base2Tone sem refatoração de componentes.
5. QUANDO o site for visualizado em telas estreitas (mobile-first, a partir de `320px` de largura) ENTÃO a janela DEVE adaptar-se suavemente à largura disponível sem overflow horizontal, preservando legibilidade, hierarquia visual e áreas clicáveis confortáveis ao toque.
6. ENQUANTO o visitante interagir com o portfólio, o sistema NÃO DEVE exigir digitação de comandos nem implementar emulador/parser de terminal interativo.

---

### Requisito 4: Navegação por Abas, Atalhos de Teclado, Deep-Linking e Acessibilidade
**História de Usuário:** Como recrutador ou engenheiro navegando com mouse, toque ou teclado (ou abrindo um link direto para uma seção), eu quero alternar entre `about`, `projects` e `contact` com feedback fluido e URL compartilhável, para que eu chegue rapidamente à informação que procuro.

#### Critérios de Aceitação
1. QUANDO a janela principal estiver visível ENTÃO o sistema DEVE exibir uma barra de abas no topo interno da janela com as 3 opções: `01 about`, `02 projects`, `03 contact` (em `EN`) e `01 sobre`, `02 projetos`, `03 contato` (em `PT-BR`).
2. QUANDO o visitante selecionar uma aba diferente ENTÃO o sistema DEVE deslizar o indicador ativo usando animação *shared layout spring* (`layoutId`), animar suavemente a entrada/saída do painel da aba (ou trocar instantaneamente se `prefers-reduced-motion: reduce`) e atualizar o hash da URL para `#about`, `#projects` ou `#contact`.
3. QUANDO o visitante abrir a aplicação com um hash válido na URL (`#about`, `#projects` ou `#contact`) ou navegar usando os botões Voltar/Avançar do navegador (`hashchange`) ENTÃO o sistema DEVE ativar automaticamente a aba correspondente.
4. SE o hash da URL estiver ausente, vazio ou contiver um valor desconhecido/inválido (ex.: `#inexistente`) ENTÃO o sistema DEVE selecionar a aba padrão `about` sem lançar erro.
5. ENQUANTO a intro não estiver ativa e o foco não estiver em elemento editável e nenhuma tecla modificadora (`Ctrl`, `Meta`, `Alt`) estiver pressionada, QUANDO o visitante pressionar `1`, `2` ou `3` ENTÃO o sistema DEVE ativar respectivamente `about`, `projects` ou `contact`.
6. QUANDO o visitante pressionar `ArrowLeft` ou `ArrowRight` (na barra de abas ou como atalho sem modificadores e sem conflito com campos editáveis) ENTÃO o sistema DEVE navegar ciclicamente para a aba anterior ou próxima; QUANDO pressionar `Home` ou `End` com foco no `tablist` ENTÃO o sistema DEVE ir para a primeira ou última aba.
7. QUANDO a barra de abas e o painel forem renderizados ENTÃO o sistema DEVE implementar integralmente o padrão WAI-ARIA Tabs (`role="tablist"`, `role="tab"`, `aria-selected`, `aria-controls`, roving `tabIndex`, `role="tabpanel"`, `aria-labelledby`) e exibir indicador claro de foco (`:focus-visible`) em todos os elementos interativos.

---

### Requisito 5: Internacionalização (i18n `EN` / `PT-BR`)
**História de Usuário:** Como recrutador internacional ou brasileiro, eu quero alternar entre Inglês e Português a qualquer momento com tradução natural e persistência da minha preferência, para que eu leia o portfólio no idioma mais confortável.

#### Critérios de Aceitação
1. QUANDO o visitante acessar o site pela primeira vez sem preferência salva em `localStorage` ENTÃO o sistema DEVE inicializar no idioma padrão **Inglês (`en`)**.
2. QUANDO o visitante clicar no switch `EN | PT` na *titlebar* ENTÃO o sistema DEVE alternar imediatamente entre `en` e `pt-BR`, traduzindo 100% do conteúdo visível (abas, bio, pilares técnicos, projetos, contato, *status bar*, feedbacks de ação e labels de acessibilidade `aria-label`), exceto a assinatura fixa `"hello!, i'm breno!"`, nomes próprios e identificadores de repositórios.
3. QUANDO o idioma for alterado ENTÃO o sistema DEVE persistir a escolha em `localStorage` e atualizar os atributos `document.documentElement.lang` (`en` ou `pt-BR`) e `document.title`.
4. SE o valor salvo em `localStorage` for inválido ou se o acesso a `localStorage` falhar por restrição do navegador ENTÃO o sistema DEVE fazer fallback silencioso para `en` sem quebrar a aplicação.

---

### Requisito 6: Aba `01 about` (`01 sobre`)
**História de Usuário:** Como recrutador ou tech lead, eu quero ler rapidamente quem é Breno, sua formação na UNIFESP, seu objetivo de estágio e seus 4 pilares técnicos com Six Sigma Green Belt, para que eu avalie sua base teórica e prática em menos de um minuto.

#### Critérios de Aceitação
1. QUANDO a aba `about` estiver ativa ENTÃO o sistema DEVE exibir a bio concisa bilíngue destacando o Bacharelado em Ciência da Computação na UNIFESP (Dez/2028) e a busca por estágio em Engenharia de Software (Backend) ou Machine Learning / Ciência de Dados.
2. QUANDO a seção de pilares técnicos for renderizada ENTÃO o sistema DEVE apresentar os 4 pilares (Machine Learning & Estatística, Desenvolvimento de Software & Sistemas, Dados & Versionamento, Desenvolvimento Assistido por IA & Processos) e a certificação **Six Sigma Green Belt** em layout estruturado e escaneável inspirado em saída de terminal, evitando excesso de badges coloridos e poluição visual.

---

### Requisito 7: Aba `02 projects` (`02 projetos`) — Dados Tipados e Acordeão Inline
**História de Usuário:** Como engenheiro ou recrutador técnico, eu quero explorar os projetos de Breno e expandir seus detalhes técnicos e links para o GitHub sem sair do fluxo da página, para que eu consiga avaliar profundidade técnica, stack e resultados rapidamente.

#### Critérios de Aceitação
1. QUANDO os projetos forem definidos no código ENTÃO o sistema DEVE utilizar uma arquitetura orientada a dados em `src/data/projects.ts` com tipagem TypeScript estrita (incluindo `id`, título, resumo bilíngue, stack, destaques técnicos bilíngues, categoria/domínio, status, ano, URL do repositório e URL de demo opcional), permitindo adicionar novos projetos apenas inserindo um novo item no array.
2. QUANDO a aba `projects` estiver ativa ENTÃO o sistema DEVE listar os 2 projetos iniciais com informações técnicas fiéis aos respectivos repositórios:
   - **`supervised-learning-burnout-study`** (`https://github.com/brenoprato/supervised-learning-burnout-study`): pipeline modular de Machine Learning em Python (Pandas, Regressão Linear, Random Forest, XGBoost) sobre o *Remote Work Health Impact Survey 2025* (3.157 registros), EDA, pré-processamento, validação cruzada K-Fold (k=5), análise de equidade (ODS 3, 8 e 10) e função de scoring contínuo (`predict_burnout`), trabalho final de IA na UNIFESP.
   - **`mp3-tui`** (`https://github.com/brenoprato/mp3-tui`): player de música minimalista de terminal em Rust (`Ratatui`, `Rodio`, `rustfft`, `lofty`, `walkdir`) com interface inspirada no Yazi, biblioteca local baseada em fontes com busca instantânea, visualizador de espectro FFT em tempo real via ring buffer atômico lock-free, persistência XDG atômica (TOML + cache JSON invalidado por tamanho/mtime) e suporte multiplataforma.
3. QUANDO o visitante clicar ou pressionar `Enter`/`Space` em um projeto ENTÃO o sistema DEVE expandir ou recolher suavemente os detalhes técnicos em um **acordeão inline com animação spring** (ou instantâneo em `prefers-reduced-motion: reduce`), atualizando `aria-expanded` e `aria-controls` e exibindo destaques técnicos, stack e link direto para o repositório no GitHub (`target="_blank" rel="noopener noreferrer"`).
4. SE um projeto não possuir link opcional (como `demoUrl`) ENTÃO o sistema DEVE omitir esse link sem renderizar controles vazios ou quebrados.
5. SE a lista de projetos estiver vazia ENTÃO o sistema DEVE exibir um estado vazio limpo e localizado em estética de terminal sem quebrar o layout.

---

### Requisito 8: Aba `03 contact` (`03 contato`) e Cópia de E-mail
**História de Usuário:** Como recrutador interessado em entrar em contato, eu quero copiar o e-mail com um clique ou abrir diretamente o cliente de e-mail, GitHub ou LinkedIn com feedback visual claro, para que eu consiga iniciar uma conversa sem atrito.

#### Critérios de Aceitação
1. QUANDO a aba `contact` estiver ativa ENTÃO o sistema DEVE exibir os 3 canais diretos — E-mail (`brenoppprado@gmail.com`), GitHub (`https://github.com/brenoprato`) e LinkedIn (`https://www.linkedin.com/in/breno-porto/`) — além de uma nota direta e localizada informando disponibilidade para estágio em Backend / Engenharia de Software ou Machine Learning / Ciência de Dados.
2. QUANDO o visitante clicar no botão de copiar e-mail ENTÃO o sistema DEVE copiar `brenoppprado@gmail.com` via Clipboard API (`navigator.clipboard.writeText`), exibir feedback visual animado (`copied!` em EN / `copiado!` em PT-BR), anunciar a confirmação em região acessível (`aria-live="polite"`) e reverter automaticamente ao estado padrão após ~2 segundos.
3. QUANDO o visitante clicar no botão de copiar múltiplas vezes em sequência ou trocar de aba antes do término do temporizador ENTÃO o sistema DEVE limpar o temporizador anterior sem gerar vazamento de memória ou atualização de estado inconsistente.
4. SE `navigator.clipboard.writeText` falhar ou não estiver disponível no navegador ENTÃO o sistema DEVE tentar o fallback compatível via seleção/cópia temporária; SE o fallback também falhar ENTÃO o sistema DEVE exibir feedback discreto de erro (`copy failed` / `erro ao copiar`) mantendo o endereço de e-mail visível e selecionável e o link `mailto:brenoppprado@gmail.com` operacional.
5. QUANDO o visitante clicar nos links de GitHub ou LinkedIn ENTÃO o sistema DEVE abri-los em nova aba com `target="_blank" rel="noopener noreferrer"`.

---

### Requisito 9: Qualidade Técnica, Portabilidade, Performance e Testes
**História de Usuário:** Como mantenedor do projeto, eu quero uma base de código estática tipada, modular, testada e portável entre provedores de hospedagem, para que evoluções futuras (novos projetos ou novas paletas Base2Tone) sejam simples e seguras.

#### Critérios de Aceitação
1. QUANDO o projeto for estruturado ENTÃO o sistema DEVE usar **Vite + React + TypeScript (modo strict) + Tailwind CSS + Motion (`motion/react`)**, com separação explícita entre dados (`src/data/`), traduções (`src/i18n/`), tokens visuais (`src/styles/`), hooks e componentes.
2. QUANDO o build de produção for gerado (`npm run build`) ENTÃO o bundle estático DEVE compilar sem erros de TypeScript (`tsc --noEmit`) e funcionar tanto hospedado na raiz (`/`) quanto em subpath (via configuração portável de `base` no Vite).
3. QUANDO os estilos forem auditados ENTÃO o sistema DEVE manter contraste de texto adequado (WCAG AA) entre elementos textuais e superfícies da paleta Base2Tone Space Dark e fornecer metadados HTML básicos (`title`, `description`, Open Graph e favicon minimalista).
4. QUANDO a suíte de testes automatizados for executada (`npm test`) ENTÃO os testes (Vitest + React Testing Library) DEVEM validar com sucesso: troca de abas (clique, atalhos de teclado e hash na URL), alternância `EN/PT-BR` com persistência em `localStorage`, expansão do acordeão de projetos, cópia de e-mail (sucesso e fallback/erro) e comportamento de `prefers-reduced-motion` + skip/replay da intro.

---

## Fora de Escopo (MVP)
- Terminal interativo ou parser de comandos digitados.
- Formulário de contato com backend, envio server-side ou banco de dados.
- Blog, CMS ou página de artigos.
- Seletor interativo de múltiplos temas na UI (apenas manter tokens Base2Tone desacoplados em CSS variables para a v2).
- Botão ou hospedagem de currículo em PDF no MVP.
