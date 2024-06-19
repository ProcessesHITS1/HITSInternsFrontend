export type AddStudentInSeasonReq = { year: number; student: number }
export type AddStudentInSeasonResp = void

export type DeleteStudentInSeasonReq = { year: number; student: string }
export type DeleteStudentInSeasonResp = void

export type EditStudentInSeasonReq = { companyId: string; id: string }
export type EditStudentInSeasonResp = void
