export type Season = {
  year: number
  seasonStart: string
  seasonEnd: string
}

export type ExtendedSeason = {
  season: Season
  companies: { id: string; name: string }[]
  students: { id: string; name: string }[]
}
