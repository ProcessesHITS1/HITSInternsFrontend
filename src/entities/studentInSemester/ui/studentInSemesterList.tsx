import { Row, Col, Card, Badge } from 'antd'
import { StudentInSemesterNormal } from '../model'

export interface StudentInSemesterListProps {
  studentsInSemester: StudentInSemesterNormal[]
  openStudentModal: (id: string | null | undefined) => void
}

export const StudentInSemesterList = (props: StudentInSemesterListProps) => {
  const { studentsInSemester, openStudentModal } = props

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
            <Badge.Ribbon
              color={item.internshipPassed ? 'green' : hasDiary ? 'gold' : 'red'}
              text={
                item.internshipPassed
                  ? 'Сдал'
                  : hasDiary
                    ? 'Есть дневник'
                    : 'Нет дневника'
              }
            >
              <Card onClick={() => openStudentModal(item.diaryId)} hoverable title={name}>
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
            </Badge.Ribbon>
          </Col>
        )
      })}
    </Row>
  )
}
