import { thirdCourseApi } from '~shared/api'
import {
  GetAllStudentsInSemestersResp,
  GetAllStudentsInSemestersReq,
  GetStudentInSemesterByIdResp,
  GetStudentInSemesterByIdReq,
} from './types'

const endpoints = thirdCourseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllStudentsInSemesters: builder.query<
      GetAllStudentsInSemestersResp,
      GetAllStudentsInSemestersReq
    >({
      query: (params) => ({
        url: '/students-in-semesters',
        params,
      }),
      providesTags: ['studentsInSemesterList'],
    }),
    getStudentInSemesterById: builder.query<
      GetStudentInSemesterByIdResp,
      GetStudentInSemesterByIdReq
    >({
      query: ({ id }) => ({
        url: `/students-in-semesters/${id}`,
      }),
      providesTags: ['studentInSemester'],
    }),
  }),
})

export const { useGetAllStudentsInSemestersQuery, useGetStudentInSemesterByIdQuery } =
  endpoints
