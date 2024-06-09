import { Season, ExtendedSeason } from '../model'

export type GetAllSeasonsReq = void
export type GetAllSeasonsResp = Season[]

export type GetSeasonByYearReq = { year: number }
export type GetSeasonByYearResp = ExtendedSeason

export type GetSeasonInfoByYearReq = { year: number }
export type GetSeasonInfoByYearResp = ExtendedSeason['season']

export type GetSeasonStudentsByYearReq = { year: number }
export type GetSeasonStudentsByYearResp = ExtendedSeason['students']

export type GetSeasonCompaniesByYearReq = { year: number }
export type GetSeasonCompaniesByYearResp = ExtendedSeason['companies']
