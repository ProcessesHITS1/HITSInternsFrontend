import { Button, Spin, Typography } from 'antd'
import { useState } from 'react'
import { RegisterUserModal } from '~features/user'
import { useGetGroupsQuery } from '~entities/group'
import { UserTable, useGetAllUsersQuery } from '~entities/user'

export const StudentsListPage = () => {
  const usersQuery = useGetAllUsersQuery({ page: 1, size: 10000 })
  const groupsQuery = useGetGroupsQuery()

  const [open, setOpen] = useState(false)

  if (usersQuery.isLoading || groupsQuery.isLoading) {
    return <Spin className='mt-5' size={'large'} />
  }

  if (usersQuery.isError || groupsQuery.isError) {
    return 'Произошла ошибка при загрузке данных'
  }

  if (!usersQuery.data?.data.length) {
    return 'Пользователей еще нет'
  }

  return (
    <>
      <RegisterUserModal open={open} setOpen={setOpen} groups={groupsQuery.data!} />
      <div className='w-full md:w-[85%] text-center'>
        <Typography.Title level={3} className='text-center'>
          Пользователи
        </Typography.Title>
        {groupsQuery.data?.length !== 0 && (
          <Button type='primary' className='mb-4' onClick={() => setOpen(true)}>
            Новый пользователь
          </Button>
        )}
        <UserTable users={usersQuery.data?.data} />
      </div>
    </>
  )
}
