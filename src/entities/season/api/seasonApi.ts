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
        url: `/seasons/${year}`,
      }),
    }),
  }),
})

export const { useGetAllSeasonsQuery, useGetSeasonByYearQuery } = endpoints
