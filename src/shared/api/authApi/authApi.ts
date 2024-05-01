import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_AUTH } from '~shared/config'
import { AuthRequest, AuthResponse } from './model'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_AUTH }),
  endpoints: (builder) => ({
    loginUser: builder.mutation<AuthResponse, AuthRequest>({
      query: (token) => ({
        url: '',
        method: 'POST',
        params: {
          token,
        },
      }),
    }),
  }),
})

export const { useLoginUserMutation } = authApi
