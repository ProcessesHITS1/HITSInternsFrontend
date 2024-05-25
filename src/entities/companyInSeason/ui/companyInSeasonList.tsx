import { DeleteOutlined } from '@ant-design/icons'
import { Button, Card, Col, Flex, Row } from 'antd'
import { CompanyInSeasonShort } from '../model'

export interface CompanyInSeasonListProps {
  companies: CompanyInSeasonShort[]
  openEditModal: (company: CompanyInSeasonShort) => void
  openRemoveModal: (id: string) => void
}

export const CompanyInSeasonList = (props: CompanyInSeasonListProps) => {
  const { companies, openEditModal, openRemoveModal } = props

  if (!companies.length) {
    return <div className='text-center'>В данном сезоне нет компаний</div>
  }

  return (
    <Row gutter={16} className='w-full'>
      {companies.map((company) => {
        return (
          <Col xs={24} md={12} lg={8} className='mb-4' key={company.id}>
            <Card
              hoverable
              onClick={() => openEditModal(company)}
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
