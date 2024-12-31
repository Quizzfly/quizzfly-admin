import type { BaseResponse } from '@/types/api'
import type { IUserPlan } from '@/types/userPlan'

export const getListUserPlanApi = async (
  keywords: string,
  page = 1,
  limit = 10,
): Promise<BaseResponse<IUserPlan[]>> => {
  return $api(`/admin/user-plans`, {
    method: 'GET',
    params: {
      keywords,
      page,
      limit,
    },
  })
}
