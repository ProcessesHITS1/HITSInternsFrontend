import { UserInfo } from '~entities/user/@x'

export type StudentInSeason = Pick<UserInfo, 'id'> & {
  //requests: Request[]
  name: string
  employmentStatus: EmploymentStatus
}

export enum EmploymentStatus {
  Employed = 'Employed',
  Unemployed = 'Unemployed',
}
