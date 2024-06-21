import { interviewsApi } from '~shared/api'
import { API_INTERVIEWS2_URL } from '~shared/config'
import { GetReqStatusesTemplatesResp, GetReqStatusesTemplatesReq } from './types'

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
  }),
})

export const { useGetReqStatusesQuery } = endpoints
