import { PageInfo } from '~shared/api'
import { UserInfo } from '../model'

export type GetAllUsersReq = void
export type GetAllUsersResp = {
  pageInfo: PageInfo
  data: UserInfo[]
}

export type GetUserInfoReq = {
  id: string
}
export type GetUserInfoResp = UserInfo

export type GetMyInfoReq = void
export type GetMyInfoResp = UserInfo
