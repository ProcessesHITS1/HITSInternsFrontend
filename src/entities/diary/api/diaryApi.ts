import { thirdCourseApi } from '~shared/api'
import {
  DownloadDiaryByIdResp,
  DownloadDiaryByIdReq,
  GetDiaryByIdResp,
  GetDiaryByIdReq,
} from './types'

const endpoints = thirdCourseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDiaryById: builder.query<GetDiaryByIdResp, GetDiaryByIdReq>({
      query: ({ studentId }) => ({
        url: `/diaries/${studentId}`,
      }),
      providesTags: ['diary'],
    }),
    downloadDiaryById: builder.query<DownloadDiaryByIdResp, DownloadDiaryByIdReq>({
      query: ({ documentId }) => ({
        url: `/files/download/${documentId}`,
      }),
    }),
  }),
})

export const { useGetDiaryByIdQuery, useDownloadDiaryByIdQuery } = endpoints
