import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { Button, Card, Col, Flex, List, Row, Spin } from 'antd'
import { useEffect, useState } from 'react'
import { useGetPositionsQuery } from '~entities/position/@x/companyInSeason'
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
  year: number
  isClosed: boolean
}

export const CompanyInSeasonList = (props: CompanyInSeasonListProps) => {
  const {
    companies,
    openRemoveModal,
    companyId,
    setCompanyId,
    openRemovePositionModal,
    openPositionModal,
    year,
    isClosed,
  } = props
  const [currentPage, setCurrentPage] = useState(1)
  const positions = useGetPositionsQuery(
    {
      companies: [companyId],
      page: currentPage,
      year,
    },
    {
      skip: !companyId,
    }
  )

  useEffect(() => {
    setCurrentPage(1)
  }, [companyId])

  if (positions.isFetching) {
    return <Spin size='large' className='mt-2' />
  }

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
            disabled={isClosed}
          >
            +
          </Button>
        </div>
        <List
          bordered
          className={'mt-2 w-full md:w-2/3 lg:w-[45%] bg-white'}
          locale={{ emptyText: 'Нет позиций' }}
          dataSource={positions.data?.items || []}
          renderItem={(pos) => (
            <List.Item>
              <div>
                <div className='flex items-center'>
                  <span className='font-bold'>{`${pos.title} (${pos.nRequests} студ. / ${pos.nSeats} мест)`}</span>
                  <Button
                    shape='circle'
                    icon={<EditOutlined />}
                    className='ms-2 btn-edit'
                    onClick={() => openPositionModal(pos)}
                    disabled={isClosed}
                  />
                  <Button
                    shape='circle'
                    danger
                    icon={<DeleteOutlined />}
                    className='ms-2'
                    onClick={() => openRemovePositionModal(pos.id)}
                    disabled={pos.nRequests > 0 || isClosed}
                  />
                </div>
                <div className='text-slate-600 text-xs break-all'>
                  {pos.description || 'Нет описания'}
                </div>
              </div>
            </List.Item>
          )}
          pagination={{
            current: currentPage,
            total: positions.data?.paginationInfo.totalPages || 1,
            pageSize: positions.data?.paginationInfo.pageSize || 10,
            onChange: (page) => {
              if (!positions.isFetching) {
                setCurrentPage(page)
              }
            },
            showSizeChanger: false,
          }}
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
                      disabled={company.nPositions > 0 || isClosed}
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
