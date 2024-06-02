import { CompanyInSeason } from '~entities/companyInSeason/@x/season'
import { StudentInSeason } from '~entities/studentInSeason/@x/season'

export type Season = {
  id: string
  year: number
  seasonStart: string
  seasonEnd: string
}

export type ExtendedSeason = {
  season: Season
  companies: CompanyInSeason[]
  students: StudentInSeason[]
}
