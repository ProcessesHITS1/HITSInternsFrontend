import { companyApi } from '~shared/api'
import {
  CreateCompanyReq,
  CreateCompanyResp,
  DeleteCompanyReq,
  DeleteCompanyResp,
  UpdateCompanyReq,
  UpdateCompanyResp,
} from './types'

const endpoints = companyApi.injectEndpoints({
  endpoints: (builder) => ({
    createCompany: builder.mutation<CreateCompanyResp, CreateCompanyReq>({
      query: ({ data }) => ({
        url: `/companies`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['companiesList'],
    }),
    editCompany: builder.mutation<UpdateCompanyResp, UpdateCompanyReq>({
      query: ({ data, id }) => ({
        url: `/companies/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['companiesList'],
    }),
    deleteCompany: builder.mutation<DeleteCompanyResp, DeleteCompanyReq>({
      query: ({ id }) => ({
        url: `/companies/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['companiesList'],
    }),
  }),
})

export const {
  useCreateCompanyMutation,
  useEditCompanyMutation,
  useDeleteCompanyMutation,
} = endpoints
