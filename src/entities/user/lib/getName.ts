import { UserInfo } from '../model'

export const getName = (user: UserInfo) =>
  `${user.lastName} ${user.firstName} ${user.patronymic}`
