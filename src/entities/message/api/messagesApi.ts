import { chatsApi } from '~shared/api'
import { GetMessagesResp, GetMessagesReq } from './types'

const endpoints = chatsApi.injectEndpoints({
  endpoints: (builder) => ({
    getMessages: builder.query<GetMessagesResp, GetMessagesReq>({
      query: ({ chatId, from, until }) => ({
        url: `/Chats/${chatId}/messages`,
        params: {
          from,
          until,
        },
      }),
    }),
  }),
})

export const { useGetMessagesQuery } = endpoints
