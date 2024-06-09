import { interviewsApi } from '~shared/api'
import {
  GetAllSeasonsReq,
  GetAllSeasonsResp,
  GetSeasonByYearReq,
  GetSeasonByYearResp,
  GetSeasonStudentsByYearResp,
  GetSeasonStudentsByYearReq,
  GetSeasonCompaniesByYearResp,
  GetSeasonCompaniesByYearReq,
  GetSeasonInfoByYearResp,
  GetSeasonInfoByYearReq,
} from './types'

const endpoints = interviewsApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSeasons: builder.query<GetAllSeasonsResp, GetAllSeasonsReq>({
      query: () => ({
        url: '/seasons',
      }),
      providesTags: ['seasonsList'],
    }),
    getSeasonByYear: builder.query<GetSeasonByYearResp, GetSeasonByYearReq>({
      query: ({ year }) => ({
        url: `/season/${year}`,
      }),
      providesTags: ['season', 'companiesInSeasonList', 'studentsInSeasonList'],
    }),
    getSeasonInfoByYear: builder.query<GetSeasonInfoByYearResp, GetSeasonInfoByYearReq>({
      query: ({ year }) => ({
        url: `/season/${year}/info`,
      }),
      providesTags: ['seasonInfo'],
    }),
    getSeasonStudentsByYear: builder.query<
      GetSeasonStudentsByYearResp,
      GetSeasonStudentsByYearReq
    >({
      query: ({ year }) => ({
        url: `/season/${year}/students`,
      }),
      providesTags: ['studentsInSeasonList'],
    }),
    getSeasonCompaniesByYear: builder.query<
      GetSeasonCompaniesByYearResp,
      GetSeasonCompaniesByYearReq
    >({
      query: ({ year }) => ({
        url: `/season/${year}/companies`,
      }),
      providesTags: ['companiesInSeasonList'],
    }),
  }),
})

export const {
  useGetAllSeasonsQuery,
  useGetSeasonByYearQuery,
  useGetSeasonCompaniesByYearQuery,
  useGetSeasonStudentsByYearQuery,
  useGetSeasonInfoByYearQuery,
} = endpoints
