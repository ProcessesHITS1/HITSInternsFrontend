import { chatsApi } from '~shared/api'
import { GetMessagesResp, GetMessagesReq } from './types'

export const chatEndpoints = chatsApi.injectEndpoints({
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

export const { useGetMessagesQuery } = chatEndpoints
