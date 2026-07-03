import { createRouter, createWebHistory } from 'vue-router'
import PortfolioView from '@/views/PortfolioView.vue'
import ProjectsPage from '@/views/ProjectsPage.vue'
import CvPage from '@/views/CvPage.vue'

const routes = [
  { path: '/', name: 'home', component: PortfolioView },
  { path: '/projects', name: 'projects', component: ProjectsPage },
  { path: '/cv', name: 'cv', component: CvPage },
  { path: '/about', redirect: '/#about' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition

    if (to.hash) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const el = document.getElementById(to.hash.slice(1))
          const container = document.querySelector<HTMLElement>('.fullpage-container')

          if (container && el) {
            const top =
              el.getBoundingClientRect().top -
              container.getBoundingClientRect().top +
              container.scrollTop
            container.scrollTo({ top, behavior: 'smooth' })
          } else if (el) {
            el.scrollIntoView({ behavior: 'smooth' })
          }

          resolve(false)
        }, 120)
      })
    }

    if (to.path === '/') {
      return new Promise((resolve) => {
        setTimeout(() => {
          const container = document.querySelector<HTMLElement>('.fullpage-container')
          container?.scrollTo({ top: 0, behavior: 'smooth' })
          resolve(false)
        }, 0)
      })
    }

    return { top: 0 }
  },
})

export default router
