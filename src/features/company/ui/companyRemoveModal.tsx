import { Modal } from 'antd'
import { toast } from 'react-toastify'
import { useDeleteCompanyMutation } from '~features/company'

export interface CompanyRemoveModal {
  open: boolean
  close: () => void
  companyId: string | null
}

export const CompanyRemoveModal = (props: CompanyRemoveModal) => {
  const { companyId, open, close } = props

  const [removeCompany, removeCompanyResult] = useDeleteCompanyMutation()

  const wrappedClose = () => {
    if (!removeCompanyResult.isLoading) {
      close()
    }
  }

  const removeCompanyHandler = async () => {
    if (companyId) {
      try {
        await removeCompany({ id: companyId }).unwrap()
        toast.success('Компания удалена')
        close()
      } catch {
        toast.error('Произошла ошибка')
      }
    }
  }

  return (
    <Modal
      forceRender
      title='Удалить компанию'
      open={open}
      onCancel={wrappedClose}
      onOk={removeCompanyHandler}
      maskClosable={false}
    >
      Вы уверены, что хотите удалить компанию?
    </Modal>
  )
}
