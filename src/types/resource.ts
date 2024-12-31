export interface IResource {
  id: string
  created_at: string
  updated_at: string
  deleted_at: string
  name: string
  resource_type: 'GENERATE_QUESTION_BY_AI | PARTICIPANT_IN_ROOM'
  limit: number
}
