import { Spin } from 'antd'
import { useState } from 'react'
import { AddProfessionModal } from '~features/profession'
import { ProfessionList, useGetProfessionsQuery } from '~entities/profession'

export const ProfessionsPage = () => {
  const professionsQuery = useGetProfessionsQuery()
  const [isModalOpen, setIsModalOpen] = useState(false)

  if (professionsQuery.isError) {
    return 'Произошла ошибка при загрузке профессий'
  }

  if (professionsQuery.isLoading) {
    return <Spin size='large' className='mt-5' />
  }

  return (
    <>
      <AddProfessionModal open={isModalOpen} setOpen={setIsModalOpen} />
      <ProfessionList professions={professionsQuery.data || []} />
    </>
  )
}
