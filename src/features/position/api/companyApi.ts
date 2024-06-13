import { interviewsApi } from '~shared/api'
import {
  CreatePositionReq,
  CreatePositionResp,
  RemovePositionReq,
  RemovePositionResp,
  EditPositionResp,
  EditPositionReq,
} from './types'

const endpoints = interviewsApi.injectEndpoints({
  endpoints: (builder) => ({
    createPosition: builder.mutation<CreatePositionResp, CreatePositionReq>({
      query: (body) => ({
        url: `/position`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['companiesInSeasonList', 'positionsList'],
    }),
    editPosition: builder.mutation<EditPositionResp, EditPositionReq>({
      query: ({ data, positionId }) => ({
        url: `/position/${positionId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['companiesInSeasonList', 'positionsList'],
    }),
    removePosition: builder.mutation<RemovePositionResp, RemovePositionReq>({
      query: ({ positionId }) => ({
        url: `/position/${positionId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['companiesInSeasonList', 'positionsList'],
    }),
  }),
})

export const {
  useCreatePositionMutation,
  useRemovePositionMutation,
  useEditPositionMutation,
} = endpoints
