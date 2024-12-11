import { createWebHistory, createRouter, type RouteRecordRaw } from 'vue-router'
import { authRoute, homeRoute, usersRoute, groupRoute } from './modules'
import { authGuard } from './auth-guard'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    // beforeEnter: [authGuard],
    component: () => import('@/pages/index.vue'),
    children: homeRoute,
  },
  {
    path: '/auth',
    name: 'auth',
    meta: {
      layout: 'GuestLayout',
      public: true,
    },
    beforeEnter: [authGuard],
    children: authRoute,
  },
  {
    path: '/users',
    // beforeEnter: [authGuard],
    meta: {
      title: 'User management',
    },
    children: usersRoute,
  },
  {
    path: '/groups',
    // beforeEnter: [authGuard],
    meta: {
      title: 'Group management',
    },
    children: groupRoute,
  },
  {
    path: '/test',
    component: () => import('@/pages/test.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
