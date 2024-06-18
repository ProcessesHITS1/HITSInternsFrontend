import { EditOutlined } from '@ant-design/icons'
import { Button, Card, Col, Flex, Row } from 'antd'
import cs from 'classnames'
import { Link, useNavigate } from 'react-router-dom'
import { getSeasonLink, getSemesterLink } from '~shared/config'
import { parseDate } from '~shared/lib/functions'
import { Semester } from '../model'

export interface SemestersListProps {
  semesters: Semester[]
  openEditModal: (semester: Semester) => void
}

export const SemestersList = (props: SemestersListProps) => {
  const { semesters, openEditModal } = props
  const navigate = useNavigate()

  if (!semesters.length) {
    return 'Семестры практики отсутствуют'
  }

  return (
    <Row gutter={16} className='w-full mt-2'>
      {semesters.map((semester) => {
        return (
          <Col xs={24} md={12} lg={8} className='mb-4' key={semester.id}>
            <Card
              onClick={() => navigate(getSemesterLink(semester.id))}
              hoverable
              title={
                <Flex align='center'>
                  <span>{`Семестр №${semester.semester}`}</span>
                  <div className='ms-auto my-2 me-2'>
                    <Button
                      shape='circle'
                      icon={<EditOutlined />}
                      className='mx-2 btn-edit'
                      onClick={(e) => {
                        e.stopPropagation()
                        openEditModal(semester)
                      }}
                      disabled={semester.isClosed}
                    />
                  </div>
                </Flex>
              }
            >
              <div className='flex'>
                <span className='text-stone-500'>Дедлайн по дневникам:</span>
                <span className='ms-[0.25rem]'>
                  {parseDate(semester.documentsDeadline)}
                </span>
              </div>
              <div className='flex'>
                <span className='text-stone-500'>Сезон:</span>
                <span className='ms-[0.25rem]'>
                  {
                    <Link
                      to={getSeasonLink(semester.year)}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {semester.year}
                    </Link>
                  }
                </span>
              </div>
              <div className='flex'>
                <span className='text-stone-500'>Статус:</span>
                <span
                  className={cs('ms-[0.25rem]', {
                    'text-green-500': !semester.isClosed,
                    'text-red-500': semester.isClosed,
                  })}
                >
                  {semester.isClosed ? 'Закрыт' : 'Открыт'}
                </span>
              </div>
            </Card>
          </Col>
        )
      })}
    </Row>
  )
}
