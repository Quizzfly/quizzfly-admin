import type { RouteRecordRaw } from 'vue-router'

export const authRoute: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/auth/login.vue'),
  },
]
