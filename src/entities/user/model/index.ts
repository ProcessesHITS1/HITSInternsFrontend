export enum Sex {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export enum Role {
  ROLE_SCHOOL_REPRESENTATIVE = 'ROLE_SCHOOL_REPRESENTATIVE',
  ROLE_ADMIN = 'ROLE_ADMIN',
  ROLE_STUDENT = 'ROLE_STUDENT',
}

export type UserInfo = {
  id: string
  firstName: string
  lastName: string
  patronymic: string
  email: string
  phone: string
  sex: Sex
  roles: Role[]
}
