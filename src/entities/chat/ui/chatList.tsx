import { DeleteOutlined } from '@ant-design/icons'
import { Button, List, Typography } from 'antd'
import cs from 'classnames'
import { useNavigate } from 'react-router-dom'
import { getChatLink } from '~shared/config'
import { Chat } from '../model'

export interface ChatListProps {
  chats: Chat[]
  className?: string
  openRemoveModal?: (id: string) => void
}

export const ChatList = (props: ChatListProps) => {
  const { chats, className, openRemoveModal } = props
  const navigate = useNavigate()
  return (
    <List
      pagination={{ pageSize: 8 }}
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
          {openRemoveModal && (
            <Button
              icon={<DeleteOutlined />}
              shape='circle'
              danger
              className='me-4'
              onClick={(e) => {
                e.stopPropagation()
                openRemoveModal(item.id)
              }}
            />
          )}
        </List.Item>
      )}
    />
  )
}
