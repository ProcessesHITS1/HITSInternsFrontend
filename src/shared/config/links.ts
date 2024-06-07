import { AppRoutes } from '~shared/config'

export const getSeasonLink = (year: number) =>
  AppRoutes.SEASON.replace(':id', year.toString())
export const getSemesterLink = (id: string) => AppRoutes.SEMESTER.replace(':id', id)
export const getChatLink = (id: string) => AppRoutes.CHAT.replace(':id', id)
