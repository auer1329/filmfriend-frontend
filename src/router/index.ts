import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CamerasView from '../views/CamerasView.vue'
import StockView from '../views/StockView.vue'
import DevelopView from '../views/DevelopView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/kameras',
      name: 'kameras',
      component: CamerasView
    },
    {
      path: '/filmvorrat',
      name: 'filmvorrat',
      component: StockView
    },
    {
      path: '/develop',
        name: 'develop',
      component: DevelopView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
