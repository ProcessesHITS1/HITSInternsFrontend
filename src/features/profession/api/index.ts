import { interviewsApi } from '~shared/api'
import { CreateProfessionResp, CreateProfessionReq } from './model'

const endpoints = interviewsApi.injectEndpoints({
  endpoints: (builder) => ({
    addProfession: builder.mutation<CreateProfessionResp, CreateProfessionReq>({
      query: (body) => ({
        url: '/professions',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['professionsList'],
    }),
  }),
})

export const { useAddProfessionMutation } = endpoints
