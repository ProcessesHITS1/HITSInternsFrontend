import { List } from 'antd'
import { Group } from '../model'

export interface GroupListInterface {
  groups: Group[]
}

export const GroupList = (props: GroupListInterface) => {
  return (
    <List
      pagination={{ pageSize: 8 }}
      className='w-full md:w-1/2 bg-white'
      dataSource={props.groups}
      bordered
      locale={{ emptyText: 'Группы не найдены' }}
      renderItem={(item) => <List.Item>{item.number}</List.Item>}
    />
  )
}
