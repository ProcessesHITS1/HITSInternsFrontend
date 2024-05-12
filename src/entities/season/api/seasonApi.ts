import { interviewsApi } from '~shared/api'
import {
  GetAllSeasonsReq,
  GetAllSeasonsResp,
  GetSeasonsByYearReq,
  GetSeasonsByYearResp,
} from './types'

const endpoints = interviewsApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSeasons: builder.query<GetAllSeasonsResp, GetAllSeasonsReq>({
      query: () => ({
        url: '/seasons',
      }),
      providesTags: ['seasonsList'],
    }),
    getSeasonByYear: builder.query<GetSeasonsByYearResp, GetSeasonsByYearReq>({
      query: ({ year }) => ({
        url: `/seasons/${year}`,
      }),
    }),
  }),
})

export const { useGetAllSeasonsQuery, useGetSeasonByYearQuery } = endpoints
