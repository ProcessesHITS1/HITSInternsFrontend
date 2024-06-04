import { Card } from 'antd'
import { Message, MessageView } from '~entities/message'
import { UserInfo, getName } from '~entities/user'

export interface ChatViewProps {
  messages: Message[]
  users: UserInfo[]
}

export const ChatView = ({ messages, users }: ChatViewProps) => {
  return (
    <div
      style={{ background: 'url(/bckgr.png)', backgroundSize: 'cover' }}
      className='chat flex flex-col overflow-y-auto h-[calc(100%-124px)] sm:h-[calc(100%-48px)] p-4'
    >
      {messages.length ? (
        messages.map((msg, i) => (
          <MessageView
            key={msg.id}
            message={{
              attachments: msg.attachments,
              author: msg.author,
              chatId: msg.chatId,
              id: msg.id,
              message: msg.message,
              sentAt: msg.sentAt,
            }}
            authorName={getName(users.find((u) => u.id === msg.author))}
            showAuthor={
              i === 0 ||
              messages[i - 1].author !== msg.author ||
              new Date(msg.sentAt).getTime() -
                new Date(messages[i - 1].sentAt).getTime() >
                120_000
            }
          />
        ))
      ) : (
        <Card className='text-lg text-center'>В данном чате еще нет сообщений!</Card>
      )}
    </div>
  )
}
