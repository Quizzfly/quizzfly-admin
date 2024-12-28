import type { BaseResponse } from '@/types/api'
import type { IUserManage } from '@/types/userManage'

export const getListUserApi = async (
  keywords: string,
  only_deleted: boolean,
  page = 1,
  limit = 10,
): Promise<BaseResponse<IUserManage[]>> => {
  return $api('/admin/users', {
    method: 'GET',
    params: {
      keywords,
      page,
      limit,
      only_deleted,
    },
  })
}

export const deleteUserApi = async (userId: string): Promise<BaseResponse<IUserManage>> => {
  return $api(`/admin/users/${userId}`, {
    method: 'DELETE',
  })
}

export const updateUserApi = async (
  userId: string,
  data: IUserManage,
): Promise<BaseResponse<IUserManage>> => {
  return $api(`/admin/users/${userId}`, {
    method: 'PATCH',
    body: data,
  })
}

export const restoreUserApi = async (userId: string): Promise<BaseResponse<IUserManage>> => {
  return $api(`/admin/users/${userId}/restore`, {
    method: 'PUT',
  })
}
