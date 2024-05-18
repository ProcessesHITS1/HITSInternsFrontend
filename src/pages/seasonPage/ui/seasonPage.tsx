import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Spin, Typography } from 'antd'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { RemoveSeasonModal, SeasonModal } from '~features/season'
import { useGetSeasonByYearQuery } from '~entities/season'
import { AppRoutes } from '~shared/config'
import { parseDate } from '~shared/lib/functions'

export const SeasonPage = () => {
  const year = useParams()['id']!
  const navigate = useNavigate()

  const seasonQuery = useGetSeasonByYearQuery({ year: +year })
  const [removeModalOpen, setRemoveModalOpen] = useState(false)
  const [seasonModalOpen, setSeasonModalOpen] = useState(false)

  if (seasonQuery.isLoading) {
    return <Spin size='large' className='mt-5' />
  }

  if (seasonQuery.error) {
    if ('status' in seasonQuery.error && seasonQuery.error.status === 404) {
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
        year={+year}
        open={removeModalOpen}
        close={() => setRemoveModalOpen(false)}
        onFinish={() => navigate(AppRoutes.SEASONS)}
      />
      <Typography.Title level={3} className='flex items-center'>
        Сезон-{seasonQuery.data?.season.year}{' '}
        <Button
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
          shape='circle'
          danger
          icon={<DeleteOutlined />}
          onClick={() => setRemoveModalOpen(true)}
        />
      </Typography.Title>

      <div className='text-slate-500'>
        {parseDate(seasonQuery.data?.season.seasonStart)}—
        {parseDate(seasonQuery.data?.season.seasonEnd)}
      </div>
    </>
  )
}
