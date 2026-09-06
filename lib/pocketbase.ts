import PocketBase from 'pocketbase'

const baseUrl = process.env.NEXT_PUBLIC_POCKETBASE_URL || 'http://127.0.0.1:8090'

export const pb = new PocketBase(baseUrl)

export type SurveyResponsePayload = {
  role: 'resident' | 'stakeholder'
  neighborhood: string
  priorities: string[]
  registered: string
  votedLocal: string
  association: string
  responsibilities: string[]
  actions: string[]
  source?: string
  campaign?: string
  respondentToken?: string
}

export async function submitSurveyResponse(payload: SurveyResponsePayload) {
  return pb.collection('survey_responses').create(payload)
}

export async function submitContactOptIn(responseId: string, email: string) {
  return pb.collection('contact_opt_ins').create({ response: responseId, email })
}
