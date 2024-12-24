// import { useAuthStore } from '@/stores/auth'
// import type { NavigationGuardWithThis } from 'vue-router'

// export const authGuard: NavigationGuardWithThis<any> = async (to, from, next) => {
//   document.title = String(to.meta.title) || 'Home'
//   const authStore = useAuthStore()
//   console.log('authGuard', authStore.getIsLoggedIn, to)

//   const isLoggedIn = authStore.getIsLoggedIn
//   const isPublicRoute = to.meta?.public

//   if (isLoggedIn) {
//     isPublicRoute ? next('/') : next()
//   } else {
//     isPublicRoute ? next() : next({ name: 'login' })
//   }
// }

// export const workspaceGuard: NavigationGuardWithThis<any> = async (to, from, next) => {
//   next('/')
// }

import { useAuthStore } from '@/stores/auth'
import type { NavigationGuardWithThis } from 'vue-router'

export const authGuard: NavigationGuardWithThis<any> = async (to, from, next) => {
  // Set default page title
  document.title = (to.meta?.title as string) || 'Quizzfly - Admin'

  const authStore = useAuthStore()
  const isLoggedIn = authStore.getIsLoggedIn
  const isPublicRoute = to.meta?.public
  const isUnAuthRoute = to.meta?.unAuth

  // Routes that do not require login
  if (isUnAuthRoute) {
    return next()
  }

  // Redirect logged-in users away from public routes
  if (isLoggedIn && isPublicRoute) {
    return next('/') // Or another default page
  }

  // Routes that require login but the user is not logged in
  if (!isLoggedIn && !isPublicRoute) {
    const encodedUrl = encodeURIComponent(to.fullPath)
    return next({ name: 'login', query: { redirect: encodedUrl } })
  }

  // Default navigation
  return next()
}

export const workspaceGuard: NavigationGuardWithThis<any> = async (to, from, next) => {
  return next('/')
}
