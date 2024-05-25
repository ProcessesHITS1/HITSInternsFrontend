import { interviewsApi } from '~shared/api'
import {
  AddCompanyInSeasonResp,
  AddCompanyInSeasonReq,
  DeleteCompanyInSeasonReq,
  DeleteCompanyInSeasonResp,
} from './types'

const endpoints = interviewsApi.injectEndpoints({
  endpoints: (builder) => ({
    addCompanyInSeason: builder.mutation<AddCompanyInSeasonResp, AddCompanyInSeasonReq>({
      query: ({ company, year }) => ({
        url: `/season/${year}/company/${company}`,
        method: 'POST',
      }),
      invalidatesTags: ['companiesInSeasonList'],
    }),
    deleteCompanyInSeason: builder.mutation<
      DeleteCompanyInSeasonResp,
      DeleteCompanyInSeasonReq
    >({
      query: ({ company, year }) => ({
        url: `/season/${year}/company/${company}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['companiesInSeasonList'],
    }),
  }),
})

export const { useAddCompanyInSeasonMutation, useDeleteCompanyInSeasonMutation } =
  endpoints
