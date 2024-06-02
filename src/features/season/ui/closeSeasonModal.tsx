import { Modal } from 'antd'
import { toast } from 'react-toastify'
import { useCloseSeasonMutation } from '~features/season'

export interface CloseSeasonModalProps {
  open: boolean
  close: () => void
  year: number | null
}

export const CloseSeasonModal = (props: CloseSeasonModalProps) => {
  const { year, open, close } = props

  const [closeSeason, closeSeasonResult] = useCloseSeasonMutation()

  const wrappedClose = () => {
    if (!closeSeasonResult.isLoading) {
      close()
    }
  }

  const closeSeasonHandler = async () => {
    if (year) {
      try {
        await closeSeason({ year }).unwrap()
        toast.success('Сезон закрыт')
        close()
      } catch {
        toast.error('Произошла ошибка')
      }
    }
  }

  return (
    <Modal
      forceRender
      title='Закрыть сезон'
      open={open}
      onCancel={wrappedClose}
      onOk={closeSeasonHandler}
      maskClosable={false}
    >
      Вы уверены, что хотите закрыть сезон?
    </Modal>
  )
}
