import { Modal } from 'antd'
import { UserInfo } from '~entities/user'

export interface RequestModalProps {
  open: boolean
  close: () => void
  request: Request | null
  userInfo: UserInfo | null
}

export const RequestModal = (props: RequestModalProps) => {
  const { open, close } = props

  const wrappedClose = () => {
    close()
  }
  return (
    <Modal
      forceRender
      title={'Прогресс студента'}
      open={open}
      onCancel={wrappedClose}
      maskClosable={false}
      footer={null}
      style={{ top: 20 }}
    ></Modal>
  )
}
