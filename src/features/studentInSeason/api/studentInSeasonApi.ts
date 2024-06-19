import { interviewsApi } from '~shared/api'
import {
  AddStudentInSeasonReq,
  AddStudentInSeasonResp,
  DeleteStudentInSeasonReq,
  DeleteStudentInSeasonResp,
  EditStudentInSeasonResp,
  EditStudentInSeasonReq,
} from './types'

const endpoints = interviewsApi.injectEndpoints({
  endpoints: (builder) => ({
    addStudentInSeason: builder.mutation<AddStudentInSeasonResp, AddStudentInSeasonReq>({
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
    editStudentInSeason: builder.mutation<
      EditStudentInSeasonResp,
      EditStudentInSeasonReq
    >({
      query: ({ companyId, id }) => ({
        url: `/students-in-semesters/${id}`,
        method: 'PUT',
        body: { companyId },
      }),
      invalidatesTags: ['studentsInSeasonList'],
    }),
  }),
})

export const {
  useAddStudentInSeasonMutation,
  useDeleteStudentInSeasonMutation,
  useEditStudentInSeasonMutation,
} = endpoints
