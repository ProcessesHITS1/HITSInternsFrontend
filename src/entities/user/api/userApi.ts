import { authApi } from '~shared/api'
import {
  GetAllUsersReq,
  GetAllUsersResp,
  GetMyInfoReq,
  GetMyInfoResp,
  GetUserInfoReq,
  GetUserInfoResp,
} from './types'

const endpoints = authApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<GetAllUsersResp, GetAllUsersReq>({
      query: (params) => ({
        url: '/users',
        params,
      }),
      providesTags: ['userList'],
    }),
    getUserInfo: builder.query<GetUserInfoResp, GetUserInfoReq>({
      query: ({ id }) => ({
        url: `/users/${id}/info`,
      }),
    }),
    getMyInfo: builder.query<GetMyInfoResp, GetMyInfoReq>({
      query: () => ({
        url: '/users/info',
      }),
    }),
  }),
})

export const { useGetAllUsersQuery, useGetUserInfoQuery, useGetMyInfoQuery } = endpoints
