import { interviewsApi } from '~shared/api'
import {
  GetAllSeasonsReq,
  GetAllSeasonsResp,
  GetSeasonByYearReq,
  GetSeasonByYearResp,
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
  }),
})

export const { useGetAllSeasonsQuery, useGetSeasonByYearQuery } = endpoints
