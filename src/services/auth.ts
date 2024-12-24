import type { BaseResponse } from '@/types/api'

interface LoginResponse {
  user_id: string
  access_token: string
  refresh_token: string
  token_expires: number
}
export const loginApi = async (
  email: string,
  password: string,
): Promise<BaseResponse<LoginResponse>> => {
  return $api(
    'admin/auth/login',
    {
      method: 'POST',
      body: {
        email,
        password,
      },
    },
    false,
  )
}
