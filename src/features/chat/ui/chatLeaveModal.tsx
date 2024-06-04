import { Modal } from 'antd'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useLeaveChatMutation } from '~features/chat'
import { AppRoutes } from '~shared/config'

export interface ChatLeaveModal {
  open: boolean
  close: () => void
  chatId: string | null
  forceNavigate: boolean
}

export const ChatLeaveModal = (props: ChatLeaveModal) => {
  const { chatId, open, close, forceNavigate } = props
  const navigate = useNavigate()

  const [leaveChat, leaveChatResult] = useLeaveChatMutation()

  const wrappedClose = () => {
    if (!leaveChatResult.isLoading) {
      close()
    }
  }

  const removeChatHandler = async () => {
    if (chatId) {
      try {
        await leaveChat({ chatId }).unwrap()
        toast.success('Чат удален')
        close()
        if (forceNavigate) {
          navigate(AppRoutes.CHATS)
        }
      } catch {
        toast.error('Произошла ошибка')
      }
    }
  }

  return (
    <Modal
      forceRender
      title='Выйти из чата'
      open={open}
      onCancel={wrappedClose}
      onOk={removeChatHandler}
      maskClosable={false}
    >
      Вы уверены, что хотите выйти из чата?
    </Modal>
  )
}
