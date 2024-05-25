import { Button } from 'antd'
import { useState } from 'react'
import {
  CompanyInSeasonModal,
  CompanyInSeasonRemoveModal,
} from '~features/companyInSeason'
import { Company } from '~entities/company'
import { CompanyInSeasonList, CompanyInSeasonShort } from '~entities/companyInSeason'
import { Profession } from '~entities/profession'

export interface CompanyInSeasonSectionProps {
  companiesInSeason: CompanyInSeasonShort[]
  companies: Company[]
  professions: Profession[]
  year: number
}

export const CompanyInSeasonSection = (props: CompanyInSeasonSectionProps) => {
  const { companiesInSeason, companies, year } = props
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
        <Button
          className='mb-2'
          size='small'
          onClick={() => setCompanyModalState(true)}
          disabled={!availableCompanies.length}
        >
          Добавить компанию
        </Button>
        <CompanyInSeasonList
          companies={companiesInSeason}
          openEditModal={() => setCompanyModalState(true)}
          openRemoveModal={(companyId) =>
            setRemoveCompanyModalState({ companyId, open: true })
          }
        />
      </div>
    </>
  )
}
