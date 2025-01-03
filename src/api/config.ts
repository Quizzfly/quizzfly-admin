export const config = {
  baseURL: import.meta.env.VITE_API_ENDPOINT || 'https://api.quizzfly.site/api/v1',
  path: {
    refreshToken: 'admin/auth/refresh-tokens',
  },
  key: {
    refreshToken: 'refresh_token', //KEY SAVED IN LOCALSTORAGE
    accessToken: 'access_token', //KEY SAVED IN LOCALSTORAGE
  },
  retryStatusCodes: [401, 403],
}
