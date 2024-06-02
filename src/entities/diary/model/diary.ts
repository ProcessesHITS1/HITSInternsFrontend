export type Diary = {
  id: string
  documentId: string | null | undefined
  attachedAt: string | null | undefined
  diaryFeedback: DiaryFeedback | null | undefined
}

export type DiaryFeedback = {
  id: string
  comments: string | null | undefined
  acceptanceStatus: AcceptanceStatus | null | undefined
}

export enum AcceptanceStatus {
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
}
