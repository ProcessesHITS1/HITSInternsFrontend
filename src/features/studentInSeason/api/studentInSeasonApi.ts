import { interviewsApi } from '~shared/api'
import {
  AddSeasonInSeasonReq,
  AddSeasonInSeasonResp,
  DeleteStudentInSeasonReq,
  DeleteStudentInSeasonResp,
} from './types'

const endpoints = interviewsApi.injectEndpoints({
  endpoints: (builder) => ({
    addStudentInSeason: builder.mutation<AddSeasonInSeasonResp, AddSeasonInSeasonReq>({
      query: ({ student, year }) => ({
        url: `/season/${year}/student/${student}`,
        method: 'POST',
      }),
      invalidatesTags: ['studentsInSeasonList'],
    }),
    deleteStudentInSeason: builder.mutation<
      DeleteStudentInSeasonResp,
      DeleteStudentInSeasonReq
    >({
      query: ({ student, year }) => ({
        url: `/season/${year}/student/${student}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['studentsInSeasonList'],
    }),
  }),
})

export const { useAddStudentInSeasonMutation, useDeleteStudentInSeasonMutation } =
  endpoints
