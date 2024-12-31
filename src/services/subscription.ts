import type { BaseResponse } from '@/types/api'
import type { ISubscription } from '@/types/subscription'

export const getListSubscriptionApi = async (): Promise<BaseResponse<ISubscription[]>> => {
  return $api('/subscriptions', {
    method: 'GET',
  })
}

export const getDetailSubscriptionApi = async (
  id: string,
): Promise<BaseResponse<ISubscription>> => {
  return $api(`/subscriptions/${id}`, {
    method: 'GET',
  })
}

export const createSubscriptionApi = async (data: any): Promise<BaseResponse<ISubscription>> => {
  return $api('/subscriptions', {
    method: 'POST',
    body: data,
  })
}

export const updateSubscriptionApi = async (
  id: string,
  data: any,
): Promise<BaseResponse<ISubscription>> => {
  return $api(`/subscriptions/${id}`, {
    method: 'PUT',
    body: data,
  })
}

export const deleteSubscriptionApi = async (id: string): Promise<BaseResponse<ISubscription>> => {
  return $api(`/subscriptions/${id}`, {
    method: 'DELETE',
  })
}
