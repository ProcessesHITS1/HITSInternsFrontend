import { Dropdown } from 'antd'
import { Link } from 'react-router-dom'
import { ExtendedChat } from '~entities/chat'
import { AppRoutes } from '~shared/config'
import { selectUserId, useAppSelector } from '~shared/lib/store'

export interface ChatHeaderProps {
  chat: ExtendedChat | undefined
  openUsersModal: () => void
  openLeaveModal: () => void
  openAttachmentsModal: () => void
}

export const ChatHeader = (props: ChatHeaderProps) => {
  const { chat, openUsersModal, openAttachmentsModal, openLeaveModal } = props
  const userid = useAppSelector(selectUserId)

  if (!chat) {
    return null
  }

  return (
    <div className='w-[95vw] h-[76px] sm:h-[42px] flex flex-col sm:flex-row items-center bg-white shadow px-5'>
      <Link to={AppRoutes.CHATS}>{'< Список чатов'}</Link>
      <div className='inline-block mx-auto text-lg'>{chat.name}</div>
      <Dropdown
        menu={{
          items: [
            { key: 'users', label: 'Участники', onClick: openUsersModal },
            { key: 'attachments', label: 'Файлы', onClick: openAttachmentsModal },
          ].concat(
            userid === chat.ownerId
              ? []
              : [{ key: 'leave', label: 'Покинуть чат', onClick: openLeaveModal }]
          ),
        }}
      >
        <span className='text-blue-500 cursor-pointer'>Инфо</span>
      </Dropdown>
    </div>
  )
}
