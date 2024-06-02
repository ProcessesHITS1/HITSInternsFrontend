import { thirdCourseApi } from '~shared/api'
import { AddDiaryFeedbackResp, AddDiaryFeedbackReq } from './types'

const endpoints = thirdCourseApi.injectEndpoints({
  endpoints: (builder) => ({
    addDiaryFeedback: builder.mutation<AddDiaryFeedbackResp, AddDiaryFeedbackReq>({
      query: (body) => ({
        url: '/diaries-feedback',
        body,
        method: 'POST',
      }),
      invalidatesTags: ['diary', 'studentInSemester', 'studentsInSemesterList'],
    }),
  }),
})

export const { useAddDiaryFeedbackMutation } = endpoints
