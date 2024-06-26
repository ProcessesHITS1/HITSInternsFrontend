import { Season } from '~entities/season'

export type CreateSeasonReq = Omit<Season, 'id' | 'isClosed'>
export type CreateSeasonResp = Season

export type CopySeasonReq = Omit<Season, 'id'> & { seasonId: string }
export type CopySeasonResp = Season

export type EditSeasonReq = {
  year: number
  data: Omit<Season, 'id' | 'isClosed'>
}
export type EditSeasonResp = Season

export type DeleteSeasonReq = { year: number }
export type DeleteSeasonResp = void

export type CloseSeasonReq = { year: number }
export type CloseSeasonResp = void
