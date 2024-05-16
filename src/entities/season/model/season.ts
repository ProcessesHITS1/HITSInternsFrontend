export type Season = {
  year: number
  interviewStart: string
  interviewEnd: string
}

export type ExtendedSeason = {
  season: Season
  companies: { id: string; name: string }[]
  students: { id: string; name: string }[]
}
