import { Spin, Typography } from 'antd'
import { useState } from 'react'
import { SemesterModal } from '~features/semester'
import { Semester, SemestersList, useGetAllSemestersQuery } from '~entities/semester'

export const PracticePage = () => {
  const semestersQuery = useGetAllSemestersQuery({ page: 1, size: 100000 })
  const [modalState, setModalState] = useState({
    open: false,
    semester: null as Semester | null,
  })

  if (semestersQuery.isError) {
    return 'Произошла ошибка при загрузке семестров'
  }

  if (semestersQuery.isLoading) {
    return <Spin size='large' className='mt-5' />
  }

  return (
    <>
      <SemesterModal
        semester={modalState.semester}
        open={modalState.open}
        close={() => setModalState({ ...modalState, open: false })}
      />
      <Typography.Title level={3}>Семестры практики</Typography.Title>
      <SemestersList
        semesters={semestersQuery.data?.data || []}
        openEditModal={(semester) => setModalState({ semester, open: true })}
      />
    </>
  )
}
