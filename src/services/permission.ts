import type { BaseResponse } from '@/types/api'
import type { IPermission } from '@/types/permission'

export const getListPermissionApi = async (): Promise<BaseResponse<IPermission[]>> => {
  return $api('/permissions/group-resource', {
    method: 'GET',
  })
}
