import { DeleteOutlined } from '@ant-design/icons'
import { Button, Row, Col, Card, Flex, Spin } from 'antd'
import { useGetRequestsQuery, getResultStatusName, Request } from '~entities/request/@x'
import { parseDate } from '~shared/lib/functions'
import { getEmplStatusName } from '../lib'
import { StudentInSeason } from '../model'

export interface StudentInSeasonListProps {
  studentId: string
  setStudentId: (id: string) => void
  studentsInSeason: StudentInSeason[]
  openRemoveModal: (id: string) => void
  openReqModal: (req: Request) => void
  isClosed: boolean
}

export const StudentInSeasonList = (props: StudentInSeasonListProps) => {
  const {
    studentsInSeason,
    openRemoveModal,
    openReqModal,
    isClosed,
    studentId,
    setStudentId,
  } = props
  const requests = useGetRequestsQuery(
    {
      page: 1,
      pageSize: 100000,
      includeHistory: true,
      studentIds: [studentId],
    },
    { skip: !studentId }
  )

  if (requests.isFetching) {
    return <Spin size='large' className='mt-2' />
  }

  if (!studentsInSeason.length) {
    return <div className='text-center'>Студенты не найдены</div>
  }

  if (studentId) {
    const reqsData = requests.data?.items || []

    const studentName = studentsInSeason.find((s) => s.id === studentId)?.name
    return (
      <>
        <div>
          <Button
            size='small'
            className='mx-2 inline-block font-bold'
            shape='circle'
            onClick={() => setStudentId('')}
          >
            {'<'}
          </Button>
          Прогресс: {studentName}
        </div>

        {reqsData?.length || 0 > 0 ? (
          <Row gutter={16} className='w-full mt-2'>
            {reqsData.map((r) => {
              const hasSnapshots = r.requestStatusSnapshots?.length || 0 > 0
              const currentSnapshot = r.requestStatusSnapshots?.[0]
              const hasResult = !!r.requestResult
              const result = r.requestResult
              return (
                <Col xs={24} md={12} lg={8} className='mb-4' key={r.id}>
                  <Card title={r.positionTitle} hoverable onClick={() => openReqModal(r)}>
                    <div className='flex'>
                      <span className='text-stone-500'>Обновлено:</span>
                      <span className='ms-[0.25rem]'>
                        {hasSnapshots ? parseDate(currentSnapshot?.dateTime) : '–'}
                      </span>
                    </div>
                    <div className='flex'>
                      <span className='text-stone-500'>Этап:</span>
                      <span className='ms-[0.25rem]'>
                        {hasSnapshots ? currentSnapshot?.status : '–'}
                      </span>
                    </div>
                    <div className='flex'>
                      <span className='text-stone-500'>Оффер:</span>
                      <span className='ms-[0.25rem]'>
                        {hasResult ? (result?.offerGiven ? 'Есть' : 'Нет') : 'Неизвестно'}
                      </span>
                    </div>
                    <div className='flex'>
                      <span className='text-stone-500'>Статус:</span>
                      <span className='ms-[0.25rem]'>
                        {getResultStatusName(result?.resultStatus)}
                      </span>
                    </div>
                  </Card>
                </Col>
              )
            })}
          </Row>
        ) : (
          'Прогресс отсутствует'
        )}
      </>
    )
  }

  return (
    <Row gutter={16} className='w-full'>
      {studentsInSeason.map((student) => {
        return (
          <Col xs={24} md={12} lg={8} className='mb-4' key={student.id}>
            <Card
              onClick={() => setStudentId(student.id)}
              hoverable
              title={
                <Flex align='center'>
                  <span className='whitespace-break-spaces'>{student.name}</span>
                  <div className='ms-auto my-2 me-2'>
                    <Button
                      disabled={isClosed}
                      shape='circle'
                      danger
                      icon={<DeleteOutlined />}
                      onClick={(e) => {
                        e.stopPropagation()
                        openRemoveModal(student.id)
                      }}
                    />
                  </div>
                </Flex>
              }
            >
              <div className='flex'>
                <span className='text-stone-500'>Трудоустройство:</span>
                <span className='ms-[0.25rem]'>
                  {getEmplStatusName(student.employmentStatus)}
                </span>
              </div>
            </Card>
          </Col>
        )
      })}
    </Row>
  )
}
