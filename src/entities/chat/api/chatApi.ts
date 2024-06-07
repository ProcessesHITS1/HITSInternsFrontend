import { chatsApi } from '~shared/api'
import {
  GetChatsResp,
  GetChatsReq,
  GetChatResp,
  GetChatReq,
  GetAttachmentsResp,
  GetAttachmentsReq,
} from './types'

const endpoints = chatsApi.injectEndpoints({
  endpoints: (builder) => ({
    getChats: builder.query<GetChatsResp, GetChatsReq>({
      query: () => ({
        url: '/Chats/my',
      }),
      providesTags: ['chatsList'],
    }),
    getChat: builder.query<GetChatResp, GetChatReq>({
      query: ({ groupId }) => ({
        url: `/Chats/${groupId}`,
      }),
      providesTags: ['chat'],
    }),
    getAttachments: builder.query<GetAttachmentsResp, GetAttachmentsReq>({
      query: ({ chatId }) => ({
        url: `/Chats/${chatId}/attachments`,
      }),
      providesTags: ['attachments'],
    }),
  }),
})

export const { useGetChatsQuery, useGetChatQuery, useLazyGetAttachmentsQuery } = endpoints
