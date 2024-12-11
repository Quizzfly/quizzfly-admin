import type { RouteRecordRaw } from 'vue-router'

export const groupRoute: RouteRecordRaw[] = [
  {
    path: '',
    name: 'groups',
    meta: {
      title: 'All groups',
    },
    component: () => import('@/pages/groups/index.vue'),
  },
]
