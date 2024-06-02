import { SearchOutlined } from '@ant-design/icons'
import { Button, Input, Space } from 'antd'
import { useState } from 'react'
import {
  CompanyInSeasonModal,
  CompanyInSeasonRemoveModal,
} from '~features/companyInSeason'
import { Company } from '~entities/company'
import { CompanyInSeasonList, CompanyInSeasonShort } from '~entities/companyInSeason'

export interface CompanyInSeasonSectionProps {
  companiesInSeason: CompanyInSeasonShort[]
  companies: Company[]
  year: number
}

export const CompanyInSeasonSection = (props: CompanyInSeasonSectionProps) => {
  const { companiesInSeason, companies, year } = props
  const [input, setInput] = useState(undefined as string | undefined)
  const [addCompanyModalState, setCompanyModalState] = useState(false)
  const [removeCompanyModalState, setRemoveCompanyModalState] = useState({
    open: false,
    companyId: null as string | null,
  })
  const availableCompanies = companies.filter(
    (company) => !companiesInSeason.some((cIs) => cIs.id === company.id)
  )

  return (
    <>
      <CompanyInSeasonModal
        companies={availableCompanies}
        open={addCompanyModalState}
        close={() => setCompanyModalState(false)}
        year={year}
      />
      <CompanyInSeasonRemoveModal
        open={removeCompanyModalState.open}
        companyId={removeCompanyModalState.companyId}
        close={() =>
          setRemoveCompanyModalState({ ...removeCompanyModalState, open: false })
        }
        year={year}
      />
      <div className='flex flex-col items-center'>
        <Space.Compact className='mb-2 w-1/2 md:w-1/4'>
          <Input
            size='small'
            placeholder='Поиск компании'
            prefix={<SearchOutlined />}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            allowClear={true}
          />
          <Button
            size='small'
            onClick={() => setCompanyModalState(true)}
            disabled={!availableCompanies.length}
          >
            Добавить
          </Button>
        </Space.Compact>

        <CompanyInSeasonList
          companies={companiesInSeason.filter(
            (company) =>
              !input || company.name.toLowerCase().includes(input.toLowerCase())
          )}
          openEditModal={() => setCompanyModalState(true)}
          openRemoveModal={(companyId) =>
            setRemoveCompanyModalState({ companyId, open: true })
          }
        />
      </div>
    </>
  )
}
