import { PaginationReq, PaginationResp } from '~shared/api'
import { UserInfo } from '../model'

export type GetAllUsersReq = PaginationReq
export type GetAllUsersResp = PaginationResp<UserInfo>

export type GetUserInfoReq = {
  id: string
}
export type GetUserInfoResp = UserInfo

export type GetMyInfoReq = void
export type GetMyInfoResp = UserInfo
