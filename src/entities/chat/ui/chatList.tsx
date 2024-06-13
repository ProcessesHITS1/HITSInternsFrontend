import { List, Typography } from 'antd'
import cs from 'classnames'
import { useNavigate } from 'react-router-dom'
import { getChatLink } from '~shared/config'
import { Chat } from '../model'

export interface ChatListProps {
  chats: Chat[]
  className?: string
}

export const ChatList = (props: ChatListProps) => {
  const { chats, className } = props
  const navigate = useNavigate()
  return (
    <List
      pagination={{ pageSize: 7 }}
      bordered
      locale={{ emptyText: 'Чаты не найдены' }}
      className={cs('bg-white mt-4 py-2 border', className)}
      header={<div>{`Найдено чатов: ${chats.length}`}</div>}
      dataSource={chats}
      renderItem={(item) => (
        <List.Item
          className='hover:bg-gray-50 cursor-pointer'
          onClick={() => navigate(getChatLink(item.id))}
        >
          <Typography.Text className='text-blue-500'>{item.name}</Typography.Text>
        </List.Item>
      )}
    />
  )
}
