import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Spin, Tabs, Typography } from 'antd'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CompanyInSeasonSection } from '~widgets/companyInSeason'
import { StudentInSeasonSection } from '~widgets/studentInSeason'
import { RemoveSeasonModal, SeasonModal } from '~features/season'
import { useGetCompaniesQuery } from '~entities/company'
import { useGetProfessionsQuery } from '~entities/profession'
import { useGetSeasonByYearQuery } from '~entities/season'
import { useStudentsQuery } from '~entities/user'
import { AppRoutes } from '~shared/config'
import { parseDate } from '~shared/lib/functions'

export const SeasonPage = () => {
  const year = +useParams()['id']!
  const navigate = useNavigate()

  const seasonQuery = useGetSeasonByYearQuery({ year })
  const companiesQuery = useGetCompaniesQuery({ page: 1, size: 10000 })
  const studentsQuery = useStudentsQuery()
  const professionsQuery = useGetProfessionsQuery()

  const [removeModalOpen, setRemoveModalOpen] = useState(false)
  const [seasonModalOpen, setSeasonModalOpen] = useState(false)

  const isLoading =
    seasonQuery.isLoading ||
    studentsQuery.isLoading ||
    companiesQuery.isLoading ||
    professionsQuery.isLoading
  const isError = seasonQuery.isError || studentsQuery.isError || companiesQuery.isError //prof

  if (isLoading) {
    return <Spin size='large' className='mt-5' />
  }

  if (isError) {
    if (
      seasonQuery.error &&
      'status' in seasonQuery.error &&
      seasonQuery.error.status === 404
    ) {
      return 'Сезон не найден'
    }
    return 'Произошла ошибка при загрузке сезона'
  }

  return (
    <>
      <SeasonModal
        season={seasonQuery.data!.season}
        open={seasonModalOpen}
        close={() => setSeasonModalOpen(false)}
      />
      <RemoveSeasonModal
        year={year}
        open={removeModalOpen}
        close={() => setRemoveModalOpen(false)}
        onFinish={() => navigate(AppRoutes.SEASONS)}
      />
      <Typography.Title level={4} className='flex items-center'>
        Сезон-{seasonQuery.data?.season.year}{' '}
        <Button
          size='small'
          shape='circle'
          icon={<EditOutlined />}
          className='mx-2'
          onClick={() => setSeasonModalOpen(true)}
          style={{
            color: 'rgb(254, 193, 38)',
            borderColor: 'rgb(254, 193, 38)',
          }}
        />
        <Button
          size='small'
          shape='circle'
          danger
          icon={<DeleteOutlined />}
          onClick={() => setRemoveModalOpen(true)}
        />
      </Typography.Title>
      <div className='text-slate-500 text-sm'>
        {parseDate(seasonQuery.data?.season.seasonStart)}—
        {parseDate(seasonQuery.data?.season.seasonEnd)}
      </div>

      <Tabs
        className='w-full'
        defaultActiveKey='1'
        items={[
          {
            key: '1',
            label: 'Студенты',
            children: (
              <StudentInSeasonSection
                students={studentsQuery.data || []}
                studentsInSeason={seasonQuery.data?.students || []}
                year={year}
              />
            ),
          },
          {
            key: '2',
            label: 'Компании',
            children: (
              <CompanyInSeasonSection
                professions={professionsQuery.data || []}
                companiesInSeason={seasonQuery.data?.companies || []}
                companies={companiesQuery.data?.data || []}
                year={year}
              />
            ),
          },
        ]}
        centered
      />
    </>
  )
}
