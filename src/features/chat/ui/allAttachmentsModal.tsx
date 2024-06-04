import { DownloadOutlined } from '@ant-design/icons'
import { Button, Input, List, Modal, Spin } from 'antd'
import { useEffect, useState } from 'react'
import { useLazyGetAttachmentsQuery } from '~entities/chat'
import { downloadAttachment } from '~entities/message'

export interface AllAttachmentsModalProps {
  open: boolean
  close: () => void
  chatId: string
}

export const AllAttachmentsModal = (props: AllAttachmentsModalProps) => {
  const { open, close, chatId } = props
  const [getAttachments, getAttachmentsResult] = useLazyGetAttachmentsQuery()
  const [input, setInput] = useState('')

  const wrappedClose = () => {
    if (!getAttachmentsResult.isFetching) {
      close()
    }
  }

  useEffect(() => {
    if (open) {
      getAttachments({ chatId })
    }
  }, [open])

  const attachmentsToShow =
    getAttachmentsResult.data?.filter(
      (a) => !input || !a.name || a.name.toLowerCase().includes(input.toLowerCase())
    ) || []

  const hasAttachments = attachmentsToShow.length > 0

  return (
    <Modal
      forceRender
      title='Все вложения'
      open={open}
      onCancel={wrappedClose}
      maskClosable={false}
      footer={null}
    >
      {getAttachmentsResult.isError ? (
        <div className='my-5'>Произошла ошибка при загрузке вложений</div>
      ) : getAttachmentsResult.isFetching || getAttachmentsResult.isUninitialized ? (
        <div className='flex w-full'>
          <Spin className='my-5 mx-auto' size='large' />
        </div>
      ) : (
        <>
          {hasAttachments && (
            <Input
              placeholder='Поиск по имени'
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          )}
          <List
            className='my-2'
            bordered
            locale={{ emptyText: 'Вложения не найдены' }}
            pagination={hasAttachments ? { pageSize: 5 } : false}
            dataSource={attachmentsToShow}
            renderItem={(a) => (
              <div className='flex items-center p-2'>
                <div>{a.name || a.mimeType}</div>
                <Button
                  shape='circle'
                  className='ms-auto'
                  type='primary'
                  icon={<DownloadOutlined />}
                  onClick={() => downloadAttachment({ fileId: a.id, chatId })}
                />
              </div>
            )}
          />
        </>
      )}
    </Modal>
  )
}
