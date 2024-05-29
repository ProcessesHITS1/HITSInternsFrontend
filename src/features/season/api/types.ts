import { Season } from '~entities/season'

export type CreateSeasonReq = Omit<Season, 'id'>
export type CreateSeasonResp = Season

export type EditSeasonReq = {
  year: number
  data: Omit<Season, 'id'>
}
export type EditSeasonResp = Season

export type DeleteSeasonReq = { year: number }
export type DeleteSeasonResp = void

export type CloseSeasonReq = { year: number }
export type CloseSeasonResp = void
