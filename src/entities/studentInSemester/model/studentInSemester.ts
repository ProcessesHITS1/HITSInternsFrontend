import { Company } from '~entities/company/@x/studentInSemester'
import { UserInfo } from '~entities/user/@x'

export type StudentInSemester = {
  id: string
  studentId: string
  companyId: string
  semesterId: string
  diaryId: string
  internshipPassed: boolean
}

export type StudentInSemesterNormal = StudentInSemester & {
  student: UserInfo | undefined
  company: Company | undefined
}
