import { interviewsApi } from '~shared/api'
import { API_INTERVIEWS2_URL } from '~shared/config'
import {
  GetReqStatusesTemplatesResp,
  GetReqStatusesTemplatesReq,
  GetRequestsResp,
  GetRequestsReq,
} from './types'

const endpoints = interviewsApi.injectEndpoints({
  endpoints: (builder) => ({
    getReqStatuses: builder.query<
      GetReqStatusesTemplatesResp,
      GetReqStatusesTemplatesReq
    >({
      query: ({ year }) => ({
        url: `${API_INTERVIEWS2_URL}/season/${year}/request_statuses`,
      }),
      providesTags: ['reqStatusesList'],
    }),
    getRequests: builder.query<GetRequestsResp, GetRequestsReq>({
      query: (params) => ({
        url: 'request',
        params,
      }),
      providesTags: ['studentRequests'],
    }),
  }),
})

export const { useGetReqStatusesQuery, useGetRequestsQuery } = endpoints
