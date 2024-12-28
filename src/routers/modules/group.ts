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
  {
    path: ':id',
    name: 'group-detail',
    meta: {
      title: 'Group detail',
    },
    component: () => import('@/pages/groups/detailGroup.vue'),
  },
]
