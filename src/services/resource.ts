import type { BaseResponse } from '@/types/api'
import type { IResource } from '@/types/resource'

export const getListResourceApi = async (id: string): Promise<BaseResponse<IResource[]>> => {
  return $api(`/subscriptions/${id}/resource-limits`, {
    method: 'GET',
  })
}

export const createResourceApi = async (
  id: string,
  data: any,
): Promise<BaseResponse<IResource>> => {
  return $api(`/subscriptions/${id}/resource-limits`, {
    method: 'POST',
    body: data,
  })
}

export const updateResourceApi = async (
  id: string,
  data: any,
): Promise<BaseResponse<IResource>> => {
  return $api(`/resource-limits/${id}`, {
    method: 'PUT',
    body: data,
  })
}

export const deleteResourceApi = async (id: string): Promise<BaseResponse<IResource>> => {
  return $api(`/resource-limits/${id}`, {
    method: 'DELETE',
  })
}
