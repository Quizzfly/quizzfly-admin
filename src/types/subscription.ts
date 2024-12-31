export interface ISubscription {
  id: string
  name: string
  description: string
  duration: number
  price: number
  resource_limits: [
    {
      name: string
      resource_type: 'GENERATE_QUESTION_BY_AI | PARTICIPANT_IN_ROOM'
      limit: number
    },
  ]
}
