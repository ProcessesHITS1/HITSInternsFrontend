export type Request = {
  id: string
  companyId: string
  studentId: string
  studentName: string
  positionId: string
  positionTitle: string | null
  requestStatusSnapshots: RequestStatusSnapshot[] | null
  requestResult: RequestResult | null
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
