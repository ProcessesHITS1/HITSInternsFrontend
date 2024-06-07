export type Chat = { id: string; name: string }
export type ExtendedChat = Chat & { ownerId: string; members: string[] }
