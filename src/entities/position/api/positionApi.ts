import { interviewsApi } from '~shared/api'
import { GetPositionsResp, GetPositionsReq } from './types'

const endpoints = interviewsApi.injectEndpoints({
  endpoints: (builder) => ({
    getPositions: builder.query<GetPositionsResp, GetPositionsReq>({
      query: (params) => ({
        url: '/position/search',
        params,
      }),
      providesTags: ['positionsList'],
    }),
  }),
})

export const { useGetPositionsQuery } = endpoints
