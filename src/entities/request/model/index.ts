export type Request = {
  id: string
  studentId: string
  studentName: string
  positionId: string
  positionTitle: string | null
  date: string
  result: RequestResult | null
  requestStatusSnapshots: RequestStatusSnapshot[] | null
  requestResult: RequestResult
}

export type RequestResult = {
  description: string | null
  offerGiven: boolean
  resultStatus: ResultStatus
}

export enum ResultStatus {
  Pending = 'Pending',
  Accepted = 'Accepted',
  Rejected = 'Rejected',
}

export type RequestStatusSnapshot = {
  id: string
  dateTime: string
  status: string | null
}

export type RequestStatusTemplate = {
  id: string
  name: string | null
}
