import { List } from 'antd'
import { RequestStatusTemplate } from '~entities/request'

export interface RequestStatusesListProps {
  statuses: RequestStatusTemplate[]
  isClosed: boolean
}

export const RequestStatusTemplatesList = (props: RequestStatusesListProps) => {
  const { statuses } = props
  if (!statuses.length) {
    return 'Шаблон прохождения собеседований не задан'
  }
  return (
    <List
      bordered
      className='bg-white w-full sm:w-[80%] md:w-[70%] lg:w-[60%]'
      dataSource={statuses}
      renderItem={(status) => (
        <List.Item>
          <div className='w-full flex items-center'>
            {status.name || 'Название не указано'}
          </div>
        </List.Item>
      )}
    />
  )
}
