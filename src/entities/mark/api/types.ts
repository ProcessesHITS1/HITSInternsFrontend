import { StudentInSemester } from '~entities/studentInSemester/@x/mark'
import { Mark, MarkRequirement } from '../model'

export type GetRequirementsReq = {
  semesterId: string
}
export type GetRequirementsResp = MarkRequirement[]

export type GetMarksReq = {
  studentInSemesterId: string
}
export type GetMarksResp = (Mark & {
  student: StudentInSemester
  markRequirement: MarkRequirement
})[]
