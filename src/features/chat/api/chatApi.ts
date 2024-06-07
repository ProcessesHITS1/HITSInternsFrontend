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
  LeaveChatResp,
  LeaveChatReq,
  UploadFileResp,
  UploadFileReq,
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
      invalidatesTags: ['chat'],
    }),
    removeUserFromChat: builder.mutation<RemoveUserFromChatResp, RemoveUserFromChatReq>({
      query: ({ chatId, userId }) => ({
        url: `/Chats/${chatId}/remove/${userId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['chat'],
    }),
    leaveChat: builder.mutation<LeaveChatResp, LeaveChatReq>({
      query: ({ chatId }) => ({
        url: `/Chats/${chatId}/leave`,
        method: 'DELETE',
      }),
      invalidatesTags: ['chatsList', 'chat'],
    }),
    uploadFile: builder.mutation<UploadFileResp, UploadFileReq>({
      query: ({ chatId, file }) => ({
        url: `/Chats/${chatId}/attachments`,
        method: 'POST',
        body: file,
        cache: 'no-cache',
      }),
    }),
  }),
})

export const {
  useCreateDirectChatMutation,
  useCreateGroupChatMutation,
  useAddUserToChatMutation,
  useRemoveUserFromChatMutation,
  useLeaveChatMutation,
  useUploadFileMutation,
} = endpoints
