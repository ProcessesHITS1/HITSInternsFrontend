import { thirdCourseApi } from '~shared/api'
import {
  AddStudentInSemResp,
  AddStudentInSemReq,
  EditStudentInSemResp,
  EditStudentInSemReq,
} from './types'

const endpoints = thirdCourseApi.injectEndpoints({
  endpoints: (builder) => ({
    addStudentInSemester: builder.mutation<AddStudentInSemResp, AddStudentInSemReq>({
      query: (data) => ({
        url: '/students-in-semesters',
        method: 'POST',
        body: {
          studentsInSemester: [data],
        },
      }),
      invalidatesTags: ['studentsInSemesterList'],
    }),
    editStudentInSemester: builder.mutation<EditStudentInSemResp, EditStudentInSemReq>({
      query: ({ companyId, id }) => ({
        url: `/students-in-semesters/${id}`,
        method: 'PUT',
        body: { companyId },
      }),
      invalidatesTags: ['studentsInSemesterList'],
    }),
  }),
})

export const { useAddStudentInSemesterMutation, useEditStudentInSemesterMutation } =
  endpoints
