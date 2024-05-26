import { DiaryFeedback } from '~entities/diary'

export type AddDiaryFeedbackReq = {
  comments: DiaryFeedback['comments']
  acceptanceStatus: NonNullable<DiaryFeedback['acceptanceStatus']>
}
export type AddDiaryFeedbackResp = void
