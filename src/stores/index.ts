import { useAuthStore } from './auth'
import { showToast } from '@/utils/toast'

export const initAuthStore = async () => {
  const authStore = useAuthStore()
  await authStore.setupAuth()
}

export const initMasterStore = async () => {
  try {
    // const masterStore = useMasterStore();
    // await Promise.all([masterStore.setMasterData(), masterStore.setEmojis()]);
  } catch (error) {
    showToast({
      title: 'Forgot password failed',
      description: 'Xảy ra lỗi khi lấy dữ liệu',
      variant: 'destructive',
    })
  }
}

// export { useUserStore, useAuthStore } from './user'
