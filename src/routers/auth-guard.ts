import { useAuthStore } from '@/stores/auth'
import type { NavigationGuardWithThis } from 'vue-router'

export const authGuard: NavigationGuardWithThis<any> = async (to, from, next) => {
  document.title = (to.meta?.title as string) || 'Quizzfly - Admin'

  const authStore = useAuthStore()
  const isLoggedIn = authStore.getIsLoggedIn
  const isPublicRoute = to.meta?.public
  const isUnAuthRoute = to.meta?.unAuth

  if (isUnAuthRoute) {
    return next()
  }

  if (isLoggedIn && isPublicRoute) {
    return next('/')
  }

  if (!isLoggedIn && !isPublicRoute) {
    const encodedUrl = encodeURIComponent(to.fullPath)
    return next({ name: 'login', query: { redirect: encodedUrl } })
  }

  return next()
}

export const workspaceGuard: NavigationGuardWithThis<any> = async (to, from, next) => {
  return next('/')
}
