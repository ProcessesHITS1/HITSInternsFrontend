import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Button, List } from 'antd'
import { RequestStatusTemplate } from '~entities/request'

export interface RequestStatusesListProps {
  statuses: RequestStatusTemplate[]
  openStatusTemplateModal: (status: RequestStatusTemplate) => void
  openStatusTemplateRemoveModal: (status: RequestStatusTemplate) => void
  isClosed: boolean
}

export const RequestStatusTemplatesList = (props: RequestStatusesListProps) => {
  const { statuses, openStatusTemplateModal, openStatusTemplateRemoveModal, isClosed } =
    props
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
            {status.name}
            {!isClosed && (
              <Button
                disabled={isClosed}
                size='small'
                shape='circle'
                icon={<EditOutlined />}
                className='mx-2 btn-edit'
                onClick={() => openStatusTemplateModal(status)}
              />
            )}
            {!isClosed && (
              <Button
                size='small'
                shape='circle'
                danger
                icon={<DeleteOutlined />}
                onClick={() => openStatusTemplateRemoveModal(status)}
              />
            )}
          </div>
        </List.Item>
      )}
    />
  )
}
