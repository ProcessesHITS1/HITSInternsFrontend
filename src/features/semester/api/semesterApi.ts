import { thirdCourseApi } from '~shared/api'
import {
  EditSemesterResp,
  EditSemesterReq,
  CloseSemesterResp,
  CloseSemesterReq,
} from './types'

const endpoints = thirdCourseApi.injectEndpoints({
  endpoints: (builder) => ({
    editSemesterById: builder.mutation<EditSemesterResp, EditSemesterReq>({
      query: ({ id, data }) => ({
        url: `/semesters/${id}`,
        body: data,
        method: 'PUT',
      }),
      invalidatesTags: ['semester', 'semestersList'],
    }),
    closeSemesterById: builder.mutation<CloseSemesterResp, CloseSemesterReq>({
      query: ({ id }) => ({
        url: `/semesters/${id}/close`,
        method: 'PUT',
      }),
      invalidatesTags: ['semester', 'semestersList'],
    }),
  }),
})

export const { useEditSemesterByIdMutation, useCloseSemesterByIdMutation } = endpoints
