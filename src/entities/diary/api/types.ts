import { Diary } from '../model'

export type GetDiaryByIdReq = { studentId: string }
export type GetDiaryByIdResp = Diary

export type DownloadDiaryByIdReq = { documentId: string }
export type DownloadDiaryByIdResp = File
