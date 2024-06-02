import { Diary } from '../model'

export type GetDiaryByIdReq = { diaryId: string }
export type GetDiaryByIdResp = Diary

export type DownloadDiaryByIdReq = { documentId: string }
export type DownloadDiaryByIdResp = void
