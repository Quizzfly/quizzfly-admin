export interface IPermission {
  resource: string
  actions: IAction[]
}

export interface IAction {
  id: string
  resource: string
  action: string
  name: string
  desciption: string
  created_at: string
  updated_at: string
  deleted_at: string
}
