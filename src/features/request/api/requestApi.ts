import { interviewsApi } from '~shared/api'
import { CreateStatusResp, CreateStatusReq, SetStatusResp, SetStatusReq } from './types'

const endpoints = interviewsApi.injectEndpoints({
  endpoints: (builder) => ({
    createReqStatus: builder.mutation<CreateStatusResp, CreateStatusReq>({
      query: ({ year, statusName }) => ({
        url: `/request/season/${year}/request_status/${statusName}`,
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
      invalidatesTags: ['reqStatusesList'],
    }),
  }),
})

export const { useCreateReqStatusMutation } = endpoints
