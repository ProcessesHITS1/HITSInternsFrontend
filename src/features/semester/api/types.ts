import { Semester } from '~entities/semester'

export type EditSemesterReq = { id: Semester['id']; data: Omit<Semester, 'id'> }
export type EditSemesterResp = void

export type CloseSemesterReq = { id: Semester['id'] }
export type CloseSemesterResp = void

export type CloneSemesterReq = {
  semesterIdToClone: string
  newSemesterData: Pick<Semester, 'year' | 'semester' | 'seasonId' | 'documentsDeadline'>
}
export type CloneSemesterResp = void
