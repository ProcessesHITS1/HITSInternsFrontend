import { interviewsApi } from '~shared/api'
import { GetProfessionsReq, GetProfessionsResp } from './types'

const endpoints = interviewsApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfessions: builder.query<GetProfessionsResp, GetProfessionsReq>({
      query: () => ({
        url: '/professions',
      }),
      providesTags: ['professionsList'],
    }),
  }),
})

export const { useGetProfessionsQuery } = endpoints
