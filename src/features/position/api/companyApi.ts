import { companyApi } from '~shared/api'
import {
  CreatePositionReq,
  CreatePositionResp,
  RemovePositionReq,
  RemovePositionResp,
} from './types'

const endpoints = companyApi.injectEndpoints({
  endpoints: (builder) => ({
    createPosition: builder.mutation<CreatePositionResp, CreatePositionReq>({
      query: ({ data, companyId }) => ({
        url: `/position/${companyId}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['companiesList'],
    }),
    removePosition: builder.mutation<RemovePositionResp, RemovePositionReq>({
      query: ({ positionId }) => ({
        url: `/position/${positionId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['companiesList'],
    }),
  }),
})

export const { useCreatePositionMutation, useRemovePositionMutation } = endpoints
