import { Season } from '~entities/season'

export type CreateSeasonReq = Season
export type CreateSeasonResp = Season

export type EditSeasonReq = {
  year: number
  data: Season
}
export type EditSeasonResp = Season

export type DeleteSeasonReq = { year: number }
export type DeleteSeasonResp = void

export type CloseSeasonReq = { year: number }
export type CloseSeasonResp = void
