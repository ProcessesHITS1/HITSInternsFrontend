import { Button, Spin, Typography } from 'antd'
import { useState } from 'react'
import { RemoveSeasonModal, SeasonModal } from '~features/season'
import { Season, SeasonsList, useGetAllSeasonsQuery } from '~entities/season'

export const SeasonsPage = () => {
  const seasonsQuery = useGetAllSeasonsQuery()
  const [modalState, setModalState] = useState({
    open: false,
    season: null as Season | null,
  })
  const [removeModalState, setRemoveModalState] = useState({
    open: false,
    year: null as number | null,
  })

  if (seasonsQuery.isError) {
    return 'Произошла ошибка при загрузке сезонов'
  }

  if (seasonsQuery.isLoading) {
    return <Spin size='large' className='mt-5' />
  }

  return (
    <>
      <Typography.Title level={3}>Сезоны</Typography.Title>
      <RemoveSeasonModal
        year={removeModalState.year}
        open={removeModalState.open}
        close={() => setRemoveModalState({ ...removeModalState, open: false })}
      />
      <SeasonModal
        open={modalState.open}
        season={modalState.season}
        close={() => setModalState({ ...modalState, open: false })}
      />
      <Button
        onClick={() => setModalState({ open: true, season: null })}
        className='mb-4'
      >
        Добавить сезон
      </Button>
      <SeasonsList
        seasons={seasonsQuery.data || []}
        openEditModal={(season) => setModalState({ season, open: true })}
        openRemoveModal={(year) => setRemoveModalState({ year, open: true })}
      />
    </>
  )
}
