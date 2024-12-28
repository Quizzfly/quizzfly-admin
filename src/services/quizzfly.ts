import type { BaseResponse } from '@/types/api'
import type { IQuizzfly } from '@/types/quizzfly'

export const getListQuizzlfyApi = async (
  keywords: string,
  only_deleted: boolean,
  page = 1,
  limit = 10,
): Promise<BaseResponse<IQuizzfly[]>> => {
  return $api('/admin/quizzfly', {
    method: 'GET',
    params: {
      keywords,
      only_deleted,
      page,
      limit,
    },
  })
}

export const deleteQuizzflyApi = async (quizzflyId: string): Promise<BaseResponse<IQuizzfly>> => {
  return $api(`/admin/quizzfly/${quizzflyId}`, {
    method: 'DELETE',
  })
}

export const restoreQuizzlfyApi = async (quizzflyId: string): Promise<BaseResponse<IQuizzfly>> => {
  return $api(`/admin/quizzfly/${quizzflyId}/restore`, {
    method: 'PUT',
  })
}

export const publicQuizzlfyApi = async (quizzflyId: string): Promise<BaseResponse<IQuizzfly>> => {
  return $api(`/admin/quizzfly/${quizzflyId}/public`, {
    method: 'PATCH',
  })
}

export const unPublicQuizzlfyApi = async (quizzflyId: string): Promise<BaseResponse<IQuizzfly>> => {
  return $api(`/admin/quizzfly/${quizzflyId}/un-public`, {
    method: 'PATCH',
  })
}
