import { Button, Spin, Typography } from 'antd'
import { useState } from 'react'
import { CompanyModal, CompanyRemoveModal } from '~features/company'
import { Company, CompanyList, useGetCompaniesQuery } from '~entities/company'
import { usePersonalQuery } from '~entities/user'

export const CompaniesPage = () => {
  const [modalState, setModalState] = useState({
    open: false,
    company: null as Company | null,
  })
  const [removeModalState, setRemoveModalState] = useState({
    open: false,
    companyId: null as string | null,
  })
  const companiesQuery = useGetCompaniesQuery({ page: 1, size: 10000 })
  const personalQuery = usePersonalQuery()

  if (companiesQuery.isError || personalQuery.isError) {
    return 'Произошла ошибка при загрузке данных'
  }

  if (companiesQuery.isLoading || personalQuery.isLoading) {
    return <Spin size='large' className='mt-5' />
  }

  const hasNoCompanies = !companiesQuery.data?.data.length
  return (
    <>
      <CompanyModal
        open={modalState.open}
        close={() => setModalState({ ...modalState, open: false })}
        company={modalState.company}
        personal={personalQuery.data || []}
      />
      <CompanyRemoveModal
        open={removeModalState.open}
        close={() => setRemoveModalState({ ...removeModalState, open: false })}
        companyId={removeModalState.companyId}
      />
      <Button onClick={() => setModalState({ open: true, company: null })}>
        Добавить компанию
      </Button>
      <Typography.Title level={3} className='my-1'>
        Компании
      </Typography.Title>
      {hasNoCompanies ? (
        'Нет компаний'
      ) : (
        <CompanyList
          personal={personalQuery.data || []}
          companies={companiesQuery.data?.data || []}
          openEditModal={(company) => setModalState({ company, open: true })}
          openRemoveModal={(companyId) => setRemoveModalState({ companyId, open: true })}
        />
      )}
    </>
  )
}
