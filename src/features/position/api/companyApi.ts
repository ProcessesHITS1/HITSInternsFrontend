import { companyApi } from '~shared/api'
import {
  CreatePositionReq,
  CreatePositionResp,
  RemovePositionReq,
  RemovePositionResp,
  EditPositionResp,
  EditPositionReq,
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
    editPosition: builder.mutation<EditPositionResp, EditPositionReq>({
      query: ({ data, positionId }) => ({
        url: `/position/${positionId}`,
        method: 'PUT',
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

export const {
  useCreatePositionMutation,
  useRemovePositionMutation,
  useEditPositionMutation,
} = endpoints
