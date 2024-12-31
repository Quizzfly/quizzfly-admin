export interface IUserPlan {
  id: string
  created_at: string
  updated_at: string
  deleted_at: string
  amount: number
  description: string
  code: string
  userPlanStatus: string
  paymentedAt: string
  subscriptionExpiredAt: string
  subscriptionPlan: {
    id: string
    created_at: string
    updated_at: string
    deleted_at: string
    name: string
    description: string
    duration: number
    price: number
    resource_limits: [
      {
        id: string
        created_at: string
        updated_at: string
        deleted_at: string
        name: string
        resource_type: 'GENERATE_QUESTION_BY_AI | PARTICIPANT_IN_ROOM'
        limit: number
      },
    ]
  }
}
