import type { Project } from './types';

export const PROJECTS: readonly Project[] = [
  {
    id: 'supervised-learning-burnout-study',
    name: 'supervised-learning-burnout-study',
    category: {
      en: 'Machine Learning & Data Science',
      'pt-BR': 'Machine Learning & Ciência de Dados',
    },
    year: '2026',
    status: 'completed',
    summary: {
      en: 'End-to-end Python ML pipeline for employee burnout risk prediction with EDA, cross-validation, fairness checks, and a continuous scoring interface (UNIFESP AI final project).',
      'pt-BR':
        'Pipeline modular de Machine Learning em Python para predição de risco de burnout com EDA, validação cruzada, análise de equidade e interface de scoring contínuo (trabalho final de IA na UNIFESP).',
    },
    highlights: {
      en: [
        'Modular 5-stage pipeline (eda, preprocessing, training, evaluation, scoring) over the Remote Work Health Impact Survey 2025 dataset (3,157 records across remote, hybrid, and on-site work).',
        'Benchmark across Linear Regression (baseline: MAE 0.635, RMSE 0.764), Random Forest (MAE 0.665), and XGBoost (MAE 0.640; 5-fold CV MAE 0.596 ± 0.009).',
        'Feature importance inspection (Work_Arrangement, Age, Hours_Per_Week), equity analysis aligned with UN SDGs 3, 8, and 10, and predict_burnout() returning a normalized 0–1 risk score.',
      ],
      'pt-BR': [
        'Pipeline modular em 5 etapas (eda, preprocessing, training, evaluation, scoring) sobre o Remote Work Health Impact Survey 2025 (3.157 registros em regimes remoto, híbrido e presencial).',
        'Benchmark comparativo entre Regressão Linear (baseline: MAE 0,635, RMSE 0,764), Random Forest (MAE 0,665) e XGBoost (MAE 0,640; validação cruzada k=5 com MAE 0,596 ± 0,009).',
        'Análise de importância de features (Work_Arrangement, Age, Hours_Per_Week), equidade por gênero/regime alinhada aos ODS 3, 8 e 10 da ONU e função predict_burnout() com score normalizado (0–1).',
      ],
    },
    stack: ['Python', 'Pandas', 'Scikit-learn', 'XGBoost', 'Linear Regression', 'Random Forest'],
    repoUrl: 'https://github.com/brenoprato/supervised-learning-burnout-study',
  },
  {
    id: 'mp3-tui',
    name: 'mp3-tui',
    category: {
      en: 'Systems & Terminal UI',
      'pt-BR': 'Sistemas & Terminal UI',
    },
    year: '2026',
    status: 'active',
    summary: {
      en: 'Minimalist terminal music player written in Rust with a Yazi-inspired interface, source-based local library, and real-time FFT spectrum visualizer.',
      'pt-BR':
        'Player de música minimalista de terminal escrito em Rust com interface inspirada no Yazi, biblioteca local orientada a fontes e visualizador de espectro FFT em tempo real.',
    },
    highlights: {
      en: [
        'Source-based local music library with multi-token live filtering, background directory scanning (walkdir + lofty duration probing), shuffle, repeat modes, and ±5s seeking.',
        'Real-time FFT spectrum visualizer powered by a lock-free atomic PCM ring buffer (SampleRingBuffer) and rustfft with Hann windowing, logarithmic frequency bands, and Unicode meters.',
        'Atomic TOML XDG configuration, JSON duration cache invalidated by (file_size, mtime), adaptive terminal ANSI theming, and cross-platform support (Linux, macOS, Windows).',
      ],
      'pt-BR': [
        'Biblioteca local baseada em diretórios-fonte com busca instantânea multi-token, varredura em background (walkdir + leitura rápida de duração via lofty), shuffle, repeat e seek de ±5s.',
        'Visualizador de espectro FFT em tempo real via ring buffer PCM atômico lock-free (SampleRingBuffer) + rustfft com janela de Hann, bandas logarítmicas e medidores Unicode.',
        'Persistência XDG segura com escrita atômica em TOML, cache JSON invalidado por (file_size, mtime), tema ANSI adaptativo e suporte multiplataforma (Linux, macOS e Windows).',
      ],
    },
    stack: ['Rust', 'Ratatui', 'Rodio', 'rustfft', 'Lofty', 'Walkdir', 'Crossterm'],
    repoUrl: 'https://github.com/brenoprato/mp3-tui',
  },
];
