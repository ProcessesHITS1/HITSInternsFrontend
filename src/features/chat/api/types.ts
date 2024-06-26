import { Chat } from '~entities/chat'

export type CreateDirectChatReq = {
  name: string
  userId: string
}
export type CreateDirectChatResp = Chat

export type CreateGroupChatReq = {
  name: string
  users: string[]
}
export type CreateGroupChatResp = Chat

export type AddUserToChatReq = {
  chatId: string
  userId: string
}
export type AddUserToChatResp = void

export type RemoveUserFromChatReq = {
  chatId: string
  userId: string
}
export type RemoveUserFromChatResp = void

export type LeaveChatReq = { chatId: string }
export type LeaveChatResp = void

export type UploadFileReq = {
  chatId: string
  file: FormData
}
export type UploadFileResp = string
