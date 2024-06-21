import { EmploymentStatus } from '../model'

export const getEmplStatusName = (status: EmploymentStatus) => {
  switch (status) {
    case EmploymentStatus.Employed:
      return 'Устроен'
    case EmploymentStatus.Unemployed:
      return 'Не устроен'
  }
}
