import { DeleteOutlined, EditOutlined, CopyOutlined } from '@ant-design/icons'
import { Button, Card, Col, Flex, Row } from 'antd'
import cs from 'classnames'
import { useNavigate } from 'react-router-dom'
import { getSeasonLink } from '~shared/config'
import { parseDate } from '~shared/lib/functions'
import { Season } from '../model'

export interface SeasonsListProps {
  seasons: Season[]
  openEditModal: (season: Season, copy: boolean) => void
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
                      icon={<CopyOutlined />}
                      onClick={(e) => {
                        e.stopPropagation()
                        openEditModal(season, true)
                      }}
                      style={{
                        color: 'rgb(23, 124, 255)',
                        borderColor: 'rgb(23, 124, 255)',
                      }}
                    />
                    <Button
                      style={{ display: 'none' }}
                      className='mx-2 btn-edit'
                      shape='circle'
                      icon={<EditOutlined />}
                      onClick={(e) => {
                        e.stopPropagation()
                        openEditModal(season, false)
                      }}
                    />
                    <Button
                      style={{ display: 'none' }}
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
              <div className='flex'>
                <span className='text-stone-500'>Начало собеседований:</span>
                <span className='ms-[0.25rem]'>{parseDate(season.seasonStart)}</span>
              </div>
              <div className='flex'>
                <span className='text-stone-500'>Конец собеседований:</span>
                <span className='ms-[0.25rem]'>{parseDate(season.seasonEnd)}</span>
              </div>
              <div className='flex'>
                <span className='text-stone-500'>Статус:</span>
                <span className={cs('ms-[0.25rem]', {
                  'text-green-500': !season.isClosed,
                  'text-red-500': season.isClosed
                })}>
                  {season.isClosed ? 'Закрыт' : 'Открыт'}
                </span>
              </div>
            </Card>
          </Col>
        )
      })}
    </Row>
  )
}
