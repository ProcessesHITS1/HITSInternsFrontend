import { Table } from 'antd'
import cs from 'classnames'
import { UserInfo } from '../model'
import { userTableColumns } from './userTableColumns'

export interface UserTableProps {
  users: UserInfo[]
  className?: string
}

export const UserTable = (props: UserTableProps) => {
  const groups = [
    ...new Map(props.users.map((user) => [user.group?.id, user.group])).values(),
  ]
  return (
    <Table
      className={cs('w-full border-[1px] border-[lightgray] rounded', props.className)}
      pagination={{ pageSize: 10, showSizeChanger: false }}
      dataSource={props.users}
      columns={userTableColumns(groups)}
      rowKey={'id'}
    />
  )
}
