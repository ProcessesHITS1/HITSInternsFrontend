import { SearchOutlined } from '@ant-design/icons'
import { Button, Input, Space, Spin } from 'antd'
import { useState } from 'react'
import { ChatCreateModal } from '~features/chat'
import { ChatList, useGetChatsQuery } from '~entities/chat'

export const ChatsPage = () => {
  const [text, setText] = useState('')
  const [newChatModalOpen, setNewChatModalOpen] = useState(false)
  const chats = useGetChatsQuery()

  if (chats.isError) {
    return 'Произошла ошибка при получении чатов'
  }

  if (chats.isLoading) {
    return <Spin size='large' className='mt-5' />
  }

  return (
    <>
      <ChatCreateModal open={newChatModalOpen} close={() => setNewChatModalOpen(false)} />
      <div className='w-full flex flex-col items-start'>
        <Space.Compact className='self-center md:w-1/4'>
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            allowClear
            placeholder='Поиск чата'
            prefix={<SearchOutlined />}
          />
          <Button type='primary' onClick={() => setNewChatModalOpen(true)}>
            Новый чат
          </Button>
        </Space.Compact>
        <ChatList
          chats={
            chats.data?.filter(
              (chat) => !text || chat.name.toLowerCase().includes(text.toLowerCase())
            ) || []
          }
          className='w-full md:w-1/2 mx-auto'
        />
      </div>
    </>
  )
}
