import { Modal } from 'antd'
import { toast } from 'react-toastify'
import { useCloseSemesterByIdMutation } from '~features/semester'

export interface CloseSemesterModalProps {
  open: boolean
  close: () => void
  id: string | null | undefined
}

export const CloseSemesterModal = (props: CloseSemesterModalProps) => {
  const { id, open, close } = props

  const [closeSemester, closeSemesterResult] = useCloseSemesterByIdMutation()

  const wrappedClose = () => {
    if (!closeSemesterResult.isLoading) {
      close()
    }
  }

  const closeSemesterHandler = async () => {
    if (id) {
      try {
        await closeSemester({ id }).unwrap()
        toast.success('Семестр закрыт')
        close()
      } catch {
        toast.error('Произошла ошибка')
      }
    }
  }

  return (
    <Modal
      forceRender
      title='Закрыть семестр'
      open={open}
      onCancel={wrappedClose}
      onOk={closeSemesterHandler}
      maskClosable={false}
    >
      Вы уверены, что хотите закрыть семестр практики и окончить прием дневников? После
      этого можно будет создать новый семестр практики на основе данного.
    </Modal>
  )
}
