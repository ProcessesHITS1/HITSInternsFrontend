import { Card, Col, Row, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import { AppRoutes } from '~shared/config'

export const AdminPage = () => {
  const navigate = useNavigate()

  const config = [
    {
      title: 'Пользователи',
      descr: 'Просмотр таблицы, фильтрация, создание',
      route: AppRoutes.USERS,
    },
    { title: 'Группы', descr: 'Просмотр и создание групп', route: AppRoutes.GROUPS },
    {
      title: 'Компании',
      descr: 'Компании, кураторы, контакты',
      route: AppRoutes.COMPANITES,
    },
  ]

  const configMain = [
    {
      title: 'Сезоны собеседований',
      descr: 'Страница управления сезонами собеседований',
      route: AppRoutes.SEASONS,
    },
    {
      title: 'Семестры практики',
      descr: 'Страница управления семестрами практики',
      route: AppRoutes.SEMESTERS,
    },
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
      <Typography.Title level={3} className='mt-2'>
        Основное
      </Typography.Title>
      <Row gutter={8} className='w-full px-4'>
        {configMain.map((item, index) => (
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
