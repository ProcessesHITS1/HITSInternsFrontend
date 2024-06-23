import { Button, Spin, Typography } from 'antd'
import { useState } from 'react'
import { RemoveSeasonModal, SeasonModal } from '~features/season'
import { Season, SeasonsList, useGetAllSeasonsQuery } from '~entities/season'

export const SeasonsPage = () => {
  const seasonsQuery = useGetAllSeasonsQuery()
  const [modalState, setModalState] = useState({
    open: false,
    season: null as Season | null,
    copy: false,
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
      <div className='flex items-center mb-3'>
        <Typography.Title level={4}>Сезоны собеседований</Typography.Title>
        <Button
          className='ms-2'
          size='small'
          onClick={() => setModalState({ open: true, season: null, copy: false })}
          type='primary'
        >
          Создать
        </Button>
      </div>
      <RemoveSeasonModal
        year={removeModalState.year}
        open={removeModalState.open}
        close={() => setRemoveModalState({ ...removeModalState, open: false })}
      />
      <SeasonModal
        open={modalState.open}
        season={modalState.season}
        close={() => setModalState({ ...modalState, open: false })}
        copy={modalState.copy}
      />
      <SeasonsList
        seasons={seasonsQuery.data?.toSorted((a, b) => b.year - a.year) || []}
        openEditModal={(season, copy) => setModalState({ season, open: true, copy })}
        openRemoveModal={(year) => setRemoveModalState({ year, open: true })}
      />
    </>
  )
}
