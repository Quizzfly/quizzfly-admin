import type { RouteRecordRaw } from 'vue-router'

export const usersRoute: RouteRecordRaw[] = [
  {
    path: '',
    name: 'users',
    meta: {
      title: 'All users',
    },
    component: () => import('@/pages/users/index.vue'),
  },
]
