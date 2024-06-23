import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Spin, Tabs, Typography } from 'antd'
import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { CompanyInSeasonSection } from '~widgets/companyInSeason'
import { StudentInSeasonSection } from '~widgets/studentInSeason'
import { RequestTemplateModal, RequestStatusTemplatesList } from '~features/request'
import { CloseSeasonModal, RemoveSeasonModal, SeasonModal } from '~features/season'
import { useGetCompaniesQuery } from '~entities/company'
import { useGetReqStatusesQuery } from '~entities/request'
import {
  useGetSeasonCompaniesByYearQuery,
  useGetSeasonInfoByYearQuery,
  useGetSeasonStudentsByYearQuery,
} from '~entities/season'
import { useStudentsQuery } from '~entities/user'
import { AppRoutes } from '~shared/config'
import { parseDate } from '~shared/lib/functions'

export const SeasonPage = () => {
  const year = +useParams()['id']!
  const navigate = useNavigate()

  const seasonInfoQuery = useGetSeasonInfoByYearQuery({ year })
  const seasonCompQuery = useGetSeasonCompaniesByYearQuery({ year })
  const seasonStudQuery = useGetSeasonStudentsByYearQuery({ year })
  const companiesQuery = useGetCompaniesQuery({ page: 1, size: 10000 })
  const studentsQuery = useStudentsQuery()
  const templatesQuery = useGetReqStatusesQuery({ year })

  const [removeModalOpen, setRemoveModalOpen] = useState(false)
  const [endModalOpen, setEndModalOpen] = useState(false)
  const [seasonModalOpen, setSeasonModalOpen] = useState(false)
  const [requestTModalState, setRequestTModalState] = useState(false)

  const isLoading =
    seasonInfoQuery.isLoading ||
    seasonCompQuery.isLoading ||
    seasonStudQuery.isLoading ||
    studentsQuery.isLoading ||
    companiesQuery.isLoading ||
    templatesQuery.isLoading
  const isError =
    seasonInfoQuery.isError ||
    seasonCompQuery.isError ||
    seasonStudQuery.isError ||
    studentsQuery.isError ||
    companiesQuery.isError ||
    templatesQuery.isError

  if (isLoading) {
    return <Spin size='large' className='mt-5' />
  }

  if (isError) {
    return (
      <>
        Произошла ошибка
        <Link to={AppRoutes.SEASONS}>Перейти к странице сезонов собеседований</Link>
      </>
    )
  }

  const isClosed = !!seasonInfoQuery.data?.isClosed

  return (
    <>
      <RequestTemplateModal
        year={year}
        open={requestTModalState}
        close={() => setRequestTModalState(false)}
      />
      <CloseSeasonModal
        year={year}
        open={endModalOpen}
        close={() => setEndModalOpen(false)}
      />
      <SeasonModal
        season={seasonInfoQuery.data!}
        open={seasonModalOpen}
        close={() => setSeasonModalOpen(false)}
        copy={false}
        showYear={false}
      />
      <RemoveSeasonModal
        year={year}
        open={removeModalOpen}
        close={() => setRemoveModalOpen(false)}
        onFinish={() => navigate(AppRoutes.SEASONS)}
      />
      <Typography.Title level={4} className='flex items-center mb-0'>
        Сезон-{year}
        <Button
          disabled={isClosed}
          size='small'
          shape='circle'
          icon={<EditOutlined />}
          className='mx-2 btn-edit'
          onClick={() => setSeasonModalOpen(true)}
        />
        <Button
          disabled={isClosed}
          size='small'
          shape='circle'
          danger
          icon={<DeleteOutlined />}
          onClick={() => setRemoveModalOpen(true)}
        />
      </Typography.Title>
      <div className='text-slate-500 text-xs'>
        {parseDate(seasonInfoQuery.data?.seasonStart)}—
        {parseDate(seasonInfoQuery.data?.seasonEnd)}
      </div>

      <Button
        disabled={isClosed}
        size='small'
        danger
        className='mt-1 text-xs'
        onClick={() => setEndModalOpen(true)}
      >
        {isClosed ? 'Сезон закрыт' : 'Закрыть сезон'}
      </Button>

      <Tabs
        destroyInactiveTabPane
        className='w-full'
        defaultActiveKey='1'
        items={[
          {
            key: '1',
            label: 'Студенты',
            children: (
              <StudentInSeasonSection
                companies={companiesQuery.data?.data || []}
                isClosed={isClosed}
                students={studentsQuery.data || []}
                studentsInSeason={seasonStudQuery.data || []}
                year={year}
              />
            ),
          },
          {
            key: '2',
            label: 'Компании',
            children: (
              <CompanyInSeasonSection
                isClosed={isClosed}
                companiesInSeason={seasonCompQuery.data || []}
                companies={companiesQuery.data?.data || []}
                year={year}
              />
            ),
          },
          {
            key: '3',
            label: 'Этапы собесов',
            children: (
              <div className='w-100 flex flex-col items-center'>
                <Button
                  type='primary'
                  className='mb-2'
                  disabled={isClosed}
                  onClick={() => setRequestTModalState(true)}
                >
                  Добавить этап
                </Button>
                <RequestStatusTemplatesList
                  isClosed={isClosed}
                  statuses={templatesQuery.data || []}
                />
              </div>
            ),
          },
        ]}
        centered
      />
    </>
  )
}
