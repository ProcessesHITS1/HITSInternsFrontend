import { Button, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import { AppRoutes } from '~shared/config'

export const NotFoundPage = () => {
  const navigate = useNavigate()
  return (
    <div className='flex flex-col w-full items-center mt-5'>
      <Typography.Title level={3}>Страница не найдена</Typography.Title>
      <Button onClick={() => navigate(AppRoutes.ADMIN)}>Вернуться на главную</Button>
    </div>
  )
}
