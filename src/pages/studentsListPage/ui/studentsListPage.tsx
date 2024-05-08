import { Button, Spin, Typography } from 'antd'
import { useState } from 'react'
import { RegisterUserModal } from '~features/user'
import { UserTable, useGetAllUsersQuery } from '~entities/user'

export const StudentsListPage = () => {
  const users = useGetAllUsersQuery({ page: 1, size: 10000 })
  const [open, setOpen] = useState(false)

  if (users.isLoading) {
    return <Spin className='mt-5' size={'large'} />
  }

  if (users.isError) {
    return 'Произошла ошибка при загрузке данных'
  }

  if (!users.data?.data.length) {
    return 'Пользователей еще нет'
  }

  return (
    <>
      <RegisterUserModal open={open} setOpen={setOpen} />
      <div className='w-full md:w-[85%] text-center'>
        <Typography.Title level={3} className='text-center'>
          Пользователи
        </Typography.Title>
        <Button type='primary' className='mb-4' onClick={() => setOpen(true)}>
          Новый пользователь
        </Button>
        <UserTable users={users.data?.data} />
      </div>
    </>
  )
}
