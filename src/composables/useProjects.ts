import { computed, ref } from 'vue'
import {
  projects as ProjectData,
  type ProjectCategory,
  type ProjectOrigin,
  type ProjectStatus,
} from '@/db/Projects'
import { useI18n } from '@/i18n'

export type { ProjectCategory, ProjectOrigin, ProjectStatus }

export interface Project {
  id: number
  slug: string
  title: string
  category: ProjectCategory
  categoryLabel: string
  origin: ProjectOrigin
  originLabel: string
  status: ProjectStatus
  statusLabel: string
  isClient: boolean
  isOnline: boolean
  year: number
  featured: boolean
  description: string
  summary: string
  objective: string
  result: string
  image: string
  mobileImage: string
  tags: string[]
  liveUrl?: string
  githubUrl?: string
  story: {
    problem: string
    solution: string
    result: string
  }
}

export function useProjects() {
  const { t } = useI18n()

  const projects = computed<Project[]>(() =>
    ProjectData.map((project, index) => ({
      id: index,
      slug: project.slug,
      title: project.title,
      category: project.category,
      categoryLabel: t.value(`projects.categories.${project.category}`),
      origin: project.origin,
      originLabel: t.value(`projects.origins.${project.origin}`),
      status: project.status,
      statusLabel: t.value(`projects.status.${project.status}`),
      isClient: project.origin === 'client' || project.origin === 'freelance',
      isOnline: project.status === 'online',
      year: project.year,
      featured: project.featured ?? false,
      image: project.image,
      mobileImage: project.mobileImage ?? project.image,
      tags: project.tags,
      liveUrl: project.liveUrl,
      githubUrl: project.githubUrl,
      description: t.value(`projects.items.${index}.description`),
      summary: t.value(`projects.items.${index}.summary`),
      objective: t.value(`projects.items.${index}.story.solution`),
      result: t.value(`projects.items.${index}.story.result`),
      story: {
        problem: t.value(`projects.items.${index}.story.problem`),
        solution: t.value(`projects.items.${index}.story.solution`),
        result: t.value(`projects.items.${index}.story.result`),
      },
    })),
  )

  const allTags = computed(() => {
    const tags = new Set<string>()
    projects.value.forEach((p) => p.tags.forEach((tag) => tags.add(tag)))
    return Array.from(tags).sort()
  })

  return { projects, allTags }
}

export interface ProjectMetric {
  key: string
  value: number
  label: string
}

export function useProjectMetrics() {
  const { t } = useI18n()
  const { projects } = useProjects()

  const metrics = computed<ProjectMetric[]>(() => {
    const list = projects.value
    return [
      { key: 'total', value: list.length, label: t.value('projects.metrics.total') },
      {
        key: 'production',
        value: list.filter((p) => p.isOnline).length,
        label: t.value('projects.metrics.production'),
      },
      {
        key: 'clients',
        value: list.filter((p) => p.isClient).length,
        label: t.value('projects.metrics.clients'),
      },
      {
        key: 'tech',
        value: new Set(list.flatMap((p) => p.tags)).size,
        label: t.value('projects.metrics.tech'),
      },
    ]
  })

  return { metrics }
}

export type FilterDimension = 'origin' | 'category' | 'status'

export function useProjectFilters() {
  const { projects } = useProjects()

  const origin = ref<ProjectOrigin | 'all'>('all')
  const category = ref<ProjectCategory | 'all'>('all')
  const status = ref<ProjectStatus | 'all'>('all')

  const availableOrigins = computed<ProjectOrigin[]>(() =>
    Array.from(new Set(projects.value.map((p) => p.origin))),
  )
  const availableCategories = computed<ProjectCategory[]>(() =>
    Array.from(new Set(projects.value.map((p) => p.category))),
  )
  const availableStatuses = computed<ProjectStatus[]>(() =>
    Array.from(new Set(projects.value.map((p) => p.status))),
  )

  const filteredProjects = computed(() =>
    projects.value.filter(
      (p) =>
        (origin.value === 'all' || p.origin === origin.value) &&
        (category.value === 'all' || p.category === category.value) &&
        (status.value === 'all' || p.status === status.value),
    ),
  )

  const resetFilters = () => {
    origin.value = 'all'
    category.value = 'all'
    status.value = 'all'
  }

  return {
    origin,
    category,
    status,
    availableOrigins,
    availableCategories,
    availableStatuses,
    filteredProjects,
    resetFilters,
  }
}
