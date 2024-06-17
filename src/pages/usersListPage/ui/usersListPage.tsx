import { Button, Spin, Typography } from 'antd'
import { useState } from 'react'
import { RegisterUserModal } from '~features/user'
import { useGetGroupsQuery } from '~entities/group'
import { Role, UserTable, useGetAllUsersQuery, useGetMyInfoQuery } from '~entities/user'

export const UsersListPage = () => {
  const usersQuery = useGetAllUsersQuery({ page: 1, size: 10000 })
  const groupsQuery = useGetGroupsQuery()
  const userInfoQuery = useGetMyInfoQuery()

  const [open, setOpen] = useState(false)

  if (usersQuery.isLoading || groupsQuery.isLoading || userInfoQuery.isLoading) {
    return <Spin className='mt-5' size={'large'} />
  }

  if (usersQuery.isError || groupsQuery.isError || userInfoQuery.isError) {
    return 'Произошла ошибка при загрузке данных'
  }

  if (!usersQuery.data?.data.length) {
    return 'Пользователей еще нет'
  }

  return (
    <>
      <RegisterUserModal
        open={open}
        setOpen={setOpen}
        groups={groupsQuery.data!}
        isAdmin={!!userInfoQuery.data?.roles.includes(Role.ROLE_ADMIN)}
      />
      <div className='w-full md:w-[85%] text-center'>
        <Typography.Title level={4} className='text-center'>
          Пользователи
        </Typography.Title>
        <Button type='primary' className='mb-2' onClick={() => setOpen(true)}>
          Новый пользователь
        </Button>
        <UserTable users={usersQuery.data?.data} />
      </div>
    </>
  )
}
