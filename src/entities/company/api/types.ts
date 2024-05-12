import { PaginationReq, PaginationResp } from '~shared/api'
import { Company } from '../model'

export type GetCompanyReq = { id: string }
export type GetCompanyResp = Company

export type GetCompaniesReq = PaginationReq
export type GetCompaniesResp = PaginationResp<Company>
