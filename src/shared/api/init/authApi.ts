import { createApi } from '@reduxjs/toolkit/query/react'
import { API_AUTH_URL } from '~shared/config'
import { baseQueryWithAuth } from '../baseQueryWithAuth'

export const authApi = createApi({
  reducerPath: 'authApi',
  refetchOnMountOrArgChange: true,
  baseQuery: baseQueryWithAuth({ baseUrl: API_AUTH_URL }),
  endpoints: () => ({}),
  tagTypes: ['userList', 'groupList'],
})
