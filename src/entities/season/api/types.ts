import { Season, ExtendedSeason } from '../model'

export type GetAllSeasonsReq = void
export type GetAllSeasonsResp = Season[]

export type GetSeasonByYearReq = { year: number }
export type GetSeasonByYearResp = ExtendedSeason
