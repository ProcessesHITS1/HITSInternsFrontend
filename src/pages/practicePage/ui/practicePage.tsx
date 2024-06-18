import { Spin, Typography } from 'antd'
import { useState } from 'react'
import { SemesterModal } from '~features/semester'
import { useGetAllSeasonsQuery } from '~entities/season'
import { Semester, SemestersList, useGetAllSemestersQuery } from '~entities/semester'

export const PracticePage = () => {
  const semestersQuery = useGetAllSemestersQuery({ page: 1, size: 100000 })
  const seasonsQuery = useGetAllSeasonsQuery()
  const [modalState, setModalState] = useState({
    open: false,
    semester: null as Semester | null,
  })

  if (semestersQuery.isError || seasonsQuery.isError) {
    return 'Произошла ошибка'
  }

  if (semestersQuery.isLoading || seasonsQuery.isLoading) {
    return <Spin size='large' className='mt-5' />
  }

  return (
    <>
      <SemesterModal
        semester={modalState.semester}
        open={modalState.open}
        close={() => setModalState({ ...modalState, open: false })}
      />
      <Typography.Title level={4}>Семестры практики</Typography.Title>
      <SemestersList
        semesters={semestersQuery.data?.data || []}
        seasons={seasonsQuery.data || []}
        openEditModal={(semester) => setModalState({ semester, open: true })}
      />
    </>
  )
}
