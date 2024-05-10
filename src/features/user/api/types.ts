import { UserInfo } from '~entities/user'

export type EditProfileReq = Pick<
  UserInfo,
  'firstName' | 'lastName' | 'patronymic' | 'email' | 'phone'
>
export type EditProfileResp = UserInfo

export type ChangePasswordReq = {
  password: string
}
export type ChangePasswordResp = void

export type SignInReq = {
  email: string
  password: string
}
export type SignInResp = {
  accessToken: string
}

export type CreateUserReq = Omit<UserInfo, 'roles' | 'id'> & {
  groupId: string
  isStudent: boolean
  isSchoolRepresentative: boolean
  isAdmin: boolean
}
export type CreateUserResp = void
