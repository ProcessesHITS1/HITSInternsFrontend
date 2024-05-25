import { Company } from '~entities/company/@x/companyInSeason'
//import { Position } from '~entities/position/@x/companyInSeason'

export type CompanyInSeason = Company & {
  nPositions: number
}

export type CompanyInSeasonShort = Omit<CompanyInSeason, 'curatorId' | 'contacts'>
