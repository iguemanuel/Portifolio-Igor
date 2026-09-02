import { createRouter, createWebHistory } from 'vue-router'
import {
  scrollToSectionWhenReady,
  waitForScrollContainer,
} from '@/composables/useScrollContainer'
import PortfolioView from '@/views/PortfolioView.vue'
import ProjectsPage from '@/views/ProjectsPage.vue'
import CvPage from '@/views/CvPage.vue'
import BriefingPage from '@/views/BriefingPage.vue'

const routes = [
  { path: '/', name: 'home', component: PortfolioView },
  { path: '/projects', name: 'projects', component: ProjectsPage },
  { path: '/cv', name: 'cv', component: CvPage },
  { path: '/briefing', name: 'briefing', component: BriefingPage },
  { path: '/about', redirect: '/#about' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  async scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition

    if (to.hash) {
      await scrollToSectionWhenReady(to.hash.slice(1))
      return false
    }

    if (to.path === '/') {
      const container = await waitForScrollContainer()
      if (container) container.scrollTo({ top: 0, behavior: 'smooth' })
      return false
    }

    return { top: 0 }
  },
})

export default router
