import { describe, expect, it } from 'vitest';
import { TECHNICAL_PILLARS } from '../data/pillars';
import { PROFILE } from '../data/profile';
import { PROJECTS } from '../data/projects';
import { DICTIONARIES } from '../i18n/dictionaries';

describe('Data integrity', () => {
  it('contains exact source-of-truth identity and contact links without hardcoded age', () => {
    expect(PROFILE.name).toBe('Breno Porto');
    expect(PROFILE.greetingSignature).toBe("hello!, i'm breno!");
    expect(PROFILE.education.institution).toBe('UNIFESP');
    expect(PROFILE.education.expectedGraduation.en).toContain('2028');
    expect(PROFILE.education.expectedGraduation['pt-BR']).toContain('2028');
    expect(PROFILE.contact.email).toBe('brenoppprado@gmail.com');
    expect(PROFILE.contact.githubUrl).toBe('https://github.com/brenoprato');
    expect(PROFILE.contact.linkedinUrl).toBe('https://www.linkedin.com/in/breno-porto/');

    const allProfileStrings = [
      PROFILE.tagline.en,
      PROFILE.tagline['pt-BR'],
      ...PROFILE.bio.en,
      ...PROFILE.bio['pt-BR'],
      PROFILE.contactNote.en,
      PROFILE.contactNote['pt-BR'],
      ...PROFILE.sideQuests.flatMap((q) => [q.label.en, q.label['pt-BR'], q.detail.en, q.detail['pt-BR']]),
      ...TECHNICAL_PILLARS.flatMap((p) => [p.title.en, p.title['pt-BR'], p.summary.en, p.summary['pt-BR'], p.stackLine]),
    ].join(' ');

    expect(allProfileStrings).not.toMatch(/\b(19|20|21|22)\s*(years|anos)\b/i);
    expect(allProfileStrings).not.toMatch(/\b(2005|may 2005|maio de 2005)\b/i);
    expect(allProfileStrings).not.toMatch(/six sigma/i);
    expect(allProfileStrings).not.toMatch(/\b(internship|internships|estágio)\b/i);
  });

  it('defines all 4 technical pillars with non-empty EN and PT-BR translations', () => {
    expect(TECHNICAL_PILLARS).toHaveLength(4);
    for (const pillar of TECHNICAL_PILLARS) {
      expect(pillar.title.en.trim().length).toBeGreaterThan(0);
      expect(pillar.title['pt-BR'].trim().length).toBeGreaterThan(0);
      expect(pillar.summary.en.trim().length).toBeGreaterThan(0);
      expect(pillar.summary['pt-BR'].trim().length).toBeGreaterThan(0);
      expect(pillar.stackLine.trim().length).toBeGreaterThan(0);
    }
  });

  it('defines the two initial GitHub projects with accurate metadata and bilingual content', () => {
    const ids = PROJECTS.map((project) => project.id);
    expect(ids).toEqual(['supervised-learning-burnout-study', 'mp3-tui']);

    for (const project of PROJECTS) {
      expect(project.repoUrl).toMatch(/^https:\/\/github\.com\/brenoprato\//);
      expect(project.summary.en.trim().length).toBeGreaterThan(0);
      expect(project.summary['pt-BR'].trim().length).toBeGreaterThan(0);
      expect(project.highlights.en.length).toBeGreaterThanOrEqual(2);
      expect(project.highlights['pt-BR'].length).toBeGreaterThanOrEqual(2);
      expect(project.stack.length).toBeGreaterThan(0);
    }
  });

  it('provides complete EN and PT-BR UI dictionaries without CV download strings', () => {
    expect(Object.keys(DICTIONARIES.en)).toEqual(Object.keys(DICTIONARIES['pt-BR']));
    expect(JSON.stringify(DICTIONARIES)).not.toMatch(/\bdownload cv\b/i);
  });
});
