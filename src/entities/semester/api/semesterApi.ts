import { thirdCourseApi } from '~shared/api'
import {
  GetAllSemestersResp,
  GetAllSemestersReq,
  GetSemesterByIdResp,
  GetSemesterByIdReq,
} from './types'

const endpoints = thirdCourseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSemesters: builder.query<GetAllSemestersResp, GetAllSemestersReq>({
      query: (params) => ({
        url: '/semesters',
        params,
      }),
      providesTags: ['semestersList'],
    }),
    getSemesterById: builder.query<GetSemesterByIdResp, GetSemesterByIdReq>({
      query: ({ id }) => ({
        url: `/semesters/${id}`,
      }),
      providesTags: ['semester'],
    }),
  }),
})

export const { useGetAllSemestersQuery, useGetSemesterByIdQuery } = endpoints
