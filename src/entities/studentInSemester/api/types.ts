import { PaginationReq, PaginationResp } from '~shared/api'
import { StudentInSemester } from '../model'

export type GetAllStudentsInSemestersReq = PaginationReq
export type GetAllStudentsInSemestersResp = PaginationResp<StudentInSemester>

export type GetStudentInSemesterByIdReq = { id: string }
export type GetStudentInSemesterByIdResp = StudentInSemester
