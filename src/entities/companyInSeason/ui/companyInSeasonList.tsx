import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { Button, Card, Col, Flex, List, Row } from 'antd'
import { Position } from '~entities/position/@x/companyInSeason'
import { CompanyInSeasonShort } from '../model'

export interface CompanyInSeasonListProps {
  companies: CompanyInSeasonShort[]
  openEditModal: (company: CompanyInSeasonShort) => void
  openRemoveModal: (id: string) => void
  companyId: string
  setCompanyId: (id: string) => void
  openRemovePositionModal: (id: string) => void
  openPositionModal: (position: Position | null) => void
}

export const CompanyInSeasonList = (props: CompanyInSeasonListProps) => {
  const {
    companies,
    openRemoveModal,
    companyId,
    setCompanyId,
    openRemovePositionModal,
    openPositionModal,
  } = props

  if (!companies.length) {
    return <div className='text-center'>Компании не найдены</div>
  }

  if (companyId) {
    const companyName = companies.find((c) => c.id === companyId)?.name || ''
    return (
      <Row gutter={16} className='w-full flex flex-col items-center'>
        <div>
          <Button
            size='small'
            className='mx-2 inline-block font-bold'
            shape='circle'
            onClick={() => setCompanyId('')}
          >
            {'<'}
          </Button>
          Позиции {companyName}
          <Button
            size='small'
            className='mx-2 inline-block font-bold'
            shape='circle'
            onClick={() => openPositionModal(null)}
          >
            +
          </Button>
        </div>
        <List
          bordered
          className='mt-2 w-full md:w-2/3 lg:w-[45%] bg-white'
          locale={{ emptyText: 'Нет позиций' }}
          dataSource={[
            {
              title: 'Бэкенд',
              id: '2',
              nPositions: 7,
              description: 'Описание для бэка',
            },
            {
              title: 'Фронтенд',
              id: '2',
              nPositions: 5,
              description: 'Описание для фронта',
            },
          ]}
          renderItem={(pos) => (
            <List.Item>
              <div>
                <div className='flex items-center'>
                  <span className='font-bold'>{`${pos.title} (${pos.nPositions} поз.)`}</span>
                  <Button
                    shape='circle'
                    icon={<EditOutlined />}
                    className='ms-2'
                    style={{
                      color: 'rgb(254, 193, 38)',
                      borderColor: 'rgb(254, 193, 38)',
                    }}
                    onClick={() => openPositionModal(pos)}
                  />
                  <Button
                    shape='circle'
                    danger
                    icon={<DeleteOutlined />}
                    className='ms-2'
                    onClick={() => openRemovePositionModal(pos.id)}
                  />
                </div>
                <div className='text-slate-600 text-xs'>
                  {pos.description || 'Нет описания'}
                </div>
              </div>
            </List.Item>
          )}
          pagination={{ pageSize: 10 }}
        />
      </Row>
    )
  }

  return (
    <Row gutter={16} className='w-full'>
      {companies.map((company) => {
        return (
          <Col xs={24} md={12} lg={8} className='mb-4' key={company.id}>
            <Card
              hoverable
              onClick={() => setCompanyId(company.id)}
              title={
                <Flex align='center'>
                  <span>{company.name}</span>
                  <div className='ms-auto my-2 me-2'>
                    <Button
                      shape='circle'
                      danger
                      icon={<DeleteOutlined />}
                      onClick={(e) => {
                        e.stopPropagation()
                        openRemoveModal(company.id)
                      }}
                    />
                  </div>
                </Flex>
              }
            >
              <div className='flex ms-2'>
                <span className='text-stone-500'>Количество позиций:</span>
                <span className='ms-[0.25rem]'>{company.nPositions}</span>
              </div>
            </Card>
          </Col>
        )
      })}
    </Row>
  )
}
