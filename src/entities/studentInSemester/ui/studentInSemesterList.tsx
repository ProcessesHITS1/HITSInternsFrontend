import { FileOutlined, AuditOutlined } from '@ant-design/icons'
import { Row, Col, Card, Flex, Button } from 'antd'
import { StudentInSemesterNormal } from '../model'

export interface StudentInSemesterListProps {
  studentsInSemester: StudentInSemesterNormal[]
  openStudentModal: (id: string | null | undefined) => void
  openMarkModal: (sisId: string) => void
  diaryLoading: boolean
  marksLoading: boolean
}

export const StudentInSemesterList = (props: StudentInSemesterListProps) => {
  const {
    studentsInSemester,
    openStudentModal,
    diaryLoading,
    openMarkModal,
    marksLoading,
  } = props
  if (!studentsInSemester.length) {
    return <div className='text-center'>Студенты не найдены</div>
  }

  return (
    <Row gutter={16} className='w-full'>
      {studentsInSemester.map((item) => {
        const { student, company } = item
        const hasDiary = !!item.diaryId
        const name = `${student?.lastName} ${student?.firstName} ${student?.patronymic}`
        return (
          <Col xs={24} md={12} lg={8} className='mb-4' key={item.id}>
            <Card
              title={
                <Flex align='center'>
                  <span>{name}</span>
                  <div className='ms-auto my-2 me-2'>
                    <Button
                      disabled={diaryLoading || marksLoading}
                      shape='circle'
                      icon={<FileOutlined />}
                      onClick={() => openStudentModal(item.diaryId)}
                      style={{
                        color: 'rgb(23, 124, 255)',
                        borderColor: 'rgb(23, 124, 255)',
                      }}
                    />
                    <Button
                      disabled={diaryLoading || marksLoading}
                      className='mx-2 btn-success'
                      shape='circle'
                      icon={<AuditOutlined />}
                      onClick={() => openMarkModal(item.id)}
                    />
                  </div>
                </Flex>
              }
            >
              <div className='flex'>
                <span className='text-stone-500'>Статус:</span>
                <span
                  className='ms-[0.25rem]'
                  style={{
                    color: item.internshipPassed ? 'green' : hasDiary ? 'orange' : 'red',
                  }}
                >
                  {item.internshipPassed
                    ? 'Сдал'
                    : hasDiary
                      ? 'Есть дневник'
                      : 'Нет дневника'}
                </span>
              </div>
              <div className='flex'>
                <span className='text-stone-500'>Контакты студента:</span>
                <span className='ms-[0.25rem]'>{student?.phone || 'нет'}</span>
              </div>
              <div className='flex'>
                <span className='text-stone-500'>Компания:</span>
                <span className='ms-[0.25rem]'>{company?.name || 'не найдена'}</span>
              </div>
              <div className='flex'>
                <span className='text-stone-500'>Контакты компании:</span>
                <span className='ms-[0.25rem]'>
                  {company?.contacts.join(' • ') || 'нет'}
                </span>
              </div>
            </Card>
          </Col>
        )
      })}
    </Row>
  )
}
