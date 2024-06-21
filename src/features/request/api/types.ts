import { RequestResult } from '~entities/request'

export type CreateStatusReq = { year: number; statusName: string }
export type CreateStatusResp = void

export type SetStatusReq = {
  requestId: string
} & Partial<RequestResult>
export type SetStatusResp = void
