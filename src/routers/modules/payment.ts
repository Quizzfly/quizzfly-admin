import type { RouteRecordRaw } from 'vue-router'

export const paymentsRoute: RouteRecordRaw[] = [
  {
    path: '',
    name: 'payments',
    meta: {
      title: 'All payments',
    },
    component: () => import('@/pages/payments/index.vue'),
  },
  {
    path: 'create',
    name: 'payment-create',
    meta: {
      title: 'create',
    },
    component: () => import('@/components/payment/MSubscription.vue'),
  },
  {
    path: 'update/:id',
    name: 'payment-update',
    meta: {
      title: 'update',
    },
    component: () => import('@/components/payment/MSubscription.vue'),
  },
  {
    path: 'history',
    name: 'payment-history',
    meta: {
      title: 'payment history',
    },
    component: () => import('@/pages/payments/paymentHistory.vue'),
  },
]
