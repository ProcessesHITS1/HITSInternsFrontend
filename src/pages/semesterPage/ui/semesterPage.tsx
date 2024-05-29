import { EditOutlined } from '@ant-design/icons'
import { Button, Spin, Typography } from 'antd'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { DiaryModal } from '~features/diary'
import { CloseSemesterModal, SemesterModal } from '~features/semester'
import { useGetCompaniesQuery } from '~entities/company'
import { useGetSemesterByIdQuery } from '~entities/semester'
import {
  StudentInSemesterList,
  useGetNormalStudentsInSemester,
} from '~entities/studentInSemester'
import { AppRoutes, getSeasonLink } from '~shared/config'
import { parseDate } from '~shared/lib/functions'

export const SemesterPage = () => {
  const id = useParams()['id']!

  const semesterQuery = useGetSemesterByIdQuery({ id })
  const companiesQuery = useGetCompaniesQuery({ page: 1, size: 10000 })
  const studentsQuery = useGetNormalStudentsInSemester(id)

  const [endModalOpen, setEndModalOpen] = useState(false)
  const [semesterModalOpen, setSemesterModalOpen] = useState(false)
  const [diaryModalState, setDiaryModalState] = useState({
    open: false,
    diaryId: null as string | null | undefined,
  })

  const isLoading =
    semesterQuery.isLoading || studentsQuery.isLoading || companiesQuery.isLoading
  const isError = semesterQuery.isError || studentsQuery.isError || companiesQuery.isError

  if (isLoading) {
    return <Spin size='large' className='mt-5' />
  }

  if (isError) {
    if (
      semesterQuery.error &&
      'status' in semesterQuery.error &&
      semesterQuery.error.status === 404
    ) {
      return (
        <>
          Сезон не найден
          <Link to={AppRoutes.SEASONS}>Перейти к странице сезонов собеседований</Link>
        </>
      )
    }
    return (
      <>
        Произошла ошибка при загрузке сезона
        <Link to={AppRoutes.SEASONS}>Перейти к странице сезонов собеседований</Link>
      </>
    )
  }

  return (
    <>
      <CloseSemesterModal
        id={semesterQuery.data?.id}
        open={endModalOpen}
        close={() => setEndModalOpen(false)}
      />
      <SemesterModal
        semester={semesterQuery.data}
        open={semesterModalOpen}
        close={() => setSemesterModalOpen(false)}
      />
      <DiaryModal
        isOpen={diaryModalState.open}
        diaryId={diaryModalState.diaryId}
        close={() => setDiaryModalState({ ...diaryModalState, open: false })}
      />
      <Typography.Title level={4} className='flex items-center mb-0'>
        {`Семестр №${semesterQuery.data?.semester}`}
      </Typography.Title>
      <div className='text-slate-500 text-sm text-center'>
        <Link to={getSeasonLink(semesterQuery.data?.year || 0)} className='block'>
          Сезон-{semesterQuery.data?.year}
        </Link>
        Дедлайн: {parseDate(semesterQuery.data?.documentsDeadline)}
        <Button
          size='small'
          shape='circle'
          icon={<EditOutlined />}
          className='mx-2'
          onClick={() => setSemesterModalOpen(true)}
          style={{
            color: 'rgb(254, 193, 38)',
            borderColor: 'rgb(254, 193, 38)',
          }}
        />
      </div>
      <Button
        size='small'
        danger
        className='mt-1 mb-2'
        onClick={() => setEndModalOpen(true)}
      >
        Завершить прием дневников
      </Button>
      <StudentInSemesterList
        studentsInSemester={studentsQuery.data || []}
        openStudentModal={(diaryId) =>
          setDiaryModalState({ open: true, diaryId: diaryId })
        }
      />
    </>
  )
}
