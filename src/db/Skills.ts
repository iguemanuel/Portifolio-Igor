export const skillCategories = [
  {
    key: 'languages',
    skills: [
      { name: 'PHP', icon: 'php' },
      { name: 'TypeScript', icon: 'typescript' },
      { name: 'JavaScript', icon: 'javascript' },
      { name: 'SQL', icon: 'mysql' },
    ],
  },
  {
    key: 'frameworks',
    skills: [
      { name: 'Laravel', icon: 'laravel' },
      { name: 'Angular', icon: 'angular' },
      { name: 'Vue.js', icon: 'vuejs' },
      { name: 'Node.js', icon: 'nodejs' },
      { name: 'React', icon: 'react' },
      { name: 'OutSystems', icon: 'outsystems', custom: true },
    ],
  },
  {
    key: 'data',
    skills: [
      { name: 'MySQL', icon: 'mysql' },
      { name: 'PostgreSQL', icon: 'postgresql' },
      { name: 'MongoDB', icon: 'mongodb' },
    ],
  },
  {
    key: 'tools',
    skills: [
      { name: 'Docker', icon: 'docker' },
      { name: 'Git', icon: 'git' },
      { name: 'Tailwind', icon: 'tailwindcss' },
      { name: 'Figma', icon: 'figma' },
    ],
  },
] as const

export type CareerKind = 'work' | 'education'

export interface CareerMeta {
  current: boolean
  kind: CareerKind
}

/**
 * Metadados estruturais da carreira (não-traduzíveis), indexados na MESMA
 * ordem de `career.timeline` no i18n (0 = mais recente).
 */
export const careerMeta: readonly CareerMeta[] = [
  { current: true, kind: 'work' }, // 0 — Insti
  { current: true, kind: 'work' }, // 1 — Freelancer
  { current: false, kind: 'work' }, // 2 — Dal Pozzo
  { current: false, kind: 'work' }, // 3 — Millpar
  { current: false, kind: 'education' }, // 4 — UTFPR
] as const

export const careerItemCount = careerMeta.length
