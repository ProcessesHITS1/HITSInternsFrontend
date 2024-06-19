export type AddStudentInSemReq = {
  studentId: string
  semesterId: string
  companyId: string
}
export type AddStudentInSemResp = void

export type EditStudentInSemReq = { companyId: string; id: string }
export type EditStudentInSemResp = void
