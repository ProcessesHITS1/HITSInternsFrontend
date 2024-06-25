import { DownloadOutlined } from '@ant-design/icons'
import { Avatar, Card } from 'antd'
import cs from 'classnames'
import { prettyParseDateTime } from '~shared/lib/functions'
import { selectAuthInfo, useAppSelector } from '~shared/lib/store'
import { downloadAttachment } from '../api'
import { Message } from '../model'

export interface MessageProps {
  message: Message
  authorName: string
  showAuthor: boolean
}

export const MessageView = (props: MessageProps) => {
  const { message, authorName, showAuthor } = props
  const my = useAppSelector(selectAuthInfo).userid === message.author
  const avatarName = convertToInitials(authorName)
  return (
    <Card
      styles={{ body: { padding: '0px' } }}
      className={cs(
        'msg max-w-[48%] border-gray-500 bg-sky-50 shadow-md rounded-[14px]',
        {
          'self-end': my,
          'rounded-br-[0px]': my,
          'rounded-bl-[0px]': !my,
          'mt-1': showAuthor,
          'mt-[3px]': !showAuthor,
        }
      )}
    >
      {showAuthor && !my && (
        <div className='flex items-center'>
          <Avatar
            className='bg-sky-100 border-teal-800 text-black text-xs shrink-0'
            size={'small'}
          >
            {avatarName}
          </Avatar>
          <span className='mx-1 text-[12.5px]'>{authorName}</span>
        </div>
      )}
      <div className='text-sm break-all ms-1'>{message.message}</div>
      {!!message.attachments.length && (
        <div className='text-xs mt-1'>
          Вложения ({message.attachments.length})
          {message.attachments.map((item) => (
            <div
              key={item.id}
              className='text-sm flex cursor-pointer'
              onClick={() =>
                downloadAttachment({ fileId: item.id, chatId: message.chatId })
              }
            >
              <span className='me-4 my-[2px] text-blue-500'>
                {item.name || item.mimeType}
              </span>
              <DownloadOutlined className='text-lg ms-auto' />
            </div>
          ))}
        </div>
      )}
      <div className='text-slate-500 text-[10px] text-right'>
        {prettyParseDateTime(message.sentAt)}
      </div>
    </Card>
  )
}

function convertToInitials(fullName: string): string {
  try {
    const _nameParts = fullName.trim().split(' ')
    const nameParts = _nameParts.length < 3 ? _nameParts : _nameParts.slice(1)
    let initials = ''
    for (let i = 0; i < Math.min(2, nameParts.length); ++i)
      initials += nameParts[i][0]?.toUpperCase()

    return initials
  } catch {
    return '-'
  }
}
