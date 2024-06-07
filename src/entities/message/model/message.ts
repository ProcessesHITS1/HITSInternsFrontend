export type Message = {
  id: string
  chatId: string
  author: string
  message: string | null
  sentAt: string
  attachments: Attachment[]
}

export type Attachment = { id: string; name?: string; mimeType: string | null }
