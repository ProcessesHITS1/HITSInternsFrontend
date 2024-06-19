import { interviewsApi } from '~shared/api'
import { GetReqStatusesTemplatesResp, GetReqStatusesTemplatesReq } from './types'

const endpoints = interviewsApi.injectEndpoints({
  endpoints: (builder) => ({
    getReqStatuses: builder.query<
      GetReqStatusesTemplatesResp,
      GetReqStatusesTemplatesReq
    >({
      query: ({ year }) => ({
        url: `/request/season/${year}/request_statuses`,
      }),
      providesTags: ['reqStatusesList'],
    }),
  }),
})

export const { useGetReqStatusesQuery } = endpoints
