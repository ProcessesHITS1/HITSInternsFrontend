import { SendOutlined, FileAddOutlined } from '@ant-design/icons'
import * as signalR from '@microsoft/signalr'
import { Badge, Button, Input, Spin } from 'antd'
import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ChatHeader, ChatUsersModal, ChatView } from '~widgets/chat'
import {
  ChatAttachmentsModal,
  ChatLeaveModal,
  AllAttachmentsModal,
  useUploadFileMutation,
} from '~features/chat'
import { useGetChatQuery } from '~entities/chat'
import { useGetMessagesQuery } from '~entities/message'
import { useGetAllUsersQuery } from '~entities/user'
import { AppRoutes, JWT_LS_KEYNAME } from '~shared/config'

export const ChatPage = () => {
  const id = useParams()['id']!
  const [usersModalOpen, setUsersModalOpen] = useState(false)
  const [leaveModalOpen, setLeaveModalOpen] = useState(false)
  const [allAttachmentsModalOpen, setAllAttachmentsModalOpen] = useState(false)
  const [attachmentsModalOpen, setAttachmentsModalOpen] = useState(false)
  const [attachments, setAttachments] = useState<{ data: FormData; name: string }[]>([])
  const [messageContent, setMessageContent] = useState('')
  const [sending, setSending] = useState(false)

  const chatQuery = useGetChatQuery({ groupId: id })
  const messagesQuery = useGetMessagesQuery({ chatId: id })
  const usersQuery = useGetAllUsersQuery({ page: 1, size: 100000 })
  const [uploadFile] = useUploadFileMutation()

  const [connection, setConnection] = useState<signalR.HubConnection | null>(null)

  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:8010/chatting', {
        accessTokenFactory: () => {
          return localStorage.getItem(JWT_LS_KEYNAME) || ''
        },
        withCredentials: false,
      })
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Debug)
      .build()

    setConnection(newConnection)
  }, [])

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          connection.invoke('Join', id)
        })
        .catch((err) => console.log('Error while starting connection: ' + err))

      connection.on('ReceiveMessage', () => {
        console.log('Message received:', 'message')
      })
    }
  }, [connection])

  const sendMessage = async () => {
    try {
      setSending(true)

      const AttachmentIds: string[] = []

      for (const { data } of attachments) {
        const attachmentId = await uploadFile({ chatId: id, file: data }).unwrap()
        AttachmentIds.push(attachmentId)
      }

      await connection?.invoke('Send', {
        ChatId: id,
        Message: messageContent,
        AttachmentIds,
      })
      setMessageContent('')
      setAttachments([])
    } catch {
      toast.error('Произошла ошибка')
    } finally {
      setSending(false)
    }
  }

  if (chatQuery.isError || messagesQuery.isError || usersQuery.isError) {
    return (
      <>
        Произошла ошибка при загрузке чата
        <Link to={AppRoutes.CHATS}>Вернуться к чатам</Link>
      </>
    )
  }

  if (chatQuery.isLoading || messagesQuery.isLoading) {
    return <Spin className='mt-5' size='large' />
  }

  return (
    <>
      <ChatAttachmentsModal
        attachments={attachments}
        setAttachments={setAttachments}
        open={attachmentsModalOpen}
        close={() => setAttachmentsModalOpen(false)}
      />
      <ChatUsersModal
        ownerId={chatQuery.data?.ownerId || ''}
        chatId={id}
        members={chatQuery.data?.members || []}
        users={usersQuery.data?.data || []}
        open={usersModalOpen}
        close={() => setUsersModalOpen(false)}
      />
      <ChatLeaveModal
        forceNavigate
        chatId={id}
        open={leaveModalOpen}
        close={() => setLeaveModalOpen(false)}
      />
      <AllAttachmentsModal
        open={allAttachmentsModalOpen}
        close={() => setAllAttachmentsModalOpen(false)}
        chatId={id}
      />
      <div className='flex flex-col w-[95vw] bg-white shadow-md] h-[max(calc(100vh-74px),500px)] text-sm'>
        <ChatHeader
          chat={chatQuery.data}
          openUsersModal={() => setUsersModalOpen(true)}
          openLeaveModal={() => setLeaveModalOpen(true)}
          openAttachmentsModal={() => setAllAttachmentsModalOpen(true)}
        />
        <ChatView
          messages={messagesQuery.data || []}
          users={usersQuery.data?.data || []}
        />
        <div className='flex w-[95vw] bg-white shadow p-2 border-t'>
          <Input.TextArea
            disabled={sending}
            autoSize={{ minRows: 3, maxRows: 6 }}
            className='flex items-center'
            placeholder='Введите сообщение'
            value={messageContent}
            onChange={(e) => setMessageContent(e.target.value)}
          />
          <Badge
            showZero={false}
            count={attachments.length}
            style={{
              right: '16px',
              top: '4px',
              background: 'limegreen',
              cursor: 'pointer',
            }}
            size='small'
          >
            <Button
              disabled={sending}
              className='mx-2'
              shape='circle'
              size='large'
              icon={<FileAddOutlined />}
              onClick={() => setAttachmentsModalOpen(true)}
            />
          </Badge>
          <Button
            disabled={sending || (!messageContent.trim() && !attachments.length)}
            type='primary'
            shape='circle'
            size='large'
            icon={<SendOutlined className='ms-1' />}
            onClick={sendMessage}
          />
        </div>
      </div>
    </>
  )
}
