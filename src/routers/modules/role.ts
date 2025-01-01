import type { RouteRecordRaw } from 'vue-router'

export const rolesRoute: RouteRecordRaw[] = [
  {
    path: '',
    name: 'roles',
    meta: {
      title: 'All roles',
    },
    component: () => import('@/pages/roles/index.vue'),
  },
  {
    path: ':id',
    name: 'users-role-detail',
    meta: {
      title: 'Roles detail',
    },
    component: () => import('@/pages/roles/viewDetail.vue'),
  },
]
