export interface IUserManage {
  id: string
  email: string
  role: string
  created_at: string
  updated_at: string
  user_info: {
    id: string
    username: string
    name: string
    avatar: string
    created_at: string
    updated_at: string
  }
}
