import type { BaseResponse } from '@/types/api'
import type { IListRole, IRole } from '@/types/role'

export const getListRoleApi = async (): Promise<BaseResponse<IListRole[]>> => {
  return $api('/roles', {
    method: 'GET',
  })
}

export const createRoleApi = async (data: any): Promise<BaseResponse<IListRole>> => {
  return $api(`/roles`, {
    method: 'POST',
    body: data,
  })
}

export const assignRoleForUserApi = async (
  idRole: string,
  idUser: string,
): Promise<BaseResponse<IListRole>> => {
  return $api(`/roles/${idRole}/users/${idUser}/assign`, {
    method: 'POST',
  })
}

export const updateRoleApi = async (
  idRole: string,
  data: any,
): Promise<BaseResponse<IListRole>> => {
  return $api(`/roles/${idRole}`, {
    method: 'PUT',
    body: data,
  })
}

export const getRoleInforAndPermissionApi = async (
  id: string,
): Promise<BaseResponse<IListRole>> => {
  return $api(`/roles/${id}/permissions`, {
    method: 'GET',
  })
}

export const assignPermissionRole = async (data: IRole): Promise<BaseResponse<IListRole>> => {
  return $api(`/roles/permissions`, {
    method: 'POST',
    body: data,
  })
}

export const deleteRoleApi = async (roleId: string): Promise<BaseResponse<IListRole>> => {
  return $api(`/roles/${roleId}`, {
    method: 'DELETE',
  })
}

export const deletePermissionForRoleApi = async (
  roleId: string,
): Promise<BaseResponse<IListRole>> => {
  return $api(`/roles/${roleId}/permissions`, {
    method: 'DELETE',
  })
}
