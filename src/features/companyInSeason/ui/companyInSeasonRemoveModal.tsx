import { Modal } from 'antd'
import { toast } from 'react-toastify'
import { useDeleteCompanyInSeasonMutation } from '../api'

export interface CompanyInSeasonRemoveModal {
  year: number
  open: boolean
  close: () => void
  companyId: string | null
}

export const CompanyInSeasonRemoveModal = (props: CompanyInSeasonRemoveModal) => {
  const { companyId, open, close, year } = props

  const [removeCompany, removeCompanyResult] = useDeleteCompanyInSeasonMutation()

  const wrappedClose = () => {
    if (!removeCompanyResult.isLoading) {
      close()
    }
  }

  const removeCompanyHandler = async () => {
    if (companyId) {
      try {
        await removeCompany({ year, company: companyId }).unwrap()
        toast.success('Компания удалена из сезона')
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
      Вы уверены, что хотите удалить компанию из сезона?
    </Modal>
  )
}
