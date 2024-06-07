import { Message } from '../model'

export type GetMessagesReq = {
  chatId: string
  from?: string
  until?: string
}
export type GetMessagesResp = Message[]

export type DownloadAttachmentByIdReq = {
  chatId: string
  fileId: string
}
export type DownloadAttachmentByIdResp = void
