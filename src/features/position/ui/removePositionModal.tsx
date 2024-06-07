import { Modal } from 'antd'
import { toast } from 'react-toastify'
import { useRemovePositionMutation } from '~features/position'

export interface PositionRemoveModal {
  open: boolean
  close: () => void
  positionId: string | null
}

export const RemovePositionModal = (props: PositionRemoveModal) => {
  const { positionId, open, close } = props

  const [removePosition, removePositionResult] = useRemovePositionMutation()

  const wrappedClose = () => {
    if (!removePositionResult.isLoading) {
      close()
    }
  }

  const removePositionHandler = async () => {
    if (positionId) {
      try {
        await removePosition({ positionId }).unwrap()
        toast.success('Позиция удалена')
        close()
      } catch {
        toast.error('Произошла ошибка')
      }
    }
  }

  return (
    <Modal
      forceRender
      title='Удалить позицию'
      open={open}
      onCancel={wrappedClose}
      onOk={removePositionHandler}
      maskClosable={false}
    >
      Вы уверены, что хотите удалить позицию?
    </Modal>
  )
}
