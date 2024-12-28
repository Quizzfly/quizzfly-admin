import type { BaseResponse } from '@/types/api'
import type { IGroup } from '@/types/group'
import type { IPost } from '@/types/post'

export const getListGroupApi = async (
  keywords: string,
  page = 1,
  limit = 10,
): Promise<BaseResponse<IGroup[]>> => {
  return $api('/admin/groups', {
    method: 'GET',
    params: {
      keywords,
      page,
      limit,
    },
  })
}

export const getListPostApi = async (
  groupId: string,
  page = 1,
  limit = 10,
): Promise<BaseResponse<IPost[]>> => {
  return $api(`/admin/groups/${groupId}/posts`, {
    method: 'GET',
    params: {
      page,
      limit,
    },
  })
}

export const deleteGroupApi = async (groupId: string): Promise<BaseResponse<IGroup>> => {
  return $api(`/admin/groups/${groupId}`, {
    method: 'DELETE',
  })
}

export const deletePostApi = async (postId: string): Promise<BaseResponse<IPost>> => {
  return $api(`/admin/posts/${postId}`, {
    method: 'DELETE',
  })
}
