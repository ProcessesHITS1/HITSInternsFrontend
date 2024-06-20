import { SearchOutlined } from '@ant-design/icons'
import { Button, Input, Space, Spin, Typography } from 'antd'
import { useState } from 'react'
import { CompanyModal, CompanyRemoveModal } from '~features/company'
import { Company, CompanyList, useGetCompaniesQuery } from '~entities/company'
import { usePersonalQuery } from '~entities/user'

export const CompaniesPage = () => {
  const [input, setInput] = useState(undefined as string | undefined)
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

  const companiesToShow = companiesQuery.data?.data.filter(
    (company) => !input || company.name.toLowerCase().includes(input)
  )
  const hasNoCompanies = !companiesToShow?.length

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
      <Typography.Title level={4}>Компании</Typography.Title>
      <Space.Compact className='my-2'>
        <Input
          size='small'
          allowClear={true}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          prefix={<SearchOutlined />}
          placeholder='Поиск по названию'
        />
        <Button
          size='small'
          type='primary'
          onClick={() => setModalState({ open: true, company: null })}
        >
          Создать
        </Button>
      </Space.Compact>
      {hasNoCompanies ? (
        'Компании не найдены'
      ) : (
        <CompanyList
          personal={personalQuery.data || []}
          companies={
            companiesToShow.toSorted((a, b) => a.name.localeCompare(b.name)) || []
          }
          openEditModal={(company) => setModalState({ company, open: true })}
          openRemoveModal={(companyId) => setRemoveModalState({ companyId, open: true })}
        />
      )}
    </>
  )
}
