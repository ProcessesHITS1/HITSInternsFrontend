import { DeleteOutlined } from '@ant-design/icons'
import { Button, List, Modal } from 'antd'
import { useRef, useState } from 'react'
import { toast } from 'react-toastify'

type AttachmentData = { data: FormData; name: string }

export interface ChatAttachmentsModalProps {
  open: boolean
  close: () => void
  attachments: AttachmentData[]
  setAttachments: (attachments: AttachmentData[]) => void
}

export const ChatAttachmentsModal = (props: ChatAttachmentsModalProps) => {
  const { open, close, attachments, setAttachments } = props

  const [fileInputKey, setFileInputKey] = useState(0)
  const ref = useRef(null as HTMLInputElement | null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files?.length) {
      return
    }
    try {
      const newAttachments: AttachmentData[] = []
      for (const file of files) {
        const formData = new FormData()
        formData.append('file', file)
        newAttachments.push({ data: formData, name: file.name })
      }
      setAttachments([...attachments, ...newAttachments])
    } catch {
      toast.error('Произошла ошибка')
    } finally {
      setFileInputKey(fileInputKey + 1)
    }
  }

  return (
    <Modal
      style={{ top: '20px' }}
      forceRender
      title='Вложения'
      open={open}
      onCancel={close}
      maskClosable={false}
      footer={null}
    >
      {attachments.length === 0 && <div className='mb-2'>Вложения не прикреплены</div>}
      {attachments.length > 0 && (
        <List
          dataSource={attachments}
          pagination={{ pageSize: 5 }}
          bordered
          renderItem={(file, i) => (
            <List.Item className='py-2 px-4'>
              <span>{file.name}</span>
              <Button
                shape='circle'
                danger
                icon={<DeleteOutlined />}
                className='ms-auto'
                onClick={() =>
                  setAttachments(attachments.filter((_, index) => i !== index))
                }
              />
            </List.Item>
          )}
        />
      )}
      <input
        multiple
        key={fileInputKey}
        type='file'
        onChange={(e) => handleFileChange(e)}
        className='block my-2'
        ref={ref}
      />
    </Modal>
  )
}
