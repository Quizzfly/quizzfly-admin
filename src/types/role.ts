export interface IRole {
  name: string
  description: string
  permission_ids: []
}

export interface IListRole {
  id: string
  created_at: string
  updated_at: string
  deleted_at: null
  name: string
  description: string
  permissions: [
    {
      id: string
      created_at: string
      updated_at: string
      deleted_at: null
      resource: string
      action: string
      name: string
      description: string
    },
  ]
  permission_ids: [null]
}
