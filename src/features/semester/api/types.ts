import { Semester } from '~entities/semester'

export type EditSemesterReq = { id: Pick<Semester, 'id'>; data: Omit<Semester, 'id'> }
export type EditSemesterResp = void
