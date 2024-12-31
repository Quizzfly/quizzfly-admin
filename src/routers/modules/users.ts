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
  {
    path: 'roles',
    name: 'users-role',
    meta: {
      title: 'Roles',
    },
    component: () => import('@/pages/users/roles/index.vue'),
  },
  {
    path: 'roles/:id',
    name: 'users-role-detail',
    meta: {
      title: 'Roles detail',
    },
    component: () => import('@/pages/users/roles/viewDetail.vue'),
  },
]
