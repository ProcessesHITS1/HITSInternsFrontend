import { DeleteOutlined } from '@ant-design/icons'
import { Button, Row, Col, Card, Flex } from 'antd'
import { getStatusName } from '../lib'
import { StudentInSeason } from '../model'

export interface StudentInSeasonListProps {
  studentsInSeason: StudentInSeason[]
  openEditModal: (id: string) => void
  openRemoveModal: (id: string) => void
}

export const StudentInSeasonList = (props: StudentInSeasonListProps) => {
  const { studentsInSeason, openEditModal, openRemoveModal } = props

  if (!studentsInSeason.length) {
    return <div className='text-center'>Студенты не найдены</div>
  }

  return (
    <Row gutter={16} className='w-full'>
      {studentsInSeason.map((student) => {
        return (
          <Col xs={24} md={12} lg={8} className='mb-4' key={student.id}>
            <Card
              onClick={() => openEditModal(student.id)}
              hoverable
              title={
                <Flex align='center'>
                  <span className='whitespace-break-spaces'>{student.name}</span>
                  <div className='ms-auto my-2 me-2'>
                    <Button
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
                  {getStatusName(student.employmentStatus)}
                </span>
              </div>
            </Card>
          </Col>
        )
      })}
    </Row>
  )
}
