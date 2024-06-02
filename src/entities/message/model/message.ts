export type Message = {
  id: string
  chatId: string
  author: string
  message: string | null
  sentAt: string
  attachments: { id: string; mimeType: string | null }[]
}
