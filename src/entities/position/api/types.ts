import { ASPPaginationResp } from '~shared/api'
import { Position } from '../model'

export type GetPositionsReq = {
  year: number
  companies: string[]
  q?: string | null
  page: number
}
export type GetPositionsResp = ASPPaginationResp<Position>
