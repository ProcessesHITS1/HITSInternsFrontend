import { Season } from '../model'

export type GetAllSeasonsReq = void
export type GetAllSeasonsResp = Season[]

export type GetSeasonsByYearReq = { year: number }
export type GetSeasonsByYearResp = Season
