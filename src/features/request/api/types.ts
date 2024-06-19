import { RequestResult } from '~entities/request'

export type CreateStatusReq = { year: number; statusName: string }
export type CreateStatusResp = void

export type SetStatusReq = RequestResult & { requestId: string }
export type SetStatusResp = void
