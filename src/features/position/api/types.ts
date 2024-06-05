import { Position } from '~entities/position'

export type CreatePositionReq = { data: Omit<Position, 'id'>; companyId: string }
export type CreatePositionResp = void

export type EditPositionReq = { data: Omit<Position, 'id'>; positionId: string }
export type EditPositionResp = void

export type RemovePositionReq = { positionId: string }
export type RemovePositionResp = void
