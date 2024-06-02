import { Modal } from 'antd'
import { toast } from 'react-toastify'
import { useDeleteStudentInSeasonMutation } from '../api'

export interface StudentInSeasonRemoveModal {
  year: number
  open: boolean
  close: () => void
  studentId: string | null
}

export const StudentInSeasonRemoveModal = (props: StudentInSeasonRemoveModal) => {
  const { studentId, open, close, year } = props

  const [removeStudent, removeStudentResult] = useDeleteStudentInSeasonMutation()

  const wrappedClose = () => {
    if (!removeStudentResult.isLoading) {
      close()
    }
  }

  const removeStudentHandler = async () => {
    if (studentId) {
      try {
        await removeStudent({ year, student: studentId }).unwrap()
        toast.success('Студент удален из сезона')
        close()
      } catch {
        toast.error('Произошла ошибка')
      }
    }
  }

  return (
    <Modal
      forceRender
      title='Удалить студента из сезона'
      open={open}
      onCancel={wrappedClose}
      onOk={removeStudentHandler}
      maskClosable={false}
    >
      Вы уверены, что хотите удалить студента из сезона?
    </Modal>
  )
}
