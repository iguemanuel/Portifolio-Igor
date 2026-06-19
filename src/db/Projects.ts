export type ProjectCategory =
  | 'landing'
  | 'ecommerce'
  | 'web-system'
  | 'dashboard'
  | 'saas'
  | 'app'
  | 'erp'
  | 'api'
  | 'automation'

export type ProjectOrigin = 'client' | 'freelance' | 'academic' | 'personal'

export type ProjectStatus = 'online' | 'private' | 'in-development' | 'offline'

export interface ProjectRecord {
  slug: string
  title: string
  category: ProjectCategory
  origin: ProjectOrigin
  status: ProjectStatus
  year: number
  featured?: boolean
  image: string
  mobileImage?: string
  tags: string[]
  liveUrl?: string
  githubUrl?: string
}

export const projects: ProjectRecord[] = [
  {
    slug: 'valdeci-auto-center',
    title: 'Valdeci Auto-Center',
    category: 'landing',
    origin: 'client',
    status: 'online',
    year: 2024,
    featured: true,
    image: '/img/valdeci-auto-center.png',
    tags: ['Vue', 'TypeScript', 'CSS', 'Tailwind'],
    liveUrl: 'https://valdeci-auto-center.vercel.app/',
    githubUrl: 'https://github.com/iguemanuel/Valdeci-Auto-Center',
  },
  {
    slug: 'barbearia-machado',
    title: 'Barbearia Machado',
    category: 'web-system',
    origin: 'freelance',
    status: 'online',
    year: 2024,
    image: '/img/barbaearia-machado.png',
    tags: ['JavaScript', 'PocketBase', 'SQLite', 'Webpack'],
    liveUrl: 'https://barbearia-machado.vercel.app/',
    githubUrl: 'https://github.com/iguemanuel/Barbearia-Machado',
  },
  {
    slug: 'cardapio-do-chef',
    title: 'Cardapio do Chef',
    category: 'ecommerce',
    origin: 'personal',
    status: 'online',
    year: 2023,
    image: '/img/codigo-do-chef.png',
    tags: ['HTML', 'CSS', 'JavaScript'],
    liveUrl: 'https://cardapio-eta-two.vercel.app/',
    githubUrl: 'https://github.com/iguemanuel/Cardapio-Codigo-Chef',
  },
  {
    slug: 'control-finance',
    title: 'Control Finance',
    category: 'dashboard',
    origin: 'personal',
    status: 'online',
    year: 2024,
    featured: true,
    image: '/img/control-finance.png',
    tags: ['Angular', 'TypeScript', 'PocketBase', 'Tailwind'],
    liveUrl: 'https://control-finance-psi.vercel.app/login',
    githubUrl: 'https://github.com/iguemanuel/Control-Finance',
  },
  {
    slug: 'lc-assessoria',
    title: 'LC Assessoria',
    category: 'landing',
    origin: 'client',
    status: 'online',
    year: 2025,
    featured: true,
    image: '/img/lc-assessoria.png',
    tags: ['Vue', 'TypeScript', 'Tailwind', 'CSS'],
    liveUrl: 'https://www.lcassessoria.com/',
  },
]
