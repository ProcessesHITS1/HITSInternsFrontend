import { SearchOutlined } from '@ant-design/icons'
import { Button, Input, Space } from 'antd'
import { useState } from 'react'
import {
  CompanyInSeasonModal,
  CompanyInSeasonRemoveModal,
} from '~features/companyInSeason'
import { PositionModal, RemovePositionModal } from '~features/position'
import { Company } from '~entities/company'
import { CompanyInSeasonList, CompanyInSeasonShort } from '~entities/companyInSeason'
import { Position } from '~entities/position'

export interface CompanyInSeasonSectionProps {
  companiesInSeason: CompanyInSeasonShort[]
  companies: Company[]
  year: number
  isClosed: boolean
}

export const CompanyInSeasonSection = (props: CompanyInSeasonSectionProps) => {
  const { companiesInSeason, companies, year, isClosed } = props
  const [input, setInput] = useState(undefined as string | undefined)
  const [companyId, setCompanyId] = useState('')
  const [addCompanyModalState, setCompanyModalState] = useState(false)
  const [removeCompanyModalState, setRemoveCompanyModalState] = useState({
    open: false,
    companyId: null as string | null,
  })
  const [positionModalState, setPositionModalState] = useState({
    open: false,
    position: null as Position | null,
    companyId: '',
  })
  const [removePositionModalState, setRemovePositionModalState] = useState({
    open: false,
    positionId: null as string | null,
  })
  const availableCompanies = companies.filter(
    (company) => !companiesInSeason.some((cIs) => cIs.id === company.id)
  )

  return (
    <>
      <RemovePositionModal
        open={removePositionModalState.open}
        close={() =>
          setRemovePositionModalState({ ...removePositionModalState, open: false })
        }
        positionId={removePositionModalState.positionId}
      />
      <PositionModal
        seasonYear={year}
        companyId={positionModalState.companyId}
        open={positionModalState.open}
        position={positionModalState.position}
        close={() => setPositionModalState({ ...positionModalState, open: false })}
      />
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
        {!companyId && (
          <Space.Compact className='mb-2 w-1/2 md:w-1/4'>
            <Input
              disabled={!companiesInSeason.length}
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
              disabled={isClosed || !availableCompanies.length}
            >
              Добавить
            </Button>
          </Space.Compact>
        )}

        <CompanyInSeasonList
          isClosed={isClosed}
          year={year}
          companyId={companyId}
          setCompanyId={setCompanyId}
          companies={companiesInSeason.filter(
            (company) =>
              !input || company.name.toLowerCase().includes(input.toLowerCase())
          )}
          openEditModal={() => setCompanyModalState(true)}
          openRemoveModal={(companyId) =>
            setRemoveCompanyModalState({ companyId, open: true })
          }
          openPositionModal={(position) =>
            setPositionModalState({ open: true, position, companyId })
          }
          openRemovePositionModal={(id) =>
            setRemovePositionModalState({ open: true, positionId: id })
          }
        />
      </div>
    </>
  )
}
