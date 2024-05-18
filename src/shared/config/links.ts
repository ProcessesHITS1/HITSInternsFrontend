import { AppRoutes } from '~shared/config'

export const getSeasonLink = (year: number) =>
  AppRoutes.SEASON.replace(':id', year.toString())
