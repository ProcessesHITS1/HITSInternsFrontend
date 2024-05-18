import { Card, Col, Row, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import { AppRoutes } from '~shared/config'

export const AdminPage = () => {
  const navigate = useNavigate()

  const config = [
    {
      title: 'Пользователи',
      descr: 'Страница управления пользователями',
      route: AppRoutes.USERS,
    },
    { title: 'Группы', descr: 'Страница управления группами', route: AppRoutes.GROUPS },
    {
      title: 'Компании',
      descr: 'Страница управления компаниями',
      route: AppRoutes.COMPANITES,
    },
    { title: 'Сезоны', descr: 'Страница управления сезонами', route: AppRoutes.SEASONS },
  ]
  return (
    <>
      <Typography.Title level={3}>Администрирование</Typography.Title>
      <Row gutter={8} className='w-full px-4'>
        {config.map((item, index) => (
          <Col xs={24} md={8} key={index} className='mt-2'>
            <Card title={item.title} hoverable onClick={() => navigate(item.route)}>
              {item.descr}
            </Card>
          </Col>
        ))}
      </Row>
    </>
  )
}
