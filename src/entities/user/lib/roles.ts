import { Role } from '../model'

export const getRoleName = (role: Role) => {
  switch (role) {
    case Role.ROLE_ADMIN:
      return 'Админ'
    case Role.ROLE_STUDENT:
      return 'Студент'
    case Role.ROLE_SCHOOL_REPRESENTATIVE:
      return 'Школа'
    default:
      return 'Роль не определена'
  }
}
