import { interviewsApi } from '~shared/api'
import { API_INTERVIEWS2_URL } from '~shared/config'
import { CreateStatusResp, CreateStatusReq, SetStatusResp, SetStatusReq } from './types'

const endpoints = interviewsApi.injectEndpoints({
  endpoints: (builder) => ({
    createReqStatus: builder.mutation<CreateStatusResp, CreateStatusReq>({
      query: ({ year, statusName }) => ({
        url: `${API_INTERVIEWS2_URL}/season/${year}/request_status/${statusName}`,
        method: 'POST',
      }),
      invalidatesTags: ['reqStatusesList'],
    }),
    createReqResult: builder.mutation<SetStatusResp, SetStatusReq>({
      query: ({ requestId, ...body }) => ({
        url: `/request/${requestId}/result_status`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['studentRequests', 'studentsInSeasonList'],
    }),
  }),
})

export const { useCreateReqStatusMutation, useCreateReqResultMutation } = endpoints
