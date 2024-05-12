import { companyApi } from '~shared/api'
import { GetCompaniesReq, GetCompaniesResp, GetCompanyReq, GetCompanyResp } from './types'

const endpoints = companyApi.injectEndpoints({
  endpoints: (builder) => ({
    getCompanyById: builder.query<GetCompanyResp, GetCompanyReq>({
      query: ({ id }) => ({
        url: `/companies/${id}`,
      }),
    }),
    getCompanies: builder.query<GetCompaniesResp, GetCompaniesReq>({
      query: (params) => ({
        url: '/companies',
        params,
      }),
      providesTags: ['companiesList'],
    }),
  }),
})

export const { useGetCompaniesQuery, useGetCompanyByIdQuery } = endpoints
