import { EditOutlined } from '@ant-design/icons'
import { Button, Spin, Tabs, Typography } from 'antd'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { MarkReqWidget } from '~widgets/mark'
import { StudentsInSemesterWidget } from '~widgets/studentInSemester'
import { CloseSemesterModal, SemesterModal } from '~features/semester'
import { useGetCompaniesQuery } from '~entities/company'
import { useGetRequirementsQuery } from '~entities/mark'
import { useGetAllSeasonsQuery } from '~entities/season'
import { useGetSemesterByIdQuery } from '~entities/semester'
import { useGetNormalStudentsInSemester } from '~entities/studentInSemester'
import { useStudentsQuery } from '~entities/user'
import { AppRoutes, getSeasonLink } from '~shared/config'
import { parseDate } from '~shared/lib/functions'

export const SemesterPage = () => {
  const id = useParams()['id']!

  const [input, setInput] = useState(undefined as string | undefined)
  const seasonsQuery = useGetAllSeasonsQuery()
  const semesterQuery = useGetSemesterByIdQuery({ id })
  const companiesQuery = useGetCompaniesQuery({ page: 1, size: 10000 })
  const allStudentsQuery = useStudentsQuery()
  const studentsQuery = useGetNormalStudentsInSemester(id)
  const reqQuery = useGetRequirementsQuery({ semesterId: id })

  const [endModalOpen, setEndModalOpen] = useState(false)
  const [reqModalOpen, setReqModalOpen] = useState(false)
  const [semesterModalOpen, setSemesterModalOpen] = useState(false)
  const [diaryModalState, setDiaryModalState] = useState({
    open: false,
    diaryId: null as string | null | undefined,
  })
  const [markModalState, setMarkModalState] = useState({
    open: false,
    sisId: '',
  })

  const isLoading =
    semesterQuery.isLoading ||
    studentsQuery.isLoading ||
    companiesQuery.isLoading ||
    reqQuery.isLoading ||
    allStudentsQuery.isLoading ||
    seasonsQuery.isLoading
  const isError =
    semesterQuery.isError ||
    studentsQuery.isError ||
    companiesQuery.isError ||
    reqQuery.isError ||
    allStudentsQuery.isError ||
    seasonsQuery.isError

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
          Семестр не найден
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

  const isClosed = !!semesterQuery.data?.isClosed

  const season = seasonsQuery.data?.find((s) => s.id === semesterQuery.data?.seasonId)
  return (
    <>
      <CloseSemesterModal
        id={id}
        open={endModalOpen}
        close={() => setEndModalOpen(false)}
      />
      <SemesterModal
        semester={semesterQuery.data}
        open={semesterModalOpen}
        close={() => setSemesterModalOpen(false)}
      />
      <Typography.Title level={4} className='flex items-center mb-0'>
        {`Семестр №${semesterQuery.data?.semester}`}
        <Button
          disabled={isClosed}
          size='small'
          danger
          onClick={() => setEndModalOpen(true)}
          className='ms-2'
        >
          {isClosed ? 'Закрыт' : 'Закрыть'}
        </Button>
      </Typography.Title>
      <div className='text-slate-500 text-sm text-center'>
        <Link to={getSeasonLink(season?.year || 0)} className='block'>
          Сезон-{season?.year}
        </Link>
        Дедлайн по дневникам: {parseDate(semesterQuery.data?.documentsDeadline)}
        <Button
          disabled={isClosed}
          size='small'
          shape='circle'
          icon={<EditOutlined />}
          className='mx-2 btn-edit'
          onClick={() => setSemesterModalOpen(true)}
        />
      </div>
      <Tabs
        destroyInactiveTabPane
        className='w-full'
        defaultActiveKey='1'
        items={[
          {
            key: '1',
            label: 'Студенты',
            children: (
              <StudentsInSemesterWidget
                semesterId={id}
                companies={companiesQuery.data?.data || []}
                requirements={reqQuery.data || []}
                markModalState={markModalState}
                setMarkModalState={setMarkModalState}
                isClosed={isClosed}
                input={input}
                setInput={setInput}
                diaryModalState={diaryModalState}
                setDiaryModalState={setDiaryModalState}
                data={studentsQuery.data}
                students={allStudentsQuery.data || []}
              />
            ),
          },
          {
            key: '2',
            label: 'Требования',
            children: (
              <MarkReqWidget
                semesterId={id}
                reqModalOpen={reqModalOpen}
                setReqModal={setReqModalOpen}
                isClosed={isClosed}
                requirements={reqQuery.data || []}
              />
            ),
          },
        ]}
        centered
      />
    </>
  )
}
