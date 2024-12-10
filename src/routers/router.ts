import { createWebHistory, createRouter, type RouteRecordRaw } from 'vue-router'
import { authRoute, dashboardRoute } from './modules'
import { authGuard } from './auth-guard'
// const { progress } = useIndicator()

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    beforeEnter: [authGuard],
    component: () => import('@/pages/index.vue'),
    children: dashboardRoute,
  },
  {
    path: '/auth',
    meta: {
      layout: 'GuestLayout',
      public: true,
    },
    beforeEnter: [authGuard],
    children: authRoute,
  },
  {
    path: '/test',
    component: () => import('@/pages/test.vue'),
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    meta: {
      layout: 'GuestLayout',
    },
    redirect: '/404',
    children: [],
  },
  // {
  //   path: '/404',
  //   name: '404',
  //   meta: {
  //     layout: 'GuestLayout',
  //   },
  //   component: () => import('@/pages/NotFound.vue'),
  // },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// router.beforeEach(() => {
//   progress.value = 0.3
// })

// router.afterEach(() => {
//   setTimeout(() => {
//     progress.value = 1
//   }, 100)
// })

export default router
