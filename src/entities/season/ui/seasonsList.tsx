import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Card, Col, Flex, Row } from 'antd'
import { useNavigate } from 'react-router-dom'
import { getSeasonLink } from '~shared/config'
import { parseDate } from '~shared/lib/functions'
import { Season } from '../model'

export interface SeasonsListProps {
  seasons: Season[]
  openEditModal: (season: Season) => void
  openRemoveModal: (year: number) => void
}

export const SeasonsList = (props: SeasonsListProps) => {
  const { seasons, openEditModal, openRemoveModal } = props
  const navigate = useNavigate()
  return (
    <Row gutter={16} className='w-full'>
      {seasons.map((season) => {
        return (
          <Col xs={24} md={12} lg={8} className='mb-4' key={season.year}>
            <Card
              onClick={() => navigate(getSeasonLink(season.year))}
              hoverable
              title={
                <Flex align='center'>
                  <span>{`Сезон-${season.year}`}</span>
                  <div className='ms-auto my-2 me-2'>
                    <Button
                      shape='circle'
                      icon={<EditOutlined />}
                      className='mx-2'
                      onClick={(e) => {
                        e.stopPropagation()
                        openEditModal(season)
                      }}
                      style={{
                        color: 'rgb(254, 193, 38)',
                        borderColor: 'rgb(254, 193, 38)',
                      }}
                    />
                    <Button
                      shape='circle'
                      danger
                      icon={<DeleteOutlined />}
                      onClick={(e) => {
                        e.stopPropagation()
                        openRemoveModal(season.year)
                      }}
                    />
                  </div>
                </Flex>
              }
            >
              <div className='flex ms-2'>
                <span className='text-stone-500'>Начало собеседований:</span>
                <span className='ms-[0.25rem]'>{parseDate(season.seasonStart)}</span>
              </div>
              <div className='flex ms-2'>
                <span className='text-stone-500'>Конец собеседований:</span>
                <span className='ms-[0.25rem]'>{parseDate(season.seasonEnd)}</span>
              </div>
            </Card>
          </Col>
        )
      })}
    </Row>
  )
}
