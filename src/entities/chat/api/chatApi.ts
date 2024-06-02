import { chatsApi } from '~shared/api'
import { GetChatsResp, GetChatsReq } from './types'

const endpoints = chatsApi.injectEndpoints({
  endpoints: (builder) => ({
    getChats: builder.query<GetChatsResp, GetChatsReq>({
      query: () => ({
        url: '/Chats/my',
      }),
    }),
  }),
})

export const { useGetChatsQuery } = endpoints
