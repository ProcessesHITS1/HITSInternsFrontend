import { Button, Card, Spin } from 'antd'
import { Sex, getRoleName, useGetMyInfoQuery } from '~entities/user'
import { unsetAuthToken, useAppDispatch } from '~shared/lib/store'
import { ProfileProp } from './profileProp'

export const ProfilePage = () => {
  const profileQuery = useGetMyInfoQuery()
  const dispatch = useAppDispatch()
  const logout = () => dispatch(unsetAuthToken())

  if (profileQuery.isFetching) {
    return <Spin size='large' className='mt-5' />
  }
  if (profileQuery.isError) {
    return 'Произошла ошибка при загрузке данных'
  }

  return (
    <Card
      title={
        <div className='flex items-center'>
          <span>Мой профиль</span>
          <Button className='ms-auto my-0' danger onClick={logout}>
            Выход
          </Button>
        </div>
      }
      className='w-full md:w-1/2'
    >
      <ProfileProp
        name='Роли'
        value={
          profileQuery.data?.roles.length
            ? profileQuery.data.roles.map((role) => getRoleName(role)).join(' • ')
            : 'Нет ролей'
        }
      />
      <ProfileProp
        name='ФИО'
        value={`${profileQuery.data?.lastName} ${profileQuery.data?.firstName} ${profileQuery.data?.patronymic}`}
      />
      <ProfileProp name='Почта' value={profileQuery.data?.email} />
      <ProfileProp
        name='Пол'
        value={profileQuery.data?.sex === Sex.MALE ? 'Мужской' : 'Женский'}
      />
      <ProfileProp name='Телефон' value={profileQuery.data?.phone} />
      <ProfileProp name='id' value={profileQuery.data?.id} />
    </Card>
  )
}
