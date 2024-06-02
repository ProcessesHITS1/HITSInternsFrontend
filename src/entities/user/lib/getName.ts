import { UserInfo } from '../model'

export const getName = (user: UserInfo | null | undefined) =>
  user ? `${user.lastName} ${user.firstName} ${user.patronymic}` : ''
