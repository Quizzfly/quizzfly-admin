export interface IQuizzfly {
  id: string
  created_at: string
  updated_at: string
  deleted_at: string | null
  title: string
  cover_image: string
  description: string
  is_public: boolean
  quizzfly_status: string
  user_id: string
  username: string
  avatar: string
}
