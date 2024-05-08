import { Button, Spin } from 'antd'
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
      <AddGroupModal open={isModalOpen} setOpen={setIsModalOpen} />
      <Button onClick={() => setIsModalOpen(true)}>Добавить группу</Button>
      <GroupList groups={groupsQuery.data!} />
    </>
  )
}