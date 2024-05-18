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
        url: '/season',
        body,
        method: 'POST',
      }),
      invalidatesTags: ['seasonsList', 'season'],
    }),
    deleteSeason: builder.mutation<DeleteSeasonResp, DeleteSeasonReq>({
      query: ({ year }) => ({
        url: `/season/${year}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['seasonsList', 'season'],
    }),
    editSeason: builder.mutation<EditSeasonResp, EditSeasonReq>({
      query: ({ data, year }) => ({
        url: `/season/${year}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['seasonsList', 'season'],
    }),
  }),
})

export const { useCreateSeasonMutation, useDeleteSeasonMutation, useEditSeasonMutation } =
  endpoints
