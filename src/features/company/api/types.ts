import { Company } from '~entities/company'

export type CreateCompanyReq = { data: Omit<Company, 'id'> }
export type CreateCompanyResp = void

export type UpdateCompanyReq = { id: string; data: Omit<Company, 'id'> }
export type UpdateCompanyResp = void

export type DeleteCompanyReq = { id: string }
export type DeleteCompanyResp = void
