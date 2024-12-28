import type { RouteRecordRaw } from 'vue-router'

export const quizzflyRoute: RouteRecordRaw[] = [
  {
    path: '',
    name: 'quizzfly',
    meta: {
      title: 'All quizzflies',
    },
    component: () => import('@/pages/quizzfly/index.vue'),
  },
]
