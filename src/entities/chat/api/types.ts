import { Attachment } from '~entities/message/@x'
import { Chat, ExtendedChat } from '../model'

export type GetChatsReq = void
export type GetChatsResp = Chat[]

export type GetChatReq = { groupId: string }
export type GetChatResp = ExtendedChat

export type GetAttachmentsReq = { chatId: string }
export type GetAttachmentsResp = Attachment[]
