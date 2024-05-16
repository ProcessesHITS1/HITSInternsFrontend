import { Modal } from 'antd'
import { toast } from 'react-toastify'
import { useDeleteSeasonMutation } from '~features/season'

export interface SeasonRemoveModal {
  open: boolean
  close: () => void
  year: number | null
}

export const RemoveSeasonModal = (props: SeasonRemoveModal) => {
  const { year, open, close } = props

  const [removeSeason, removeSeasonResult] = useDeleteSeasonMutation()

  const wrappedClose = () => {
    if (!removeSeasonResult.isLoading) {
      close()
    }
  }

  const removeSeasonHandler = async () => {
    if (year) {
      try {
        await removeSeason({ year }).unwrap()
        toast.success('Сезон удален')
        close()
      } catch {
        toast.error('Произошла ошибка')
      }
    }
  }

  return (
    <Modal
      forceRender
      title='Удалить сезон'
      open={open}
      onCancel={wrappedClose}
      onOk={removeSeasonHandler}
      maskClosable={false}
    >
      Вы уверены, что хотите удалить компанию?
    </Modal>
  )
}
