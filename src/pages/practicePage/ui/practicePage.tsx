import { Select, Spin, Typography } from 'antd'
import { useState } from 'react'
import { SemesterCloneModal, SemesterModal } from '~features/semester'
import { useGetAllSeasonsQuery } from '~entities/season'
import { Semester, SemestersList, useGetAllSemestersQuery } from '~entities/semester'

export const PracticePage = () => {
  const semestersQuery = useGetAllSemestersQuery({ page: 1, size: 100000 })
  const [select, setSelect] = useState(null as string | null)
  const seasonsQuery = useGetAllSeasonsQuery()
  const [modalState, setModalState] = useState({
    open: false,
    semester: null as Semester | null,
  })
  const [cloneModalState, setCloneModalState] = useState({
    open: false,
    semester: null as Semester | null,
    year: null as number | null,
  })

  if (semestersQuery.isError || seasonsQuery.isError) {
    return 'Произошла ошибка'
  }

  if (semestersQuery.isLoading || seasonsQuery.isLoading) {
    return <Spin size='large' className='mt-5' />
  }

  const hasSeasons = seasonsQuery.data?.length || 0 > 0

  return (
    <>
      <SemesterModal
        semester={modalState.semester}
        open={modalState.open}
        close={() => setModalState({ ...modalState, open: false })}
      />
      <SemesterCloneModal
        semester={cloneModalState.semester}
        open={cloneModalState.open}
        year={cloneModalState.year}
        close={() => setCloneModalState({ ...cloneModalState, open: false })}
      />
      <Typography.Title level={4}>Семестры практики</Typography.Title>
      {hasSeasons && (
        <Select
          value={select}
          onChange={setSelect}
          allowClear
          size='small'
          placeholder='Сезон'
          className='w-[144px] mt-1'
          options={
            seasonsQuery.data
              ?.toSorted((a, b) => b.year - a.year)
              .map((s) => ({ label: `Сезон-${s.year}`, value: s.id })) || []
          }
        />
      )}
      <SemestersList
        semesters={
          semestersQuery.data?.data
            .toSorted(
              (a, b) => b.documentsDeadline?.localeCompare(a.documentsDeadline || '') || 0
            )
            .filter((s) => !select || s.seasonId === select) || []
        }
        seasons={seasonsQuery.data || []}
        openEditModal={(semester) => setModalState({ semester, open: true })}
        openCloneModal={(semester, year) =>
          setCloneModalState({ semester, year, open: true })
        }
      />
    </>
  )
}
