import { Message } from '../model'

export type GetMessagesReq = {
  chatId: string
  from?: string
  until?: string
}
export type GetMessagesResp = Message[]
