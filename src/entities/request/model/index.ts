export type Request = {
  date: string
  result: RequestResult
}

export type RequestResult = {
  description?: string | null | undefined
  offerGiven: boolean | null
  status: ResultStatus
}

export enum ResultStatus {
  Pending = 'Pending',
  Accepted = 'Accepted',
  Rejected = 'Rejected',
}

export type RequestStatusTemplate = {
  id: string
  name: string
}
