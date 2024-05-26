export type Diary = {
  id: string
  documentId: string
  attachedAt: string
  diaryFeedback: DiaryFeedback
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
