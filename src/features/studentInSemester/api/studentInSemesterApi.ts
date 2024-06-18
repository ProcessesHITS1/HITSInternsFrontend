import { thirdCourseApi } from '~shared/api'
import { AddStudentInSemResp, AddStudentInSemReq } from './types'

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
  }),
})

export const { useAddStudentInSemesterMutation } = endpoints
