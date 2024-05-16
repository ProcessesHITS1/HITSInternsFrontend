import { interviewsApi } from '~shared/api'
import {
  CreateSeasonReq,
  CreateSeasonResp,
  DeleteSeasonReq,
  DeleteSeasonResp,
  EditSeasonReq,
  EditSeasonResp,
} from './types'

const endpoints = interviewsApi.injectEndpoints({
  endpoints: (builder) => ({
    createSeason: builder.mutation<CreateSeasonResp, CreateSeasonReq>({
      query: (body) => ({
        url: '/seasons',
        body,
        method: 'POST',
      }),
      invalidatesTags: ['seasonsList'],
    }),
    deleteSeason: builder.mutation<DeleteSeasonResp, DeleteSeasonReq>({
      query: ({ year }) => ({
        url: `/seasons/${year}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['seasonsList'],
    }),
    editSeason: builder.mutation<EditSeasonResp, EditSeasonReq>({
      query: ({ data, year }) => ({
        url: `/seasons/${year}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['seasonsList'],
    }),
  }),
})

export const { useCreateSeasonMutation, useDeleteSeasonMutation, useEditSeasonMutation } =
  endpoints
