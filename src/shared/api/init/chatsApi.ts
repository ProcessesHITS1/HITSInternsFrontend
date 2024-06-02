import { createApi } from '@reduxjs/toolkit/query/react'
import { API_CHATS_URL } from '~shared/config'
import { baseQueryWithAuth } from '../baseQueryWithAuth'

export const chatsApi = createApi({
  reducerPath: 'chatsApi',
  refetchOnMountOrArgChange: true,
  baseQuery: baseQueryWithAuth({ baseUrl: API_CHATS_URL }),
  endpoints: () => ({}),
  tagTypes: ['chatsList'],
})
