import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: () => import('../pages/home')
    },
    {
      path: '/login',
      component: () => import('../pages/login')
    },
    {
      path: '/editor:id?',
      component: () => import('../pages/editor')
    }
  ]
})

export default router
