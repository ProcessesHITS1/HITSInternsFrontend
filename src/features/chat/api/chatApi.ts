import { chatsApi } from '~shared/api'
import {
  AddUserToChatResp,
  AddUserToChatReq,
  CreateDirectChatResp,
  CreateDirectChatReq,
  CreateGroupChatResp,
  CreateGroupChatReq,
  RemoveUserFromChatResp,
  RemoveUserFromChatReq,
} from './types'

const endpoints = chatsApi.injectEndpoints({
  endpoints: (builder) => ({
    createDirectChat: builder.mutation<CreateDirectChatResp, CreateDirectChatReq>({
      query: (body) => ({
        url: `/Chats/direct`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['chatsList'],
    }),
    createGroupChat: builder.mutation<CreateGroupChatResp, CreateGroupChatReq>({
      query: (body) => ({
        url: `/Chats`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['chatsList'],
    }),
    addUserToChat: builder.mutation<AddUserToChatResp, AddUserToChatReq>({
      query: ({ chatId, userId }) => ({
        url: `/Chats/${chatId}/add/${userId}`,
        method: 'POST',
      }),
      invalidatesTags: ['chatsList'],
    }),
    removeUserFromChat: builder.mutation<RemoveUserFromChatResp, RemoveUserFromChatReq>({
      query: ({ chatId, userId }) => ({
        url: `/Chats/${chatId}/remove/${userId}`,
        method: 'POST',
      }),
      invalidatesTags: ['chatsList'],
    }),
  }),
})

export const {
  useCreateDirectChatMutation,
  useCreateGroupChatMutation,
  useAddUserToChatMutation,
  useRemoveUserFromChatMutation,
} = endpoints
