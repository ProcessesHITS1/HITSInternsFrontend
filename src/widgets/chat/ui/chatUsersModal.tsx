import { DeleteOutlined } from '@ant-design/icons'
import { Button, Input, List, Modal, Select, Space } from 'antd'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useAddUserToChatMutation, useRemoveUserFromChatMutation } from '~features/chat'
import { UserInfo, getName } from '~entities/user'
import { selectUserId, useAppSelector } from '~shared/lib/store'

export interface ChatUsersModalProps {
  ownerId: string
  chatId: string
  members: string[]
  users: UserInfo[]
  open: boolean
  close: () => void
}

export const ChatUsersModal = (props: ChatUsersModalProps) => {
  const { members, users, open, close, chatId, ownerId } = props
  const userId = useAppSelector(selectUserId)

  const isOwner = userId === ownerId

  const [removeUser, removeUserResult] = useRemoveUserFromChatMutation()
  const [addUser, addUserResult] = useAddUserToChatMutation()
  const [selectedId, setSelectedId] = useState(undefined as string | undefined)
  const [input, setInput] = useState('')

  const removeHandler = async (userId: string) => {
    try {
      await removeUser({ chatId, userId }).unwrap()
      toast.success('Пользователь удален')
    } catch {
      toast.error('Произошла ошибка при удалении пользователя')
    }
  }

  const addHandler = async () => {
    if (!selectedId) {
      return
    }
    try {
      await addUser({ chatId, userId: selectedId }).unwrap()
      setSelectedId(undefined)
      setInput('')
      toast.success('Пользователь добавлен')
    } catch {
      toast.error('Произошла ошибка при добавлении пользователя')
    }
  }

  const wrappedClose = () => {
    if (!removeUserResult.isLoading && !addUserResult.isLoading) {
      close()
    }
  }

  const availableUsers = users.filter((u) => !members.includes(u.id) && u.id !== userId)
  const usersInChat = users.filter(
    (u) =>
      members.includes(u.id) &&
      (!input || getName(u).toLowerCase().includes(input.toLowerCase()))
  )

  const filterOption = (input: string, option?: { label: string; value: string }) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())

  return (
    <Modal
      style={{ top: '20px' }}
      forceRender
      title='Участники чата'
      open={open}
      onCancel={wrappedClose}
      maskClosable={false}
      footer={null}
    >
      {isOwner && (
        <Space.Compact className='mb-2 w-full'>
          <Select
            className='w-full'
            value={selectedId}
            onChange={(id) => setSelectedId(id)}
            placeholder='Выберите пользователя'
            allowClear={false}
            options={availableUsers.map((u) => ({ label: getName(u), value: u.id }))}
            filterOption={filterOption}
            showSearch
          />
          <Button disabled={!selectedId} onClick={addHandler} type='primary'>
            Добавить
          </Button>
        </Space.Compact>
      )}
      <Input
        placeholder='Поиск участника'
        value={input}
        onChange={(e) => setInput(e.target.value)}
        allowClear
        className='mb-2'
      />
      <List
        locale={{ emptyText: 'Участники не найдены' }}
        pagination={{ pageSize: 5 }}
        className='mb-4'
        bordered
        dataSource={usersInChat}
        renderItem={(user) => (
          <div className='flex items-center py-2 px-4'>
            <span>{getName(user)}</span>
            {isOwner && user.id !== ownerId && (
              <Button
                danger
                shape='circle'
                icon={<DeleteOutlined />}
                className='ms-auto'
                onClick={() => removeHandler(user.id)}
              />
            )}
          </div>
        )}
      />
    </Modal>
  )
}
