export type Request = {
  date: string
  snapshot: RequestStatusSnapshot
  result: RequestResult
}

export type RequestStatusSnapshot = {
  date: string
  status: RequestStatus
  previous?: RequestStatusSnapshot | null | undefined
}

export type RequestResult = {
  description?: string | null | undefined
  offerGiven: boolean
  status: ResultStatus
}

export enum ResultStatus {
  Confirmed,
  Denied,
  Pending,
}

export enum RequestStatus {
  Waiting,
  TestGiven,
  Interviewed,
  Done,
}
