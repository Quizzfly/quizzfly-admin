export interface IPost {
  id: string
  created_at: string
  updated_at: string
  deleted_at: null
  type: 'POST | SHARE'
  content: string
  files: [
    {
      public_id: string
      original_filename: string
      format: string
      resource_type: string
      url: string
      bytes: 0
    },
  ]
  quizzfly: {
    id: string
    created_at: string
    updated_at: string
    deleted_at: string
    title: string
    description: string
    cover_image: string
    theme: string
    is_public: boolean
    quizzfly_status: string
  }
  member: {
    id: string
    username: string
    name: string
    avatar: string
    createdAt: string
    updatedAt: string
  }
  reactCount: 0
  commentCount: 0
  isLiked: boolean
}
