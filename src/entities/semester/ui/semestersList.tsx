import { EditOutlined, CopyOutlined } from '@ant-design/icons'
import { Button, Card, Col, Flex, Row } from 'antd'
import cs from 'classnames'
import { Link, useNavigate } from 'react-router-dom'
import { Season } from '~entities/season/@x/semester'
import { getSeasonLink, getSemesterLink } from '~shared/config'
import { parseDate } from '~shared/lib/functions'
import { Semester } from '../model'

export interface SemestersListProps {
  semesters: Semester[]
  seasons: Season[]
  openEditModal: (semester: Semester) => void
  openCloneModal: (semester: Semester, year: number) => void
}

export const SemestersList = (props: SemestersListProps) => {
  const { semesters, seasons, openEditModal, openCloneModal } = props
  const navigate = useNavigate()

  if (!semesters.length) {
    return 'Семестры практики отсутствуют'
  }

  return (
    <Row gutter={16} className='w-full mt-2'>
      {semesters.map((semester) => {
        const season = seasons.find((s) => s.id === semester.seasonId)
        const lastInSeason =
          Math.max(
            ...semesters
              .filter((s) => s.seasonId === semester.seasonId)
              .map((s) => s.semester)
          ) === semester.semester
        return (
          <Col xs={24} sm={12} md={8} lg={6} className='mb-4' key={semester.id}>
            <Card
              onClick={() => navigate(getSemesterLink(semester.id))}
              hoverable
              title={
                <Flex align='center'>
                  <span>{`Семестр №${semester.semester}`}</span>
                  <div className='ms-auto my-2 me-2'>
                    <Button
                      shape='circle'
                      icon={<CopyOutlined />}
                      onClick={(e) => {
                        e.stopPropagation()
                        openCloneModal(semester, season?.year || 0)
                      }}
                      disabled={!semester.isClosed || !lastInSeason}
                      type='primary'
                    />
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
                <span className='text-stone-500'>Сезон:</span>
                <span className='ms-[0.25rem]'>
                  {
                    <Link
                      to={getSeasonLink(season?.year || 0)}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {season?.year}
                    </Link>
                  }
                </span>
              </div>
              <div className='flex'>
                <span className='text-stone-500'>Срок по дневникам:</span>
                <span className='ms-[0.25rem]'>
                  {semester.documentsDeadline
                    ? parseDate(semester.documentsDeadline)
                    : 'не указан'}
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
