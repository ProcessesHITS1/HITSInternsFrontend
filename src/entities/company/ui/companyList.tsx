import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Card, Col, Flex, Row } from 'antd'
import { UserInfo } from '~entities/user/@x'
import { Company } from '../model'

export interface CompanyListProps {
  companies: Company[]
  openEditModal: (company: Company) => void
  openRemoveModal: (id: string) => void
  personal: UserInfo[]
}

export const CompanyList = (props: CompanyListProps) => {
  const { companies, openRemoveModal, openEditModal, personal } = props

  return (
    <Row gutter={16} className='w-full'>
      {companies.map((company) => {
        const curator = personal.find((user) => user.id === company.curatorId)
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
                      icon={<EditOutlined />}
                      className='mx-2'
                      onClick={() => openEditModal(company)}
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
                        openRemoveModal(company.id)
                      }}
                    />
                  </div>
                </Flex>
              }
            >
              <div className='flex ms-2'>
                <span className='text-stone-500'>Куратор:</span>
                <span className='ms-[0.25rem]'>
                  {curator ? `${curator.lastName} ${curator.firstName}` : 'нет куратора'}
                </span>
              </div>
              <div className='flex ms-2'>
                <span className='text-stone-500'>Контакты:</span>
                <span className='ms-[0.25rem]'>
                  {company.contacts?.length
                    ? company.contacts.join(' • ')
                    : 'отсутствуют'}
                </span>
              </div>
            </Card>
          </Col>
        )
      })}
    </Row>
  )
}
