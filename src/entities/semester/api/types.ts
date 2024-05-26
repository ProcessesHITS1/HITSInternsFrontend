import { PaginationReq, PaginationResp } from '~shared/api'
import { Semester } from '../model'

export type GetAllSemestersReq = PaginationReq
export type GetAllSemestersResp = PaginationResp<Semester>

export type GetSemesterByIdReq = { id: string }
export type GetSemesterByIdResp = Semester
