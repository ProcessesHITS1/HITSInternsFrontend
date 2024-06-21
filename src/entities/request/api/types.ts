import { ASPPaginationResp } from '~shared/api'
import { Request, RequestStatusTemplate } from '../model'

export type GetReqStatusesTemplatesReq = { year: number }
export type GetReqStatusesTemplatesResp = RequestStatusTemplate[]

export type GetRequestsReq = {
  companyIds?: []
  studentIds?: []
  requestIds?: []
  page: number
  pageSize: number
  includeHistory: boolean
}
export type GetRequestsResp = ASPPaginationResp<Request>
