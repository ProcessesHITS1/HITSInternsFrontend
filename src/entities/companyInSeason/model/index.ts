import { Company } from '~entities/company/@x/companyInSeason'

export type CompanyInSeason = Pick<Company, 'id' | 'name'> & {
  seasonYear: number
  nPositions: number
}

export type CompanyInSeasonShort = Omit<CompanyInSeason, 'curatorId' | 'contacts'>
