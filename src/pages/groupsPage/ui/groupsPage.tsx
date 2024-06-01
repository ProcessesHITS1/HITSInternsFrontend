import { Button, Spin, Typography } from 'antd'
import { useState } from 'react'
import { AddGroupModal } from '~features/group'
import { GroupList, useGetGroupsQuery } from '~entities/group'

export const GroupsPage = () => {
  const groupsQuery = useGetGroupsQuery()
  const [isModalOpen, setIsModalOpen] = useState(false)

  if (groupsQuery.isError) {
    return 'Произошла ошибка при загрузке групп'
  }

  if (groupsQuery.isLoading) {
    return <Spin size='large' className='mt-5' />
  }

  return (
    <>
      <Typography.Title level={4}>Группы</Typography.Title>
      <AddGroupModal open={isModalOpen} setOpen={setIsModalOpen} />
      <Button onClick={() => setIsModalOpen(true)} type='primary' className='mt-1 mb-2'>
        Добавить группу
      </Button>
      <GroupList groups={groupsQuery.data!} />
    </>
  )
}
